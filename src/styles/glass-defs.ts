import { html, svg } from "lit";

/**
 * SVG filter port of pen/liquid-glass.glsl for use in `backdrop-filter: url(#id)`.
 *
 * The shader displaces the backdrop *inward* within an edge band (u_edge), with a smooth
 * lens profile, then blurs (u_blur) and boosts saturation (u_saturation).
 * Here the displacement map is built from two gradient images (X in the red channel,
 * Y in the green channel) that are stretched to the element's bounding box.
 *
 * Only Chromium renders SVG filters inside backdrop-filter; other browsers fall back to
 * the plain blur()/saturate() declared in glass.ts.
 */

function displacementMap(axis: "x" | "y", band: number): string {
  // Neutral is 128. Left/top edge pushes samples towards +, right/bottom towards -.
  // Stops follow bulge = smoothstep(t)^2 from the shader (0 → 1 at the edge).
  const stops = (from: number, to: number) => {
    const mid = Math.round(from + (to - from) * 0.25);
    return `<stop offset="0" stop-color="rgb(${from},${from},${from})"/>` +
      `<stop offset="0.5" stop-color="rgb(${mid},${mid},${mid})"/>` +
      `<stop offset="1" stop-color="rgb(128,128,128)"/>`;
  };
  const horizontal = axis === "x";
  const g1 = horizontal ? `x1="0" y1="0" x2="1" y2="0"` : `x1="0" y1="0" x2="0" y2="1"`;
  const g2 = horizontal ? `x1="1" y1="0" x2="0" y2="0"` : `x1="0" y1="1" x2="0" y2="0"`;
  const b = band.toFixed(3);
  const rectA = horizontal ? `x="0" y="0" width="${b}" height="1"` : `x="0" y="0" width="1" height="${b}"`;
  const rectB = horizontal
    ? `x="${(1 - band).toFixed(3)}" y="0" width="${b}" height="1"`
    : `x="0" y="${(1 - band).toFixed(3)}" width="1" height="${b}"`;
  const svgSrc =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1" preserveAspectRatio="none">` +
    `<defs><linearGradient id="a" ${g1}>${stops(255, 128)}</linearGradient>` +
    `<linearGradient id="b" ${g2}>${stops(0, 128)}</linearGradient></defs>` +
    `<rect width="1" height="1" fill="rgb(128,128,128)"/>` +
    `<rect ${rectA} fill="url(#a)"/><rect ${rectB} fill="url(#b)"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgSrc)}`;
}

interface FilterSpec {
  id: string;
  band: number;
  scale: number;
  blur: number;
  saturation: number;
}

const specs: FilterSpec[] = [
  // Card: u_edge 28px on a ~380px card ≈ 8% band, u_refraction 22, u_blur 7
  { id: "lg-card", band: 0.08, scale: 22, blur: 5, saturation: 1.35 },
  // Knob / thumb: u_edge 14 on a 32px circle ≈ 45% band, u_refraction 14, u_blur 3
  { id: "lg-knob", band: 0.45, scale: 14, blur: 2.2, saturation: 1.35 },
];

function filter(spec: FilterSpec) {
  const mapX = displacementMap("x", spec.band);
  const mapY = displacementMap("y", spec.band);
  return svg`
    <filter id=${spec.id} x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">
      <feImage href=${mapX} preserveAspectRatio="none" x="0" y="0" width="1" height="1" result="mx" />
      <feImage href=${mapY} preserveAspectRatio="none" x="0" y="0" width="1" height="1" result="my" />
      <feComposite in="mx" in2="my" operator="arithmetic" k1="0" k2="1" k3="1" k4="-0.5" result="map" />
      <feGaussianBlur in="SourceGraphic" stdDeviation=${spec.blur} result="blurred" />
      <feColorMatrix in="blurred" type="saturate" values=${String(spec.saturation)} result="sat" />
      <feDisplacementMap in="sat" in2="map" scale=${spec.scale} xChannelSelector="R" yChannelSelector="G" />
    </filter>`;
}

export const glassDefs = html`<svg class="lg-defs" aria-hidden="true" focusable="false">
  <defs>${specs.map(filter)}</defs>
</svg>`;

/** Knob-only defs for components that live in their own shadow root (lg-slider). */
export const knobDefs = html`<svg class="lg-defs" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0">
  <defs>${filter(specs[1])}</defs>
</svg>`;

let cachedSupport: boolean | undefined;

/** Chromium is the only engine that applies SVG filters in backdrop-filter. */
export function supportsRefraction(): boolean {
  if (cachedSupport !== undefined) return cachedSupport;
  const ua = navigator.userAgent;
  const isChromium = /Chrome\/|Chromium\/|CriOS\//.test(ua) || Boolean((navigator as unknown as { userAgentData?: unknown }).userAgentData);
  const isSafari = /Safari\//.test(ua) && !/Chrome\/|Chromium\/|CriOS\//.test(ua);
  const isFirefox = /Firefox\//.test(ua);
  cachedSupport = isChromium && !isSafari && !isFirefox && CSS.supports("backdrop-filter", "blur(1px)");
  return cachedSupport;
}
