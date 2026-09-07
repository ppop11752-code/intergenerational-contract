handoff_id: H-20260907-043-06-HUD-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement user-approved HUD V1

## Source
- `docs/UI_HUD_APPROVED_V1.md`
- `docs/UI_ROOM_APPROVED_V1.md`

## Resolution
Implemented HUD shell:
- floating Round/Year and Society clusters instead of continuous bar;
- separate centered phase/timer instrument;
- persistent Population/Inflation trend direction derived from authoritative history snapshots;
- debt/ceiling retained;
- Niên sử + Settings placement;
- healthy connection indicator removed from HUD;
- permanent Help removed;
- World Event shown only when active;
- mobile compact hierarchy.

Detailed authoritative World Event impact rows/deep link remain owned by H060/H066, not this HUD-shell closure.

## Verification
Implementation committed; runtime QA delegated to `H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA`.
