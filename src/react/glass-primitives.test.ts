import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { glassSurfaceStyles, LiquidGlassSurface, opticsFor } from "./glass-primitives";
import { filterResolutionForQuality, opticsForQuality } from "./refraction-quality";

describe("Liquid Glass optical presets", () => {
  it("uses stronger, clearer optics for clear glass", () => {
    const regular = opticsFor(true, "regular", "card");
    const clear = opticsFor(true, "clear", "card");
    expect(clear.strength).toBeGreaterThan(regular.strength ?? 0);
    expect(clear.frost).toBeLessThan(regular.frost ?? 0);
  });

  it("leaves dispersion off, which the copied-source filter would render as a dark veil", () => {
    for (const variant of ["regular", "clear"] as const) {
      for (const surface of ["card", "compact", "control"] as const) {
        expect(opticsFor(true, variant, surface).dispersion).toBe(0);
      }
    }
  });

  it("uses a deeper lens for controls than full cards", () => {
    const card = opticsFor(true, "regular", "card");
    const control = opticsFor(true, "regular", "control");
    expect(control.strength).toBeGreaterThan(card.strength ?? 0);
    expect(control.curvature).toBeGreaterThan(card.curvature ?? 0);
    expect(control.bend).toBeGreaterThan(card.bend ?? 0);
  });

  it("keeps material styling but disables displacement when refraction is off", () => {
    const flat = opticsFor(false, "regular", "control");
    expect(flat).toMatchObject({
      strength: 0,
      scaleX: 0,
      scaleY: 0,
      curvature: 0,
      dispersion: 0,
      bend: 0,
    });
    expect(flat.frost).toBeGreaterThan(0);
  });

  it("does not mount the filter engine when refraction is off", () => {
    const markup = renderToStaticMarkup(
      createElement(LiquidGlassSurface, { refraction: false, className: "card" }, "content"),
    );

    expect(markup).toContain("data-lg-static-glass");
    expect(markup).not.toContain("data-liquid-glass");
    expect(markup).not.toContain("data-lg-refraction-source");
  });

  it("gives the lightweight surface a layered glass appearance without filters", () => {
    const staticRuleStart = glassSurfaceStyles.indexOf(
      '.lg-liquid-surface[data-lg-static-glass=""] {',
    );
    const staticRuleEnd = glassSurfaceStyles.indexOf("\n  }", staticRuleStart);
    const staticRule = glassSurfaceStyles.slice(staticRuleStart, staticRuleEnd);

    expect(staticRule).toContain("radial-gradient");
    expect(staticRule).toContain("linear-gradient");
    expect(staticRule).toContain("inset 1px 1px 0");
    expect(staticRule).not.toContain("backdrop-filter");
    expect(staticRule).not.toMatch(/(?:^|[;{\s])filter\s*:/);
  });

  it("uses a smaller displacement map for enabled surfaces", () => {
    expect(opticsFor(true, "regular", "card").mapSize).toBe(256);
    expect(opticsFor(true, "clear", "control").mapSize).toBe(256);
  });

  it("keeps refraction but removes supersampling and RGB dispersion at medium quality", () => {
    const highOptics = { strength: 0.2, dispersion: 0.5, frost: 4 };
    const mediumOptics = opticsForQuality(highOptics, "medium");

    expect(filterResolutionForQuality("high")).toBe(2);
    expect(filterResolutionForQuality("medium")).toBe(1);
    expect(opticsForQuality(highOptics, "high")).toBe(highOptics);
    expect(mediumOptics).toMatchObject({ strength: 0.2, dispersion: 0, frost: 4 });
  });

  it("halves the displacement map at medium quality, down to a legible floor", () => {
    expect(opticsForQuality({ mapSize: 512 }, "medium").mapSize).toBe(256);
    expect(opticsForQuality({ mapSize: 256 }, "medium").mapSize).toBe(128);
    // The control lenses already start small; a further halving would feather
    // their `clipToShape` silhouette.
    expect(opticsForQuality({ mapSize: 128 }, "medium").mapSize).toBe(96);
    // An unset mapSize follows the library's own 512 default.
    expect(opticsForQuality({}, "medium").mapSize).toBe(256);
  });

  it("applies medium quality to card surfaces, not only to controls", () => {
    for (const variant of ["regular", "clear"] as const) {
      for (const surface of ["card", "compact", "control"] as const) {
        const high = opticsFor(true, variant, surface, "high");
        const medium = opticsFor(true, variant, surface, "medium");
        expect(medium.mapSize).toBe((high.mapSize ?? 0) / 2);
        // Everything that shapes the lens has to survive the downgrade.
        expect(medium).toMatchObject({
          strength: high.strength,
          depth: high.depth,
          curvature: high.curvature,
          bend: high.bend,
          bendWidth: high.bendWidth,
        });
      }
    }
  });

  it("drops the frost blur from refracted surfaces at medium quality", () => {
    for (const variant of ["regular", "clear"] as const) {
      for (const surface of ["card", "compact", "control"] as const) {
        expect(opticsFor(true, variant, surface, "high").frost).toBeGreaterThan(0);
        expect(opticsFor(true, variant, surface, "medium").frost).toBe(0);
      }
    }
  });

  /*
   * The media control lens and the camera card frost the real content behind them
   * instead of an owned copy, so the shared downgrade must not touch frost.
   */
  it("leaves frost alone for lenses that blur live content", () => {
    expect(opticsForQuality({ mapSize: 512, frost: 5 }, "medium").frost).toBe(5);
  });

  /*
   * <Glass> memoises its merged optics on this object's identity. A new object per
   * render bumps the filter id and re-rasterizes the surface on every state push,
   * which costs far more than the quality downgrade saves.
   */
  it("returns a stable optics reference for repeated lookups", () => {
    for (const refraction of [true, false]) {
      for (const quality of ["high", "medium"] as const) {
        expect(opticsFor(refraction, "regular", "card", quality)).toBe(
          opticsFor(refraction, "regular", "card", quality),
        );
      }
    }
  });
});
