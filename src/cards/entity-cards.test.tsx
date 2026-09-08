// @vitest-environment jsdom
import { act } from "../react/test-act";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { BaseCardConfig, HassEntity, HomeAssistant } from "../types";
import type { ReactCardConstructor } from "../react/define-react-card";
import { LiquidGlassHumidifierCard } from "./humidifier-card";
import { LiquidGlassPersonCard } from "./person-card";
import { LiquidGlassTodoCard } from "./todo-card";
import { LiquidGlassUpdateCard } from "./update-card";
import { durationSeconds, formatTimer, LiquidGlassTimerCard, timerRemaining } from "./timer-card";

class ResizeObserverStub implements ResizeObserver {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
globalThis.ResizeObserver = ResizeObserverStub;

function entity(domain: string, state: string, attributes: HassEntity["attributes"] = {}): HassEntity {
  return { entity_id: `${domain}.test`, state, attributes: { friendly_name: "Test entity", ...attributes }, last_changed: new Date().toISOString(), last_updated: new Date().toISOString() };
}
async function mount(
  Card: ReactCardConstructor<BaseCardConfig>, target: HassEntity,
  config: Record<string, unknown> = {}, callService = vi.fn<HomeAssistant["callService"]>(async () => undefined),
) {
  const element = new Card();
  element.setConfig({ type: `custom:${element.localName}`, entity: target.entity_id, refraction: false, ...config });
  const hass: HomeAssistant = { states: { [target.entity_id]: target }, language: "en", callService, callApi: async <T,>() => undefined as T };
  element.hass = hass;
  await act(async () => document.body.append(element));
  await act(async () => { await Promise.resolve(); });
  return { element, root: element.shadowRoot!, hass, callService };
}
async function click(root: ShadowRoot, label: string) {
  const button = [...root.querySelectorAll<HTMLButtonElement>("button")].find((item) => item.textContent === label || item.getAttribute("aria-label") === label);
  expect(button, `Missing button: ${label}`).toBeDefined();
  await act(async () => button!.click());
}

afterEach(async () => {
  await act(async () => document.body.replaceChildren());
  vi.useRealTimers();
});

describe("humidifier", () => {
  it("shows humidity bounds, mode and independent current reading", async () => {
    const { root, callService } = await mount(LiquidGlassHumidifierCard, entity("humidifier", "on", {
      humidity: 55, current_humidity: 43, min_humidity: 30, max_humidity: 70, target_humidity_step: 5,
      available_modes: ["Auto", "Sleep"], mode: "Auto", supported_features: 1,
    }));
    expect(root.textContent).toContain("Current humidity: 43%");
    const slider = root.querySelector<HTMLElement>('[role="slider"]')!;
    expect(slider.getAttribute("aria-valuemin")).toBe("30");
    expect(slider.getAttribute("aria-valuemax")).toBe("70");
    await act(async () => slider.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })));
    expect(callService).toHaveBeenCalledWith("humidifier", "set_humidity", { entity_id: "humidifier.test", humidity: 60 });
    await click(root, "Sleep");
    expect(callService).toHaveBeenCalledWith("humidifier", "set_mode", { entity_id: "humidifier.test", mode: "Sleep" });
    await act(async () => root.querySelector<HTMLInputElement>('input[type="checkbox"]')!.click());
    expect(callService).toHaveBeenCalledWith("humidifier", "turn_off", { entity_id: "humidifier.test" });
  });
  it("hides unsupported modes and does not turn null humidity into zero", async () => {
    const { root } = await mount(LiquidGlassHumidifierCard, entity("humidifier", "off", { humidity: null, current_humidity: null, available_modes: ["Auto"] }));
    expect(root.querySelector('[role="slider"]')).toBeNull();
    expect(root.querySelector('[role="group"]')).toBeNull();
    expect(root.textContent).not.toContain("0%");
  });
  it("rolls back rejected humidity changes", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>().mockRejectedValue(new Error("offline"));
    const { root } = await mount(LiquidGlassHumidifierCard, entity("humidifier", "on", { humidity: 50 }), {}, callService);
    await act(async () => root.querySelector('[role="slider"]')!.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })));
    await act(async () => { await Promise.resolve(); });
    expect(root.querySelector('[role="slider"]')?.getAttribute("aria-valuenow")).toBe("50");
    expect(root.querySelector('[role="alert"]')?.textContent).toContain("Action failed");
  });
  it("does not carry a pending humidity value to another device", async () => {
    const { element, root, hass } = await mount(LiquidGlassHumidifierCard, entity("humidifier", "on", { humidity: 50 }));
    await act(async () => root.querySelector('[role="slider"]')!.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true })));
    const next = { ...entity("humidifier", "on", { humidity: 70 }), entity_id: "humidifier.other" };
    await act(async () => {
      element.setConfig({ type: "custom:liquid-glass-humidifier-card", entity: next.entity_id, refraction: false });
      element.hass = { ...hass, states: { [next.entity_id]: next } };
    });
    expect(root.querySelector('[role="slider"]')?.getAttribute("aria-valuenow")).toBe("70");
  });
  it("turns on a dehumidifier and honors display options", async () => {
    const { root, callService } = await mount(LiquidGlassHumidifierCard, entity("humidifier", "off", { device_class: "dehumidifier", humidity: 50, current_humidity: 70, supported_features: 1, available_modes: ["Auto"] }), { show_current_humidity: false, show_modes: false });
    expect(root.querySelector("lg-icon")?.icon).toBe("mdi:air-humidifier-off");
    expect(root.textContent).not.toContain("Current humidity");
    expect(root.querySelector('[role="group"]')).toBeNull();
    await act(async () => root.querySelector<HTMLInputElement>('input[type="checkbox"]')!.click());
    expect(callService).toHaveBeenCalledWith("humidifier", "turn_on", { entity_id: "humidifier.test" });
  });
});

