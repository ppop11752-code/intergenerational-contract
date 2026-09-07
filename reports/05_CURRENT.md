# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — Parent handoff `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` remains OPEN. Landing/Lobby/Room/HUD, Mandatory, Status Purchase, Voluntary shell, Market và Recovery now have direct user-approved V1 specs. Chat 05 is currently running Source Validation for Support.

### Changed
- User approved Recovery RC1–RC7, all option A.
- Recovery V1 = large centered desktop panel with three horizontal Low/Mid/High cards.
- Every Recovery card always shows current Pool/Capacity, Pending next round, Capacity Remaining and Cost/unit.
- Each card includes Pool/Capacity gauge and per-card `− / editable quantity / + / MAX / PHỤC HỒI` controls.
- Footer shows authoritative available cash + remaining spending quota where applicable.
- Active `ĐẦU TƯ CÔNG` effect uses a compact badge next to authoritative affected cost.
- Successful Recovery keeps panel open, refreshes authoritative data and shows inline `HIỆU LỰC VÒNG SAU` confirmation.
- `docs/UI_RECOVERY_SOURCE_VALIDATION_V1.md` CLOSED — USER VERIFIED.
- Created `docs/UI_RECOVERY_APPROVED_V1.md`.
- Created handoff `H-20260907-051-06-RECOVERY-DESIGN-IMPLEMENTATION` → OPEN for Chat 06.
- Updated `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`: Recovery = USER-APPROVED V1; Support = SOURCE VALIDATION ACTIVE.
- Created `docs/UI_SUPPORT_SOURCE_VALIDATION_V1.md`.
- Support authoritative semantics cross-checked: voluntary Support targets direct parents/children only; spouse/siblings/unrelated invalid; multiple transfers allowed; separate from Mandatory support; authoritative cash/quota constraints; eligible targets come from private server state.
- No gameplay, Rule Ledger, protocol, timers, Recovery/Support formulas, kinship or authoritative calculations changed.

### Source
- Latest direct user decisions in Chat 05.
- `docs/UI_RECOVERY_APPROVED_V1.md`.
- `docs/UI_RECOVERY_SOURCE_VALIDATION_V1.md`.
- `docs/UI_SUPPORT_SOURCE_VALIDATION_V1.md`.
- `docs/UI_VOLUNTARY_APPROVED_V1.md`.
- `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`.
- `docs/RULE_LEDGER.md`.
- `server/backend/src/engine.ts`.
- `server/backend/src/authoritative-room.ts`.
- `handoffs/H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE.md`.

### Impact
- Chat 06 may implement Recovery V1 but must consume authoritative Recovery quotes and not recompute capacity/cost/eligibility client-side.
- Support is now the active direct-approval gate; Chat 06 must not invent final Support target/amount UX before approval.
- Raw Character IDs must not be used as player-facing Support target selection.
- Full-game UX coverage remains incomplete.

### Verified
- Recovery RC1–RC7 are direct user decisions.
- Recovery V1 preserves next-round effect and one shared Voluntary 60s timer.
- Current private server snapshot exposes eligible Support targets during the acting player's Voluntary turn.

### Unverified
- Support SP1–SP7 final presentation choices.
- Whether current client-facing identity data is sufficient for polished NPC/Human Support target cards without a narrow contract addition.
- Birth direct UX approval.
- Remaining gameplay surfaces #4–#12 in coverage matrix.
- Client implementation/visual fidelity for approved gameplay surfaces.
- Mandatory reading-duration gameplay dependency remains external to Chat 05.

### Handoff
- Chat 06: `H-20260907-051-06-RECOVERY-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 06: existing approved Mandatory/Status/Voluntary/Market implementation handoffs remain active.
- Chat 01: `H-20260907-047-01-MANDATORY-READING-DURATION` — external gameplay timing dependency.
- Chat 05: resolve Support SP1–SP7, then continue Birth.
- Parent `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` remains OPEN.

### Open Issues
- Support direct design approval OPEN.
- Birth direct design approval OPEN.
- Marriage/Residence/Queue/Government/event/Niên sử/end-report and remaining gameplay surface approvals OPEN.
- Implementation/visual verification for approved specs remains OPEN.
