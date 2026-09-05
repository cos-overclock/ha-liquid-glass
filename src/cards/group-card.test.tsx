// @vitest-environment jsdom

import { act } from "react";
import { afterEach, describe, expect, it } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { LiquidGlassGroupCard, type GroupCardConfig } from "./group-card";
// The group builds children by tag name, so the child card has to be registered.
import "./switch-card";

type CardElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: GroupCardConfig): void;
  getCardSize(): number;
};

const reactTestScope = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean };
reactTestScope.IS_REACT_ACT_ENVIRONMENT = true;

class ResizeObserverStub implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

globalThis.ResizeObserver = ResizeObserverStub;

function entity(entityId: string, state: string, attributes: HassEntity["attributes"] = {}): HassEntity {
  const stamp = new Date(Date.now() - 120_000).toISOString();
  return { entity_id: entityId, state, attributes, last_changed: stamp, last_updated: stamp };
}

function createHass(states: HassEntity[], callService: HomeAssistant["callService"]): HomeAssistant {
  return {
    states: Object.fromEntries(states.map((item) => [item.entity_id, item])),
    language: "ja",
    locale: { language: "ja" },
    themes: { darkMode: false },
    callService,
    callApi: async <T,>() => undefined as T,
  };
}

afterEach(() => {
  document.body.replaceChildren();
});

describe("liquid-glass-group-card", () => {
  it("registers the custom element", () => {
    expect(customElements.get("liquid-glass-group-card")).toBe(LiquidGlassGroupCard);
  });

  it("mounts child cards and passes hass and appearance down", async () => {
    const light = entity("light.living", "on", { friendly_name: "リビング", brightness: 128 });
    const hass = createHass([light], async () => undefined);
    const element = document.createElement("liquid-glass-group-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-group-card",
      title: "寝室",
      theme: "dark",
      cards: [{ type: "custom:liquid-glass-switch-card", entity: light.entity_id }],
    });
    element.hass = hass;

    await act(async () => document.body.append(element));
    await act(async () => { await Promise.resolve(); });

    const root = element.shadowRoot!;
    expect(root.querySelector(".heading")?.textContent).toBe("寝室");
    const child = root.querySelector(".cards")?.firstElementChild as (HTMLElement & { hass?: unknown }) | null;
    expect(child?.tagName.toLowerCase()).toBe("liquid-glass-switch-card");
    expect(child?.hass).toBe(hass);

    // The child owns a React root of its own, so its first paint lands a tick later.
    await act(async () => { await new Promise((resolve) => setTimeout(resolve, 0)); });
    expect(child?.hasAttribute("dark")).toBe(true);
  });

  it("collapses to summary chips and reports a smaller size", async () => {
    const light = entity("light.living", "off", { friendly_name: "リビング" });
    const element = document.createElement("liquid-glass-group-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-group-card",
      collapsed: true,
      cards: [{ type: "custom:liquid-glass-switch-card", entity: light.entity_id }],
    });
    element.hass = createHass([light], async () => undefined);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    expect(root.querySelector(".cards")).toBeNull();
    expect(root.querySelectorAll(".sum")).toHaveLength(1);
    expect(element.getCardSize()).toBe(1);

    await act(async () => root.querySelector<HTMLElement>(".head")?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(root.querySelector(".cards")).toBeTruthy();
  });
});
