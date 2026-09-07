import { useEffect, useRef, useState } from "react";

/**
 * True while the card can actually be seen.
 *
 * Home Assistant keeps unselected dashboard views mounted, so work scheduled by a card
 * nobody is looking at goes on indefinitely — on a wall tablet, for days. Watching both
 * the element's intersection and the document's visibility covers the two ways a card
 * goes unwatched: scrolled or switched away from, and the whole tab being in the
 * background.
 */
export function useCardVisible(host: HTMLElement, enabled = true): boolean {
  const [onScreen, setOnScreen] = useState(true);
  const [pageVisible, setPageVisible] = useState(
    () => typeof document === "undefined" || document.visibilityState === "visible",
  );

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    // A margin so a card just below the fold is already current by the time it is reached.
    const observer = new IntersectionObserver(
      (entries) => setOnScreen(entries.some((entry) => entry.isIntersecting)),
      { rootMargin: "128px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, [host]);

  useEffect(() => {
    const sync = () => setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  return enabled && onScreen && pageVisible;
}

/**
 * A counter that advances every `intervalMs` while `active`, and once more the moment
 * `active` returns after a pause.
 */
export function useTickWhile(active: boolean, intervalMs: number): number {
  const [tick, setTick] = useState(0);
  /** Starts true so the first activation is a mount, not a resume, and fetches once. */
  const wasActive = useRef(true);

  useEffect(() => {
    if (!active) {
      wasActive.current = false;
      return;
    }
    // Whatever was fetched before going quiet is stale now: catch up once, then settle
    // back into the interval.
    if (!wasActive.current) setTick((value) => value + 1);
    wasActive.current = true;
    const timer = window.setInterval(() => setTick((value) => value + 1), intervalMs);
    return () => window.clearInterval(timer);
  }, [active, intervalMs]);

  return tick;
}

/** A counter that advances every `intervalMs`, but only while the card can be seen. */
export function useVisibleTick(host: HTMLElement, intervalMs: number, enabled = true): number {
  return useTickWhile(useCardVisible(host, enabled), intervalMs);
}
