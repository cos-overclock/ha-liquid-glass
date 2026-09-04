import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";

export type GlassShape = "circle" | "pill" | "roundrect";

const VERTEX = `
attribute vec2 a_position;
void main() { gl_Position = vec4(a_position, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
uniform vec2 u_resolution;
uniform float u_shape;
uniform float u_radius;
uniform float u_edge;
uniform float u_refraction;
uniform float u_chroma;
uniform float u_blur;
uniform float u_highQualityBlur;
uniform float u_highlight;
uniform float u_lightAngle;
uniform float u_saturation;
uniform float u_tintAlpha;
uniform vec3 u_tint;
uniform vec3 u_colors[4];
uniform vec4 u_stops;
const int BLUR_TAPS = 8;
const int HIGH_QUALITY_BLUR_TAPS = 49;

float surfaceHeight(float t) {
  float s = 1.0 - t;
  float s4 = s * s * s * s;
  return pow(max(1.0 - s4, 0.0), 0.25);
}
float refractDisp(float sinI, float slope, float n) {
  float sinR = clamp(sinI / n, -0.9999, 0.9999);
  return sinR * inversesqrt(1.0 - sinR * sinR) - slope;
}
float roundedBox(vec2 p, vec2 halfSize, float radius) {
  vec2 q = abs(p) - halfSize + radius;
  float outside = length(max(q, 0.0));
  float inside = min(max(q.x, q.y), 0.0);
  return -(outside + inside - radius);
}
float shapeDistance(vec2 coord) {
  vec2 halfSize = u_resolution * 0.5;
  vec2 p = coord - halfSize;
  if (u_shape < 0.5) return min(halfSize.x, halfSize.y) - length(p);
  float radius = u_shape < 1.5 ? halfSize.y : min(u_radius, halfSize.y);
  return roundedBox(p, halfSize - vec2(0.75), max(radius - 0.75, 1.0));
}
vec3 backdropAt(vec2 coord) {
  float x = clamp(coord.x / u_resolution.x, 0.0, 1.0);
  if (x <= u_stops.y) return mix(u_colors[0], u_colors[1], smoothstep(u_stops.x, u_stops.y, x));
  if (x <= u_stops.z) return mix(u_colors[1], u_colors[2], smoothstep(u_stops.y, u_stops.z, x));
  return mix(u_colors[2], u_colors[3], smoothstep(u_stops.z, u_stops.w, x));
}
vec3 sampleBg(vec2 coord) {
  if (u_blur <= 0.0) return backdropAt(coord);
  if (u_highQualityBlur > 0.5) {
    vec3 sum = vec3(0.0);
    float weightSum = 0.0;
    for (int i = 0; i < HIGH_QUALITY_BLUR_TAPS; i++) {
      float x = (float(i) / float(HIGH_QUALITY_BLUR_TAPS - 1) * 4.0 - 2.0) * u_blur;
      float weight = exp(-0.5 * x * x / max(u_blur * u_blur, 0.0001));
      sum += backdropAt(coord + vec2(x, 0.0)) * weight;
      weightSum += weight;
    }
    return sum / weightSum;
  }
  vec3 sum = backdropAt(coord);
  for (int i = 0; i < BLUR_TAPS; i++) {
    float fi = float(i) + 0.5;
    float a = fi * 2.39996323;
    float r = sqrt(fi / float(BLUR_TAPS)) * u_blur;
    sum += backdropAt(coord + vec2(cos(a), sin(a)) * r);
  }
  return sum / (float(BLUR_TAPS) + 1.0);
}
void main() {
  vec2 coord = gl_FragCoord.xy;
  float sd = shapeDistance(coord);
  float coverage = smoothstep(-1.0, 1.0, sd);
  float ew = max(u_edge, 1.0);
  float t = clamp(sd / ew, 0.0, 1.0);
  float e = 0.75;
  vec2 grad = vec2(
    shapeDistance(coord + vec2(e, 0.0)) - shapeDistance(coord - vec2(e, 0.0)),
    shapeDistance(coord + vec2(0.0, e)) - shapeDistance(coord - vec2(0.0, e))
  );
  vec2 borderDir = -normalize(grad + vec2(1e-6));
  float delta = 0.001;
  float h1 = surfaceHeight(clamp(t - delta, 0.0, 1.0));
  float h2 = surfaceHeight(clamp(t + delta, 0.0, 1.0));
  float slope = (h2 - h1) * (0.5 / delta);
  float sinI = slope * inversesqrt(1.0 + slope * slope);
  float ior = 1.0 + u_refraction * 0.045;
  float dispG = refractDisp(sinI, slope, ior) * ew;
  vec3 col;
  if (u_chroma <= 0.0 || u_refraction <= 0.0) {
    col = sampleBg(coord + borderDir * dispG);
  } else {
    float spread = u_chroma * 0.12;
    float dispR = refractDisp(sinI, slope, max(ior - spread, 1.001)) * ew;
    float dispB = refractDisp(sinI, slope, ior + spread) * ew;
    col = vec3(sampleBg(coord + borderDir * dispR).r, sampleBg(coord + borderDir * dispG).g, sampleBg(coord + borderDir * dispB).b);
  }
  float luma = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(luma), col, u_saturation);
  col = mix(col, u_tint, u_tintAlpha);
  float angle = radians(u_lightAngle);
  vec3 light = normalize(vec3(cos(angle), sin(angle), 0.85));
  vec3 normal = normalize(vec3(-slope * borderDir, 1.0));
  float facing = dot(borderDir, light.xy);
  float lit = max(facing, 0.0);
  float back = max(-facing, 0.0);
  vec3 reflected = reflect(-light, normal);
  float spec = pow(max(reflected.z, 0.0), 26.0) * lit;
  float spec2 = pow(max(reflected.z, 0.0), 48.0) * back * 0.3;
  float hairline = (1.0 - smoothstep(0.0, 2.0, sd)) * (0.22 + 0.78 * lit);
  float fresnel = pow(1.0 - normal.z, 3.0) * (0.15 + 0.85 * lit);
  col += vec3(1.0) * ((spec + spec2) * 1.5 + fresnel * 0.3 + hairline * 0.28) * u_highlight;
  col -= back * (1.0 - normal.z) * 0.14;
  float dither = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  col += dither / 768.0;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0) * coverage, coverage);
}
`;

