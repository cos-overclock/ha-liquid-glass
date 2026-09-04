// @vitest-environment jsdom

import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { LiquidGlassSceneCard, type SceneCardConfig } from "./scene-card";

type CardElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: SceneCardConfig): void;
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

describe("liquid-glass-scene-card", () => {
  it("registers the custom element", () => {
    expect(customElements.get("liquid-glass-scene-card")).toBe(LiquidGlassSceneCard);
  });

  it("renders a tile grid and activates the domain service", async () => {
    vi.useFakeTimers();
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const morning = entity("scene.morning", "unknown", { friendly_name: "朝" });
    const element = document.createElement("liquid-glass-scene-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-scene-card",
      title: "シーン",
      columns: 2,
      scenes: [{ entity: morning.entity_id }, { entity: "script.vent", name: "換気" }],
    });
    element.hass = createHass([morning], callService);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    expect(root.querySelector(".heading")?.textContent).toBe("シーン");
    const tiles = root.querySelectorAll<HTMLElement>(".tile");
    expect(tiles).toHaveLength(2);
    expect(tiles[0].querySelector(".label")?.textContent).toBe("朝");
    expect(element.getCardSize()).toBe(3);

    await act(async () => tiles[0].dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(callService).toHaveBeenCalledWith("scene", "turn_on", { entity_id: morning.entity_id });
    expect(root.querySelectorAll(".tile.on")).toHaveLength(1);

    await act(async () => { vi.advanceTimersByTime(1200); });
    expect(root.querySelectorAll(".tile.on")).toHaveLength(0);
    vi.useRealTimers();
  });

  it("renders chips with a count and honours a per-item service", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const element = document.createElement("liquid-glass-scene-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-scene-card",
      style: "chips",
      show_count: true,
      scenes: [{ name: "外出", service: "demo.away", service_data: { mode: "eco" } }],
    });
    element.hass = createHass([], callService);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    expect(root.querySelector(".count")?.textContent).toBeTruthy();
    const chip = root.querySelector<HTMLElement>(".chip-button");
    expect(chip?.textContent).toBe("外出");

    await act(async () => chip?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(callService).toHaveBeenCalledWith("demo", "away", { mode: "eco" });
  });
});
