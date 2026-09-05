// @vitest-environment jsdom
import { describe, expect, it } from "vitest";
import { adoptCardStyles, supportsConstructedSheets } from "./card-sheets";

function shadowRoot(): ShadowRoot {
  return document.createElement("div").attachShadow({ mode: "open" });
}

describe.runIf(supportsConstructedSheets)("adoptCardStyles", () => {
  it("adopts the parts in the order they were given", () => {
    const root = shadowRoot();
    expect(adoptCardStyles(root, [".a{color:red}", ".b{color:blue}"])).toBe(true);
    expect(root.adoptedStyleSheets).toHaveLength(2);
    expect(root.adoptedStyleSheets[0].cssRules[0].cssText).toContain(".a");
    expect(root.adoptedStyleSheets[1].cssRules[0].cssText).toContain(".b");
  });

  /*
   * The whole point of the change: one parsed copy of the shared rules for the entire
   * dashboard, rather than one per card instance.
   */
  it("hands every root the same sheet object for the same CSS", () => {
    const first = shadowRoot();
    const second = shadowRoot();
    const shared = ".shared{color:green}";

    adoptCardStyles(first, [shared, ".own-a{}"]);
    adoptCardStyles(second, [shared, ".own-b{}"]);

    expect(first.adoptedStyleSheets[0]).toBe(second.adoptedStyleSheets[0]);
    expect(first.adoptedStyleSheets[1]).not.toBe(second.adoptedStyleSheets[1]);
  });

  it("reports failure instead of throwing when there is no root", () => {
    expect(adoptCardStyles(null, [".a{}"])).toBe(false);
    expect(adoptCardStyles(undefined, [".a{}"])).toBe(false);
  });
});
