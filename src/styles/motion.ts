/**
 * A custom property only interpolates once it has been registered with a type, so the
 * colours that need to animate are declared here. Without this an icon well or a dial ring
 * would jump straight to its new colour: `background` carrying a gradient is not an
 * animatable value, but the properties the gradient is built from can be.
 *
 * Registration is global and throws when a name is already taken, so each call is guarded —
 * the bundle may be loaded more than once on a dashboard.
 */
const ANIMATABLE_COLORS: Array<[name: string, initialValue: string]> = [
  // The icon well gradient. Initial values match the fallbacks in glass.ts, because a
  // registered property's initial value wins over the fallback in var(--x, fallback).
  ["--well-from", "#ffd36b"],
  ["--well-to", "#ff8a1f"],
  ["--well-glow", "rgba(255, 165, 48, 0.24)"],
  // The climate dial's ring, whose three stops change with the mode.
  ["--lg-ring-0", "#ffb36b"],
  ["--lg-ring-1", "#ff6a3d"],
  ["--lg-ring-2", "#ff2d55"],
];

export function registerAnimatableColors(): void {
  const api = typeof CSS !== "undefined" ? (CSS as { registerProperty?: (d: object) => void }) : undefined;
  if (!api?.registerProperty) return;
  for (const [name, initialValue] of ANIMATABLE_COLORS) {
    try {
      api.registerProperty({ name, syntax: "<color>", inherits: true, initialValue });
    } catch {
      // Already registered. Nothing to do, and nothing to warn about.
    }
  }
}
