handoff_id: H-20260907-051-06-RECOVERY-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: BLOCKED
title: Implement user-approved Recovery V1

## Source
- `docs/UI_RECOVERY_APPROVED_V1.md`
- `docs/UI_VOLUNTARY_APPROVED_V1.md`

## Implemented
- three Low/Mid/High recovery cards;
- authoritative Pool / Carrying Capacity / Pending / Capacity Remaining / Cost per unit;
- gauge + per-card − / editable quantity / + / PHỤC HỒI controls;
- cash/quota footer and next-round explanation;
- persistent shared Voluntary timer semantics.

## Blocker
`H-20260907-064-03-UI-ACTION-LIMITS-REASONS-CONTRACT` for authoritative accepted MAX/unavailable reason. Client does not derive MAX from capacity/cash/quota.

No recovery economics/timer change.
