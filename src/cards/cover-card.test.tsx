// @vitest-environment jsdom

import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { LiquidGlassCoverCard, type CoverCardConfig } from "./cover-card";

type CardElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: CoverCardConfig): void;
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

/** OPEN | CLOSE | SET_POSITION | STOP | SET_TILT */
const FEATURES = 1 | 2 | 4 | 8 | 128;

function cover(state: string, attributes: HassEntity["attributes"] = {}): HassEntity {
  const stamp = new Date().toISOString();
  return {
    entity_id: "cover.living",
    state,
    attributes: {
      friendly_name: "リビング ブラインド",
      supported_features: FEATURES,
      current_position: 65,
      current_tilt_position: 50,
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

function mockRect(element: HTMLElement, rect: Partial<DOMRect> & { width: number; height: number }): HTMLElement {
  const full = { left: 0, top: 0, right: rect.width, bottom: rect.height, x: 0, y: 0, ...rect };
  Object.defineProperty(element, "getBoundingClientRect", { value: () => ({ ...full, toJSON: () => ({}) }) });
  Object.defineProperty(element, "setPointerCapture", { value: () => undefined });
  return element;
}

afterEach(() => {
  document.body.replaceChildren();
});

describe("liquid-glass-cover-card", () => {
  it("registers the custom element", () => {
    expect(customElements.get("liquid-glass-cover-card")).toBe(LiquidGlassCoverCard);
  });

  it("drags the blind to a position and runs the buttons", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = cover("open");
    const element = document.createElement("liquid-glass-cover-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-cover-card", entity: target.entity_id });
    element.hass = createHass(target, callService);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    expect(root.querySelector(".pv")?.textContent).toBe("65%");
    expect(element.getCardSize()).toBe(4);

    const track = mockRect(root.querySelector<HTMLElement>(".track")!, { width: 200, height: 100 });
    await act(async () => track.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 100, clientY: 25 })));
    expect(root.querySelector(".pv")?.textContent).toBe("75%");
    await act(async () => track.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 100, clientY: 25 })));
    expect(callService).toHaveBeenCalledWith("cover", "set_cover_position", {
      entity_id: target.entity_id,
      position: 75,
    });
    expect(root.querySelector(".pv")?.textContent).toBe("75%");

    await act(async () => root.querySelectorAll<HTMLElement>(".round-btn")[1].dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(callService).toHaveBeenCalledWith("cover", "stop_cover", { entity_id: target.entity_id });
  });

  it("sets the tilt from the two-way slider", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = cover("open");
    const element = document.createElement("liquid-glass-cover-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-cover-card", entity: target.entity_id });
    element.hass = createHass(target, callService);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    expect(root.querySelector(".label-row .value")?.textContent).toBe("0°");
    expect(root.querySelector(".slider-anchor")).toBeTruthy();

    const slider = mockRect(root.querySelector<HTMLElement>(".tilt .slider-track")!, { width: 200, height: 26 });
    await act(async () => slider.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 200 })));
    await act(async () => slider.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 200 })));
    expect(callService).toHaveBeenCalledWith("cover", "set_cover_tilt_position", {
      entity_id: target.entity_id,
      tilt_position: 100,
    });
    expect(root.querySelector(".label-row .value")?.textContent).toBe("90°");
    expect(slider.getAttribute("aria-valuenow")).toBe("100");
  });

  it("changes position from the keyboard", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = cover("open");
    const element = document.createElement("liquid-glass-cover-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-cover-card", entity: target.entity_id });
    element.hass = createHass(target, callService);

    await act(async () => document.body.append(element));
    const track = element.shadowRoot!.querySelector<HTMLElement>(".track")!;
    expect(track.getAttribute("role")).toBe("slider");
    expect(track.getAttribute("aria-valuenow")).toBe("65");
    await act(async () => track.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "ArrowUp" })));

    expect(callService).toHaveBeenCalledWith("cover", "set_cover_position", {
      entity_id: target.entity_id,
      position: 70,
    });
  });

  it("disables unsupported actions and uses position for supported boundaries", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = cover("open", { supported_features: 4 });
    const element = document.createElement("liquid-glass-cover-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-cover-card", entity: target.entity_id });
    element.hass = createHass(target, callService);

    await act(async () => document.body.append(element));
    const buttons = element.shadowRoot!.querySelectorAll<HTMLButtonElement>(".round-btn");
    expect(buttons[0].disabled).toBe(false);
    expect(buttons[1].disabled).toBe(true);
    expect(buttons[2].disabled).toBe(false);
    await act(async () => buttons[0].click());
    expect(callService).toHaveBeenCalledWith("cover", "set_cover_position", {
      entity_id: target.entity_id,
      position: 100,
    });
  });
});
