let componentsLoaded: Promise<void> | undefined;

/**
 * `ha-form` and its selectors ship with the Home Assistant frontend but are code-split.
 * Building a stock card's editor once forces that chunk in before our own form renders.
 *
 * This lives apart from the editor element so cards can await it without importing the
 * editor, which would close a cycle back through the card modules.
 */
export function loadHaFormComponents(): Promise<void> {
  if (!componentsLoaded) {
    componentsLoaded = (async () => {
      const loader = (window as unknown as { loadCardHelpers?: () => Promise<unknown> }).loadCardHelpers;
      if (!loader) return;
      try {
        const helpers = (await loader()) as { createCardElement?: (config: unknown) => HTMLElement };
        const card = helpers.createCardElement?.({ type: "entities", entities: [] });
        const ctor = card?.constructor as { getConfigElement?: () => unknown } | undefined;
        await ctor?.getConfigElement?.();
      } catch {
        // Older frontends expose ha-form globally; the dialog that hosts us already loaded it.
      }
    })();
  }
  return componentsLoaded;
}
