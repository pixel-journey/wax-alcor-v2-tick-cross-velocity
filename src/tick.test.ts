import { describe, expect, it } from "vitest";
import { ticksCrossed } from "./tick";

describe("ticks crossed", () => {
  it("divides the gap and keeps a short move at zero ticks", () => {
    expect(ticksCrossed(100n, 250n, 50n)).toEqual({ ticks: 3n, direction: "up" });
    expect(ticksCrossed(100n, 140n, 50n)).toEqual({ ticks: 0n, direction: "up" });
    expect(ticksCrossed(250n, 100n, 50n)).toEqual({ ticks: 3n, direction: "down" });
    expect(ticksCrossed(100n, 100n, 50n)).toEqual({ ticks: 0n, direction: "flat" });
  });

  it("drops the remainder (integer division)", () => {
    // 40 gap / 50 spacing = 0 whole steps; direction still up
    expect(ticksCrossed(100n, 140n, 50n).ticks).toBe(0n);
    // 99 / 50 = 1
    expect(ticksCrossed(100n, 199n, 50n)).toEqual({ ticks: 1n, direction: "up" });
  });

  it("refuses non-positive prices", () => {
    expect(() => ticksCrossed(0n, 100n, 50n)).toThrow(/prices must be positive/);
    expect(() => ticksCrossed(100n, 0n, 50n)).toThrow(/prices must be positive/);
    expect(() => ticksCrossed(-1n, 100n, 50n)).toThrow(/prices must be positive/);
  });

  it("refuses non-positive tick spacing", () => {
    expect(() => ticksCrossed(100n, 200n, 0n)).toThrow(/tick must be positive/);
    expect(() => ticksCrossed(100n, 200n, -5n)).toThrow(/tick must be positive/);
  });
});
