// @vitest-environment jsdom
import { act } from "./test-act";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GlassSlider, type GlassSliderProps } from "./glass-slider";


class ResizeObserverStub implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
}
globalThis.ResizeObserver = ResizeObserverStub;

const TRACK_WIDTH = 300;
const THUMB_WIDTH = 22;
/** What a pointer at `clientX` maps to, given the thumb is centred under the finger. */
const travel = TRACK_WIDTH - THUMB_WIDTH;

let root: Root | undefined;
let container: HTMLElement | undefined;

function rect(width: number): DOMRect {
  return {
    left: 0, right: width, width, top: 0, bottom: 44, height: 44, x: 0, y: 0,
    toJSON: () => ({}),
  };
}

interface Harness {
  track: HTMLElement;
  onInput: ReturnType<typeof vi.fn>;
  onChange: ReturnType<typeof vi.fn>;
}

function render(props: Partial<GlassSliderProps> = {}): Harness {
  const onInput = vi.fn();
  const onChange = vi.fn();
  act(() => root?.render(
    <GlassSlider
      value={50}
      min={0}
      max={100}
      step={1}
      label="Brightness"
      refraction={false}
      onInput={onInput}
      onChange={onChange}
      {...props}
    />,
  ));

  const track = container?.querySelector<HTMLElement>(".slider-track");
  if (!track) throw new Error("slider did not render a track");
  const wrapper = container?.querySelector<HTMLElement>(".lg-react-slider");
  for (const node of [track, wrapper]) {
    Object.defineProperty(node, "getBoundingClientRect", { value: () => rect(TRACK_WIDTH), configurable: true });
  }
  Object.defineProperty(track, "setPointerCapture", { value: () => undefined, configurable: true });
  Object.defineProperty(track, "hasPointerCapture", { value: () => true, configurable: true });
  Object.defineProperty(track, "releasePointerCapture", { value: () => undefined, configurable: true });
  // The knob probe reports the thumb size the geometry maths is built on.
  const probe = container?.querySelector<HTMLElement>(".knob-probe");
  if (probe) {
    Object.defineProperty(probe, "getBoundingClientRect", {
      value: () => ({ ...rect(THUMB_WIDTH), height: 34, bottom: 34 }) as DOMRect,
      configurable: true,
    });
  }
  return { track, onInput, onChange };
}

function pointer(node: HTMLElement, type: string, clientX: number, pointerId = 1): void {
  const event = new Event(type, { bubbles: true, cancelable: true }) as Event & Record<string, unknown>;
  event.pointerId = pointerId;
  event.clientX = clientX;
  event.clientY = 20;
  event.button = 0;
  act(() => void node.dispatchEvent(event));
}

function press(node: HTMLElement, key: string): void {
  act(() => void node.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true, cancelable: true })));
}

