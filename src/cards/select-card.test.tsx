// @vitest-environment jsdom

import { act } from "../react/test-act";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { LiquidGlassSelectCard, type SelectCardConfig } from "./select-card";

type SelectElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: SelectCardConfig): void;
  getCardSize(): number;
};


class ResizeObserverStub implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}

globalThis.ResizeObserver = ResizeObserverStub;

function entity(domain: "select" | "input_select", state: string, options: string[]): HassEntity {
  return {
    entity_id: `${domain}.test`,
    state,
    attributes: { friendly_name: "Operation mode", options },
    last_changed: "2026-09-07T03:00:00Z",
    last_updated: "2026-09-07T03:00:00Z",
  };
}

function createHass(target: HassEntity, callService: HomeAssistant["callService"]): HomeAssistant {
  return {
    states: { [target.entity_id]: target },
    language: "en",
    locale: { language: "en" },
    themes: { darkMode: false },
    callService,
    callApi: async <T,>() => undefined as T,
  };
}

function mount(target: HassEntity, config: Partial<SelectCardConfig> = {}, callService = vi.fn<HomeAssistant["callService"]>(async () => undefined)) {
  const element = document.createElement("liquid-glass-select-card") as SelectElement;
  element.setConfig({
    type: "custom:liquid-glass-select-card",
    entity: target.entity_id,
    refraction: false,
    ...config,
  });
  element.hass = createHass(target, callService);
  return { element, callService };
}

afterEach(() => {
  document.body.replaceChildren();
  vi.useRealTimers();
});

describe("liquid-glass-select-card", () => {
  it("renders text-only segments and calls select.select_option", async () => {
    const target = entity("select", "Auto", ["Auto", "Silent", "Turbo"]);
    const { element, callService } = mount(target);

    await act(async () => document.body.append(element));

    const buttons = element.shadowRoot?.querySelectorAll<HTMLButtonElement>(".lg-glass-segmented > button");
    expect(buttons).toHaveLength(3);
    expect(buttons?.[0].getAttribute("aria-pressed")).toBe("true");
    expect(element.shadowRoot?.querySelector(".select-control lg-icon")).toBeNull();
    expect(element.getCardSize()).toBe(2);
    expect(LiquidGlassSelectCard.getStubConfig?.(element.hass)).toEqual({ entity: target.entity_id });

    await act(async () => buttons?.[2].click());

    expect(callService).toHaveBeenCalledWith("select", "select_option", {
      entity_id: target.entity_id,
      option: "Turbo",
    });
    expect(element.shadowRoot?.querySelector(".state")?.textContent).toBe("Turbo");
    expect(buttons?.[2].getAttribute("aria-pressed")).toBe("true");
  });

  it("renders wrapping chips and calls input_select.select_option", async () => {
    const target = entity("input_select", "Vacuum", ["Vacuum", "Mop", "Deep clean"]);
    const { element, callService } = mount(target, { style: "chips", accent: "#0A84FF" });

    await act(async () => document.body.append(element));

    const chips = element.shadowRoot?.querySelectorAll<HTMLElement>(".option-chip");
    const buttons = element.shadowRoot?.querySelectorAll<HTMLButtonElement>(".option-chip button");
    expect(chips).toHaveLength(3);
    expect(chips?.[0].classList.contains("selected")).toBe(true);
    expect(buttons?.[0].getAttribute("aria-pressed")).toBe("true");

    await act(async () => buttons?.[1].click());

    expect(callService).toHaveBeenCalledWith("input_select", "select_option", {
      entity_id: target.entity_id,
      option: "Mop",
    });
    expect(element.shadowRoot?.querySelector(".option-chip.selected button")?.textContent).toBe("Mop");
  });

  it("keeps the pending selection until Home Assistant confirms it", async () => {
    vi.useFakeTimers();
    const target = entity("select", "Day", ["Day", "Night"]);
    const { element, callService } = mount(target);
    await act(async () => document.body.append(element));

    const night = element.shadowRoot?.querySelectorAll<HTMLButtonElement>(".lg-glass-segmented > button")[1];
    await act(async () => night?.click());
    expect(element.shadowRoot?.querySelector(".state")?.textContent).toBe("Night");

    await act(async () => {
      element.hass = createHass(entity("select", "Day", ["Day", "Night"]), callService);
    });
    expect(element.shadowRoot?.querySelector(".state")?.textContent).toBe("Night");

    await act(async () => {
      element.hass = createHass(entity("select", "Night", ["Day", "Night"]), callService);
    });
    expect(element.shadowRoot?.querySelector(".state")?.textContent).toBe("Night");

    await act(async () => vi.runOnlyPendingTimers());
    await act(async () => {
      element.hass = createHass(entity("select", "Day", ["Day", "Night"]), callService);
    });
    expect(element.shadowRoot?.querySelector(".state")?.textContent).toBe("Day");
  });

  /*
   * The options an integration exposes are ids such as `eco_mode`. Home Assistant holds
   * the translation for each one, so the card must ask rather than print the id.
   */
  it("labels the options and the current value with Home Assistant's translations", async () => {
    const target = entity("select", "eco_mode", ["eco_mode", "turbo_mode"]);
    const { element } = mount(target);
    const words: Record<string, string> = { eco_mode: "エコ", turbo_mode: "ターボ" };
    const hass = element.hass as HomeAssistant;
    hass.formatEntityState = (stateObj, state) => words[state ?? stateObj.state] ?? "";
    hass.formatEntityName = () => "リビング 運転モード";

    await act(async () => document.body.append(element));

    const buttons = element.shadowRoot?.querySelectorAll<HTMLButtonElement>(".lg-glass-segmented > button");
    expect([...(buttons ?? [])].map((button) => button.textContent)).toEqual(["エコ", "ターボ"]);
    expect(element.shadowRoot?.querySelector(".state")?.textContent).toBe("エコ");
    expect(element.shadowRoot?.querySelector(".name")?.textContent).toBe("リビング 運転モード");
  });

  /* A composed name is only ever written by Home Assistant, never rendered as an object. */
  it("shows the friendly name when the core cannot compose one", async () => {
    const target = entity("select", "Auto", ["Auto", "Silent"]);
    const { element } = mount(target, { name: [{ type: "area" }, { type: "entity" }] });

    await act(async () => document.body.append(element));

    expect(element.shadowRoot?.querySelector(".name")?.textContent).toBe("Operation mode");
  });

  it("shows a clear empty state when the entity exposes no options", async () => {
    const target = entity("select", "unknown value", []);
    const { element } = mount(target);

    await act(async () => document.body.append(element));

    expect(element.shadowRoot?.querySelector(".state")?.textContent).toBe("No options available");
    expect(element.shadowRoot?.querySelector(".lg-glass-segmented")).toBeNull();
  });
});
