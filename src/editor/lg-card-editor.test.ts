// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import type { HomeAssistant } from "../types";
import { LiquidGlassCardEditor } from "./lg-card-editor";

interface TestForm extends HTMLElement {
  hass?: HomeAssistant;
  data?: Record<string, unknown>;
  schema?: unknown[];
  computeLabel?: (schema: { name: string }) => string;
}

const hass: HomeAssistant = {
  states: {},
  language: "en",
  callService: async () => undefined,
  callApi: async <T,>() => undefined as T,
};

describe("liquid-glass-card-editor", () => {
  it("feeds defaults to ha-form and emits a compact config", () => {
    const editor = new LiquidGlassCardEditor();
    const form = editor.shadowRoot?.querySelector("ha-form") as TestForm;
    expect(form.hidden).toBe(true);

    editor.hass = hass;
    editor.setConfig({ type: "custom:liquid-glass-light-card", entity: "light.desk" });

    expect(form.hidden).toBe(false);
    expect(form.hass).toBe(hass);
    expect(form.data).toMatchObject({
      type: "custom:liquid-glass-light-card",
      entity: "light.desk",
      refraction: "auto",
      refraction_quality: "auto",
      theme: "auto",
      glass_variant: "regular",
      show_brightness: true,
    });
    expect(form.schema?.length).toBeGreaterThan(0);
    expect(form.computeLabel?.({ name: "entity" })).toBe("Entity");

    const changed = vi.fn();
    editor.addEventListener("config-changed", changed);
    form.dispatchEvent(new CustomEvent("value-changed", {
      detail: {
        value: {
          type: "custom:liquid-glass-light-card",
          entity: "light.desk",
          refraction: "off",
          refraction_quality: "auto",
          theme: "auto",
          glass_variant: "regular",
        },
      },
      bubbles: true,
      composed: true,
    }));

    expect(changed).toHaveBeenCalledOnce();
    expect(changed.mock.calls[0][0].detail).toEqual({
      config: {
        type: "custom:liquid-glass-light-card",
        entity: "light.desk",
        refraction: false,
      },
    });
  });

  it("round-trips an explicit refraction quality", () => {
    const editor = new LiquidGlassCardEditor();
    const form = editor.shadowRoot?.querySelector("ha-form") as TestForm;
    editor.hass = hass;
    editor.setConfig({
      type: "custom:liquid-glass-light-card",
      entity: "light.desk",
      refraction: true,
      refraction_quality: "medium",
    });

    expect(form.data).toMatchObject({ refraction: "on", refraction_quality: "medium" });

    const changed = vi.fn();
    editor.addEventListener("config-changed", changed);
    form.dispatchEvent(new CustomEvent("value-changed", {
      detail: { value: { ...form.data, refraction_quality: "high" } },
      bubbles: true,
      composed: true,
    }));

    expect(changed.mock.calls[0][0].detail.config).toMatchObject({
      refraction: true,
      refraction_quality: "high",
    });
  });

  it("round-trips Home Assistant action objects without rewriting them", () => {
    const editor = new LiquidGlassCardEditor();
    const form = editor.shadowRoot?.querySelector("ha-form") as TestForm;
    const tapAction = {
      action: "perform-action" as const,
      perform_action: "light.turn_on",
      target: { entity_id: "light.desk" },
      data: { brightness_pct: 70 },
      confirmation: { text: "Turn on the desk light?" },
    };
    editor.hass = hass;
    editor.setConfig({
      type: "custom:liquid-glass-light-card",
      entity: "light.desk",
      tap_action: tapAction,
    });

    expect(form.data?.tap_action).toEqual(tapAction);

    const changed = vi.fn();
    editor.addEventListener("config-changed", changed);
    form.dispatchEvent(new CustomEvent("value-changed", {
      detail: {
        value: {
          ...form.data,
          hold_action: { action: "more-info" },
        },
      },
      bubbles: true,
      composed: true,
    }));

    expect(changed.mock.calls[0][0].detail.config).toMatchObject({
      tap_action: tapAction,
      hold_action: { action: "more-info" },
    });
  });
});
