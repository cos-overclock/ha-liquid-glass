/**
 * TypeScript port of the maths in pen/liquid-glass.glsl.
 *
 * The shader models the surface as a bevel — flat in the middle, falling away steeply at
 * the rim — and refracts the backdrop through it with Snell's law. Neither the CSS nor the
 * SVG side can run GLSL, so the curves are evaluated here once at load and baked into a
 * displacement map (glass-defs.ts) and a set of gradients (glass.ts).
 *
 * `t` runs 0 at the very edge to 1 at `edge` pixels inside, matching the shader.
 */

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

const smoothstep = (a: number, b: number, x: number): number => {
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

/** surfaceHeight(): rises from 0 at the rim to 1 inside, steeply at first. */
function surfaceHeight(t: number): number {
  const s = 1 - t;
  return Math.pow(1 - s * s * s * s, 0.25);
}

/** The shader takes this derivative numerically, so the same delta is used here. */
function slopeAt(t: number): number {
  const d = 0.001;
  return (surfaceHeight(clamp(t + d, 0, 1)) - surfaceHeight(clamp(t - d, 0, 1))) * (0.5 / d);
}

/** refractDisp(): Snell's law with the trig identities folded out. */
function refractDisp(sinI: number, slope: number, n: number): number {
  const sinR = clamp(sinI / n, -0.9999, 0.9999);
  return sinR / Math.sqrt(1 - sinR * sinR) - slope;
}

/**
 * How far the backdrop is pulled inward at `t`, in pixels. Negative in the shader's sign
 * convention; returned as a positive inward distance because that is what both the
 * displacement map and the eye think in.
 */
export function inwardShift(t: number, edge: number, refraction: number, chroma = 0): number {
  const slope = slopeAt(t);
  const sinI = slope / Math.sqrt(1 + slope * slope);
  const ior = 1 + refraction * 0.045 + chroma;
  return -refractDisp(sinI, slope, ior) * edge;
}

const normalize = (v: number[]): number[] => {
  const len = Math.hypot(...v) || 1;
  return v.map((c) => c / len);
};

/** The shader's light: an angle in the plane, tilted towards the viewer. */
function lightVector(lightAngle: number): number[] {
  const a = (lightAngle * Math.PI) / 180;
  return normalize([Math.cos(a), Math.sin(a), 0.85]);
}

/**
 * What the shader adds to (or takes from) the backdrop at one point on one edge.
 * `normal` is that edge's outward direction in the shader's y-up space.
 *
 * Positive brightens, negative darkens — the shader's specular, fresnel and hairline
 * against its shadow on the side facing away from the light.
 */
export function rimLight(
  t: number,
  sd: number,
  normal: [number, number],
  lightAngle: number,
  highlight: number,
): number {
  const slope = slopeAt(t);
  const light = lightVector(lightAngle);
  const facing = normal[0] * light[0] + normal[1] * light[1];
  const lit = Math.max(facing, 0);
  const back = Math.max(-facing, 0);

  const n = normalize([-slope * normal[0], -slope * normal[1], 1]);
  // reflect(-L, N) = -L - 2 * dot(-L, N) * N
  const dotLN = -(light[0] * n[0] + light[1] * n[1] + light[2] * n[2]);
  const rz = -light[2] - 2 * dotLN * n[2];

  const spec = Math.pow(Math.max(rz, 0), 26) * lit;
  const spec2 = Math.pow(Math.max(rz, 0), 48) * back * 0.3;
  const hairline = (1 - smoothstep(0, 2, sd)) * (0.22 + 0.78 * lit);
  const fresnel = Math.pow(1 - n[2], 3) * (0.15 + 0.85 * lit);

  const add = ((spec + spec2) * 1.5 + fresnel * 0.3 + hairline * 0.28) * highlight;
  const shadow = back * (1 - n[2]) * 0.14;
  return add - shadow;
}

/** Uniform values as configured on the components in pen/design.pen. */
export const SHADER = {
  edge: 28,
  refraction: 22,
  chroma: 0.35,
  blur: 7,
  highlight: 0.85,
  lightAngle: 120,
  saturation: 1.35,
} as const;

/** Outward normals per edge, in the shader's y-up space. */
export const EDGE_NORMALS: Record<"top" | "bottom" | "left" | "right", [number, number]> = {
  top: [0, 1],
  bottom: [0, -1],
  left: [-1, 0],
  right: [1, 0],
};
