handoff_id: H-20260907-065-03-UI-LIFECYCLE-RESULT-CONTRACT
from: 06
to: 03
status: OPEN
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