describe("person and device tracker", () => {
  it.each([["person", "home", "Home"], ["device_tracker", "not_home", "Away"], ["person", "Office", "Office"]])("renders %s in %s", async (domain, state, label) => {
    const { root, element, callService } = await mount(LiquidGlassPersonCard, entity(domain, state, { entity_picture: "/api/image/test" }));
    expect(root.querySelector(".state")?.textContent).toContain(label);
    expect(root.querySelector("img")?.getAttribute("src")).toBe("/api/image/test");
    const info = vi.fn();
    element.addEventListener("hass-more-info", info);
    await act(async () => root.querySelector<HTMLElement>(".title")!.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true })));
    expect(info).toHaveBeenCalled();
    expect(callService).not.toHaveBeenCalled();
  });
  it("uses HA localization and respects picture and timestamp options", async () => {
    const target = entity("person", "home", { entity_picture: "/portrait.png" });
    const { root, element, hass } = await mount(LiquidGlassPersonCard, target, { show_entity_picture: false, show_last_changed: false });
    await act(async () => { element.hass = { ...hass, formatEntityState: () => "在宅（HA）", formatEntityName: () => "家族" }; });
    expect(root.querySelector(".state")?.textContent).toBe("在宅（HA）");
    expect(root.querySelector(".name")?.textContent).toBe("家族");
    expect(root.querySelector("img")).toBeNull();
  });
});

const todoItems = [
  { uid: "first", summary: "Milk", status: "needs_action" },
  { uid: "second", summary: "Milk", status: "completed" },
];
const todoResponse = (id = "todo.test", items = todoItems) => ({ response: { [id]: { items } } });