type RGB = [number, number, number];

function parseColor(value: string): RGB {
  const hex = value.trim().match(/^#([0-9a-f]{6}|[0-9a-f]{3})(?:[0-9a-f]{2})?$/i)?.[1];
  if (hex) {
    const full = hex.length === 3 ? [...hex].map((c) => c + c).join("") : hex;
    return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255) as RGB;
  }
  const rgb = value.match(/rgba?\(\s*([\d.]+)[, ]+\s*([\d.]+)[, ]+\s*([\d.]+)/i);
  return rgb ? [Number(rgb[1]) / 255, Number(rgb[2]) / 255, Number(rgb[3]) / 255] : [0.72, 0.72, 0.76];
}

class SharedGlassRenderer {
  private canvas = document.createElement("canvas");
  private gl = this.canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: true,
    powerPreference: "low-power",
  });
  private program?: WebGLProgram;
  private buffer?: WebGLBuffer;
  failed = false;

  constructor() {
    if (!this.gl) {
      this.failed = true;
      return;
    }
    this.canvas.addEventListener("webglcontextlost", (event) => {
      event.preventDefault();
      this.failed = true;
      window.dispatchEvent(new Event("lg-webgl-lost"));
    });
    this.canvas.addEventListener("webglcontextrestored", () => {
      this.failed = false;
      this.program = undefined;
      this.buffer = undefined;
      window.dispatchEvent(new Event("lg-webgl-restored"));
    });
  }

  private shader(type: number, source: string): WebGLShader | undefined {
    const gl = this.gl!;
    const shader = gl.createShader(type);
    if (!shader) return undefined;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn("Liquid Glass shader compile failed:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return undefined;
    }
    return shader;
  }

  private init(): boolean {
    if (this.failed || !this.gl) return false;
    if (this.program && this.buffer) return true;
    const gl = this.gl;
    const vertex = this.shader(gl.VERTEX_SHADER, VERTEX);
    const fragment = this.shader(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vertex || !fragment) return (this.failed = true), false;
    const program = gl.createProgram();
    if (!program) return (this.failed = true), false;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("Liquid Glass shader link failed:", gl.getProgramInfoLog(program));
      return (this.failed = true), false;
    }
    const buffer = gl.createBuffer();
    if (!buffer) return (this.failed = true), false;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    this.program = program;
    this.buffer = buffer;
    return true;
  }

  render(target: HTMLCanvasElement, options: LgGlassSurface, cssWidth: number, cssHeight: number): boolean {
    if (!this.init()) return false;
    const gl = this.gl!;
    const dpr = Math.min((window.devicePixelRatio || 1) * options.renderScale, options.pixelRatioLimit);
    const width = Math.max(1, Math.round(cssWidth * dpr));
    const height = Math.max(1, Math.round(cssHeight * dpr));
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
    target.width = width;
    target.height = height;
    const p = this.program!;
    gl.viewport(0, 0, width, height);
    gl.useProgram(p);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer!);
    const pos = gl.getAttribLocation(p, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    const f = (name: string, value: number) => gl.uniform1f(gl.getUniformLocation(p, name), value);
    gl.uniform2f(gl.getUniformLocation(p, "u_resolution"), width, height);
    f("u_shape", options.shape === "circle" ? 0 : options.shape === "pill" ? 1 : 2);
    f("u_radius", options.radius * dpr);
    f("u_edge", options.edge * dpr);
    f("u_refraction", options.refraction);
    f("u_chroma", options.chroma);
    f("u_blur", options.blurRadius * dpr);
    f("u_highQualityBlur", options.highQualityBlur ? 1 : 0);
    f("u_highlight", options.highlight);
    f("u_lightAngle", options.lightAngle);
    f("u_saturation", options.saturation);
    f("u_tintAlpha", options.tintAlpha);
    gl.uniform3fv(gl.getUniformLocation(p, "u_tint"), parseColor(options.tint));
    const palette = [...options.palette];
    while (palette.length < 4) palette.push(palette[palette.length - 1] ?? "#b8b8c2");
    gl.uniform3fv(gl.getUniformLocation(p, "u_colors[0]"), new Float32Array(palette.slice(0, 4).flatMap(parseColor)));
    gl.uniform4fv(gl.getUniformLocation(p, "u_stops"), new Float32Array(options.stops));
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.flush();
    const ctx = target.getContext("2d");
    if (!ctx) return false;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(this.canvas, 0, 0, width, height);
    return true;
  }
}

