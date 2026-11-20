import { describe, expect, it } from "vitest";
import { ticksCrossed } from "./tick";

describe("ticks crossed", () => {
  it("divides the gap and keeps a short move at zero ticks", () => {
    expect(ticksCrossed(100n, 250n, 50n)).toEqual({ ticks: 3n, direction: "up" });
    expect(ticksCrossed(100n, 140n, 50n)).toEqual({ ticks: 0n, direction: "up" });
    expect(ticksCrossed(250n, 100n, 50n)).toEqual({ ticks: 3n, direction: "down" });
    expect(ticksCrossed(100n, 100n, 50n)).toEqual({ ticks: 0n, direction: "flat" });
  });
});
