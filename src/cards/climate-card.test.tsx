// @vitest-environment jsdom

import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { LiquidGlassClimateCard, type ClimateCardConfig } from "./climate-card";

type CardElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: ClimateCardConfig): void;
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

function thermostat(state: string, attributes: HassEntity["attributes"] = {}): HassEntity {
  const stamp = new Date().toISOString();
  return {
    entity_id: "climate.living",
    state,
    attributes: {
      friendly_name: "リビング エアコン",
      hvac_modes: ["auto", "cool", "heat", "off"],
      hvac_action: "heating",
      min_temp: 10,
      max_temp: 30,
      target_temp_step: 0.5,
      temperature: 22,
      current_temperature: 21.5,
      fan_modes: ["auto", "high"],
      fan_mode: "auto",
      ...attributes,
    },
    last_changed: stamp,
    last_updated: stamp,
  };
}

function createHass(target: HassEntity, callService: HomeAssistant["callService"]): HomeAssistant {
  return {
    states: { [target.entity_id]: target },
    language: "ja",
    locale: { language: "ja" },
    themes: { darkMode: false },
    callService,
    callApi: async <T,>() => undefined as T,
  };
}

function mockRect(element: HTMLElement, rect: { width: number; height: number }): HTMLElement {
  const full = { left: 0, top: 0, right: rect.width, bottom: rect.height, x: 0, y: 0, ...rect };
  Object.defineProperty(element, "getBoundingClientRect", { value: () => ({ ...full, toJSON: () => ({}) }) });
  Object.defineProperty(element, "setPointerCapture", { value: () => undefined });
  return element;
}

afterEach(() => {
  document.body.replaceChildren();
});

describe("liquid-glass-climate-card", () => {
  it("registers the custom element", () => {
    expect(customElements.get("liquid-glass-climate-card")).toBe(LiquidGlassClimateCard);
  });

  it("draws the dial and sets the temperature from a drag", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = thermostat("heat");
    const element = document.createElement("liquid-glass-climate-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-climate-card", entity: target.entity_id });
    element.hass = createHass(target, callService);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    expect(root.querySelector(".target")?.textContent).toBe("22");
    expect(root.querySelector(".fraction")?.textContent).toBe(".0°");
    expect(root.querySelectorAll(".dial-knob")).toHaveLength(1);
    // The dial knob is opaque at rest and only turns to glass while dragged, same as
    // every other slider's thumb.
    expect(root.querySelectorAll(".dial-knob-cap")).toHaveLength(1);
    // The cap only fades once the parent ".dial" gets the "dragging" class, so
    // sitting on "moving" by default at rest is harmless.
    expect(root.querySelector(".dial")?.classList.contains("dragging")).toBe(false);
    expect(root.querySelectorAll(".segment.modes > button")).toHaveLength(4);
    expect(element.getCardSize()).toBe(6);

    // Straight up from the centre is the top of the 270° sweep, i.e. the midpoint.
    const dial = mockRect(root.querySelector<HTMLElement>(".dial")!, { width: 200, height: 200 });
    await act(async () => dial.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 100, clientY: 0 })));
    await act(async () => dial.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 100, clientY: 0 })));
    expect(callService).toHaveBeenCalledWith("climate", "set_temperature", {
      entity_id: target.entity_id,
      temperature: 20,
    });
  });

  it("switches mode from the segment and changes the fan mode", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = thermostat("heat");
    const element = document.createElement("liquid-glass-climate-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-climate-card", entity: target.entity_id });
    element.hass = createHass(target, callService);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;

    await act(async () => root.querySelectorAll<HTMLElement>(".segment.modes > button")[1].dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(callService).toHaveBeenCalledWith("climate", "set_hvac_mode", {
      entity_id: target.entity_id,
      hvac_mode: "cool",
    });

    const select = root.querySelector<HTMLSelectElement>(".detail select")!;
    select.value = "high";
    await act(async () => select.dispatchEvent(new Event("change", { bubbles: true })));
    expect(callService).toHaveBeenCalledWith("climate", "set_fan_mode", {
      entity_id: target.entity_id,
      fan_mode: "high",
    });
  });

  it("renders the compact slider with no step buttons and drags to set the temperature", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = thermostat("heat");
    const element = document.createElement("liquid-glass-climate-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-climate-card",
      entity: target.entity_id,
      design: "compact",
    });
    element.hass = createHass(target, callService);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    expect(root.querySelector(".dial")).toBeNull();
    expect(root.querySelector(".tile-target .number")?.textContent).toBe("22");
    // The compact design uses the same slider component as every other card.
    expect(root.querySelector(".climate-compact .slider-track")).toBeTruthy();
    expect(root.querySelectorAll(".climate-compact .slider-knob")).toHaveLength(1);
    // The bar is a flat colour for the active mode, not the old fixed rainbow gradient.
    expect(root.querySelector<HTMLElement>(".climate-compact")?.style.getPropertyValue("--lg-slider-fill")).toBe("var(--lg-heat)");
    // The +/- step buttons are gone; dragging the bar is the only way to change the target.
    expect(root.querySelector(".tile-step-controls")).toBeNull();

    const track = mockRect(root.querySelector<HTMLElement>(".climate-compact .slider-track")!, { width: 200, height: 44 });
    await act(async () => track.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 190 })));
    await act(async () => track.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 190 })));
    expect(callService).toHaveBeenCalledWith("climate", "set_temperature", {
      entity_id: target.entity_id,
      temperature: 30,
    });
  });

  it("honours a configured min_temp / max_temp range", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = thermostat("heat");
    const element = document.createElement("liquid-glass-climate-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-climate-card",
      entity: target.entity_id,
      min_temp: 10,
      max_temp: 20,
    });
    element.hass = createHass(target, callService);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    const [lo, hi] = root.querySelectorAll(".minmax span");
    expect(lo.textContent).toBe("10°");
    expect(hi.textContent).toBe("20°");

    const dial = mockRect(root.querySelector<HTMLElement>(".dial")!, { width: 200, height: 200 });
    await act(async () => dial.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 100, clientY: 0 })));
    await act(async () => dial.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 100, clientY: 0 })));
    // Straight up is the midpoint of the sweep, i.e. the middle of the configured 10..20
    // range rather than the entity's own 10..30 (which would put it at 20).
    expect(callService).toHaveBeenCalledWith("climate", "set_temperature", {
      entity_id: target.entity_id,
      temperature: 15,
    });
  });

  it("drags a heat_cool range from the compact slider", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = thermostat("heat_cool", {
      hvac_action: "idle",
      temperature: undefined,
      target_temp_low: 18,
      target_temp_high: 26,
    });
    const element = document.createElement("liquid-glass-climate-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-climate-card",
      entity: target.entity_id,
      design: "compact",
    });
    element.hass = createHass(target, callService);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    expect(root.querySelectorAll(".climate-compact .slider-knob")).toHaveLength(2);

    // Drag the handle nearest 100 on a 10..30 range, i.e. the high end.
    const track = mockRect(root.querySelector<HTMLElement>(".climate-compact .slider-track")!, { width: 200, height: 44 });
    await act(async () => track.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 190 })));
    // Only the handle under the finger turns to glass; the low end stays solid.
    expect(root.querySelectorAll(".climate-compact .slider-knob.moving")).toHaveLength(1);
    await act(async () => track.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 190 })));
    expect(callService).toHaveBeenCalledWith("climate", "set_temperature", {
      entity_id: target.entity_id,
      target_temp_low: 18,
      target_temp_high: 30,
    });
  });
});