let sharedRenderer: SharedGlassRenderer | undefined;

export class LgGlassSurface extends LitElement {
  @property() shape: GlassShape = "roundrect";
  @property({ attribute: false }) palette: string[] = [];
  @property({ attribute: false }) stops: [number, number, number, number] = [0, 0.34, 0.68, 1];
  @property({ type: Number }) radius = 28;
  @property({ type: Number }) edge = 14;
  @property({ type: Number }) refraction = 16;
  @property({ type: Number }) chroma = 0.35;
  @property({ type: Number }) blurRadius = 3;
  @property({ type: Boolean }) highQualityBlur = false;
  @property({ type: Number }) renderScale = 1;
  @property({ type: Number }) pixelRatioLimit = 2;
  @property({ type: Number }) highlight = 1.25;
  @property({ type: Number }) lightAngle = 120;
  @property({ type: Number }) saturation = 1.35;
  @property({ type: Number }) tintAlpha = 0.22;
  @property() tint = "#ffffff";
  private observer?: ResizeObserver;

  static override styles = css`
    :host {
      position: absolute;
      inset: 0;
      display: block;
      overflow: hidden;
      border-radius: inherit;
      pointer-events: none;
      background: rgba(255, 255, 255, 0.22);
      box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.72);
    }
    :host([shader-ready]) {
      background: transparent;
      box-shadow: none;
    }
    canvas {
      display: block;
      width: 100%;
      height: 100%;
    }
  `;

  override connectedCallback(): void {
    super.connectedCallback();
    this.observer = new ResizeObserver(() => this.draw());
    this.observer.observe(this);
    window.addEventListener("lg-webgl-restored", this.draw);
  }

  override disconnectedCallback(): void {
    this.observer?.disconnect();
    window.removeEventListener("lg-webgl-restored", this.draw);
    super.disconnectedCallback();
  }

  protected override firstUpdated(): void {
    this.draw();
  }

  protected override updated(): void {
    this.draw();
  }

  private inferDark(): boolean {
    let node: Node | null = this;
    while (node) {
      if (node instanceof HTMLElement && node.hasAttribute("dark")) return true;
      const root = node.getRootNode();
      node = root instanceof ShadowRoot ? root.host : null;
    }
    return false;
  }

  private draw = (): void => {
    const canvas = this.renderRoot.querySelector("canvas");
    const rect = this.getBoundingClientRect();
    if (!(canvas instanceof HTMLCanvasElement) || rect.width < 1 || rect.height < 1) return;
    if (!this.palette.length) {
      this.palette = this.inferDark()
        ? ["#151619", "#222327", "#292a2f", "#17181b"]
        : ["#fafafa", "#f1f1f2", "#e8e9eb", "#f8f8f9"];
      return;
    }
    sharedRenderer ??= new SharedGlassRenderer();
    this.toggleAttribute("shader-ready", sharedRenderer.render(canvas, this, rect.width, rect.height));
  };

  override render() {
    return html`<canvas aria-hidden="true"></canvas>`;
  }
}

if (!customElements.get("lg-glass-surface")) customElements.define("lg-glass-surface", LgGlassSurface);

declare global {
  interface HTMLElementTagNameMap {
    "lg-glass-surface": LgGlassSurface;
  }
}
