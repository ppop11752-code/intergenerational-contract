handoff_id: H-20260907-050-06-MARKET-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: BLOCKED
title: Implement user-approved Market V1 surface

## Source
- `docs/UI_MARKET_APPROVED_V1.md`
- `docs/UI_VOLUNTARY_APPROVED_V1.md`

## Implemented
- six independent abstract resource cards;
- 2×3 desktop / responsive mobile reflow;
- Price/Return/Risk/Pool/Owned/access presentation;
- per-card − / editable quantity / + / MUA controls;
- sold-out/locked cards remain visible;
- persistent production-timing explanation;
- Market stays open and continues to consume authoritative snapshots.

## Blocker
`H-20260907-064-03-UI-ACTION-LIMITS-REASONS-CONTRACT` for authoritative per-card MAX and unavailable reasons. Client deliberately leaves MAX disabled rather than guessing cash/pool/quota limits.

No market formula/access/timer change.
