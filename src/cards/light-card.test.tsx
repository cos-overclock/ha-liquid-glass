// @vitest-environment jsdom

import { act } from "../react/test-act";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { LiquidGlassLightCard, type LightCardConfig } from "./light-card";

type CardElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: LightCardConfig): void;
  getCardSize(): number;
};


class ResizeObserverStub implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

globalThis.ResizeObserver = ResizeObserverStub;

function light(state: string, attributes: HassEntity["attributes"] = {}): HassEntity {
  const stamp = new Date().toISOString();
  return {
    entity_id: "light.living",
    state,
    attributes: {
      friendly_name: "リビング",
      supported_color_modes: ["color_temp", "hs"],
      color_mode: "color_temp",
      brightness: 184,
      color_temp_kelvin: 3200,
      min_color_temp_kelvin: 2000,
      max_color_temp_kelvin: 6500,
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

function mockTrack(track: HTMLElement): HTMLElement {
  Object.defineProperty(track, "getBoundingClientRect", {
    value: () => ({ left: 0, width: 200, right: 200, top: 0, bottom: 44, height: 44, x: 0, y: 0, toJSON: () => ({}) }),
  });
  Object.defineProperty(track, "setPointerCapture", { value: () => undefined });
  return track;
}

afterEach(() => {
  document.body.replaceChildren();
});

describe("liquid-glass-light-card", () => {
  it("registers the custom element", () => {
    expect(customElements.get("liquid-glass-light-card")).toBe(LiquidGlassLightCard);
  });

  it("toggles from the header and sets brightness from the slider", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = light("on");
    const element = document.createElement("liquid-glass-light-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-light-card", entity: target.entity_id });
    element.hass = createHass(target, callService);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    const toggle = root.querySelector<HTMLElement>(".toggle");
    const toggleInput = toggle?.querySelector<HTMLInputElement>('input[role="switch"]');
    expect(toggle?.classList.contains("on")).toBe(true);
    expect(toggle?.style.width).toBe("74px");
    expect(toggle?.style.height).toBe("28px");
    expect(toggleInput?.checked).toBe(true);
    expect(toggleInput?.getAttribute("aria-label")).toBe("リビング");
    expect(root.querySelector(".brightness .value")?.textContent).toBe("72%");
    expect(root.querySelector(".temp .value")?.textContent).toBe("3200K");
    expect(element.getCardSize()).toBe(5);

    await act(async () => toggle?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(callService).toHaveBeenCalledWith("light", "toggle", { entity_id: target.entity_id });

    const track = mockTrack(root.querySelector<HTMLElement>(".brightness .slider-track")!);
    await act(async () => track.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 100 })));
    await act(async () => track.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 100 })));
    expect(callService).toHaveBeenCalledWith("light", "turn_on", {
      entity_id: target.entity_id,
      brightness_pct: 50,
    });
    // The old HA attribute is still 72%, but pointerup must keep the submitted value.
    expect(root.querySelector(".brightness .value")?.textContent).toBe("50%");
    expect(track.getAttribute("aria-valuenow")).toBe("50");
  });

  it("switches to the colour section and applies a favourite", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = light("on", { color_mode: "hs", hs_color: [280, 85] });
    const element = document.createElement("liquid-glass-light-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-light-card",
      entity: target.entity_id,
      favorites: ["#FF453A"],
    });
    element.hass = createHass(target, callService);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    expect(root.querySelectorAll(".segment > button")).toHaveLength(2);
    expect(root.querySelector(".hue .value")?.textContent).toBe("280°");
    expect(root.querySelector(".sat .value")?.textContent).toBe("85%");

    const hue = mockTrack(root.querySelector<HTMLElement>(".hue .slider-track")!);
    await act(async () => hue.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 100 })));
    await act(async () => hue.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 100 })));
    expect(root.querySelector(".hue .value")?.textContent).toBe("180°");

    const saturation = mockTrack(root.querySelector<HTMLElement>(".sat .slider-track")!);
    await act(async () => saturation.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 200 })));
    await act(async () => saturation.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 200 })));
    expect(root.querySelector(".sat .value")?.textContent).toBe("100%");

    await act(async () => root.querySelector<HTMLElement>(".swatch")?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(callService).toHaveBeenCalledWith("light", "turn_on", {
      entity_id: target.entity_id,
      rgb_color: [255, 69, 58],
    });

    await act(async () => root.querySelectorAll<HTMLElement>(".segment > button")[1].dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(root.querySelector(".temp")).toBeTruthy();
    expect(root.querySelector(".hue")).toBeNull();

    const temperature = mockTrack(root.querySelector<HTMLElement>(".temp .slider-track")!);
    await act(async () => temperature.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 200 })));
    await act(async () => temperature.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 200 })));
    expect(root.querySelector(".temp .value")?.textContent).toBe("6500K");
  });
});
