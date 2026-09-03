import { html, css, nothing } from "lit";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { LiquidGlassBaseCard, type IconWellStyle } from "../base-card";
import { tokens } from "../styles/tokens";
import { glassStyles } from "../styles/glass";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { clamp, darken, formatNumber, isUnavailable, lighten, pickEntity, withAlpha } from "../utils";

export interface SliderCardConfig extends BaseCardConfig {
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  /** Line under the name. Defaults to a description of the step or level. */
  subtitle?: string;
  /** Accent hex colour for the icon well and the track fill. */
  accent?: string;
  /** Tick marks on the track: true derives a count from the steps, a number sets it. */
  ticks?: boolean | number;
  /** Show the min and max labels under the track (default true). Off saves a row. */
  show_range?: boolean;
  decimals?: number;
  /** Read the value from this attribute instead of the domain's usual place. */
  attribute?: string;
  /** "domain.service" to call on release, overriding the domain default. */
  service?: string;
  /** Key the value is sent under. Defaults to "value". */
  service_key?: string;
}

/** Everything the card needs to read and write one numeric value. */
interface Spec {
  min: number;
  max: number;
  step: number;
  unit: string;
  icon: string;
  value: number | undefined;
  /** Absent when the domain has no obvious setter, which leaves the card read-only. */
  call?: (value: number) => [domain: string, service: string, data: Record<string, unknown>];
}

const DOMAINS = ["input_number", "number", "fan", "light", "media_player", "cover", "valve", "humidifier", "water_heater", "climate"];

const numeric = (v: unknown): number | undefined => (v !== null && v !== "" && Number.isFinite(Number(v)) ? Number(v) : undefined);

/**
 * Generic slider card: one numeric value from any domain, shown as a filled track that can
 * be dragged. Percentages, helper numbers, volumes, positions and target temperatures all
 * work out of the box; anything else can be wired up with `attribute` and `service`.
 */
export class LiquidGlassSliderCard extends LiquidGlassBaseCard<SliderCardConfig> {
  /** Value shown mid-drag, before the service call lands. */
  @state() private preview: number | undefined;
  /**
   * Value we asked the entity for. Home Assistant takes a moment to report the new state,
   * and dropping straight back to the old one makes the thumb jump back and return.
   */
  @state() private pending: number | undefined;
  private pendingTimer: number | undefined;

  static override styles = [
    tokens,
    glassStyles,
    css`
      .card {
        gap: 16px;
      }
      .value {
        flex: none;
        display: flex;
        align-items: flex-end;
        gap: 2px;
        font-family: var(--lg-font-ui);
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }
      .value .num {
        font-size: var(--lg-sv, 28px);
        line-height: 1.1;
        letter-spacing: -1px;
        color: var(--lg-text-primary);
      }
      .value .unit {
        font-size: var(--lg-sv-unit, 15px);
        line-height: 1.6;
        letter-spacing: -0.2px;
        color: var(--lg-text-secondary);
      }
      .value.zero .num {
        color: var(--lg-text-secondary);
      }
      .track-wrap {
        position: relative;
      }
      .track-wrap lg-slider {
        --lg-slider-height: var(--lg-track-h, 56px);
        --lg-slider-fill: linear-gradient(90deg, var(--fill-from), var(--fill-to));
      }
      /* Decorative level marks, evenly spread rather than pinned to exact step positions. */
      .marks {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        pointer-events: none;
      }
      .marks span {
        width: 2px;
        height: 12px;
        border-radius: 1px;
        background: rgba(255, 255, 255, 0.5);
      }
      @supports (container-type: inline-size) {
        .card {
          --lg-sv: clamp(20px, 7.4cqi, 28px);
          --lg-sv-unit: clamp(11px, 3.9cqi, 15px);
          --lg-track-h: clamp(40px, 14.7cqi, 56px);
        }
      }
    `,
  ];

  static override getStubConfig(hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) {
    return { entity: pickEntity(DOMAINS, hass, entities, entitiesFallback) };
  }

  override getCardSize(): number {
    return 2;
  }

