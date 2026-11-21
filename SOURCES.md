# Sources

| Source | Use |
| --- | --- |
| [docs.alcor.exchange/api](https://docs.alcor.exchange/api) | v3 `price` stream is a live mid. This lab is not that stream |
| [SECURITY.md](SECURITY.md) | Whole steps of a spacing |

## Product facts

- 100 to 140 at spacing 50 is **0** ticks crossed, and the move is still up.
- A tick here is `floor` of a teaching spacing. It is not an Alcor tick index and not a v3 `block` update.
- No HTTP. The repository name's `v2` is not `/api/v2/tickers`.
- The step count ports. It does not know WAX versus EOS until a caller supplies prices in one symbol.

## Alcor HTTP (this lab does not call it)

The `v2` in the repository name is historical. It is not the HTTP version, and it is not an instruction to keep a new client on `/api/v2`.

[docs.alcor.exchange/api](https://docs.alcor.exchange/api) is the reference. Checked against that index:

| Job | Call | Status |
| --- | --- | --- |
| New token, pool, price, depth | `https://<chain>.alcor.exchange/api/v3/market/...` | Preferred |
| Live updates | `wss://<chain>.alcor.exchange/api/v3/market/stream` | Preferred over polling |
| TVL, volume, scores | `/api/v3/analytics/...` on the same chain host | Preferred |
| Cross-chain feed | `https://api.alcor.exchange/v3/feed/...` | Ids include `wax`, `eos`, `telos`, or `xpr` |
| Spot pairs, tickers, candles, AMM lists | `/api/v2/pairs`, `/api/v2/tickers`, `/api/v2/amm/...` | **Still hosted.** Not what this lab uses |

`<chain>` is `wax`, `eos`, `telos`, or `proton`. `https://alcor.exchange/api/` redirects to WAX. The XPR feed prefix is `xpr`, not `proton`.

Token id is `<symbol>-<contract>` lowercase (`wax-eosio.token`, `tlm-alien.worlds`). On-chain, the market row's `base_token` is the **API target** (the quote). `quote_token` is the API base.

v2 errors are plain text. v3 errors are `{"error":"..."}`.

| Chain | Spot contract | AMM contract |
| --- | --- | --- |
| WAX | `alcordexmain` | `swap.alcor` |
| EOS | `eostokensdex` | `swap.alcor` |
| Telos | `eostokensdex` | `swap.alcor` |
| XPR | `alcor` | `swap.alcor` |

The same AMM account name is not the same table. Integer rules in this lab do port. Those account names do not.

WharfKit, if a later host signs: [wharfkit/skill](https://github.com/wharfkit/skill) (`git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit`). There is no Alcor MCP to install. Do not invent one.

