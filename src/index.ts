import "./editor/lg-card-editor";
import "./cards/light-card";
import "./cards/climate-card";
import "./cards/switch-card";
import "./cards/sensor-card";
import "./cards/binary-sensor-card";
import "./cards/lock-card";
import "./cards/cover-card";
import "./cards/media-card";
import "./cards/slider-card";
import "./cards/weather-card";
import "./cards/button-card";
import "./cards/scene-card";
import "./cards/camera-card";
import "./cards/group-card";
import type { CustomCardRegistration, HassEntity, HomeAssistant } from "./types";

export { LiquidGlassLightCard } from "./cards/light-card";
export { LiquidGlassClimateCard } from "./cards/climate-card";
export { LiquidGlassSwitchCard } from "./cards/switch-card";
export { LiquidGlassSensorCard } from "./cards/sensor-card";
export { LiquidGlassBinarySensorCard } from "./cards/binary-sensor-card";
export { LiquidGlassLockCard } from "./cards/lock-card";
export { LiquidGlassCoverCard } from "./cards/cover-card";
export { LiquidGlassMediaCard } from "./cards/media-card";
export { LiquidGlassSliderCard } from "./cards/slider-card";
export { LiquidGlassWeatherCard } from "./cards/weather-card";
export { LiquidGlassButtonCard } from "./cards/button-card";
export { LiquidGlassSceneCard } from "./cards/scene-card";
export { LiquidGlassCameraCard } from "./cards/camera-card";
export { LiquidGlassGroupCard } from "./cards/group-card";

/** Replaced at build time by scripts/build.mjs. */
declare const __LG_VERSION__: string;
declare const __LG_BUILD__: string;

const VERSION = typeof __LG_VERSION__ === "string" ? __LG_VERSION__ : "dev";
const BUILD = typeof __LG_BUILD__ === "string" ? __LG_BUILD__ : "unbuilt";
const DOCS = "https://github.com/cos-overclock/ha-liquid-glass";

type EntitySupport = (entity: HassEntity) => boolean;
type SuggestedConfig = (entityId: string) => Record<string, unknown>;

const feature = (entity: HassEntity, mask: number): boolean =>
  Boolean(((entity.attributes.supported_features as number | undefined) ?? 0) & mask);

/**
 * Build a card-picker registration that only suggests the card for entities it can use.
 * Home Assistant calls this after the user has selected an entity (HA 2026.6+).
 */
function entityCard(
  type: string,
  name: string,
  description: string,
  domains: string[],
  supports?: EntitySupport,
  config: SuggestedConfig = (entityId) => ({ entity: entityId }),
): CustomCardRegistration {
  return {
    type,
    name,
    description,
    getEntitySuggestion: (hass: HomeAssistant, entityId: string) => {
      const domain = entityId.split(".", 1)[0];
      if (!domains.includes(domain)) return null;

      const entity = hass.states[entityId];
      if (supports && (!entity || !supports(entity))) return null;

      return {
        config: {
          type: `custom:${type}`,
          ...config(entityId),
        },
      };
    },
  };
}

const BUTTON_DOMAINS = ["scene", "script", "automation", "button", "input_button"];
const SWITCH_DOMAINS = ["switch", "input_boolean", "fan", "light", "automation", "humidifier", "siren", "remote"];
const SLIDER_DOMAINS = ["input_number", "number", "fan", "light", "media_player", "cover", "valve", "humidifier", "water_heater", "climate"];

// Feature values are the corresponding Home Assistant EntityFeature flags.
const SET_VALUE = 1;
const SET_VALUE_RANGE = 2;
const SET_POSITION = 4;
const VOLUME_SET = 4;

/** A slider is only useful when the selected entity exposes its built-in writable value. */
const supportsSlider: EntitySupport = (entity) => {
  const domain = entity.entity_id.split(".", 1)[0];
  switch (domain) {
    case "input_number":
    case "number":
      return true;
    case "fan":
      return feature(entity, SET_VALUE);
    case "light": {
      const modes = (entity.attributes.supported_color_modes as string[] | undefined) ?? [];
      return modes.some((mode) => mode !== "onoff");
    }
    case "media_player":
      return feature(entity, VOLUME_SET);
    case "cover":
    case "valve":
      return feature(entity, SET_POSITION);
    case "humidifier":
      return "humidity" in entity.attributes;
    case "water_heater":
    case "climate":
      return feature(entity, SET_VALUE);
    default:
      return false;
  }
};

const cards: CustomCardRegistration[] = [
  entityCard("liquid-glass-light-card", "Liquid Glass Light", "Brightness, color temperature, color and presets", ["light"]),
  entityCard(
    "liquid-glass-climate-card",
    "Liquid Glass Climate",
    "Thermostat dial with modes and fan / preset",
    ["climate"],
    (entity) => feature(entity, SET_VALUE | SET_VALUE_RANGE),
  ),
  entityCard("liquid-glass-switch-card", "Liquid Glass Switch", "Single row toggle", SWITCH_DOMAINS),
  entityCard("liquid-glass-sensor-card", "Liquid Glass Sensor", "Value, trend and 24h sparkline", ["sensor"]),
  entityCard("liquid-glass-binary-sensor-card", "Liquid Glass Binary Sensor", "Door / motion / window status row", ["binary_sensor"]),
  entityCard("liquid-glass-lock-card", "Liquid Glass Lock", "Slide to lock / unlock", ["lock"]),
  entityCard(
    "liquid-glass-cover-card",
    "Liquid Glass Cover",
    "Blinds and curtains with position and tilt",
    ["cover"],
    (entity) => feature(entity, 1 | 2 | SET_POSITION),
  ),
  entityCard("liquid-glass-media-card", "Liquid Glass Media", "Now playing with transport and volume", ["media_player"]),
  entityCard("liquid-glass-slider-card", "Liquid Glass Slider", "Any numeric value as a draggable track", SLIDER_DOMAINS, supportsSlider),
  entityCard("liquid-glass-weather-card", "Liquid Glass Weather", "Current conditions with hourly and daily forecast", ["weather"]),
  entityCard("liquid-glass-button-card", "Liquid Glass Button", "Run a scene, script, automation or button", BUTTON_DOMAINS),
  entityCard(
    "liquid-glass-scene-card",
    "Liquid Glass Scenes",
    "A grid of scene tiles or a row of chips",
    BUTTON_DOMAINS,
    undefined,
    (entityId) => ({ scenes: [{ entity: entityId }] }),
  ),
  entityCard("liquid-glass-camera-card", "Liquid Glass Camera", "Camera still with motion and history", ["camera"]),
  // A container rather than an entity card, so the picker offers it without a suggestion.
  {
    type: "liquid-glass-group-card",
    name: "Liquid Glass Group",
    description: "A collapsible panel that holds other cards",
  },
];

window.customCards = window.customCards ?? [];
for (const card of cards) {
  const registration = { ...card, preview: true, documentationURL: DOCS };
  const existing = window.customCards.find((candidate) => candidate.type === card.type);
  if (existing) Object.assign(existing, registration);
  else window.customCards.push(registration);
}

// The card count makes a stale copy obvious: a build that predates a new card says so here.
console.info(
  `%c LIQUID-GLASS-CARDS %c v${VERSION} · ${cards.length} cards · built ${BUILD} `,
  "color: #1c1c1e; background: linear-gradient(90deg,#ffd36b,#ff8a1f); font-weight: 700; border-radius: 6px 0 0 6px;",
  "color: #fff; background: #1c1c1e; font-weight: 500; border-radius: 0 6px 6px 0;",
);
