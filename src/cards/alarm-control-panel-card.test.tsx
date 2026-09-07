// @vitest-environment jsdom
import { act } from "../react/test-act";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { HassEntity, HomeAssistant } from "../types";
import { AlarmFeature, LiquidGlassAlarmControlPanelCard } from "./alarm-control-panel-card";
class ResizeObserverStub implements ResizeObserver { constructor(_callback: ResizeObserverCallback) {} observe(): void {} unobserve(): void {} disconnect(): void {} }
globalThis.ResizeObserver = ResizeObserverStub;
function target(): HassEntity { return { entity_id: "alarm_control_panel.home", state: "disarmed", attributes: { friendly_name: "Home alarm", supported_features: AlarmFeature.ARM_HOME | AlarmFeature.ARM_AWAY, code_format: "number", code_arm_required: true }, last_changed: new Date().toISOString(), last_updated: "" }; }
async function mount() { const entity = target(); const callService = vi.fn(async () => undefined); const hass: HomeAssistant = { states: { [entity.entity_id]: entity }, language: "en", callService, callApi: async <T,>() => undefined as T }; const element = new LiquidGlassAlarmControlPanelCard(); element.setConfig({ type: "custom:liquid-glass-alarm-control-panel-card", entity: entity.entity_id, refraction: false }); element.hass = hass; await act(async () => document.body.append(element)); await act(async () => { await Promise.resolve(); }); return { element, callService }; }
afterEach(() => document.body.replaceChildren());
describe("LiquidGlassAlarmControlPanelCard", () => {
  it("shows only supported arm modes and requires the code", async () => { const { element } = await mount(); const buttons = [...element.shadowRoot!.querySelectorAll<HTMLButtonElement>(".mode")]; expect(buttons.map((button) => button.textContent)).toEqual(["Disarm", "Arm home", "Arm away"]); expect(buttons.every((button) => button.disabled)).toBe(true); });
  it("passes an ephemeral code to the selected service", async () => { const { element, callService } = await mount(); const input = element.shadowRoot!.querySelector<HTMLInputElement>(".code")!; await act(async () => { input.value = "1234"; input.dispatchEvent(new InputEvent("input", { bubbles: true })); }); await act(async () => [...element.shadowRoot!.querySelectorAll<HTMLButtonElement>(".mode")].find((button) => button.textContent === "Arm home")!.click()); expect(callService).toHaveBeenCalledWith("alarm_control_panel", "alarm_arm_home", { entity_id: "alarm_control_panel.home", code: "1234" }); expect(input.value).toBe(""); });
});
