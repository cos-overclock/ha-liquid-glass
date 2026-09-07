// @vitest-environment jsdom

import { act } from "../react/test-act";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { LiquidGlassSensorCard, type SensorCardConfig } from "./sensor-card";

type CardElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: SensorCardConfig): void;
  getCardSize(): number;
};


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

describe("liquid-glass-sensor-card", () => {
  it("registers the custom element", () => {
    expect(customElements.get("liquid-glass-sensor-card")).toBe(LiquidGlassSensorCard);
  });

  it("draws the reading, the range and a sparkline from history", async () => {
    const target = entity("sensor.living_temp", "22.4", { friendly_name: "室温", unit_of_measurement: "°C" });
    const hass = createHass([target], async () => undefined);
    const now = Date.now();
    hass.callApi = (async () => [[
      { state: "21.0", last_changed: new Date(now - 7200_000).toISOString() },
      { state: "23.5", last_changed: new Date(now - 3600_000).toISOString() },
    ]]) as HomeAssistant["callApi"];

    const element = document.createElement("liquid-glass-sensor-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-sensor-card", entity: target.entity_id });
    element.hass = hass;

    await act(async () => document.body.append(element));
    await act(async () => { await Promise.resolve(); });

    const root = element.shadowRoot!;
    expect(root.querySelector(".number")?.textContent).toBe("22.4");
    expect(root.querySelector(".unit")?.textContent).toBe("°C");
    expect(root.querySelector(".spark .line")?.getAttribute("d")).toMatch(/^M /);
    expect(root.querySelector(".badge.trend")).toBeTruthy();
    expect(element.getCardSize()).toBe(4);
  });

  it("collapses to a single row when the value moves into the caption", async () => {
    const target = entity("sensor.people", "3", { friendly_name: "在室", unit_of_measurement: "人" });
    const element = document.createElement("liquid-glass-sensor-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-sensor-card",
      entity: target.entity_id,
      value_in_caption: true,
    });
    element.hass = createHass([target], async () => undefined);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    expect(root.querySelector(".card")?.classList.contains("row")).toBe(true);
    expect(root.querySelector(".number")).toBeNull();
    expect(root.querySelector(".spark")).toBeNull();
    expect(root.querySelector(".state")?.textContent).toContain("3 人");
    expect(element.getCardSize()).toBe(1);
  });

  it("still fetches history and shows the trend in caption mode", async () => {
    const target = entity("sensor.people", "3", { friendly_name: "在室", unit_of_measurement: "人" });
    const hass = createHass([target], async () => undefined);
    const now = Date.now();
    hass.callApi = vi.fn(async () => [[
      { state: "1", last_changed: new Date(now - 3600_000).toISOString() },
      { state: "2", last_changed: new Date(now - 1800_000).toISOString() },
    ]]) as HomeAssistant["callApi"];
    const element = document.createElement("liquid-glass-sensor-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-sensor-card",
      entity: target.entity_id,
      value_in_caption: true,
    });
    element.hass = hass;

    await act(async () => document.body.append(element));
    await act(async () => { await Promise.resolve(); });

    expect(hass.callApi).toHaveBeenCalledOnce();
    expect(element.shadowRoot!.querySelector(".spark")).toBeNull();
    expect(element.shadowRoot!.querySelector(".badge.trend")?.textContent).toContain("+2");
  });

  /*
   * The socket is the normal path on a current Home Assistant: the card must draw the
   * window the stream opens with, follow the chunks that arrive afterwards, and never
   * fall back to a REST request it no longer needs.
   */
  it("draws live history from the history/stream subscription", async () => {
    const target = entity("sensor.living_temp", "22.4", { friendly_name: "室温", unit_of_measurement: "°C" });
    const hass = createHass([target], async () => undefined);
    hass.callApi = vi.fn(async () => undefined) as HomeAssistant["callApi"];
    let push: ((message: unknown) => void) | undefined;
    const unsubscribe = vi.fn(async () => {});
    hass.connection = {
      subscribeMessage: vi.fn(async (callback: (message: never) => void) => {
        push = callback as (message: unknown) => void;
        return unsubscribe;
      }),
    };

    const element = document.createElement("liquid-glass-sensor-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-sensor-card", entity: target.entity_id });
    element.hass = hass;

    await act(async () => document.body.append(element));
    await act(async () => { await Promise.resolve(); });

    const now = Date.now();
    await act(async () => {
      push?.({ states: { "sensor.living_temp": [
        { s: "21.0", lu: (now - 7200_000) / 1000 },
        { s: "23.5", lu: (now - 3600_000) / 1000 },
      ] } });
    });

    const root = element.shadowRoot!;
    const first = root.querySelector(".spark .line")?.getAttribute("d");
    expect(first).toMatch(/^M /);
    expect(hass.callApi).not.toHaveBeenCalled();

    await act(async () => {
      push?.({ states: { "sensor.living_temp": [{ s: "25.0", lu: (now - 60_000) / 1000 }] } });
    });
    expect(root.querySelector(".spark .line")?.getAttribute("d")).not.toBe(first);

    await act(async () => element.remove());
    expect(unsubscribe).toHaveBeenCalled();
  });

  /* An older Home Assistant answers the command with an error rather than a stream. */
  it("falls back to the REST history when the stream is refused", async () => {
    const target = entity("sensor.living_temp", "22.4", { friendly_name: "室温", unit_of_measurement: "°C" });
    const hass = createHass([target], async () => undefined);
    const now = Date.now();
    hass.callApi = vi.fn(async () => [[
      { state: "21.0", last_changed: new Date(now - 7200_000).toISOString() },
      { state: "23.5", last_changed: new Date(now - 3600_000).toISOString() },
    ]]) as HomeAssistant["callApi"];
    hass.connection = {
      subscribeMessage: vi.fn(async () => { throw new Error("unknown command"); }),
    };

    const element = document.createElement("liquid-glass-sensor-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-sensor-card", entity: target.entity_id });
    element.hass = hass;

    await act(async () => document.body.append(element));
    await act(async () => { await Promise.resolve(); });
    await act(async () => { await Promise.resolve(); });

    expect(hass.callApi).toHaveBeenCalled();
    expect(element.shadowRoot!.querySelector(".spark .line")?.getAttribute("d")).toMatch(/^M /);
  });
});