  /** Resolves the domain defaults, then lets the config override any part of them. */
  private spec(): Spec {
    const entity = this.entity!;
    const a = entity.attributes;
    const cfg = this.config;
    const domain = entity.entity_id.split(".")[0];
    let base: Spec;

    switch (domain) {
      case "input_number":
      case "number":
        base = {
          min: numeric(a.min) ?? 0,
          max: numeric(a.max) ?? 100,
          step: numeric(a.step) ?? 1,
          unit: (a.unit_of_measurement as string) ?? "",
          icon: "mdi:tune-variant",
          value: numeric(entity.state),
          call: (v) => [domain, "set_value", { value: v }],
        };
        break;
      case "fan":
        base = {
          min: 0,
          max: 100,
          step: numeric(a.percentage_step) ?? 1,
          unit: "%",
          icon: "mdi:fan",
          value: entity.state === "on" ? numeric(a.percentage) ?? 0 : 0,
          call: (v) => ["fan", "set_percentage", { percentage: Math.round(v) }],
        };
        break;
      case "light":
        base = {
          min: 0,
          max: 100,
          step: 1,
          unit: "%",
          icon: "mdi:lightbulb",
          value: entity.state === "on" ? Math.round(((numeric(a.brightness) ?? 0) / 255) * 100) : 0,
          call: (v) => ["light", "turn_on", { brightness_pct: Math.round(v) }],
        };
        break;
      case "media_player":
        base = {
          min: 0,
          max: 100,
          step: 1,
          unit: "%",
          icon: "mdi:volume-high",
          value: Math.round((numeric(a.volume_level) ?? 0) * 100),
          call: (v) => ["media_player", "volume_set", { volume_level: Math.round(v) / 100 }],
        };
        break;
      case "cover":
        base = {
          min: 0,
          max: 100,
          step: 1,
          unit: "%",
          icon: "mdi:blinds-horizontal",
          value: numeric(a.current_position) ?? (entity.state === "closed" ? 0 : 100),
          call: (v) => ["cover", "set_cover_position", { position: Math.round(v) }],
        };
        break;
      case "valve":
        base = {
          min: 0,
          max: 100,
          step: 1,
          unit: "%",
          icon: "mdi:pipe-valve",
          value: numeric(a.current_position) ?? (entity.state === "closed" ? 0 : 100),
          call: (v) => ["valve", "set_valve_position", { position: Math.round(v) }],
        };
        break;
      case "humidifier":
        base = {
          min: numeric(a.min_humidity) ?? 0,
          max: numeric(a.max_humidity) ?? 100,
          step: 1,
          unit: "%",
          icon: "mdi:air-humidifier",
          value: numeric(a.humidity),
          call: (v) => ["humidifier", "set_humidity", { humidity: Math.round(v) }],
        };
        break;
      case "water_heater":
        base = {
          min: numeric(a.min_temp) ?? 30,
          max: numeric(a.max_temp) ?? 60,
          step: numeric(a.target_temp_step) ?? 1,
          unit: "°",
          icon: "mdi:water-boiler",
          value: numeric(a.temperature),
          call: (v) => ["water_heater", "set_temperature", { temperature: v }],
        };
        break;
      case "climate":
        base = {
          min: numeric(a.min_temp) ?? 7,
          max: numeric(a.max_temp) ?? 35,
          step: numeric(a.target_temp_step) ?? 0.5,
          unit: "°",
          icon: "mdi:thermostat",
          value: numeric(a.temperature),
          call: (v) => ["climate", "set_temperature", { temperature: v }],
        };
        break;
      default:
        // Unknown domain: readable from the state, writable only once a service is configured.
        base = {
          min: 0,
          max: 100,
          step: 1,
          unit: (a.unit_of_measurement as string) ?? "",
          icon: "mdi:tune-variant",
          value: numeric(entity.state),
        };
    }

    const call = cfg.service
      ? (v: number): [string, string, Record<string, unknown>] => {
          const [d, s] = cfg.service!.split(".");
          return [d, s, { [cfg.service_key ?? "value"]: v }];
        }
      : base.call;

    return {
      min: cfg.min ?? base.min,
      max: cfg.max ?? base.max,
      step: cfg.step ?? base.step,
      unit: cfg.unit ?? base.unit,
      icon: cfg.icon ?? (entity.attributes.icon as string | undefined) ?? base.icon,
      value: cfg.attribute ? numeric(a[cfg.attribute]) : base.value,
      call,
    };
  }

  private subtitleFor(spec: Spec, value: number): string {
    if (this.config.subtitle !== undefined) return this.config.subtitle;
    const t = this.t;
    if (spec.min === 0 && value <= 0) return t("slider_off");
    const levels = spec.step > 0 ? Math.round((spec.max - spec.min) / spec.step) : 0;
    if (levels >= 2 && levels <= 12) {
      return t("slider_levels", { n: levels, i: Math.round((value - spec.min) / spec.step) });
    }
    return t("slider_step", { s: `${formatNumber(this.hass, spec.step)}${spec.unit}` });
  }

