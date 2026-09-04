import { html, css, nothing } from "lit";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { LiquidGlassBaseCard, type BadgeStyle, type IconWellStyle } from "../base-card";
import { tokens } from "../styles/tokens";
import { glassStyles } from "../styles/glass";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { clamp, formatNumber, isUnavailable, pickEntity } from "../utils";

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
  well?: IconWellStyle;
  badge?: BadgeStyle;
  ring: [string, string, string];
  glow: string;
  selectedColor: string;
}

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

/**
 * Climate card: 270° liquid-glass dial with a draggable knob (two knobs in heat_cool),
 * mode segment, and fan / preset detail dropdowns.
 */
export class LiquidGlassClimateCard extends LiquidGlassBaseCard<ClimateCardConfig> {
  @state() private drag: { which: "low" | "high" | "single"; value: number } | undefined;
  /**
   * What was just sent, held until the entity reports it back. Without this the dial would
   * fall back to the old attribute the moment the finger lifts, and then animate from there
   * to the new value once Home Assistant answers — a bounce the user never asked for.
   */
  @state() private pending: Partial<Record<"single" | "low" | "high", number>> | undefined;
  private pendingTimer: number | undefined;

  static override styles = [
    tokens,
    glassStyles,
    css`
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
      .dial-knob {
        position: absolute;
        width: var(--lg-knob, 30px);
        height: var(--lg-knob, 30px);
        transform: translate(-50%, -50%);
        cursor: grab;
        transition: left 0.45s cubic-bezier(0.3, 0.8, 0.3, 1), top 0.45s cubic-bezier(0.3, 0.8, 0.3, 1), transform 0.12s ease;
      }
      /* Anything that eased towards the finger would feel like lag, so while a drag is in
         flight the knob and the arc track the pointer exactly. */
      .dial.dragging .dial-knob {
        transition: transform 0.12s ease;
      }
      .dial.dragging .ring-fill {
        transition: none;
      }
      .dial-knob:active {
        cursor: grabbing;
        transform: translate(-50%, -50%) scale(1.08);
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
      .tile-track {
        position: relative;
        width: 100%;
        height: 40px;
        overflow: hidden;
        border-radius: 20px;
        background: var(--lg-track-bg);
        box-shadow:
          0 2px 4px rgba(0, 0, 0, 0.14),
          inset 0 0 0 1px var(--lg-glass-stroke);
        cursor: pointer;
        touch-action: none;
        user-select: none;
        -webkit-user-select: none;
      }
      .tile-track.off {
        cursor: default;
      }
      .tile-gradient {
        position: absolute;
        inset: 0;
        background: linear-gradient(90deg, #5ac8fa 0%, #ffd9a0 35%, #ff9f0a 62%, #ff2d55 100%);
        clip-path: inset(0 var(--clip-right) 0 var(--clip-left));
        transition: clip-path 0.35s cubic-bezier(0.3, 0.8, 0.3, 1), opacity 0.25s ease;
        pointer-events: none;
      }
      .tile-track.dragging .tile-gradient,
      .tile-track.dragging .tile-thumb {
        transition: none;
      }
      .room-marker {
        position: absolute;
        top: 9px;
        left: calc(var(--room) * 100%);
        width: 3px;
        height: 22px;
        border-radius: 2px;
        background: #fff;
        transform: translateX(-50%);
        pointer-events: none;
      }
      .tile-thumb {
        position: absolute;
        top: 4px;
        left: calc(var(--value) * 100%);
        width: 32px;
        height: 32px;
        transform: translateX(-50%);
        transition: left 0.35s cubic-bezier(0.3, 0.8, 0.3, 1), transform 0.12s ease;
        pointer-events: none;
      }
      .tile-track.dragging .tile-thumb {
        transform: translateX(-50%) scale(1.06);
      }
      .tile-ticks {
        display: flex;
        justify-content: space-between;
        padding: 0 6px;
        color: var(--lg-text-secondary);
        font-family: var(--lg-font-ui);
        font-size: var(--lg-tick);
        font-weight: 500;
        letter-spacing: -0.2px;
      }
      .tile-modes {
        position: relative;
        display: flex;
        gap: 2px;
        padding: 3px;
        border-radius: 25px;
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
        border-radius: 22px;
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
        height: 44px;
        display: grid;
        place-items: center;
        padding: 0;
        border: 0;
        border-radius: 22px;
        color: var(--lg-text-secondary);
        background: transparent;
        cursor: pointer;
      }
      .tile-modes lg-icon {
        --mdc-icon-size: 19px;
        width: 19px;
        height: 19px;
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
    `,
  ];

