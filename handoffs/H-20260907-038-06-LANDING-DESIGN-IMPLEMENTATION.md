handoff_id: H-20260907-038-06-LANDING-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement user-approved Landing V1

## Source

Canonical design spec for this handoff:
- `docs/UI_LANDING_APPROVED_V1.md`

Historical prototype/baseline art is reference only where it does not conflict with the approved spec.

## Required work

Implement the approved Landing only.

Key requirements:
- desktop composition: menu left, key art right;
- left-aligned logo/menu area with no large full-column background panel;
- real fantasy contract-seal/lifecycle logo treatment above `INTERGENERATIONAL / CONTRACT`;
- no subtitle;
- five separate vertical same-family buttons: TẠO PHÒNG / THAM GIA PHÒNG / HƯỚNG DẪN / LUẬT CHƠI / CÀI ĐẶT;
- reconnect card above menu when reconnect state exists;
- key art emphasizes settlement/world over characters;
- exactly 3 foreground Japanese anime/chibi pixel characters;
- credit `Một trò chơi của QuacQuaz` bottom-right at low visual priority;
- bright/lively world + darker wood/parchment UI chrome;
- moderate-light non-blocking ambience/motion;
- mobile uses dedicated stacked composition rather than a shrunken desktop split.

## Constraints

- Do not change gameplay, multiplayer protocol, room lifecycle, timers or authoritative logic.
- Preserve existing Create/Join/Tutorial/Rules/Settings/reconnect semantics.
- Do not infer Lobby/Room/HUD redesign from this handoff; those screens are still awaiting user approval.
- QA PASS against the old baseline does not override this user-approved Landing spec.

## Acceptance

1. Landing implementation matches `docs/UI_LANDING_APPROVED_V1.md` on desktop and mobile.
2. All five menu actions retain their existing semantics.
3. Reconnect state remains secondary and functional.
4. No subtitle appears.
5. Key art hierarchy favors the world/settlement.
6. Pixel art remains crisp with appropriate rendering.
7. Motion does not block interaction or affect timers.
8. Build/tests for affected client surfaces pass.
9. Update `reports/06_CURRENT.md` and hand back to Chat 05/07 as appropriate for visual verification.
