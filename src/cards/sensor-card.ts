import { html, css, nothing, svg } from "lit";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { LiquidGlassBaseCard } from "../base-card";
import { tokens } from "../styles/tokens";
import { glassStyles } from "../styles/glass";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { relativeTime } from "../i18n";
import { formatNumber, isUnavailable, lighten, pickEntity, withAlpha } from "../utils";

export interface SensorCardConfig extends BaseCardConfig {
  /**
   * Move the reading into the caption line instead of showing it as a large number.
   * What is left is a single row, so the card stands exactly as tall as a switch card
   * beside it. The graph has no room in that shape and is not drawn.
   */
  value_in_caption?: boolean;
  /** Show 24h sparkline (default true, ignored when value_in_caption is set). */
  graph?: boolean;
  hours_to_show?: number;
  /** Accent hex color for well / line. */
  accent?: string;
  decimals?: number;
  /** Secondary entity appended to the subtitle (e.g. humidity). */
  secondary_entity?: string;
  secondary_label?: string;
  /** Show trend badge vs. one hour ago (default true). */
  trend?: boolean;
}

interface Point {
  t: number;
  v: number;
}

interface HistoryRow {
  s?: string;
  lu?: number;
  state?: string;
  last_changed?: string;
  last_updated?: string;
}

const W = 340;
const H = 84;
const REFRESH_MS = 5 * 60 * 1000;

/**
 * Sensor card: big numeric value, 24h range, trend badge and a smoothed sparkline
 * fed from the Home Assistant history API. `graph: false` renders the compact variant.
 */
export class LiquidGlassSensorCard extends LiquidGlassBaseCard<SensorCardConfig> {
  @state() private points: Point[] = [];
  private lastFetch = 0;
  private fetchedFor = "";
  private timer: number | undefined;

  static override styles = [
    tokens,
    glassStyles,
    css`
      .card {
        gap: 16px;
      }
      .value-row {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 10px;
      }
      .value {
        display: flex;
        align-items: flex-start;
        gap: 3px;
        min-width: 0;
        font-family: var(--lg-font-ui);
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }
      .value .number {
        font-size: var(--lg-value, 52px);
        line-height: 1;
        letter-spacing: -2px;
        color: var(--lg-text-primary);
      }
      /* Units run from "°C" to whole words like "objects", so this one has to be able to
         shrink and, failing that, truncate rather than push the number out of the card. */
      .value .unit {
        font-size: var(--lg-value-unit, 22px);
        line-height: 1.3;
        letter-spacing: -0.2px;
        color: var(--lg-text-secondary);
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .range {
        flex: none;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 2px;
      }
      .range .caption {
        font-size: var(--lg-tick);
        font-weight: 500;
        color: var(--lg-text-secondary);
      }
      .range .rv {
        font-family: var(--lg-font-ui);
        font-size: var(--lg-label);
        font-weight: 600;
        letter-spacing: -0.2px;
        color: var(--lg-text-primary);
        font-variant-numeric: tabular-nums;
      }
      .spark {
        width: 100%;
        height: var(--lg-spark, ${H}px);
        overflow: visible;
        display: block;
      }
      @supports (container-type: inline-size) {
        .card {
          --lg-value: clamp(26px, 13.5cqi, 52px);
          --lg-value-unit: clamp(13px, 5.8cqi, 22px);
          --lg-spark: clamp(52px, 22cqi, ${H}px);
        }
      }
      /* The 24 h range needs more room than a narrow column can spare, and the sparkline
         underneath already shows the same span. */
      @container (max-width: 260px) {
        .range {
          display: none;
        }
      }
      .spark .line {
        fill: none;
        stroke: var(--accent);
        stroke-width: 2.5;
        stroke-linejoin: round;
        stroke-linecap: round;
      }
      .spark .dot {
        fill: var(--accent);
        stroke: #fff;
        stroke-width: 2.5;
        filter: drop-shadow(0 0 5px var(--accent));
      }
      .axis {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        font-weight: 500;
        color: var(--lg-text-secondary);
      }
      .badge lg-icon {
        --mdc-icon-size: 14px;
      }
      .badge.trend {
        font-family: var(--lg-font-ui);
        gap: 4px;
      }
    `,
  ];

  static override getStubConfig(hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) {
    return { entity: pickEntity(["sensor"], hass, entities, entitiesFallback, (e) => Number.isFinite(Number(e.state))) };
  }

  override getCardSize(): number {
    if (!this.showGraph) return this.valueInCaption ? 1 : 2;
    return 4;
  }

  private get accent(): string {
    return this.config.accent ?? "#FF9F0A";
  }

