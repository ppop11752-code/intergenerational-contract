# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — Handoff `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` đang được xử lý. Cụm `Landing → Lobby → Room → HUD` vẫn giữ approved V1. Mandatory UX V1 đã được user duyệt; tiếp theo Chat 05 chuyển sang Source Validation cho Status Purchase.

### Changed
- User chốt Mandatory presentation M1–M6.
- M1: large centered presentation card over persistent World Map.
- M2: **không hiển thị timer/countdown/progress** cho Mandatory; panel tự chuyển khi server authoritative advance.
- M3: luôn hiển thị mọi due obligation thành full line item.
- M4: married Mandatory normal presentation hiển thị Household totals, không spouse split/subsection.
- M5: forced liquidation hiển thị section `THANH LÝ BẮT BUỘC` ngay trong cùng card, gồm authoritative resources/units, 75% basis và cash/result data nơi có sẵn.
- M6: bankruptcy biến cùng card thành state mạnh `PHÁ SẢN HỘ GIA ĐÌNH`, tóm tắt shortfall/consequence và không expose Status/Voluntary sau đó.
- Tạo `docs/UI_MANDATORY_APPROVED_V1.md` làm authoritative user-approved Mandatory design spec.
- `docs/UI_MANDATORY_SOURCE_VALIDATION_V1.md` chuyển sang `CLOSED — USER VERIFIED (UI) / GAMEPLAY TIMING DEPENDENCY OPEN`.
- User đồng thời yêu cầu rút ngắn Mandatory reading duration để không quá dài. Vì đây là gameplay/server timing, Chat 05 không tự đổi 7s canonical baseline.
- Tạo handoff `H-20260907-047-01-MANDATORY-READING-DURATION` → OPEN để Chat 01 phân tích và lấy exact user gameplay decision.
- Tạo handoff `H-20260907-046-06-MANDATORY-DESIGN-IMPLEMENTATION` → OPEN cho Chat 06; implementation phải follow server timing hiện hành và không hardcode client-shorter delay.
- Cập nhật `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`: Mandatory = USER-APPROVED V1; Status là surface kế tiếp.
- Không thay gameplay, Rule Ledger, protocol, authoritative calculations hoặc timers trong Chat 05.

### Source
- Latest direct user decisions in Chat 05.
- `docs/UI_MANDATORY_APPROVED_V1.md`.
- `docs/UI_MANDATORY_SOURCE_VALIDATION_V1.md`.
- `docs/UI_GAMEPLAY_SURFACE_COVERAGE_V1.md`.
- `docs/RULE_LEDGER.md`.
- `handoffs/H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE.md`.

### Impact
- Chat 06 được phép implement Mandatory presentation V1 nhưng phải follow authoritative server phase transition.
- Chat 01 phải xử lý gameplay question về exact Mandatory reading duration; current canonical 7s vẫn có hiệu lực cho tới khi Rule Ledger thay đổi.
- Approved HUD phase/timer treatment phải đặc biệt không mô tả Mandatory như action deadline.
- Full-game UX coverage vẫn chưa complete; Status → Voluntary → remaining surface sequence tiếp tục.

### Verified
- Mandatory M1–M6 là direct user decisions.
- Mandatory V1 không thêm player agency, skip/confirm hoặc client-side economic calculation.
- Forced liquidation 75% basis và bankruptcy semantics giữ nguyên Rule Ledger.
- Separate gameplay timing dependency đã được handoff đúng domain thay vì silently changed.

### Unverified
- Exact new Mandatory reading duration requested by user.
- Client implementation/visual fidelity for Mandatory V1.
- Status Purchase direct UX approval.
- Remaining gameplay surfaces #3–#12 in the coverage matrix.

### Handoff
- Chat 06: `H-20260907-046-06-MANDATORY-DESIGN-IMPLEMENTATION` — OPEN.
- Chat 01: `H-20260907-047-01-MANDATORY-READING-DURATION` — OPEN.
- Chat 05: next = Source Validation Gate for Status Purchase.
- Parent handoff `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE` remains OPEN until the full coverage matrix exit criteria are met.

### Open Issues
- Mandatory exact reading duration gameplay decision OPEN.
- Mandatory implementation/visual verification OPEN.
- Status direct design approval OPEN.
- Voluntary + Market/Recovery/Support/Birth direct design approval OPEN.
- Marriage/Residence/Queue/Government/event/Niên sử/end-report and other gameplay surface approvals OPEN.
- Implementation/visual verification for approved shell specs remains OPEN.
