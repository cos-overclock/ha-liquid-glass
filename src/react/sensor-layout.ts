/** Explicit graph settings retain the detailed layout used by existing dashboards. */
export function sensorValueInCaption(config: { value_in_caption?: unknown; graph?: unknown }): boolean {
  return typeof config.value_in_caption === "boolean"
    ? config.value_in_caption
    : config.graph === undefined;
}
