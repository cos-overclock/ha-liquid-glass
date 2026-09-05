import { useCallback, useEffect, useRef, useState } from "react";

const DEFAULT_PENDING_MS = 4000;

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
