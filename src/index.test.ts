// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from "vitest";
import type { CustomBadgeRegistration, CustomCardRegistration, HassEntity, HomeAssistant, LovelaceCardSuggestion } from "./types";

class ResizeObserverStub implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
globalThis.ResizeObserver = ResizeObserverStub;

let cards: CustomCardRegistration[];
let badges: CustomBadgeRegistration[];

beforeAll(async () => {
  await import("./index");
  cards = window.customCards ?? [];
  badges = window.customBadges ?? [];
});

describe("badge registration", () => {
  it("registers the entity badge once with picker metadata", () => {
    expect(badges).toEqual([
      expect.objectContaining({
        type: "liquid-glass-entity-badge",
        name: expect.any(String),
        description: expect.any(String),
        preview: true,
        documentationURL: expect.stringContaining("github.com"),
      }),
    ]);
    expect(customElements.get("liquid-glass-entity-badge")).toBeDefined();
  });
});

function entity(entityId: string, attributes: HassEntity["attributes"] = {}): HassEntity {
  return { entity_id: entityId, state: "on", attributes, last_changed: "", last_updated: "" };
}

function hassWith(...entities: HassEntity[]): HomeAssistant {
  return {
    states: Object.fromEntries(entities.map((item) => [item.entity_id, item])),
    language: "en",
    callService: async () => undefined,
    callApi: async <T,>() => undefined as T,
  };
}

/** Which of our cards Home Assistant would offer for `target`. */
function suggestedFor(target: HassEntity): string[] {
  const hass = hassWith(target);
  return cards
    .filter((card) => card.getEntitySuggestion?.(hass, target.entity_id))
    .map((card) => card.type);
}

function suggestion(type: string, target: HassEntity): LovelaceCardSuggestion | null {
  const card = cards.find((item) => item.type === type);
  const result = card?.getEntitySuggestion?.(hassWith(target), target.entity_id);
  return (Array.isArray(result) ? result[0] : result) ?? null;
}

describe("card registration", () => {
  it("registers every card exactly once", () => {
    const types = cards.map((card) => card.type);
    expect(new Set(types).size).toBe(types.length);
    expect(types.length).toBeGreaterThanOrEqual(15);
  });

  it("defines the custom element behind each registration", () => {
    for (const card of cards) expect(customElements.get(card.type), card.type).toBeDefined();
  });

  it("gives each card a name, a description, a preview and documentation", () => {
    for (const card of cards) {
      expect(card.name, card.type).toBeTruthy();
      expect(card.description, card.type).toBeTruthy();
      expect(card.preview, card.type).toBe(true);
      expect(card.documentationURL, card.type).toContain("github.com");
    }
  });

  /* Re-evaluating the bundle happens on a resource reload; it must not duplicate rows. */
  it("survives being evaluated twice", async () => {
    const before = window.customCards?.length;
    const badgesBefore = window.customBadges?.length;
    await import(/* @vite-ignore */ `./index.ts?reimport=${Date.now()}`);
    expect(window.customCards?.length).toBe(before);
    expect(window.customBadges?.length).toBe(badgesBefore);
  });
});

