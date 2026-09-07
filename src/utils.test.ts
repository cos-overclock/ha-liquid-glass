// @vitest-environment jsdom
import { describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "./types";
import {
  callConfiguredService,
  clamp,
  darken,
  entityName,
  entityStateText,
  fireEvent,
  formatNumber,
  hexToRgb,
  hsToRgb,
  isUnavailable,
  kelvinToRgb,
  lighten,
  moreInfo,
  pct,
  pickEntity,
  rgbToHex,
  supportsFeature,
  withAlpha,
} from "./utils";

function entity(entityId: string, state = "on", attributes: HassEntity["attributes"] = {}): HassEntity {
  return { entity_id: entityId, state, attributes, last_changed: "", last_updated: "" };
}

function hassWith(...entities: HassEntity[]): HomeAssistant {
  return {
    states: Object.fromEntries(entities.map((item) => [item.entity_id, item])),
    language: "en",
    callService: vi.fn(async () => undefined),
    callApi: async <T,>() => undefined as T,
  };
}

describe("clamp and pct", () => {
  it("holds a value inside its range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
    expect(clamp(-1, 0, 10)).toBe(0);
    expect(clamp(11, 0, 10)).toBe(10);
  });

  it("renders a ratio as a whole percentage, clamped to 0..1", () => {
    expect(pct(0.5)).toBe("50%");
    expect(pct(-2)).toBe("0%");
    expect(pct(2)).toBe("100%");
  });
});

describe("fireEvent", () => {
  it("crosses the shadow boundary, which Home Assistant listens across", () => {
    const host = document.createElement("div");
    const shadow = host.attachShadow({ mode: "open" });
    const inner = document.createElement("span");
    shadow.append(inner);
    document.body.append(host);
    const seen = vi.fn();
    document.body.addEventListener("hass-more-info", seen);

    moreInfo(inner, "light.desk");

    expect(seen).toHaveBeenCalledOnce();
    expect((seen.mock.calls[0][0] as CustomEvent).detail).toEqual({ entityId: "light.desk" });
    host.remove();
  });

  it("says nothing when there is no entity to open", () => {
    const node = document.createElement("div");
    const seen = vi.fn();
    node.addEventListener("hass-more-info", seen);
    moreInfo(node, undefined);
    expect(seen).not.toHaveBeenCalled();
  });

  it("carries an empty detail by default", () => {
    const node = document.createElement("div");
    const seen = vi.fn();
    node.addEventListener("ping", seen);
    fireEvent(node, "ping");
    expect((seen.mock.calls[0][0] as CustomEvent).detail).toEqual({});
  });
});

