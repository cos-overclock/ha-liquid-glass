// @vitest-environment jsdom
import { act } from "./test-act";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useVisibleTick } from "./use-visible-tick";


/** Lets a test drive intersection changes for the observed element. */
let notifyIntersecting: ((isIntersecting: boolean) => void) | undefined;

class IntersectionObserverStub {
  constructor(private readonly callback: IntersectionObserverCallback) {
    notifyIntersecting = (isIntersecting) => {
      this.callback(
        [{ isIntersecting } as IntersectionObserverEntry],
        this as unknown as IntersectionObserver,
      );
    };
  }
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] { return []; }
}

let root: Root | undefined;
let container: HTMLElement | undefined;
let ticks: number[] = [];

function Probe({ intervalMs, enabled }: { intervalMs: number; enabled?: boolean }) {
  const host = container as HTMLElement;
  ticks.push(useVisibleTick(host, intervalMs, enabled));
  return null;
}

function render(props: { intervalMs: number; enabled?: boolean }): void {
  void act(() => root?.render(<Probe {...props} />));
}

const latest = () => ticks[ticks.length - 1];

beforeEach(() => {
  vi.useFakeTimers();
  ticks = [];
  vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});

afterEach(() => {
  void act(() => root?.unmount());
  container?.remove();
  notifyIntersecting = undefined;
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("useVisibleTick", () => {
  it("advances on the interval while the card is on screen", () => {
    render({ intervalMs: 1000 });
    expect(latest()).toBe(0);

    void act(() => void vi.advanceTimersByTime(3000));
    expect(latest()).toBe(3);
  });

  it("does not advance once the card scrolls out of view", () => {
    render({ intervalMs: 1000 });
    void act(() => void vi.advanceTimersByTime(1000));
    const before = latest();

    void act(() => notifyIntersecting?.(false));
    void act(() => void vi.advanceTimersByTime(10_000));

    expect(latest()).toBe(before);
  });

  /*
   * Whatever was fetched before the card went quiet is stale by the time it comes
   * back, so returning has to refresh once rather than wait out a whole interval.
   */
  it("catches up once when the card comes back into view", () => {
    render({ intervalMs: 1000 });
    void act(() => notifyIntersecting?.(false));
    void act(() => void vi.advanceTimersByTime(10_000));
    const whileHidden = latest();

    void act(() => notifyIntersecting?.(true));
    expect(latest()).toBe(whileHidden + 1);
  });

  it("does not fire a catch-up on the very first render", () => {
    render({ intervalMs: 1000 });
    expect(latest()).toBe(0);
  });

  it("stays still while disabled, however visible the card is", () => {
    render({ intervalMs: 1000, enabled: false });
    void act(() => void vi.advanceTimersByTime(10_000));
    expect(latest()).toBe(0);
  });

  it("stops while the tab is in the background", () => {
    render({ intervalMs: 1000 });
    const visibility = vi.spyOn(document, "visibilityState", "get").mockReturnValue("hidden");
    void act(() => document.dispatchEvent(new Event("visibilitychange")));

    void act(() => void vi.advanceTimersByTime(10_000));
    expect(latest()).toBe(0);

    visibility.mockReturnValue("visible");
    void act(() => document.dispatchEvent(new Event("visibilitychange")));
    expect(latest()).toBe(1);
    visibility.mockRestore();
  });
});
