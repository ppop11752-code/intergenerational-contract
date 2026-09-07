handoff_id: H-20260907-053-06-BIRTH-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: BLOCKED
title: Implement user-approved Birth UX V1

## Source
- `docs/UI_BIRTH_APPROVED_V1.md`
- `docs/UI_VOLUNTARY_APPROVED_V1.md`

## Implemented
- Birth remains a Voluntary surface under shared HUD timer;
- incoming Accept/Reject controls use authoritative proposal IDs without exposing them as labels;
- proposer-visible outgoing proposal state is decorated from authoritative public proposals when present;
- <10s default-Accept warning uses authoritative phase deadline only;
- no newborn preview or client-local proposal truth.

## Blocker
`H-20260907-064-03-UI-ACTION-LIMITS-REASONS-CONTRACT` for explicit authoritative #1/#2/conditional #3 slot/cap state, outgoing proposal card completeness and unavailable reason.

No eligibility/default-Accept/cap rule is inferred locally.
