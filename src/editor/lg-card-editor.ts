import { DEFAULT_LIGHT_FAVORITES } from "../card-constants";
import { createTranslator } from "../i18n";
import type { BaseCardConfig, HomeAssistant } from "../types";
import { fireEvent } from "../utils";
import { cardKind, schemaFor, fieldNames, DEFAULT_ON, HELPERS, type FormSchema } from "./schema";

type FormData = Record<string, unknown>;

interface HaFormElement extends HTMLElement {
  hass?: HomeAssistant;
  data?: FormData;
  schema?: FormSchema[];
  computeLabel?: (schema: FormSchema) => string;
  computeHelper?: (schema: FormSchema) => string | undefined;
}

/** Visual editor shared by every Liquid Glass card. */
export class LiquidGlassCardEditor extends HTMLElement {
  private hassValue?: HomeAssistant;
  private config?: BaseCardConfig;
  private readonly form: HaFormElement;

  constructor() {
    super();
    const root = this.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = ":host{display:block}";
    this.form = document.createElement("ha-form");
    this.form.hidden = true;
    this.form.addEventListener("value-changed", this.valueChanged as EventListener);
    root.append(style, this.form);
  }

  get hass(): HomeAssistant | undefined {
    return this.hassValue;
  }

  set hass(value: HomeAssistant | undefined) {
    if (this.hassValue === value) return;
    this.hassValue = value;
    this.updateForm();
  }

  setConfig(config: BaseCardConfig): void {
    this.config = config;
    this.updateForm();
  }

  /** Config → form values, including defaults that the card already renders. */
  private toForm(config: BaseCardConfig): FormData {
    const { refraction, theme, ...rest } = config as unknown as FormData;
    const data: FormData = { ...rest };
    data.refraction = refraction === true ? "on" : refraction === false ? "off" : "auto";
    data.refraction_quality = rest.refraction_quality ?? "auto";
    data.theme = theme ?? "auto";
    data.glass_variant = rest.glass_variant ?? "regular";
    if (cardKind(config.type) === "weather") data.layout = rest.layout ?? "full";
    if (cardKind(config.type) === "climate") {
      const design = rest.design as string | undefined;
      data.design = design === "a" ? "compact" : design ?? "classic";
    }
    if (cardKind(config.type) === "separator") data.style = rest.style ?? "pill";
    if (cardKind(config.type) === "select") data.style = rest.style ?? "segments";

    for (const name of fieldNames(schemaFor(config.type, this.t, data))) {
      if (!DEFAULT_ON.has(name)) continue;
      const compactFan = cardKind(config.type) === "climate" && data.design === "compact" && name === "show_fan_mode";
      data[name] = compactFan ? rest[name] === true : rest[name] !== false;
    }

    if (cardKind(config.type) === "light") {
      const favorites = rest.favorites as string[] | false | undefined;
      data.favorites = favorites === false ? [] : favorites ?? DEFAULT_LIGHT_FAVORITES;
    }
    return data;
  }

  /** Form values → compact config, dropping keys that carry no meaning. */
  private fromForm(data: FormData): BaseCardConfig {
    const out: FormData = { ...data };
    const compactClimate = cardKind(out.type as string | undefined) === "climate" && (out.design === "compact" || out.design === "a");
    // The editor is shared by every card, so the climate-only keys are not on the base type.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion -- widening: tsc rejects the code without it
    const current = this.config as (BaseCardConfig & { design?: string; show_fan_mode?: boolean }) | undefined;
    const currentCompact = current?.design === "compact" || current?.design === "a";
    if (current && compactClimate !== currentCompact && current.show_fan_mode === undefined) delete out.show_fan_mode;

    for (const [key, value] of Object.entries(out)) {
      if (typeof value !== "boolean") continue;
      if (compactClimate && key === "show_fan_mode") {
        if (value === false) delete out[key];
        continue;
      }
      if (value === DEFAULT_ON.has(key)) delete out[key];
    }

    if (out.refraction === "on") out.refraction = true;
    else if (out.refraction === "off") out.refraction = false;
    else delete out.refraction;
    if (out.refraction_quality === "auto") delete out.refraction_quality;
    if (out.theme === "auto") delete out.theme;
    if (out.glass_variant === "regular") delete out.glass_variant;
    if (out.layout === "full") delete out.layout;
    if (out.design === "classic") delete out.design;
    if (out.style === "pill" && cardKind(out.type as string | undefined) === "separator") delete out.style;
    if (out.style === "segments" && cardKind(out.type as string | undefined) === "select") delete out.style;
    const favorites = out.favorites;
    if (Array.isArray(favorites) && favorites.join() === DEFAULT_LIGHT_FAVORITES.join()) delete out.favorites;

    for (const [key, value] of Object.entries(out)) {
      if (value === undefined || value === null || value === "") delete out[key];
      else if (Array.isArray(value) && value.length === 0 && key !== "favorites") delete out[key];
    }
    return out as unknown as BaseCardConfig;
  }

  private computeLabel = (schema: FormSchema): string => this.t(`ed_${schema.name}`);

  private computeHelper = (schema: FormSchema): string | undefined => {
    const key = HELPERS[schema.name];
    return key ? this.t(key) : undefined;
  };

  private get t() {
    return createTranslator(this.config?.language ?? this.hassValue?.locale?.language ?? this.hassValue?.language);
  }

  private valueChanged = (event: CustomEvent<{ value: FormData }>): void => {
    event.stopPropagation();
    fireEvent(this, "config-changed", { config: this.fromForm(event.detail.value) });
  };

  private updateForm(): void {
    const hass = this.hassValue;
    const config = this.config;
    this.form.hidden = !hass || !config;
    if (!hass || !config) return;

    this.form.hass = hass;
    this.form.data = this.toForm(config);
    this.form.schema = schemaFor(config.type, this.t, config as unknown as FormData);
    this.form.computeLabel = this.computeLabel;
    this.form.computeHelper = this.computeHelper;
  }
}

if (!customElements.get("liquid-glass-card-editor")) {
  customElements.define("liquid-glass-card-editor", LiquidGlassCardEditor);
}

declare global {
  interface HTMLElementTagNameMap {
    "liquid-glass-card-editor": LiquidGlassCardEditor;
  }
}
