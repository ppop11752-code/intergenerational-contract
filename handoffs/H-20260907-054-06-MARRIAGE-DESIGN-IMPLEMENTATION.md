handoff_id: H-20260907-054-06-MARRIAGE-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement user-approved Marriage UI V1

## Source

Implement strictly from:
- `docs/UI_MARRIAGE_APPROVED_V1.md`
- `docs/UI_MARRIAGE_SOURCE_VALIDATION_V1.md`
- `docs/UI_ROOM_APPROVED_V1.md`
- `docs/RULE_LEDGER.md`

## Required implementation

- World-first Marriage discovery through Residence / Character profile; no permanent global Marriage hub.
- Own-turn `CẦU HÔN` remains visible but disabled with the approved explanation.
- Compact/collapsible incoming proposal notices with one card per pending proposal and independent Accept/Reject controls.
- One outgoing pending card with Cancel only while pending.
- No expiry/countdown treatment for pending proposals.
- Accepted binding state removes Reject/Cancel and communicates end-round settlement.
- Add subtle visual relationship line between accepted pair Residences where the world renderer supports it without camera/input interference.
- Rejected/cancelled/invalidated result communication before history/archive treatment.
- Executed end-round marriage uses short non-blocking `ĐÃ KẾT HÔN` feedback and then reflects authoritative Residence/Family state.
- Mobile uses sheet/collapsible adaptation with identical semantics.

## Constraints

- Do not infer marriage eligibility, race ordering, proposal invalidation or settlement client-side.
- Do not expose internal Character/proposal IDs as primary player-facing identity.
- Marriage notices never pause/reset Voluntary timer.
- Do not add countdowns to pending proposals.
- Accepted proposal is binding; no Reject/Cancel after acceptance.
- If current server/client snapshot lacks data needed for approved states or player-facing identity, create a narrow handoff to Chat 03 rather than inventing local truth.

## Exit

Implement, verify against the approved spec, update `reports/06_CURRENT.md`, and create any necessary integration/QA handoff.
