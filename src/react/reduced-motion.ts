import {
  animateGlassValue,
  type GlassAnimation,
  type GlassMotionValue,
} from "@samasante/liquid-glass";
import type { MutableRefObject } from "react";

/** Nothing is running, so stopping it is a no-op. */
const SETTLED: GlassAnimation = { stop: () => {} };

/**
 * Read at call time rather than cached at module load: the OS setting can change
 * while a dashboard stays open, and every caller is already inside an event
 * handler or an effect, so the media query lookup is never on a hot path.
 */
export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined"
    && typeof window.matchMedia === "function"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * `animateGlassValue` that honours `prefers-reduced-motion`.
 *
 * The glass controls animate their lens geometry in JavaScript — a rAF loop writing
 * to motion values that feed WebGL and the SVG filter — so the
 * `@media (prefers-reduced-motion: reduce)` rules in the stylesheets never reach
 * them. Jumping to the target keeps the final state, which is what the setting asks
 * for, and skips the interpolation the user opted out of.
 *
 * `onComplete` still fires, synchronously: callers use it to return a state machine
 * to idle, and that has to happen whether or not the value was interpolated.
 */
export function animateGlass(
  value: GlassMotionValue,
  to: number,
  options?: {
    duration?: number;
    ease?: (t: number) => number;
    onComplete?: () => void;
  },
): GlassAnimation {
  if (!prefersReducedMotion()) return animateGlassValue(value, to, options);
  value.set(to);
  options?.onComplete?.();
  return SETTLED;
}

/**
 * Start the press-and-hold lens wobble, unless motion is reduced.
 *
 * `useLensWobble` is a continuous spring rather than a one-shot animation, so it is
 * silenced by never kicking it and leaving the hold amount at rest.
 */
export function holdWobble(
  holdRef: MutableRefObject<number>,
  kickRef: MutableRefObject<() => void>,
  amount = 0.175,
): void {
  if (prefersReducedMotion()) {
    holdRef.current = 0;
    return;
  }
  holdRef.current = amount;
  kickRef.current();
}
