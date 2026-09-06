# DECISION LOG — CURRENT CANONICAL OVERLAY

This file records decisions that are known to be current at the GitHub migration point. It does not replace the full historical Decision Log from Migration Pack v3; that full log must be migrated when the v3 artifact is directly accessible.

## Current locked decisions

- D-037 — Standard scoring uses HHA-based `AverageLifeAssetScore`; cash-only shorthand is superseded.
- D-046 — Inflation scarcity uses both Renewable and Nonrenewable scarcity.
- D-047 — Chats 01–08 maintain `AI SPECIALIST REPORT` after material changes/conclusions.
- D-048 — Chat 00 reviews relevant specialist reports and pending handoffs before substantive coordination.
- D-049 — Chat 08 is the independent consistency auditor and does not silently change rules/code.
- D-050 — OI-001 marriage proposal lifecycle is locked to A1+B1+C1:
  - max one outgoing `pending` per Character;
  - multiple incoming `pending` allowed;
  - no timeout;
  - accepted is binding;
  - settlement at end of `acceptedRound`;
  - `createdRound` history-only;
  - eligibility loss invalidates;
  - disconnect/NPC takeover does not invalidate;
  - successful settlement => `executed`, inactive but retained in history;
  - first valid accept in authoritative server processing order wins.
- D-051 — Because no prior canonical client implementation exists in the available Project sources, Chat 06 is authorized to establish a new canonical client implementation under `client/` from the locked UI/UX specs and authoritative server protocol. This authorization does not permit gameplay-rule changes or protocol invention for client convenience.

## Explicit baseline confirmations by user

- No private debt; only Government public debt.
- Married household uses shared finances; Tax/ASXH remain calculated per Character and paid from shared cash.
- Child may buy/hold Resources before Stage3, but production starts at Stage3.

## OI-002 exact formula lock

`r_g = clamp(1 - RPool_g / RCapacity_g, 0, 1)`

`n_g = clamp(1 - NPool_g / NInitialPool_g, 0, 1)`

`R = (1680r_L + 2520r_M + 2520r_H) / 6720`

`N = (4900n_L + 7920n_M + 7700n_H) / 20520`

`Scarcity = 0.5R + 0.5N`

Pool zero => tier scarcity 1. Measurement occurs after natural Renewable regeneration at end-round; pending Recovery applies only at next round start.
