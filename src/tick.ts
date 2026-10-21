/**
 * How many whole ticks fit between two prices.
 * Not a velocity and not an Alcor feed.
 */

export type Cross = { ticks: bigint; direction: "up" | "down" | "flat" };

export function ticksCrossed(from: bigint, to: bigint, tick: bigint): Cross {
  if (from <= 0n || to <= 0n) throw new Error("prices must be positive");
  if (tick <= 0n) throw new Error("tick must be positive");
  const delta = to - from;
  const direction = delta > 0n ? "up" : delta < 0n ? "down" : "flat";
  const span = delta < 0n ? -delta : delta;
  return { ticks: span / tick, direction };
}
