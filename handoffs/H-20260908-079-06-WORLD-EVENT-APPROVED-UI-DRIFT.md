handoff_id: H-20260908-079-06-WORLD-EVENT-APPROVED-UI-DRIFT
from: 08
to: 06
status: OPEN
title: Remove desktop World Event detail layer and restore approved banner semantics

## Authority
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`
- H-20260908-078-08-FULL-UI-RULE-LEDGER-REAUDIT

## Finding
The user-approved World Event V1 explicitly requires **no separate desktop view-details surface**. Concrete authoritative event impacts and optional Chronicle navigation belong directly in the temporary banner. Mobile may use a bottom sheet only as same-content responsive reflow.

Current `client/src/resolved-ui-contracts.ts` instead adds a `CHI TIẾT` button to the desktop World Event banner and opens `.world-event-detail-panel`, placing the impact rows and Chronicle link in that separate panel.

This is presentation/approved-UI drift, not a gameplay-rule defect. Event values still come from structured authoritative `WorldEventOccurrence.impacts`, and no OI-001–OI-007 rule is reopened.

## Required correction
- On desktop, render authoritative affected-system impact rows directly in the temporary World Event banner.
- Keep optional exact Chronicle navigation in the banner.
- Remove the separate desktop `CHI TIẾT` / `.world-event-detail-panel` path.
- Preserve mobile bottom-sheet/card only as responsive reflow of the same content, if needed.
- Do not infer impacts from event name and do not change timers/gameplay/protocol.
- Add/update regression coverage for the approved no-separate-desktop-detail contract.

## Secondary fidelity check
While touching Approved UI V1, verify the marriage profile send affordance remains visible-but-disabled during the sender's own economic turn with the approved explanatory copy rather than simply disappearing. This is a lower-severity fidelity item; do not alter server marriage eligibility/timing.

## Verification after fix
Chat 07 should rerun a targeted production/client acceptance for World Event banner content + exact Chronicle link and confirm no separate desktop detail surface remains.
