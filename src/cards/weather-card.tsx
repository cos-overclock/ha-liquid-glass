import { useEffect, useState, type CSSProperties } from "react";
import { createTranslator } from "../i18n";
import { CardTitle, UnavailableCard } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { contentGridOptions, rowGridOptions } from "../react/grid-options";
import { glassSurfaceStyles, Icon, LiquidGlassSurface } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { useVisibleTick } from "../react/use-visible-tick";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { clamp, entityName, entityStateText, formatNumber, isUnavailable, moreInfo, pickEntity, withAlpha } from "../utils";

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
  is_daytime?: boolean;
}

type ForecastType = "daily" | "hourly" | "twice_daily";

const WEATHER_FORECAST_DAILY = 1;
const WEATHER_FORECAST_HOURLY = 2;
const WEATHER_FORECAST_TWICE_DAILY = 4;

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

const ownStyles = `
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
`;

async function fetchForecast(hass: HomeAssistant, entityId: string, type: ForecastType): Promise<Forecast[]> {
  try {
    const response = await hass.callService("weather", "get_forecasts", { type }, { entity_id: entityId }, false, true);
    const byEntity = (response?.response ?? {}) as Record<string, { forecast?: Forecast[] }>;
    return byEntity[entityId]?.forecast ?? [];
  } catch {
    // Installations before 2024.4 have no such service; the attribute still carries it.
    return (hass.states[entityId]?.attributes.forecast as Forecast[] | undefined) ?? [];
  }
}

/** Fold day/night periods into the daily rows this card presents. */
export function dailyFromTwiceDaily(forecasts: Forecast[]): Forecast[] {
  const days = new Map<string, Forecast[]>();
  for (const forecast of forecasts) {
    const key = forecast.datetime.slice(0, 10);
    const entries = days.get(key) ?? [];
    entries.push(forecast);
    days.set(key, entries);
  }

  return [...days.values()].map((entries) => {
    const temperatures = entries.flatMap((entry) =>
      [entry.temperature, entry.templow].filter((value): value is number => value !== undefined));
    const daytime = entries.find((entry) => entry.is_daytime) ?? entries[0];
    const probabilities = entries
      .map((entry) => entry.precipitation_probability)
      .filter((value): value is number => value !== undefined);
    const amounts = entries
      .map((entry) => entry.precipitation)
      .filter((value): value is number => value !== undefined);
    return {
      ...daytime,
      temperature: temperatures.length ? Math.max(...temperatures) : undefined,
      templow: temperatures.length ? Math.min(...temperatures) : undefined,
      precipitation_probability: probabilities.length ? Math.max(...probabilities) : undefined,
      precipitation: amounts.length ? amounts.reduce((sum, value) => sum + value, 0) : undefined,
    };
  });
}

/**
 * Current conditions with a large glowing icon, an hourly strip, daily rows whose bars
 * place each day's range on a shared scale, and humidity / wind / precipitation.
 */
