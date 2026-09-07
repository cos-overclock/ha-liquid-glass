// @vitest-environment jsdom

import { act } from "../react/test-act";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { dailyFromTwiceDaily, LiquidGlassWeatherCard, type WeatherCardConfig } from "./weather-card";

type CardElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: WeatherCardConfig): void;
  getCardSize(): number;
};


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

  it("uses and folds a twice-daily forecast when that is the entity's only forecast type", async () => {
    const target = weather();
    target.attributes.supported_features = 4;
    const periods = [
      { ...forecast(0, 24, 18), datetime: "2026-09-06T00:00:00+09:00", is_daytime: true },
      { ...forecast(0, 17, 15), datetime: "2026-09-06T12:00:00+09:00", is_daytime: false },
      { ...forecast(1, 26, 19), datetime: "2026-09-07T00:00:00+09:00", is_daytime: true },
      { ...forecast(1, 18, 16), datetime: "2026-09-07T12:00:00+09:00", is_daytime: false },
    ];
    const hass = createHass(target, periods);
    const element = document.createElement("liquid-glass-weather-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-weather-card", entity: target.entity_id });
    element.hass = hass;

    await act(async () => document.body.append(element));
    await act(async () => { await Promise.resolve(); });

    expect(hass.callService).toHaveBeenCalledOnce();
    expect(hass.callService).toHaveBeenCalledWith(
      "weather",
      "get_forecasts",
      { type: "twice_daily" },
      { entity_id: target.entity_id },
      false,
      true,
    );
    expect(element.shadowRoot!.querySelectorAll(".day")).toHaveLength(2);
  });
});

describe("dailyFromTwiceDaily", () => {
  it("keeps the daily high and low from both periods", () => {
    const result = dailyFromTwiceDaily([
      { datetime: "2026-09-06T00:00:00+09:00", temperature: 24, is_daytime: true },
      { datetime: "2026-09-06T12:00:00+09:00", temperature: 15, is_daytime: false },
    ]);
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ temperature: 24, templow: 15, is_daytime: true });
  });
});