beforeEach(() => {
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(() => {
  act(() => root?.unmount());
  container?.remove();
});

describe("GlassSlider accessibility", () => {
  it("presents itself as a labelled, focusable slider", () => {
    const { track } = render({ value: 40 });
    expect(track.getAttribute("role")).toBe("slider");
    expect(track.getAttribute("aria-label")).toBe("Brightness");
    expect(track.getAttribute("aria-valuemin")).toBe("0");
    expect(track.getAttribute("aria-valuemax")).toBe("100");
    expect(track.getAttribute("aria-valuenow")).toBe("40");
    expect(track.tabIndex).toBe(0);
  });

  it("exposes a range as two independently labelled sliders", () => {
    const { track } = render({ value: 18, highValue: 24 });
    expect(track.getAttribute("role")).toBe("group");
    expect(track.getAttribute("aria-valuenow")).toBeNull();
    expect(track.getAttribute("aria-valuetext")).toBeNull();
    const handles = track.querySelectorAll<HTMLElement>(".slider-range-handle");
    expect(handles).toHaveLength(2);
    expect(handles[0].getAttribute("aria-label")).toBe("Brightness low");
    expect(handles[0].getAttribute("aria-valuenow")).toBe("18");
    expect(handles[0].getAttribute("aria-valuemax")).toBe("24");
    expect(handles[1].getAttribute("aria-label")).toBe("Brightness high");
    expect(handles[1].getAttribute("aria-valuemin")).toBe("18");
    expect(handles[1].getAttribute("aria-valuenow")).toBe("24");
  });

  it("prefers a caller-supplied value text, which can carry a unit", () => {
    const { track } = render({ value: 21, valueText: "21 °C" });
    expect(track.getAttribute("aria-valuetext")).toBe("21 °C");
  });

  it("leaves the tab order when disabled", () => {
    const { track } = render({ disabled: true });
    expect(track.tabIndex).toBe(-1);
    expect(track.getAttribute("aria-disabled")).toBe("true");
  });
});

describe("GlassSlider keyboard", () => {
  it("steps up and down with both arrow axes", () => {
    const { track, onChange } = render({ value: 50, step: 1 });
    press(track, "ArrowRight");
    press(track, "ArrowUp");
    press(track, "ArrowLeft");
    press(track, "ArrowDown");
    expect(onChange.mock.calls.map((call) => call[0])).toEqual([51, 51, 49, 49]);
  });

  it("jumps to the ends with Home and End", () => {
    const { track, onChange } = render({ value: 50, min: 10, max: 90 });
    press(track, "Home");
    press(track, "End");
    expect(onChange.mock.calls.map((call) => call[0])).toEqual([10, 90]);
  });

  it("clamps at the ends instead of running past them", () => {
    const { track, onChange } = render({ value: 100, max: 100, step: 5 });
    press(track, "ArrowRight");
    expect(onChange).toHaveBeenCalledWith(100, "low");
  });

  it("uses the coarser keyboard step when one is given", () => {
    const { track, onChange } = render({ value: 50, step: 0.01, keyboardStep: 5 });
    press(track, "ArrowRight");
    expect(onChange).toHaveBeenCalledWith(55, "low");
  });

  it("ignores keys that are not slider controls", () => {
    const { track, onChange } = render();
    press(track, "a");
    press(track, "Enter");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("does nothing while disabled", () => {
    const { track, onChange } = render({ disabled: true });
    press(track, "ArrowRight");
    expect(onChange).not.toHaveBeenCalled();
  });

  it("drives each range handle from its own keyboard focus target", () => {
    const { track, onChange } = render({ value: 18, highValue: 24 });
    const [low, high] = track.querySelectorAll<HTMLElement>(".slider-range-handle");
    press(low, "ArrowRight");
    press(high, "ArrowLeft");
    expect(onChange.mock.calls).toEqual([[19, "low"], [23, "high"]]);
  });
});

describe("GlassSlider pointer", () => {
  it("reports the value under the finger on press, and again on release", () => {
    const { track, onInput, onChange } = render({ value: 0, min: 0, max: 100, step: 1 });

    pointer(track, "pointerdown", THUMB_WIDTH / 2 + travel / 2);
    expect(onInput).toHaveBeenCalledWith(50, "low");

    pointer(track, "pointerup", THUMB_WIDTH / 2 + travel / 2);
    expect(onChange).toHaveBeenCalledWith(50, "low");
  });

  it("streams values while dragging", () => {
    const { track, onInput } = render({ value: 0, step: 1 });
    pointer(track, "pointerdown", THUMB_WIDTH / 2);
    onInput.mockClear();

    pointer(track, "pointermove", THUMB_WIDTH / 2 + travel / 4);
    pointer(track, "pointermove", THUMB_WIDTH / 2 + travel / 2);

    const streamed = onInput.mock.calls.map((call) => call[0] as number);
    expect(streamed).toHaveLength(2);
    expect(streamed[1]).toBeGreaterThan(streamed[0]);
  });

  it("settles inside the range even when the drag overshoots the end", () => {
    const { track, onChange } = render({ value: 50, min: 0, max: 100, step: 1 });
    pointer(track, "pointerdown", THUMB_WIDTH / 2 + travel / 2);
    pointer(track, "pointermove", 5000);
    pointer(track, "pointerup", 5000);
    expect(onChange).toHaveBeenLastCalledWith(100, "low");
  });

  /* A second finger must not hijack a drag already in progress. */
  it("ignores pointers other than the one that started the drag", () => {
    const { track, onInput } = render({ value: 0, step: 1 });
    pointer(track, "pointerdown", THUMB_WIDTH / 2, 1);
    onInput.mockClear();
    pointer(track, "pointermove", THUMB_WIDTH / 2 + travel, 2);
    expect(onInput).not.toHaveBeenCalled();
  });

  it("picks the nearer handle on a range slider", () => {
    const { track, onInput } = render({ value: 10, highValue: 90, min: 0, max: 100, step: 1 });
    pointer(track, "pointerdown", THUMB_WIDTH / 2 + travel * 0.85);
    expect(onInput.mock.calls[0][1]).toBe("high");

    pointer(track, "pointerup", THUMB_WIDTH / 2 + travel * 0.85);
    pointer(track, "pointerdown", THUMB_WIDTH / 2 + travel * 0.05, 2);
    expect(onInput.mock.calls[onInput.mock.calls.length - 1][1]).toBe("low");
  });

  it("does not start a drag while disabled", () => {
    const { track, onInput } = render({ disabled: true });
    pointer(track, "pointerdown", THUMB_WIDTH / 2 + travel / 2);
    expect(onInput).not.toHaveBeenCalled();
  });

  it("treats a cancelled pointer as a release, so the knob is never left stuck", () => {
    const { track, onChange } = render({ value: 0, step: 1 });
    pointer(track, "pointerdown", THUMB_WIDTH / 2 + travel / 2);
    pointer(track, "pointercancel", THUMB_WIDTH / 2 + travel / 2);
    expect(onChange).toHaveBeenCalledOnce();

    // The drag really ended: a fresh press is accepted.
    onChange.mockClear();
    pointer(track, "pointerdown", THUMB_WIDTH / 2);
    pointer(track, "pointerup", THUMB_WIDTH / 2);
    expect(onChange).toHaveBeenCalledOnce();
  });
});

describe("GlassSlider rendering", () => {
  it("draws the requested number of step marks", () => {
    render({ ticks: 5 });
    expect(container?.querySelectorAll(".marks span")).toHaveLength(5);
  });

  it("draws no marks by default", () => {
    render();
    expect(container?.querySelector(".marks")).toBeNull();
  });

  it("omits the knob for a progress-only control", () => {
    render({ showKnob: false });
    expect(container?.querySelector(".slider-knob")).toBeNull();
  });

  it("places an anchor when the fill starts somewhere other than the left", () => {
    render({ fillFrom: 50 });
    expect(container?.querySelector(".slider-anchor")).toBeTruthy();
  });
});
