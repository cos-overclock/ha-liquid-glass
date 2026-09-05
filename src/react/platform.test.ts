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
/** The Companion app drops the `Safari` token that a real iOS browser carries. */
const IOS_COMPANION =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 "
  + "(KHTML, like Gecko) Mobile/15E148 Home Assistant/2026.9 "
  + "(io.robbie.HomeAssistant; build:2026.9; iOS 18.0.0)";
const IOS_SAFARI =
  "Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 "
  + "(KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1";

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

  it("recognises the iOS Companion app, which carries no Safari token", () => {
    expect(isEmbeddedCompanionWebView(IOS_COMPANION)).toBe(true);
    expect(isEmbeddedCompanionWebView(IOS_SAFARI)).toBe(false);
  });

  it("uses medium quality automatically on Android and high quality on desktop", () => {
    expect(resolveRefractionQuality("auto", ANDROID_CHROME)).toBe("medium");
    expect(resolveRefractionQuality(undefined, ANDROID_WEBVIEW)).toBe("medium");
    expect(resolveRefractionQuality("auto", DESKTOP_CHROME)).toBe("high");
  });

  /*
   * The library only skips supersampling on engines it detects as WebKit, and the
   * iOS Companion is not one of them. Quality has to carry the downscale instead,
   * or `filterResolution: 2` quadruples the filter raster on that app.
   */
  it("uses medium quality in the iOS Companion but not in mobile Safari", () => {
    expect(resolveRefractionQuality("auto", IOS_COMPANION)).toBe("medium");
    expect(resolveRefractionQuality(undefined, IOS_COMPANION)).toBe("medium");
    expect(resolveRefractionQuality("auto", IOS_SAFARI)).toBe("high");
  });

  it("lets an explicit quality override the platform default", () => {
    expect(resolveRefractionQuality("high", ANDROID_CHROME)).toBe("high");
    expect(resolveRefractionQuality("medium", DESKTOP_CHROME)).toBe("medium");
  });
});
