handoff_id: H-20260907-065-03-UI-LIFECYCLE-RESULT-CONTRACT
from: 06
to: 03
status: DONE
title: Expose structured mortality / inheritance / lifecycle result state

## Source
- `docs/UI_ELDERLY_MORTALITY_GRIEF_INHERITANCE_APPROVED_V1.md`
- `docs/UI_WAITING_QUEUE_RECONNECT_APPROVED_V1.md`
- `docs/UI_END_REPORT_APPROVED_V1.md`

## Problem
Current public snapshot exposes current elderly medical due/paid/risk and histories, but approved UI requires structured recent result presentation for death, inheritance, one/both spouse settlement and Government transfer. Client must not parse chronology strings or reconstruct estate/heir logic.

## Required narrow contract
Expose read-only structured recent lifecycle results/events sufficient for:
- end-round elderly medical result `ĐÃ TRẢ X / Y`;
- death notice with authoritative Character identity and round;
- inheritance result with estate total, beneficiaries + received amount;
- explicit Government transfer amount when no eligible heir;
- joint two-spouse settlement as one result where server resolves it jointly;
- queue-entry/new-life assignment reason/context needed for short transition cards.

Do not expose hidden formulas/Persona. Do not change mortality, Grief, inheritance, queue or assignment rules.

## Handoffs blocked/partial
H056, H058 and lifecycle portions used by H061/H062.

## Result

Completed by Chat 03.

- Public `game.lifecycleResults` now contains bounded structured records for
  elderly medical paid/due, death, inheritance, Government transfer, queue entry
  and new-life assignment.
- Inheritance records expose exact estate total and beneficiary
  Character/Household/relation/amount rows.
- Simultaneous terminal death of both spouses emits one `joint=true` death and
  one joint estate result.
- Private `recentLifecycleResults` returns the bounded subset tied to the current
  Human/Character, including death-to-queue and newborn assignment context.
- Existing mortality, inheritance, Grief, bankruptcy, queue and birth mechanics
  were not changed; records are written at their authoritative settlement points.

Regression `ui-lifecycle-results-contract.mjs`: PASS for medical, single and joint
death, spouse/child inheritance, no-heir Government transfer, queue and new life.

## Result commit/ref

`0d43bd8f73db9fce53617d36bb793a05aed2fcf7`