describe("shopping list", () => {
  it("fetches real items and completes, reopens and deletes by UID", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => todoResponse());
    const { root } = await mount(LiquidGlassTodoCard, entity("todo", "1", { supported_features: 7 }), {}, callService);
    expect(callService).toHaveBeenCalledWith("todo", "get_items", {}, { entity_id: "todo.test" }, false, true);
    const inputs = root.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    expect(inputs).toHaveLength(2);
    await act(async () => inputs[0].click());
    expect(callService).toHaveBeenCalledWith("todo", "update_item", { entity_id: "todo.test", item: "first", status: "completed" });
    await act(async () => inputs[1].click());
    expect(callService).toHaveBeenCalledWith("todo", "update_item", { entity_id: "todo.test", item: "second", status: "needs_action" });
    await act(async () => root.querySelectorAll<HTMLButtonElement>(".todo-item button")[1].click());
    expect(callService).toHaveBeenCalledWith("todo", "remove_item", { entity_id: "todo.test", item: "second" });
    expect(callService.mock.calls.filter((call) => call[1] === "get_items").length).toBeGreaterThan(1);
  });
  it("adds trimmed text and clears it only on success", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => todoResponse());
    const { root } = await mount(LiquidGlassTodoCard, entity("todo", "1", { supported_features: 1 }), {}, callService);
    const input = root.querySelector<HTMLInputElement>(".todo-add input")!;
    await act(async () => { input.value = "  Bread  "; input.dispatchEvent(new Event("input", { bubbles: true })); });
    await act(async () => root.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
    expect(callService).toHaveBeenCalledWith("todo", "add_item", { entity_id: "todo.test", item: "Bread" });
    await act(async () => { await Promise.resolve(); });
    expect(input.value).toBe("");
    expect(root.querySelector<HTMLButtonElement>('button[type="submit"]')!.disabled).toBe(true);
  });
  it("supports read-only lists and filtering completed items", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>(async () => todoResponse());
    const { root } = await mount(LiquidGlassTodoCard, entity("todo", "1"), { show_completed: false }, callService);
    expect(root.querySelectorAll(".todo-item")).toHaveLength(1);
    expect(root.querySelector<HTMLInputElement>('input[type="checkbox"]')!.disabled).toBe(true);
    expect(root.querySelector("form, .todo-item button")).toBeNull();
  });
  it("shows fetch errors and retries instead of claiming the list is empty", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>().mockRejectedValueOnce(new Error("offline")).mockResolvedValue(todoResponse());
    const { root } = await mount(LiquidGlassTodoCard, entity("todo", "1"), {}, callService);
    expect(root.querySelector('[role="alert"]')?.textContent).toContain("Could not load");
    expect(root.textContent).not.toContain("No items");
    await click(root, "Retry");
    expect(root.querySelectorAll(".todo-item")).toHaveLength(2);
  });
  it("rejects late responses from the previously selected list", async () => {
    let resolveOld!: (value: { response: unknown }) => void;
    const old = new Promise<{ response: unknown }>((resolve) => { resolveOld = resolve; });
    const callService = vi.fn<HomeAssistant["callService"]>().mockReturnValueOnce(old).mockResolvedValue(todoResponse("todo.new", [{ uid: "new", summary: "Eggs", status: "needs_action" }]));
    const { root, element, hass } = await mount(LiquidGlassTodoCard, entity("todo", "1"), {}, callService);
    const next = { ...entity("todo", "1"), entity_id: "todo.new" };
    await act(async () => { element.setConfig({ type: "custom:liquid-glass-todo-card", entity: next.entity_id, refraction: false }); element.hass = { ...hass, states: { [next.entity_id]: next } }; });
    await act(async () => resolveOld(todoResponse()));
    expect(root.textContent).toContain("Eggs");
    expect(root.textContent).not.toContain("Milk");
  });
  it("refreshes when last_updated changes even if the item count is unchanged", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>().mockResolvedValueOnce(todoResponse()).mockResolvedValue(todoResponse("todo.test", [{ uid: "first", summary: "Oat milk", status: "needs_action" }]));
    const target = entity("todo", "1");
    const { root, element, hass } = await mount(LiquidGlassTodoCard, target, {}, callService);
    await act(async () => { element.hass = { ...hass, states: { [target.entity_id]: { ...target, last_updated: "2026-09-08T12:00:00Z" } } }; });
    await act(async () => { await Promise.resolve(); });
    expect(root.textContent).toContain("Oat milk");
  });
  it("keeps a failed add available for retry and prevents duplicate submissions", async () => {
    let reject!: (reason: Error) => void;
    const pending = new Promise<undefined>((_, fail) => { reject = fail; });
    const callService = vi.fn<HomeAssistant["callService"]>().mockResolvedValueOnce(todoResponse()).mockReturnValueOnce(pending);
    const { root } = await mount(LiquidGlassTodoCard, entity("todo", "1", { supported_features: 1 }), {}, callService);
    const input = root.querySelector<HTMLInputElement>(".todo-add input")!;
    await act(async () => { input.value = "Bread"; input.dispatchEvent(new Event("input", { bubbles: true })); });
    await act(async () => {
      root.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
      root.querySelector("form")!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });
    expect(callService.mock.calls.filter((call) => call[1] === "add_item")).toHaveLength(1);
    await act(async () => reject(new Error("offline")));
    expect(input.value).toBe("Bread");
    expect(root.querySelector('[role="alert"]')?.textContent).toContain("Action failed");
  });
});

