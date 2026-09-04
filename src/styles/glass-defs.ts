import { html, svg, type TemplateResult } from "lit";
import { SHADER, inwardShift } from "./shader-profile";

/** The measured box used to build a shape-correct rounded-rectangle lens map. */
export interface GlassGeometry {
  width: number;
  height: number;
  radius: number;
}

interface FilterSpec {
  id: string;
  edge: number;
  refraction: number;
  blur: number;
  saturation: number;
  chroma: number;
  bend: number;
}

const MAX_SHIFT = 40;
const MAP_LONG_SIDE = 160;
const MAP_CACHE_LIMIT = 80;

const specs: FilterSpec[] = [
  { id: "lg-card", edge: SHADER.edge, refraction: SHADER.refraction, blur: 5, saturation: SHADER.saturation, chroma: SHADER.chroma, bend: 0.34 },
  { id: "lg-knob", edge: 14, refraction: 16, blur: 2.2, saturation: SHADER.saturation, chroma: SHADER.chroma, bend: 0.46 },
  { id: "lg-slider-knob", edge: 20, refraction: 10, blur: 12, saturation: SHADER.saturation, chroma: SHADER.chroma, bend: 0.38 },
];

const DEFAULT_CARD: GlassGeometry = { width: 320, height: 190, radius: 40 };
const DEFAULT_KNOB: GlassGeometry = { width: 64, height: 64, radius: 32 };
const DEFAULT_SLIDER_KNOB: GlassGeometry = { width: 44, height: 44, radius: 22 };
const mapCache = new Map<string, string>();

const CHANNEL = {
  r: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0",
  g: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0",
  b: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0",
};

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/** Standard rounded-box signed distance: negative inside, positive outside. */
function roundedBoxSdf(x: number, y: number, width: number, height: number, radius: number): number {
  const halfW = width / 2;
  const halfH = height / 2;
  const r = clamp(radius, 0, Math.min(halfW, halfH));
  const qx = Math.abs(x - halfW) - halfW + r;
  const qy = Math.abs(y - halfH) - halfH + r;
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
}

function normalAt(x: number, y: number, geometry: GlassGeometry): [number, number] {
  const e = 0.6;
  const dx =
    roundedBoxSdf(x + e, y, geometry.width, geometry.height, geometry.radius) -
    roundedBoxSdf(x - e, y, geometry.width, geometry.height, geometry.radius);
  const dy =
    roundedBoxSdf(x, y + e, geometry.width, geometry.height, geometry.radius) -
    roundedBoxSdf(x, y - e, geometry.width, geometry.height, geometry.radius);
  const length = Math.hypot(dx, dy) || 1;
  return [dx / length, dy / length];
}

