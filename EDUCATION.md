# Education — whole steps of a spacing

> **Rung:** `npm test` passes. `ticksCrossed` divides a price gap by a spacing. It is not a Uniswap log tick, not an Alcor tick, and not a velocity.  
> **The test is the rule.** A band around an entry is [wax-alcor-v2-range-optimizer](https://github.com/pixel-journey/wax-alcor-v2-range-optimizer).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Count whole steps and name direction |
| Intermediate | Keep remainder dropped and flat when prices equal |
| Masterclass | Separate this integer gap from Alcor’s real tick math |

---

## Beginner — one scene

Integer division. The remainder is dropped.

| Call | Locked result |
| --- | --- |
| `ticksCrossed(100n, 250n, 50n)` | `{ ticks: 3n, direction: "up" }` |
| `ticksCrossed(100n, 140n, 50n)` | `{ ticks: 0n, direction: "up" }` |
| `ticksCrossed(250n, 100n, 50n)` | `{ ticks: 3n, direction: "down" }` |
| `ticksCrossed(100n, 100n, 50n)` | `{ ticks: 0n, direction: "flat" }` |

Direction is the **sign** of the move, even when zero whole steps fit.

```bash
npm test
```

---

## Intermediate

| Rule | Detail |
| --- | --- |
| Steps | `floor(|to - from| / spacing)` |
| Direction | up / down / flat from the price change sign |
| Zero ticks + up | price rose, but no whole step fits |

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Round 40/50 up to 1 tick | stays 0 |
| Call direction only when ticks > 0 | direction is sign anyway |
| Cite as Uniswap tick | integer gap only |

### Exercises

1. 100 → 140 at spacing 50 — ticks? (**0**.)  
2. Direction of that move? (**up**.)  
3. Equal prices — direction? (**flat**.)

---

## Masterclass

Alcor’s concentrated pools use their own tick encoding. This lab only teaches “how many whole spacing units fit in a gap.” Prefer WharfKit + live market reads for production quotes — not this pure helper alone.

---

## What this course will not teach

- Live Alcor tick streams
- Velocity in ticks per second
- That zero ticks means the price did not move
