import type { HomeAssistant } from "./types";

/** One numeric reading: `t` is a millisecond epoch, `v` the value. */
export interface HistoryPoint {
  t: number;
  v: number;
}

/** What a card draws: a bounded series plus the change over the last hour. */
export interface HistorySeries {
  points: HistoryPoint[];
  trend: number | undefined;
}

export const EMPTY_SERIES: HistorySeries = { points: [], trend: undefined };

/** How often the REST fallback refetches when the socket is unavailable. */
export const HISTORY_REFRESH_MS = 5 * 60 * 1000;

const HOUR_MS = 3600 * 1000;

/** A row of `history/period`, in both the verbose and the `minimal_response` spelling. */
interface HistoryRow {
  s?: string;
  lu?: number;
  state?: string;
  last_changed?: string;
  last_updated?: string;
}

/** One state in a `history/stream` chunk. `lu` is an epoch in seconds, not milliseconds. */
interface HistoryStreamState {
  s?: string;
  lu?: number;
}

interface HistoryStreamMessage {
  states?: Record<string, HistoryStreamState[]>;
}

/** Keep history rendering bounded while retaining every bucket's visible extrema. */
export function downsamplePoints(points: HistoryPoint[], limit = 600): HistoryPoint[] {
  if (points.length <= limit || limit < 4) return points;

  const result: HistoryPoint[] = [points[0]];
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

/** Change over the last hour, or undefined when there is not enough history. */
export function trendOver(points: HistoryPoint[]): number | undefined {
  if (points.length < 2) return undefined;
  const now = points[points.length - 1];
  const target = now.t - HOUR_MS;
  let reference = points[0];
  for (const point of points) {
    if (point.t <= target) reference = point;
    else break;
  }
  return now.v - reference.v;
}

/**
 * Drop everything that has scrolled out of the window.
 *
 * A subscription only ever grows: the socket keeps appending while the window slides
 * forward, so the trimming the REST call used to get for free — a fresh `start_time` on
 * every fetch — has to happen here. The last reading from before the cutoff is kept and
 * moved onto it, because a sensor that has not changed for hours is still the value at
 * the left edge, and dropping it would start the line partway across the card.
 */
export function trimToWindow(points: HistoryPoint[], cutoff: number): HistoryPoint[] {
  let anchor = -1;
  for (let index = 0; index < points.length; index++) {
    if (points[index].t <= cutoff) anchor = index;
    else break;
  }
  if (anchor < 0) return points;

  const kept = points.slice(anchor);
  return [{ t: cutoff, v: kept[0].v }, ...kept.slice(1)];
}

/**
 * Turn a raw series into what the card draws.
 *
 * The current reading is appended so the line always reaches the right edge, and the
 * trend is measured before downsampling so a dense history stays exact.
 */
export function toSeries(
  raw: HistoryPoint[],
  reading: number | undefined,
  hours: number,
  now = Date.now(),
): HistorySeries {
  const points = trimToWindow(raw, now - hours * HOUR_MS).slice();
  if (reading !== undefined && Number.isFinite(reading)) {
    const last = points[points.length - 1];
    if (!last || last.t < now) points.push({ t: now, v: reading });
  }
  if (points.length === 0) return EMPTY_SERIES;
  return { points: downsamplePoints(points), trend: trendOver(points) };
}

/** Append the states a stream chunk carries, keeping the series ascending and unique. */
export function mergeStreamStates(
  points: HistoryPoint[],
  states: HistoryStreamState[] | undefined,
): HistoryPoint[] {
  if (!states?.length) return points;

  const merged = points.slice();
  for (const state of states) {
    const value = Number(state.s);
    // `lu` is in seconds, and a chunk can repeat the last state the client already has.
    const time = typeof state.lu === "number" ? state.lu * 1000 : NaN;
    if (!Number.isFinite(value) || !Number.isFinite(time)) continue;
    const last = merged[merged.length - 1];
    if (last && time <= last.t) continue;
    merged.push({ t: time, v: value });
  }
  return merged;
}

function windowStart(hours: number): string {
  return new Date(Date.now() - hours * HOUR_MS).toISOString();
}

/**
 * One-shot history over the REST API.
 *
 * Kept for hosts without a usable socket: Home Assistant older than the `history/stream`
 * command, and anything that hands the card a `hass` without a connection.
 */
export async function fetchHistory(
  hass: HomeAssistant,
  entityId: string,
  hours: number,
): Promise<HistoryPoint[]> {
  const start = windowStart(hours);
  try {
    const rows = await hass.callApi<HistoryRow[][]>(
      "GET",
      `history/period/${start}?filter_entity_id=${encodeURIComponent(entityId)}&minimal_response&no_attributes&significant_changes_only=0`,
    );
    const points: HistoryPoint[] = [];
    for (const row of rows?.[0] ?? []) {
      const value = Number(row.state ?? row.s);
      const stamp = row.last_changed ?? row.last_updated;
      const time = stamp ? new Date(stamp).getTime() : (row.lu ?? 0) * 1000;
      if (Number.isFinite(value) && time) points.push({ t: time, v: value });
    }
    return points;
  } catch {
    return [];
  }
}

/**
 * Live history over the WebSocket.
 *
 * `history/stream` answers with the whole window first and then pushes each new state as
 * the recorder writes it, so the sparkline follows the sensor instead of catching up on
 * a five-minute timer — and one socket subscription replaces a REST request per card per
 * interval, which is what a dashboard full of sensors actually costs the server.
 *
 * Resolves to the unsubscribe function, and rejects when the command is unavailable, so
 * the caller can fall back to {@link fetchHistory}.
 */
export async function subscribeHistory(
  hass: HomeAssistant,
  entityId: string,
  hours: number,
  onPoints: (points: HistoryPoint[]) => void,
): Promise<() => void> {
  const connection = hass.connection;
  if (!connection?.subscribeMessage) throw new Error("history/stream is unavailable");

  let points: HistoryPoint[] = [];
  const unsubscribe = await connection.subscribeMessage<HistoryStreamMessage>(
    (message) => {
      const states = message?.states?.[entityId];
      if (!states) return;
      points = mergeStreamStates(points, states);
      onPoints(points);
    },
    {
      type: "history/stream",
      entity_ids: [entityId],
      start_time: windowStart(hours),
      minimal_response: true,
      no_attributes: true,
      significant_changes_only: false,
    },
  );

  return () => void unsubscribe();
}
