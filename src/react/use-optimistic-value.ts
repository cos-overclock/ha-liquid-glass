import { useCallback, useEffect, useRef, useState } from "react";

/** How long a just-sent value is trusted before the entity's own value takes over. */
export const DEFAULT_PENDING_MS = 4000;

/**
 * Keeps the last value sent to Home Assistant visible until the entity reports it back.
 * Service calls and state propagation are asynchronous, so falling straight back to the
 * reported value after pointerup would briefly show the previous value.
 */
export function useOptimisticValue(
  reported: number | undefined,
  tolerance: number,
  pendingMs = DEFAULT_PENDING_MS,
) {
  const [preview, setPreview] = useState<number>();
  const [pending, setPending] = useState<number>();
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const settled = pending !== undefined
    && reported !== undefined
    && Math.abs(reported - pending) <= tolerance;

  useEffect(() => {
    if (!settled) return;
    window.clearTimeout(timer.current);
    setPending(undefined);
  }, [settled]);

  const commit = useCallback((value: number) => {
    setPreview(undefined);
    setPending(value);
    window.clearTimeout(timer.current);
    // Do not pin a value forever when a service call fails or the device rejects it.
    timer.current = window.setTimeout(() => setPending(undefined), pendingMs);
  }, [pendingMs]);

  const reset = useCallback(() => {
    setPreview(undefined);
    setPending(undefined);
    window.clearTimeout(timer.current);
  }, []);

  return {
    value: preview ?? pending ?? reported,
    optimistic: preview !== undefined || pending !== undefined,
    setPreview,
    commit,
    reset,
  };
}

/**
 * `useOptimisticValue` for a control that holds several values at once.
 *
 * A range thermostat sends `target_temp_low` and `target_temp_high` together and
 * reports them back in separate state pushes, so the hold has to cover a set of keys
 * and release only once every one of them has come back.
 */
export function useOptimisticRecord<K extends string>(
  reported: Partial<Record<K, number>>,
  tolerance: number,
  pendingMs = DEFAULT_PENDING_MS,
) {
  const [pending, setPending] = useState<Partial<Record<K, number>>>();
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const settled = pending !== undefined
    && (Object.entries(pending) as [K, number][]).every(([key, want]) => {
      const value = reported[key];
      return value !== undefined && Math.abs(value - want) <= tolerance;
    });

  useEffect(() => {
    if (!settled) return;
    window.clearTimeout(timer.current);
    setPending(undefined);
  }, [settled]);

  const hold = useCallback((key: K, value: number) => {
    setPending((held) => ({ ...held, [key]: value }));
    window.clearTimeout(timer.current);
    // A service call that never lands would otherwise freeze the control on a value
    // the device never took.
    timer.current = window.setTimeout(() => setPending(undefined), pendingMs);
  }, [pendingMs]);

  /** The held value for `key`, or the reported one once the hold has been released. */
  const value = (key: K, fallback: number): number =>
    pending?.[key] ?? reported[key] ?? fallback;

  return { pending, hold, value };
}
