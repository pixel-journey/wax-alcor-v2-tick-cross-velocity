# Security — tick-cross velocity (teaching spacing)

## Closed in tests

| Issue | Behavior |
| --- | --- |
| 100 → 140 at spacing 50 | **0** steps crossed; direction still **up** |
| Spacing floor | teaching integer only |
| Network | not called |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Alcor tick index | **Not** this product |
| Live mid / stream | Prefer v3 market stream outside this package |
| Trading signal | Step count is not a signal |

## Attack angles

1. Calling the floor an Alcor tick index.  
2. Fetching `/api/v3/market` and claiming this lab did it.  
3. Renaming the formula "v3 upgrade" while keeping HTTP out.  
4. Authorizing trades from step count alone.

## Honesty limits

Pure spacing arithmetic. Repo name `v2` is historical, not an HTTP version.

| Sibling | Distinction |
| --- | --- |
| [depth radar](https://github.com/pixel-journey/wax-alcor-orderbook-depth-radar) | Mid-excluded imbalance |
| [range backtester](https://github.com/pixel-journey/wax-alcor-v2-range-efficiency-backtester) | Fee product floor |

[docs.alcor.exchange/api](https://docs.alcor.exchange/api) — v2 still hosted; **v3** for new clients. No Alcor MCP.
