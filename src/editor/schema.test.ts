import { describe, expect, it } from "vitest";
import { createTranslator } from "../i18n";
import { cardKind, DEFAULT_ON, fieldNames, HELPERS, schemaFor, type FormSchema } from "./schema";

const t = createTranslator("en");

/** The card types the bundle registers, as they appear in a Lovelace config. */
const CARD_TYPES = [
  "light", "climate", "switch", "sensor", "binary-sensor", "lock", "cover",
  "media", "slider", "weather", "button", "scene", "camera", "group", "separator",
].map((kind) => `custom:liquid-glass-${kind}-card`);

describe("cardKind", () => {
  it("strips the custom prefix, the package prefix and the card suffix", () => {
    expect(cardKind("custom:liquid-glass-light-card")).toBe("light");
    expect(cardKind("custom:liquid-glass-binary-sensor-card")).toBe("binary-sensor");
  });

  it("copes with a partially qualified or missing type", () => {
    expect(cardKind("liquid-glass-lock-card")).toBe("lock");
    expect(cardKind("light")).toBe("light");
    expect(cardKind(undefined)).toBe("");
  });
});

describe("schemaFor", () => {
  it("builds a schema for every card the bundle registers", () => {
    for (const type of CARD_TYPES) {
      expect(schemaFor(type, t).length, type).toBeGreaterThan(0);
    }
  });

  it("gives an unknown type the shared appearance fields rather than nothing", () => {
    const names = fieldNames(schemaFor("custom:not-ours", t));
    expect(names.has("theme")).toBe(true);
    expect(names.has("refraction")).toBe(true);
  });

  /*
   * Every card is themeable and can have its refraction forced, so the appearance
   * block has to reach all of them — this is the part users go looking for.
   */
  it("offers the appearance settings on every card", () => {
    for (const type of CARD_TYPES) {
      const names = fieldNames(schemaFor(type, t));
      for (const field of ["theme", "refraction", "refraction_quality", "glass_variant", "language"]) {
        expect(names.has(field), `${type} is missing ${field}`).toBe(true);
      }
    }
  });

  it("asks entity cards for an entity, and container cards for none", () => {
    for (const type of CARD_TYPES) {
      const names = fieldNames(schemaFor(type, t));
      const container = ["group", "separator", "scene"].includes(cardKind(type));
      expect(names.has("entity"), type).toBe(!container);
    }
  });

  it("names every field it declares", () => {
    for (const type of CARD_TYPES) {
      const walk = (items: FormSchema[]): void => {
        for (const item of items) {
          if (item.schema) walk(item.schema);
          else expect(item.name, type).toBeTruthy();
        }
      };
      walk(schemaFor(type, t));
    }
  });

  it("declares no field twice within one card", () => {
    for (const type of CARD_TYPES) {
      const seen: string[] = [];
      const walk = (items: FormSchema[]): void => {
        for (const item of items) {
          if (item.schema) walk(item.schema);
          else if (item.name) seen.push(item.name);
        }
      };
      walk(schemaFor(type, t));
      expect(new Set(seen).size, `${type}: ${seen.join(", ")}`).toBe(seen.length);
    }
  });

  /*
   * A checkbox for something the card cannot do reads as a lie, so the schema drops
   * fields whose meaning depends on another field's value.
   */
  it("adapts the climate schema to the chosen design", () => {
    const classic = fieldNames(schemaFor("custom:liquid-glass-climate-card", t, { design: "classic" }));
    const compact = fieldNames(schemaFor("custom:liquid-glass-climate-card", t, { design: "compact" }));
    expect(classic).not.toEqual(compact);
  });

  it("adapts the weather schema to the chosen layout", () => {
    const full = fieldNames(schemaFor("custom:liquid-glass-weather-card", t, { layout: "full" }));
    const row = fieldNames(schemaFor("custom:liquid-glass-weather-card", t, { layout: "row" }));
    expect(full.size).toBeGreaterThan(row.size);
  });
});

describe("fieldNames", () => {
  it("flattens grids and expandables, and skips their unnamed wrappers", () => {
    const schema: FormSchema[] = [
      { name: "entity" },
      { name: "", type: "grid", schema: [{ name: "a" }, { name: "b" }] },
      { name: "advanced", type: "expandable", schema: [{ name: "c" }] },
    ];
    expect([...fieldNames(schema)].sort()).toEqual(["a", "b", "c", "entity"]);
  });

  it("returns nothing for an empty schema", () => {
    expect(fieldNames([]).size).toBe(0);
  });
});

describe("editor metadata", () => {
  /*
   * The editor seeds every DEFAULT_ON field as checked. A name here that no schema
   * declares would silently do nothing; one missing would show an unticked box for a
   * section the card is happily rendering.
   */
  it("declares every default-on field in some card's schema", () => {
    const declared = new Set<string>();
    for (const type of CARD_TYPES) for (const name of fieldNames(schemaFor(type, t))) declared.add(name);
    const orphans = [...DEFAULT_ON].filter((name) => !declared.has(name));
    expect(orphans).toEqual([]);
  });

  it("attaches every helper to a field some card declares", () => {
    const declared = new Set<string>();
    for (const type of CARD_TYPES) for (const name of fieldNames(schemaFor(type, t))) declared.add(name);
    const orphans = Object.keys(HELPERS).filter((name) => !declared.has(name));
    expect(orphans).toEqual([]);
  });

  it("points every helper at a translated string", () => {
    for (const [field, key] of Object.entries(HELPERS)) {
      expect(t(key), `${field} -> ${key}`).not.toBe(key);
    }
  });

  /* Labels come from `ed_<field>`, so a field with no such key would render its own name. */
  it("has a label for every field of every card", () => {
    const missing: string[] = [];
    for (const type of CARD_TYPES) {
      for (const name of fieldNames(schemaFor(type, t))) {
        if (t(`ed_${name}`) === `ed_${name}`) missing.push(`${cardKind(type)}.${name}`);
      }
    }
    expect(missing).toEqual([]);
  });
});
