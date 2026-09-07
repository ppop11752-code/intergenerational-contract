# UI LOBBY — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART

This document applies `docs/UI_DESIGN_APPROVAL_WORKFLOW_V2.md` before concrete Lobby design alternatives are produced.

## Scope

Lobby + Founder reveal only. No redesign handoff to Chat 06 until direct Lobby design approval is complete.

## Source findings

### CURRENT_USER_CONFIRMED

- Lobby keeps a large room PIN and QR; PIN is visually primary, QR secondary.
- Lobby roster shows Human players only.
- No per-player Ready mechanic.
- No manual NPC add/remove/control in Lobby.
- Society-start Human/NPC + Founder information remains, but should be compact rather than an oversized technical panel.
- Founder Draw for >10 Humans is a short non-blocking reveal/overlay/transition associated with Lobby → Game start, not a required standalone screen.
- Lobby roster direction is a compact portrait grid; portraits/names remain readable, with more detail available on hover/click rather than large full cards.
- Overall visual direction: pixel art + Japanese anime/chibi, bright/lively world and darker fantasy UI chrome/panels.
- Motion must be non-blocking and must not alter authoritative game timing.
- Per-Human identity uses a distinct but subtle accent color, primarily in border/nameplate treatment rather than filling the whole card.
- Lobby portraits are temporary Lobby-only visual portraits; they disappear after the game starts and do not represent assigned Characters.
- Connection status is always available through a small status dot; technical text appears only when there is a problem.
- Host uses a fantasy icon/seal; the local player still has a clear `BẠN` text marker.
- Share controls include both `SAO CHÉP MÃ` and `SAO CHÉP LIÊN KẾT` in addition to PIN + QR.
- Founder reveal for >10 Humans reveals the 10 selected founders first, then informs non-founders of their authoritative Waiting Queue position; do not present a long global ranking by default.
- Founder transition wording keeps `XÃ HỘI ĐÃ ĐƯỢC THÀNH LẬP`.
- Non-host Start area keeps layout stability through a status card such as `Đang chờ Chủ phòng bắt đầu…`, rather than a disabled Start button.

### HISTORICAL_USER_CONFIRMED

Recovered from the original `Game mô phỏng nhân sinh` conversation and consistent with canonical gameplay:

- Lobby should have a **Kahoot-like energy**, while remaining an original design rather than a copy.
- Host may start with minimum 1 Human.
- Lobby does not require all 30 possible Human slots to be occupied.
- If fewer than 10 Humans start, server fills NPCs to reach the initial 10 Characters.
- With exactly 10 Humans, all are founders.
- With more than 10 Humans, authoritative Founder Draw selects top 10 Humans as founders and ranks the remainder into Waiting Queue.
- NPCs do not participate in Founder Draw.

These are gameplay/experience constraints, not automatic approval of any particular visual composition.

### MIGRATION_NORMALIZED / NOT DIRECTLY VERIFIED

The Migration Pack `04_UI_UX_SPEC.md` states:

- `Human names colorful ở center`.
- `<10: subtle note server sẽ autofill NPC`.
- `>10: founder draw note`.
- `Không 10 fixed founder slots`.
- Founder reveal auto-reveals after a few seconds.
- Founder transition text: `XÃ HỘI ĐÃ ĐƯỢC THÀNH LẬP`.

The exact presentation details above were re-validated where materially relevant through the current user decisions in this document. Any remaining implementation specifics still require design approval.

### PROTOTYPE_ONLY / IMPLEMENTATION REFERENCE

Frozen V5/V6/V7 prototypes included `Phòng chờ` and `Rút bài` surfaces; V6/V7 also included Waiting Queue/result navigation. Their layout/details are not authoritative.

Current client implementation uses:
- large room code;
- QR area;
- Human rows with display name, Host/Human label, online/offline state and `BẠN` marker;
- a separate society-start panel;
- Host-only Start button.

This current implementation is not design authority.

## Resolved without additional user question

- No fixed 10 founder slots in the visual roster: Lobby supports the dynamic Human roster up to room capacity; a fixed 10-slot founder grid would misleadingly imply only 10 Humans may join.
- Society-start information remains compact.
- Founder Draw remains non-blocking.
- PIN remains primary over QR.

## User verification result

1. Per-Human color identity → subtle individual accent color only.
2. Lobby portrait semantics → temporary Lobby-only portrait; disappears after game start.
3. Connection status → small persistent status dot; text only on problems.
4. Self/Host marking → Host fantasy seal/icon + explicit `BẠN` marker.
5. Share controls → both `SAO CHÉP MÃ` and `SAO CHÉP LIÊN KẾT`.
6. Founder reveal → founders first, then each non-founder receives Waiting Queue position.
7. Founder transition wording → keep `XÃ HỘI ĐÃ ĐƯỢC THÀNH LẬP`.
8. Non-host Start area → waiting/status card, not disabled button.

## Gate result

Source Validation Gate is CLOSED. Chat 05 may now inspect the current implementation, identify weaknesses, and propose concrete Lobby design alternatives for direct user approval.
