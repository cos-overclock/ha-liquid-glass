import { describe, expect, it, vi } from "vitest";
import {
  downsamplePoints,
  fetchHistory,
  mergeStreamStates,
  subscribeHistory,
  toSeries,
  trendOver,
  trimToWindow,
  type HistoryPoint,
} from "./history";
import type { HomeAssistant } from "./types";

const HOUR = 3600_000;

function hassWith(overrides: Partial<HomeAssistant> = {}): HomeAssistant {
  return {
    states: {},
    language: "en",
    callService: async () => undefined,
    callApi: async <T,>() => undefined as T,
    ...overrides,
  };
}

/** A socket that hands the test the callback and the command the card sent. */
function fakeConnection() {
  const sent: Record<string, unknown>[] = [];
  let push: ((message: unknown) => void) | undefined;
  const unsubscribe = vi.fn(async () => {});
  const connection = {
    subscribeMessage: vi.fn(async (callback: (message: never) => void, message: Record<string, unknown>) => {
      sent.push(message);
      push = callback as (message: unknown) => void;
      return unsubscribe;
    }),
  } as unknown as NonNullable<HomeAssistant["connection"]>;
  return { connection, sent, unsubscribe, emit: (message: unknown) => push?.(message) };
}

describe("trimToWindow", () => {
  it("keeps the last reading from before the window and moves it onto the cutoff", () => {
    const points: HistoryPoint[] = [
      { t: 0, v: 1 },
      { t: 100, v: 2 },
      { t: 300, v: 3 },
    ];

    expect(trimToWindow(points, 200)).toEqual([
      { t: 200, v: 2 },
      { t: 300, v: 3 },
    ]);
  });

  it("leaves a series that starts inside the window alone", () => {
    const points: HistoryPoint[] = [{ t: 500, v: 1 }, { t: 900, v: 2 }];
    expect(trimToWindow(points, 200)).toEqual(points);
  });
});

describe("mergeStreamStates", () => {
  it("appends the new states in seconds as milliseconds", () => {
    const merged = mergeStreamStates([], [{ s: "21.5", lu: 1000 }, { s: "22", lu: 1060 }]);
    expect(merged).toEqual([{ t: 1_000_000, v: 21.5 }, { t: 1_060_000, v: 22 }]);
  });

  it("ignores a chunk that repeats what the client already has", () => {
    const points = [{ t: 1_000_000, v: 21.5 }];
    expect(mergeStreamStates(points, [{ s: "21.5", lu: 1000 }, { s: "9", lu: 900 }])).toEqual(points);
  });

  it("skips states that are not numbers", () => {
    expect(mergeStreamStates([], [{ s: "unavailable", lu: 1000 }, { s: "3", lu: 1100 }]))
      .toEqual([{ t: 1_100_000, v: 3 }]);
  });
});

describe("toSeries", () => {
  it("appends the current reading so the line reaches the right edge", () => {
    const now = 10 * HOUR;
    const series = toSeries([{ t: now - 2 * HOUR, v: 10 }], 14, 24, now);

    expect(series.points[series.points.length - 1]).toEqual({ t: now, v: 14 });
  });

  it("measures the trend against the reading from an hour ago", () => {
    const now = 10 * HOUR;
    const series = toSeries(
      [{ t: now - 3 * HOUR, v: 10 }, { t: now - 30 * 60_000, v: 12 }],
      14,
      24,
      now,
    );

    expect(series.trend).toBe(4);
  });

  it("has no series at all before any history has arrived", () => {
    expect(toSeries([], undefined, 24)).toEqual({ points: [], trend: undefined });
  });
});

describe("fetchHistory", () => {
  it("reads both the verbose and the minimal row spelling", async () => {
    const stamp = new Date(1_000_000).toISOString();
    const hass = hassWith({
      callApi: (async () => [[{ state: "21", last_changed: stamp }, { s: "22", lu: 1100 }]]) as HomeAssistant["callApi"],
    });

    await expect(fetchHistory(hass, "sensor.x", 24)).resolves.toEqual([
      { t: 1_000_000, v: 21 },
      { t: 1_100_000, v: 22 },
    ]);
  });

  it("answers with nothing when the request fails", async () => {
    const hass = hassWith({ callApi: (async () => { throw new Error("nope"); }) });
    await expect(fetchHistory(hass, "sensor.x", 24)).resolves.toEqual([]);
  });
});

describe("subscribeHistory", () => {
  it("asks for the window over the socket and merges every chunk it sends back", async () => {
    const { connection, sent, emit, unsubscribe } = fakeConnection();
    const seen: HistoryPoint[][] = [];
    const stop = await subscribeHistory(hassWith({ connection }), "sensor.x", 6, (points) => {
      seen.push(points);
    });

    expect(sent[0]).toMatchObject({
      type: "history/stream",
      entity_ids: ["sensor.x"],
      minimal_response: true,
      no_attributes: true,
      significant_changes_only: false,
    });

    emit({ states: { "sensor.x": [{ s: "20", lu: 1000 }] } });
    emit({ states: { "sensor.y": [{ s: "99", lu: 1100 }] } });
    emit({ states: { "sensor.x": [{ s: "21", lu: 1200 }] } });

    expect(seen).toHaveLength(2);
    expect(seen[1]).toEqual([{ t: 1_000_000, v: 20 }, { t: 1_200_000, v: 21 }]);

    stop();
    expect(unsubscribe).toHaveBeenCalledOnce();
  });

  it("rejects when the host has no socket, so the caller can poll instead", async () => {
    await expect(subscribeHistory(hassWith(), "sensor.x", 24, () => {})).rejects.toThrow();
  });
});

describe("downsamplePoints", () => {
  it("bounds dense histories while retaining endpoints and extrema", () => {
    const points = Array.from({ length: 10_000 }, (_, index) => ({
      t: index,
      v: index === 4321 ? -100 : index === 7654 ? 100 : Math.sin(index),
    }));
    const sampled = downsamplePoints(points, 100);

    expect(sampled.length).toBeLessThanOrEqual(100);
    expect(sampled[0]).toEqual(points[0]);
    expect(sampled[sampled.length - 1]).toEqual(points[points.length - 1]);
    expect(sampled).toContainEqual(points[4321]);
    expect(sampled).toContainEqual(points[7654]);
  });
});

describe("trendOver", () => {
  it("has no answer from a single reading", () => {
    expect(trendOver([{ t: 0, v: 1 }])).toBeUndefined();
  });
});
