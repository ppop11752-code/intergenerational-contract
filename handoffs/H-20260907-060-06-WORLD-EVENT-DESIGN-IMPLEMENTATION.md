handoff_id: H-20260907-060-06-WORLD-EVENT-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: BLOCKED
title: Implement user-approved World Event presentation V1

## Source
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- `docs/UI_HUD_APPROVED_V1.md`

## Implemented
- event appears only when authoritative `eventName` is active;
- compact upper-center banner is separate from phase/timer;
- currently exposed authoritative economic-income factor can be shown without inferring event meaning;
- no event-specific controls/timers are added.

## Blocker
`H-20260907-066-03-UI-WORLD-EVENT-CHRONICLE-CONTRACT` is required for exact affected-system rows, epidemic medical fee and stable Chronicle focus linkage. Client will not infer effects/duration from event name.
