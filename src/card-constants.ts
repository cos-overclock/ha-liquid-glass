/** Entity domains shared by card registration, editors and runtime controls. */
export const BUTTON_DOMAINS = ["scene", "script", "automation", "button", "input_button"];

export const SWITCH_DOMAINS = [
  "switch", "input_boolean", "fan", "light", "automation", "humidifier", "siren", "remote",
];

export const SLIDER_DOMAINS = [
  "input_number", "number", "fan", "light", "media_player", "cover", "valve", "humidifier",
  "water_heater", "climate",
];

/** Swatches shown by a light card until the user supplies their own list. */
export const DEFAULT_LIGHT_FAVORITES = [
  "#FF453A", "#FF9F0A", "#FFD60A", "#30D158", "#0A84FF", "#B15CFF", "#FF375F",
];
