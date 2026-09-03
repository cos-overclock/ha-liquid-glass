precision highp float;

/** @resolution */
uniform vec2 u_resolution;

/** @backdrop */
uniform sampler2D u_backdrop;

/** @sdf */
uniform sampler2D u_sdf;

/**
 * @label Edge Width
 * @default 28
 * @range 1, 160
 */
uniform float u_edge;

/**
 * @label Refraction
 * @default 22
 * @range 0, 80
 */
uniform float u_refraction;

/**
 * @label Chromatic
 * @default 0.35
 * @range 0, 2
 */
uniform float u_chroma;

/**
 * @label Blur
 * @default 7
 * @range 0, 30
 */
uniform float u_blur;

/**
 * @label Tint
 * @color
 * @default #ffffff
 */
uniform vec3 u_tint;

/**
 * @label Tint Opacity
 * @default 0.28
 * @range 0, 1
 */
uniform float u_tintAlpha;

/**
 * @label Highlight
 * @default 0.85
 * @range 0, 2
 */
uniform float u_highlight;

/**
 * @label Highlight Color
 * @color
 * @default #ffffff
 */
uniform vec3 u_highlightColor;

/**
 * @label Light Angle
 * @default 120
 * @range 0, 360
 */
uniform float u_lightAngle;

/**
 * @label Saturation
 * @default 1.35
 * @range 0, 3
 */
uniform float u_saturation;

vec3 sampleBackdrop(vec2 uv, vec2 px) {
  vec3 acc = vec3(0.0);
  float r = u_blur;
  acc += texture2D(u_backdrop, uv).rgb * 2.0;
  acc += texture2D(u_backdrop, uv + vec2( 0.94, 0.34) * r * px).rgb;
  acc += texture2D(u_backdrop, uv + vec2(-0.94,-0.34) * r * px).rgb;
  acc += texture2D(u_backdrop, uv + vec2( 0.34,-0.94) * r * px).rgb;
  acc += texture2D(u_backdrop, uv + vec2(-0.34, 0.94) * r * px).rgb;
  acc += texture2D(u_backdrop, uv + vec2( 0.71, 0.71) * r * 0.6 * px).rgb;
  acc += texture2D(u_backdrop, uv + vec2(-0.71,-0.71) * r * 0.6 * px).rgb;
  acc += texture2D(u_backdrop, uv + vec2( 0.71,-0.71) * r * 0.6 * px).rgb;
  acc += texture2D(u_backdrop, uv + vec2(-0.71, 0.71) * r * 0.6 * px).rgb;
  return acc / 10.0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 px = 1.0 / u_resolution;

  vec4 sdf = texture2D(u_sdf, uv);
  float d = sdf.r;
  vec2 g = sdf.gb;
  float gl = length(g);
  vec2 inward = gl > 0.0001 ? g / gl : vec2(0.0, 1.0);
  vec2 normal = -inward;

  float mask = clamp(d + 0.5, 0.0, 1.0);
  float t = clamp(1.0 - d / u_edge, 0.0, 1.0);
  float lens = t * t * (3.0 - 2.0 * t);
  float bulge = lens * lens;

  vec2 shift = inward * bulge * u_refraction * px;
  vec2 shiftR = shift * (1.0 + u_chroma * 0.35);
  vec2 shiftB = shift * (1.0 - u_chroma * 0.35);

  vec3 col;
  col.r = sampleBackdrop(uv + shiftR, px).r;
  col.g = sampleBackdrop(uv + shift, px).g;
  col.b = sampleBackdrop(uv + shiftB, px).b;

  float luma = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(luma), col, u_saturation);

  col = mix(col, u_tint, u_tintAlpha);

  float a = radians(u_lightAngle);
  vec2 L = vec2(cos(a), sin(a));
  float ndl = dot(normal, L);
  float rimBand = smoothstep(0.0, 1.0, t) * (1.0 - smoothstep(0.55, 1.0, t));
  float rimEdge = 1.0 - smoothstep(0.0, 2.2, d);
  float specTop = pow(max(ndl, 0.0), 2.2);
  float specBottom = pow(max(-ndl, 0.0), 2.6) * 0.55;
  float spec = (specTop + specBottom) * (rimBand * 0.55 + rimEdge * 0.9) * u_highlight;
  float innerGlow = bulge * 0.10 * u_highlight;
  col += u_highlightColor * (spec + innerGlow);

  float shade = pow(max(-ndl, 0.0), 1.5) * rimBand * 0.10;
  col -= shade;

  gl_FragColor = vec4(col, mask);
}
