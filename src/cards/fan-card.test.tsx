// @vitest-environment jsdom

import { act } from "../react/test-act";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { FanFeature, LiquidGlassFanCard, type FanCardConfig } from "./fan-card";

class ResizeObserverStub implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
globalThis.ResizeObserver = ResizeObserverStub;

function fan(state = "on", features = 63): HassEntity {
  const stamp = new Date().toISOString();
  return {
    entity_id: "fan.bedroom",
    state,
    attributes: {
      friendly_name: "Bedroom fan",
      supported_features: features,
      percentage: state === "on" ? 60 : 0,
      percentage_step: 20,
      preset_mode: "Auto",
      preset_modes: ["Auto", "Sleep"],
      oscillating: true,
      direction: "forward",
    },
    last_changed: stamp,
    last_updated: stamp,
  };
}

function createHass(target: HassEntity, callService: HomeAssistant["callService"]): HomeAssistant {
  return {
    states: { [target.entity_id]: target },
    language: "en",
    callService,
    callApi: async <T,>() => undefined as T,
  };
}

async function mount(target: HassEntity, config: Partial<FanCardConfig> = {}) {
  const callService = vi.fn(async () => undefined);
  const element = new LiquidGlassFanCard();
  element.setConfig({ type: "custom:liquid-glass-fan-card", entity: target.entity_id, refraction: false, ...config });
  element.hass = createHass(target, callService);
  await act(async () => document.body.append(element));
  await act(async () => { await Promise.resolve(); });
  return { element, callService };
}

afterEach(() => document.body.replaceChildren());

describe("LiquidGlassFanCard", () => {
  it("renders speed, presets, oscillation and direction when supported", async () => {
    const { element } = await mount(fan());
    const root = element.shadowRoot!;

    expect(root.querySelector(".speed-value")?.textContent).toBe("60%");
    expect([...root.querySelectorAll(".preset")].map((item) => item.textContent)).toEqual(["Auto", "Sleep"]);
    expect(root.querySelectorAll(".extra")).toHaveLength(2);
  });

  it("calls preset, oscillation and direction services", async () => {
    const target = fan();
    const { element, callService } = await mount(target);
    const root = element.shadowRoot!;

    await act(async () => [...root.querySelectorAll<HTMLButtonElement>(".preset")].find((button) => button.textContent === "Sleep")!.click());
    await act(async () => root.querySelector<HTMLButtonElement>('.extra[aria-pressed="true"]')!.click());
    await act(async () => root.querySelector<HTMLButtonElement>('.extra[aria-label="Direction"]')!.click());

    expect(callService).toHaveBeenNthCalledWith(1, "fan", "set_preset_mode", { entity_id: target.entity_id, preset_mode: "Sleep" });
    expect(callService).toHaveBeenNthCalledWith(2, "fan", "oscillate", { entity_id: target.entity_id, oscillating: false });
    expect(callService).toHaveBeenNthCalledWith(3, "fan", "set_direction", { entity_id: target.entity_id, direction: "reverse" });
  });

  it("hides capabilities the fan does not advertise", async () => {
    const { element } = await mount(fan("on", FanFeature.TURN_OFF));
    const root = element.shadowRoot!;

    expect(root.querySelector(".speed-control")).toBeNull();
    expect(root.querySelector(".presets")).toBeNull();
    expect(root.querySelector(".extras")).toBeNull();
  });

  it("does not offer presets to fans without preset-mode support", async () => {
    const { element } = await mount(fan("on", FanFeature.SET_SPEED | FanFeature.TURN_OFF));
    const root = element.shadowRoot!;

    expect(root.querySelector(".speed-control")).not.toBeNull();
    expect(root.querySelector(".presets")).toBeNull();
  });

  it("turns an on fan off through the glass switch", async () => {
    const target = fan("on", FanFeature.TURN_OFF);
    const { element, callService } = await mount(target);
    const input = element.shadowRoot!.querySelector<HTMLInputElement>('.power input[type="checkbox"]')!;

    await act(async () => input.click());

    expect(callService).toHaveBeenCalledWith("fan", "turn_off", { entity_id: target.entity_id });
  });

  it("picks a fan for a new card", () => {
    const target = fan();
    expect(LiquidGlassFanCard.getStubConfig?.(createHass(target, vi.fn(async () => undefined))))
      .toEqual({ entity: target.entity_id });
  });
});
