// @vitest-environment jsdom

import { act } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HomeAssistant } from "../types";
import { type LockCardConfig, LiquidGlassLockCard } from "./lock-card";

type LockElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: LockCardConfig): void;
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

function createHass(state: string, callService: HomeAssistant["callService"]): HomeAssistant {
  const timestamp = new Date("2026-09-04T03:00:00Z").toISOString();
  return {
    states: {
      "lock.front_door": {
        entity_id: "lock.front_door",
        state,
        last_changed: timestamp,
        last_updated: timestamp,
        attributes: { friendly_name: "玄関ドア" },
      },
    },
    language: "ja",
    locale: { language: "ja" },
    themes: { darkMode: false },
    callService,
    callApi: async <T,>() => undefined as T,
  };
}

function mockSlideGeometry(element: LockElement): HTMLElement {
  const slide = element.shadowRoot?.querySelector<HTMLElement>(".slide");
  const thumb = element.shadowRoot?.querySelector<HTMLElement>(".thumb");
  expect(slide).toBeTruthy();
  expect(thumb).toBeTruthy();
  Object.defineProperty(slide, "getBoundingClientRect", {
    value: () => ({ left: 0, width: 320, right: 320, top: 0, bottom: 64, height: 64, x: 0, y: 0, toJSON: () => ({}) }),
  });
  Object.defineProperty(slide, "setPointerCapture", { value: () => undefined });
  Object.defineProperty(thumb, "offsetWidth", { value: 64 });
  return slide!;
}

afterEach(() => {
  document.body.replaceChildren();
});

describe("liquid-glass-lock-card", () => {
  it("slides a locked entity to unlock and runs configured action buttons", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const element = document.createElement("liquid-glass-lock-card") as LockElement;
    element.setConfig({
      type: "custom:liquid-glass-lock-card",
      entity: "lock.front_door",
      buttons: [{
        name: "ドアを開ける",
        icon: "mdi:door-open",
        service: "lock.open",
        data: { code: "1234" },
      }],
    });
    element.hass = createHass("locked", callService);

    await act(async () => document.body.append(element));
    expect(element.shadowRoot?.querySelector(".name")?.textContent).toBe("玄関ドア");
    expect(element.shadowRoot?.querySelector(".badge")?.textContent).toContain("施錠");
    expect(element.shadowRoot?.querySelectorAll("[data-lg-refraction-source='copy']").length).toBeGreaterThanOrEqual(3);
    expect(element.getCardSize()).toBe(2);
    expect(LiquidGlassLockCard.getStubConfig?.(element.hass)).toEqual({ entity: "lock.front_door" });

    const slide = mockSlideGeometry(element);

    await act(async () => {
      slide?.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 32 }));
    });
    await act(async () => {
      slide?.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 288 }));
    });
    expect(callService).toHaveBeenCalledWith("lock", "unlock", { entity_id: "lock.front_door" });

    await act(async () => {
      element.shadowRoot?.querySelector<HTMLButtonElement>(".chip-button")?.click();
    });
    expect(callService).toHaveBeenCalledWith("lock", "open", {
      entity_id: "lock.front_door",
      code: "1234",
    });
  });

  it("slides an unlocked entity back to the lock position", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const element = document.createElement("liquid-glass-lock-card") as LockElement;
    element.setConfig({
      type: "custom:liquid-glass-lock-card",
      entity: "lock.front_door",
    });
    element.hass = createHass("unlocked", callService);

    await act(async () => document.body.append(element));
    const slide = mockSlideGeometry(element);
    await act(async () => {
      slide.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 288 }));
    });
    await act(async () => {
      slide.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 32 }));
    });

    expect(callService).toHaveBeenCalledWith("lock", "lock", { entity_id: "lock.front_door" });
  });

  it("disables operation and shows warning state when the lock is jammed", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => undefined);
    const element = document.createElement("liquid-glass-lock-card") as LockElement;
    element.setConfig({
      type: "custom:liquid-glass-lock-card",
      entity: "lock.front_door",
      refraction: false,
    });
    element.hass = createHass("jammed", callService);

    await act(async () => document.body.append(element));
    expect(element.shadowRoot?.querySelector(".slide")?.classList.contains("disabled")).toBe(true);
    expect(element.shadowRoot?.querySelector(".hint")?.textContent).toContain("操作できません");
    expect(element.hasAttribute("refraction")).toBe(false);
    expect(callService).not.toHaveBeenCalled();
  });
});
