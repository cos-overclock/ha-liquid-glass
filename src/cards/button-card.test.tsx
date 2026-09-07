// @vitest-environment jsdom

import { act } from "../react/test-act";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { LiquidGlassButtonCard, type ButtonCardConfig } from "./button-card";

type CardElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: ButtonCardConfig): void;
  getCardSize(): number;
};


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

describe("liquid-glass-button-card", () => {
  it("registers the custom element", () => {
    expect(customElements.get("liquid-glass-button-card")).toBe(LiquidGlassButtonCard);
  });

  it("runs the domain service and confirms with a tick", async () => {
    vi.useFakeTimers();
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = entity("script.vent", "off", { friendly_name: "換気" });
    const element = document.createElement("liquid-glass-button-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-button-card", entity: target.entity_id });
    element.hass = createHass([target], callService);

    await act(async () => document.body.append(element));
    const card = element.shadowRoot?.querySelector<HTMLElement>(".card");
    expect(element.shadowRoot?.querySelector(".action.done")).toBeNull();

    await act(async () => card?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(callService).toHaveBeenCalledWith("script", "turn_on", { entity_id: target.entity_id });
    expect(element.shadowRoot?.querySelector(".action.done")).toBeTruthy();

    await act(async () => { vi.advanceTimersByTime(3000); });
    expect(element.shadowRoot?.querySelector(".action.done")).toBeNull();
    vi.useRealTimers();
  });

  it("honours a configured service and accent", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = entity("scene.night", new Date(Date.now() - 3600_000).toISOString(), { friendly_name: "夜" });
    const element = document.createElement("liquid-glass-button-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-button-card",
      entity: target.entity_id,
      service: "demo.run",
      service_data: { mode: "soft" },
      accent: "#5E5CE6",
      subtitle: "おやすみ",
    });
    element.hass = createHass([target], callService);

    await act(async () => document.body.append(element));
    expect(element.shadowRoot?.querySelector(".state")?.textContent).toBe("おやすみ");

    await act(async () => element.shadowRoot?.querySelector<HTMLElement>(".card")?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(callService).toHaveBeenCalledWith("demo", "run", { entity_id: target.entity_id, mode: "soft" });
  });
});
