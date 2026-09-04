import { EDGE_NORMALS, SHADER, rimLight } from "./shader-profile";

/**
 * The shader's specular, fresnel and hairline terms, baked into CSS gradients.
 *
 * They cannot live in the filter: Chromium runs neither feSpecularLighting nor a partly
 * transparent feImage inside backdrop-filter. Painting them instead has the side benefit of
 * reaching Safari and Firefox, which never run the filter at all.
 *
 * Stops are in pixels, so the rim keeps the shader's real width whatever size the card is —
 * the displacement map, stretched to the element, can only approximate that.
 */

/** Dense near the rim: the new profile is all but finished three pixels in. */
const SAMPLES = [0, 0.5, 1, 1.5, 2, 2.5, 3, 4, 5, 7, 9, 12, 16, 22, 28];

const DIRECTION: Record<keyof typeof EDGE_NORMALS, string> = {
  top: "to bottom",
  bottom: "to top",
  left: "to right",
  right: "to left",
};

/**
 * One edge as a gradient. `gain` scales the whole rim so dark mode can sit back a little;
 * it multiplies through a CSS variable so a theme can still override it.
 */
function edgeGradient(edge: keyof typeof EDGE_NORMALS, gain: string): string {
  const stops = SAMPLES.map((sd) => {
    const value = rimLight(sd / SHADER.edge, sd, EDGE_NORMALS[edge], SHADER.lightAngle, SHADER.highlight);
    // Positive brightens, negative is the shader's shadow on the side facing away.
    const channel = value >= 0 ? "255 255 255" : "0 0 0";
    const alpha = Math.min(Math.abs(value), 1).toFixed(4);
    return `rgb(${channel} / calc(${gain} * ${alpha})) ${sd}px`;
  });
  return `linear-gradient(${DIRECTION[edge]}, ${stops.join(", ")})`;
}

/** All four edges, ready to drop into a `background` shorthand. */
export function rimBackground(gain = "var(--lg-rim-gain, 1)"): string {
  return (Object.keys(EDGE_NORMALS) as Array<keyof typeof EDGE_NORMALS>)
    .map((edge) => edgeGradient(edge, gain))
    .join(", ");
}
