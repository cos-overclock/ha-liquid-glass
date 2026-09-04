import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { loadHaFormComponents } from "../editor/load";
import { createTranslator, type Translator } from "../i18n";
import { Badge, CardTitle, IconWell, UnavailableCard, type BadgeStyle, type WellStyle } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineReactCard, type ReactCardProps } from "../react/define-react-card";
import { glassSurfaceStyles, Icon, LiquidGlassSurface } from "../react/glass-primitives";
import { GlassSlider, glassSliderStyles } from "../react/glass-slider";
import { useCardHost } from "../react/use-card-host";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { clamp, formatNumber, friendlyName, isUnavailable, moreInfo, pickEntity } from "../utils";
import "../components/lg-icon";

export interface ClimateCardConfig extends BaseCardConfig {
  /** Visual treatment. The original dial remains the default for backwards compatibility. */
  design?: "classic" | "compact" | "a";
  show_fan_mode?: boolean;
  show_preset_mode?: boolean;
  show_swing_mode?: boolean;
  hvac_modes?: string[];
}

interface ModeTheme {
  icon: string;
  label: string;
  well?: WellStyle;
  badge?: BadgeStyle;
  ring: [string, string, string];
  glow: string;
  selectedColor: string;
}

type Which = "single" | "low" | "high";
type Pending = Partial<Record<Which, number>>;

const DIAL = 250;
const RING_WIDTH = 24;
const RADIUS = DIAL / 2 - RING_WIDTH / 2;
const START_ANGLE = 135;
/** How long a just-sent setpoint is trusted before the entity's own value takes over. */
const PENDING_MS = 4000;
const SWEEP = 270;

const polar = (deg: number, r = RADIUS): [number, number] => {
  const rad = (deg * Math.PI) / 180;
  return [DIAL / 2 + r * Math.cos(rad), DIAL / 2 + r * Math.sin(rad)];
};

