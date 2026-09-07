handoff_id: H-20260908-079-06-WORLD-EVENT-APPROVED-UI-DRIFT
from: 08
to: 06
status: DONE
title: Remove desktop World Event detail layer and restore approved banner semantics

## Authority
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`
- H-20260908-078-08-FULL-UI-RULE-LEDGER-REAUDIT

## Completed
- Removed the user-facing desktop `CHI TIẾT` / `.world-event-detail-panel` implementation path from `client/src/resolved-ui-contracts.ts`.
- Active World Event banner now renders authoritative `WorldEventOccurrence.impacts` directly in `.world-event-banner-detail`.
- Only systems actually present in structured impacts render rows; no event-name inference was added.
- Optional `XEM TRONG NIÊN SỬ` remains in the banner only when `chronicleEntryId` exists and preserves exact structured chronology focus.
- Responsive CSS reflows the same banner content; no extra mobile event truth is introduced.
- Removed stale detail-panel/event-detail CSS and added direct-banner styling.
- Secondary Marriage fidelity corrected in `approved-ui-finalize.ts`: authoritative candidate keeps `CẦU HÔN` affordance visible; when `canSendMarriage=false`, it is disabled with exact approved copy `CÓ THỂ GỬI NGOÀI LƯỢT CỦA BẠN` rather than disappearing.
- No gameplay, protocol, timer or server eligibility rule changed.

## Regression
`client/test/resolved-ui-contracts.test.mjs` now asserts:
- structured World Event impacts + `chronicleEntryId` are consumed;
- direct `.world-event-banner-detail` and Chronicle link exist;
- no `event-detail-open`, `.world-event-detail-panel` or `CHI TIẾT` path remains;
- no event-name inference;
- Marriage disabled own-turn affordance remains visible with approved copy.

## Verification
- Implementation/test HEAD: `447e622a906e463a99df51f99e0828fe9745cca9`.
- GitHub Actions `UIUX Art Final E2E` run `34153241226`: clean Client suite step PASS.
- Final production browser verification is intentionally delegated because the browser stage observes the separately deployed production build and must contain H079 before being accepted.

## Handoff
Targeted production acceptance created for Chat 07 as `H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA`.
