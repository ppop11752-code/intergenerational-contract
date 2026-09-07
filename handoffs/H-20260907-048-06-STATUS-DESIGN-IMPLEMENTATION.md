handoff_id: H-20260907-048-06-STATUS-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement user-approved Status V1

## Source
- approved Status UI docs;
- H064 authoritative action-limit/reason contract.

## Result
- Each Status card consumes authoritative fee, persons charged, affordability and `unavailableReason`.
- Unavailable cards stay visible with server-authored reason.
- Noble competition/fallback/refund presentation remains authoritative and end-of-round.
- Status timer ownership remains server `phaseDeadlineAt`; no local duration added.

No gameplay Status rule or protocol changed.

## Verification
HEAD `ab8e7a7343c73c2f9501f18ebf33697080668629`: TypeScript build PASS; clean Client tests 64/64 PASS; desktop/mobile E2E PASS in run `34145674583` (artifact `10027576158`).