/** Rasterise one exact rounded-rectangle SDF into R/G displacement channels. */
function sdfMap(geometry: GlassGeometry, spec: FilterSpec): string | undefined {
  if (typeof document === "undefined") return undefined;
  const width = Math.max(1, geometry.width);
  const height = Math.max(1, geometry.height);
  const radius = clamp(geometry.radius, 0, Math.min(width, height) / 2);
  const key = [spec.id, Math.round(width / 4) * 4, Math.round(height / 4) * 4, Math.round(radius / 2) * 2].join(":");
  const cached = mapCache.get(key);
  if (cached) return cached;

  const scale = Math.min(1, MAP_LONG_SIDE / Math.max(width, height));
  const mapW = Math.max(32, Math.round(width * scale));
  const mapH = Math.max(32, Math.round(height * scale));
  const canvas = document.createElement("canvas");
  canvas.width = mapW;
  canvas.height = mapH;
  const context = canvas.getContext("2d");
  if (!context) return undefined;
  const image = context.createImageData(mapW, mapH);
  const exact = { width, height, radius };

  for (let row = 0; row < mapH; row += 1) {
    const y = ((row + 0.5) / mapH) * height;
    for (let col = 0; col < mapW; col += 1) {
      const x = ((col + 0.5) / mapW) * width;
      const sdf = roundedBoxSdf(x, y, width, height, radius);
      const index = (row * mapW + col) * 4;
      let dx = 0;
      let dy = 0;

      if (sdf <= 1) {
        const inside = Math.max(0, -sdf);
        const t = clamp(inside / Math.max(spec.edge, 1), 0, 1);
        let shift = Math.min(inwardShift(t, spec.edge, spec.refraction), MAX_SHIFT);
        // A soft meniscus just inside the contour makes the background wrap at the lip.
        const lip = clamp(1 - inside / Math.max(3, spec.edge * 0.42), 0, 1);
        shift += spec.bend * 6.75 * lip * lip * (1 - lip);
        const [outX, outY] = normalAt(x, y, exact);
        dx = -outX * shift;
        dy = -outY * shift;
      }

      image.data[index] = Math.round(clamp(128 + (dx / MAX_SHIFT) * 127, 0, 255));
      image.data[index + 1] = Math.round(clamp(128 + (dy / MAX_SHIFT) * 127, 0, 255));
      image.data[index + 2] = 128;
      image.data[index + 3] = 255;
    }
  }

  context.putImageData(image, 0, 0);
  const url = canvas.toDataURL("image/png");
  mapCache.set(key, url);
  if (mapCache.size > MAP_CACHE_LIMIT) mapCache.delete(mapCache.keys().next().value as string);
  return url;
}

function chromaScale(spec: FilterSpec, sign: 1 | -1): number {
  const mid = 0.15;
  const base = inwardShift(mid, spec.edge, spec.refraction);
  const shifted = inwardShift(mid, spec.edge, spec.refraction, sign * spec.chroma * 0.12);
  return base > 0 ? shifted / base : 1;
}

function filter(spec: FilterSpec, geometry: GlassGeometry) {
  const map = sdfMap(geometry, spec);
  const scale = MAX_SHIFT * 2;
  return svg`
    <filter id=${spec.id} x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">
      ${map
        ? svg`<feImage href=${map} preserveAspectRatio="none" result="map" />`
        : svg`<feFlood flood-color="rgb(128,128,128)" result="map" />`}
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

/** Card-local definitions. Geometry is measured by the base card and cached in 4px buckets. */
export function glassDefsFor(geometry: GlassGeometry = DEFAULT_CARD): TemplateResult {
  return html`<svg class="lg-defs" aria-hidden="true" focusable="false">
    <defs>
      ${filter(specs[0], geometry)}
      ${filter(specs[1], DEFAULT_KNOB)}
      ${filter(specs[2], DEFAULT_SLIDER_KNOB)}
    </defs>
  </svg>`;
}

export const glassDefs = glassDefsFor();
export const knobDefs = html`<svg class="lg-defs" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0">
  <defs>${filter(specs[1], DEFAULT_KNOB)}</defs>
</svg>`;
export const sliderKnobDefs = html`<svg class="lg-defs" aria-hidden="true" focusable="false" style="position:absolute;width:0;height:0">
  <defs>${filter(specs[2], DEFAULT_SLIDER_KNOB)}</defs>
</svg>`;

let cachedSupport: boolean | undefined;

/** Chromium is the only engine that applies SVG filters in backdrop-filter reliably. */
export function supportsRefraction(): boolean {
  if (cachedSupport !== undefined) return cachedSupport;
  const ua = navigator.userAgent;
  const isChromium = /Chrome\/|Chromium\/|CriOS\//.test(ua) || Boolean((navigator as unknown as { userAgentData?: unknown }).userAgentData);
  const isSafari = /Safari\//.test(ua) && !/Chrome\/|Chromium\/|CriOS\//.test(ua);
  const isFirefox = /Firefox\//.test(ua);
  const isEmbeddedWebView = /\bwv\b|Home[ /]?Assistant/i.test(ua);
  cachedSupport =
    isChromium &&
    !isSafari &&
    !isFirefox &&
    !isEmbeddedWebView &&
    CSS.supports("backdrop-filter", "url(#lg-test)");
  return cachedSupport;
}
