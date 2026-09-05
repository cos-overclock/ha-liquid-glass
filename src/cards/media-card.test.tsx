// @vitest-environment jsdom

import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { LiquidGlassMediaCard, type MediaCardConfig } from "./media-card";

type CardElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: MediaCardConfig): void;
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

/** PAUSE | SEEK | VOLUME_SET | PREVIOUS | NEXT | PLAY */
const FEATURES = 1 | 2 | 4 | 16 | 32 | 16384;

function player(state: string, attributes: HassEntity["attributes"] = {}): HassEntity {
  const stamp = new Date().toISOString();
  return {
    entity_id: "media_player.living",
    state,
    attributes: {
      friendly_name: "リビング",
      supported_features: FEATURES,
      media_title: "Midnight City",
      media_artist: "M83",
      media_duration: 240,
      media_position: 60,
      volume_level: 0.4,
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
    value: () => ({ left: 0, width: 200, right: 200, top: 0, bottom: 14, height: 14, x: 0, y: 0, toJSON: () => ({}) }),
  });
  Object.defineProperty(track, "setPointerCapture", { value: () => undefined });
  return track;
}

afterEach(() => {
  document.body.replaceChildren();
});

describe("liquid-glass-media-card", () => {
  it("registers the custom element", () => {
    expect(customElements.get("liquid-glass-media-card")).toBe(LiquidGlassMediaCard);
  });

  it("shows what is playing and seeks with the shared glass slider", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = player("playing");
    const element = document.createElement("liquid-glass-media-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-media-card", entity: target.entity_id });
    element.hass = createHass(target, callService);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    expect(root.querySelector(".name")?.textContent).toBe("Midnight City");
    expect(root.querySelector(".times span")?.textContent).toBe("1:00");
    expect(root.querySelector(".progress .slider-knob.moving")).toBeTruthy();
    expect(root.querySelectorAll('.media-control-glass[data-liquid-glass="material"]')).toHaveLength(2);
    expect(element.getCardSize()).toBe(4);

    const track = mockTrack(root.querySelector<HTMLElement>(".progress .slider-track")!);
    await act(async () => track.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 100 })));
    await act(async () => track.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 100 })));

    expect(callService).toHaveBeenCalledWith("media_player", "media_seek", {
      entity_id: target.entity_id,
      seek_position: 120,
    });
    expect(root.querySelector(".times span")?.textContent).toBe("2:00");
    expect(track.getAttribute("aria-valuenow")).toBe("0.5");
  });

  it("keeps the volume slider and play button working while paused", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const target = player("paused");
    const element = document.createElement("liquid-glass-media-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-media-card", entity: target.entity_id });
    element.hass = createHass(target, callService);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    expect(root.querySelector(".source")?.textContent).toContain("一時停止中");

    await act(async () => root.querySelector<HTMLElement>(".play")?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(callService).toHaveBeenCalledWith("media_player", "media_play_pause", { entity_id: target.entity_id });

    const volume = mockTrack(root.querySelector<HTMLElement>(".volume .slider-track")!);
    await act(async () => volume.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 200 })));
    await act(async () => volume.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 200 })));
    expect(callService).toHaveBeenCalledWith("media_player", "volume_set", {
      entity_id: target.entity_id,
      volume_level: 1,
    });
    expect(volume.getAttribute("aria-valuenow")).toBe("1");
  });
});
