// @vitest-environment jsdom

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { BaseCardConfig } from "../types";
import { installCardActionHandler } from "./card-actions";

interface Fixture {
  host: HTMLElement;
  surface: HTMLDivElement;
  title: HTMLDivElement;
  button: HTMLButtonElement;
  defaultTap: ReturnType<typeof vi.fn>;
  innerTap: ReturnType<typeof vi.fn>;
  actions: Array<{ config: BaseCardConfig; action: string }>;
  cleanup: () => void;
}

function fixture(config: BaseCardConfig): Fixture {
  const host = document.createElement("div");
  const root = host.attachShadow({ mode: "open" });
  const surface = document.createElement("div");
  surface.className = "card";
  surface.tabIndex = 0;
  const title = document.createElement("div");
  title.className = "title";
  title.role = "button";
  const button = document.createElement("button");
  button.textContent = "Independent control";
  surface.append(title, button);
  root.append(surface);
  document.body.append(host);

  const defaultTap = vi.fn();
  const innerTap = vi.fn();
  surface.addEventListener("click", defaultTap);
  button.addEventListener("click", innerTap);

  const actions: Fixture["actions"] = [];
  host.addEventListener("hass-action", ((event: CustomEvent<Fixture["actions"][number]>) => {
    actions.push(event.detail);
  }) as EventListener);

  return {
    host,
    surface,
    title,
    button,
    defaultTap,
    innerTap,
    actions,
    cleanup: installCardActionHandler(root, host, () => config),
  };
}

function pointer(type: string, target: Element, x = 0, y = 0): void {
  const event = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    composed: true,
    button: 0,
    clientX: x,
    clientY: y,
  });
  Object.defineProperty(event, "pointerId", { value: 1 });
  target.dispatchEvent(event);
}

beforeEach(() => vi.useFakeTimers());

afterEach(() => {
  vi.useRealTimers();
  document.body.replaceChildren();
});

describe("card actions", () => {
  it("forwards a configured tap to Home Assistant and replaces the card default", () => {
    const config: BaseCardConfig = {
      type: "custom:test-card",
      entity: "light.desk",
      tap_action: { action: "toggle", confirmation: true },
    };
    const f = fixture(config);

    f.surface.click();

    expect(f.defaultTap).not.toHaveBeenCalled();
    expect(f.actions).toEqual([{ config, action: "tap" }]);
    f.cleanup();
  });

  it("leaves unconfigured gestures on the existing card behavior", () => {
    const f = fixture({ type: "custom:test-card" });

    f.surface.click();

    expect(f.defaultTap).toHaveBeenCalledOnce();
    expect(f.actions).toEqual([]);
    f.cleanup();
  });

  it("does not turn an independent control click into a card action", () => {
    const f = fixture({
      type: "custom:test-card",
      tap_action: { action: "navigate", navigation_path: "/dashboard/security" },
    });

    f.button.click();

    expect(f.innerTap).toHaveBeenCalledOnce();
    expect(f.actions).toEqual([]);
    f.cleanup();
  });

  it("recognizes a hold and suppresses the click generated on release", () => {
    const config: BaseCardConfig = {
      type: "custom:test-card",
      hold_action: { action: "more-info" },
    };
    const f = fixture(config);

    pointer("pointerdown", f.surface, 20, 20);
    vi.advanceTimersByTime(500);
    pointer("pointerup", f.surface, 20, 20);
    f.surface.click();

    expect(f.actions).toEqual([{ config, action: "hold" }]);
    expect(f.defaultTap).not.toHaveBeenCalled();
    f.cleanup();
  });

  it("keeps the old tap behavior when a configured hold is released early", () => {
    const f = fixture({
      type: "custom:test-card",
      hold_action: { action: "more-info" },
    });

    pointer("pointerdown", f.surface, 20, 20);
    vi.advanceTimersByTime(200);
    pointer("pointerup", f.surface, 20, 20);
    f.surface.click();

    expect(f.actions).toEqual([]);
    expect(f.defaultTap).toHaveBeenCalledOnce();
    f.cleanup();
  });

  it("cancels a hold when pointer movement becomes a scroll", () => {
    const f = fixture({
      type: "custom:test-card",
      hold_action: { action: "more-info" },
    });

    pointer("pointerdown", f.surface, 10, 10);
    pointer("pointermove", f.surface, 30, 10);
    vi.advanceTimersByTime(500);

    expect(f.actions).toEqual([]);
    f.cleanup();
  });

  it("distinguishes a double tap from its configured single tap", () => {
    const config: BaseCardConfig = {
      type: "custom:test-card",
      tap_action: { action: "more-info" },
      double_tap_action: { action: "toggle" },
    };
    const f = fixture(config);

    f.surface.click();
    f.surface.click();
    vi.advanceTimersByTime(250);

    expect(f.actions).toEqual([{ config, action: "double_tap" }]);
    expect(f.defaultTap).not.toHaveBeenCalled();
    f.cleanup();
  });

  it("replays the old single-tap default when only double tap is configured", () => {
    const f = fixture({
      type: "custom:test-card",
      double_tap_action: { action: "navigate", navigation_path: "/dashboard/home" },
    });

    f.surface.click();
    expect(f.defaultTap).not.toHaveBeenCalled();
    vi.advanceTimersByTime(250);

    expect(f.defaultTap).toHaveBeenCalledOnce();
    expect(f.actions).toEqual([]);
    f.cleanup();
  });

  it("runs tap actions from the keyboard-accessible card surface", () => {
    const config: BaseCardConfig = {
      type: "custom:test-card",
      tap_action: { action: "assist", start_listening: true },
    };
    const f = fixture(config);

    f.surface.dispatchEvent(new KeyboardEvent("keydown", {
      key: "Enter",
      bubbles: true,
      cancelable: true,
      composed: true,
    }));

    expect(f.actions).toEqual([{ config, action: "tap" }]);
    f.cleanup();
  });
});
