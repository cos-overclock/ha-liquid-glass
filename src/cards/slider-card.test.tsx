// @vitest-environment jsdom

import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import {
  LiquidGlassSliderCard,
  resolveSliderSpec,
  type SliderCardConfig,
} from "./slider-card";

type SliderElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: SliderCardConfig): void;
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

function entity(domain: string, state: string, attributes: HassEntity["attributes"]): HassEntity {
  return {
    entity_id: `${domain}.test`,
    state,
    attributes,
    last_changed: "2026-09-04T03:00:00Z",
    last_updated: "2026-09-04T03:00:00Z",
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

function mockTrack(element: SliderElement): HTMLElement {
  const track = element.shadowRoot?.querySelector<HTMLElement>(".slider-track");
  expect(track).toBeTruthy();
  Object.defineProperty(track, "getBoundingClientRect", {
    value: () => ({ left: 0, width: 300, right: 300, top: 0, bottom: 56, height: 56, x: 0, y: 0, toJSON: () => ({}) }),
  });
  Object.defineProperty(track, "setPointerCapture", { value: () => undefined });
  return track!;
}

afterEach(() => {
  document.body.replaceChildren();
});

describe("resolveSliderSpec", () => {
  it.each([
    [entity("input_number", "42", { min: 30, max: 60, step: 1, unit_of_measurement: "°C" }), 42, 45, ["input_number", "set_value", { value: 45 }]],
    [entity("light", "on", { brightness: 128 }), 50, 45, ["light", "turn_on", { brightness_pct: 45 }]],
    [entity("media_player", "playing", { volume_level: 0.62 }), 62, 45, ["media_player", "volume_set", { volume_level: 0.45 }]],
    [entity("cover", "open", { current_position: 65 }), 65, 45, ["cover", "set_cover_position", { position: 45 }]],
    [entity("climate", "heat", { temperature: 22, min_temp: 7, max_temp: 35, target_temp_step: 0.5 }), 22, 22.5, ["climate", "set_temperature", { temperature: 22.5 }]],
  ])("maps domain values and service payloads", (target, expectedValue, input, expectedCall) => {
    const spec = resolveSliderSpec(target as HassEntity, { type: "custom:test" });
    expect(spec.value).toBe(expectedValue);
    expect(spec.call?.(input as number)).toEqual(expectedCall);
  });

  it("supports attribute reads and a custom service key", () => {
    const target = entity("sensor", "12", { target: 37, unit_of_measurement: "ppm" });
    const spec = resolveSliderSpec(target, {
      type: "custom:test",
      attribute: "target",
      service: "demo.adjust",
      service_key: "level",
      min: 10,
      max: 50,
    });
    expect(spec.value).toBe(37);
    expect(spec.call?.(41)).toEqual(["demo", "adjust", { level: 41 }]);
  });
});

describe("liquid-glass-slider-card", () => {
  it("renders ticks and commits a dragged fan percentage", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const fan = entity("fan", "on", { friendly_name: "寝室ファン", percentage: 60, percentage_step: 20 });
    const element = document.createElement("liquid-glass-slider-card") as SliderElement;
    element.setConfig({
      type: "custom:liquid-glass-slider-card",
      entity: fan.entity_id,
      ticks: true,
    });
    element.hass = createHass(fan, callService);

    await act(async () => document.body.append(element));
    expect(element.shadowRoot?.querySelector(".num")?.textContent).toBe("60");
    expect(element.shadowRoot?.querySelectorAll(".marks span")).toHaveLength(5);
    expect(element.shadowRoot?.querySelectorAll("[data-lg-refraction-source='copy']").length).toBeGreaterThanOrEqual(2);
    expect(element.getCardSize()).toBe(2);
    expect(LiquidGlassSliderCard.getStubConfig?.(element.hass)).toEqual({ entity: fan.entity_id });

    const track = mockTrack(element);
    const slider = element.shadowRoot?.querySelector(".lg-react-slider");
    // The knob reads as an opaque pill until it moves, then the glass tint fades away.
    expect(element.shadowRoot?.querySelector(".slider-knob")).toBeTruthy();
    expect(slider?.classList.contains("active")).toBe(false);

    await act(async () => {
      track.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 223 }));
    });
    expect(slider?.classList.contains("active")).toBe(true);

    await act(async () => {
      track.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 223 }));
    });
    expect(slider?.classList.contains("active")).toBe(false);

    expect(callService).toHaveBeenCalledWith("fan", "set_percentage", {
      entity_id: fan.entity_id,
      percentage: 80,
    });
    expect(element.shadowRoot?.querySelector(".num")?.textContent).toBe("80");
  });

  it("is keyboard operable and leaves unknown domains read-only without a service", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const sensor = entity("sensor", "37", { friendly_name: "濃度", unit_of_measurement: "ppm" });
    const element = document.createElement("liquid-glass-slider-card") as SliderElement;
    element.setConfig({ type: "custom:liquid-glass-slider-card", entity: sensor.entity_id });
    element.hass = createHass(sensor, callService);

    await act(async () => document.body.append(element));
    const track = element.shadowRoot?.querySelector<HTMLElement>(".slider-track");
    expect(track?.getAttribute("aria-disabled")).toBe("true");
    expect(track?.tabIndex).toBe(-1);
    expect(callService).not.toHaveBeenCalled();

    await act(async () => {
      element.setConfig({
        type: "custom:liquid-glass-slider-card",
        entity: sensor.entity_id,
        service: "demo.adjust",
        service_key: "level",
      });
    });
    const enabledTrack = element.shadowRoot?.querySelector<HTMLElement>(".slider-track");
    await act(async () => {
      enabledTrack?.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true, key: "End" }));
    });
    expect(callService).toHaveBeenCalledWith("demo", "adjust", {
      entity_id: sensor.entity_id,
      level: 100,
    });
  });
});
