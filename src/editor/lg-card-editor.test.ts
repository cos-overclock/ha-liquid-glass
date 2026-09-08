// @vitest-environment jsdom

import { describe, expect, it, vi } from "vitest";
import type { EntityNameItem, HomeAssistant } from "../types";
import { LiquidGlassCardEditor } from "./lg-card-editor";

interface TestSchema {
  name: string;
  selector?: Record<string, unknown>;
  context?: Record<string, string>;
  schema?: TestSchema[];
}

interface TestForm extends HTMLElement {
  hass?: HomeAssistant;
  data?: Record<string, unknown>;
  schema?: TestSchema[];
  computeLabel?: (schema: { name: string }) => string;
}

function field(schema: TestSchema[] | undefined, name: string): TestSchema | undefined {
  for (const item of schema ?? []) {
    if (item.schema) {
      const found = field(item.schema, name);
      if (found) return found;
    } else if (item.name === name) return item;
  }
  return undefined;
}

const hass: HomeAssistant = {
  states: {},
  language: "en",
  callService: async () => undefined,
  callApi: async <T,>() => undefined as T,
};

describe("liquid-glass-card-editor", () => {
  it.each([
    [{}, true, undefined],
    [{ graph: true }, false, true],
    [{ graph: false }, false, false],
    [{ value_in_caption: false }, false, undefined],
    [{ value_in_caption: true, graph: true }, true, true],
  ])("preserves sensor layout when saving %j", (settings, caption, graph) => {
    const editor = new LiquidGlassCardEditor();
    editor.hass = hass;
    editor.setConfig({ type: "custom:liquid-glass-sensor-card", entity: "sensor.test", ...settings });
    const form = editor.shadowRoot!.querySelector("ha-form") as TestForm;
    expect(form.data?.value_in_caption).toBe(caption);
    expect(!!field(form.schema, "graph")).toBe(!caption);
    const changed = vi.fn();
    editor.addEventListener("config-changed", changed);
    form.dispatchEvent(new CustomEvent("value-changed", { detail: { value: form.data } }));
    const saved = changed.mock.calls[0][0].detail.config;
    expect(saved.value_in_caption).toBe(caption);
    if (graph !== undefined) expect(saved.graph).toBe(graph);
    editor.setConfig(saved);
    expect(form.data?.value_in_caption).toBe(caption);
  });

  it("retains an explicit segments selection when saving", () => {
    const editor = new LiquidGlassCardEditor();
    editor.hass = hass;
    editor.setConfig({ type: "custom:liquid-glass-select-card", ...{ style: "segments" } });
    const form = editor.shadowRoot!.querySelector("ha-form") as TestForm;
    const changed = vi.fn();
    editor.addEventListener("config-changed", changed);
    form.dispatchEvent(new CustomEvent("value-changed", { detail: { value: form.data } }));
    expect(changed.mock.calls[0][0].detail.config.style).toBe("segments");
  });

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

  it("shows dropdown as the select default and omits that default from config", () => {
    const editor = new LiquidGlassCardEditor();
    const form = editor.shadowRoot?.querySelector("ha-form") as TestForm;
    editor.hass = hass;
    editor.setConfig({
      type: "custom:liquid-glass-select-card",
      entity: "select.fan_mode",
    });

    expect(form.data?.style).toBe("dropdown");

    const changed = vi.fn();
    editor.addEventListener("config-changed", changed);
    form.dispatchEvent(new CustomEvent("value-changed", {
      detail: { value: form.data },
      bubbles: true,
      composed: true,
    }));

    expect(changed.mock.calls[0][0].detail.config).not.toHaveProperty("style");
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

  /*
   * Which name field the form gets depends on the core, so the editor has to pass `hass`
   * to the schema rather than build it blind. A composed name also has to survive the
   * round trip: it is an array, and the editor drops arrays it thinks are empty.
   */
  it("offers Home Assistant's name picker and keeps a composed name", () => {
    const editor = new LiquidGlassCardEditor();
    const form = editor.shadowRoot?.querySelector("ha-form") as TestForm;
    const name: EntityNameItem[] = [{ type: "area" }, { type: "entity" }];

    editor.hass = { ...hass, formatEntityName: () => "Living room Ceiling" };
    editor.setConfig({ type: "custom:liquid-glass-light-card", entity: "light.desk", name });

    expect(field(form.schema, "name")?.selector).toHaveProperty("entity_name");
    expect(field(form.schema, "name")?.context).toEqual({ entity: "entity" });
    expect(form.data?.name).toEqual(name);

    const changed = vi.fn();
    editor.addEventListener("config-changed", changed);
    form.dispatchEvent(new CustomEvent("value-changed", {
      detail: { value: { ...form.data } },
      bubbles: true,
      composed: true,
    }));

    expect(changed.mock.calls[0][0].detail.config.name).toEqual(name);
  });

  it("falls back to a text box on a core without the name helper", () => {
    const editor = new LiquidGlassCardEditor();
    const form = editor.shadowRoot?.querySelector("ha-form") as TestForm;

    editor.hass = hass;
    editor.setConfig({ type: "custom:liquid-glass-light-card", entity: "light.desk" });

    expect(field(form.schema, "name")?.selector).toHaveProperty("text");
  });
});
