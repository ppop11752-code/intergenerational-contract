handoff_id: H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA
from: 06
to: 07
status: BLOCKED
title: Verify direct World Event banner semantics on production

## Source
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- H-20260908-079-06-WORLD-EVENT-APPROVED-UI-DRIFT

## Client fix under QA
H079 removed the separate desktop `CHI TIẾT` / `.world-event-detail-panel` path and renders structured authoritative `WorldEventOccurrence.impacts` directly inside the temporary World Event banner. Optional `XEM TRONG NIÊN SỬ` remains when exact `chronicleEntryId` exists.

Secondary Marriage fidelity was also corrected: an authoritative eligible profile candidate remains visible with a disabled `CÓ THỂ GỬI NGOÀI LƯỢT CỦA BẠN` affordance when `canSendMarriage=false`.

## H080 fresh QA evidence
Production contains H079. Render latest live deployment observed at commit `a9e95b3a02751d468ca83e4ddc47003a5039284a`.

GitHub Actions `World Event Approved UI QA`:
- run `34153570608`
- job `101840631652`
- clean Client regression: **69/69 PASS**
- production deployed-runtime checks before failure: PASS
- browser authoritative fixture: FAIL at exact Chronicle focus
- artifact `10030187563`
- digest `sha256:57a25f81878b298d784a1325bc50fe26c45f4086d1b1d392bb83198f6ad9acb3`

Verified before the failing assertion:
1. production has direct `.world-event-banner-detail` runtime;
2. no deployed `event-detail-open`, `.world-event-detail-panel` or `CHI TIẾT` path;
3. structured impacts and `chronicleEntryId` are consumed;
4. direct banner shows event name and concrete authoritative affected-system rows;
5. only affected systems render in fixture; no extra fixed-system rows;
6. Chronicle link is present when `chronicleEntryId` exists;
7. deployed Marriage approved disabled-affordance copy exists.

## Blocking defect
Exact World Event → Chronicle focus is incorrect when `chronicleEntryId !== event.id`.

Current `resolved-ui-contracts.ts` sets `chronicleFocus = ev.chronicleEntryId`, but `chronicle()` compares/selects against `data-world-event-id`, which is rendered from `WorldEventOccurrence.id`.

Fixture deliberately used `event.id = we-h080` and `chronicleEntryId = chron-h080`; matching chronology row rendered but did not receive `.focused-event`.

Narrow Client handoff created:
`H-20260908-081-06-WORLD-EVENT-CHRONICLE-FOCUS-ID`.

## Remaining after H081
Fresh rerun must finish:
- exact Chronicle focus PASS;
- timer continuity / no pause-reset;
- no event-name inference;
- mobile same-content responsive reflow;
- targeted Marriage visible-but-disabled browser assertion.

## Completion
BLOCKED — do not mark H080 PASS until H081 is fixed and a fresh browser rerun completes the remaining checks. No gameplay/protocol changed by Chat 07.
