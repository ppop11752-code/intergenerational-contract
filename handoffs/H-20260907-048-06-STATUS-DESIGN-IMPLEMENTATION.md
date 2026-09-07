handoff_id: H-20260907-048-06-STATUS-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: BLOCKED
title: Implement user-approved Status Purchase V1

## Source
- `docs/UI_STATUS_APPROVED_V1.md`

## Implemented
- approved centered three-card chooser;
- no duplicate timer inside panel;
- current/household context and `HIỆU LỰC VÒNG SAU`;
- authoritative fee/person-count/affordability attached to each card;
- Noble end-round competition warning;
- <5s authoritative timeout explanation;
- mobile stacked/paged-ready presentation.

## Blocker
`H-20260907-064-03-UI-ACTION-LIMITS-REASONS-CONTRACT` for authoritative per-card unavailable reason beyond the current affordability boolean and for consistent quote/error presentation.

No fee/fallback/Noble/refund logic is calculated client-side.
