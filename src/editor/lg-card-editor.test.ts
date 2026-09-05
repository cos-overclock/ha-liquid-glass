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
});