describe("update", () => {
  it("installs and skips an available version", async () => {
    const { root, callService } = await mount(LiquidGlassUpdateCard, entity("update", "on", { supported_features: 1, installed_version: "1.0", latest_version: "1.1" }));
    expect(root.textContent).toContain("Installed: 1.0");
    expect(root.textContent).toContain("Latest: 1.1");
    await click(root, "Install");
    await click(root, "Skip");
    expect(callService).toHaveBeenCalledWith("update", "install", { entity_id: "update.test" });
    expect(callService).toHaveBeenCalledWith("update", "skip", { entity_id: "update.test" });
  });
  it.each([true, 0, 42])("disables writes while installing (%s)", async (in_progress) => {
    const { root, callService } = await mount(LiquidGlassUpdateCard, entity("update", "on", { supported_features: 1, in_progress }));
    expect(root.querySelector("progress")).not.toBeNull();
    expect(root.querySelectorAll("button:disabled")).toHaveLength(2);
    await click(root, "Install");
    expect(callService).not.toHaveBeenCalled();
    if (typeof in_progress === "number") expect(root.querySelector("progress")?.value).toBe(in_progress);
    else expect(root.querySelector("progress")?.hasAttribute("value")).toBe(false);
  });
  it("renders modern update_percentage and clamps progress", async () => {
    const { root } = await mount(LiquidGlassUpdateCard, entity("update", "on", { in_progress: true, update_percentage: 150 }));
    expect(root.querySelector("progress")?.value).toBe(100);
  });
  it("does not install unsupported or current versions and restores skipped versions", async () => {
    const { root, callService } = await mount(LiquidGlassUpdateCard, entity("update", "off", { skipped_version: "1.1" }));
    expect([...root.querySelectorAll("button")].some((button) => button.textContent === "Install")).toBe(false);
    await click(root, "Show skipped update");
    expect(callService).toHaveBeenCalledWith("update", "clear_skipped", { entity_id: "update.test" });
  });
  it("renders release text safely and opens HA details", async () => {
    const { root, element } = await mount(LiquidGlassUpdateCard, entity("update", "on", { supported_features: 16, release_summary: "<img src=x onerror=alert(1)>" }));
    expect(root.querySelector("img")).toBeNull();
    const info = vi.fn(); element.addEventListener("hass-more-info", info);
    await click(root, "Release notes");
    expect(info).toHaveBeenCalled();
  });
  it("surfaces failed operations", async () => {
    const callService = vi.fn<HomeAssistant["callService"]>().mockRejectedValue(new Error("offline"));
    const { root } = await mount(LiquidGlassUpdateCard, entity("update", "on", { supported_features: 1 }), {}, callService);
    await click(root, "Install");
    expect(root.querySelector('[role="alert"]')?.textContent).toContain("Action failed");
    expect(root.querySelector("button:disabled")).toBeNull();
  });
});

