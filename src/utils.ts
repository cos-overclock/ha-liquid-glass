import type { HassEntity, HomeAssistant } from "./types";

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

export function fireEvent(node: HTMLElement, type: string, detail: unknown = {}): void {
  node.dispatchEvent(new CustomEvent(type, { detail, bubbles: true, composed: true }));
}

export function moreInfo(node: HTMLElement, entityId: string | undefined): void {
  if (entityId) fireEvent(node, "hass-more-info", { entityId });
}

export function friendlyName(entity: HassEntity | undefined, fallback: string): string {
  return entity?.attributes.friendly_name ?? fallback;
}

export function formatNumber(hass: HomeAssistant | undefined, value: number, digits?: number): string {
  const lang = hass?.locale?.language ?? hass?.language ?? "en";
  try {
    return new Intl.NumberFormat(lang, {
      maximumFractionDigits: digits ?? (Number.isInteger(value) ? 0 : 1),
      minimumFractionDigits: digits ?? 0,
    }).format(value);
  } catch {
    return String(value);
  }
}

export function isUnavailable(entity: HassEntity | undefined): boolean {
  return !entity || entity.state === "unavailable" || entity.state === "unknown";
}

export function supportsFeature(entity: HassEntity | undefined, feature: number): boolean {
  return Boolean(((entity?.attributes.supported_features as number) ?? 0) & feature);
}

/**
 * Picks the entity a freshly added card should point at.
 *
 * Home Assistant passes the dashboard's still-unused entities first and every entity as a
 * fallback. `prefer` is tried across both lists before the plain domain match, so a card
 * can ask for an entity that shows off its controls (a dimmable light, a positionable cover).
 */
export function pickEntity(
  domains: readonly string[],
  hass?: HomeAssistant,
  entities?: string[],
  fallback?: string[],
  prefer?: (entity: HassEntity) => boolean,
): string {
  const lists = [entities, fallback, Object.keys(hass?.states ?? {})];
  const inDomain = (id: string) => domains.includes(id.split(".")[0]);
  const available = (id: string) => {
    const state = hass?.states[id];
    return !state || (state.state !== "unavailable" && state.state !== "unknown");
  };

  if (prefer) {
    for (const list of lists) {
      const hit = list?.find((id) => {
        const state = hass?.states[id];
        return inDomain(id) && available(id) && state !== undefined && prefer(state);
      });
      if (hit) return hit;
    }
  }
  for (const list of lists) {
    const hit = list?.find((id) => inDomain(id) && available(id));
    if (hit) return hit;
  }
  return `${domains[0]}.example`;
}

/** Kelvin → approximate sRGB hex (Tanner Helland approximation). */
export function kelvinToRgb(kelvin: number): string {
  const t = clamp(kelvin, 1000, 40000) / 100;
  let r: number;
  let g: number;
  let b: number;
  if (t <= 66) {
    r = 255;
    g = 99.4708025861 * Math.log(t) - 161.1195681661;
    b = t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  } else {
    r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
    b = 255;
  }
  const hex = (v: number) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(b)}`;
}

export function hsToRgb(h: number, s: number): [number, number, number] {
  const c = s / 100;
  const hh = ((h % 360) + 360) % 360 / 60;
  const x = c * (1 - Math.abs((hh % 2) - 1));
  let rgb: [number, number, number];
  if (hh < 1) rgb = [c, x, 0];
  else if (hh < 2) rgb = [x, c, 0];
  else if (hh < 3) rgb = [0, c, x];
  else if (hh < 4) rgb = [0, x, c];
  else if (hh < 5) rgb = [x, 0, c];
  else rgb = [c, 0, x];
  const m = 1 - c;
  return [Math.round((rgb[0] + m) * 255), Math.round((rgb[1] + m) * 255), Math.round((rgb[2] + m) * 255)];
}

export function rgbToHex(rgb: [number, number, number] | number[]): string {
  return `#${rgb.slice(0, 3).map((v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, "0")).join("")}`;
}

export function hexToRgb(hex: string): [number, number, number] | undefined {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return undefined;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** Mixes a hex colour towards white; used for the light end of icon and track gradients. */
export function lighten(hex: string, amount = 0.45): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return rgbToHex(rgb.map((v) => v + (255 - v) * amount));
}

/** Mixes a hex colour towards black; used for the deep end of icon gradients. */
export function darken(hex: string, amount = 0.3): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return rgbToHex(rgb.map((v) => v * (1 - amount)));
}

export function withAlpha(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

/** Percentage helper for ratio 0..1 → "NN%" */
export const pct = (ratio: number) => `${Math.round(clamp(ratio, 0, 1) * 100)}%`;
