// @vitest-environment jsdom

import { act } from "react";
import { afterEach, describe, expect, it } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { LiquidGlassBinarySensorCard, type BinarySensorCardConfig } from "./binary-sensor-card";

type CardElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: BinarySensorCardConfig): void;
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

function entity(state: string, attributes: HassEntity["attributes"]): HassEntity {
  return {
    entity_id: "binary_sensor.test",
    state,
    attributes,
    last_changed: new Date(Date.now() - 120_000).toISOString(),
    last_updated: new Date(Date.now() - 120_000).toISOString(),
  };
}

function createHass(target: HassEntity): HomeAssistant {
  return {
    states: { [target.entity_id]: target },
    language: "ja",
    locale: { language: "ja" },
    themes: { darkMode: false },
    callService: async () => undefined,
    callApi: async <T,>() => undefined as T,
  };
}

async function mount(target: HassEntity, config?: Partial<BinarySensorCardConfig>): Promise<CardElement> {
  const element = document.createElement("liquid-glass-binary-sensor-card") as CardElement;
  element.setConfig({ type: "custom:liquid-glass-binary-sensor-card", entity: target.entity_id, ...config });
  element.hass = createHass(target);
  await act(async () => document.body.append(element));
  return element;
}

afterEach(() => {
  document.body.replaceChildren();
});

describe("liquid-glass-binary-sensor-card", () => {
  it("registers the custom element", () => {
    expect(customElements.get("liquid-glass-binary-sensor-card")).toBe(LiquidGlassBinarySensorCard);
  });

  it("uses the device class wording and tints the well while on", async () => {
    const element = await mount(entity("on", { friendly_name: "玄関ドア", device_class: "door" }));
    const root = element.shadowRoot!;

    expect(root.querySelector(".name")?.textContent).toBe("玄関ドア");
    expect(root.querySelector(".state")?.textContent).toContain("開いています");
    expect(root.querySelector(".badge")?.textContent).toContain("開");
    expect(root.querySelector(".icon-well")?.classList.contains("idle")).toBe(false);
    expect(element.getCardSize()).toBe(1);
  });

  it("falls back to the idle well and off wording", async () => {
    const element = await mount(entity("off", { friendly_name: "玄関ドア", device_class: "door" }));
    const root = element.shadowRoot!;

    expect(root.querySelector(".state")?.textContent).toContain("閉じています");
    expect(root.querySelector(".icon-well")?.classList.contains("idle")).toBe(true);
  });

  it("shows the unavailable header when the entity has no state", async () => {
    const element = await mount(entity("unavailable", { friendly_name: "玄関ドア" }));
    const root = element.shadowRoot!;

    expect(root.querySelector(".state")?.textContent).toBe("利用不可");
    expect(root.querySelector(".badge")).toBeNull();
  });
});
