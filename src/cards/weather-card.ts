import { html, css, nothing } from "lit";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { LiquidGlassBaseCard } from "../base-card";
import { tokens } from "../styles/tokens";
import { glassStyles } from "../styles/glass";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { clamp, formatNumber, isUnavailable, pickEntity, withAlpha } from "../utils";

export interface WeatherCardConfig extends BaseCardConfig {
  /**
   * "row" collapses the card to a single line — icon, place, conditions and temperature —
   * so it stands as tall as a switch card and fits along the bottom of a dashboard.
   * The forecast sections have no room in that shape and are not drawn.
   */
  layout?: "full" | "row";
  /** Hourly strip (default true). */
  show_hourly?: boolean;
  hourly_count?: number;
  /** Daily rows with the temperature range bars (default true). */
  show_daily?: boolean;
  daily_count?: number;
  /** Humidity / wind / precipitation tiles (default true). */
  show_metrics?: boolean;
}

/** One entry from `weather.get_forecasts`, or from the legacy forecast attribute. */
interface Forecast {
  datetime: string;
  condition?: string;
  temperature?: number;
  templow?: number;
  precipitation?: number;
  precipitation_probability?: number;
}

interface ConditionLook {
  icon: string;
  /** Used instead of `icon` after dark, where the condition has a night form. */
  night?: string;
  color: string;
}

/** Home Assistant's fixed set of weather states, each with an icon and a colour. */
const CONDITIONS: Record<string, ConditionLook> = {
  "clear-night": { icon: "mdi:weather-night", color: "#9AB6FF" },
  cloudy: { icon: "mdi:weather-cloudy", color: "#A0AEC0" },
  exceptional: { icon: "mdi:alert-circle-outline", color: "#FF9F0A" },
  fog: { icon: "mdi:weather-fog", color: "#A0AEC0" },
  hail: { icon: "mdi:weather-hail", color: "#8FD6FF" },
  lightning: { icon: "mdi:weather-lightning", color: "#FFD60A" },
  "lightning-rainy": { icon: "mdi:weather-lightning-rainy", color: "#FFD60A" },
  partlycloudy: { icon: "mdi:weather-partly-cloudy", night: "mdi:weather-night-partly-cloudy", color: "#FFB340" },
  pouring: { icon: "mdi:weather-pouring", color: "#5AC8FA" },
  rainy: { icon: "mdi:weather-rainy", color: "#5AC8FA" },
  snowy: { icon: "mdi:weather-snowy", color: "#BFE3FF" },
  "snowy-rainy": { icon: "mdi:weather-snowy-rainy", color: "#8FD6FF" },
  sunny: { icon: "mdi:weather-sunny", color: "#FFB340" },
  windy: { icon: "mdi:weather-windy", color: "#A0AEC0" },
  "windy-variant": { icon: "mdi:weather-windy-variant", color: "#A0AEC0" },
};

const FALLBACK: ConditionLook = { icon: "mdi:weather-cloudy", color: "#A0AEC0" };
const REFRESH_MS = 15 * 60 * 1000;

/**
 * Weather card: current conditions with a large glowing icon, an hourly strip, daily rows
 * whose bars place each day's range on a shared scale, and humidity / wind / precipitation.
 *
 * Forecasts come from `weather.get_forecasts`, which replaced the forecast attribute in
 * 2024.4; the attribute is still read as a fallback for older installations.
 */
export class LiquidGlassWeatherCard extends LiquidGlassBaseCard<WeatherCardConfig> {
  @state() private daily: Forecast[] = [];
  @state() private hourly: Forecast[] = [];
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

