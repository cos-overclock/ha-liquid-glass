// @vitest-environment jsdom
import type { GlassMotionValue } from "@samasante/liquid-glass";
import { afterEach, describe, expect, it, vi } from "vitest";
import { animateGlass, holdWobble, prefersReducedMotion } from "./reduced-motion";

/** Replaces window.matchMedia so the reduce query answers `reduce`. */
function setReducedMotion(reduce: boolean): void {
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: reduce && query.includes("prefers-reduced-motion: reduce"),
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

function motionValue(initial: number): GlassMotionValue {
  let current = initial;
  return {
    get: () => current,
    set: (next: number) => { current = next; },
    on: () => () => {},
  };
}

afterEach(() => vi.unstubAllGlobals());

describe("prefersReducedMotion", () => {
  it("follows the media query", () => {
    setReducedMotion(true);
    expect(prefersReducedMotion()).toBe(true);
    setReducedMotion(false);
    expect(prefersReducedMotion()).toBe(false);
  });

  it("is read per call, so toggling the OS setting takes effect without a reload", () => {
    setReducedMotion(false);
    expect(prefersReducedMotion()).toBe(false);
    setReducedMotion(true);
    expect(prefersReducedMotion()).toBe(true);
  });

  it("stays false where matchMedia is unavailable", () => {
    vi.stubGlobal("matchMedia", undefined);
    expect(prefersReducedMotion()).toBe(false);
  });
});

describe("animateGlass", () => {
  it("jumps to the target and reports completion when motion is reduced", () => {
    setReducedMotion(true);
    const value = motionValue(0);
    const onComplete = vi.fn();

    animateGlass(value, 42, { duration: 0.5, onComplete });

    expect(value.get()).toBe(42);
    expect(onComplete).toHaveBeenCalledOnce();
  });

  it("returns a stoppable animation when motion is reduced", () => {
    setReducedMotion(true);
    expect(() => animateGlass(motionValue(0), 1).stop()).not.toThrow();
  });

  it("interpolates as usual when motion is not reduced", () => {
    setReducedMotion(false);
    const value = motionValue(0);
    const onComplete = vi.fn();

    const animation = animateGlass(value, 42, { duration: 0.5, onComplete });

    // Still at the start of the run: the library has not been short-circuited.
    expect(value.get()).not.toBe(42);
    expect(onComplete).not.toHaveBeenCalled();
    animation.stop();
  });
});

describe("holdWobble", () => {
  it("kicks the wobble spring when motion is allowed", () => {
    setReducedMotion(false);
    const hold = { current: 0 };
    const kick = { current: vi.fn() };

    holdWobble(hold, kick);

    expect(hold.current).toBeGreaterThan(0);
    expect(kick.current).toHaveBeenCalledOnce();
  });

  it("stays at rest and never kicks when motion is reduced", () => {
    setReducedMotion(true);
    const hold = { current: 0.5 };
    const kick = { current: vi.fn() };

    holdWobble(hold, kick);

    expect(hold.current).toBe(0);
    expect(kick.current).not.toHaveBeenCalled();
  });
});
