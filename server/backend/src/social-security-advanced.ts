import { DEFAULT_CONFIG, GameConfig } from "./config.js";

/**
 * Personal account contribution compounds each round.
 */
export function compoundPersonalAccount(balance: number, cfg: GameConfig = DEFAULT_CONFIG): number {
  return balance * (1 + cfg.socialSecurity.investmentExpectedRealReturn);
}

/**
 * A merged household can contain multiple individual personal accounts.
 * Marriage shares the household economic value, but payout remains attached
 * to the elderly character whose account it is, preventing double payout.
 */
export function elderlyPersonalPayout(balance: number): number {
  return balance / 2;
}

export function paygShare(paygPool: number, elderlyCount: number): number {
  return elderlyCount > 0 ? paygPool / elderlyCount : 0;
}