describe("entity suggestions", () => {
  it("offers the light card for a light", () => {
    expect(suggestedFor(entity("light.desk"))).toContain("liquid-glass-light-card");
  });

  it("offers the vacuum card for a vacuum", () => {
    expect(suggestedFor(entity("vacuum.downstairs", { supported_features: 8192 })))
      .toContain("liquid-glass-vacuum-card");
  });

  it("offers the dedicated fan card for a fan", () => {
    expect(suggestedFor(entity("fan.bedroom", { supported_features: 15 })))
      .toContain("liquid-glass-fan-card");
  });

  it("offers the select card for select helpers and integrations", () => {
    expect(suggestedFor(entity("select.fan_mode", { options: ["Auto", "Turbo"] })))
      .toContain("liquid-glass-select-card");
    expect(suggestedFor(entity("input_select.cleaning_mode", { options: ["Vacuum", "Mop"] })))
      .toContain("liquid-glass-select-card");
  });

  /*
   * The separator is the deliberate exception: it has no entity of its own, and offers
   * a neutral suggestion so it stays reachable from the entity-first Community list.
   */
  it("offers no entity card for a domain none of them handle", () => {
    expect(suggestedFor(entity("person.alice")))
      .toEqual(["liquid-glass-separator-card"]);
  });

  it("seeds the suggestion with the entity that was picked", () => {
    expect(suggestion("liquid-glass-light-card", entity("light.desk"))?.config).toEqual({
      type: "custom:liquid-glass-light-card",
      entity: "light.desk",
    });
  });

  /* The scene card takes a list, not a single entity, so its stub has to differ. */
  it("seeds the scene card with a one-item list", () => {
    expect(suggestion("liquid-glass-scene-card", entity("scene.evening"))?.config).toEqual({
      type: "custom:liquid-glass-scene-card",
      scenes: [{ entity: "scene.evening" }],
    });
  });

  it("offers a thermostat only when it can actually set a temperature", () => {
    expect(suggestedFor(entity("climate.hall", { supported_features: 1 })))
      .toContain("liquid-glass-climate-card");
    expect(suggestedFor(entity("climate.hall", { supported_features: 0 })))
      .not.toContain("liquid-glass-climate-card");
  });

  it("offers a cover card only for a cover that opens, closes or positions", () => {
    expect(suggestedFor(entity("cover.blind", { supported_features: 4 })))
      .toContain("liquid-glass-cover-card");
    expect(suggestedFor(entity("cover.blind", { supported_features: 0 })))
      .not.toContain("liquid-glass-cover-card");
  });

  /*
   * A slider over an on/off light would be a control with nothing to slide, so the
   * suggestion checks the entity really exposes a writable value.
   */
  it("offers the slider only where there is a value to slide", () => {
    const cases: Array<[HassEntity, boolean]> = [
      [entity("input_number.target"), true],
      [entity("number.target"), true],
      [entity("light.dimmable", { supported_color_modes: ["brightness"] }), true],
      [entity("light.plain", { supported_color_modes: ["onoff"] }), false],
      [entity("fan.desk", { supported_features: 1 }), true],
      [entity("fan.plain", { supported_features: 0 }), false],
      [entity("media_player.hifi", { supported_features: 4 }), true],
      [entity("media_player.tv", { supported_features: 0 }), false],
      [entity("cover.blind", { supported_features: 4 }), true],
      [entity("cover.gate", { supported_features: 3 }), false],
      [entity("humidifier.room", { humidity: 45 }), true],
      [entity("humidifier.bare"), false],
      [entity("climate.hall", { supported_features: 1 }), true],
      [entity("climate.vent", { supported_features: 0 }), false],
    ];
    for (const [target, expected] of cases) {
      expect(suggestedFor(target).includes("liquid-glass-slider-card"), target.entity_id)
        .toBe(expected);
    }
  });

  it("suggests several cards where several genuinely fit", () => {
    const dimmable = entity("light.desk", { supported_color_modes: ["brightness"] });
    const offered = suggestedFor(dimmable);
    expect(offered).toContain("liquid-glass-light-card");
    expect(offered).toContain("liquid-glass-slider-card");
  });

  it("refuses to suggest a card for an entity that is not in the state machine", () => {
    const card = cards.find((item) => item.type === "liquid-glass-climate-card");
    expect(card?.getEntitySuggestion?.(hassWith(), "climate.missing")).toBeNull();
  });

  /* The group card holds other cards, so an entity tells it nothing. */
  it("leaves the group card out of entity-first suggestions", () => {
    const card = cards.find((item) => item.type === "liquid-glass-group-card");
    expect(card?.getEntitySuggestion).toBeUndefined();
  });

  it("offers the separator whatever the entity, with a ready-made heading", () => {
    const separator = cards.find((item) => item.type === "liquid-glass-separator-card");
    for (const entityId of ["light.desk", "person.alice", "sensor.temperature"]) {
      const result = separator?.getEntitySuggestion?.(hassWith(), entityId);
      expect(Array.isArray(result) ? result[0] : result).toMatchObject({
        config: { type: "custom:liquid-glass-separator-card", title: expect.any(String) },
      });
    }
  });
});
