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
  it("defaults to a row dropdown and isolates selection from the card action", async () => {
    const target = entity("select", "Auto", ["Auto", "Silent", "Turbo"]);
    const { element, callService } = mount(target, { tap_action: { action: "more-info" } });
    const action = vi.fn();
    element.addEventListener("hass-action", action);
    await act(async () => document.body.append(element));
    const select = element.shadowRoot!.querySelector("select")!;
    expect(element.shadowRoot!.querySelector(".card.row")).not.toBeNull();
    expect(select.value).toBe("Auto");
    expect(select.getAttribute("aria-label")).toBe("Operation mode");
    expect(element.getCardSize()).toBe(1);
    await act(async () => {
      select.click();
      select.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true, composed: true }));
      select.value = "Turbo";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(action).not.toHaveBeenCalled();
    expect(callService).toHaveBeenCalledWith("select", "select_option", { entity_id: target.entity_id, option: "Turbo" });
    expect(element.shadowRoot!.querySelector(".state")?.textContent).toBe("Turbo");
  });

  it("restores the real dropdown value when a service call fails", async () => {
    const target = entity("input_select", "Auto", ["Auto", "Silent"]);
    const callService = vi.fn<HomeAssistant["callService"]>(async () => { throw new Error("offline"); });
    const { element } = mount(target, {}, callService);
    await act(async () => document.body.append(element));
    const select = element.shadowRoot!.querySelector("select")!;
    await act(async () => {
      select.value = "Silent";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(callService).toHaveBeenCalledWith("input_select", "select_option", { entity_id: target.entity_id, option: "Silent" });
    expect(select.value).toBe("Auto");
    expect(element.shadowRoot!.querySelector(".state")?.textContent).toBe("Auto");
  });

  it("supports translated dropdown options and a state outside the current options", async () => {
    const target = entity("select", "legacy", ["eco", "turbo"]);
    const { element } = mount(target);
    element.hass!.formatEntityState = (state, value) => ({ eco: "エコ", turbo: "ターボ", legacy: "旧設定" })[value ?? state.state] ?? "";
    await act(async () => document.body.append(element));
    const select = element.shadowRoot!.querySelector("select")!;
    expect(select.value).toBe("legacy");
    expect([...select.options].map((option) => option.textContent)).toEqual(["旧設定", "エコ", "ターボ"]);
    expect(select.options[0].disabled).toBe(true);
  });

  it("expires an unconfirmed dropdown choice and follows later state updates", async () => {
    vi.useFakeTimers();
    const target = entity("select", "Auto", ["Auto", "Silent"]);
    const { element, callService } = mount(target);
    await act(async () => document.body.append(element));
    const select = element.shadowRoot!.querySelector("select")!;
    await act(async () => {
      select.value = "Silent";
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(select.value).toBe("Silent");
    await act(async () => vi.advanceTimersByTime(4000));
    expect(select.value).toBe("Auto");
    await act(async () => { element.hass = createHass({ ...target, state: "Silent" }, callService); });
    expect(select.value).toBe("Silent");
    expect(element.shadowRoot!.querySelector(".state")?.textContent).toBe("Silent");
  });

  it("does not roll back a newer choice when an older request fails", async () => {
    const target = entity("select", "Auto", ["Auto", "Silent", "Turbo"]);
    let rejectFirst: ((reason: Error) => void) | undefined;
    const service = vi.fn<HomeAssistant["callService"]>()
      .mockImplementationOnce(() => new Promise((_, reject) => { rejectFirst = reject; }))
      .mockResolvedValue(undefined);
    const { element } = mount(target, {}, service);
    await act(async () => document.body.append(element));
    const select = element.shadowRoot!.querySelector("select")!;
    for (const option of ["Silent", "Turbo"]) {
      await act(async () => {
        select.value = option;
        select.dispatchEvent(new Event("change", { bubbles: true }));
      });
    }
    await act(async () => rejectFirst?.(new Error("offline")));
    expect(select.value).toBe("Turbo");
    expect(element.shadowRoot!.querySelector(".state")?.textContent).toBe("Turbo");
  });

  it("keeps the dropdown row shape when options are missing or unavailable", async () => {
    for (const target of [entity("select", "Auto", []), entity("select", "unavailable", ["Auto"])]) {
      const { element } = mount(target);
      await act(async () => document.body.append(element));
      expect(element.shadowRoot!.querySelector(".card.row")).not.toBeNull();
      expect(element.shadowRoot!.querySelector("select")).toBeNull();
    }
  });

  it("renders text-only segments and calls select.select_option", async () => {
    const target = entity("select", "Auto", ["Auto", "Silent", "Turbo"]);
    const { element, callService } = mount(target, { style: "segments" });

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
    const { element, callService } = mount(target, { style: "segments" });
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
    const { element } = mount(target, { style: "segments" });
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
    const { element } = mount(target, { style: "segments" });

    await act(async () => document.body.append(element));

    expect(element.shadowRoot?.querySelector(".state")?.textContent).toBe("No options available");
    expect(element.shadowRoot?.querySelector(".lg-glass-segmented")).toBeNull();
  });
});
