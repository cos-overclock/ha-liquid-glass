import type { Translator } from "../i18n";
import type { HomeAssistant } from "../types";
import { BUTTON_DOMAINS, SELECT_DOMAINS, SLIDER_DOMAINS } from "../card-constants";

/**
 * Schema entries consumed by Home Assistant's `<ha-form>`.
 * A `grid` lays its children out in two columns; an `expandable` collapses them behind a
 * heading. Both keep their data flat as long as `name` stays empty.
 */
export interface FormSchema {
  name: string;
  type?: "grid" | "expandable";
  title?: string;
  icon?: string;
  required?: boolean;
  selector?: Record<string, unknown>;
  context?: Record<string, string>;
  schema?: FormSchema[];
}

const text = (name: string): FormSchema => ({ name, selector: { text: {} } });
const bool = (name: string): FormSchema => ({ name, selector: { boolean: {} } });
const icon = (name: string): FormSchema => ({ name, selector: { icon: {} } });
const object = (name: string): FormSchema => ({ name, selector: { object: {} } });
const grid = (schema: FormSchema[]): FormSchema => ({ name: "", type: "grid", schema });
const entity = (name: string, domain: string | readonly string[], required = false): FormSchema => ({
  name,
  required,
  selector: { entity: { domain } },
});
const number = (name: string, min: number, max: number, step = 1): FormSchema => ({
  name,
  selector: { number: { min, max, step, mode: "box" } },
});
const select = (name: string, options: Array<{ value: string; label: string }>, multiple = false): FormSchema => ({
  name,
  selector: { select: { options, multiple, mode: "dropdown" } },
});

/**
 * The name field: Home Assistant's own `entity_name` picker where the core has one.
 *
 * That picker writes either free text or the registry parts — floor, area, device,
 * entity — that `formatEntityName` composes, which is how the built-in cards are named.
 * It arrived in 2026.4 alongside the helper, so the helper's presence is what decides:
 * an older core would render an unknown selector as an empty gap where the field belongs,
 * and gets the plain text box it has always had instead.
 */
function nameField(hass: HomeAssistant | undefined): FormSchema {
  if (typeof hass?.formatEntityName !== "function") return text("name");
  return { name: "name", selector: { entity_name: {} }, context: { entity: "entity" } };
}

/** Collapsed section with the options that rarely need changing. */
function advanced(t: Translator): FormSchema {
  return {
    name: "",
    type: "expandable",
    title: t("ed_advanced"),
    icon: "mdi:tune",
    schema: [
      grid([
        select("theme", [
          { value: "auto", label: t("ed_theme_auto") },
          { value: "light", label: t("ed_theme_light") },
          { value: "dark", label: t("ed_theme_dark") },
        ]),
        select("refraction", [
          { value: "auto", label: t("ed_refraction_auto") },
          { value: "on", label: t("ed_refraction_on") },
          { value: "off", label: t("ed_refraction_off") },
        ]),
      ]),
      select("refraction_quality", [
        { value: "auto", label: t("ed_refraction_quality_auto") },
        { value: "high", label: t("ed_refraction_quality_high") },
        { value: "medium", label: t("ed_refraction_quality_medium") },
      ]),
      select("language", [
        { value: "ja", label: "日本語" },
        { value: "en", label: "English" },
      ]),
      select("glass_variant", [
        { value: "regular", label: t("ed_glass_variant_regular") },
        { value: "clear", label: t("ed_glass_variant_clear") },
      ]),
    ],
  };
}

/** Standard Lovelace actions, edited by Home Assistant's own rich action selector. */
function interactions(t: Translator): FormSchema {
  const action = (name: string): FormSchema => ({
    name,
    selector: {
      ui_action: {
        actions: ["more-info", "toggle", "navigate", "url", "perform-action", "assist", "none"],
      },
    },
    context: { entity_id: "entity" },
  });
  return {
    name: "",
    type: "expandable",
    title: t("ed_interactions"),
    icon: "mdi:gesture-tap",
    schema: [action("tap_action"), action("hold_action"), action("double_tap_action")],
  };
}

function common(t: Translator): FormSchema[] {
  return [interactions(t), advanced(t)];
}

const HVAC_MODES = ["auto", "heat_cool", "heat", "cool", "dry", "fan_only", "off"];

