# AI handoff — tick-cross velocity (teaching spacing)

## Non-negotiables

1. 100 → 140 at spacing 50 is **0** ticks crossed, and the move is still **up**.
2. A "tick" here is `floor` of a teaching spacing — **not** an Alcor tick index and not a v3 `block` update.
3. **No HTTP.** Repo name `v2` is not `/api/v2/tickers`.
4. v2 market data is still hosted; **new** clients use `/api/v3/market` / stream / analytics / feed. This lab calls none.
5. The step count ports. It does not know WAX vs EOS until the caller supplies prices in one symbol.
6. No Alcor MCP. Do not invent one.

## Prompt seeds

- "Show why 100 to 140 at spacing 50 is 0 steps but still up."
- "User pastes GET /api/v3/market/price — refuse to mix into the floor spacing."
- "Point at docs.alcor.exchange/api for a live client; leave this formula alone."

## Do not

- Rename the floor to "upgrade to v3".
- Call this an Alcor tick index.
- Fetch a stream to finish the lab.
