// @vitest-environment jsdom

import { shadowCss } from "../react/test-styles";
import { act } from "../react/test-act";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HomeAssistant } from "../types";
import { type LockCardConfig, LiquidGlassLockCard } from "./lock-card";

type LockElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: LockCardConfig): void;
  getCardSize(): number;
};


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
  const wrapper = element.shadowRoot?.querySelector<HTMLElement>(".lg-react-slider");
  const track = element.shadowRoot?.querySelector<HTMLElement>(".slider-track");
  const probe = element.shadowRoot?.querySelector<HTMLElement>(".knob-probe");
  expect(wrapper).toBeTruthy();
  expect(track).toBeTruthy();
  expect(probe).toBeTruthy();
  Object.defineProperty(wrapper, "getBoundingClientRect", {
    value: () => ({ left: 0, width: 320, right: 320, top: 0, bottom: 44, height: 44, x: 0, y: 0, toJSON: () => ({}) }),
  });
  Object.defineProperty(track, "getBoundingClientRect", {
    value: () => ({ left: 0, width: 320, right: 320, top: 0, bottom: 44, height: 44, x: 0, y: 0, toJSON: () => ({}) }),
  });
  Object.defineProperty(track, "setPointerCapture", { value: () => undefined });
  Object.defineProperty(probe, "getBoundingClientRect", {
    value: () => ({ left: 0, width: 48, right: 48, top: 0, bottom: 34, height: 34, x: 0, y: 0, toJSON: () => ({}) }),
  });
  Object.defineProperty(probe, "offsetWidth", { value: 48 });
  Object.defineProperty(probe, "offsetHeight", { value: 34 });
  return track!;
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
    const card = element.shadowRoot?.querySelector<HTMLElement>(".card[data-liquid-glass='']");
    const contentLayer = card?.firstElementChild;
    expect(contentLayer?.querySelector(".header")).toBeTruthy();
    expect(contentLayer?.querySelector(".lock-control .lg-react-slider")).toBeTruthy();
    expect(contentLayer?.querySelector(".slider-knob lg-icon")).toBeNull();
    expect(contentLayer?.querySelector(".slider-track lg-icon")).toBeNull();
    expect(contentLayer?.querySelector(".slider-fill")).toBeNull();
    expect(contentLayer?.querySelector(".slider-track")?.getAttribute("aria-valuetext")).toBe("施錠");
    const css = shadowCss(element.shadowRoot);
    expect(css).not.toContain("--lg-knob-solid: color-mix");
    expect(css).not.toContain("--lg-slider-track:");
    expect(css).toContain('.lg-liquid-card[data-liquid-glass=""] > :first-child');
    expect(css).not.toContain(".card > *");
    expect(element.getCardSize()).toBe(2);
    expect(LiquidGlassLockCard.getStubConfig?.(element.hass)).toEqual({ entity: "lock.front_door" });

    const slide = mockSlideGeometry(element);

    await act(async () => {
      slide.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 24 }));
      slide.dispatchEvent(new MouseEvent("pointermove", { bubbles: true, button: 0, clientX: 180 }));
      slide.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 180 }));
    });
    expect(callService).not.toHaveBeenCalled();

    await act(async () => {
      slide.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 24 }));
      slide.dispatchEvent(new MouseEvent("pointermove", { bubbles: true, button: 0, clientX: 296 }));
      slide.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 296 }));
    });
    expect(callService).toHaveBeenCalledWith("lock", "unlock", { entity_id: "lock.front_door" });
    expect(slide.getAttribute("aria-valuenow")).toBe("1");

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
      slide.dispatchEvent(new MouseEvent("pointerdown", { bubbles: true, button: 0, clientX: 296 }));
      slide.dispatchEvent(new MouseEvent("pointermove", { bubbles: true, button: 0, clientX: 24 }));
    });
    await act(async () => {
      slide.dispatchEvent(new MouseEvent("pointerup", { bubbles: true, button: 0, clientX: 24 }));
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
    expect(element.shadowRoot?.querySelector(".lg-react-slider")?.classList.contains("disabled")).toBe(true);
    expect(element.shadowRoot?.querySelector(".lock-instruction")?.textContent).toContain("操作できません");
    expect(element.hasAttribute("refraction")).toBe(false);
    expect(element.shadowRoot?.querySelectorAll("[data-lg-static-glass]").length).toBeGreaterThanOrEqual(1);
    expect(element.shadowRoot?.querySelector("[data-liquid-glass]")).toBeNull();
    expect(callService).not.toHaveBeenCalled();
  });
});
