# Education — whole steps of a spacing

> **Rung:** `npm test` passes. `ticksCrossed` divides a price gap by a spacing. It is not a Uniswap log tick, not an Alcor tick, and not a velocity.  
> **The test is the rule.** A band around an entry is [wax-alcor-v2-range-optimizer](https://github.com/pixel-journey/wax-alcor-v2-range-optimizer). Alcor's own code is [alcor-exchange](https://github.com/alcor-exchange).

## Predict, then run

Integer division. The remainder is dropped.

| Call | Locked result |
| --- | --- |
| `ticksCrossed(100n, 250n, 50n)` | `{ ticks: 3n, direction: "up" }` |
| `ticksCrossed(100n, 140n, 50n)` | `{ ticks: 0n, direction: "up" }`. The price rose. No whole step fits. Direction is the sign, not "a tick was crossed." |
| `ticksCrossed(250n, 100n, 50n)` | `{ ticks: 3n, direction: "down" }` |
| `ticksCrossed(100n, 100n, 50n)` | `{ ticks: 0n, direction: "flat" }` |

The HTTP examples include an Atomic Packs `unboxassets` row. That request is unsent, and it is not this division.
