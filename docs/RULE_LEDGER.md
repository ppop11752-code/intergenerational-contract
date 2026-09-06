# AUTHORITATIVE RULE LEDGER — GITHUB MIGRATION OVERLAY

**Status:** CANONICAL FOR THE RULES LISTED HERE; FULL LEDGER MIGRATION PENDING DIRECT ACCESS TO MIGRATION PACK v3.

This file must not be treated as a shortened replacement for the full Rule Ledger. The complete gameplay baseline remains the latest Rule Ledger/Migration Pack v3. This GitHub file records the latest authoritative corrections that supersede older migrated wording.

## Authority

1. Latest explicit user decision.
2. Full current Rule Ledger.
3. Canonical Project documents / Decision Log.
4. Verified implementation.
5. Tests.

## Winner / scoring

`AverageLifeAssetScore = sum(roundAssetScore) / activeRounds`

Scoring is HHA-based, not cash-only. HHA includes Cash + current spot Resource value + funded personal ASXH economic value as defined by the full Rule Ledger.

## Debt

There is **no private debt** in the current gameplay model. Only Government public debt exists.

## Married household obligations

A married household pays from shared household finances. Tax and ASXH remain calculated/attributed per Character where required by the full Rule Ledger, then paid from shared household cash.

## Child Resource rule

Child may buy and hold Resources. Production/conversion into money is available only from Stage3.

## Marriage proposal lifecycle — D-050 / A1+B1+C1

- Each Character has at most **one outgoing `pending`** proposal.
- Multiple incoming `pending` proposals are allowed.
- `pending` has **no timeout** and may persist across rounds.
- Sender may Cancel only while proposal is `pending`.
- Once `accepted`, acceptance is **binding**; Reject/Cancel is not allowed.
- `createdRound` is history/audit metadata only.
- Valid Accept records `acceptedRound=currentRound`.
- Settlement occurs at the end of **`acceptedRound`**.
- Loss of gameplay eligibility invalidates affected active proposals immediately, independent of `createdRound`.
- Disconnect / NPC takeover does **not** invalidate when gameplay eligibility remains.
- Successful settlement => `executed`; proposal leaves active set but remains in history/state.
- For competing Accepts, the **first valid Accept in authoritative server processing order wins**.

## Inflation scarcity — OI-002 canonical formula

For each tier `g ∈ {L,M,H}`:

`r_g = clamp(1 - RPool_g / RCapacity_g, 0, 1)`

`n_g = clamp(1 - NPool_g / NInitialPool_g, 0, 1)`

`R = (1680*r_L + 2520*r_M + 2520*r_H) / 6720`

`N = (4900*n_L + 7920*n_M + 7700*n_H) / 20520`

`Scarcity = 0.5*R + 0.5*N`

Rules:

- Pool `0` => tier scarcity `1`.
- Capacity/initial-pool denominators are fixed and must be `>0`.
- Clamp is applied per tier before aggregation.
- Measure at end of round **after natural Renewable regeneration**.
- `pendingRecovery` affects the pool only when applied at the **start of the next round** and therefore does not affect same-round inflation.

The remaining inflation formula from the full Rule Ledger remains unchanged:

- `demand = population/10 - 1`
- `fiscal = min(2, publicDebt / residentTotalAssets)`
- `raw = 0.018 + demand*.008 + Scarcity*.018 + fiscal*.008`
- `smoothed = previous*.55 + raw*.45`
- clamp final inflation to `[-.02,.12]`
- `PI *= 1 + inflation`

## Non-change rule

Nothing in this migration overlay authorizes changes to gameplay constants or rules not explicitly listed above. When the full Migration Pack v3 is migrated, its complete Rule Ledger should replace this overlay while preserving all rules above verbatim in meaning.
