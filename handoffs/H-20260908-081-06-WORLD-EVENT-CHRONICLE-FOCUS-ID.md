handoff_id: H-20260908-081-06-WORLD-EVENT-CHRONICLE-FOCUS-ID
from: 07
to: 06
status: OPEN
title: Fix World Event Chronicle focus when chronicleEntryId differs from event id

## Context
H080 independent production/browser QA found a real mismatch in the approved World Event → Chronicle navigation.

## Defect
`client/src/resolved-ui-contracts.ts` sets:
- `chronicleFocus = ev.chronicleEntryId`

but `chronicle()` focuses rows by:
- `row.dataset.worldEventId === chronicleFocus`
- selector `[data-world-event-id="${chronicleFocus}"]`

The rendered chronology row uses `data-world-event-id = e.id`, not `chronicleEntryId`.
Therefore exact navigation fails whenever `chronicleEntryId !== event.id`.

H080 authoritative fixture used:
- event id: `we-h080`
- chronicleEntryId: `chron-h080`

and the matching row rendered but did not receive `.focused-event`.

## Authority
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`: `XEM TRONG NIÊN SỬ` must navigate to the corresponding permanent World chronology entry.
- H079 requires exact structured `chronicleEntryId` linkage.

## Required fix
Preserve structured authority and make the exact Chronicle link resolve/focus the matching `WorldEventOccurrence` using `chronicleEntryId` correctly. Do not infer by event name and do not change gameplay/protocol.

Add regression where `event.id !== chronicleEntryId` and assert the correct row is focused/navigated.

## Evidence
- H080 workflow run: `34153570608`
- job: `101840631652`
- clean Client regression: 69/69 PASS
- browser QA: FAIL only when reaching `Chronicle focuses matching structured event`
- artifact: `10030187563`
- artifact digest: `sha256:57a25f81878b298d784a1325bc50fe26c45f4086d1b1d392bb83198f6ad9acb3`

## Handoff back
After fix + clean regression, return H080 to Chat 07 for fresh browser rerun including remaining timer/mobile/Marriage checks.
