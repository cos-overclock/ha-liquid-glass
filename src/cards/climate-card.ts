import { html, css, nothing, svg } from "lit";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { LiquidGlassBaseCard, type BadgeStyle, type IconWellStyle } from "../base-card";
import { tokens } from "../styles/tokens";
import { glassStyles } from "../styles/glass";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { clamp, formatNumber, isUnavailable, pickEntity } from "../utils";

export interface ClimateCardConfig extends BaseCardConfig {
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
        filter: drop-shadow(0 0 7px var(--ring-glow));
      }
      .dial-knob {
        position: absolute;
        width: var(--lg-knob, 30px);
        height: var(--lg-knob, 30px);
        transform: translate(-50%, -50%);
        cursor: grab;
        transition: transform 0.12s ease;
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
      @supports (container-type: inline-size) {
        .card {
          --lg-knob: clamp(22px, 8cqi, 30px);
          --lg-temp: clamp(34px, 14.2cqi, 54px);
          --lg-temp-range: clamp(26px, 10.5cqi, 40px);
          --lg-temp-fraction: clamp(15px, 5.8cqi, 22px);
        }
      }
      .segment.modes {
        border-radius: 20px;
      }
      .segment.modes > button {
        height: clamp(44px, 14cqi, 54px);
        border-radius: 17px;
        font-size: var(--lg-tick);
        padding: 0 2px;
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

  private onDialUp = () => {
    if (!this.drag) return;
    const { which, value } = this.drag;
    this.drag = undefined;
    const a = this.entity?.attributes ?? {};
    if (which === "single") this.callService("climate", "set_temperature", { temperature: value });
    else if (which === "low") {
      this.callService("climate", "set_temperature", { target_temp_low: Math.min(value, (a.target_temp_high as number) - this.step), target_temp_high: a.target_temp_high });
    } else {
      this.callService("climate", "set_temperature", { target_temp_low: a.target_temp_low, target_temp_high: Math.max(value, (a.target_temp_low as number) + this.step) });
    }
  };

  private renderDial(theme: ModeTheme) {
    const a = this.entity!.attributes;
    const off = this.mode === "off";
    const t = this.t;
    const [min, max] = this.range;
    const single = this.drag?.which === "single" ? this.drag.value : ((a.temperature as number | undefined) ?? min);
    const low = this.drag?.which === "low" ? this.drag.value : ((a.target_temp_low as number | undefined) ?? min);
    const high = this.drag?.which === "high" ? this.drag.value : ((a.target_temp_high as number | undefined) ?? max);
    const isRange = this.isRange;

    const fillFrom = isRange ? START_ANGLE + this.ratio(low) * SWEEP : START_ANGLE;
    const fillTo = START_ANGLE + this.ratio(isRange ? high : single) * SWEEP;
    const [c0, c1, c2] = theme.ring;
    const [gx1, gy1] = polar(fillFrom);
    const [gx2, gy2] = polar(fillTo);

    const knobs = isRange ? [low, high] : [single];
    const shown = isRange ? formatNumber(this.hass, low, 0) + "–" + formatNumber(this.hass, high, 0) : formatNumber(this.hass, Math.floor(single), 0);
    const fraction = isRange ? "°" : `.${Math.round((single - Math.floor(single)) * 10)}°`;

    return html`<div class="dial-row">
      <div class="dial" @pointerdown=${this.onDialDown} @pointermove=${this.onDialMove} @pointerup=${this.onDialUp} @pointercancel=${this.onDialUp}>
        <svg viewBox="0 0 ${DIAL} ${DIAL}" style=${styleMap({ "--ring-glow": theme.glow })}>
          <defs>
            <linearGradient id="ring-grad" gradientUnits="userSpaceOnUse" x1=${gx1} y1=${gy1} x2=${gx2} y2=${gy2}>
              <stop offset="0" stop-color=${c0} />
              <stop offset="0.55" stop-color=${c1} />
              <stop offset="1" stop-color=${c2} />
            </linearGradient>
          </defs>
          <path class="ring-track" d=${arcPath(START_ANGLE, START_ANGLE + SWEEP)} />
          ${off || fillTo - fillFrom < 0.5
            ? nothing
            : svg`<path class="ring-fill" stroke="url(#ring-grad)" d=${arcPath(fillFrom, fillTo)} />`}
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

  override render() {
    const entity = this.entity;
    if (!entity || isUnavailable(entity)) return this.renderUnavailable();
    const theme = this.theme();
    const off = this.mode === "off";
    const modes = (this.config.hvac_modes ?? (entity.attributes.hvac_modes as string[] | undefined) ?? []).filter(Boolean);
    const showFan = this.config.show_fan_mode !== false;
    const showPreset = this.config.show_preset_mode !== false;
    const showSwing = this.config.show_swing_mode === true;

    return html`${this.renderDefs()}
      <div class="glass card">
        <div class="header">
          ${this.renderIconWell(this.config.icon ?? theme.icon, theme.well)}
          ${this.renderTitle(this.entityName, this.stateText())}
          ${this.renderBadge(theme.label, theme.badge)}
        </div>

        ${this.renderDial(theme)}

        ${modes.length
          ? html`<div class="segment modes" style=${styleMap({ "--selected-color": theme.selectedColor })}>
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
