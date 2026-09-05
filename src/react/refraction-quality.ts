import type { GlassOptics } from "@samasante/liquid-glass";
import { createContext, useContext } from "react";
import type { RefractionQuality } from "../types";

export const RefractionQualityContext = createContext<RefractionQuality>("high");

export function useRefractionQuality(): RefractionQuality {
  return useContext(RefractionQualityContext);
}

/** Medium mode removes 2x supersampling while retaining the displacement lens. */
export function filterResolutionForQuality(quality: RefractionQuality): 1 | 2 {
  return quality === "medium" ? 1 : 2;
}

/** What the library falls back to when a preset leaves `mapSize` unset. */
const DEFAULT_MAP_SIZE = 512;

/**
 * Below this the rounded-rect silhouette starts to feather visibly on the small
 * control lenses, which rasterize their shape into the map (`clipToShape`).
 */
const MIN_MAP_SIZE = 96;

/**
 * Medium quality keeps the lens geometry and cuts only what a phone cannot resolve.
 *
 * - A zero dispersion value selects one displacement pass instead of separate RGB passes.
 * - Halving `mapSize` quarters the per-instance work: the SDF is rasterized pixel by
 *   pixel in JS, encoded as a PNG data URL and decoded again by the filter, and all
 *   three costs scale with its area. The map is a smooth field that `feImage` samples
 *   with `preserveAspectRatio="none"`, so bilinear upscaling reproduces it.
 *
 * High quality returns the input untouched, so a caller can hand a module-level
 * constant straight through and keep its identity.
 */
export function opticsForQuality(
  optics: Partial<GlassOptics>,
  quality: RefractionQuality,
): Partial<GlassOptics> {
  if (quality !== "medium") return optics;
  const mapSize = optics.mapSize ?? DEFAULT_MAP_SIZE;
  return {
    ...optics,
    dispersion: 0,
    // `Math.min` keeps the downgrade monotonic: without it a preset already below
    // 2 × MIN_MAP_SIZE would be raised by the floor, making medium cost more than high.
    mapSize: Math.min(mapSize, Math.max(MIN_MAP_SIZE, mapSize >> 1)),
  };
}