/** Card type (`custom:liquid-glass-light-card`) → the kind of card it is (`light`). */
export function cardKind(type: string | undefined): string {
  return (type ?? "")
    .replace(/^custom:/, "")
    .replace(/^liquid-glass-/, "")
    .replace(/-card$/, "");
}

/**
 * `data` is the config being edited. A couple of fields only make sense for certain
 * values of other fields, and a checkbox for something the card cannot do reads as a lie,
 * so those entries are left out rather than shown inert.
 */
export function schemaFor(
  type: string | undefined,
  t: Translator,
  data?: Record<string, unknown>,
  hass?: HomeAssistant,
): FormSchema[] {
  const kind = cardKind(type);
  /** Entity picker plus the name / icon pair that every card shares. */
  const head = (domain: string | readonly string[]): FormSchema[] =>
    [entity("entity", domain, true), grid([nameField(hass), icon("icon")])];
  switch (kind) {
    case "light":
      return [
        ...head("light"),
        grid([bool("show_brightness"), bool("show_color_temp"), bool("show_color")]),
        { name: "favorites", selector: { text: { multiple: true } } },
        object("presets"),
        ...common(t),
      ];

    case "climate":
      return [
        ...head("climate"),
        select("design", [
          { value: "classic", label: t("ed_design_classic") },
          { value: "compact", label: t("ed_design_compact") },
        ]),
        ...(data?.design === "compact" || data?.design === "a"
          ? [bool("show_fan_mode")]
          : [grid([bool("show_fan_mode"), bool("show_preset_mode"), bool("show_swing_mode")])]),
        select(
          "hvac_modes",
          HVAC_MODES.map((m) => ({ value: m, label: t(`mode_${m}`) })),
          true,
        ),
        grid([number("min_temp", -50, 100, 0.5), number("max_temp", -50, 100, 0.5)]),
        ...common(t),
      ];

    case "switch":
      return [
        ...head(["switch", "input_boolean", "fan", "light", "automation", "humidifier", "siren", "remote"]),
        entity("power_entity", "sensor"),
        ...common(t),
      ];

    case "sensor": {
      // A caption reading leaves no graph, so its options go away with it.
      const compact = data?.value_in_caption === true;
      return [
        ...head("sensor"),
        grid(compact ? [bool("value_in_caption"), bool("trend")] : [bool("value_in_caption"), bool("graph"), bool("trend")]),
        grid(compact ? [number("decimals", 0, 4)] : [number("hours_to_show", 1, 168), number("decimals", 0, 4)]),
        text("accent"),
        grid([entity("secondary_entity", ["sensor", "binary_sensor"]), text("secondary_label")]),
        ...common(t),
      ];
    }

    case "binary-sensor":
      return [
        ...head("binary_sensor"),
        grid([icon("icon_on"), icon("icon_off")]),
        grid([text("label_on"), text("label_off")]),
        text("accent"),
        ...common(t),
      ];

    case "lock":
      return [...head("lock"), object("buttons"), ...common(t)];

    case "cover":
      return [
        ...head("cover"),
        grid([
          select("style", [
            { value: "blind", label: t("ed_style_blind") },
            { value: "curtain", label: t("ed_style_curtain") },
          ]),
          select("curtain", [
            { value: "double", label: t("ed_curtain_double") },
            { value: "single", label: t("ed_curtain_single") },
          ]),
        ]),
        bool("show_tilt"),
        ...common(t),
      ];

    case "media":
      return [...head("media_player"), grid([bool("show_volume"), bool("show_device")]), text("source_color"), ...common(t)];

    case "slider":
      return [
        ...head(SLIDER_DOMAINS),
        grid([number("min", -1000, 10000, 0.1), number("max", -1000, 10000, 0.1)]),
        grid([number("step", 0.01, 1000, 0.01), text("unit")]),
        grid([bool("ticks"), bool("show_range"), number("decimals", 0, 4)]),
        text("subtitle"),
        text("accent"),
        {
          name: "",
          type: "expandable",
          title: t("ed_custom_entity"),
          icon: "mdi:code-braces",
          schema: [text("attribute"), grid([text("service"), text("service_key")])],
        },
        ...common(t),
      ];

    case "select":
      return [
        ...head(SELECT_DOMAINS),
        select("style", [
          { value: "segments", label: t("ed_style_segments") },
          { value: "chips", label: t("ed_style_chips") },
        ]),
        text("accent"),
        ...common(t),
      ];

    case "weather": {
      // A single row has nowhere to put the forecast, so those options go away with it.
      const row = data?.layout === "row";
      const layout = select("layout", [
        { value: "full", label: t("ed_layout_full") },
        { value: "row", label: t("ed_layout_row") },
      ]);
      if (row) return [...head("weather"), layout, ...common(t)];
      return [
        ...head("weather"),
        layout,
        grid([bool("show_hourly"), bool("show_daily"), bool("show_metrics")]),
        grid([number("hourly_count", 2, 12), number("daily_count", 1, 10)]),
        ...common(t),
      ];
    }

    case "button":
      return [
        ...head(BUTTON_DOMAINS),
        text("subtitle"),
        text("accent"),
        {
          name: "",
          type: "expandable",
          title: t("ed_custom_entity"),
          icon: "mdi:code-braces",
          schema: [text("service"), object("service_data")],
        },
        ...common(t),
      ];

    case "scene":
      return [
        grid([
          select("style", [
            { value: "tiles", label: t("ed_style_tiles") },
            { value: "chips", label: t("ed_style_chips") },
          ]),
          number("columns", 1, 6),
        ]),
        grid([text("title"), bool("show_count")]),
        object("scenes"),
        ...common(t),
      ];

    case "group":
      return [
        grid([text("title"), icon("icon")]),
        text("subtitle"),
        grid([bool("collapsible"), bool("collapsed"), bool("summary")]),
        object("cards"),
        ...common(t),
      ];

    case "separator": {
      const style = (data?.style as string | undefined) ?? "pill";
      return [
        grid([text("title"), icon("icon")]),
        select("style", [
          { value: "plain", label: t("ed_style_plain") },
          { value: "pill", label: t("ed_style_pill") },
          { value: "header", label: t("ed_style_header") },
        ]),
        ...(style === "header" ? [text("subtitle")] : [number("count", 0, 999)]),
        ...common(t),
      ];
    }

    case "camera":
      return [
        ...head("camera"),
        entity("motion_entity", "binary_sensor"),
        grid([bool("show_actions"), bool("show_mic")]),
        grid([number("refresh_interval", 1, 300), number("aspect_ratio", 0.5, 3, 0.01)]),
        {
          name: "",
          type: "expandable",
          title: t("ed_custom_entity"),
          icon: "mdi:code-braces",
          schema: [text("snapshot_service"), text("mic_service")],
        },
        ...common(t),
      ];

    default:
      return [entity("entity", [], true), grid([nameField(hass), icon("icon")]), ...common(t)];
  }
}

