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
});
