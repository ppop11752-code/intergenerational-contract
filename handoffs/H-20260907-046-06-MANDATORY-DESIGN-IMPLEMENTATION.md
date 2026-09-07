handoff_id: H-20260907-046-06-MANDATORY-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement user-approved Mandatory presentation V1

## Source

- `docs/UI_MANDATORY_APPROVED_V1.md`
- `docs/UI_MANDATORY_SOURCE_VALIDATION_V1.md`
- `docs/RULE_LEDGER.md`

## Required work

Implement Mandatory V1 presentation only:

- large centered card over persistent World Map;
- no skip/confirm control;
- no visible timer/countdown/progress indicator;
- render every authoritative due obligation as a line item and Household total;
- married normal presentation uses Household totals, not spouse columns;
- if forced liquidation occurs, render `THANH LÝ BẮT BUỘC` inside the same card with authoritative liquidated resources/units, 75% basis and cash/result data where exposed;
- if bankruptcy occurs, transform the same card into `PHÁ SẢN HỘ GIA ĐÌNH`, communicate authoritative shortfall/consequence and do not expose Status/Voluntary afterward;
- preserve approved pixel-fantasy chrome and responsive treatment.

## Critical timing constraint

The user requested reconsideration of the current 7-second Mandatory reading duration, but no new authoritative duration is locked yet.

Therefore:
- follow server-authoritative phase transitions;
- do not hardcode a shorter client delay;
- do not show countdown/progress;
- current canonical timing remains until gameplay authority changes it.

## Do not

- change gameplay/timers/server behavior;
- recompute obligation amounts or liquidation client-side;
- invent missing breakdown data;
- add skip/continue semantics;
- interpret the Mandatory reading duration as a player decision timer.

## Verification / report

After implementation, update `reports/06_CURRENT.md` and hand back to Chat 05/07 for visual/integration verification. If authoritative snapshot data needed by the approved presentation is missing, create a narrow handoff to Chat 03 rather than fabricating client logic.
