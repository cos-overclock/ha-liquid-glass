import { describe, expect, it } from "vitest";
import {
  isEmbeddedCompanionWebView,
  resolveRefraction,
  resolveRefractionQuality,
} from "./platform";

const ANDROID_WEBVIEW =
  "Mozilla/5.0 (Linux; Android 15; Pixel 8 Build/AP3A; wv) "
  + "AppleWebKit/537.36 Version/4.0 Chrome/140.0.0.0 Mobile Safari/537.36";
const ANDROID_CHROME =
  "Mozilla/5.0 (Linux; Android 15; Pixel 8) AppleWebKit/537.36 "
  + "Chrome/140.0.0.0 Mobile Safari/537.36";
const DESKTOP_CHROME =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
  + "Chrome/140.0.0.0 Safari/537.36";

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

  it("uses medium quality automatically on Android and high quality on desktop", () => {
    expect(resolveRefractionQuality("auto", ANDROID_CHROME)).toBe("medium");
    expect(resolveRefractionQuality(undefined, ANDROID_WEBVIEW)).toBe("medium");
    expect(resolveRefractionQuality("auto", DESKTOP_CHROME)).toBe("high");
  });

  it("lets an explicit quality override the platform default", () => {
    expect(resolveRefractionQuality("high", ANDROID_CHROME)).toBe("high");
    expect(resolveRefractionQuality("medium", DESKTOP_CHROME)).toBe("medium");
  });
});
