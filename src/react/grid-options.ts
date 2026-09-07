import type { LovelaceGridOptions } from "../types";

/** A compact row card: half-width by default and exactly two 56px grid rows tall. */
export function rowGridOptions(minColumns = 6): LovelaceGridOptions {
  return {
    rows: 2,
    min_rows: 2,
    max_rows: 2,
    columns: 6,
    min_columns: minColumns,
    max_columns: 12,
  };
}

/** A content card whose intrinsic layout needs at least `rows` grid rows. */
export function contentGridOptions(
  rows: number,
  columns: 6 | 12 = 6,
  minColumns = 6,
): LovelaceGridOptions {
  return {
    rows,
    min_rows: rows,
    columns,
    min_columns: minColumns,
    max_columns: 12,
  };
}

/** Width rules for cards whose height depends on aspect ratio or mounted child cards. */
export function autoHeightGridOptions(
  columns: 6 | 12 = 12,
  minColumns = 6,
): LovelaceGridOptions {
  return {
    columns,
    min_columns: minColumns,
    max_columns: 12,
  };
}

/** Section headings remain a single row, but can be resized down to a quarter section. */
export const separatorGridOptions = (): LovelaceGridOptions => ({
  rows: 1,
  min_rows: 1,
  max_rows: 1,
  columns: 12,
  min_columns: 3,
  max_columns: 12,
});
