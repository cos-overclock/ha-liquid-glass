import { Glass, type GlassOptics, type GlassProps } from "@samasante/liquid-glass";
import { createElement, type ReactNode } from "react";

type GlassVariant = "regular" | "clear";
type GlassSurface = "card" | "compact" | "control";

const regularCardOptics: Partial<GlassOptics> = {
  strength: 0.035,
  depth: 0.28,
  curvature: 0.14,
  dispersion: 0.18,
  bend: 0.38,
  bendWidth: 0.12,
  frost: 7,
  saturate: 1.3,
  sheen: 0.42,
  sheenWidth: 2.5,
  sheenFalloff: 1.6,
  glow: 0.12,
  glowSpread: 0.55,
  glowFalloff: 0.7,
  specular: 1.18,
  brightness: 0.015,
};

const clearCardOptics: Partial<GlassOptics> = {
  ...regularCardOptics,
  strength: 0.05,
  depth: 0.36,
  curvature: 0.2,
  dispersion: 0.24,
  bend: 0.48,
  bendWidth: 0.1,
  frost: 3,
  saturate: 1.4,
  sheen: 0.52,
  glow: 0.12,
  specular: 1.28,
  brightness: 0,
};

const regularControlOptics: Partial<GlassOptics> = {
  ...regularCardOptics,
  strength: 0.12,
  depth: 0.88,
  curvature: 0.58,
  dispersion: 0.48,
  bend: 0.74,
  bendWidth: 0.14,
  frost: 4,
  sheen: 0.72,
  glow: 0.22,
  specular: 1.3,
};

const clearControlOptics: Partial<GlassOptics> = {
  ...regularControlOptics,
  strength: 0.14,
  curvature: 0.66,
  dispersion: 0.54,
  frost: 2,
  saturate: 1.45,
};

const flat = (optics: Partial<GlassOptics>): Partial<GlassOptics> => ({
  ...optics,
  strength: 0,
  scaleX: 0,
  scaleY: 0,
  curvature: 0,
  dispersion: 0,
  bend: 0,
});

const opticPresets = {
  regular: {
    card: regularCardOptics,
    compact: regularCardOptics,
    control: regularControlOptics,
  },
  clear: {
    card: clearCardOptics,
    compact: clearCardOptics,
    control: clearControlOptics,
  },
} as const;

/** Explicit SDF optics shared by every React card. */
export function opticsFor(
  refraction: boolean,
  variant: GlassVariant = "regular",
  surface: GlassSurface = "card",
): Partial<GlassOptics> {
  const preset = opticPresets[variant][surface];
  return refraction ? preset : flat(preset);
}

export const glassSurfaceStyles = `
  .lg-liquid-surface {
    isolation: isolate;
    background: rgba(var(--lg-glass-tint), var(--lg-glass-tint-alpha));
  }
  .lg-liquid-card {
    box-shadow: 0 14px 36px -4px var(--lg-shadow-glass);
  }
  .lg-liquid-compact {
    box-shadow: 0 4px 14px -2px var(--lg-shadow-glass);
  }
  .lg-liquid-control {
    background: rgba(255, 255, 255, 0.32);
    box-shadow: 0 5px 14px rgba(0, 0, 0, 0.46);
  }
  :host([dark]) .lg-liquid-control {
    background: rgba(255, 255, 255, 0.18);
  }
  /*
   * The DOM refraction route inserts a crisp-content wrapper before its optical
   * layers. Recreate the surface layout on that wrapper and keep it above the
   * refracted background. Without this, a card becomes one blank flex item and
   * the later SVG layer paints over its contents.
   */
  .lg-liquid-surface[data-liquid-glass=""] > :first-child {
    position: relative;
    z-index: 2;
    min-width: 0;
    box-sizing: border-box;
  }
  .lg-liquid-card[data-liquid-glass=""] > :first-child {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: inherit;
  }
  .lg-liquid-compact[data-liquid-glass=""] > :first-child {
    display: contents;
  }
  .lg-liquid-compact[data-liquid-glass=""] > :first-child > * {
    position: relative;
    z-index: 2;
  }
  .lg-liquid-control[data-liquid-glass=""] > :first-child {
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
  }
  .lg-refraction-source {
    width: 100%;
    height: 100%;
    min-height: inherit;
    border-radius: inherit;
    background:
      radial-gradient(circle at 14% 2%, rgba(255, 255, 255, 0.72), transparent 34%),
      radial-gradient(circle at 88% 96%, color-mix(in srgb, var(--lg-refraction-accent, var(--lg-accent)) 42%, transparent), transparent 48%),
      linear-gradient(135deg, rgba(var(--lg-glass-tint), 0.34), rgba(var(--lg-glass-tint), 0.08));
  }
  :host([dark]) .lg-refraction-source {
    background:
      radial-gradient(circle at 14% 2%, rgba(255, 255, 255, 0.32), transparent 34%),
      radial-gradient(circle at 88% 96%, color-mix(in srgb, var(--lg-refraction-accent, var(--lg-accent)) 34%, transparent), transparent 48%),
      linear-gradient(135deg, rgba(255, 255, 255, 0.14), rgba(0, 0, 0, 0.14));
  }
`;

interface LiquidGlassSurfaceProps extends Omit<GlassProps, "behind" | "filterResolution" | "optics" | "refract"> {
  refraction: boolean;
  variant?: GlassVariant;
  surface?: GlassSurface;
  sourceAccent?: string;
  sourceBackground?: string;
  children?: ReactNode;
}

/**
 * Cross-browser Glass wrapper. When refraction is enabled React supplies an owned
 * source copy, selecting the library's SVG `filter: url()` path in every engine.
 */
export function LiquidGlassSurface({
  refraction,
  variant = "regular",
  surface = "card",
  sourceAccent,
  sourceBackground,
  className,
  children,
  ...props
}: LiquidGlassSurfaceProps) {
  const source = refraction ? (
    <div
      aria-hidden="true"
      className="lg-refraction-source"
      data-lg-refraction-source="copy"
      style={{
        ...(sourceAccent ? { "--lg-refraction-accent": sourceAccent } : {}),
        ...(sourceBackground ? { background: sourceBackground } : {}),
      }}
    />
  ) : undefined;
  const surfaceClass = `lg-liquid-surface lg-liquid-${surface}${className ? ` ${className}` : ""}`;

  return (
    <Glass
      {...props}
      className={surfaceClass}
      optics={opticsFor(refraction, variant, surface)}
      refract={source}
      behind="var(--primary-background-color, transparent)"
      filterResolution={refraction ? 2 : undefined}
    >
      {children}
    </Glass>
  );
}

/** React 19 writes `icon` as a property on the existing lg-icon custom element. */
export function Icon({ icon, decorative = true }: { icon: string; decorative?: boolean }) {
  return createElement("lg-icon", {
    icon,
    ...(decorative ? { "aria-hidden": "true" } : {}),
  });
}
