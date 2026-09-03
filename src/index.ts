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

export { LiquidGlassLightCard } from "./cards/light-card";
export { LiquidGlassClimateCard } from "./cards/climate-card";
export { LiquidGlassSwitchCard } from "./cards/switch-card";
export { LiquidGlassSensorCard } from "./cards/sensor-card";
export { LiquidGlassBinarySensorCard } from "./cards/binary-sensor-card";
export { LiquidGlassLockCard } from "./cards/lock-card";
export { LiquidGlassCoverCard } from "./cards/cover-card";
export { LiquidGlassMediaCard } from "./cards/media-card";
export { LiquidGlassSliderCard } from "./cards/slider-card";

/** Replaced at build time by scripts/build.mjs. */
declare const __LG_VERSION__: string;
declare const __LG_BUILD__: string;

const VERSION = typeof __LG_VERSION__ === "string" ? __LG_VERSION__ : "dev";
const BUILD = typeof __LG_BUILD__ === "string" ? __LG_BUILD__ : "unbuilt";
const DOCS = "https://github.com/cos-overclock/ha-liquid-glass";

const cards = [
  { type: "liquid-glass-light-card", name: "Liquid Glass Light", description: "Brightness, color temperature, color and presets" },
  { type: "liquid-glass-climate-card", name: "Liquid Glass Climate", description: "Thermostat dial with modes and fan / preset" },
  { type: "liquid-glass-switch-card", name: "Liquid Glass Switch", description: "Single row toggle" },
  { type: "liquid-glass-sensor-card", name: "Liquid Glass Sensor", description: "Value, trend and 24h sparkline" },
  { type: "liquid-glass-binary-sensor-card", name: "Liquid Glass Binary Sensor", description: "Door / motion / window status row" },
  { type: "liquid-glass-lock-card", name: "Liquid Glass Lock", description: "Slide to lock / unlock" },
  { type: "liquid-glass-cover-card", name: "Liquid Glass Cover", description: "Blinds and curtains with position and tilt" },
  { type: "liquid-glass-media-card", name: "Liquid Glass Media", description: "Now playing with transport and volume" },
  { type: "liquid-glass-slider-card", name: "Liquid Glass Slider", description: "Any numeric value as a draggable track" },
];

window.customCards = window.customCards ?? [];
for (const card of cards) {
  if (!window.customCards.some((c) => c.type === card.type)) {
    window.customCards.push({ ...card, preview: true, documentationURL: DOCS });
  }
}

console.info(
  `%c LIQUID-GLASS-CARDS %c v${VERSION} · built ${BUILD} `,
  "color: #1c1c1e; background: linear-gradient(90deg,#ffd36b,#ff8a1f); font-weight: 700; border-radius: 6px 0 0 6px;",
  "color: #fff; background: #1c1c1e; font-weight: 500; border-radius: 0 6px 6px 0;",
);