  private get hours(): number {
    return this.config.hours_to_show ?? 24;
  }

  private get valueInCaption(): boolean {
    return this.config.value_in_caption === true;
  }

  /** A caption reading leaves a single row, which has nowhere to put a graph. */
  private get showGraph(): boolean {
    return this.config.graph !== false && !this.valueInCaption;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.timer = window.setInterval(() => this.maybeFetch(true), REFRESH_MS);
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.timer) window.clearInterval(this.timer);
  }

  protected override updated(): void {
    this.maybeFetch(false);
  }

  private maybeFetch(force: boolean): void {
    if (!this.hass || !this.config?.entity) return;
    const key = `${this.config.entity}:${this.hours}`;
    const stale = Date.now() - this.lastFetch > REFRESH_MS;
    if (!force && key === this.fetchedFor && !stale) return;
    this.fetchedFor = key;
    this.lastFetch = Date.now();
    void this.fetchHistory(this.hass, this.config.entity);
  }

  private async fetchHistory(hass: HomeAssistant, entityId: string): Promise<void> {
    const start = new Date(Date.now() - this.hours * 3600 * 1000).toISOString();
    try {
      const rows = await hass.callApi<HistoryRow[][]>(
        "GET",
        `history/period/${start}?filter_entity_id=${encodeURIComponent(entityId)}&minimal_response&no_attributes&significant_changes_only=0`,
      );
      const series = rows?.[0] ?? [];
      const points: Point[] = [];
      for (const r of series) {
        const v = Number(r.state ?? r.s);
        const ts = r.last_changed ?? r.last_updated;
        const t = ts ? new Date(ts).getTime() : (r.lu ?? 0) * 1000;
        if (Number.isFinite(v) && t) points.push({ t, v });
      }
      const current = Number(hass.states[entityId]?.state);
      if (Number.isFinite(current)) points.push({ t: Date.now(), v: current });
      this.points = points;
    } catch {
      this.points = [];
    }
  }

  private trend(): number | undefined {
    if (this.config.trend === false || this.points.length < 2) return undefined;
    const now = this.points[this.points.length - 1];
    const target = now.t - 3600 * 1000;
    let ref = this.points[0];
    for (const p of this.points) {
      if (p.t <= target) ref = p;
      else break;
    }
    return now.v - ref.v;
  }

  private sparkPath(): { line: string; area: string; last: [number, number] } | undefined {
    const pts = this.points;
    if (pts.length < 2) return undefined;
    const t0 = pts[0].t;
    const t1 = pts[pts.length - 1].t;
    let min = Infinity;
    let max = -Infinity;
    for (const p of pts) {
      min = Math.min(min, p.v);
      max = Math.max(max, p.v);
    }
    if (max - min < 1e-9) {
      max += 1;
      min -= 1;
    }
    const pad = 10;
    const xs = pts.map((p) => ((p.t - t0) / (t1 - t0 || 1)) * (W - 12));
    const ys = pts.map((p) => pad + (1 - (p.v - min) / (max - min)) * (H - pad * 2));
    let d = `M ${xs[0].toFixed(1)} ${ys[0].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const x0 = xs[Math.max(0, i - 1)];
      const y0 = ys[Math.max(0, i - 1)];
      const x1 = xs[i];
      const y1 = ys[i];
      const x2 = xs[i + 1];
      const y2 = ys[i + 1];
      const x3 = xs[Math.min(pts.length - 1, i + 2)];
      const y3 = ys[Math.min(pts.length - 1, i + 2)];
      const c1x = x1 + (x2 - x0) / 6;
      const c1y = y1 + (y2 - y0) / 6;
      const c2x = x2 - (x3 - x1) / 6;
      const c2y = y2 - (y3 - y1) / 6;
      d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
    }
    const lastX = xs[xs.length - 1];
    const area = `${d} L ${lastX.toFixed(1)} ${H} L ${xs[0].toFixed(1)} ${H} Z`;
    return { line: d, area, last: [lastX, ys[ys.length - 1]] };
  }

  /** The state formatted for display, without its unit. */
  private formattedValue(): string {
    const entity = this.entity!;
    const value = Number(entity.state);
    return Number.isFinite(value) ? formatNumber(this.hass, value, this.config.decimals) : entity.state;
  }

  /** Degrees and percentages sit tight against the number; word units take a space. */
  private withUnit(value: string, unit: string): string {
    if (!unit) return value;
    return /^[°%]/.test(unit) ? `${value}${unit}` : `${value} ${unit}`;
  }

  private subtitle(lead?: string): string {
    const t = this.t;
    const parts = lead ? [lead] : [];
    parts.push(t("updated_ago", { t: relativeTime(this.entity?.last_updated, t) }));
    if (this.config.secondary_entity) {
      const s = this.hass?.states[this.config.secondary_entity];
      if (s && !isUnavailable(s)) {
        const label = this.config.secondary_label ?? s.attributes.friendly_name ?? "";
        parts.push(`${label} ${s.state}${s.attributes.unit_of_measurement ?? ""}`.trim());
      }
    }
    return parts.join(" · ");
  }

  override render() {
    const entity = this.entity;
    if (!entity || isUnavailable(entity)) return this.renderUnavailable();
    const t = this.t;
    const accent = this.accent;
    const value = Number(entity.state);
    const numeric = Number.isFinite(value);
    const decimals = this.config.decimals;
    const unit = entity.attributes.unit_of_measurement ?? "";
    const trend = numeric ? this.trend() : undefined;
    const spark = this.showGraph ? this.sparkPath() : undefined;
    const vals = this.points.map((p) => p.v);
    const min = vals.length ? Math.min(...vals) : undefined;
    const max = vals.length ? Math.max(...vals) : undefined;
    const icon = this.config.icon ?? entity.attributes.icon ?? (entity.attributes.device_class === "humidity" ? "mdi:water-percent" : "mdi:thermometer");
    const up = (trend ?? 0) >= 0;
    // Symbols read fine inside the badge; a word like "objects" would blow it out.
    const trendUnit = unit === "°C" || unit === "°F" ? "°" : unit.length <= 3 ? unit : "";
    // Without the value block there is only the header left, so the card takes the
    // single-row shape and matches a switch card standing beside it.
    const asRow = this.valueInCaption;
    const inCaption = asRow;
    const caption = this.subtitle(inCaption ? this.withUnit(this.formattedValue(), unit) : undefined);

    const head = html`
      ${this.renderIconWell(icon, { from: lighten(accent), to: accent, glow: withAlpha(accent, 0.24) })}
      ${this.renderTitle(this.entityName, caption)}
      ${trend !== undefined
        ? html`<div
            class="badge trend"
            style=${styleMap({
              "--badge-color": up ? "var(--lg-trend-up)" : "var(--lg-trend-down)",
              "--badge-bg": up ? "var(--lg-trend-up-bg)" : "var(--lg-trend-down-bg)",
              "--badge-stroke": up ? "rgba(48,209,88,0.3)" : "rgba(43,179,208,0.3)",
            })}
          >
            <lg-icon .icon=${up ? "mdi:trending-up" : "mdi:trending-down"}></lg-icon>
            <span>${up ? "+" : "−"}${formatNumber(this.hass, Math.abs(trend), 1)}${trendUnit}</span>
          </div>`
        : nothing}`;

    return html`${this.renderDefs()}
      <div class=${classMap({ glass: true, card: true, row: asRow })} style=${styleMap({ "--accent": accent })}>
        ${this.renderCardSurface()}
        ${asRow ? head : html`<div class="header">${head}</div>`}

        ${inCaption
          ? nothing
          : html`<div class="value-row">
              <div class="value">
                <span class="number">${numeric ? formatNumber(this.hass, value, decimals) : entity.state}</span>
                ${unit ? html`<span class="unit">${unit}</span>` : nothing}
              </div>
              ${this.showGraph && min !== undefined && max !== undefined
                ? html`<div class="range">
                    <span class="caption">${this.hours === 24 ? t("hours_24") : `${this.hours} h`}</span>
                    <span class="rv">${formatNumber(this.hass, min, decimals ?? 1)} – ${formatNumber(this.hass, max, decimals ?? 1)} ${unit}</span>
                  </div>`
                : nothing}
            </div>`}

        ${this.showGraph
          ? html`<svg class="spark" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color=${accent} stop-opacity="0.4" />
                    <stop offset="1" stop-color=${accent} stop-opacity="0" />
                  </linearGradient>
                </defs>
                ${spark
                  ? svg`<path d=${spark.area} fill="url(#area)" />
                        <path class="line" d=${spark.line} />
                        <circle class="dot" cx=${spark.last[0]} cy=${spark.last[1]} r="4.75" />`
                  : nothing}
              </svg>
              <div class=${classMap({ axis: true })}>
                <span>${t("hours_ago", { n: this.hours })}</span>
                <span>${t("hours_ago", { n: Math.round(this.hours / 2) })}</span>
                <span>${t("now")}</span>
              </div>`
          : nothing}
      </div>`;
  }
}


if (!customElements.get("liquid-glass-sensor-card")) customElements.define("liquid-glass-sensor-card", LiquidGlassSensorCard);