describe("timer", () => {
  it("calculates active time from the absolute finish and clamps expired timers", () => {
    const target = entity("timer", "active", { finishes_at: "2026-09-08T01:02:03Z", remaining: "0:10:00" });
    expect(timerRemaining(target, Date.parse("2026-09-08T01:00:00Z"))).toBe(123);
    expect(timerRemaining(target, Date.parse("2026-09-08T02:00:00Z"))).toBe(0);
    expect(formatTimer(3661)).toBe("1:01:01");
    expect(durationSeconds("25:02:03")).toBe(90123);
    expect(durationSeconds("0:99:00")).toBeUndefined();
    expect(formatTimer(durationSeconds("invalid"))).toBe("—");
  });
  it.each([["idle", "Start", "start"], ["active", "Pause", "pause"], ["paused", "Resume", "start"]])("offers %s controls", async (state, label, action) => {
    const { root, callService } = await mount(LiquidGlassTimerCard, entity("timer", state, { duration: "0:05:00", remaining: "0:02:00", finishes_at: new Date(Date.now() + 120000).toISOString() }), { show_finish: true });
    await click(root, label);
    expect(callService).toHaveBeenCalledWith("timer", action, { entity_id: "timer.test" });
    if (state !== "idle") {
      await click(root, "Cancel");
      expect(callService).toHaveBeenCalledWith("timer", "cancel", { entity_id: "timer.test" });
    }
    if (state === "active") {
      await click(root, "Finish");
      expect(callService).toHaveBeenCalledWith("timer", "finish", { entity_id: "timer.test" });
    }
    if (state === "paused") expect(root.querySelector('[role="timer"]')?.textContent).toBe("2:00");
  });
  it("ticks while active and releases intervals on disconnect", async () => {
    vi.useFakeTimers({ toFake: ["Date", "setInterval", "clearInterval"] });
    const { root, element } = await mount(LiquidGlassTimerCard, entity("timer", "active", { duration: "0:01:00", finishes_at: new Date(Date.now() + 60000).toISOString() }));
    expect(root.querySelector('[role="timer"]')?.textContent).toBe("1:00");
    await act(async () => vi.advanceTimersByTime(2000));
    expect(root.querySelector('[role="timer"]')?.textContent).toBe("0:58");
    await act(async () => element.remove());
    expect(vi.getTimerCount()).toBe(0);
  });
  it("stops its clock while hidden and catches up immediately on return", async () => {
    vi.useFakeTimers({ toFake: ["Date", "setInterval", "clearInterval"] });
    const visibility = vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
    try {
      const { root } = await mount(LiquidGlassTimerCard, entity("timer", "active", { finishes_at: new Date(Date.now() + 60000).toISOString() }));
      visibility.mockReturnValue("hidden");
      await act(async () => document.dispatchEvent(new Event("visibilitychange")));
      expect(vi.getTimerCount()).toBe(0);
      await act(async () => vi.advanceTimersByTime(10000));
      expect(root.querySelector('[role="timer"]')?.textContent).toBe("1:00");
      visibility.mockReturnValue("visible");
      await act(async () => document.dispatchEvent(new Event("visibilitychange")));
      expect(root.querySelector('[role="timer"]')?.textContent).toBe("0:50");
    } finally {
      visibility.mockRestore();
    }
  });
});

describe("shared entity card behavior", () => {
  it.each([
    ["humidifier", LiquidGlassHumidifierCard], ["person", LiquidGlassPersonCard],
    ["todo", LiquidGlassTodoCard], ["update", LiquidGlassUpdateCard], ["timer", LiquidGlassTimerCard],
  ] as const)("handles unavailable %s without service controls and provides a stub", async (domain, Card) => {
    const target = entity(domain, "unavailable");
    const { root, callService, hass, element } = await mount(Card, target);
    expect(root.textContent).toContain("Unavailable");
    expect(root.querySelector("button, input, [role=slider]")).toBeNull();
    expect(callService).not.toHaveBeenCalled();
    expect(Card.getStubConfig?.({ ...hass, states: { [target.entity_id]: { ...target, state: "on" } } })).toEqual({ entity: target.entity_id });
    expect(element.getGridOptions?.().columns).toBeGreaterThan(0);
    await act(async () => { element.hass = { ...hass, states: {} }; });
    expect(root.textContent).toContain("Unavailable");
  });
});
