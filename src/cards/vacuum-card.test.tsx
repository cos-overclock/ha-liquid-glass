// @vitest-environment jsdom

import { act } from "../react/test-act";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { LiquidGlassVacuumCard, VacuumFeature, type VacuumCardConfig } from "./vacuum-card";

class ResizeObserverStub implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
globalThis.ResizeObserver = ResizeObserverStub;

function vacuum(state: string, supportedFeatures: number): HassEntity {
  const stamp = new Date().toISOString();
  return {
    entity_id: "vacuum.downstairs",
    state,
    attributes: {
      friendly_name: "Downstairs",
      supported_features: supportedFeatures,
      battery_level: 82,
      cleaned_area: 43.2,
      fan_speed: "Balanced",
      fan_speed_list: ["Silent", "Balanced", "Turbo"],
    },
    last_changed: stamp,
    last_updated: stamp,
  };
}

function createHass(target: HassEntity, callService: HomeAssistant["callService"]): HomeAssistant {
  return {
    states: { [target.entity_id]: target },
    language: "en",
    themes: { darkMode: false },
    callService,
    callApi: async <T,>() => undefined as T,
  };
}

async function mount(target: HassEntity, config: Partial<VacuumCardConfig> = {}) {
  const callService = vi.fn(async () => undefined);
  const element = new LiquidGlassVacuumCard();
  element.setConfig({ type: "custom:liquid-glass-vacuum-card", entity: target.entity_id, refraction: false, ...config });
  element.hass = createHass(target, callService);
  await act(async () => document.body.append(element));
  await act(async () => { await Promise.resolve(); });
  return { element, callService };
}

afterEach(() => document.body.replaceChildren());

describe("LiquidGlassVacuumCard", () => {
  const allFeatures = Object.values(VacuumFeature).reduce((sum, feature) => sum | feature, 0);

  it("renders cleaning status, stats and supported controls", async () => {
    const { element } = await mount(vacuum("cleaning", allFeatures));
    const root = element.shadowRoot!;

    expect(root.querySelector(".title")?.textContent).toContain("Downstairs");
    expect(root.querySelector(".icon-well")?.getAttribute("role")).toBe("button");
    expect(root.querySelector(".stats")?.textContent).toContain("82%");
    expect(root.querySelector(".stats")?.textContent).toContain("43.2 m²");
    expect([...root.querySelectorAll(".control span")].map((item) => item.textContent)).toEqual([
      "Pause", "Stop", "Dock", "Locate",
    ]);
  });

  it("calls pause, dock and fan-speed services with the entity", async () => {
    const target = vacuum("cleaning", allFeatures);
    const { element, callService } = await mount(target);
    const root = element.shadowRoot!;

    await act(async () => root.querySelector<HTMLButtonElement>('button[title="Pause"]')!.click());
    await act(async () => root.querySelector<HTMLButtonElement>('button[title="Dock"]')!.click());
    await act(async () => [...root.querySelectorAll<HTMLButtonElement>(".speed")].find((button) => button.textContent === "Turbo")!.click());

    expect(callService).toHaveBeenNthCalledWith(1, "vacuum", "pause", { entity_id: target.entity_id });
    expect(callService).toHaveBeenNthCalledWith(2, "vacuum", "return_to_base", { entity_id: target.entity_id });
    expect(callService).toHaveBeenNthCalledWith(3, "vacuum", "set_fan_speed", { entity_id: target.entity_id, fan_speed: "Turbo" });
  });

  it("shows only controls advertised by supported_features", async () => {
    const { element } = await mount(vacuum("idle", VacuumFeature.START));
    const labels = [...element.shadowRoot!.querySelectorAll(".control span")].map((item) => item.textContent);

    expect(labels).toEqual(["Start"]);
    expect(element.shadowRoot!.querySelector(".fan-speed")).toBeNull();
  });

  it("offers spot cleaning only when explicitly enabled", async () => {
    const { element } = await mount(vacuum("docked", allFeatures), { show_clean_spot: true });
    const labels = [...element.shadowRoot!.querySelectorAll(".control span")].map((item) => item.textContent);

    expect(labels).toContain("Spot clean");
  });

  it("picks a vacuum for a new card", () => {
    const target = vacuum("idle", VacuumFeature.START);
    const hass = createHass(target, vi.fn(async () => undefined));
    expect(LiquidGlassVacuumCard.getStubConfig?.(hass)).toEqual({ entity: target.entity_id });
  });
});
