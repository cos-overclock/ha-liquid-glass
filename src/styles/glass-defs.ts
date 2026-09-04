import { html, svg } from "lit";

/**
 * SVG filter port of pen/liquid-glass.glsl for use in `backdrop-filter: url(#id)`.
 *
 * The shader samples the pixels behind the surface, and `backdrop-filter` is the only
 * browser primitive with access to those, so the whole effect is expressed as filter
 * primitives rather than as GLSL. The graph mirrors the shader step for step:
 *
 *   blur + saturate      → feGaussianBlur, feColorMatrix       (sampleBg, u_saturation)
 *   Snell refraction     → feDisplacementMap driven by feImage  (refractDisp, u_refraction)
 *   chromatic dispersion → three displacement passes recombined (u_chroma)
 *
 * The specular, fresnel and hairline terms are not here: Chromium runs neither
 * feSpecularLighting nor a partly transparent feImage inside backdrop-filter, so glass.ts
 * paints them from the same equations instead — which also gets them into Safari and
 * Firefox, where this filter never runs.
 */

import { SHADER, inwardShift } from "./shader-profile";

/** Sampled densely near the rim, where the Snell curve turns over sharply. */
const PROFILE = [0, 0.01, 0.02, 0.04, 0.07, 0.1, 0.15, 0.22, 0.3, 0.4, 0.55, 0.7, 0.85, 1];

/**
 * Largest inward pull the map can express. The shader's curve runs away to hundreds of
 * pixels in the last fraction of a pixel before the edge, which the border radius clips
 * anyway, so it is capped here and the map saturates.
 */
const MAX_SHIFT = 40;

function dataUri(body: string): string {
  const src = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none">${body}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(src)}`;
}

/** Rects covering the two bands of one axis, plus the gradients they are painted with. */
function bands(axis: "x" | "y", band: number) {
  const horizontal = axis === "x";
  const b = band.toFixed(4);
  const far = (1 - band).toFixed(4);
  return {
    gradA: horizontal ? `x1="0" y1="0" x2="1" y2="0"` : `x1="0" y1="0" x2="0" y2="1"`,
    gradB: horizontal ? `x1="1" y1="0" x2="0" y2="0"` : `x1="0" y1="1" x2="0" y2="0"`,
    rectA: horizontal ? `x="0" y="0" width="${b}" height="1"` : `x="0" y="0" width="1" height="${b}"`,
    rectB: horizontal ? `x="${far}" y="0" width="${b}" height="1"` : `x="0" y="${far}" width="1" height="${b}"`,
  };
}

/**
 * Displacement map for one axis, following the shader's refracted profile.
 *
 * Each axis writes to its own channel — x to red, y to green — because the two maps are
 * summed into one. Greyscale maps would put both ramps into both channels, and the top and
 * bottom bands would then shove the backdrop sideways as well as inward.
 */
function displacementMap(axis: "x" | "y", band: number, edge: number, refraction: number): string {
  const { gradA, gradB, rectA, rectB } = bands(axis, band);
  const paint = (v: number) => (axis === "x" ? `rgb(${v},128,128)` : `rgb(128,${v},128)`);
  const stops = (sign: 1 | -1) =>
    PROFILE.map((t) => {
      const shift = Math.min(inwardShift(t, edge, refraction), MAX_SHIFT) / MAX_SHIFT;
      return `<stop offset="${t}" stop-color="${paint(Math.round(128 + sign * 127 * shift))}"/>`;
    }).join("");
  return dataUri(
    `<defs><linearGradient id="a" ${gradA}>${stops(1)}</linearGradient>` +
      `<linearGradient id="b" ${gradB}>${stops(-1)}</linearGradient></defs>` +
      `<rect width="1" height="1" fill="rgb(128,128,128)"/>` +
      `<rect ${rectA} fill="url(#a)"/><rect ${rectB} fill="url(#b)"/>`,
  );
}

interface FilterSpec {
  id: string;
  /**
   * The band as a fraction of the box. u_edge is a pixel width, but the map is stretched to
   * whatever the element measures, so this is the fraction it works out to on a typical
   * card of this kind.
   */
  band: number;
  /** u_edge in pixels. */
  edge: number;
  /** u_refraction, which the shader turns into an index of refraction. */
  refraction: number;
  blur: number;
  saturation: number;
  /** u_chroma: how much further red bends than blue. */
  chroma: number;
}

const specs: FilterSpec[] = [
  // 28px of edge on a card around 310px across its shorter run.
  { id: "lg-card", band: 0.09, edge: SHADER.edge, refraction: SHADER.refraction, blur: 5, saturation: SHADER.saturation, chroma: SHADER.chroma },
  // Dial knobs and play buttons keep the lighter treatment used by those design nodes.
  { id: "lg-knob", band: 0.4, edge: 14, refraction: 16, blur: 2.2, saturation: SHADER.saturation, chroma: SHADER.chroma },
  // Slider thumbs use the stronger full-height frost treatment from the slider designs.
  { id: "lg-slider-knob", band: 0.4, edge: 20, refraction: 10, blur: 12, saturation: SHADER.saturation, chroma: SHADER.chroma },
];

