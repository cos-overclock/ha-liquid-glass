import { useEffect, useMemo, useRef, useState } from "react";
import {
  EMPTY_SERIES,
  fetchHistory,
  HISTORY_REFRESH_MS,
  subscribeHistory,
  toSeries,
  type HistoryPoint,
  type HistorySeries,
} from "../history";
import type { HomeAssistant } from "../types";
import { useCardVisible, useTickWhile } from "./use-visible-tick";

/**
 * A numeric entity's recent history, live where Home Assistant can push it.
 *
 * The socket is the normal path: `history/stream` sends the window once and then every
 * new state as it is recorded, so the graph moves with the sensor and a dashboard full of
 * cards costs one subscription each instead of a REST request each, every five minutes.
 * The REST poll stays for hosts that cannot stream — an older Home Assistant, or a `hass`
 * handed over without a connection — and is also where a rejected subscription lands.
 *
 * Both paths stop while the card is off screen or the tab is in the background, and a
 * card that comes back refetches rather than drawing what was true when it left.
 */
export function useEntityHistory(
  host: HTMLElement,
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
  hours: number,
  enabled = true,
): HistorySeries {
  const [raw, setRaw] = useState<HistoryPoint[]>([]);
  const [streamFailed, setStreamFailed] = useState(false);

  /*
   * `hass` is read through a ref on purpose. Its identity changes on every state push,
   * and neither the subscription nor the fetch should be torn down and rebuilt for a
   * reading that the render path already has.
   */
  const hassRef = useRef(hass);
  hassRef.current = hass;

  const wanted = Boolean(enabled && entityId && hass);
  const visible = useCardVisible(host, wanted);
  /** The connection object outlives the `hass` objects that carry it. */
  const connection = hass?.connection;
  const canStream = Boolean(wanted && connection?.subscribeMessage && !streamFailed);
  const tick = useTickWhile(visible && !canStream, HISTORY_REFRESH_MS);

  useEffect(() => {
    if (!canStream || !visible || !entityId) return;
    const current = hassRef.current;
    if (!current) return;

    let live = true;
    let unsubscribe: (() => void) | undefined;
    void subscribeHistory(current, entityId, hours, (points) => {
      if (live) setRaw(points);
    }).then(
      (stop) => {
        // Unsubscribing before the socket answered leaves the subscription open, so the
        // resolved handle is closed straight away when the effect is already gone.
        if (live) unsubscribe = stop;
        else stop();
      },
      () => {
        // No stream on this host after all: hand the card to the polling path for good.
        if (live) setStreamFailed(true);
      },
    );

    return () => {
      live = false;
      unsubscribe?.();
    };
  }, [canStream, visible, entityId, hours]);

  useEffect(() => {
    if (canStream || !visible || !entityId) return;
    const current = hassRef.current;
    if (!current) return;

    let cancelled = false;
    void fetchHistory(current, entityId, hours).then((points) => {
      if (!cancelled) setRaw(points);
    });
    return () => { cancelled = true; };
  }, [canStream, visible, entityId, hours, tick]);

  const entity = entityId ? hass?.states[entityId] : undefined;
  const reading = entity ? Number(entity.state) : undefined;

  return useMemo(
    () => (wanted ? toSeries(raw, reading, hours) : EMPTY_SERIES),
    // `last_updated` is what moves the series forward when a sensor reports the same
    // number twice; `reading` alone would hold the line still.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [wanted, raw, reading, entity?.last_updated, hours],
  );
}
