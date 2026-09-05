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

/** A zero dispersion value selects one displacement pass instead of separate RGB passes. */
export function opticsForQuality(
  optics: Partial<GlassOptics>,
  quality: RefractionQuality,
): Partial<GlassOptics> {
  return quality === "medium" ? { ...optics, dispersion: 0 } : optics;
}