/** feColorMatrix that keeps one channel and leaves alpha opaque, ready to be summed. */
const CHANNEL = {
  r: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
  g: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
  b: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
};

/**
 * Red and blue take a different index of refraction, so they land at slightly different
 * displacements. One map serves all three passes; the ratio is measured mid-band, where
 * the curve is smooth enough for a single scale factor to stand in for it.
 */
function chromaScale(spec: FilterSpec, sign: 1 | -1): number {
  const mid = 0.15;
  const base = inwardShift(mid, spec.edge, spec.refraction);
  const shifted = inwardShift(mid, spec.edge, spec.refraction, sign * spec.chroma * 0.12);
  return base > 0 ? shifted / base : 1;
}

function filter(spec: FilterSpec) {
  const mapX = displacementMap("x", spec.band, spec.edge, spec.refraction);
  const mapY = displacementMap("y", spec.band, spec.edge, spec.refraction);
  // The map stores the pull normalised to MAX_SHIFT, and a channel spans ±0.5 of `scale`.
  const scale = MAX_SHIFT * 2;

  return svg`
    <filter id=${spec.id} x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">
      <!-- No x/y/width/height: those are user-space units, and pinning them to 1 makes
           Chromium clip the whole result to a one-unit box. Left out, each image stretches
           to the filter region, which is the element. -->
      <feImage href=${mapX} preserveAspectRatio="none" result="mx" />
      <feImage href=${mapY} preserveAspectRatio="none" result="my" />
      <feComposite in="mx" in2="my" operator="arithmetic" k1="0" k2="1" k3="1" k4="-0.5" result="map" />

      <feGaussianBlur in="SourceGraphic" stdDeviation=${spec.blur} result="blurred" />
      <feColorMatrix in="blurred" type="saturate" values=${String(spec.saturation)} result="sat" />

      <feDisplacementMap in="sat" in2="map" scale=${scale * chromaScale(spec, -1)} xChannelSelector="R" yChannelSelector="G" result="dr" />
      <feDisplacementMap in="sat" in2="map" scale=${scale} xChannelSelector="R" yChannelSelector="G" result="dg" />
      <feDisplacementMap in="sat" in2="map" scale=${scale * chromaScale(spec, 1)} xChannelSelector="R" yChannelSelector="G" result="db" />
      <feColorMatrix in="dr" type="matrix" values=${CHANNEL.r} result="cr" />
      <feColorMatrix in="dg" type="matrix" values=${CHANNEL.g} result="cg" />
      <feColorMatrix in="db" type="matrix" values=${CHANNEL.b} result="cb" />
      <feComposite in="cr" in2="cg" operator="arithmetic" k2="1" k3="1" result="crg" />
      <feComposite in="crg" in2="cb" operator="arithmetic" k2="1" k3="1" />
    </filter>`;
}

export const glassDefs = html`<svg class="lg-defs" aria-hidden="true" focusable="false">
  <defs>${specs.map(filter)}</defs>
</svg>`;

/** Knob-only defs for components that live in their own shadow root (lg-slider). */
export const knobDefs = html`<svg class="lg-defs" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0">
  <defs>${filter(specs[1])}</defs>
</svg>`;

/** Strong-frost slider defs for components that live in their own shadow root. */
export const sliderKnobDefs = html`<svg class="lg-defs" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0">
  <defs>${filter(specs[2])}</defs>
</svg>`;

let cachedSupport: boolean | undefined;

/** Chromium is the only engine that applies SVG filters in backdrop-filter reliably. */
export function supportsRefraction(): boolean {
  if (cachedSupport !== undefined) return cachedSupport;
  const ua = navigator.userAgent;
  const isChromium = /Chrome\/|Chromium\/|CriOS\//.test(ua) || Boolean((navigator as unknown as { userAgentData?: unknown }).userAgentData);
  const isSafari = /Safari\//.test(ua) && !/Chrome\/|Chromium\/|CriOS\//.test(ua);
  const isFirefox = /Firefox\//.test(ua);
  // Android/HA WebViews can report CSS support while silently dropping SVG URL filters.
  // Keep `auto` deterministic there; users can still explicitly opt in with refraction: true.
  const isEmbeddedWebView = /\bwv\b|Home[ /]?Assistant/i.test(ua);
  cachedSupport = isChromium && !isSafari && !isFirefox && !isEmbeddedWebView && CSS.supports("backdrop-filter", "blur(1px)");
  return cachedSupport;
}
