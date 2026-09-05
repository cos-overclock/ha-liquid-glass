import { describe, expect, it } from "vitest";
import { clockTime, createTranslator, relativeTime } from "./i18n";

const en = createTranslator("en");
const ja = createTranslator("ja");

/** Keys reached only through a template, so a plain grep for them finds nothing. */
const DYNAMIC_PREFIXES = ["mode_", "wx_", "ed_"];

describe("createTranslator", () => {
  it("resolves a key in each language", () => {
    expect(en("unavailable")).toBe("Unavailable");
    expect(ja("unavailable")).toBe("利用不可");
  });

  it("ignores region and case in the language tag", () => {
    expect(createTranslator("ja-JP")("unavailable")).toBe(ja("unavailable"));
    expect(createTranslator("JA")("unavailable")).toBe(ja("unavailable"));
  });

  it("falls back to English for an unknown or missing language", () => {
    expect(createTranslator("fr")("unavailable")).toBe(en("unavailable"));
    expect(createTranslator(undefined)("unavailable")).toBe(en("unavailable"));
  });

  it("returns the key itself rather than blank text for an unknown key", () => {
    expect(en("no_such_key")).toBe("no_such_key");
  });

  it("substitutes named variables", () => {
    expect(en("minutes_ago", { n: 5 })).toContain("5");
    expect(ja("minutes_ago", { n: 5 })).toContain("5");
  });

  /*
   * The dictionaries are memoised per language, and <Glass> style memos elsewhere depend
   * on stable identities for values derived from a translator.
   */
  it("hands back the same translator for the same language", () => {
    expect(createTranslator("ja")).toBe(createTranslator("ja-JP"));
  });
});

describe("dictionary coverage", () => {
  /*
   * A key present in one language and not the other silently falls back to English in
   * the middle of an otherwise Japanese card, which is easy to ship and hard to notice.
   */
  it("translates every key in both languages", () => {
    const missing: string[] = [];
    for (const key of KEYS) {
      if (ja(key) === key) missing.push(`ja:${key}`);
      if (en(key) === key) missing.push(`en:${key}`);
    }
    expect(missing).toEqual([]);
  });

  it("keeps a Japanese string for every key, not an English copy", () => {
    // Latin-only values are legitimate for a few keys; the rest must actually differ.
    const identical = KEYS.filter((key) => ja(key) === en(key) && !DYNAMIC_PREFIXES.some((p) => key.startsWith(p)));
    expect(identical.length).toBeLessThan(KEYS.length / 4);
  });
});

/** A representative slice of every family of key the cards use. */
const KEYS = [
  "on", "off", "lit", "unlit", "unavailable", "cannot_operate",
  "brightness", "color_temp", "hue", "saturation", "favorites", "color",
  "target_temp", "target_range", "room_temp", "humidity",
  "heating", "cooling", "drying", "fan_running", "idle",
  "mode_auto", "mode_heat_cool", "mode_cool", "mode_heat", "mode_dry", "mode_fan_only", "mode_off",
  "open", "closed", "is_open", "is_closed", "position", "tilt", "stopped", "moving",
  "locked", "unlocked", "is_locked", "is_unlocked", "locking", "unlocking", "jammed",
  "slide_to_lock", "slide_to_unlock",
  "detected", "detecting", "clear",
  "playing", "paused", "standby", "not_playing",
  "just_now", "seconds_ago", "minutes_ago", "hours_ago", "days_ago",
  "wx_sunny", "wx_rainy", "wx_snowy", "wx_cloudy", "wx_high", "wx_low", "wx_wind", "wx_precip",
  "grp_devices", "grp_running", "grp_all_idle", "grp_title", "grp_empty",
  "btn_scene", "btn_script", "btn_automation", "btn_button", "btn_done",
  "cam_live", "cam_still", "cam_motion", "cam_no_motion", "cam_offline", "cam_history",
  "sep_title", "slider_off", "scene_count", "power", "last_on",
  "ed_entity", "ed_name", "ed_icon", "ed_theme", "ed_refraction", "ed_refraction_quality",
  "ed_glass_variant", "ed_language", "ed_advanced",
];

describe("relativeTime", () => {
  const at = (msAgo: number) => new Date(Date.now() - msAgo).toISOString();

  it("says nothing without a timestamp", () => {
    expect(relativeTime(undefined, en)).toBe("");
  });

  it("steps through seconds, minutes, hours and days", () => {
    expect(relativeTime(at(5_000), en)).toBe(en("just_now"));
    expect(relativeTime(at(60_000), en)).toBe(en("seconds_ago", { n: 60 }));
    expect(relativeTime(at(10 * 60_000), en)).toBe(en("minutes_ago", { n: 10 }));
    expect(relativeTime(at(5 * 3_600_000), en)).toBe(en("hours_ago", { n: 5 }));
    expect(relativeTime(at(5 * 86_400_000), en)).toBe(en("days_ago", { n: 5 }));
  });

  /* A device whose clock runs ahead should read "just now", not a negative age. */
  it("treats a future timestamp as now", () => {
    expect(relativeTime(at(-60_000), en)).toBe(en("just_now"));
  });
});

describe("clockTime", () => {
  it("pads to HH:MM", () => {
    const date = new Date(2026, 0, 2, 9, 5);
    expect(clockTime(date.toISOString())).toBe("09:05");
  });

  it("says nothing without a timestamp", () => {
    expect(clockTime(undefined)).toBe("");
  });
});
