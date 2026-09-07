handoff_id: H-20260907-049-06-VOLUNTARY-SHELL-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement user-approved Voluntary shell V1

## Source

- `docs/UI_VOLUNTARY_APPROVED_V1.md`
- `docs/UI_VOLUNTARY_SOURCE_VALIDATION_V1.md`
- `docs/UI_HUD_APPROVED_V1.md`
- `docs/UI_ROOM_APPROVED_V1.md`
- `docs/RULE_LEDGER.md`

## Required work

Implement the shared Voluntary shell exactly as approved:

- desktop right-edge vertical dock below/clear of minimap;
- persistent actions: `THỊ TRƯỜNG`, `PHỤC HỒI`, `CHU CẤP`, `SINH CON`;
- active action highlighted while its surface is open;
- unavailable actions remain visible but locked/dimmed with authoritative reason;
- approved HUD owns the single 60s TOTAL Voluntary timer; do not add independent panel timers or reset timing on navigation;
- secondary `KẾT THÚC LƯỢT` at bottom of dock, one click, no confirmation;
- mobile bottom action rail + bottom/full-height sheets;
- preserve persistent World Map and approved Room/HUD/minimap zones.

## Critical constraints

- Do not change gameplay, protocol, timers or eligibility.
- Do not invent final detailed layouts for Market/Recovery/Support/Birth before their Chat 05 approved specs exist.
- Switching surfaces is navigation inside one authoritative Voluntary phase and must never pause/reset/extend the timer.

## Exit

Update `reports/06_CURRENT.md` with implementation/verification state and create narrowly scoped handoff if authoritative data is missing.
