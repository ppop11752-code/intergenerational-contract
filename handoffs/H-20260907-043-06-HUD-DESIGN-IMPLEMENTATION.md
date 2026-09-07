handoff_id: H-20260907-043-06-HUD-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement user-approved HUD V1

## Source

Canonical design spec for this handoff:
- `docs/UI_HUD_APPROVED_V1.md`

Related approved shell constraints:
- `docs/UI_ROOM_APPROVED_V1.md`

Historical prototype/current implementation is reference only where it does not conflict with the approved specs.

## Required work

Implement HUD V1 only.

Key requirements:
- direction = `HDA — Cụm thông tin nổi`;
- no dense continuous full-width HUD bar;
- Round/Year = one compact floating cluster;
- Population/Inflation/Public Debt+Ceiling = one society macro cluster;
- Population/Inflation show small persistent trend arrows, exact deltas on hover/focus/tap;
- Phase/Timer = adaptive floating cluster centered but slightly lower than top macro clusters;
- Phase/Timer always remains visible; visually stronger on local turn and reduced while waiting, with actor context where appropriate;
- upper-right minimap space from Room V1 remains unobstructed;
- `NIÊN SỬ` icon/control sits to the left of minimap;
- `SETTINGS` gear remains at upper-right utility edge outside meaningful minimap content;
- temporary World Event banner sits lower than regular HUD clusters near upper-center of World Map;
- healthy network state hidden; warn only for degraded/disconnected/reconnecting;
- pixel-fantasy plaques with restrained thin ornament/chrome;
- no persistent Help `?`, Player Bar, World Event empty cell, Music/SFX HUD controls;
- do not recreate separate Government/Home camera quick-nav controls;
- mobile primary HUD row = Round/Year + Phase/Timer + Population;
- mobile secondary expandable layer = Inflation + Public Debt/Ceiling + approved secondary macro facts;
- mobile must not be a pure horizontally scrollable shrunken desktop HUD.

## Constraints

- Do not change gameplay, multiplayer protocol, timer durations, World Event semantics, server ordering or economic formulas.
- Presentation must consume authoritative state rather than client-derived gameplay calculations.
- Preserve approved Room V1 spatial zones: left Turn Track, upper-right live minimap, persistent World Map.
- Do not infer redesign outside approved Landing/Lobby/Room/HUD specs.

## Acceptance

1. HUD structure matches `docs/UI_HUD_APPROVED_V1.md` on desktop and mobile.
2. No continuous full-width dashboard strip remains as the primary HUD form.
3. Phase/timer remains authoritative, readable and adaptively emphasized without changing timing.
4. Population/Inflation trend detail behavior matches approved semantics.
5. Public Debt and Debt Ceiling are directly readable in compact HUD.
6. World Event uses temporary separate banner, not persistent empty slot.
7. Niên sử/Settings coexist cleanly with upper-right minimap.
8. Old Help/player-bar/audio/healthy-network/persistent-event UI does not return.
9. Mobile uses primary + expandable secondary HUD levels.
10. Build/tests for affected client surfaces pass.
11. Update `reports/06_CURRENT.md` and hand back to Chat 05/07 as appropriate for visual/integration verification.
