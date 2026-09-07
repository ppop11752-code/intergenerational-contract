# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — Parent handoff `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` vẫn OPEN. Landing/Lobby/Room/HUD, Mandatory, Status, Voluntary shell, Market, Recovery, Support, Birth, Marriage, Residence/Family và Waiting Queue/Reconnect đã có direct user-approved V1. Chat 05 hiện chạy Source Validation cho Government / social systems.

### Changed
- User approved Waiting Queue/Reconnect Q1–Q8 = option A.
- Reconnect Landing wording is now `KẾT NỐI LẠI PHÒNG ...` with explicit permanent NPC takeover + Queue-end/no-reclaim explanation.
- Successful reconnect uses brief `ĐÃ KẾT NỐI LẠI` information state, then enters Queue spectator view automatically.
- Queue V1 keeps the World Map visible as spectator surface with compact `HÀNG CHỜ #N`, own position + Humans ahead, no ETA/full ordered roster by default.
- Old Character remains inspectable as `NHÂN VẬT CŨ · NPC ĐIỀU KHIỂN` but never controllable/current.
- Human death, late join and non-founder paths reuse one Queue spectator UX with reason-specific context.
- Queue → newborn uses brief `MỘT CUỘC ĐỜI MỚI BẮT ĐẦU`, authoritative Character/Residence reveal, camera focus, then normal active shell.
- `docs/UI_WAITING_QUEUE_RECONNECT_SOURCE_VALIDATION_V1.md` CLOSED — USER VERIFIED.
- Created `docs/UI_WAITING_QUEUE_RECONNECT_APPROVED_V1.md`.
- Updated `docs/UI_LANDING_APPROVED_V1.md` reconnect copy to remove reclaim ambiguity.
- Created `H-20260907-056-06-WAITING-QUEUE-RECONNECT-DESIGN-IMPLEMENTATION` → OPEN for Chat 06.
- Updated `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`: Queue/Reconnect = USER-APPROVED V1; Government/social systems = SOURCE VALIDATION ACTIVE.
- Created `docs/UI_GOVERNMENT_SOCIAL_SYSTEMS_SOURCE_VALIDATION_V1.md` after cross-checking Rule Ledger and current public server snapshot.
- Current public contract exposes sufficient Government/social-system presentation values: budget, reserve floor, debt/ceiling, tax/maintenance/borrowing/debt repayment/subsidies, interventions/fiscal crisis, PAYG, Support Fund, Pension Reserve, pension target/paid/state transfer/payout ratio/crisis, workers/elders.
- No gameplay, Rule Ledger, protocol, timers, queue/reconnect rules, Government strategy or social-security calculations changed by Chat 05.

### Source
- Latest direct user decisions in Chat 05.
- `docs/UI_WAITING_QUEUE_RECONNECT_APPROVED_V1.md`.
- `docs/UI_WAITING_QUEUE_RECONNECT_SOURCE_VALIDATION_V1.md`.
- `docs/UI_LANDING_APPROVED_V1.md` updated reconnect wording.
- `docs/UI_GOVERNMENT_SOCIAL_SYSTEMS_SOURCE_VALIDATION_V1.md`.
- `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`.
- `docs/RULE_LEDGER.md` sections J/K.
- `server/backend/src/authoritative-room.ts` current public snapshot contract.
- `handoffs/H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE.md`.

### Impact
- Chat 06 may implement Queue/Reconnect V1; all reconnect copy must reflect permanent no-reclaim semantics.
- Landing reconnect implementation must use the updated approved copy.
- Government is now the active direct-approval gate.
- Government panel must remain read-only/automatic and consume authoritative public values rather than client-side financial/social calculations.
- Full-game UX coverage remains incomplete.

### Verified
- Q1–Q8 are direct user decisions.
- Queue/Reconnect V1 preserves disconnect→NPC takeover and reconnect→Queue-end/no-reclaim rules.
- Government/social-system source gate matches current Rule Ledger split between personal funded ASXH, PAYG, Pension Reserve and Support Fund.
- Current server snapshot exposes the principal data needed for Government V1 presentation.

### Unverified
- Government G1–G8 final presentation choices.
- Elderly medical/mortality/Grief/inheritance, immigration/NPC takeover, World Event detail, Niên sử detail and End Report UX approval.
- Client implementation/visual fidelity for approved gameplay surfaces remains open.
- Some Residence/Birth/identity mapping details may still need narrow Chat 03 contract verification during implementation.

### Handoff
- Chat 06: `H-20260907-056-06-WAITING-QUEUE-RECONNECT-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 06: existing Residence/Marriage/Birth/Support/Recovery/Market/Voluntary/Status/Mandatory implementation handoffs remain active.
- Chat 05: resolve Government G1–G8, then continue elderly medical/mortality/Grief/inheritance.
- Parent `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` remains OPEN.

### Open Issues
- Government/social-system direct design approval OPEN.
- Elderly medical/mortality/Grief/inheritance and remaining gameplay-surface approvals OPEN.
- Implementation/visual verification for approved specs remains OPEN.