function WeatherCard({ config, hass, host }: ReactCardProps<WeatherCardConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  /** Named `locale` rather than `lang`, which HTMLElement already defines. */
  const locale = config.language ?? hass?.locale?.language ?? hass?.language ?? "en";
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const [daily, setDaily] = useState<Forecast[]>([]);
  const [hourly, setHourly] = useState<Forecast[]>([]);
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = entityName(hass, entity, config.name, config.entity ?? "");
  const isRow = config.layout === "row";
  const open = () => moreInfo(host, config.entity);
  const canFetch = Boolean(hass && config.entity);
  const refreshTick = useVisibleTick(host, REFRESH_MS, canFetch);
  const featureValue = entity?.attributes.supported_features;
  const hasForecastFeatures = typeof featureValue === "number";
  const dailyType: "daily" | "twice_daily" | undefined = !hasForecastFeatures
    || Boolean(featureValue & WEATHER_FORECAST_DAILY)
    ? "daily"
    : featureValue & WEATHER_FORECAST_TWICE_DAILY
      ? "twice_daily"
      : undefined;
  const supportsHourly = !hasForecastFeatures || Boolean(featureValue & WEATHER_FORECAST_HOURLY);

  useEffect(() => {
    if (!hass || !config.entity) return;
    let cancelled = false;
    const target = config.entity;
    // Daily is fetched even when its rows are hidden: today's high and low sit in the
    // header, which the compact card still shows.
    if (dailyType) {
      void fetchForecast(hass, target, dailyType).then((forecast) => {
        if (!cancelled) setDaily(dailyType === "twice_daily" ? dailyFromTwiceDaily(forecast) : forecast);
      });
    }
    if (!isRow && config.show_hourly !== false && supportsHourly) {
      void fetchForecast(hass, target, "hourly").then((forecast) => {
        if (!cancelled) setHourly(forecast);
      });
    }
    return () => { cancelled = true; };
    /*
     * `hass` is left out deliberately. Its identity changes on every state push, and the
     * forecast is meant to refetch on the tick, not on each reading.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canFetch, config.entity, config.show_hourly, dailyType, isRow, refreshTick, supportsHourly]);

  if (!entity || isUnavailable(entity)) {
    return <>
      <UnavailableCard
        refraction={refraction}
        variant={config.glass_variant}
        icon={config.icon}
        name={name}
        label={t("unavailable")}
        onOpen={open}
      />
    </>;
  }

  /** Night styling follows the sun entity when there is one, so partly cloudy can differ. */
  const sun = hass?.states["sun.sun"];
  const isNight = sun ? sun.state === "below_horizon" : entity.state === "clear-night";
  const look = (condition: string | undefined): ConditionLook => {
    const found = CONDITIONS[condition ?? ""] ?? FALLBACK;
    return isNight && found.night ? { ...found, icon: found.night, color: "#9AB6FF" } : found;
  };
  /*
   * A weather entity's state is its condition, so Home Assistant's own wording covers
   * every language it ships and stays in step with the more-info dialog. Forecast rows
   * pass their own condition, which is formatted against the same entity.
   */
  const conditionLabel = (condition: string | undefined): string =>
    (condition ? entityStateText(hass, entity, t(`wx_${condition}`), condition) : "");
  const temp = (value: number | undefined): string =>
    value === undefined ? "–" : `${formatNumber(hass, value, 0)}°`;
  const dateLabel = (iso: string, options: Intl.DateTimeFormatOptions): string => {
    try {
      return new Intl.DateTimeFormat(locale, options).format(new Date(iso));
    } catch {
      return "";
    }
  };

  const attributes = entity.attributes;
  const current = look(entity.state);
  const today = daily[0];
  const bigIcon = (
    <div
      className="big-icon"
      style={{ "--wx-color": current.color, "--wx-glow": withAlpha(current.color, 0.4) } as CSSProperties}
    >
      <Icon icon={config.icon ?? current.icon} />
    </div>
  );
  const reading = (
    <div className="temp-row">
      <span className="temp">{formatNumber(hass, (attributes.temperature as number) ?? 0, 0)}</span>
      <span className="deg">°</span>
    </div>
  );

  if (isRow) {
    /** Single line: glowing icon, place and conditions, temperature on the right. */
    const parts = [conditionLabel(entity.state)];
    if (today?.temperature !== undefined) parts.push(`${t("wx_high")} ${temp(today.temperature)}`);
    if (today?.templow !== undefined) parts.push(`${t("wx_low")} ${temp(today.templow)}`);
    return <>
      <LiquidGlassSurface
        className="card row"
        refraction={refraction}
        variant={config.glass_variant}
        sourceAccent={current.color}
        style={{ display: "flex", position: "relative" }}
      >
        {bigIcon}
        <CardTitle name={name} state={parts.filter(Boolean).join(" · ")} onClick={open} />
        {reading}
      </LiquidGlassSurface>
    </>;
  }

  const hours = config.show_hourly === false ? [] : hourly.slice(0, clamp(config.hourly_count ?? 6, 2, 12));
  const days = config.show_daily === false ? [] : daily.slice(0, clamp(config.daily_count ?? 4, 1, 10));
  // One scale across the shown days, so the bars are comparable row to row.
  const lows = days.map((day) => day.templow ?? day.temperature).filter((value): value is number => value !== undefined);
  const highs = days.map((day) => day.temperature).filter((value): value is number => value !== undefined);
  const min = Math.min(...lows, ...highs);
  const span = Math.max(...lows, ...highs) - min || 1;

  const humidity = attributes.humidity as number | undefined;
  const wind = attributes.wind_speed as number | undefined;
  const windUnit = (attributes.wind_speed_unit as string) ?? "";
  const chance = hourly[0]?.precipitation_probability ?? daily[0]?.precipitation_probability;
  const amount = hourly[0]?.precipitation ?? daily[0]?.precipitation;
  const tiles: Array<[icon: string, label: string, value: string]> = [];
  if (humidity !== undefined) tiles.push(["mdi:water-percent", t("humidity"), `${formatNumber(hass, humidity, 0)}%`]);
  if (wind !== undefined) tiles.push(["mdi:weather-windy", t("wx_wind"), `${formatNumber(hass, wind, 1)} ${windUnit}`.trim()]);
  if (chance !== undefined) tiles.push(["mdi:weather-rainy", t("wx_precip"), `${formatNumber(hass, chance, 0)}%`]);
  else if (amount !== undefined) tiles.push(["mdi:weather-rainy", t("wx_precip"), `${formatNumber(hass, amount, 1)} mm`]);

  return <>
    <LiquidGlassSurface
      className="card"
      refraction={refraction}
      variant={config.glass_variant}
      sourceAccent={current.color}
      style={{ display: "flex", position: "relative" }}
    >
      <div className="current">
        <div className="now" onClick={open}>
          <div className="city">{name}</div>
          <div className="condition">{conditionLabel(entity.state)}</div>
          {reading}
          {(today?.temperature !== undefined || today?.templow !== undefined) && <div className="hilo">
            {today?.temperature !== undefined && <span className="hi">{t("wx_high")} {temp(today.temperature)}</span>}
            {today?.templow !== undefined && <span className="lo">{t("wx_low")} {temp(today.templow)}</span>}
          </div>}
        </div>
        {bigIcon}
      </div>

      {hours.length > 0 && <div className="hourly">
        {hours.map((forecast, index) => {
          const hour = look(forecast.condition);
          return (
            <div
              key={forecast.datetime}
              className={`hour${index === 0 ? " now" : ""}`}
              style={{ "--wx-color": hour.color } as CSSProperties}
            >
              <span className="time">{index === 0 ? t("wx_now") : dateLabel(forecast.datetime, { hour: "numeric" })}</span>
              <Icon icon={hour.icon} />
              <span className="t">{temp(forecast.temperature)}</span>
            </div>
          );
        })}
      </div>}

      {days.length > 0 && <div className="daily">
        {days.map((forecast, index) => {
          const day = look(forecast.condition);
          const low = forecast.templow ?? forecast.temperature;
          const high = forecast.temperature;
          const left = low === undefined ? 0 : ((low - min) / span) * 100;
          const width = low === undefined || high === undefined ? 100 : Math.max(((high - low) / span) * 100, 6);
          const label = index === 0
            ? t("wx_today")
            : index === 1
              ? t("wx_tomorrow")
              : dateLabel(forecast.datetime, { weekday: "short" });
          return (
            <div
              key={forecast.datetime}
              className={`day${index === 0 ? " today" : ""}`}
              style={{ "--wx-color": day.color } as CSSProperties}
            >
              <span className="label">{label}</span>
              <Icon icon={day.icon} />
              <span className="lo">{temp(low)}</span>
              <div className="bar"><span style={{ left: `${left}%`, width: `${width}%` }} /></div>
              <span className="hi">{temp(high)}</span>
            </div>
          );
        })}
      </div>}

      {config.show_metrics !== false && tiles.length > 0 && <div className="metrics">
        {tiles.map(([icon, label, value]) => (
          <div className="metric" key={label}>
            <div className="head"><Icon icon={icon} /><span>{label}</span></div>
            <div className="v">{value}</div>
          </div>
        ))}
      </div>}
    </LiquidGlassSurface>
  </>;
}

export const LiquidGlassWeatherCard = defineLiquidGlassCard<WeatherCardConfig>({
  tagName: "liquid-glass-weather-card",
  component: WeatherCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, ownStyles],
  getCardSize: (config) => {
    if (config.layout === "row") return 1;
    let size = 3;
    if (config.show_hourly !== false) size += 1;
    if (config.show_daily !== false) size += 2;
    if (config.show_metrics !== false) size += 1;
    return size;
  },
  getGridOptions: (config) => {
    if (config.layout === "row") return rowGridOptions();
    let rows = 3;
    if (config.show_hourly !== false) rows += 1;
    if (config.show_daily !== false) rows += Math.ceil(clamp(config.daily_count ?? 4, 1, 10) * 44 / 64);
    if (config.show_metrics !== false) rows += 1;
    return contentGridOptions(rows, 12);
  },
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(["weather"], hass, entities, entitiesFallback),
  }),
});
