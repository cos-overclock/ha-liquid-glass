import type { GlassOptics } from "@samasante/liquid-glass";
import { createElement } from "react";

const flatGlassOptics: Partial<GlassOptics> = {
  strength: 0,
  curvature: 0,
  dispersion: 0,
  bend: 0,
};

/** Keep frosting and tint while disabling displacement when refraction is off. */
export function opticsFor(refraction: boolean): Partial<GlassOptics> | undefined {
  return refraction ? undefined : flatGlassOptics;
}

/** React 19 writes `icon` as a property on the existing lg-icon custom element. */
export function Icon({ icon, decorative = true }: { icon: string; decorative?: boolean }) {
  return createElement("lg-icon", {
    icon,
    ...(decorative ? { "aria-hidden": "true" } : {}),
  });
}
