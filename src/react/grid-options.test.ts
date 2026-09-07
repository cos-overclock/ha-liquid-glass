// @vitest-environment jsdom

import { beforeAll, describe, expect, it } from "vitest";
import type { BaseCardConfig, LovelaceGridOptions } from "../types";
import {
  autoHeightGridOptions,
  contentGridOptions,
  rowGridOptions,
  separatorGridOptions,
} from "./grid-options";

type GridCard = HTMLElement & {
  setConfig(config: BaseCardConfig & Record<string, unknown>): void;
  getGridOptions(): LovelaceGridOptions;
};

function options(kind: string, config: Record<string, unknown> = {}): LovelaceGridOptions {
  const element = document.createElement(`liquid-glass-${kind}-card`) as GridCard;
  element.setConfig({ type: `custom:liquid-glass-${kind}-card`, ...config });
  return element.getGridOptions();
}

beforeAll(async () => {
  await import("../index");
});

describe("Sections grid option presets", () => {
  it("defines compact, content, auto-height and separator shapes", () => {
    expect(rowGridOptions()).toEqual({
      rows: 2,
      min_rows: 2,
      max_rows: 2,
      columns: 6,
      min_columns: 6,
      max_columns: 12,
    });
    expect(contentGridOptions(5, 12)).toEqual({
      rows: 5,
      min_rows: 5,
      columns: 12,
      min_columns: 6,
      max_columns: 12,
    });
    expect(autoHeightGridOptions()).toEqual({
      columns: 12,
      min_columns: 6,
      max_columns: 12,
    });
    expect(separatorGridOptions()).toEqual({
      rows: 1,
      min_rows: 1,
      max_rows: 1,
      columns: 12,
      min_columns: 3,
      max_columns: 12,
    });
  });

  it("clamps minimum columns to the supported range and preset width", () => {
    expect(rowGridOptions(12).min_columns).toBe(6);
    expect(contentGridOptions(5, 6, 12).min_columns).toBe(6);
    expect(autoHeightGridOptions(6, 12).min_columns).toBe(6);
    expect(contentGridOptions(5, 12, 0).min_columns).toBe(1);
    expect(autoHeightGridOptions(12, Number.NaN).min_columns).toBe(12);
  });
});

describe("Liquid Glass Sections sizing", () => {
  it("gives every registered card valid 12-column grid options", () => {
    for (const registration of window.customCards ?? []) {
      const element = document.createElement(registration.type) as GridCard;
      const Card = customElements.get(registration.type) as (CustomElementConstructor & {
        getStubConfig?: () => Record<string, unknown>;
      });
      element.setConfig({
        type: `custom:${registration.type}`,
        ...(Card.getStubConfig?.() ?? {}),
      });
      const grid = element.getGridOptions();
      expect(grid.columns, registration.type).toBeDefined();
      expect(grid.min_columns, registration.type).toBeGreaterThanOrEqual(3);
      expect(grid.max_columns, registration.type).toBe(12);
      if (typeof grid.columns === "number") {
        expect(grid.columns, registration.type).toBeGreaterThanOrEqual(grid.min_columns ?? 1);
        expect(grid.columns, registration.type).toBeLessThanOrEqual(grid.max_columns ?? 12);
      }
      if (grid.rows !== undefined) expect(grid.rows, registration.type).toBeGreaterThanOrEqual(grid.min_rows ?? 1);
    }
  });

  it("uses a two-row half-width footprint for compact row cards", () => {
    for (const kind of ["switch", "binary-sensor", "button"]) {
      expect(options(kind)).toEqual(rowGridOptions());
    }
    expect(options("sensor", { value_in_caption: true })).toEqual(rowGridOptions());
    expect(options("weather", { layout: "row" })).toEqual(rowGridOptions());
  });

  it("adapts rows and default width to visible content", () => {
    expect(options("sensor", { graph: false }).rows).toBe(3);
    expect(options("sensor", { graph: true }).rows).toBe(4);
    expect(options("slider", { show_range: false }).rows).toBe(2);
    expect(options("slider", { show_range: true }).rows).toBe(3);
    expect(options("climate", { design: "compact" })).toMatchObject({ rows: 4, columns: 6 });
    expect(options("climate", { design: "classic" })).toMatchObject({ rows: 6, columns: 12 });
    expect(options("lock", { buttons: [{}, {}, {}] }).rows).toBe(5);
  });

  it("sizes forecast and scene collections from their configured item counts", () => {
    const compactWeather = options("weather", {
      show_hourly: false,
      show_daily: false,
      show_metrics: false,
    });
    const fullWeather = options("weather", { daily_count: 8 });
    expect(compactWeather.rows).toBe(3);
    expect(fullWeather.rows).toBeGreaterThan(compactWeather.rows ?? 0);

    const tiles = options("scene", {
      columns: 3,
      scenes: Array.from({ length: 6 }, () => ({})),
    });
    const chips = options("scene", {
      style: "chips",
      columns: 3,
      scenes: Array.from({ length: 6 }, () => ({})),
    });
    expect(tiles.rows).toBe(5);
    expect(chips.rows).toBe(3);
  });

  it("keeps aspect-ratio and nested-content cards at intrinsic height", () => {
    expect(options("camera").rows).toBeUndefined();
    expect(options("group").rows).toBeUndefined();
  });
});
