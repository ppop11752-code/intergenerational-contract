# 02 — ENGINE & TESTING — CURRENT REPORT

## Status

OI-001 implementation complete; awaiting independent Chat 08 re-audit.

## Changed

Implemented A1+B1+C1 marriage proposal lifecycle:

- max one outgoing `pending`;
- multiple incoming `pending` allowed;
- no pending timeout;
- accepted binding;
- `createdRound` history-only;
- settlement by `acceptedRound`;
- eligibility loss invalidates;
- disconnect/NPC takeover does not invalidate;
- successful settlement => `executed`, inactive but retained in history;
- first valid Accept in authoritative processing order wins.

No gameplay constants or unrelated formulas were changed.

## Source

User-locked OI-001 A1+B1+C1 + Rule Ledger / Migration Pack v3.

## Impact

Directly affects model/engine marriage proposal state and authoritative action handling.

## Verified

Chat 02 handoff reports, from the implementation artifact:

- Typecheck PASS
- Rule Ledger regression 42/42 PASS
- OI-002 regression 6/6 PASS
- OI-001 regression 9/9 PASS
- Fuzz 20 games PASS
- Simulation 30 games completed

Reported artifact SHA-256:
`a896c69cd186fbe6cb6cf7db780c25e341e683fd8545175b9e1df1c43b46b11f`

## Unverified

Independent Chat 08 verification of OI-001 has not yet been recorded as PASS in the current Project state.

Legacy Vitest `.test.ts` files were not run in Chat 02's environment because local Vitest/dependencies were unavailable; authoritative configured regression suites above did pass.

## Handoff

Chat 08 — independently inspect artifact, lifecycle/timing/order and regression coverage.

## Open Issues

OI-001 remains OPEN until Chat 08 PASS.
