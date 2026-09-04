import { describe, expect, it } from "vitest";
import { opticsFor } from "./glass-primitives";

describe("Liquid Glass optical presets", () => {
  it("uses stronger, clearer optics for clear glass", () => {
    const regular = opticsFor(true, "regular", "card");
    const clear = opticsFor(true, "clear", "card");
    expect(clear.strength).toBeGreaterThan(regular.strength ?? 0);
    expect(clear.dispersion).toBeGreaterThan(regular.dispersion ?? 0);
    expect(clear.frost).toBeLessThan(regular.frost ?? 0);
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
});
