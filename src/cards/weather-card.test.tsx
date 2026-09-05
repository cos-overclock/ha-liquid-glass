// @vitest-environment jsdom

import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { LiquidGlassWeatherCard, type WeatherCardConfig } from "./weather-card";

type CardElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: WeatherCardConfig): void;
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

const forecast = (offsetDays: number, temperature: number, templow: number) => ({
  datetime: new Date(Date.now() + offsetDays * 86_400_000).toISOString(),
  condition: "sunny",
  temperature,
  templow,
});

function weather(state = "partlycloudy"): HassEntity {
  const stamp = new Date().toISOString();
  return {
    entity_id: "weather.tokyo",
    state,
    attributes: {
      friendly_name: "東京",
      temperature: 21,
      humidity: 54,
      wind_speed: 3.2,
      wind_speed_unit: "km/h",
    },
    last_changed: stamp,
    last_updated: stamp,
  };
}

function createHass(target: HassEntity, forecasts: unknown[]): HomeAssistant {
  return {
    states: { [target.entity_id]: target },
    language: "ja",
    locale: { language: "ja" },
    themes: { darkMode: false },
    callService: vi.fn(async () => ({
      response: { [target.entity_id]: { forecast: forecasts } },
    })),
    callApi: async <T,>() => undefined as T,
  };
}

afterEach(() => {
  document.body.replaceChildren();
});

describe("liquid-glass-weather-card", () => {
  it("registers the custom element", () => {
    expect(customElements.get("liquid-glass-weather-card")).toBe(LiquidGlassWeatherCard);
  });

  it("renders current conditions, forecast rows and metric tiles", async () => {
    const target = weather();
    const element = document.createElement("liquid-glass-weather-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-weather-card", entity: target.entity_id, daily_count: 2 });
    element.hass = createHass(target, [forecast(0, 24, 18), forecast(1, 26, 19)]);

    await act(async () => document.body.append(element));
    await act(async () => { await Promise.resolve(); });

    const root = element.shadowRoot!;
    expect(root.querySelector(".city")?.textContent).toBe("東京");
    expect(root.querySelector(".temp")?.textContent).toBe("21");
    expect(root.querySelectorAll(".day")).toHaveLength(2);
    expect(root.querySelector(".hilo .hi")?.textContent).toContain("24°");
    expect(root.querySelectorAll(".metric")).toHaveLength(2);
    expect(element.getCardSize()).toBe(7);
  });

  it("collapses to a single row on the row layout", async () => {
    const target = weather("rainy");
    const element = document.createElement("liquid-glass-weather-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-weather-card",
      entity: target.entity_id,
      layout: "row",
    });
    element.hass = createHass(target, [forecast(0, 24, 18)]);

    await act(async () => document.body.append(element));
    await act(async () => { await Promise.resolve(); });

    const root = element.shadowRoot!;
    expect(root.querySelector(".card")?.classList.contains("row")).toBe(true);
    expect(root.querySelector(".hourly")).toBeNull();
    expect(root.querySelector(".daily")).toBeNull();
    expect(root.querySelector(".state")?.textContent).toContain("雨");
    expect(element.getCardSize()).toBe(1);
  });
});
