handoff_id: H-20260907-051-06-RECOVERY-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement user-approved Recovery V1

## Source

- `docs/UI_RECOVERY_APPROVED_V1.md`
- `docs/UI_VOLUNTARY_APPROVED_V1.md`
- `docs/RULE_LEDGER.md`

## Required work

Implement the approved Recovery surface without changing gameplay:

- large centered desktop panel with 3 horizontal Low/Mid/High cards;
- each card always shows Pool, Carrying Capacity, Pending next round, Capacity Remaining, Cost/unit;
- Pool/Capacity gauge;
- per-card `− / editable quantity / + / MAX / PHỤC HỒI` controls;
- footer with authoritative available cash + remaining spending quota where applicable;
- compact `ĐẦU TƯ CÔNG` badge when authoritative event affects quoted cost;
- successful action keeps panel open, refreshes authoritative data and shows inline `HIỆU LỰC VÒNG SAU` confirmation;
- preserve approved right-edge Voluntary dock and single HUD-owned 60s timer;
- mobile follows approved bottom/full-height sheet pattern.

## Critical constraints

- Do not recompute Recovery economics, capacity, accepted units or eligibility client-side.
- Use authoritative `recoveryQuotes`, private financial data and server action results.
- If required data is missing, create a narrow handoff to Chat 03 instead of inventing it.
- No timer reset/pause on navigation.

## Exit

Update `reports/06_CURRENT.md` with implementation and verification evidence. Visual approval remains separate from implementation completion.
