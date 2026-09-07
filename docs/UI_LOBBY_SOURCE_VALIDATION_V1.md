# UI LOBBY — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
Date: 2026-09-07
Owner: 05 — UI/UX & ART

This document applies `docs/UI_DESIGN_APPROVAL_WORKFLOW_V2.md` before concrete Lobby design alternatives are produced.

## Scope

Lobby + Founder reveal only. No redesign handoff to Chat 06 until user verification and direct design approval are complete.

## Source findings

### CURRENT_USER_CONFIRMED

Already re-confirmed in the current design-approval phase; do not ask again unless a real contradiction appears:

- Lobby keeps a large room PIN and QR; PIN is visually primary, QR secondary.
- Lobby roster shows Human players only.
- No per-player Ready mechanic.
- No manual NPC add/remove/control in Lobby.
- Society-start Human/NPC + Founder information remains, but should be compact rather than an oversized technical panel.
- Founder Draw for >10 Humans is a short non-blocking reveal/overlay/transition associated with Lobby → Game start, not a required standalone screen.
- Lobby roster direction is a compact portrait grid; portraits/names remain readable, with more detail available on hover/click rather than large full cards.
- Overall visual direction: pixel art + Japanese anime/chibi, bright/lively world and darker fantasy UI chrome/panels.
- Motion must be non-blocking and must not alter authoritative game timing.

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

Some of these are compatible with current decisions/gameplay, but their exact presentation provenance is not independently verified as direct user approval.

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

The following do not need re-validation because newer direct decisions or gameplay already resolve them:

- No fixed 10 founder slots in the visual roster: Lobby supports the dynamic Human roster up to room capacity; a fixed 10-slot founder grid would misleadingly imply only 10 Humans may join.
- Society-start information remains compact.
- Founder Draw remains non-blocking.
- PIN remains primary over QR.

## User verification questions still open

1. **Per-Human color identity:** should each Human receive a distinct accent color in Lobby, or should the roster use one shared palette/style with identity carried mostly by portrait/name?
2. **Lobby portrait semantics:** before Founder/Character assignment, what does a portrait represent? A purely cosmetic player avatar, a temporary lobby portrait that disappears at game start, or something else?
3. **Connection status visibility:** should Lobby visibly show connected/disconnected state for each Human, or keep this information mostly hidden unless there is a problem?
4. **Self/Host marking:** should `BẠN` and Host be explicitly marked on each roster item, and if so should Host use a fantasy icon/seal rather than technical text?
5. **Share controls:** besides large PIN + QR, should Lobby include explicit `SAO CHÉP MÃ` and/or `SAO CHÉP LIÊN KẾT` actions?
6. **Founder reveal detail (>10 Humans):** reveal only the 10 selected founders, or reveal the full authoritative rank including Waiting Queue order?
7. **Founder transition wording:** keep the historical phrase `XÃ HỘI ĐÃ ĐƯỢC THÀNH LẬP`, replace it with different wording, or use visual reveal without a fixed slogan?
8. **Non-host Start area:** should non-host players see a disabled `BẮT ĐẦU` control, or only a waiting/status message while the Host owns the Start action?

## Gate

Do not propose concrete Lobby layouts until the above materially relevant source ambiguities are resolved by the user.
