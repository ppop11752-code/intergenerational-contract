handoff_id: H-20260907-041-06-LOBBY-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement user-approved Lobby V1

## Source

Canonical design spec for this handoff:
- `docs/UI_LOBBY_APPROVED_V1.md`

Supporting provenance:
- `docs/UI_LOBBY_SOURCE_VALIDATION_V1.md`
- `docs/UI_LOBBY_DIRECTION_V1.md`

Frozen V5–V10.1 prototypes, Migration Pack visual normalization and current Lobby implementation are reference only where they do not conflict with the approved spec.

## Required work

Implement the approved Lobby V1 only.

Key requirements:
- concept: `LBA — Đại sảnh tập hợp`;
- pixel-art fantasy gathering-hall / guild-hall-like background;
- desktop invitation header with large PIN on left and compact QR on right;
- actions `SAO CHÉP MÃ` and `SAO CHÉP LIÊN KẾT`;
- QR compact by default and expandable on hover/click;
- Human-only roster as visual center;
- responsive desktop portrait grid targeting approximately 5–7 columns depending on width;
- only roster region scrolls when needed; header and bottom society/start strip remain stable;
- participant portrait circular/oval pixel-art with nameplate below;
- distinct Human accent color used subtly on portrait border/nameplate only;
- small connection-state dot, explanatory text only on actual connection problems;
- Host uses fantasy seal/icon; local player keeps explicit `BẠN` marker;
- Lobby portraits are temporary Lobby-only visuals and must not be treated as gameplay Characters;
- bottom society/start strip split into information left + Start/wait right;
- Host sees functional `BẮT ĐẦU`; non-host sees waiting/status card instead of disabled Start button;
- no Ready control and no manual NPC controls;
- Founder reveal for >10 Humans must be fast/almost simultaneous, using large Founder seal overlay that shrinks into a compact marker;
- non-founders receive authoritative Waiting Queue position;
- transition phrase `XÃ HỘI ĐÃ ĐƯỢC THÀNH LẬP` before World Map transition;
- mobile/compact uses dedicated responsive composition rather than simple desktop shrinking.

## Constraints

- Do not change gameplay, room capacity, Founder selection logic, multiplayer protocol, timers or server authority.
- Client animation only presents the authoritative Founder result; no client-side draw/randomization.
- Preserve existing room Start semantics and reconnect/state handling.
- Do not infer Room/World shell or HUD redesign from this handoff; those remain unapproved.
- Old row-list styling, technical `HUMAN/ONLINE/OFFLINE` labels and large society side panel are not design authority.

## Acceptance

1. Lobby matches `docs/UI_LOBBY_APPROVED_V1.md` on desktop and compact/mobile layouts.
2. PIN remains primary and QR secondary/expandable.
3. Human-only portrait grid remains readable from low to high participant counts.
4. Roster-only scrolling works without moving the invitation header or society/start controls unnecessarily.
5. Participant identity semantics match the approved portrait/nameplate/accent/Host/self/connection treatment.
6. Host and non-host Start areas preserve authoritative behavior while keeping stable layout.
7. Founder reveal is fast/almost simultaneous and does not alter authoritative result/timing.
8. Waiting Queue position is presented correctly to non-founders.
9. No Ready or manual NPC controls are added.
10. Build/tests for affected client surfaces pass.
11. Update `reports/06_CURRENT.md` and hand back to Chat 05/07 as appropriate for visual verification.
