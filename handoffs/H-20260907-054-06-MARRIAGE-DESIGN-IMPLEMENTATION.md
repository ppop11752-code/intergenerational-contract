handoff_id: H-20260907-054-06-MARRIAGE-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: BLOCKED
title: Implement user-approved Marriage UI V1

## Source
- `docs/UI_MARRIAGE_APPROVED_V1.md`
- `docs/RULE_LEDGER.md`

## Implemented
- pending incoming Accept/Reject remains independent per proposal;
- outgoing pending card now exposes Cancel through existing server `marriage:cancel` action;
- no pending expiry/countdown;
- accepted binding notice retains end-round settlement wording;
- no Reject/Cancel is added to accepted state;
- no protocol invention.

## Blocker
`H-20260907-063-03-UI-RESIDENCE-MAP-CONTRACT` is required for world-first Residence/Profile discovery, correct navigation to target Residence and accepted-pair Residence relationship line without inferring location.

No marriage eligibility/race/invalidation/settlement rule is inferred locally.