  private tickCount(spec: Spec): number {
    const ticks = this.config.ticks;
    if (typeof ticks === "number") return clamp(Math.round(ticks), 0, 20);
    if (ticks !== true) return 0;
    const levels = spec.step > 0 ? Math.round((spec.max - spec.min) / spec.step) : 0;
    return levels >= 2 && levels <= 12 ? levels : 0;
  }

  /** True once the entity reports something close enough to what we asked for. */
  private settled(spec: Spec): boolean {
    if (this.pending === undefined) return true;
    if (spec.value === undefined) return false;
    // Round trips lose a little precision, e.g. a light's percentage via brightness.
    return Math.abs(spec.value - this.pending) <= Math.max(spec.step / 2, 1);
  }

  private commit(spec: Spec, value: number): void {
    this.preview = undefined;
    if (!spec.call) return;
    this.pending = value;
    // Give up waiting if the entity never lands on the value, so it cannot stick.
    window.clearTimeout(this.pendingTimer);
    this.pendingTimer = window.setTimeout(() => (this.pending = undefined), 4000);
    const [domain, service, data] = spec.call(value);
    void this.hass?.callService(domain, service, { entity_id: this.config.entity, ...data });
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this.pendingTimer);
  }

  protected override updated(): void {
    if (this.pending !== undefined && this.settled(this.spec())) {
      window.clearTimeout(this.pendingTimer);
      this.pending = undefined;
    }
  }

  override render() {
    const entity = this.entity;
    if (!entity || isUnavailable(entity)) return this.renderUnavailable();

    const spec = this.spec();
    // Dragging wins, then the value we are still waiting on, then what the entity reports.
    const raw = this.preview ?? (this.settled(spec) ? spec.value : this.pending) ?? spec.min;
    const value = clamp(raw, spec.min, spec.max);
    const zero = spec.min === 0 && value <= 0;
    const decimals = this.config.decimals ?? (Number.isInteger(spec.step) ? 0 : 1);

    const accent = this.config.accent;
    const wellFrom = accent ? lighten(accent, 0.4) : "var(--lg-slider-accent-light)";
    const wellTo = accent ? darken(accent, 0.3) : "var(--lg-slider-accent-deep)";
    const wellGlow = accent ? withAlpha(accent, 0.3) : "rgba(94, 92, 230, 0.3)";
    const fillFrom = accent ? lighten(accent, 0.55) : "var(--lg-slider-fill-light)";
    const fillTo = accent ?? "var(--lg-slider-accent)";
    const well: IconWellStyle | undefined = zero ? undefined : { from: wellFrom, to: wellTo, glow: wellGlow };

    const ticks = this.tickCount(spec);
    const readOnly = !spec.call;
    const fmt = (v: number) => formatNumber(this.hass, v, decimals);

    return html`${this.renderDefs()}
      <div class="glass card" style=${styleMap({ "--fill-from": fillFrom, "--fill-to": fillTo })}>
        <div class="header">
          ${this.renderIconWell(spec.icon, well)}
          ${this.renderTitle(this.entityName, this.subtitleFor(spec, value))}
          <div class=${classMap({ value: true, zero })}>
            <span class="num">${fmt(value)}</span>
            ${spec.unit ? html`<span class="unit">${spec.unit}</span>` : nothing}
          </div>
        </div>

        <div class="track-wrap">
          <lg-slider
            variant="thumb"
            .refraction=${this.refraction}
            .value=${value}
            .min=${spec.min}
            .max=${spec.max}
            .step=${spec.step}
            .disabled=${readOnly}
            .showFill=${!zero}
            @lg-input=${(e: CustomEvent) => (this.preview = e.detail.value)}
            @lg-change=${(e: CustomEvent) => this.commit(spec, e.detail.value)}
          ></lg-slider>
          ${ticks ? html`<div class="marks">${Array.from({ length: ticks }, () => html`<span></span>`)}</div>` : nothing}
        </div>

        ${this.config.show_range === false
          ? nothing
          : html`<div class="ticks">
              <span>${fmt(spec.min)}${spec.unit}</span>
              <span>${fmt(spec.max)}${spec.unit}</span>
            </div>`}
      </div>`;
  }
}

/** Domains the card knows how to read and write without extra configuration. */
export const SLIDER_DOMAINS = DOMAINS;

if (!customElements.get("liquid-glass-slider-card")) customElements.define("liquid-glass-slider-card", LiquidGlassSliderCard);
