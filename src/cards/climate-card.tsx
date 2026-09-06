import { useEffect, useLayoutEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";
import { Glass, deriveGlass, glassValue, useLensWobble } from "@samasante/liquid-glass";
import { createTranslator, type Translator } from "../i18n";
import { Badge, CardTitle, IconWell, UnavailableCard, type BadgeStyle, type WellStyle } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { glassSurfaceStyles, Icon, LiquidGlassSurface } from "../react/glass-primitives";
import { GlassSegmentedControl, glassSegmentedControlStyles } from "../react/glass-segmented-control";
import {
  GlassSlider,
  GLASS_SLIDER_COLLAPSE_ANIM,
  GLASS_SLIDER_EXPAND_ANIM,
  glassSliderStyles,
  useGlassSliderOptics,
} from "../react/glass-slider";
import { animateGlass, holdWobble } from "../react/reduced-motion";
import { useCardHost } from "../react/use-card-host";
import { useOptimisticRecord } from "../react/use-optimistic-value";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { clamp, formatNumber, friendlyName, isUnavailable, moreInfo, pickEntity } from "../utils";

export interface ClimateCardConfig extends BaseCardConfig {
  /** Visual treatment. The original dial remains the default for backwards compatibility. */
  design?: "classic" | "compact" | "a";
  show_fan_mode?: boolean;
  show_preset_mode?: boolean;
  show_swing_mode?: boolean;
  hvac_modes?: string[];
  /** Override the dial/slider range. Defaults to the entity's own min_temp / max_temp. */
  min_temp?: number;
  max_temp?: number;
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
const DIAL_THUMB_WIDTH = 22;
const DIAL_THUMB_HEIGHT = 34;
const DIAL_LENS_PAD = 28;

const polar = (deg: number, r = RADIUS): [number, number] => {
  const rad = (deg * Math.PI) / 180;
  return [DIAL / 2 + r * Math.cos(rad), DIAL / 2 + r * Math.sin(rad)];
};

interface DialGlassThumbProps {
  id: Which;
  x: number;
  y: number;
  rotation: number;
  motionPosition: number;
  active: boolean;
  refraction: boolean;
  scheme: "light" | "dark";
  sourceBackground: string;
  label: string;
  value: number;
  min: number;
  max: number;
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}

/** A circular-track thumb driven by the same lens recipe and motion as GlassSlider. */
function DialGlassThumb({
  id,
  x,
  y,
  rotation,
  motionPosition,
  active,
  refraction,
  scheme,
  sourceBackground,
  label,
  value,
  min,
  max,
  onKeyDown,
}: DialGlassThumbProps) {
  const optics = useGlassSliderOptics(refraction, scheme);
  const dialOptics = useMemo(() => ({
    ...optics,
    edgeShadow: "",
    edgeInsetShadow: "",
    restEdgeShadow: "",
    restEdgeInsetShadow: "",
  }), [optics]);
  const motion = useMemo(() => {
    const position = glassValue(motionPosition);
    const halfW = glassValue(DIAL_THUMB_WIDTH / 2);
    const halfH = glassValue(DIAL_THUMB_HEIGHT / 2);
    const radius = glassValue(DIAL_THUMB_WIDTH / 2);
    const tintOpacity = glassValue(1);
    const stretch = glassValue(0);
    const lensW = deriveGlass(
      [halfW, stretch],
      () => halfW.get() * (1 - 0.2 * stretch.get()) * 2,
    );
    const lensH = deriveGlass(
      [halfH, stretch],
      () => halfH.get() * (1 + 0.4 * stretch.get()) * 2,
    );
    return {
      position,
      halfW,
      halfH,
      radius,
      tintOpacity,
      stretch,
      lensW,
      lensH,
    };
    /*
     * Seeded once on purpose. The layout effect below pushes later positions in, and
     * rebuilding these values would restart every animation mid-drag.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const holdRef = useRef(0);
  const kickWobbleRef = useRef<() => void>(() => {});
  const activeRef = useRef(false);
  const idleWobblePosition = useMemo(() => glassValue(0), []);
  useLensWobble(refraction ? motion.position : idleWobblePosition, motion.stretch, holdRef, kickWobbleRef);

  useLayoutEffect(() => {
    if (motion.position.get() !== motionPosition) motion.position.set(motionPosition);
  }, [motion, motionPosition]);

  useEffect(() => {
    if (!refraction) return;
    if (active === activeRef.current) return;
    activeRef.current = active;
    if (active) {
      animateGlass(motion.halfW, 1.5 * DIAL_THUMB_WIDTH / 2, GLASS_SLIDER_EXPAND_ANIM);
      animateGlass(motion.halfH, 1.5 * DIAL_THUMB_HEIGHT / 2, GLASS_SLIDER_EXPAND_ANIM);
      animateGlass(motion.radius, 1.5 * DIAL_THUMB_WIDTH / 2, GLASS_SLIDER_EXPAND_ANIM);
      animateGlass(motion.tintOpacity, 0, GLASS_SLIDER_EXPAND_ANIM);
      holdWobble(holdRef, kickWobbleRef);
    } else {
      holdRef.current = 0;
      animateGlass(motion.halfW, DIAL_THUMB_WIDTH / 2, GLASS_SLIDER_COLLAPSE_ANIM);
      animateGlass(motion.halfH, DIAL_THUMB_HEIGHT / 2, GLASS_SLIDER_COLLAPSE_ANIM);
      animateGlass(motion.radius, DIAL_THUMB_WIDTH / 2, GLASS_SLIDER_COLLAPSE_ANIM);
      animateGlass(motion.tintOpacity, 1, GLASS_SLIDER_COLLAPSE_ANIM);
    }
  }, [active, motion, refraction]);

  const surfaceWidth = DIAL_THUMB_WIDTH + DIAL_LENS_PAD * 2;
  const surfaceHeight = DIAL_THUMB_HEIGHT + DIAL_LENS_PAD * 2;
  return (
    <div
      className={`dial-glass-thumb-position${active ? " active" : ""}`}
      data-dial-glass-thumb={id}
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      onKeyDown={onKeyDown}
      style={{
        left: `${(x * 100).toFixed(3)}%`,
        top: `${(y * 100).toFixed(3)}%`,
        width: surfaceWidth,
        height: surfaceHeight,
        transform: "translate(-50%, -50%)",
        "--dial-thumb-rotation": `${rotation.toFixed(3)}deg`,
      } as CSSProperties}
    >
      {refraction ? <Glass
        className="dial-glass-lens"
        optics={dialOptics}
        center={{ x: 0.5, y: 0.5 }}
        size={[motion.lensW, motion.lensH]}
        radius={motion.radius}
        unstable_lens={{
          tintColor: "var(--lg-knob-solid)",
          tintOpacity: motion.tintOpacity,
        }}
        // A supersampled refraction surface is twice this box's dimensions. Rotating
        // that internal copy gives it a different centre from the tint layer.
        filterResolution={1}
        behind={scheme === "dark" ? "#1f1f24" : "#ffffff"}
        style={{ width: surfaceWidth, height: surfaceHeight }}
        refract={(
          <div
            className="dial-refraction-source"
            aria-hidden="true"
            style={{ width: "100%", height: "100%", background: sourceBackground }}
          />
        )}
      /> : <div className="dial-thumb-static" aria-hidden="true" />}
    </div>
  );
}

function arcPath(fromDeg: number, toDeg: number): string {
  const [x1, y1] = polar(fromDeg);
  const [x2, y2] = polar(toDeg);
  const large = toDeg - fromDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 ${large} 1 ${x2} ${y2}`;
}

const ownStyles = `
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
  .dial-glass-thumb-position {
    position: absolute !important;
    z-index: 1;
    transform-origin: center;
    pointer-events: none !important;
  }
  .dial-glass-thumb-position:focus-visible {
    outline: 2px solid var(--lg-cool-deep);
    outline-offset: -20px;
  }
  .dial-glass-lens {
    position: absolute !important;
    inset: 0;
    overflow: visible !important;
    pointer-events: none !important;
  }
  .dial-thumb-static {
    position: absolute;
    left: 50%;
    top: 50%;
    width: ${DIAL_THUMB_WIDTH}px;
    height: ${DIAL_THUMB_HEIGHT}px;
    border-radius: ${DIAL_THUMB_WIDTH / 2}px;
    transform: translate(-50%, -50%) rotate(var(--dial-thumb-rotation));
    background: var(--lg-knob-solid);
    box-shadow: var(--lg-knob-shadow), inset 0 0 0 1px var(--lg-knob-solid-rim);
    transition: transform 120ms ease;
  }
  .dial-glass-thumb-position.active .dial-thumb-static {
    transform: translate(-50%, -50%) rotate(var(--dial-thumb-rotation)) scale(1.08);
  }
  /* Keep the measured Glass box axis-aligned. Rotating an ancestor changes its
     bounding rect, which makes the lens engine calculate an offset centre. */
  .dial-glass-lens > div:nth-child(2),
  .dial-glass-lens > div:nth-child(3) {
    transform-origin: center;
    rotate: var(--dial-thumb-rotation);
  }
  /* The arc and lens both follow the pointer without an eased position lag. */
  .dial.dragging .ring-fill {
    transition: none;
  }
  .center {
    position: absolute;
    z-index: 2;
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
    z-index: 2;
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
    --lg-slider-bar-height: var(--lg-tile-bar-h, 6px);
    --lg-slider-knob-size: var(--lg-tile-knob, 22px);
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
  @supports (container-type: inline-size) {
    .card {
      --lg-temp: clamp(34px, 14.2cqi, 54px);
      --lg-temp-range: clamp(26px, 10.5cqi, 40px);
      --lg-temp-fraction: clamp(15px, 5.8cqi, 22px);
    }
    .card.climate-compact {
      --lg-tile-row-h: clamp(34px, 11.6cqi, 44px);
      --lg-tile-bar-h: clamp(5px, 1.6cqi, 6px);
      --lg-tile-knob: clamp(18px, 5.8cqi, 22px);
      --lg-tile-temp: clamp(38px, 14.7cqi, 56px);
      --lg-tile-range: clamp(28px, 10.5cqi, 40px);
      --lg-tile-fraction: clamp(17px, 6.3cqi, 24px);
      --lg-tile-room: clamp(13px, 4.5cqi, 17px);
    }
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
  const { isDark, refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const [drag, setDrag] = useState<{ which: Which; value: number }>();
  /**
   * What was just sent, held until the entity reports it back. Without this the dial would
   * fall back to the old attribute the moment the finger lifts, and then animate from there
   * to the new value once Home Assistant answers — a bounce the user never asked for.
   */
  const dialRef = useRef<HTMLDivElement>(null);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = config.name ?? friendlyName(entity, config.entity ?? "");
  const attributes = entity?.attributes ?? {};

  const step = (attributes.target_temp_step as number | undefined) ?? 0.5;
  const setpoints: Pending = {
    single: attributes.temperature as number | undefined,
    low: attributes.target_temp_low as number | undefined,
    high: attributes.target_temp_high as number | undefined,
  };
  const held = useOptimisticRecord<Which>(setpoints, Math.max(step / 2, 0.01), PENDING_MS);

  if (!entity || isUnavailable(entity)) {
    return <>
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
    config.min_temp ?? (attributes.min_temp as number | undefined) ?? 7,
    config.max_temp ?? (attributes.max_temp as number | undefined) ?? 35,
  ];
  const [min, max] = range;
  const isRange = mode === "heat_cool" && attributes.target_temp_low !== undefined;
  const ratio = (value: number): number => clamp((value - min) / (max - min || 1), 0, 1);
  // The finger wins, then whatever was just sent, then what the entity reports.
  const shownValue = (key: Which, fallback: number): number =>
    drag?.which === key ? drag.value : held.value(key, fallback);
  const single = shownValue("single", min);
  const low = shownValue("low", min);
  const high = shownValue("high", max);
  const theme = themeFor(mode, t);
  const modes = (config.hvac_modes ?? (attributes.hvac_modes as string[] | undefined) ?? []).filter(Boolean);
  const compact = config.design === "compact" || config.design === "a";
  const current = attributes.current_temperature as number | undefined;

  const hold = held.hold;

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

  const changeFromKeyboard = (which: Which, event: KeyboardEvent<HTMLDivElement>) => {
    const lower = which === "high" ? low + step : min;
    const upper = which === "low" && isRange ? high - step : max;
    let next = which === "low" ? low : which === "high" ? high : single;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") next += step;
    else if (event.key === "ArrowLeft" || event.key === "ArrowDown") next -= step;
    else if (event.key === "Home") next = lower;
    else if (event.key === "End") next = upper;
    else return;
    event.preventDefault();
    event.stopPropagation();
    commit(which, clamp(next, lower, upper));
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
          scheme={isDark ? "dark" : "light"}
          label={isRange ? t("target_range") : t("target_temp")}
          rangeLabels={[`${t("target_temp")} ${t("ed_min")}`, `${t("target_temp")} ${t("ed_max")}`]}
          onInput={(next, handle) => setDrag({ which: isRange ? handle : "single", value: next })}
          onChange={(next, handle) => {
            const which = isRange ? handle : "single";
            setDrag(undefined);
            commit(which, next);
          }}
        />

        {modes.length > 0 && <GlassSegmentedControl
          className="tile-modes"
          compact
          items={modes.map((option) => {
            const meta = modeMeta(option, t);
            return {
              value: option,
              label: meta.label,
              // The compact source artwork uses plain circular arrows, without an A.
              icon: option === "auto" ? "mdi:refresh" : meta.icon,
            };
          })}
          value={mode}
          selectedColor={theme.selectedColor}
          refraction={refraction}
          scheme={isDark ? "dark" : "light"}
          onValueChange={(option) => call("set_hvac_mode", { hvac_mode: option })}
        />}

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
    radial-gradient(circle at 30% 18%, rgba(255, 255, 255, 0.42), transparent 34px)`;
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
            const angle = START_ANGLE + ratio(value) * SWEEP;
            const [x, y] = polar(angle);
            return (
              <DialGlassThumb
                key={which}
                id={which}
                x={x / DIAL}
                y={y / DIAL}
                rotation={angle - 90}
                motionPosition={ratio(value) * DIAL}
                active={drag?.which === which}
                refraction={refraction}
                scheme={isDark ? "dark" : "light"}
                sourceBackground={dialSourceBackground}
                label={isRange
                  ? `${t("target_temp")} ${t(which === "low" ? "ed_min" : "ed_max")}`
                  : t("target_temp")}
                value={value}
                min={which === "high" ? low + step : min}
                max={which === "low" && isRange ? high - step : max}
                onKeyDown={(event) => changeFromKeyboard(which, event)}
              />
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

      {modes.length > 0 && <GlassSegmentedControl
        className="segment modes"
        items={modes.map((option) => ({ value: option, ...modeMeta(option, t) }))}
        value={mode}
        selectedColor={theme.selectedColor}
        refraction={refraction}
        scheme={isDark ? "dark" : "light"}
        onValueChange={(option) => call("set_hvac_mode", { hvac_mode: option })}
      />}

      {(showFan || showPreset || showSwing) && <div className={`details${off ? " muted" : ""}`}>
        {showFan && detail("fan_mode", "mdi:weather-windy")}
        {showPreset && detail("preset_mode", "mdi:creation")}
        {showSwing && detail("swing_mode", "mdi:arrow-oscillating")}
      </div>}
    </LiquidGlassSurface>
  </>;
}

export const LiquidGlassClimateCard = defineLiquidGlassCard<ClimateCardConfig>({
  tagName: "liquid-glass-climate-card",
  component: ClimateCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, glassSliderStyles, glassSegmentedControlStyles, ownStyles],
  getCardSize: () => 6,
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(["climate"], hass, entities, entitiesFallback),
  }),
});