function arcPath(fromDeg: number, toDeg: number): string {
  const [x1, y1] = polar(fromDeg);
  const [x2, y2] = polar(toDeg);
  const large = toDeg - fromDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 ${large} 1 ${x2} ${y2}`;
}

const styles = `${tokens.cssText}${reactCardStyles}${glassSurfaceStyles}${glassSliderStyles}
  .dial-row {
    display: flex;
    justify-content: center;
  }
  /* The SVG scales with its viewBox, so everything layered on top is positioned in
     percentages of the dial rather than in the 250px design units. */
  .dial {
    position: relative;
    width: min(${DIAL}px, 100%);
    aspect-ratio: 1;
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
  }
  .dial svg {
    position: absolute;
    inset: 0;
    overflow: visible;
  }
  .ring-track {
    fill: none;
    stroke: var(--lg-track-bg);
    stroke-width: ${RING_WIDTH}px;
  }
  .ring-track-stroke {
    fill: none;
    stroke: var(--lg-glass-stroke);
    stroke-width: 1px;
  }
  .ring-fill {
    fill: none;
    stroke-width: ${RING_WIDTH}px;
    stroke-linecap: butt;
    filter: drop-shadow(0 0 7px var(--ring-glow));
    transition:
      stroke-dasharray 0.45s cubic-bezier(0.3, 0.8, 0.3, 1),
      stroke-dashoffset 0.45s cubic-bezier(0.3, 0.8, 0.3, 1),
      opacity 0.3s ease;
  }
  svg {
    transition:
      --lg-ring-0 0.42s ease,
      --lg-ring-1 0.42s ease,
      --lg-ring-2 0.42s ease;
  }
  .dial-knob,
  .dial-knob-cap {
    position: absolute;
    width: var(--lg-knob, 30px);
    height: var(--lg-knob, 30px);
    border-radius: 999px;
    transform: translate(-50%, -50%);
    pointer-events: none;
    transition: left 0.45s cubic-bezier(0.3, 0.8, 0.3, 1), top 0.45s cubic-bezier(0.3, 0.8, 0.3, 1), transform 0.12s ease;
  }
  /* Elevation lives on the glass knob, so the cap on top of it stays flat. */
  .dial-knob {
    box-shadow: var(--lg-knob-shadow);
    transition:
      left 0.45s cubic-bezier(0.3, 0.8, 0.3, 1),
      top 0.45s cubic-bezier(0.3, 0.8, 0.3, 1),
      transform 0.12s ease,
      box-shadow 200ms ease;
  }
  /*
   * Same rule as every other slider: opaque at rest, glass only while a knob is being
   * dragged. The glass knob stays mounted underneath so its filter is already warm.
   */
  .dial-knob-cap {
    background: var(--lg-knob-solid);
    box-shadow: inset 0 0 0 1px var(--lg-knob-solid-rim);
    transition:
      left 0.45s cubic-bezier(0.3, 0.8, 0.3, 1),
      top 0.45s cubic-bezier(0.3, 0.8, 0.3, 1),
      transform 0.12s ease,
      opacity 220ms ease;
  }
  /* Anything that eased towards the finger would feel like lag, so while a drag is in
     flight the knob and the arc track the pointer exactly. Only the knob under the
     finger turns to glass; the other end of a heat_cool range stays solid. */
  .dial.dragging .dial-knob,
  .dial.dragging .dial-knob-cap {
    transition: transform 0.12s ease;
  }
  .dial.dragging .ring-fill {
    transition: none;
  }
  .dial.dragging .dial-knob-cap.moving {
    opacity: 0;
    transition-duration: 0.12s;
  }
  .dial.dragging .dial-knob.moving {
    box-shadow: var(--lg-knob-shadow-active);
  }
  .dial.dragging .dial-knob.moving,
  .dial.dragging .dial-knob-cap.moving {
    transform: translate(-50%, -50%) scale(1.08);
  }
  @media (prefers-reduced-motion: reduce) {
    .dial-knob,
    .dial-knob-cap { transition-duration: 0.01ms !important; }
  }
  .center {
    position: absolute;
    inset: 14%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    pointer-events: none;
  }
  .caption {
    font-size: var(--lg-tick);
    font-weight: 500;
    color: var(--lg-text-secondary);
  }
  .temp-row {
    display: flex;
    align-items: flex-start;
    gap: 2px;
    font-family: var(--lg-font-ui);
    font-weight: 600;
    color: var(--lg-text-primary);
    font-variant-numeric: tabular-nums;
  }
  .temp-row .target {
    font-size: var(--lg-temp, 54px);
    line-height: 1;
    letter-spacing: -2px;
  }
  .temp-row .target.range {
    font-size: var(--lg-temp-range, 40px);
    letter-spacing: -1px;
    line-height: 1.2;
  }
  .temp-row .fraction {
    font-size: var(--lg-temp-fraction, 22px);
    line-height: 1.2;
    letter-spacing: -0.2px;
  }
  .temp-row.off {
    color: var(--lg-text-secondary);
  }
  .current {
    font-size: var(--lg-label);
    font-weight: 500;
    color: var(--lg-text-secondary);
  }
  .minmax {
    position: absolute;
    bottom: 5%;
    left: 14%;
    right: 14%;
    display: flex;
    justify-content: space-between;
    font-family: var(--lg-font-ui);
    font-size: var(--lg-tick);
    font-weight: 500;
    color: var(--lg-text-secondary);
    pointer-events: none;
  }
  .card.climate-compact {
    --lg-gap: 16px;
  }
  /*
   * Same geometry as every other slider in the app: a thin capsule, a round knob. The
   * fill colour comes from the mode (set as --lg-slider-fill on the card), the same
   * identity the dial's ring carries — not a fixed rainbow across the whole range.
   */
  .card.climate-compact .lg-react-slider {
    --lg-slider-height: var(--lg-tile-row-h, 44px);
    --lg-slider-bar-height: var(--lg-tile-bar-h, 12px);
    --lg-slider-knob-size: var(--lg-tile-knob, 32px);
  }
  .tile-readout {
    min-width: 0;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
  }
  .tile-target {
    min-width: 0;
    display: flex;
    align-items: flex-start;
    gap: 2px;
    color: var(--lg-text-primary);
    font-family: var(--lg-font-ui);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }
  .tile-target .number {
    font-size: var(--lg-tile-temp, 56px);
    line-height: 1;
    letter-spacing: -2px;
    white-space: nowrap;
  }
  .tile-target.range .number {
    font-size: var(--lg-tile-range, 40px);
    line-height: 1.25;
    letter-spacing: -1px;
  }
  .tile-target .fraction {
    color: var(--lg-text-secondary);
    font-size: var(--lg-tile-fraction, 24px);
    line-height: 1.15;
    letter-spacing: -0.2px;
    white-space: nowrap;
  }
  .tile-target.off {
    color: var(--lg-text-secondary);
  }
  .tile-room {
    flex: none;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 1px;
    padding-bottom: 3px;
  }
  .tile-room .caption {
    font-size: var(--lg-tick);
    font-weight: 500;
  }
  .tile-room .value {
    color: var(--lg-text-primary);
    font-family: var(--lg-font-ui);
    font-size: var(--lg-tile-room, 17px);
    font-weight: 600;
    letter-spacing: -0.2px;
    font-variant-numeric: tabular-nums;
  }
  .tile-step-controls {
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .tile-step {
    width: 48px;
    height: 40px;
    display: grid;
    place-items: center;
    padding: 0 0 2px;
    border: 0;
    border-radius: 20px;
    background: var(--lg-track-bg);
    box-shadow:
      0 2px 5px rgba(0, 0, 0, 0.12),
      inset 0 0 0 1px var(--lg-glass-stroke);
    color: var(--lg-text-primary);
    font-family: var(--lg-font-ui);
    font-size: 20px;
    font-weight: 600;
    line-height: 1;
    cursor: pointer;
    transition: transform 0.1s ease, opacity 0.2s ease;
  }
  .tile-step:active:not(:disabled) {
    transform: scale(0.94);
  }
  .tile-step:disabled {
    opacity: 0.4;
    cursor: default;
  }
  .tile-modes {
    position: relative;
    display: flex;
    height: 40px;
    box-sizing: border-box;
    gap: 2px;
    padding: 3px;
    border-radius: 20px;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
  }
  .tile-mode-pill {
    --seg-w: calc((100% - 6px - (var(--n) - 1) * 2px) / var(--n));
    position: absolute;
    top: 3px;
    bottom: 3px;
    left: calc(3px + var(--i) * (var(--seg-w) + 2px));
    width: var(--seg-w);
    border-radius: 17px;
    background: var(--lg-segment-selected);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);
    transition: left 0.32s cubic-bezier(0.3, 0.8, 0.3, 1), opacity 0.2s ease;
    pointer-events: none;
  }
    .tile-modes button {
    position: relative;
    z-index: 1;
    flex: 1;
    min-width: 0;
    min-height: 0;
    height: 34px;
    display: grid;
    place-items: center;
    padding: 0;
    border: 0;
    border-radius: 17px;
    color: var(--lg-text-secondary);
    background: transparent;
    cursor: pointer;
  }
  .tile-modes lg-icon {
    --mdc-icon-size: 17px;
    width: 17px;
    height: 17px;
    transition: color 0.32s ease;
  }
  .tile-modes button.selected lg-icon {
    color: var(--selected-color);
  }
  @supports (container-type: inline-size) {
    .card {
      --lg-knob: clamp(22px, 8cqi, 30px);
      --lg-temp: clamp(34px, 14.2cqi, 54px);
      --lg-temp-range: clamp(26px, 10.5cqi, 40px);
      --lg-temp-fraction: clamp(15px, 5.8cqi, 22px);
    }
    .card.climate-compact {
      --lg-tile-row-h: clamp(34px, 11.6cqi, 44px);
      --lg-tile-bar-h: clamp(8px, 3.2cqi, 12px);
      --lg-tile-knob: clamp(24px, 8.4cqi, 32px);
      --lg-tile-temp: clamp(38px, 14.7cqi, 56px);
      --lg-tile-range: clamp(28px, 10.5cqi, 40px);
      --lg-tile-fraction: clamp(17px, 6.3cqi, 24px);
      --lg-tile-room: clamp(13px, 4.5cqi, 17px);
    }
  }
  .segment.modes {
    position: relative;
    border-radius: 20px;
  }
  /*
   * The buttons are flex: 1 inside 3px of padding with a 2px gap, so one button is
   * (width - 6px - gaps) / n and the pill's offset is that plus a gap, per button.
   * Deriving it here keeps the pill on the button without measuring anything.
   */
  .seg-pill {
    --seg-w: calc((100% - 6px - (var(--n) - 1) * 2px) / var(--n));
    position: absolute;
    top: 3px;
    bottom: 3px;
    left: calc(3px + var(--i) * (var(--seg-w) + 2px));
    width: var(--seg-w);
    border-radius: 17px;
    background: var(--lg-segment-selected);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.14);
    transition: left 0.32s cubic-bezier(0.3, 0.8, 0.3, 1), opacity 0.2s ease;
    pointer-events: none;
  }
  .segment.modes > button {
    position: relative;
    height: clamp(44px, 14cqi, 54px);
    border-radius: 17px;
    font-size: var(--lg-tick);
    padding: 0 2px;
  }
  /* The pill draws the selection now, so the button underneath must not draw it too. */
  .segment.modes > button.selected {
    background: transparent;
    box-shadow: none;
  }
  .segment.modes lg-icon {
    transition: color 0.32s ease;
  }
  .segment.modes > button > span {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .segment.modes lg-icon {
    --mdc-icon-size: clamp(15px, 4.7cqi, 18px);
  }
  .segment.modes > button.selected lg-icon {
    color: var(--selected-color);
  }
  .details {
    display: flex;
    gap: 10px;
  }
  /* Two dropdowns side by side leave no room for their values in a narrow column. */
  @container (max-width: 320px) {
    .details {
      flex-direction: column;
    }
  }
  .detail {
    position: relative;
    flex: 1;
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 12px 10px 14px;
    border-radius: 20px;
    background: var(--lg-track-bg);
    box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
    color: var(--lg-text-secondary);
  }
  .detail lg-icon {
    flex: none;
    --mdc-icon-size: 16px;
  }
  .detail .text {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
  .detail .dl {
    font-size: var(--lg-tick);
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .detail .dv {
    font-size: var(--lg-label);
    font-weight: 600;
    color: var(--lg-text-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .detail select {
    position: absolute;
    inset: 0;
    opacity: 0;
    width: 100%;
    cursor: pointer;
  }
`;

function themeFor(mode: string, t: Translator): ModeTheme {
  const white = "rgba(255,255,255,0.7)";
  switch (mode) {
    case "heat":
      return {
        icon: "mdi:fire",
        label: t("mode_heat"),
        well: { from: "#FFA073", to: "var(--lg-heat-deep)", glow: "rgba(255,106,61,0.24)" },
        badge: { color: "var(--lg-heat)", bg: "rgba(255,106,61,0.18)", stroke: "rgba(255,106,61,0.3)" },
        ring: ["#FFB36B", "var(--lg-heat)", "var(--lg-heat-deep)"],
        glow: "rgba(255,106,61,0.35)",
        selectedColor: "var(--lg-heat)",
      };
    case "cool":
      return {
        icon: "mdi:snowflake",
        label: t("mode_cool"),
        well: { from: "#8FDBFF", to: "var(--lg-cool-deep)", glow: "rgba(10,132,255,0.24)" },
        badge: { color: "var(--lg-cool-deep)", bg: "rgba(10,132,255,0.18)", stroke: "rgba(10,132,255,0.3)" },
        ring: ["#A8E4FF", "var(--lg-cool)", "var(--lg-cool-deep)"],
        glow: "rgba(10,132,255,0.35)",
        selectedColor: "var(--lg-cool-deep)",
      };
    case "dry":
      return {
        icon: "mdi:water-percent",
        label: t("mode_dry"),
        well: { from: "#8FDBFF", to: "#2BB3D0", glow: "rgba(43,179,208,0.24)" },
        badge: { color: "#0A7EA4", bg: "rgba(43,179,208,0.18)", stroke: "rgba(43,179,208,0.3)" },
        ring: ["#A8E4FF", "#5DD6EE", "#0A7EA4"],
        glow: "rgba(43,179,208,0.35)",
        selectedColor: "#0A7EA4",
      };
    case "fan_only":
      return {
        icon: "mdi:fan",
        label: t("mode_fan_only"),
        well: { from: "#C9CED6", to: "#8E9AAF", glow: "rgba(142,154,175,0.24)" },
        badge: { color: "#5C6B82", bg: "rgba(142,154,175,0.18)", stroke: "rgba(142,154,175,0.3)" },
        ring: ["#DDE3EC", "#B4BDCC", "#8E9AAF"],
        glow: "rgba(142,154,175,0.3)",
        selectedColor: "#5C6B82",
      };
    case "heat_cool":
    case "auto":
      return {
        icon: "mdi:thermometer-auto",
        label: t(mode === "auto" ? "mode_auto" : "mode_heat_cool"),
        well: { from: "#7EE8A0", to: "#1E9E4A", glow: "rgba(48,209,88,0.24)" },
        badge: { color: "#1E9E4A", bg: "rgba(48,209,88,0.18)", stroke: "rgba(48,209,88,0.3)" },
        ring: ["var(--lg-heat)", "#C58CFF", "var(--lg-cool-deep)"],
        glow: "rgba(142,107,255,0.35)",
        selectedColor: "#1E9E4A",
      };
    default:
      return {
        icon: "mdi:power",
        label: t("mode_off"),
        ring: [white, white, white],
        glow: "transparent",
        selectedColor: "var(--lg-text-primary)",
      };
  }
}

function modeMeta(mode: string, t: Translator): { icon: string; label: string } {
  const icons: Record<string, string> = {
    auto: "mdi:refresh-auto",
    heat_cool: "mdi:sun-snowflake-variant",
    cool: "mdi:snowflake",
    heat: "mdi:fire",
    dry: "mdi:water-percent",
    fan_only: "mdi:fan",
    off: "mdi:power",
  };
  return { icon: icons[mode] ?? "mdi:thermostat", label: t(`mode_${mode}`) };
}

/**
 * 270° liquid-glass dial with a draggable knob (two knobs in heat_cool), a mode segment
 * and fan / preset detail dropdowns. `design: compact` swaps the dial for a slider tile.
 */
function ClimateCard({ config, hass, host }: ReactCardProps<ClimateCardConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const [drag, setDrag] = useState<{ which: Which; value: number }>();
  /**
   * What was just sent, held until the entity reports it back. Without this the dial would
   * fall back to the old attribute the moment the finger lifts, and then animate from there
   * to the new value once Home Assistant answers — a bounce the user never asked for.
   */
  const [pending, setPending] = useState<Pending>();
  const pendingTimer = useRef<number | undefined>(undefined);
  const dialRef = useRef<HTMLDivElement>(null);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = config.name ?? friendlyName(entity, config.entity ?? "");
  const attributes = entity?.attributes ?? {};

  useEffect(() => () => window.clearTimeout(pendingTimer.current), []);

  /** True once the entity reports something close enough to what is being held. */
  const step = (attributes.target_temp_step as number | undefined) ?? 0.5;
  const settled = (key: Which, reported: number | undefined): boolean => {
    const want = pending?.[key];
    if (want === undefined) return true;
    if (reported === undefined) return false;
    return Math.abs(reported - want) <= Math.max(step / 2, 0.01);
  };
  const done = pending !== undefined
    && settled("single", attributes.temperature as number | undefined)
    && settled("low", attributes.target_temp_low as number | undefined)
    && settled("high", attributes.target_temp_high as number | undefined);

  useEffect(() => {
    if (!done) return;
    window.clearTimeout(pendingTimer.current);
    setPending(undefined);
  }, [done]);

  if (!entity || isUnavailable(entity)) {
    return <>
      <style>{styles}</style>
      <UnavailableCard
        refraction={refraction}
        variant={config.glass_variant}
        icon={config.icon}
        name={name}
        label={t("unavailable")}
        onOpen={() => moreInfo(host, config.entity)}
      />
    </>;
  }

  const call = (service: string, data?: Record<string, unknown>) =>
    void hass?.callService("climate", service, { entity_id: config.entity, ...data });

  const mode = entity.state;
  const off = mode === "off";
  const range: [number, number] = [
    (attributes.min_temp as number | undefined) ?? 7,
    (attributes.max_temp as number | undefined) ?? 35,
  ];
  const [min, max] = range;
  const isRange = mode === "heat_cool" && attributes.target_temp_low !== undefined;
  const ratio = (value: number): number => clamp((value - min) / (max - min || 1), 0, 1);
  // The finger wins, then whatever was just sent, then what the entity reports.
  const shownValue = (key: Which, reported: number | undefined, fallback: number): number =>
    drag?.which === key ? drag.value : pending?.[key] ?? reported ?? fallback;
  const single = shownValue("single", attributes.temperature as number | undefined, min);
  const low = shownValue("low", attributes.target_temp_low as number | undefined, min);
  const high = shownValue("high", attributes.target_temp_high as number | undefined, max);
  const theme = themeFor(mode, t);
  const modes = (config.hvac_modes ?? (attributes.hvac_modes as string[] | undefined) ?? []).filter(Boolean);
  const compact = config.design === "compact" || config.design === "a";
  const current = attributes.current_temperature as number | undefined;

  const hold = (which: Which, value: number) => {
    setPending((held) => ({ ...held, [which]: value }));
    window.clearTimeout(pendingTimer.current);
    // A service call that never lands would otherwise freeze the dial on a value the
    // thermostat never took.
    pendingTimer.current = window.setTimeout(() => setPending(undefined), PENDING_MS);
  };

  const commit = (which: Which, value: number) => {
    // The knobs cannot cross, so a range end is clamped before it is sent — and what is
    // held has to be what was sent, not what the finger asked for.
    let sent = value;
    if (which === "single") call("set_temperature", { temperature: value });
    else if (which === "low") {
      sent = Math.min(value, (attributes.target_temp_high as number) - step);
      call("set_temperature", { target_temp_low: sent, target_temp_high: attributes.target_temp_high });
    } else {
      sent = Math.max(value, (attributes.target_temp_low as number) + step);
      call("set_temperature", { target_temp_low: attributes.target_temp_low, target_temp_high: sent });
    }
    hold(which, sent);
  };

  const valueFromDial = (event: PointerEvent<HTMLDivElement>): number => {
    const rect = dialRef.current?.getBoundingClientRect();
    if (!rect) return single;
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    let deg = (Math.atan2(dy, dx) * 180) / Math.PI;
    deg = (((deg - START_ANGLE) % 360) + 360) % 360;
    if (deg > SWEEP) deg = deg > SWEEP + (360 - SWEEP) / 2 ? 0 : SWEEP;
    return clamp(Math.round((min + (deg / SWEEP) * (max - min)) / step) * step, min, max);
  };

  const nearestKnob = (value: number): Which => {
    if (!isRange) return "single";
    return Math.abs(value - low) <= Math.abs(value - high) ? "low" : "high";
  };

  const startDrag = (value: number) => setDrag({ which: nearestKnob(value), value });

  const finishDrag = () => {
    if (!drag) return;
    setDrag(undefined);
    commit(drag.which, drag.value);
  };

  /** The Climate A buttons move the target by one whole degree per press. */
  const stepTemperature = (delta: -1 | 1) => {
    if (off) return;
    if (isRange) {
      const applied = clamp(delta, min - low, max - high);
      if (applied === 0) return;
      call("set_temperature", { target_temp_low: low + applied, target_temp_high: high + applied });
      hold("low", low + applied);
      hold("high", high + applied);
      return;
    }
    const next = clamp(single + delta, min, max);
    if (next === single) return;
    call("set_temperature", { temperature: next });
    hold("single", next);
  };

  const action = attributes.hvac_action as string | undefined;
  const actionText = off
    ? t("mode_off")
    : action === "heating" ? t("heating")
      : action === "cooling" ? t("cooling")
        : action === "drying" ? t("drying")
          : action === "fan" ? t("fan_running")
            : action === "idle" ? t("idle")
              : theme.label;
  const humidity = attributes.current_humidity as number | undefined;

  const detail = (kind: "fan_mode" | "preset_mode" | "swing_mode", icon: string) => {
    const options = attributes[`${kind}s`] as string[] | undefined;
    const value = attributes[kind] as string | undefined;
    if (!options?.length) return null;
    return (
      <div className="detail" key={kind}>
        <Icon icon={icon} />
        <div className="text">
          <span className="dl">{t(kind === "preset_mode" ? "preset" : kind)}</span>
          <span className="dv">{value ?? "—"}</span>
        </div>
        <Icon icon="mdi:chevron-down" />
        <select value={value ?? ""} onChange={(event) => call(`set_${kind}`, { [kind]: event.target.value })}>
          {options.map((option) => <option value={option} key={option}>{option}</option>)}
        </select>
      </div>
    );
  };

  const header = <div className="header">
    <IconWell icon={config.icon ?? theme.icon} style={theme.well} onClick={() => moreInfo(host, config.entity)} />
    <CardTitle
      name={name}
      state={[
        actionText,
        ...(compact || current === undefined ? [] : [`${t("room_temp")} ${formatNumber(hass, current, 1)}°`]),
        ...(humidity === undefined ? [] : [`${t("humidity")} ${formatNumber(hass, humidity, 0)}%`]),
      ].join(" · ")}
      onClick={() => moreInfo(host, config.entity)}
    />
    <Badge label={theme.label} style={theme.badge} />
  </div>;

  if (compact) {
    const [whole, fraction] = (Math.round(single * 10) / 10).toFixed(1).split(".");

    return <>
      <style>{styles}</style>
      <LiquidGlassSurface
        className="card climate-compact"
        refraction={refraction}
        variant={config.glass_variant}
        sourceAccent={theme.selectedColor}
        style={{
          display: "flex",
          position: "relative",
          // The bar is a flat mode colour, the same identity the dial's ring carries.
          "--lg-slider-fill": theme.selectedColor,
          "--fill-from": theme.selectedColor,
          "--fill-to": theme.selectedColor,
        } as CSSProperties}
      >
        {header}

        <div className="tile-readout">
          <div className={`tile-target${isRange ? " range" : ""}${off ? " off" : ""}`}>
            <span className="number">
              {isRange ? `${formatNumber(hass, low, 0)}–${formatNumber(hass, high, 0)}` : formatNumber(hass, Number(whole), 0)}
            </span>
            <span className="fraction">{isRange ? "°" : `.${fraction}°`}</span>
          </div>
          {current !== undefined && <div className="tile-room">
            <span className="caption">{t("room_temp")}</span>
            <span className="value">{formatNumber(hass, current, 1)}°</span>
          </div>}
        </div>

        <GlassSlider
          value={isRange ? low : single}
          highValue={isRange ? high : undefined}
          min={min}
          max={max}
          step={step}
          disabled={off}
          showFill={!off}
          showKnob={!off}
          clipFill
          refraction={refraction}
          glassVariant={config.glass_variant}
          label={isRange ? t("target_range") : t("target_temp")}
          onInput={(next, handle) => setDrag({ which: isRange ? handle : "single", value: next })}
          onChange={(next, handle) => {
            const which = isRange ? handle : "single";
            setDrag(undefined);
            commit(which, next);
          }}
        />

        <div className="tile-step-controls">
          <button
            className="tile-step decrease"
            aria-label={t("decrease_temp")}
            title={t("decrease_temp")}
            disabled={off || (isRange ? low <= min : single <= min)}
            onClick={() => stepTemperature(-1)}
          >−</button>
          <button
            className="tile-step increase"
            aria-label={t("increase_temp")}
            title={t("increase_temp")}
            disabled={off || (isRange ? high >= max : single >= max)}
            onClick={() => stepTemperature(1)}
          >＋</button>
        </div>

        {modes.length > 0 && <div
          className="tile-modes"
          style={{
            "--selected-color": theme.selectedColor,
            "--n": String(modes.length),
            "--i": String(Math.max(modes.indexOf(mode), 0)),
          } as CSSProperties}
        >
          <div className="tile-mode-pill" style={{ opacity: modes.includes(mode) ? 1 : 0 }} />
          {modes.map((option) => {
            const meta = modeMeta(option, t);
            // The compact source artwork uses the plain circular-arrows glyph, without an A.
            const icon = option === "auto" ? "mdi:refresh" : meta.icon;
            return (
              <button
                key={option}
                className={option === mode ? "selected" : undefined}
                title={meta.label}
                aria-label={meta.label}
                aria-pressed={option === mode}
                onClick={() => call("set_hvac_mode", { hvac_mode: option })}
              >
                <Icon icon={icon} />
              </button>
            );
          })}
        </div>}

        {config.show_fan_mode === true && <div className={`details${off ? " muted" : ""}`}>
          {detail("fan_mode", "mdi:weather-windy")}
        </div>}
      </LiquidGlassSurface>
    </>;
  }

  // Fractions of the sweep, which is what the dash pattern is expressed in.
  const fillFrom = isRange ? ratio(low) : 0;
  const fillTo = ratio(isRange ? high : single);
  const [c0, c1, c2] = theme.ring;
  // The dial's ring is a gradient itself, so the knob's glass echoes its two ends
  // rather than the single flat colour a linear slider bar would give it.
  const dialSourceBackground = `linear-gradient(90deg, ${c0}, ${c2}) center / 100% 38% no-repeat,
    radial-gradient(circle at 30% 18%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.28))`;
  const knobs: Array<{ which: Which; value: number }> = isRange
    ? [{ which: "low", value: low }, { which: "high", value: high }]
    : [{ which: "single", value: single }];
  const shown = isRange
    ? `${formatNumber(hass, low, 0)}–${formatNumber(hass, high, 0)}`
    : formatNumber(hass, Math.floor(single), 0);
  const fraction = isRange ? "°" : `.${Math.round((single - Math.floor(single)) * 10)}°`;
  const showFan = config.show_fan_mode !== false;
  const showPreset = config.show_preset_mode !== false;
  const showSwing = config.show_swing_mode === true;

  return <>
    <style>{styles}</style>
    <LiquidGlassSurface
      className="card"
      refraction={refraction}
      variant={config.glass_variant}
      sourceAccent={theme.selectedColor}
      style={{ display: "flex", position: "relative" }}
    >
      {header}

      <div className="dial-row">
        <div
          ref={dialRef}
          className={`dial${drag ? " dragging" : ""}`}
          onPointerDown={(event) => {
            if (off || event.button !== 0) return;
            event.preventDefault();
            event.currentTarget.setPointerCapture?.(event.pointerId);
            startDrag(valueFromDial(event));
          }}
          onPointerMove={(event) => {
            if (!drag) return;
            const value = valueFromDial(event);
            if (value !== drag.value) setDrag({ ...drag, value });
          }}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          <svg
            viewBox={`0 0 ${DIAL} ${DIAL}`}
            style={{ "--ring-glow": theme.glow, "--lg-ring-0": c0, "--lg-ring-1": c1, "--lg-ring-2": c2 } as CSSProperties}
          >
            <defs>
              {/*
                Pinned across the dial rather than to the ends of the filled arc: the design
                draws it that way, and a vector that moved with the fill would swing about
                while the arc animates to its new length.
              */}
              <linearGradient id="ring-grad" gradientUnits="userSpaceOnUse" x1="0" y1={DIAL} x2={DIAL} y2="0">
                <stop offset="0" stopColor="var(--lg-ring-0)" />
                <stop offset="0.55" stopColor="var(--lg-ring-1)" />
                <stop offset="1" stopColor="var(--lg-ring-2)" />
              </linearGradient>
            </defs>
            <path className="ring-track" d={arcPath(START_ANGLE, START_ANGLE + SWEEP)} />
            {/*
              The fill is the whole arc, revealed by the dash pattern. Redrawing a shorter
              path would jump between modes; a dash length interpolates.
              pathLength="1" puts the dash values in fractions of the sweep.
            */}
            <path
              className="ring-fill"
              d={arcPath(START_ANGLE, START_ANGLE + SWEEP)}
              pathLength="1"
              stroke="url(#ring-grad)"
              style={{
                strokeDasharray: `${Math.max(fillTo - fillFrom, 0).toFixed(4)} 1`,
                strokeDashoffset: (-fillFrom).toFixed(4),
                opacity: off ? 0 : 1,
              }}
            />
          </svg>

          {!off && knobs.map(({ which, value }) => {
            const [x, y] = polar(START_ANGLE + ratio(value) * SWEEP);
            // Glass sizes itself to its content when it has no refraction source, so the
            // knob has to state its own size where the library cannot overrule it.
            const knobStyle: CSSProperties = {
              display: "block",
              position: "absolute",
              width: "var(--lg-knob, 30px)",
              height: "var(--lg-knob, 30px)",
              left: `${((x / DIAL) * 100).toFixed(3)}%`,
              top: `${((y / DIAL) * 100).toFixed(3)}%`,
            };
            // Only the knob under the finger lifts and turns to glass.
            const moving = drag ? drag.which === which : !isRange || which === "low";
            return (
              <div key={which}>
                <LiquidGlassSurface
                  className={`dial-knob${moving ? " moving" : ""}`}
                  refraction={refraction}
                  variant={config.glass_variant}
                  surface="control"
                  sourceBackground={dialSourceBackground}
                  style={knobStyle}
                />
                <div className={`dial-knob-cap${moving ? " moving" : ""}`} style={knobStyle} aria-hidden="true" />
              </div>
            );
          })}

          <div className="center">
            <div className="caption">{t(isRange ? "target_range" : "target_temp")}</div>
            <div className={`temp-row${off ? " off" : ""}`}>
              <span className={`target${isRange ? " range" : ""}`}>{shown}</span>
              <span className="fraction">{fraction}</span>
            </div>
            {current !== undefined && <div className="current">
              {t("room_temp")} {formatNumber(hass, current, 1)}°
            </div>}
          </div>

          <div className="minmax">
            <span>{formatNumber(hass, min, 0)}°</span>
            <span>{formatNumber(hass, max, 0)}°</span>
          </div>
        </div>
      </div>

      {modes.length > 0 && <div
        className="segment modes"
        style={{
          "--selected-color": theme.selectedColor,
          "--n": String(modes.length),
          "--i": String(Math.max(modes.indexOf(mode), 0)),
        } as CSSProperties}
      >
        {/*
          One pill that slides between the buttons, rather than a background that appears on
          the newly selected button and vanishes from the old one. Only a single element can
          travel; two cross-fading ones read as a blink. An unlisted mode leaves nothing
          selected, so the pill sits out.
        */}
        <div className="seg-pill" style={{ opacity: modes.includes(mode) ? 1 : 0 }} />
        {modes.map((option) => {
          const meta = modeMeta(option, t);
          return (
            <button
              key={option}
              className={option === mode ? "selected" : undefined}
              onClick={() => call("set_hvac_mode", { hvac_mode: option })}
            >
              <Icon icon={meta.icon} />
              <span>{meta.label}</span>
            </button>
          );
        })}
      </div>}

      {(showFan || showPreset || showSwing) && <div className={`details${off ? " muted" : ""}`}>
        {showFan && detail("fan_mode", "mdi:weather-windy")}
        {showPreset && detail("preset_mode", "mdi:creation")}
        {showSwing && detail("swing_mode", "mdi:arrow-oscillating")}
      </div>}
    </LiquidGlassSurface>
  </>;
}

export const LiquidGlassClimateCard = defineReactCard<ClimateCardConfig>({
  tagName: "liquid-glass-climate-card",
  component: ClimateCard,
  normalizeConfig: (config) => ({ refraction: "auto", theme: "auto", ...config }),
  getCardSize: () => 6,
  getConfigElement: async () => {
    await loadHaFormComponents();
    return document.createElement("liquid-glass-card-editor");
  },
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(["climate"], hass, entities, entitiesFallback),
  }),
});
