import type { BaseCardConfig } from "../types";
import { fireEvent } from "../utils";

export type CardActionGesture = "tap" | "hold" | "double_tap";

const HOLD_MS = 500;
const DOUBLE_TAP_MS = 250;
const HOLD_SLOP = 10;
const SURFACE_SELECTOR = ".card, .panel, .separator";
const BLOCKING_SELECTOR = [
  "button",
  "input",
  "select",
  "textarea",
  "a[href]",
  "[contenteditable='true']",
  "[role='slider']",
  "[role='switch']",
  "[role='checkbox']",
  "[role='combobox']",
  ".cards",
].join(",");

type ConfigGetter = () => BaseCardConfig | undefined;

interface ActivePointer {
  id: number;
  x: number;
  y: number;
  held: boolean;
}

/** Card titles and icon wells are the accessible/header shortcut for the card action. */
function isHeaderShortcut(element: Element): boolean {
  return element.classList.contains("title") || element.classList.contains("icon-well");
}

/**
 * Find the card surface reached by an event, unless an independent control was used.
 * This prevents a volume slider, scene tile or nested Group child from also running the
 * outer card's action.
 */
function actionSurface(event: Event, root: ShadowRoot): Element | undefined {
  for (const target of event.composedPath()) {
    if (target === root) break;
    if (!(target instanceof Element)) continue;
    if (target.matches(SURFACE_SELECTOR)) return target;
    if (isHeaderShortcut(target)) continue;
    if (target.matches(BLOCKING_SELECTOR)) return undefined;
  }
  return undefined;
}

function pointerId(event: PointerEvent): number {
  return typeof event.pointerId === "number" ? event.pointerId : 1;
}

/**
 * Install Home Assistant-compatible tap, hold and double-tap handling on a card shadow root.
 *
 * Actions are emitted as `hass-action` instead of being implemented here. Home Assistant
 * remains responsible for confirmation dialogs, navigation, Assist, haptics and services.
 * Unconfigured gestures are deliberately allowed through to each card's existing handlers.
 */
export function installCardActionHandler(
  root: ShadowRoot,
  host: HTMLElement,
  getConfig: ConfigGetter,
): () => void {
  let activePointer: ActivePointer | undefined;
  let holdTimer: number | undefined;
  let tapTimer: number | undefined;
  let pendingTapTarget: Element | undefined;
  let suppressClick = false;
  let replayingTap = false;

  const configured = (gesture: CardActionGesture) => {
    const config = getConfig();
    return config?.[`${gesture}_action`];
  };

  const emit = (gesture: CardActionGesture) => {
    const config = getConfig();
    if (!config?.[`${gesture}_action`]) return;
    fireEvent(host, "hass-action", { config, action: gesture });
  };

  const clearHold = () => {
    window.clearTimeout(holdTimer);
    holdTimer = undefined;
    activePointer = undefined;
  };

  const stop = (event: Event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  // Pointer defaults must remain enabled: cancelling pointerdown would also cancel
  // touch scrolling and can suppress the compatibility click used by existing cards.
  const stopPropagation = (event: Event) => event.stopPropagation();

  const onPointerDown = (event: PointerEvent) => {
    if (event.button !== 0 || !configured("hold") || !actionSurface(event, root)) return;
    stopPropagation(event);
    activePointer = {
      id: pointerId(event),
      x: event.clientX,
      y: event.clientY,
      held: false,
    };
    window.clearTimeout(holdTimer);
    holdTimer = window.setTimeout(() => {
      if (!activePointer) return;
      activePointer.held = true;
      suppressClick = true;
      emit("hold");
    }, HOLD_MS);
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!activePointer || pointerId(event) !== activePointer.id) return;
    stopPropagation(event);
    if (
      Math.abs(event.clientX - activePointer.x) > HOLD_SLOP ||
      Math.abs(event.clientY - activePointer.y) > HOLD_SLOP
    ) {
      clearHold();
    }
  };

  const onPointerEnd = (event: PointerEvent) => {
    if (!activePointer || pointerId(event) !== activePointer.id) return;
    stopPropagation(event);
    clearHold();
  };

  const replayDefaultTap = (target: Element | undefined) => {
    if (!target?.isConnected) return;
    replayingTap = true;
    try {
      target.dispatchEvent(new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: 1,
      }));
    } finally {
      replayingTap = false;
    }
  };

  const finishPendingTap = () => {
    tapTimer = undefined;
    const target = pendingTapTarget;
    pendingTapTarget = undefined;
    if (configured("tap")) emit("tap");
    else replayDefaultTap(target);
  };

  const onClick = (event: MouseEvent) => {
    if (replayingTap) return;
    if (!actionSurface(event, root)) return;

    if (suppressClick) {
      suppressClick = false;
      stop(event);
      return;
    }

    if (configured("double_tap")) {
      stop(event);
      if (tapTimer !== undefined) {
        window.clearTimeout(tapTimer);
        tapTimer = undefined;
        pendingTapTarget = undefined;
        emit("double_tap");
      } else {
        pendingTapTarget = event.target instanceof Element ? event.target : undefined;
        tapTimer = window.setTimeout(finishPendingTap, DOUBLE_TAP_MS);
      }
      return;
    }

    if (configured("tap")) {
      stop(event);
      emit("tap");
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if ((event.key !== "Enter" && event.key !== " ") || !configured("tap")) return;
    if (!actionSurface(event, root)) return;
    stop(event);
    emit("tap");
  };

  const onContextMenu = (event: Event) => {
    if (configured("hold") && actionSurface(event, root)) stop(event);
  };

  root.addEventListener("pointerdown", onPointerDown as EventListener, true);
  root.addEventListener("pointermove", onPointerMove as EventListener, true);
  root.addEventListener("pointerup", onPointerEnd as EventListener, true);
  root.addEventListener("pointercancel", onPointerEnd as EventListener, true);
  root.addEventListener("click", onClick as EventListener, true);
  root.addEventListener("keydown", onKeyDown as EventListener, true);
  root.addEventListener("contextmenu", onContextMenu, true);

  return () => {
    window.clearTimeout(holdTimer);
    window.clearTimeout(tapTimer);
    root.removeEventListener("pointerdown", onPointerDown as EventListener, true);
    root.removeEventListener("pointermove", onPointerMove as EventListener, true);
    root.removeEventListener("pointerup", onPointerEnd as EventListener, true);
    root.removeEventListener("pointercancel", onPointerEnd as EventListener, true);
    root.removeEventListener("click", onClick as EventListener, true);
    root.removeEventListener("keydown", onKeyDown as EventListener, true);
    root.removeEventListener("contextmenu", onContextMenu, true);
  };
}
