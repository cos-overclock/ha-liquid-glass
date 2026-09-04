// @vitest-environment jsdom

import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { LiquidGlassCameraCard, type CameraCardConfig } from "./camera-card";

type CardElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: CameraCardConfig): void;
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

describe("liquid-glass-camera-card", () => {
  it("registers the custom element", () => {
    expect(customElements.get("liquid-glass-camera-card")).toBe(LiquidGlassCameraCard);
  });

  it("shows the still, the motion chip and the snapshot service", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const camera = entity("camera.porch", "streaming", {
      friendly_name: "珄関",
      entity_picture: "/api/camera_proxy/camera.porch?token=abc",
    });
    const motion = entity("binary_sensor.porch_motion", "on", {});
    const element = document.createElement("liquid-glass-camera-card") as CardElement;
    element.setConfig({
      type: "custom:liquid-glass-camera-card",
      entity: camera.entity_id,
      motion_entity: motion.entity_id,
      snapshot_service: "camera.snapshot",
    });
    element.hass = createHass([camera, motion], callService);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    expect(root.querySelector<HTMLElement>(".feed")?.style.backgroundImage).toContain("/api/camera_proxy/camera.porch");
    expect(root.querySelector(".live-label")?.textContent).toBe("ライブ");
    expect(root.querySelector(".motion")?.textContent).toContain("検知");
    expect(element.getCardSize()).toBe(5);

    await act(async () => root.querySelector<HTMLElement>(".round.big")?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(callService).toHaveBeenCalledWith("camera", "snapshot", { entity_id: camera.entity_id });
  });

  it("marks an unavailable camera as offline", async () => {
    const camera = entity("camera.porch", "unavailable", { friendly_name: "珄関" });
    const element = document.createElement("liquid-glass-camera-card") as CardElement;
    element.setConfig({ type: "custom:liquid-glass-camera-card", entity: camera.entity_id });
    element.hass = createHass([camera], async () => undefined);

    await act(async () => document.body.append(element));
    const root = element.shadowRoot!;
    expect(root.querySelector(".card")?.classList.contains("offline")).toBe(true);
    expect(root.querySelector(".nosignal")).toBeTruthy();
    expect(root.querySelector<HTMLElement>(".feed")?.style.backgroundImage).toBe("");
  });
});
