import { describe, expect, it } from "vitest";
import { isEmbeddedCompanionWebView, resolveRefraction } from "./platform";

const ANDROID_WEBVIEW =
  "Mozilla/5.0 (Linux; Android 15; Pixel 8 Build/AP3A; wv) "
  + "AppleWebKit/537.36 Version/4.0 Chrome/140.0.0.0 Mobile Safari/537.36";
const ANDROID_CHROME =
  "Mozilla/5.0 (Linux; Android 15; Pixel 8) AppleWebKit/537.36 "
  + "Chrome/140.0.0.0 Mobile Safari/537.36";

describe("React glass platform policy", () => {
  it("recognises Android WebView and Companion app user agents", () => {
    expect(isEmbeddedCompanionWebView(ANDROID_WEBVIEW)).toBe(true);
    expect(isEmbeddedCompanionWebView(`${ANDROID_CHROME} Home Assistant/2026.9`)).toBe(true);
    expect(isEmbeddedCompanionWebView(ANDROID_CHROME)).toBe(false);
  });

  it("disables automatic refraction in embedded WebViews", () => {
    expect(resolveRefraction("auto", ANDROID_WEBVIEW)).toBe(false);
    expect(resolveRefraction(undefined, ANDROID_WEBVIEW)).toBe(false);
    expect(resolveRefraction("auto", ANDROID_CHROME)).toBe(true);
  });

  it("keeps explicit settings authoritative", () => {
    expect(resolveRefraction(true, ANDROID_WEBVIEW)).toBe(true);
    expect(resolveRefraction(false, ANDROID_CHROME)).toBe(false);
  });
});