describe("entity helpers", () => {
  /*
   * Composing a name needs the registries, which only Home Assistant can read. The card
   * hands it whatever the `entity_name` selector wrote and shows what comes back.
   */
  it("lets Home Assistant compose the name when the core can", () => {
    const desk = entity("light.desk", "on", { friendly_name: "Desk" });
    const hass = hassWith(desk);
    hass.formatEntityName = (target, name) =>
      `${target.entity_id}:${JSON.stringify(name ?? null)}`;

    expect(entityName(hass, desk, [{ type: "area" }, { type: "entity" }], "light.desk"))
      .toBe('light.desk:[{"type":"area"},{"type":"entity"}]');
    expect(entityName(hass, desk, undefined, "light.desk")).toBe("light.desk:null");
  });

  it("falls back to the friendly name on a core with no name helper", () => {
    const desk = entity("light.desk", "on", { friendly_name: "Desk" });
    const hass = hassWith(desk);

    expect(entityName(hass, desk, undefined, "light.desk")).toBe("Desk");
    expect(entityName(hass, desk, "Reading lamp", "light.desk")).toBe("Reading lamp");
    expect(entityName(hass, desk, [{ type: "device" }, { type: "entity" }], "light.desk")).toBe("Desk");
    expect(entityName(undefined, undefined, undefined, "light.desk")).toBe("light.desk");
  });

  /* Literal text needs no registry, so it must survive an older core intact. */
  it("keeps a text-only composition without the name helper", () => {
    const desk = entity("light.desk", "on", { friendly_name: "Desk" });
    expect(entityName(hassWith(desk), desk, [{ type: "text", text: "Hall" }, { type: "text", text: "lamp" }], ""))
      .toBe("Hall lamp");
  });

  /* An empty answer would leave the card with a blank title, so it is not trusted. */
  it("ignores a blank name from Home Assistant", () => {
    const desk = entity("light.desk", "on", { friendly_name: "Desk" });
    const hass = hassWith(desk);
    hass.formatEntityName = () => "   ";
    expect(entityName(hass, desk, undefined, "light.desk")).toBe("Desk");
  });

  it("prefers Home Assistant's wording for a state and falls back to the card's own", () => {
    const sensor = entity("binary_sensor.hall", "on", { device_class: "motion" });
    const hass = hassWith(sensor);
    expect(entityStateText(hass, sensor, "Detected")).toBe("Detected");

    hass.formatEntityState = (target, state) => `${state ?? target.state}!`;
    expect(entityStateText(hass, sensor, "Detected")).toBe("on!");
    expect(entityStateText(hass, sensor, "Clear", "off")).toBe("off!");
    expect(entityStateText(hass, undefined, "Detected")).toBe("Detected");
  });

  /* The helpers belong to Home Assistant; a card must not go blank when one throws. */
  it("keeps rendering when a Home Assistant helper throws", () => {
    const desk = entity("light.desk", "on", { friendly_name: "Desk" });
    const hass = hassWith(desk);
    hass.formatEntityName = () => { throw new Error("no registry"); };
    hass.formatEntityState = () => { throw new Error("no translations"); };

    expect(entityName(hass, desk, undefined, "light.desk")).toBe("Desk");
    expect(entityStateText(hass, desk, "On")).toBe("On");
  });

  it("treats a missing, unavailable or unknown entity as unavailable", () => {
    expect(isUnavailable(undefined)).toBe(true);
    expect(isUnavailable(entity("light.desk", "unavailable"))).toBe(true);
    expect(isUnavailable(entity("light.desk", "unknown"))).toBe(true);
    expect(isUnavailable(entity("light.desk", "off"))).toBe(false);
  });

  it("reads a supported_features bitmask", () => {
    const withFeatures = entity("cover.blind", "open", { supported_features: 0b1010 });
    expect(supportsFeature(withFeatures, 0b0010)).toBe(true);
    expect(supportsFeature(withFeatures, 0b0100)).toBe(false);
    expect(supportsFeature(entity("cover.blind"), 1)).toBe(false);
    expect(supportsFeature(undefined, 1)).toBe(false);
  });
});

describe("formatNumber", () => {
  it("uses the locale language ahead of the interface language", () => {
    const hass = { ...hassWith(), language: "en", locale: { language: "de" } } as HomeAssistant;
    expect(formatNumber(hass, 1234.5)).toBe("1.234,5");
  });

  it("shows no decimals for a whole number and one otherwise", () => {
    const hass = hassWith();
    expect(formatNumber(hass, 21)).toBe("21");
    expect(formatNumber(hass, 21.48)).toBe("21.5");
  });

  it("honours an explicit digit count in both directions", () => {
    const hass = hassWith();
    expect(formatNumber(hass, 21, 2)).toBe("21.00");
    expect(formatNumber(hass, 21.4567, 1)).toBe("21.5");
  });

  it("falls back to the plain number for a language Intl rejects", () => {
    const hass = { ...hassWith(), language: "not a language" };
    expect(formatNumber(hass, 12.5)).toBe("12.5");
  });
});

describe("callConfiguredService", () => {
  it("splits and dispatches a domain.service pair", () => {
    const hass = hassWith();
    expect(callConfiguredService(hass, "camera.snapshot", { entity_id: "camera.porch" })).toBe(true);
    expect(hass.callService).toHaveBeenCalledWith("camera", "snapshot", { entity_id: "camera.porch" });
  });

  /*
   * Config is hand-written YAML. A bare service name used to reach the frontend as
   * callService("snapshot", undefined) and fail somewhere far from the cause.
   */
  it("refuses a spec that is not a domain.service pair", () => {
    const hass = hassWith();
    for (const spec of [undefined, "", "snapshot", ".turn_on", "scene."]) {
      expect(callConfiguredService(hass, spec)).toBe(false);
    }
    expect(hass.callService).not.toHaveBeenCalled();
  });
});

