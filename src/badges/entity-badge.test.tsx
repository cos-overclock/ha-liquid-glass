// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from "vitest";
import { act } from "../react/test-act";
import type { HassEntity, HomeAssistant } from "../types";
import { LiquidGlassEntityBadge } from "./entity-badge";

class ResizeObserverStub implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

globalThis.ResizeObserver = ResizeObserverStub;

function entity(state = "on"): HassEntity {
  return {
    entity_id: "light.desk",
    state,
    attributes: { friendly_name: "Desk", icon: "mdi:desk-lamp" },
    last_changed: "",
    last_updated: "",
  };
}

function hass(target: HassEntity): HomeAssistant {
  return {
    states: { [target.entity_id]: target },
    language: "en",
    callService: vi.fn(async () => undefined),
    callApi: async <T,>() => undefined as T,
  };
}

async function mount(target = entity()) {
  const element = new LiquidGlassEntityBadge();
  element.setConfig({ type: "custom:liquid-glass-entity-badge", entity: target.entity_id });
  element.hass = hass(target);
  await act(async () => document.body.append(element));
  await act(async () => { await Promise.resolve(); });
  return element;
}

afterEach(() => {
  document.body.replaceChildren();
});

describe("LiquidGlassEntityBadge", () => {
  it("renders the entity state in a glass pill with its icon", async () => {
    const element = await mount();
    const badge = element.shadowRoot!.querySelector(".badge")!;

    expect(badge.textContent).toBe("on");
    expect((badge.querySelector("lg-icon") as HTMLElement & { icon?: string }).icon).toBe("mdi:desk-lamp");
    expect(element.shadowRoot!.querySelector(".lg-liquid-compact")).not.toBeNull();
  });

  it("can include the entity name and hide the icon", async () => {
    const target = entity("off");
    const element = new LiquidGlassEntityBadge();
    element.setConfig({
      type: "custom:liquid-glass-entity-badge",
      entity: target.entity_id,
      show_name: true,
      show_icon: false,
    });
    element.hass = hass(target);
    await act(async () => document.body.append(element));
    await act(async () => { await Promise.resolve(); });

    expect(element.shadowRoot!.querySelector(".badge")?.textContent).toBe("Desk · off");
    expect(element.shadowRoot!.querySelector("lg-icon")).toBeNull();
  });

  it("opens Home Assistant more-info on its default tap", async () => {
    const element = await mount();
    const listener = vi.fn();
    element.addEventListener("hass-more-info", listener);

    await act(async () => element.shadowRoot!.querySelector<HTMLElement>(".card")!.click());

    expect(listener).toHaveBeenCalledOnce();
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toEqual({ entityId: "light.desk" });
  });

  it("provides a usable entity stub to the badge picker", () => {
    const target = entity();
    expect(LiquidGlassEntityBadge.getStubConfig?.(hass(target))).toEqual({ entity: target.entity_id });
  });
});