/**
 * Toggles the cards treat as on unless the config explicitly says `false`.
 * The editor has to seed these as checked, otherwise an unticked box would claim a section
 * is hidden while the card is happily rendering it.
 */
export const DEFAULT_ON = new Set([
  "show_brightness",
  "show_color_temp",
  "show_color",
  "show_fan_mode",
  "show_preset_mode",
  "graph",
  "trend",
  "show_tilt",
  "show_volume",
  "show_device",
  "show_range",
  "show_hourly",
  "show_daily",
  "show_metrics",
  "show_actions",
  "collapsible",
  "summary",
]);

/** Every field name in a schema, flattened out of its grids and expandables. */
export function fieldNames(schema: FormSchema[]): Set<string> {
  const names = new Set<string>();
  const walk = (items: FormSchema[]) => {
    for (const item of items) {
      if (item.schema) walk(item.schema);
      else if (item.name) names.add(item.name);
    }
  };
  walk(schema);
  return names;
}

/** Fields whose label deserves a line of explanation underneath. */
export const HELPERS: Record<string, string> = {
  presets: "ed_help_presets",
  buttons: "ed_help_buttons",
  favorites: "ed_help_favorites",
  accent: "ed_help_color",
  source_color: "ed_help_color",
  ticks: "ed_help_ticks",
  show_range: "ed_help_show_range",
  value_in_caption: "ed_help_value_in_caption",
  attribute: "ed_help_attribute",
  service: "ed_help_service",
  service_key: "ed_help_service_key",
  subtitle: "ed_help_subtitle",
  scenes: "ed_help_scenes",
  snapshot_service: "ed_help_snapshot_service",
  motion_entity: "ed_help_motion_entity",
  style: "ed_help_style",
  layout: "ed_help_layout",
  hvac_modes: "ed_help_hvac_modes",
  cards: "ed_help_cards",
};