describe("pickEntity", () => {
  it("takes the first unused entity in the domain", () => {
    const hass = hassWith(entity("light.a"), entity("light.b"));
    expect(pickEntity(["light"], hass, ["light.a"], ["light.b"])).toBe("light.a");
  });

  it("skips unavailable entities", () => {
    const hass = hassWith(entity("light.a", "unavailable"), entity("light.b"));
    expect(pickEntity(["light"], hass, ["light.a", "light.b"])).toBe("light.b");
  });

  it("tries the preference across every list before settling for a plain match", () => {
    const hass = hassWith(
      entity("light.plain"),
      entity("light.dimmable", "on", { brightness: 128 }),
    );
    const dimmable = (item: HassEntity) => "brightness" in item.attributes;
    // The preferred entity is only in the fallback list, but still wins.
    expect(pickEntity(["light"], hass, ["light.plain"], ["light.dimmable"], dimmable))
      .toBe("light.dimmable");
  });

  it("falls back to the whole state list, then to a placeholder", () => {
    const hass = hassWith(entity("light.only"));
    expect(pickEntity(["light"], hass)).toBe("light.only");
    expect(pickEntity(["cover"], hass)).toBe("cover.example");
    expect(pickEntity(["switch"])).toBe("switch.example");
  });
});

describe("colour helpers", () => {
  it("round-trips hex and rgb", () => {
    expect(hexToRgb("#4080c0")).toEqual([0x40, 0x80, 0xc0]);
    expect(hexToRgb("4080C0")).toEqual([0x40, 0x80, 0xc0]);
    expect(hexToRgb("  #4080c0 ")).toEqual([0x40, 0x80, 0xc0]);
    expect(rgbToHex([0x40, 0x80, 0xc0])).toBe("#4080c0");
  });

  it("rejects anything that is not a six-digit hex colour", () => {
    for (const bad of ["#abc", "#gggggg", "rgb(1,2,3)", ""]) expect(hexToRgb(bad)).toBeUndefined();
  });

  it("clamps and rounds out-of-range channels", () => {
    expect(rgbToHex([-20, 300, 127.6])).toBe("#00ff80");
  });

  it("moves a colour towards white and towards black", () => {
    expect(lighten("#000000", 0.5)).toBe("#808080");
    expect(darken("#ffffff", 0.5)).toBe("#808080");
    // A colour it cannot parse comes back untouched rather than as garbage.
    expect(lighten("nope")).toBe("nope");
    expect(darken("nope")).toBe("nope");
    expect(withAlpha("nope", 0.5)).toBe("nope");
  });

  it("builds an rgba string", () => {
    expect(withAlpha("#4080c0", 0.5)).toBe("rgba(64, 128, 192, 0.5)");
  });

  it("maps hue and saturation onto rgb", () => {
    expect(hsToRgb(0, 100)).toEqual([255, 0, 0]);
    expect(hsToRgb(120, 100)).toEqual([0, 255, 0]);
    expect(hsToRgb(240, 100)).toEqual([0, 0, 255]);
    expect(hsToRgb(0, 0)).toEqual([255, 255, 255]);
    // Hue wraps in both directions rather than falling off the table.
    expect(hsToRgb(360, 100)).toEqual(hsToRgb(0, 100));
    expect(hsToRgb(-120, 100)).toEqual(hsToRgb(240, 100));
  });

  it("warms low colour temperatures and cools high ones", () => {
    const warm = hexToRgb(kelvinToRgb(2000));
    const cool = hexToRgb(kelvinToRgb(8000));
    expect(warm?.[0]).toBeGreaterThan(warm?.[2] ?? 0);
    expect(cool?.[2]).toBeGreaterThan(cool?.[0] ?? 0);
    // Far outside the modelled range it still returns a usable colour.
    expect(kelvinToRgb(0)).toMatch(/^#[0-9a-f]{6}$/);
    expect(kelvinToRgb(1_000_000)).toMatch(/^#[0-9a-f]{6}$/);
  });
});
