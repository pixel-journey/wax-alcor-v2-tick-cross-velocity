import { HISTORY_ORIGIN, historyActions } from "./api";
import { ticksCrossed } from "./tick";
import type { ChainAction, HttpRequest } from "./api";

export type UseCase = {
  title: string;
  detail: string;
  request: HttpRequest;
  transaction: { note: string; actions: ChainAction[] } | null;
};

const crossed = ticksCrossed(100n, 250n, 50n);

export const USE_CASES: UseCase[] = [
  {
    title: "The market list is not a tick size",
    detail: `100 to 250 at a tick of 50 is ${crossed.ticks.toString()} ${crossed.direction}. 100 to 140 is 0 ticks and still up. GET /api/markets is not parsed.`,
    request: { method: "GET", url: "https://wax.alcor.exchange/api/markets", executed: false },
    transaction: null,
  },
  {
    title: "Swap transfers are not a velocity",
    detail: "No swap is built from a tick count.",
    request: historyActions(HISTORY_ORIGIN, "swap.alcor", "eosio.token:transfer", 20),
    transaction: null,
  },
];

export function assertUseCases(): void {
  if (crossed.ticks !== 3n || ticksCrossed(100n, 140n, 50n).ticks !== 0n) throw new Error("ticks");
}
