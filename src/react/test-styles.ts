/**
 * The CSS a card actually applied to its shadow root, whichever route it took.
 *
 * Cards normally adopt constructed stylesheets and render no `<style>` at all; where
 * those are unavailable they fall back to one. Tests care about the rules, not the
 * mechanism, so read both.
 */
export function shadowCss(root: ShadowRoot | null | undefined): string {
  if (!root) return "";
  const adopted = root.adoptedStyleSheets
    ?.map((sheet) => [...sheet.cssRules].map((rule) => rule.cssText).join("\n"))
    .join("\n") ?? "";
  const inline = [...root.querySelectorAll("style")].map((tag) => tag.textContent ?? "").join("\n");
  return `${adopted}\n${inline}`;
}
