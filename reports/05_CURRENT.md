# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — Parent handoff `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` vẫn OPEN. Gameplay surfaces #1–#11 hiện đã có direct user-approved V1. Chat 05 đang chạy Source Validation cho End Report / scoring / extinction / Host replay — surface chính cuối cùng trong coverage matrix.

### Changed
- User approved Niên sử N1–N9 = option A.
- Niên sử desktop = large centered parchment/ledger over persistent lightly dimmed World Map.
- Top-level tabs remain exactly `HÀNH TRÌNH / THẾ GIỚI`.
- `HÀNH TRÌNH` groups personal history by `KIẾP #1/#2/...` with Round/Year timelines and authoritative milestone types; routine transactions stay out.
- `HÀNH TRÌNH` shows authoritative `ĐIỂM TÀI SẢN TRUNG BÌNH QUA CÁC KIẾP` plus compact score trend; no cash-only or full-married-household mislabeling.
- `THẾ GIỚI` uses Round/Year timeline plus `DÒNG THỜI GIAN / CHỈ SỐ`; indicator mode uses selected authoritative historical charts.
- World timeline has compact category filters and map/profile deep links only when authoritative structured linkage exists.
- World Event `XEM TRONG NIÊN SỬ` opens `THẾ GIỚI` at the matching authoritative Round/Event when supported.
- Mobile Niên sử uses full-height sheet, sticky tabs and one-at-a-time chart selector.
- `docs/UI_CHRONICLE_SOURCE_VALIDATION_V1.md` CLOSED — USER VERIFIED.
- Created `docs/UI_CHRONICLE_APPROVED_V1.md`.
- Created `H-20260907-061-06-CHRONICLE-DESIGN-IMPLEMENTATION` → OPEN for Chat 06.
- Updated coverage row #11 = USER-APPROVED V1; row #12 End Report = SOURCE VALIDATION ACTIVE.
- Created `docs/UI_END_REPORT_SOURCE_VALIDATION_V1.md` after cross-checking authoritative ranking/end-state/replay behavior.
- Confirmed engine `rankings()` sorts authoritative Human history by average score; early zero-living-Character end uses `Tuyệt chủng — Thất bại chung`; full-duration end uses `Kết thúc sau 32 vòng`.
- Confirmed same-room replay is Host-only after game end and clears ended engine state while retaining room/player connections.
- No gameplay, Rule Ledger, protocol, timers, scoring, end-condition or replay semantics changed by Chat 05.

### Source
- Latest direct user decisions in Chat 05.
- `docs/UI_CHRONICLE_APPROVED_V1.md`.
- `docs/UI_CHRONICLE_SOURCE_VALIDATION_V1.md`.
- `docs/UI_END_REPORT_SOURCE_VALIDATION_V1.md`.
- `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`.
- `docs/RULE_LEDGER.md` scoring/session rules.
- `server/backend/src/model.ts` PlayerHistory / score snapshot structures.
- `server/backend/src/engine.ts` authoritative end conditions and `rankings()`.
- `server/backend/src/authoritative-room.ts` Host-only replay and public ending/ranking state.
- `handoffs/H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE.md`.

### Impact
- Chat 06 may implement Niên sử V1 but must not parse raw chronology strings to invent structure/identity/causality or recalculate scoring truth.
- End Report is now the final direct design approval gate in the current gameplay-surface coverage sequence.
- End Report must use authoritative `endingReason` and ranking order; early extinction must never be converted into a standard winner state.
- Same-room replay UI must expose Host-only authority before interaction and communicate a fresh game rather than continuation of the ended world.
- After End Report approval, design coverage matrix can close at the source/design level, but implementation/visual QA remains separate.

### Verified
- N1–N9 are direct user decisions.
- Personal history and world history use separate authoritative backend structures.
- Engine ranking average uses accumulated authoritative score assets / active rounds and sorts descending.
- True extinction sets common-failure ending reason; full Round32 completion is the standard game end.
- Replay method is Host-only and available only after ended state; it resets engine/game state while preserving room connections.

### Unverified
- End Report ER1–ER9 final presentation choices.
- Whether every desired End Report personal/statistic field is already surfaced cleanly to the client; implementation may need a narrow Chat 03 contract addition.
- Client implementation/visual fidelity for all approved surfaces remains open.
- Previously noted inheritance/Residence/Birth/Chronicle structured contract details may still require narrow Chat 03 support during implementation.

### Handoff
- Chat 06: `H-20260907-061-06-CHRONICLE-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 06: existing World Event/Immigration/Elderly/Government/Queue/Residence/Marriage/Birth/Support/Recovery/Market/Voluntary/Status/Mandatory implementation handoffs remain active.
- Chat 05: resolve End Report ER1–ER9; if approved, create final End Report implementation handoff and close parent gameplay-surface design coverage at source/design level.
- Parent `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` remains OPEN until End Report approval.

### Open Issues
- End Report direct design approval OPEN.
- Some End Report / Chronicle structured client fields may require narrow Chat 03 support during implementation.
- Implementation/visual verification for approved specs remains OPEN.
