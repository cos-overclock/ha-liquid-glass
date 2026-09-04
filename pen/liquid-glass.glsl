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
 * @range 1, 200
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

vec2 g_invRes;
vec3 g_light;

const int BLUR_TAPS = 8;

// Rounded bevel profile: flat in the middle, falling away steeply at the rim.
float surfaceHeight(float t) {
  float s = 1.0 - t;
  float s4 = s * s * s * s;
  return pow(1.0 - s4, 0.25);
}

// Snell displacement with the trig identities folded out.
float refractDisp(float sinI, float slope, float n) {
  float sinR = clamp(sinI / n, -0.9999, 0.9999);
  return sinR * inversesqrt(1.0 - sinR * sinR) - slope;
}

// Frosted backdrop: golden-angle spiral so the taps never line up into banding.
vec3 sampleBg(vec2 coord) {
  if (u_blur <= 0.0) {
    return texture2D(u_backdrop, coord * g_invRes).rgb;
  }
  vec3 sum = texture2D(u_backdrop, coord * g_invRes).rgb;
  for (int i = 0; i < BLUR_TAPS; i++) {
    float fi = float(i) + 0.5;
    float a = fi * 2.39996323;
    float r = sqrt(fi / float(BLUR_TAPS)) * u_blur;
    sum += texture2D(u_backdrop, (coord + vec2(cos(a), sin(a)) * r) * g_invRes).rgb;
  }
  return sum / (float(BLUR_TAPS) + 1.0);
}

void main() {
  g_invRes = 1.0 / u_resolution;

  float a = radians(u_lightAngle);
  g_light = normalize(vec3(cos(a), sin(a), 0.85));

  vec2 coord = gl_FragCoord.xy;
  vec4 sdf = texture2D(u_sdf, coord * g_invRes);
  float sd = sdf.r;

  float edge = smoothstep(-1.0, 1.0, sd);
  float ew = max(u_edge, 1.0);
  float t = clamp(sd / ew, 0.0, 1.0);

  // Outward, shape-following surface direction straight from the SDF gradient.
  vec2 borderDir = -normalize(sdf.gb + 1e-6);

  float delta = 0.001;
  float h1 = surfaceHeight(clamp(t - delta, 0.0, 1.0));
  float h2 = surfaceHeight(clamp(t + delta, 0.0, 1.0));
  float slope = (h2 - h1) * (0.5 / delta);

  float sinI = slope * inversesqrt(1.0 + slope * slope);
  float ior = 1.0 + u_refraction * 0.045;

  float dispG = refractDisp(sinI, slope, ior) * ew;

  vec3 col;
  if (u_chroma <= 0.0) {
    col = sampleBg(coord + borderDir * dispG);
  } else {
    float spread = u_chroma * 0.12;
    float dispR = refractDisp(sinI, slope, ior - spread) * ew;
    float dispB = refractDisp(sinI, slope, ior + spread) * ew;
    col = vec3(
      sampleBg(coord + borderDir * dispR).r,
      sampleBg(coord + borderDir * dispG).g,
      sampleBg(coord + borderDir * dispB).b
    );
  }

  float luma = dot(col, vec3(0.299, 0.587, 0.114));
  col = mix(vec3(luma), col, u_saturation);

  col = mix(col, u_tint, u_tintAlpha);

  // Lit surface normal of the bevel, used for both specular and fresnel.
  vec3 N = normalize(vec3(-slope * borderDir, 1.0));

  // How much this piece of rim faces the light. Without this the highlight
  // wraps the whole silhouette and reads as an outline instead of a surface.
  float facing = dot(borderDir, g_light.xy);
  float lit = max(facing, 0.0);
  float back = max(-facing, 0.0);

  vec3 R = reflect(-g_light, N);
  float spec = pow(max(R.z, 0.0), 26.0) * lit;

  // The opposing rim picks up a weaker bounce, never as bright as the key.
  float spec2 = pow(max(R.z, 0.0), 48.0) * back * 0.3;

  // Hairline at the extreme edge: always present, brightest where lit.
  float hairline = (1.0 - smoothstep(0.0, 2.0, sd)) * (0.22 + 0.78 * lit);

  float fresnel = pow(1.0 - N.z, 3.0) * (0.15 + 0.85 * lit);

  col += u_highlightColor * ((spec + spec2) * 1.5 + fresnel * 0.30 + hairline * 0.28) * u_highlight;

  // Slight darkening on the shadowed side of the bevel gives it thickness.
  col -= back * (1.0 - N.z) * 0.14;

  gl_FragColor = vec4(col * edge, edge);
}
