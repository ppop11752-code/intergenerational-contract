handoff_id: H-20260908-088-07-QA-FIXTURE-MAINTENANCE
from: 00
to: 07
status: DONE
title: Update stale Approved UI V1 QA fixture after H079

## Result
**PASS — maintenance debt cleared.**

`qa/approved-ui-v1-fixture.mjs` no longer expects the removed pre-H079 World Event `CHI TIẾT` / separate detail layer.

## Changed
- Updated `qa/approved-ui-v1-fixture.mjs` at commit `59a8f4ea897eab1bf24c47d343f11d827c2da289`.
- Current fixture now asserts:
  - direct `.world-event-banner-detail` rendering;
  - no `.event-detail-open`, `.world-event-detail-panel`, or visible `CHI TIẾT` path;
  - authoritative structured impact row values render directly in the temporary banner;
  - `[data-event-chronicle]` remains available when `chronicleEntryId` exists;
  - Chronicle row preserves exact `worldEvent.id` + `chronicleEntryId` identity and exact focus;
  - repeated snapshots do not create a render loop.
- Retained existing authoritative-state coverage for Status fee, Market/Recovery/Support MAX, Birth unavailable reason, structured lifecycle results, Residence markers and render-loop protection.
- No gameplay/UI/protocol/product behavior changed.

## Verification
### Approved UI V1 Fixture
- Run: `34159673927`
- Job: `101858659108`
- Head: `59a8f4ea897eab1bf24c47d343f11d827c2da289`
- Conclusion: **SUCCESS**
- Clean client build: PASS
- Updated authoritative-state fixture: PASS
- Artifact: `10032171557`
- Digest: `sha256:deecf8e4269b9d3d497f41c860c66ba28676c5d836cf299023ec808b8f643dbc`

### Approved UI V1 E2E regression
- Run: `34159674037`
- Job: `101858659653`
- Same head: `59a8f4ea897eab1bf24c47d343f11d827c2da289`
- Conclusion: **SUCCESS**
- Backend release regressions: PASS
- Clean Client suite: PASS
- Live Approved UI V1 smoke: PASS
- Updated authoritative-state Approved UI V1 fixture: PASS
- Artifact: `10032197317`
- Digest: `sha256:a81cf21702c472d2d63cf4b49350cd930d538321ba70b479d006e37dabc16610`

## Source
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- `handoffs/H-20260908-079-06-WORLD-EVENT-APPROVED-UI-DRIFT.md`
- `handoffs/H-20260908-080-07-WORLD-EVENT-APPROVED-UI-QA.md`
- `qa/world-event-approved-ui-qa.mjs`

## Impact
The legacy QA fixture now agrees with current Approved UI V1/H079 behavior and no longer creates a false release failure for the removed World Event detail layer. H080/H085 acceptance was not weakened.

## Handoff
None required.
