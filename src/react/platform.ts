import type { BaseCardConfig } from "../types";

const runtimeUserAgent = typeof navigator === "undefined" ? "" : navigator.userAgent;
const companionPattern = /(?:^|[; (])wv(?:[;) ]|$)|Home[ /]?Assistant/i;
const runtimeIsCompanion = companionPattern.test(runtimeUserAgent);

/**
 * Android's embedded WebView advertises both Chromium and the `wv` marker. The
 * Companion app has also used a Home Assistant product token in its UA. Either
 * marker means that the expensive SVG-filter path should not be selected by
 * the automatic setting.
 */
export function isEmbeddedCompanionWebView(
  userAgent = runtimeUserAgent,
): boolean {
  return userAgent === runtimeUserAgent ? runtimeIsCompanion : companionPattern.test(userAgent);
}

/** Explicit `true` remains an escape hatch; only `auto` adapts to the runtime. */
export function resolveRefraction(
  setting: BaseCardConfig["refraction"],
  userAgent = runtimeUserAgent,
): boolean {
  if (setting === true) return true;
  if (setting === false) return false;
  return !isEmbeddedCompanionWebView(userAgent);
}
