// @vitest-environment jsdom

import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { LiquidGlassSwitchCard, type SwitchCardConfig } from "./switch-card";

type CardElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: SwitchCardConfig): void;
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

describe("liquid-glass-switch-card", () => {
  it("registers the custom element", () => {
    expect(customElements.get("liquid-glass-switch-card")).toBe(LiquidGlassSwitchCard);
  });

  it("toggles the entity on tap and shows the power reading while on", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = entity("switch.desk", "on", { friendly_name: "デスク" });
    const power = entity("sensor.desk_power", "42", { unit_of_measurement: "W" });
    const element = document.createElement("liquid-glass-switch-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-switch-card",
      entity: target.entity_id,
      power_entity: power.entity_id,
    });
    element.hass = createHass([target, power], callService);

    await act(async () => document.body.append(element));
    const card = element.shadowRoot?.querySelector<HTMLElement>(".card");
    expect(card?.getAttribute("aria-checked")).toBe("true");
    expect(card?.classList.contains("active")).toBe(true);
    expect(element.shadowRoot?.querySelector(".state")?.textContent).toContain("42 W");

    await act(async () => card?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(callService).toHaveBeenCalledWith("switch", "toggle", { entity_id: target.entity_id });
  });

  it("falls back to homeassistant.toggle for domains without one", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = entity("media_player.tv", "off", { friendly_name: "テレビ" });
    const element = document.createElement("liquid-glass-switch-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-switch-card", entity: target.entity_id });
    element.hass = createHass([target], callService);

    await act(async () => document.body.append(element));
    const card = element.shadowRoot?.querySelector<HTMLElement>(".card");
    expect(card?.classList.contains("active")).toBe(false);

    await act(async () => card?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(callService).toHaveBeenCalledWith("homeassistant", "toggle", { entity_id: target.entity_id });
  });

  it("lets a configured tap action replace the built-in toggle", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = entity("switch.desk", "off", { friendly_name: "デスク" });
    const element = document.createElement("liquid-glass-switch-card") as CardElement;
    const tapAction = { action: "navigate" as const, navigation_path: "/dashboard/desk" };
    element.setConfig({
      type: "custom:liquid-glass-switch-card",
      entity: target.entity_id,
      tap_action: tapAction,
    });
    element.hass = createHass([target], callService);
    const handled = vi.fn();
    element.addEventListener("hass-action", handled);

    await act(async () => document.body.append(element));
    const card = element.shadowRoot?.querySelector<HTMLElement>(".card");
    await act(async () => card?.dispatchEvent(new MouseEvent("click", { bubbles: true })));

    expect(callService).not.toHaveBeenCalled();
    expect(handled).toHaveBeenCalledOnce();
    expect(handled.mock.calls[0][0].detail).toMatchObject({
      action: "tap",
      config: { entity: target.entity_id, tap_action: tapAction },
    });
  });

  it("animates only after the switch state changes", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = entity("switch.desk", "off", { friendly_name: "デスク" });
    const element = document.createElement("liquid-glass-switch-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-switch-card", entity: target.entity_id });
    element.hass = createHass([target], callService);

    await act(async () => document.body.append(element));
    expect(element.shadowRoot?.querySelector(".card")?.classList.contains("switch-turned-off")).toBe(false);

    await act(async () => {
      element.hass = createHass([{ ...target, state: "on" }], callService);
    });
    expect(element.shadowRoot?.querySelector(".card")?.classList.contains("switch-turned-on")).toBe(true);

    await act(async () => {
      element.hass = createHass([{ ...target, state: "off" }], callService);
    });
    expect(element.shadowRoot?.querySelector(".card")?.classList.contains("switch-turned-off")).toBe(true);
  });

  it("opens more-info on hold instead of toggling", async () => {
    vi.useFakeTimers();
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = entity("switch.desk", "off", { friendly_name: "デスク" });
    const element = document.createElement("liquid-glass-switch-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-switch-card", entity: target.entity_id });
    element.hass = createHass([target], callService);

    await act(async () => document.body.append(element));
    const moreInfo = vi.fn();
    element.addEventListener("hass-more-info", moreInfo);
    const card = element.shadowRoot?.querySelector<HTMLElement>(".card");

    await act(async () => {
      card?.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0 }));
      vi.advanceTimersByTime(600);
    });
    await act(async () => card?.dispatchEvent(new MouseEvent("click", { bubbles: true })));

    expect(moreInfo).toHaveBeenCalledOnce();
    expect(callService).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
