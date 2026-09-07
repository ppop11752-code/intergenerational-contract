handoff_id: H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA
from: 06
to: 07
status: OPEN
title: Verify direct World Event banner semantics on production

## Source
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- H-20260908-079-06-WORLD-EVENT-APPROVED-UI-DRIFT

## Client fix
H079 removed the separate desktop `CHI TIẾT` / `.world-event-detail-panel` path and now renders structured authoritative `WorldEventOccurrence.impacts` directly inside the temporary World Event banner. Optional `XEM TRONG NIÊN SỬ` remains in the same banner when exact `chronicleEntryId` exists.

Secondary Marriage fidelity was also corrected: an authoritative eligible profile candidate remains visible with a disabled `CÓ THỂ GỬI NGOÀI LƯỢT CỦA BẠN` affordance when `canSendMarriage=false`.

## Required QA
After production deploy contains H079:
1. desktop World Event has no separate `CHI TIẾT` button/detail sheet;
2. event name + concrete structured impact rows are visible directly in the temporary banner;
3. only affected systems render;
4. exact `XEM TRONG NIÊN SỬ` link focuses the matching World chronology entry when available;
5. mobile is same-content responsive reflow only;
6. event presentation does not pause/reset gameplay timers;
7. no event-name inference or hidden extra values appear;
8. targeted Marriage profile check: eligible candidate control stays visible-but-disabled during sender's own economic turn with approved explanatory copy.

## Evidence already available
- Client implementation/test HEAD `447e622a906e463a99df51f99e0828fe9745cca9`.
- `UIUX Art Final E2E` run `34153241226`: clean Client suite step PASS.

## Completion
Record production/browser PASS or a narrow defect handoff. Do not change gameplay/protocol from Chat 07.
