/**
 * Shared, parsed stylesheets for a card's shadow root.
 *
 * Every card used to inline `${tokens}${reactCardStyles}${glassSurfaceStyles}` plus its
 * own CSS into a `<style>` element — roughly 13KB of identical text re-parsed into a
 * separate CSSOM for every card *instance* on the dashboard. A constructed stylesheet is
 * parsed once and adopted by as many roots as we like.
 *
 * Cards pass their CSS as the list of parts they compose, rather than one joined string,
 * so each part is cached on its own: `tokens` is parsed once for the whole bundle,
 * `glassSliderStyles` once for the five cards that use it, and a card's own rules once
 * for all of its instances. Keeping the parts separate also preserves each card's exact
 * cascade order, which a single shared prefix could not.
 */

/** True where `adoptedStyleSheets` can be used; Safari below 16.4 rejects `replaceSync`. */
export const supportsConstructedSheets = typeof CSSStyleSheet === "function"
  && (() => {
    try {
      new CSSStyleSheet().replaceSync("");
      return true;
    } catch {
      return false;
    }
  })();

const sheets = new Map<string, CSSStyleSheet>();

function sheetFor(css: string): CSSStyleSheet {
  const cached = sheets.get(css);
  if (cached) return cached;
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(css);
  sheets.set(css, sheet);
  return sheet;
}

/** Adopt `parts` into `root`, in order. Returns false when the root cannot take them. */
export function adoptCardStyles(
  root: ShadowRoot | null | undefined,
  parts: readonly string[],
): boolean {
  if (!root || !supportsConstructedSheets) return false;
  root.adoptedStyleSheets = parts.map(sheetFor);
  return true;
}
