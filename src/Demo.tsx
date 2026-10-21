"use client";

import { ticksCrossed } from "./tick";

export function Demo() {
  const crossed = ticksCrossed(100n, 250n, 50n);
  const short = ticksCrossed(100n, 140n, 50n);
  return (
    <main className="wrap">
      <p className="kicker">Educational reference</p>
      <h1>Whole ticks between two prices</h1>
      <p className="lede">100 to 250 with a tick of 50 is 3 up. 100 to 140 is still up, but 0 whole ticks. Not a velocity.</p>
      <p>
        {crossed.ticks.toString()} {crossed.direction}. Short move {short.ticks.toString()} {short.direction}.
      </p>
    </main>
  );
}
