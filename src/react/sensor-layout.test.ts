import { describe, expect, it } from "vitest";
import { sensorValueInCaption } from "./sensor-layout";

describe("sensor layout compatibility", () => {
  it.each([
    [{}, true],
    [{ graph: true }, false],
    [{ graph: false }, false],
    [{ value_in_caption: false }, false],
    [{ value_in_caption: true, graph: true }, true],
    [{ value_in_caption: false, graph: false }, false],
  ] as const)("resolves %j to caption=%s", (config, caption) => {
    expect(sensorValueInCaption(config)).toBe(caption);
  });
});