  static override getStubConfig(hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) {
    return { entity: pickEntity(["climate"], hass, entities, entitiesFallback) };
  }

  override getCardSize(): number {
    return 6;
  }

  private get mode(): string {
    return this.entity?.state ?? "off";
  }

  private get step(): number {
    return (this.entity?.attributes.target_temp_step as number | undefined) ?? 0.5;
  }

  private get range(): [number, number] {
    const a = this.entity?.attributes;
    return [(a?.min_temp as number | undefined) ?? 7, (a?.max_temp as number | undefined) ?? 35];
  }

  private get isRange(): boolean {
    return this.mode === "heat_cool" && this.entity?.attributes.target_temp_low !== undefined;
  }

  private ratio(value: number): number {
    const [min, max] = this.range;
    return clamp((value - min) / (max - min || 1), 0, 1);
  }

  private theme(): ModeTheme {
    const t = this.t;
    const mode = this.mode;
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
        return { icon: "mdi:power", label: t("mode_off"), ring: [white, white, white], glow: "transparent", selectedColor: "var(--lg-text-primary)" };
    }
  }

  private modeMeta(mode: string): { icon: string; label: string } {
    const map: Record<string, string> = {
      auto: "mdi:refresh-auto",
      heat_cool: "mdi:sun-snowflake-variant",
      cool: "mdi:snowflake",
      heat: "mdi:fire",
      dry: "mdi:water-percent",
      fan_only: "mdi:fan",
      off: "mdi:power",
    };
    return { icon: map[mode] ?? "mdi:thermostat", label: this.t(`mode_${mode}`) };
  }

  private actionText(): string {
    const t = this.t;
    const action = this.entity?.attributes.hvac_action as string | undefined;
    if (this.mode === "off") return t("mode_off");
    switch (action) {
      case "heating":
        return t("heating");
      case "cooling":
        return t("cooling");
      case "drying":
        return t("drying");
      case "fan":
        return t("fan_running");
      case "idle":
        return t("idle");
      default:
        return this.theme().label;
    }
  }

  private stateText(): string {
    const a = this.entity?.attributes ?? {};
    const parts = [this.actionText()];
    if (a.current_temperature !== undefined) parts.push(`${this.t("room_temp")} ${formatNumber(this.hass, a.current_temperature as number, 1)}°`);
    if (a.current_humidity !== undefined) parts.push(`${this.t("humidity")} ${formatNumber(this.hass, a.current_humidity as number, 0)}%`);
    return parts.join(" · ");
  }

  /** The compact slider moves the room temperature into the large readout row. */
  private tileStateText(): string {
    const a = this.entity?.attributes ?? {};
    const parts = [this.actionText()];
    if (a.current_humidity !== undefined) parts.push(`${this.t("humidity")} ${formatNumber(this.hass, a.current_humidity as number, 0)}%`);
    return parts.join(" · ");
  }

  private shownValue(key: "single" | "low" | "high", reported: number | undefined, fallback: number): number {
    return this.drag?.which === key ? this.drag.value : this.pending?.[key] ?? reported ?? fallback;
  }

  private valueFromPointer(e: PointerEvent): number {
    const dial = this.shadowRoot?.querySelector(".dial") as HTMLElement | null;
    if (!dial) return 0;
    const rect = dial.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    let deg = (Math.atan2(dy, dx) * 180) / Math.PI;
    deg = (((deg - START_ANGLE) % 360) + 360) % 360;
    if (deg > SWEEP) deg = deg > SWEEP + (360 - SWEEP) / 2 ? 0 : SWEEP;
    const [min, max] = this.range;
    const raw = min + (deg / SWEEP) * (max - min);
    return clamp(Math.round(raw / this.step) * this.step, min, max);
  }

  private valueFromTilePointer(e: PointerEvent): number {
    const track = this.shadowRoot?.querySelector(".tile-track") as HTMLElement | null;
    if (!track) return this.range[0];
    const rect = track.getBoundingClientRect();
    const ratio = clamp((e.clientX - rect.left) / Math.max(rect.width, 1), 0, 1);
    const [min, max] = this.range;
    return clamp(Math.round((min + ratio * (max - min)) / this.step) * this.step, min, max);
  }

  private onDialDown = (e: PointerEvent) => {
    if (this.mode === "off" || e.button !== 0) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const v = this.valueFromPointer(e);
    let which: "low" | "high" | "single" = "single";
    if (this.isRange) {
      const low = this.entity!.attributes.target_temp_low as number;
      const high = this.entity!.attributes.target_temp_high as number;
      which = Math.abs(v - low) <= Math.abs(v - high) ? "low" : "high";
    }
    this.drag = { which, value: v };
  };

  private onDialMove = (e: PointerEvent) => {
    if (!this.drag) return;
    const v = this.valueFromPointer(e);
    if (v !== this.drag.value) this.drag = { ...this.drag, value: v };
  };

  private onTileDown = (e: PointerEvent) => {
    if (this.mode === "off" || e.button !== 0) return;
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const value = this.valueFromTilePointer(e);
    let which: "low" | "high" | "single" = "single";
    if (this.isRange) {
      const a = this.entity!.attributes;
      const low = this.shownValue("low", a.target_temp_low as number | undefined, this.range[0]);
      const high = this.shownValue("high", a.target_temp_high as number | undefined, this.range[1]);
      which = Math.abs(value - low) <= Math.abs(value - high) ? "low" : "high";
    }
    this.drag = { which, value };
  };

  private onTileMove = (e: PointerEvent) => {
    if (!this.drag) return;
    const value = this.valueFromTilePointer(e);
    if (value !== this.drag.value) this.drag = { ...this.drag, value };
  };

  private onTileKeyDown = (e: KeyboardEvent) => {
    if (this.mode === "off" || this.isRange) return;
    const [min, max] = this.range;
    const reported = this.entity?.attributes.temperature as number | undefined;
    let value = this.shownValue("single", reported, min);
    if (e.key === "ArrowRight" || e.key === "ArrowUp") value += this.step;
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") value -= this.step;
    else if (e.key === "Home") value = min;
    else if (e.key === "End") value = max;
    else return;
    e.preventDefault();
    this.drag = { which: "single", value: clamp(value, min, max) };
    this.onDialUp();
  };

  private onDialUp = () => {
    if (!this.drag) return;
    const { which, value } = this.drag;
    this.drag = undefined;
    const a = this.entity?.attributes ?? {};
    // The knobs cannot cross, so a range end is clamped before it is sent — and what is
    // held has to be what was sent, not what the finger asked for.
    let sent = value;
    if (which === "single") this.callService("climate", "set_temperature", { temperature: value });
    else if (which === "low") {
      sent = Math.min(value, (a.target_temp_high as number) - this.step);
      this.callService("climate", "set_temperature", { target_temp_low: sent, target_temp_high: a.target_temp_high });
    } else {
      sent = Math.max(value, (a.target_temp_low as number) + this.step);
      this.callService("climate", "set_temperature", { target_temp_low: a.target_temp_low, target_temp_high: sent });
    }
    this.hold(which, sent);
  };

  private hold(which: "single" | "low" | "high", value: number): void {
    this.pending = { ...this.pending, [which]: value };
    window.clearTimeout(this.pendingTimer);
    // A service call that never lands would otherwise freeze the dial on a value the
    // thermostat never took.
    this.pendingTimer = window.setTimeout(() => (this.pending = undefined), PENDING_MS);
  }

  /** True once the entity reports something close enough to what is being held. */
  private settled(key: "single" | "low" | "high", reported: number | undefined): boolean {
    const want = this.pending?.[key];
    if (want === undefined) return true;
    if (reported === undefined) return false;
    return Math.abs(reported - want) <= Math.max(this.step / 2, 0.01);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this.pendingTimer);
  }

  protected override updated(): void {
    if (!this.pending) return;
    const a = this.entity?.attributes ?? {};
    const done =
      this.settled("single", a.temperature as number | undefined) &&
      this.settled("low", a.target_temp_low as number | undefined) &&
      this.settled("high", a.target_temp_high as number | undefined);
    if (done) {
      window.clearTimeout(this.pendingTimer);
      this.pending = undefined;
    }
  }

  private renderDial(theme: ModeTheme) {
    const a = this.entity!.attributes;
    const off = this.mode === "off";
    const t = this.t;
    const [min, max] = this.range;
    // The finger wins, then whatever was just sent, then what the entity reports.
    const single = this.shownValue("single", a.temperature as number | undefined, min);
    const low = this.shownValue("low", a.target_temp_low as number | undefined, min);
    const high = this.shownValue("high", a.target_temp_high as number | undefined, max);
    const isRange = this.isRange;

    const fillFrom = isRange ? START_ANGLE + this.ratio(low) * SWEEP : START_ANGLE;
    const fillTo = START_ANGLE + this.ratio(isRange ? high : single) * SWEEP;
    const [c0, c1, c2] = theme.ring;
    // Fractions of the sweep, which is what the dash pattern is expressed in.
    const from = (fillFrom - START_ANGLE) / SWEEP;
    const to = (fillTo - START_ANGLE) / SWEEP;

    const knobs = isRange ? [low, high] : [single];
    const shown = isRange ? formatNumber(this.hass, low, 0) + "–" + formatNumber(this.hass, high, 0) : formatNumber(this.hass, Math.floor(single), 0);
    const fraction = isRange ? "°" : `.${Math.round((single - Math.floor(single)) * 10)}°`;

    return html`<div class="dial-row">
      <div class=${classMap({ dial: true, dragging: this.drag !== undefined })} @pointerdown=${this.onDialDown} @pointermove=${this.onDialMove} @pointerup=${this.onDialUp} @pointercancel=${this.onDialUp}>
        <svg
          viewBox="0 0 ${DIAL} ${DIAL}"
          style=${styleMap({ "--ring-glow": theme.glow, "--lg-ring-0": c0, "--lg-ring-1": c1, "--lg-ring-2": c2 })}
        >
          <defs>
            <!--
              Pinned across the dial rather than to the ends of the filled arc: the design
              draws it that way, and a vector that moved with the fill would swing about
              while the arc animates to its new length.
            -->
            <linearGradient id="ring-grad" gradientUnits="userSpaceOnUse" x1="0" y1=${DIAL} x2=${DIAL} y2="0">
              <stop offset="0" stop-color="var(--lg-ring-0)" />
              <stop offset="0.55" stop-color="var(--lg-ring-1)" />
              <stop offset="1" stop-color="var(--lg-ring-2)" />
            </linearGradient>
          </defs>
          <path class="ring-track" d=${arcPath(START_ANGLE, START_ANGLE + SWEEP)} />
          <!--
            The fill is the whole arc, revealed by the dash pattern. Redrawing a shorter
            path would jump between modes; a dash length interpolates.
            pathLength="1" puts the dash values in fractions of the sweep.
          -->
          <path
            class="ring-fill"
            d=${arcPath(START_ANGLE, START_ANGLE + SWEEP)}
            pathLength="1"
            stroke="url(#ring-grad)"
            style=${styleMap({
              strokeDasharray: `${Math.max(to - from, 0).toFixed(4)} 1`,
              strokeDashoffset: (-from).toFixed(4),
              opacity: off ? "0" : "1",
            })}
          />
        </svg>
        ${off ? nothing : knobs.map((v) => this.renderKnobAt(v))}
        <div class="center">
          <div class="caption">${t(isRange ? "target_range" : "target_temp")}</div>
          <div class=${classMap({ "temp-row": true, off })}>
            <span class=${classMap({ target: true, range: isRange })}>${shown}</span><span class="fraction">${fraction}</span>
          </div>
          ${a.current_temperature !== undefined
            ? html`<div class="current">${t("room_temp")} ${formatNumber(this.hass, a.current_temperature as number, 1)}°</div>`
            : nothing}
        </div>
        <div class="minmax"><span>${formatNumber(this.hass, min, 0)}°</span><span>${formatNumber(this.hass, max, 0)}°</span></div>
      </div>
    </div>`;
  }

  private renderKnobAt(value: number) {
    const deg = START_ANGLE + this.ratio(value) * SWEEP;
    const [x, y] = polar(deg);
    return html`<div
      class="dial-knob knob"
      style=${styleMap({ left: `${((x / DIAL) * 100).toFixed(3)}%`, top: `${((y / DIAL) * 100).toFixed(3)}%` })}
    ></div>`;
  }

  private renderDetail(kind: "fan_mode" | "preset_mode" | "swing_mode", icon: string) {
    const a = this.entity!.attributes;
    const options = a[`${kind}s`] as string[] | undefined;
    const current = a[kind] as string | undefined;
    if (!options?.length) return nothing;
    return html`<div class="detail">
      <lg-icon .icon=${icon}></lg-icon>
      <div class="text">
        <span class="dl">${this.t(kind === "preset_mode" ? "preset" : kind)}</span>
        <span class="dv">${current ?? "—"}</span>
      </div>
      <lg-icon icon="mdi:chevron-down"></lg-icon>
      <select .value=${current ?? ""} @change=${(e: Event) => this.callService("climate", `set_${kind}`, { [kind]: (e.target as HTMLSelectElement).value })}>
        ${options.map((o) => html`<option value=${o} ?selected=${o === current}>${o}</option>`)}
      </select>
    </div>`;
  }

  private tileSelectedColor(): string {
    switch (this.mode) {
      case "heat":
        return "var(--lg-heat-deep)";
      case "cool":
        return "var(--lg-cool-deep)";
      case "dry":
        return "#0A7EA4";
      case "fan_only":
        return "#5C6B82";
      case "heat_cool":
      case "auto":
        return "#1E9E4A";
      default:
        return "var(--lg-text-primary)";
    }
  }

  private tileModeMeta(mode: string): { icon: string; label: string } {
    const meta = this.modeMeta(mode);
    // The compact source artwork uses the plain circular-arrows glyph, without an A.
    return mode === "auto" ? { ...meta, icon: "mdi:refresh" } : meta;
  }

  private targetParts(value: number): { number: string; fraction: string } {
    const [whole, fraction] = (Math.round(value * 10) / 10).toFixed(1).split(".");
    return {
      number: formatNumber(this.hass, Number(whole), 0),
      fraction: `.${fraction}°`,
    };
  }

  private renderCompact(theme: ModeTheme, modes: string[]) {
    const a = this.entity!.attributes;
    const off = this.mode === "off";
    const [min, max] = this.range;
    const single = this.shownValue("single", a.temperature as number | undefined, min);
    const low = this.shownValue("low", a.target_temp_low as number | undefined, min);
    const high = this.shownValue("high", a.target_temp_high as number | undefined, max);
    const isRange = this.isRange;
    const from = isRange ? this.ratio(low) : 0;
    const to = this.ratio(isRange ? high : single);
    const current = a.current_temperature as number | undefined;
    const parts = this.targetParts(single);
    const selected = this.tileSelectedColor();

    return html`${this.renderDefs()}
      <div class="glass card climate-compact">
        <div class="header">
          ${this.renderIconWell(this.config.icon ?? theme.icon, theme.well)}
          ${this.renderTitle(this.entityName, this.tileStateText())}
          ${this.renderBadge(theme.label, theme.badge)}
        </div>

        <div class="tile-readout">
          <div class=${classMap({ "tile-target": true, range: isRange, off })}>
            <span class="number">${isRange ? `${formatNumber(this.hass, low, 0)}–${formatNumber(this.hass, high, 0)}` : parts.number}</span>
            <span class="fraction">${isRange ? "°" : parts.fraction}</span>
          </div>
          ${current === undefined
            ? nothing
            : html`<div class="tile-room">
                <span class="caption">${this.t("room_temp")}</span>
                <span class="value">${formatNumber(this.hass, current, 1)}°</span>
              </div>`}
        </div>

        <div
          class=${classMap({ "tile-track": true, dragging: this.drag !== undefined, off })}
          style=${styleMap({
            "--clip-left": `${from * 100}%`,
            "--clip-right": `${(1 - to) * 100}%`,
            "--room": String(current === undefined ? 0 : this.ratio(current)),
          })}
          role="slider"
          tabindex=${off ? -1 : 0}
          aria-valuemin=${min}
          aria-valuemax=${max}
          aria-valuenow=${isRange ? nothing : single}
          aria-valuetext=${isRange ? `${low}–${high}` : String(single)}
          aria-disabled=${off}
          @pointerdown=${this.onTileDown}
          @pointermove=${this.onTileMove}
          @pointerup=${this.onDialUp}
          @pointercancel=${this.onDialUp}
          @keydown=${this.onTileKeyDown}
        >
          <div class="tile-gradient" style=${styleMap({ opacity: off ? "0" : "1" })}></div>
          ${off || current === undefined ? nothing : html`<div class="room-marker"></div>`}
          ${off
            ? nothing
            : (isRange ? [low, high] : [single]).map(
                (value) => html`<div class="knob tile-thumb" style=${styleMap({ "--value": String(this.ratio(value)) })}></div>`,
              )}
        </div>

        <div class="tile-ticks"><span>${formatNumber(this.hass, min, 0)}°</span><span>${formatNumber(this.hass, max, 0)}°</span></div>

        ${modes.length
          ? html`<div
              class="tile-modes"
              style=${styleMap({ "--selected-color": selected, "--n": String(modes.length), "--i": String(Math.max(modes.indexOf(this.mode), 0)) })}
            >
              <div class="tile-mode-pill" style=${styleMap({ opacity: modes.includes(this.mode) ? "1" : "0" })}></div>
              ${modes.map((mode) => {
                const meta = this.tileModeMeta(mode);
                return html`<button
                  class=${classMap({ selected: mode === this.mode })}
                  title=${meta.label}
                  aria-label=${meta.label}
                  aria-pressed=${mode === this.mode}
                  @click=${() => this.callService("climate", "set_hvac_mode", { hvac_mode: mode })}
                >
                  <lg-icon .icon=${meta.icon}></lg-icon>
                </button>`;
              })}
            </div>`
          : nothing}

        ${this.config.show_fan_mode === true
          ? html`<div class=${classMap({ details: true, muted: off })}>${this.renderDetail("fan_mode", "mdi:weather-windy")}</div>`
          : nothing}
      </div>`;
  }

  override render() {
    const entity = this.entity;
    if (!entity || isUnavailable(entity)) return this.renderUnavailable();
    const theme = this.theme();
    const off = this.mode === "off";
    const modes = (this.config.hvac_modes ?? (entity.attributes.hvac_modes as string[] | undefined) ?? []).filter(Boolean);
    const showFan = this.config.show_fan_mode !== false;
    const showPreset = this.config.show_preset_mode !== false;
    const showSwing = this.config.show_swing_mode === true;

    if (this.config.design === "compact" || this.config.design === "a") return this.renderCompact(theme, modes);

    return html`${this.renderDefs()}
      <div class="glass card">
        <div class="header">
          ${this.renderIconWell(this.config.icon ?? theme.icon, theme.well)}
          ${this.renderTitle(this.entityName, this.stateText())}
          ${this.renderBadge(theme.label, theme.badge)}
        </div>

        ${this.renderDial(theme)}

        ${modes.length
          ? html`<div
              class="segment modes"
              style=${styleMap({ "--selected-color": theme.selectedColor, "--n": String(modes.length), "--i": String(Math.max(modes.indexOf(this.mode), 0)) })}
            >
              <!--
                One pill that slides between the buttons, rather than a background that
                appears on the newly selected button and vanishes from the old one. Only a
                single element can travel; two cross-fading ones read as a blink.
                An unlisted mode leaves nothing selected, so the pill sits out.
              -->
              <div class="seg-pill" style=${styleMap({ opacity: modes.includes(this.mode) ? "1" : "0" })}></div>
              ${modes.map((m) => {
                const meta = this.modeMeta(m);
                return html`<button class=${classMap({ selected: m === this.mode })} @click=${() => this.callService("climate", "set_hvac_mode", { hvac_mode: m })}>
                  <lg-icon .icon=${meta.icon}></lg-icon><span>${meta.label}</span>
                </button>`;
              })}
            </div>`
          : nothing}

        ${showFan || showPreset || showSwing
          ? html`<div class=${classMap({ details: true, muted: off })}>
              ${showFan ? this.renderDetail("fan_mode", "mdi:weather-windy") : nothing}
              ${showPreset ? this.renderDetail("preset_mode", "mdi:creation") : nothing}
              ${showSwing ? this.renderDetail("swing_mode", "mdi:arrow-oscillating") : nothing}
            </div>`
          : nothing}
      </div>`;
  }
}

if (!customElements.get("liquid-glass-climate-card")) customElements.define("liquid-glass-climate-card", LiquidGlassClimateCard);
