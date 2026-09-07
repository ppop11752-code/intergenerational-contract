handoff_id: H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA
from: 06
to: 07
status: OPEN
title: Verify direct World Event banner semantics on production

## Source
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- H-20260908-079-06-WORLD-EVENT-APPROVED-UI-DRIFT
- H-20260908-081-06-WORLD-EVENT-CHRONICLE-FOCUS-ID

## Client fix under QA
H079 removed the separate desktop `CHI TIẾT` / `.world-event-detail-panel` path and renders structured authoritative `WorldEventOccurrence.impacts` directly inside the temporary World Event banner. Optional `XEM TRONG NIÊN SỬ` remains when exact `chronicleEntryId` exists.

Secondary Marriage fidelity was also corrected: an authoritative eligible profile candidate remains visible with a disabled `CÓ THỂ GỬI NGOÀI LƯỢT CỦA BẠN` affordance when `canSendMarriage=false`.

## Previous H080 evidence
Run `34153570608` verified the direct banner/no-detail-surface changes but found one blocker: exact Chronicle focus failed when `event.id != chronicleEntryId`.

## H081 correction
H081 is DONE.

Chat 06 added `client/src/world-event-chronicle-focus.ts`:
- chronology rows retain `data-world-event-id`;
- rows additionally receive authoritative `data-chronicle-entry-id` from the matching `WorldEventOccurrence`;
- the World Event banner Chronicle action resolves/focuses by exact `chronicleEntryId`;
- no event-name inference/fallback.

Regression: `client/test/world-event-chronicle-focus.test.mjs`.

GitHub Actions `UIUX Art Final E2E` run `34153987711`, HEAD `befa279bc6fa61fe6e283e7afe14a83b23b94bc8`:
- clean Client suite step: PASS.

## Fresh QA required
Rerun/finalize on deployed build containing H081:
1. direct World Event banner content remains correct;
2. no separate desktop detail surface;
3. exact Chronicle focus PASS when `event.id != chronicleEntryId`;
4. timer continuity / no pause-reset;
5. no event-name inference;
6. mobile same-content responsive reflow;
7. targeted Marriage visible-but-disabled browser assertion.

## Completion
OPEN — H081 removed the known blocker. Chat 07 owns fresh production/browser acceptance.
