import { useEffect, useState, type CSSProperties } from "react";
import { createTranslator, relativeTime, type Translator } from "../i18n";
import { CardTitle, IconWell, UnavailableCard } from "../react/card-parts";
import { reactCardStyles } from "../react/card-styles";
import { defineLiquidGlassCard, type ReactCardProps } from "../react/define-liquid-glass-card";
import { glassSurfaceStyles, Icon, LiquidGlassSurface } from "../react/glass-primitives";
import { useCardHost } from "../react/use-card-host";
import { useVisibleTick } from "../react/use-visible-tick";
import { tokens } from "../styles/tokens";
import type { BaseCardConfig, HassEntity, HomeAssistant } from "../types";
import { formatNumber, friendlyName, isUnavailable, lighten, moreInfo, pickEntity, withAlpha } from "../utils";

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

/** Keep history rendering bounded while retaining every bucket's visible extrema. */
export function downsamplePoints(points: Point[], limit = 600): Point[] {
  if (points.length <= limit || limit < 4) return points;

  const result: Point[] = [points[0]];
  const bucketCount = Math.max(1, Math.floor((limit - 2) / 2));
  const interior = points.length - 2;
  for (let bucket = 0; bucket < bucketCount; bucket++) {
    const start = 1 + Math.floor((bucket * interior) / bucketCount);
    const end = 1 + Math.floor(((bucket + 1) * interior) / bucketCount);
    let low = start;
    let high = start;
    for (let index = start + 1; index < end; index++) {
      if (points[index].v < points[low].v) low = index;
      if (points[index].v > points[high].v) high = index;
    }
    if (low === high) result.push(points[low]);
    else if (low < high) result.push(points[low], points[high]);
    else result.push(points[high], points[low]);
  }
  result.push(points[points.length - 1]);
  return result;
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

const ownStyles = `
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
`;

interface HistoryData {
  points: Point[];
  trend: number | undefined;
}

async function fetchHistory(hass: HomeAssistant, entityId: string, hours: number): Promise<HistoryData> {
  const start = new Date(Date.now() - hours * 3600 * 1000).toISOString();
  try {
    const rows = await hass.callApi<HistoryRow[][]>(
      "GET",
      `history/period/${start}?filter_entity_id=${encodeURIComponent(entityId)}&minimal_response&no_attributes&significant_changes_only=0`,
    );
    const points: Point[] = [];
    for (const row of rows?.[0] ?? []) {
      const value = Number(row.state ?? row.s);
      const stamp = row.last_changed ?? row.last_updated;
      const time = stamp ? new Date(stamp).getTime() : (row.lu ?? 0) * 1000;
      if (Number.isFinite(value) && time) points.push({ t: time, v: value });
    }
    const current = Number(hass.states[entityId]?.state);
    if (Number.isFinite(current)) points.push({ t: Date.now(), v: current });
    // Compute the one-hour delta before sampling so a dense history stays exact.
    return { points: downsamplePoints(points), trend: trendOver(points) };
  } catch {
    return { points: [], trend: undefined };
  }
}

/** Change over the last hour, or undefined when there is not enough history. */
function trendOver(points: Point[]): number | undefined {
  if (points.length < 2) return undefined;
  const now = points[points.length - 1];
  const target = now.t - 3600 * 1000;
  let reference = points[0];
  for (const point of points) {
    if (point.t <= target) reference = point;
    else break;
  }
  return now.v - reference.v;
}

/** Catmull-Rom style smoothing, as a line path plus the area under it. */
export function sparkPath(points: Point[]): { line: string; area: string; last: [number, number] } | undefined {
  if (points.length < 2) return undefined;
  const t0 = points[0].t;
  const t1 = points[points.length - 1].t;
  let min = Infinity;
  let max = -Infinity;
  for (const point of points) {
    min = Math.min(min, point.v);
    max = Math.max(max, point.v);
  }
  if (max - min < 1e-9) {
    max += 1;
    min -= 1;
  }
  const pad = 10;
  const xs = points.map((point) => ((point.t - t0) / (t1 - t0 || 1)) * (W - 12));
  const ys = points.map((point) => pad + (1 - (point.v - min) / (max - min)) * (H - pad * 2));
  let line = `M ${xs[0].toFixed(1)} ${ys[0].toFixed(1)}`;
  for (let i = 0; i < points.length - 1; i++) {
    const x0 = xs[Math.max(0, i - 1)];
    const y0 = ys[Math.max(0, i - 1)];
    const x1 = xs[i];
    const y1 = ys[i];
    const x2 = xs[i + 1];
    const y2 = ys[i + 1];
    const x3 = xs[Math.min(points.length - 1, i + 2)];
    const y3 = ys[Math.min(points.length - 1, i + 2)];
    const c1x = x1 + (x2 - x0) / 6;
    const c1y = y1 + (y2 - y0) / 6;
    const c2x = x2 - (x3 - x1) / 6;
    const c2y = y2 - (y3 - y1) / 6;
    line += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`;
  }
  const lastX = xs[xs.length - 1];
  return {
    line,
    area: `${line} L ${lastX.toFixed(1)} ${H} L ${xs[0].toFixed(1)} ${H} Z`,
    last: [lastX, ys[ys.length - 1]],
  };
}

/** Degrees and percentages sit tight against the number; word units take a space. */
function withUnit(value: string, unit: string): string {
  if (!unit) return value;
  return /^[°%]/.test(unit) ? `${value}${unit}` : `${value} ${unit}`;
}

function subtitleFor(
  entity: HassEntity,
  config: SensorCardConfig,
  hass: HomeAssistant | undefined,
  lead: string | undefined,
  t: Translator,
): string {
  const parts = lead ? [lead] : [];
  parts.push(t("updated_ago", { t: relativeTime(entity.last_updated, t) }));
  const secondary = config.secondary_entity ? hass?.states[config.secondary_entity] : undefined;
  if (secondary && !isUnavailable(secondary)) {
    const label = config.secondary_label ?? secondary.attributes.friendly_name ?? "";
    parts.push(`${label} ${secondary.state}${secondary.attributes.unit_of_measurement ?? ""}`.trim());
  }
  return parts.join(" · ");
}

/** Big numeric value, 24h range, trend badge and a sparkline from the history API. */
function SensorCard({ config, hass, host }: ReactCardProps<SensorCardConfig>) {
  const { refraction } = useCardHost(host, config, hass);
  const t = createTranslator(config.language ?? hass?.locale?.language ?? hass?.language);
  const [points, setPoints] = useState<Point[]>([]);
  const [historyTrend, setHistoryTrend] = useState<number>();
  const entity = config.entity ? hass?.states[config.entity] : undefined;
  const name = config.name ?? friendlyName(entity, config.entity ?? "");
  const hours = config.hours_to_show ?? 24;
  const valueInCaption = config.value_in_caption === true;
  /** A caption reading leaves a single row, which has nowhere to put a graph. */
  const showGraph = config.graph !== false && !valueInCaption;
  const showTrend = config.trend !== false;
  const needsHistory = showGraph || showTrend;
  const canFetch = Boolean(hass && config.entity && needsHistory);
  const refreshTick = useVisibleTick(host, REFRESH_MS, canFetch);

  useEffect(() => {
    if (!hass || !config.entity || !needsHistory) return;
    let cancelled = false;
    // A trend-only compact card needs one hour, while a graph keeps its configured span.
    const historyHours = showGraph ? hours : 1;
    void fetchHistory(hass, config.entity, historyHours).then((history) => {
      if (!cancelled) {
        setPoints(history.points);
        setHistoryTrend(history.trend);
      }
    });
    return () => { cancelled = true; };
    /*
     * `hass` is left out deliberately. Its identity changes on every state push, and the
     * history is meant to refetch on the tick, not on each reading.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canFetch, config.entity, hours, needsHistory, refreshTick, showGraph]);

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

  const accent = config.accent ?? "#FF9F0A";
  const value = Number(entity.state);
  const numeric = Number.isFinite(value);
  const decimals = config.decimals;
  const unit = (entity.attributes.unit_of_measurement) ?? "";
  const trend = numeric && showTrend ? historyTrend : undefined;
  const spark = showGraph ? sparkPath(points) : undefined;
  let min: number | undefined;
  let max: number | undefined;
  for (const point of points) {
    min = min === undefined ? point.v : Math.min(min, point.v);
    max = max === undefined ? point.v : Math.max(max, point.v);
  }
  const icon = config.icon
    ?? (entity.attributes.icon)
    ?? (entity.attributes.device_class === "humidity" ? "mdi:water-percent" : "mdi:thermometer");
  const up = (trend ?? 0) >= 0;
  // Symbols read fine inside the badge; a word like "objects" would blow it out.
  const trendUnit = unit === "°C" || unit === "°F" ? "°" : unit.length <= 3 ? unit : "";
  const formatted = numeric ? formatNumber(hass, value, decimals) : entity.state;
  const caption = subtitleFor(entity, config, hass, valueInCaption ? withUnit(formatted, unit) : undefined, t);
  const open = () => moreInfo(host, config.entity);

  const head = <>
    <IconWell icon={icon} style={{ from: lighten(accent), to: accent, glow: withAlpha(accent, 0.24) }} onClick={open} />
    <CardTitle name={name} state={caption} onClick={open} />
    {trend !== undefined && <div
      className="badge trend"
      style={{
        "--badge-color": up ? "var(--lg-trend-up)" : "var(--lg-trend-down)",
        "--badge-bg": up ? "var(--lg-trend-up-bg)" : "var(--lg-trend-down-bg)",
        "--badge-stroke": up ? "rgba(48,209,88,0.3)" : "rgba(43,179,208,0.3)",
      } as CSSProperties}
    >
      <Icon icon={up ? "mdi:trending-up" : "mdi:trending-down"} />
      <span>{up ? "+" : "−"}{formatNumber(hass, Math.abs(trend), 1)}{trendUnit}</span>
    </div>}
  </>;

  return <>
    <LiquidGlassSurface
      className={`card${valueInCaption ? " row" : ""}`}
      refraction={refraction}
      variant={config.glass_variant}
      sourceAccent={accent}
      style={{ display: "flex", position: "relative", "--accent": accent } as CSSProperties}
    >
      {valueInCaption ? head : <div className="header">{head}</div>}

      {!valueInCaption && <div className="value-row">
        <div className="value">
          <span className="number">{formatted}</span>
          {unit && <span className="unit">{unit}</span>}
        </div>
        {showGraph && min !== undefined && max !== undefined && <div className="range">
          <span className="caption">{hours === 24 ? t("hours_24") : `${hours} h`}</span>
          <span className="rv">
            {formatNumber(hass, min, decimals ?? 1)} – {formatNumber(hass, max, decimals ?? 1)} {unit}
          </span>
        </div>}
      </div>}

      {showGraph && <>
        <svg className="spark" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={accent} stopOpacity="0.4" />
              <stop offset="1" stopColor={accent} stopOpacity="0" />
            </linearGradient>
          </defs>
          {spark && <>
            <path d={spark.area} fill="url(#area)" />
            <path className="line" d={spark.line} />
            <circle className="dot" cx={spark.last[0]} cy={spark.last[1]} r="4.75" />
          </>}
        </svg>
        <div className="axis">
          <span>{t("hours_ago", { n: hours })}</span>
          <span>{t("hours_ago", { n: Math.round(hours / 2) })}</span>
          <span>{t("now")}</span>
        </div>
      </>}
    </LiquidGlassSurface>
  </>;
}

export const LiquidGlassSensorCard = defineLiquidGlassCard<SensorCardConfig>({
  tagName: "liquid-glass-sensor-card",
  component: SensorCard,
  styles: [tokens, reactCardStyles, glassSurfaceStyles, ownStyles],
  getCardSize: (config) => {
    if (config.graph === false || config.value_in_caption) return config.value_in_caption ? 1 : 2;
    return 4;
  },
  getStubConfig: (hass?: HomeAssistant, entities?: string[], entitiesFallback?: string[]) => ({
    entity: pickEntity(["sensor"], hass, entities, entitiesFallback, (entity) => Number.isFinite(Number(entity.state))),
  }),
});
