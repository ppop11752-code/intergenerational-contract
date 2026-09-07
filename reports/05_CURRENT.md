# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — Landing đã được user duyệt và khóa thành V1. Lobby đang ở Source Validation Gate theo workflow V2; chưa được phép đi sang concrete design alternatives trước khi user xác minh các presentation semantics còn mơ hồ. Room / HUD vẫn chờ sau Lobby.

### Changed
- Đã chạy bước đầu của `docs/UI_DESIGN_APPROVAL_WORKFLOW_V2.md` cho Lobby: rà `Game mô phỏng nhân sinh`, Migration Pack và lịch sử V5–V10.1.
- Tạo `docs/UI_LOBBY_SOURCE_VALIDATION_V1.md` để phân loại nguồn và cô lập các điểm chưa kiểm định.
- Xác nhận lại historical direct user decisions: Lobby có năng lượng kiểu Kahoot nhưng original; Host có thể Start từ min 1 Human; không cần đủ 30 người; không Ready; không manual NPC controls; <10 Humans thì server bù NPC đủ 10; =10 tất cả founder; >10 authoritative Founder Draw chọn top10 Human và phần còn lại vào Waiting Queue; NPC không draw.
- Current-user decisions A4–A9 vẫn giữ: PIN lớn + QR (PIN primary), Human-only roster, society-start info compact, Founder reveal non-blocking overlay/transition; compact portrait-grid Lobby roster.
- Migration-normalized nhưng chưa có direct-user provenance đầy đủ: Human names colorful ở center; subtle autofill/founder notes; exact Founder transition phrase `XÃ HỘI ĐÃ ĐƯỢC THÀNH LẬP`; exact reveal detail/timing presentation.
- Current implementation Lobby chỉ dùng làm reference, không design authority.
- Không thay gameplay, protocol, timer hoặc authoritative logic.

### Source
- Quyết định trực tiếp mới nhất của user trong Chat 05.
- Historical conversation `Game mô phỏng nhân sinh`.
- Project Migration Pack v1.0: `04_UI_UX_SPEC.md`, `06_DECISION_LOG.md`, `10_SOURCE_INDEX.md`, `PROJECT_MIGRATION_PACK_COMBINED.md`.
- `docs/UI_DESIGN_APPROVAL_WORKFLOW_V2.md`.
- `docs/UI_V5_V10_1_DECISION_RECONCILIATION_A_B.md`.
- `docs/UI_LOBBY_SOURCE_VALIDATION_V1.md`.

### Impact
- Lobby chưa được phép khóa layout hay handoff Chat 06 cho redesign.
- Chỉ còn cần user xác minh các presentation semantics chưa có provenance chắc chắn; gameplay room/founder rules không cần hỏi lại.
- Sau khi source-validation questions được trả lời, Chat 05 mới mô tả implementation hiện tại, phân tích điểm yếu và đưa 2–3 phương án Lobby.

### Verified
- Historical direct-user room rules và current reconciliation A4–A9 không mâu thuẫn.
- Frozen V5–V10.1 prototypes vẫn NON-AUTHORITATIVE.
- No fixed 10-slot founder roster is already resolved by current room capacity + direct decisions; không cần hỏi lại.

### Unverified
- Per-Human accent-color identity trong Lobby.
- Portrait semantics trước khi Character/Founder assignment.
- Mức độ hiển thị connection state.
- Cách đánh dấu Self/Host.
- Copy-code/copy-link actions ngoài PIN+QR.
- Founder reveal chỉ top10 hay full rank + Waiting Queue.
- Exact Founder transition wording.
- Non-host Start area presentation.

### Handoff
- Chat 06: `H-20260907-038-06-LANDING-DESIGN-IMPLEMENTATION` — Landing V1 only.
- Chat 05: chờ user trả lời Lobby source-validation questions; chưa có Lobby implementation handoff.

### Open Issues
- Landing implementation/visual verification vẫn OPEN sau handoff.
- Lobby source-validation gate đang OPEN.
- User design approval cho Lobby / Room / HUD vẫn OPEN.