      /* Current conditions */
      .current {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
      }
      .now {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
        cursor: pointer;
      }
      .city {
        font-size: var(--lg-name);
        font-weight: 600;
        color: var(--lg-text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .condition {
        font-size: var(--lg-state);
        color: var(--lg-text-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .temp-row {
        display: flex;
        align-items: flex-start;
        gap: 2px;
        font-family: var(--lg-font-ui);
        font-weight: 600;
        font-variant-numeric: tabular-nums;
      }
      .temp-row .temp {
        font-size: var(--lg-wx-temp, 52px);
        line-height: 1.05;
        letter-spacing: -2px;
        color: var(--lg-text-primary);
      }
      .temp-row .deg {
        font-size: var(--lg-wx-deg, 26px);
        line-height: 1.2;
        letter-spacing: -0.2px;
        color: var(--lg-text-secondary);
      }
      .hilo {
        display: flex;
        gap: 10px;
        font-size: var(--lg-label);
        letter-spacing: -0.2px;
      }
      .hilo .hi {
        font-weight: 600;
        color: var(--lg-text-primary);
      }
      .hilo .lo {
        font-weight: 500;
        color: var(--lg-text-secondary);
      }
      .big-icon {
        flex: none;
        display: grid;
        place-items: center;
        width: var(--lg-wx-icon-box, 110px);
        height: var(--lg-wx-icon-box, 110px);
      }
      .big-icon lg-icon {
        --mdc-icon-size: var(--lg-wx-icon, 96px);
        width: var(--lg-wx-icon, 96px);
        height: var(--lg-wx-icon, 96px);
        color: var(--wx-color);
        filter: drop-shadow(0 6px 20px var(--wx-glow));
      }

      /* Hourly strip */
      .hourly {
        display: flex;
        justify-content: space-between;
        gap: 2px;
        padding: 12px 10px;
        border-radius: 20px;
        background: var(--lg-track-bg);
        box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
      }
      .hour {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        padding: 6px 0;
        border-radius: 14px;
      }
      .hour.now {
        background: var(--lg-segment-selected);
      }
      .hour .time {
        font-size: var(--lg-tick);
        font-weight: 500;
        color: var(--lg-text-secondary);
        white-space: nowrap;
      }
      .hour.now .time {
        font-weight: 600;
        color: var(--lg-text-primary);
      }
      .hour lg-icon {
        --mdc-icon-size: var(--lg-wx-hour-icon, 22px);
        width: var(--lg-wx-hour-icon, 22px);
        height: var(--lg-wx-hour-icon, 22px);
        color: var(--wx-color);
      }
      .hour .t {
        font-family: var(--lg-font-ui);
        font-size: var(--lg-label);
        font-weight: 600;
        letter-spacing: -0.2px;
        color: var(--lg-text-primary);
        font-variant-numeric: tabular-nums;
      }

      /* Daily rows */
      .daily {
        display: flex;
        flex-direction: column;
      }
      .day {
        display: flex;
        align-items: center;
        gap: 12px;
        height: 44px;
      }
      .day .label {
        flex: none;
        width: var(--lg-wx-day, 44px);
        font-size: var(--lg-name-sm, 14px);
        font-weight: 500;
        color: var(--lg-text-secondary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .day.today .label {
        font-weight: 600;
        color: var(--lg-text-primary);
      }
      .day lg-icon {
        flex: none;
        --mdc-icon-size: var(--lg-wx-hour-icon, 22px);
        width: var(--lg-wx-hour-icon, 22px);
        height: var(--lg-wx-hour-icon, 22px);
        color: var(--wx-color);
      }
      .day .lo,
      .day .hi {
        flex: none;
        width: var(--lg-wx-temp-col, 30px);
        text-align: right;
        font-family: var(--lg-font-ui);
        font-size: var(--lg-label);
        letter-spacing: -0.2px;
        font-variant-numeric: tabular-nums;
      }
      .day .lo {
        font-weight: 500;
        color: var(--lg-text-secondary);
      }
      .day .hi {
        font-weight: 600;
        color: var(--lg-text-primary);
      }
      /* Every bar shares one scale, so a day's segment shows where it sits in the week. */
      .bar {
        position: relative;
        flex: 1;
        min-width: 0;
        height: 6px;
        border-radius: 3px;
        background: var(--lg-track-bg);
        overflow: hidden;
      }
      .bar span {
        position: absolute;
        top: 0;
        bottom: 0;
        border-radius: 3px;
        background: linear-gradient(90deg, #5ac8fa, #ffd60a 55%, #ff9f0a);
      }

      /* Metric tiles */
      .metrics {
        display: flex;
        gap: 8px;
      }
      .metric {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 3px;
        padding: 10px 12px;
        border-radius: 18px;
        background: var(--lg-track-bg);
        box-shadow: inset 0 0 0 1px var(--lg-glass-stroke);
      }
      .metric .head {
        display: flex;
        align-items: center;
        gap: 5px;
        min-width: 0;
        font-size: var(--lg-tick);
        font-weight: 500;
        color: var(--lg-text-secondary);
      }
      .metric .head span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .metric lg-icon {
        flex: none;
        --mdc-icon-size: 14px;
        width: 14px;
        height: 14px;
      }
      .metric .v {
        font-family: var(--lg-font-ui);
        font-size: var(--lg-wx-metric, 15px);
        font-weight: 600;
        letter-spacing: -0.2px;
        color: var(--lg-text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /*
       * Row layout: the icon shrinks to the size of a card's icon well and the reading
       * moves to the trailing edge, which puts the card at a switch card's height.
       */
      .card.row .big-icon {
        width: var(--lg-well);
        height: var(--lg-well);
      }
      .card.row .big-icon lg-icon {
        --mdc-icon-size: var(--lg-well);
        width: var(--lg-well);
        height: var(--lg-well);
        filter: drop-shadow(0 3px 10px var(--wx-glow));
      }
      .card.row .temp-row {
        flex: none;
      }
      .card.row .temp-row .temp {
        font-size: var(--lg-wx-row-temp, 28px);
        line-height: 1.1;
        letter-spacing: -1px;
      }
      .card.row .temp-row .deg {
        font-size: var(--lg-wx-row-deg, 15px);
        line-height: 1.6;
      }

      @supports (container-type: inline-size) {
        .card {
          --lg-wx-row-temp: clamp(20px, 7.4cqi, 28px);
          --lg-wx-row-deg: clamp(11px, 3.9cqi, 15px);
          --lg-wx-temp: clamp(34px, 13.7cqi, 52px);
          --lg-wx-deg: clamp(17px, 6.8cqi, 26px);
          --lg-wx-icon-box: clamp(64px, 29cqi, 110px);
          --lg-wx-icon: clamp(54px, 25cqi, 96px);
          --lg-wx-hour-icon: clamp(17px, 5.8cqi, 22px);
          --lg-wx-day: clamp(32px, 11.6cqi, 44px);
          --lg-wx-temp-col: clamp(24px, 7.9cqi, 30px);
          --lg-wx-metric: clamp(12px, 3.9cqi, 15px);
          --lg-name-sm: clamp(11.5px, 3.7cqi, 14px);
        }
      }
      /* Three tiles side by side stop being readable long before the card does. */
      @container (max-width: 300px) {
        .metrics {
          flex-wrap: wrap;
        }
        .metric {
          flex-basis: calc(50% - 4px);
        }
      }
      @container (max-width: 250px) {
        .day {
          gap: 8px;
        }
        .hourly {
          padding: 10px 6px;
        }
      }
    `,
  ];

  static override getStubConfig(hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) {
    return { entity: pickEntity(["weather"], hass, entities, entitiesFallback) };
  }

  private get isRow(): boolean {
    return this.config?.layout === "row";
  }

  override getCardSize(): number {
    if (this.isRow) return 1;
    let size = 3;
    if (this.config?.show_hourly !== false) size += 1;
    if (this.config?.show_daily !== false) size += 2;
    if (this.config?.show_metrics !== false) size += 1;
    return size;
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
    const stale = Date.now() - this.lastFetch > REFRESH_MS;
    if (!force && this.config.entity === this.fetchedFor && !stale) return;
    this.fetchedFor = this.config.entity;
    this.lastFetch = Date.now();
    void this.fetchForecasts(this.hass, this.config.entity);
  }

  private async fetchForecasts(hass: HomeAssistant, entityId: string): Promise<void> {
    // Daily is fetched even when its rows are hidden: today's high and low sit in the
    // header, which the compact card still shows.
    const want: Array<"daily" | "hourly"> = ["daily"];
    if (!this.isRow && this.config.show_hourly !== false) want.push("hourly");

    for (const type of want) {
      let list: Forecast[] = [];
      try {
        const res = await hass.callService("weather", "get_forecasts", { type }, { entity_id: entityId }, false, true);
        const byEntity = (res?.response ?? {}) as Record<string, { forecast?: Forecast[] }>;
        list = byEntity[entityId]?.forecast ?? [];
      } catch {
        // Installations before 2024.4 have no such service; the attribute still carries it.
        list = (hass.states[entityId]?.attributes.forecast as Forecast[] | undefined) ?? [];
      }
      if (type === "daily") this.daily = list;
      else this.hourly = list;
    }
  }

  /** Night styling follows the sun entity when there is one, so partly cloudy can differ. */
  private get isNight(): boolean {
    const sun = this.hass?.states["sun.sun"];
    if (sun) return sun.state === "below_horizon";
    return this.entity?.state === "clear-night";
  }

  private look(condition: string | undefined): ConditionLook {
    const found = CONDITIONS[condition ?? ""] ?? FALLBACK;
    if (this.isNight && found.night) return { ...found, icon: found.night, color: "#9AB6FF" };
    return found;
  }

  private conditionLabel(condition: string | undefined): string {
    return condition ? this.t(`wx_${condition}`) : "";
  }

  /** Named `locale` rather than `lang`, which HTMLElement already defines. */
  private get locale(): string {
    return this.config.language ?? this.hass?.locale?.language ?? this.hass?.language ?? "en";
  }

  private temp(value: number | undefined): string {
    return value === undefined ? "–" : `${formatNumber(this.hass, value, 0)}°`;
  }

  private hourLabel(iso: string, index: number): string {
    if (index === 0) return this.t("wx_now");
    try {
      return new Intl.DateTimeFormat(this.locale, { hour: "numeric" }).format(new Date(iso));
    } catch {
      return "";
    }
  }

  private dayLabel(iso: string, index: number): string {
    if (index === 0) return this.t("wx_today");
    if (index === 1) return this.t("wx_tomorrow");
    try {
      return new Intl.DateTimeFormat(this.locale, { weekday: "short" }).format(new Date(iso));
    } catch {
      return "";
    }
  }

  private renderCurrent() {
    const entity = this.entity!;
    const a = entity.attributes;
    const look = this.look(entity.state);
    const today = this.daily[0];
    const high = today?.temperature;
    const low = today?.templow;

    return html`<div class="current">
      <div class="now" @click=${this.openMoreInfo}>
        <div class="city">${this.entityName}</div>
        <div class="condition">${this.conditionLabel(entity.state)}</div>
        <div class="temp-row">
          <span class="temp">${formatNumber(this.hass, (a.temperature as number) ?? 0, 0)}</span><span class="deg">°</span>
        </div>
        ${high !== undefined || low !== undefined
          ? html`<div class="hilo">
              ${high !== undefined ? html`<span class="hi">${this.t("wx_high")} ${this.temp(high)}</span>` : nothing}
              ${low !== undefined ? html`<span class="lo">${this.t("wx_low")} ${this.temp(low)}</span>` : nothing}
            </div>`
          : nothing}
      </div>
      <div class="big-icon" style=${styleMap({ "--wx-color": look.color, "--wx-glow": withAlpha(look.color, 0.4) })}>
        <lg-icon .icon=${this.config.icon ?? look.icon}></lg-icon>
      </div>
    </div>`;
  }

  private renderHourly() {
    const count = clamp(this.config.hourly_count ?? 6, 2, 12);
    const hours = this.hourly.slice(0, count);
    if (!hours.length) return nothing;
    return html`<div class="hourly">
      ${hours.map((f, i) => {
        const look = this.look(f.condition);
        return html`<div class=${classMap({ hour: true, now: i === 0 })} style=${styleMap({ "--wx-color": look.color })}>
          <span class="time">${this.hourLabel(f.datetime, i)}</span>
          <lg-icon .icon=${look.icon}></lg-icon>
          <span class="t">${this.temp(f.temperature)}</span>
        </div>`;
      })}
    </div>`;
  }

  private renderDaily() {
    const count = clamp(this.config.daily_count ?? 4, 1, 10);
    const days = this.daily.slice(0, count);
    if (!days.length) return nothing;

    // One scale across the shown days, so the bars are comparable row to row.
    const lows = days.map((d) => d.templow ?? d.temperature).filter((v): v is number => v !== undefined);
    const highs = days.map((d) => d.temperature).filter((v): v is number => v !== undefined);
    const min = Math.min(...lows, ...highs);
    const max = Math.max(...lows, ...highs);
    const span = max - min || 1;

    return html`<div class="daily">
      ${days.map((f, i) => {
        const look = this.look(f.condition);
        const lo = f.templow ?? f.temperature;
        const hi = f.temperature;
        const left = lo === undefined ? 0 : ((lo - min) / span) * 100;
        const width = lo === undefined || hi === undefined ? 100 : Math.max(((hi - lo) / span) * 100, 6);
        return html`<div class=${classMap({ day: true, today: i === 0 })} style=${styleMap({ "--wx-color": look.color })}>
          <span class="label">${this.dayLabel(f.datetime, i)}</span>
          <lg-icon .icon=${look.icon}></lg-icon>
          <span class="lo">${this.temp(lo)}</span>
          <div class="bar"><span style=${styleMap({ left: `${left}%`, width: `${width}%` })}></span></div>
          <span class="hi">${this.temp(hi)}</span>
        </div>`;
      })}
    </div>`;
  }

  private renderMetrics() {
    const a = this.entity!.attributes;
    const t = this.t;
    const humidity = a.humidity as number | undefined;
    const wind = a.wind_speed as number | undefined;
    const windUnit = (a.wind_speed_unit as string) ?? "";
    const chance = this.hourly[0]?.precipitation_probability ?? this.daily[0]?.precipitation_probability;
    const amount = this.hourly[0]?.precipitation ?? this.daily[0]?.precipitation;

    const tiles: Array<[icon: string, label: string, value: string] | undefined> = [
      humidity === undefined ? undefined : ["mdi:water-percent", t("humidity"), `${formatNumber(this.hass, humidity, 0)}%`],
      wind === undefined ? undefined : ["mdi:weather-windy", t("wx_wind"), `${formatNumber(this.hass, wind, 1)} ${windUnit}`.trim()],
      chance !== undefined
        ? ["mdi:weather-rainy", t("wx_precip"), `${formatNumber(this.hass, chance, 0)}%`]
        : amount !== undefined
          ? ["mdi:weather-rainy", t("wx_precip"), `${formatNumber(this.hass, amount, 1)} mm`]
          : undefined,
    ];
    const shown = tiles.filter((x): x is [string, string, string] => x !== undefined);
    if (!shown.length) return nothing;

    return html`<div class="metrics">
      ${shown.map(
        ([icon, label, value]) => html`<div class="metric">
          <div class="head"><lg-icon .icon=${icon}></lg-icon><span>${label}</span></div>
          <div class="v">${value}</div>
        </div>`,
      )}
    </div>`;
  }

  /** Single line: glowing icon, place and conditions, temperature on the right. */
  private renderRow() {
    const entity = this.entity!;
    const a = entity.attributes;
    const look = this.look(entity.state);
    const today = this.daily[0];
    const parts = [this.conditionLabel(entity.state)];
    if (today?.temperature !== undefined) parts.push(`${this.t("wx_high")} ${this.temp(today.temperature)}`);
    if (today?.templow !== undefined) parts.push(`${this.t("wx_low")} ${this.temp(today.templow)}`);

    return html`${this.renderDefs()}
      <div class="glass card row">
        ${this.renderCardSurface()}
        <div class="big-icon" style=${styleMap({ "--wx-color": look.color, "--wx-glow": withAlpha(look.color, 0.4) })}>
          <lg-icon .icon=${this.config.icon ?? look.icon}></lg-icon>
        </div>
        <div class="title" @click=${this.openMoreInfo}>
          <div class="name">${this.entityName}</div>
          <div class="state">${parts.filter(Boolean).join(" · ")}</div>
        </div>
        <div class="temp-row">
          <span class="temp">${formatNumber(this.hass, (a.temperature as number) ?? 0, 0)}</span><span class="deg">°</span>
        </div>
      </div>`;
  }

  override render() {
    const entity = this.entity;
    if (!entity || isUnavailable(entity)) return this.renderUnavailable();
    if (this.isRow) return this.renderRow();

    return html`${this.renderDefs()}
      <div class="glass card">
        ${this.renderCardSurface()}
        ${this.renderCurrent()}
        ${this.config.show_hourly === false ? nothing : this.renderHourly()}
        ${this.config.show_daily === false ? nothing : this.renderDaily()}
        ${this.config.show_metrics === false ? nothing : this.renderMetrics()}
      </div>`;
  }
}

if (!customElements.get("liquid-glass-weather-card")) customElements.define("liquid-glass-weather-card", LiquidGlassWeatherCard);
