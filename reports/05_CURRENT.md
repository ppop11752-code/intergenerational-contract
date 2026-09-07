# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — Handoff `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` vẫn OPEN. Landing/Lobby/Room/HUD, Mandatory và Status Purchase đã có direct user-approved V1. Chat 05 hiện chuyển sang Source Validation Gate cho Voluntary shell trước khi thiết kế Market/Recovery/Support/Birth.

### Changed
- User chốt Status Purchase S1–S7.
- S1 A: large centered three-card chooser over persistent World Map.
- S2 B: authoritative 15s countdown **chỉ hiển thị ở HUD phase/timer**, không lặp lại trong Status panel.
- S3 A: mỗi tier card luôn hiện tier name, authoritative fee, affordability, main access/unlocks và `HIỆU LỰC VÒNG SAU`.
- S4 A: married representative thấy `CHỌN CHO HỘ GIA ĐÌNH`; cards hiển thị authoritative household fee trực tiếp, không foreground single fee.
- S5 B: timeout fallback explanation chỉ xuất hiện khi authoritative timer <5s.
- S6 B: Noble competition/cap được giải thích ngay sau khi player chọn Noble; không front-load full competition detail trước click, nhưng UI không được imply guaranteed Noble.
- S7 A: valid selection → brief `ĐÃ CHỌN — HIỆU LỰC VÒNG SAU` state → authoritative transition sang Voluntary, không second confirmation.
- `docs/UI_STATUS_SOURCE_VALIDATION_V1.md` chuyển sang `CLOSED — USER VERIFIED`.
- Tạo `docs/UI_STATUS_APPROVED_V1.md` làm authoritative user-approved Status design spec.
- Tạo handoff `H-20260907-048-06-STATUS-DESIGN-IMPLEMENTATION` → OPEN cho Chat 06.
- Cập nhật `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`: Status = USER-APPROVED V1; Voluntary shell = SOURCE VALIDATION ACTIVE.
- Tạo `docs/UI_VOLUNTARY_SOURCE_VALIDATION_V1.md` cho shared 60s Voluntary shell trước detailed Market/Recovery/Support/Birth passes.
- Không thay gameplay, Rule Ledger, protocol, timers, fees, fallback, Noble resolution hoặc authoritative calculations.

### Source
- Latest direct user decisions in Chat 05.
- `docs/UI_STATUS_APPROVED_V1.md`.
- `docs/UI_STATUS_SOURCE_VALIDATION_V1.md`.
- `docs/UI_VOLUNTARY_SOURCE_VALIDATION_V1.md`.
- `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`.
- `docs/RULE_LEDGER.md`.
- `docs/UI_USER_DESIGN_DECISIONS_2026-09-07.md`.
- `handoffs/H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE.md`.

### Impact
- Chat 06 may implement Status V1 but must keep timer only in approved HUD and must not duplicate it inside Status chooser.
- Noble selection must remain pending end-round resolution until server confirms result.
- Voluntary design now becomes the next user-approval gate; Chat 06 must not invent final Voluntary/Market/Recovery/Support/Birth layout before approval.
- Full-game UX coverage remains incomplete.

### Verified
- Status S1–S7 are direct user decisions.
- Status V1 preserves current-round vs next-round semantics.
- No client-side fee/affordability/fallback/Noble/refund calculation is authorized.
- Voluntary authoritative constraints cross-checked: one 60s total timer; switching surfaces does not reset/pause; only Market/Recovery/Support/Birth are Voluntary action groups.

### Unverified
- Client implementation/visual fidelity for Status V1.
- Voluntary shell choices V1–V6.
- Detailed Market/Recovery/Support/Birth surface approvals.
- Remaining gameplay surfaces #4–#12 in coverage matrix.
- Mandatory exact reading duration remains external gameplay dependency under Chat 01.

### Handoff
- Chat 06: `H-20260907-048-06-STATUS-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 06: `H-20260907-046-06-MANDATORY-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 01: `H-20260907-047-01-MANDATORY-READING-DURATION` — OPEN.
- Chat 05: resolve Voluntary V1–V6, then continue Market/Recovery/Support/Birth.
- Parent `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` remains OPEN.

### Open Issues
- Mandatory exact reading duration gameplay decision OPEN.
- Mandatory/Status implementation and visual verification OPEN.
- Voluntary shell direct design approval OPEN.
- Market/Recovery/Support/Birth direct design approval OPEN.
- Marriage/Residence/Queue/Government/event/Niên sử/end-report and other gameplay surface approvals OPEN.
