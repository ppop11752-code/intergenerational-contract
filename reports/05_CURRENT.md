# 05 — UI/UX & ART — CURRENT REPORT

## AI SPECIALIST REPORT

### Status
Đang làm — Landing đã được user duyệt và khóa thành V1; Lobby / Room / HUD vẫn đang chờ thiết kế và duyệt trực tiếp. Workflow thiết kế đã được nâng lên V2 với bước kiểm định lịch sử/source bắt buộc trước mỗi màn/cụm mới.

### Changed
- User bổ sung một bước bắt buộc vào workflow Chat 05: trước khi đưa phương án thiết kế mới, phải đọc lại phần liên quan của chat `Game mô phỏng nhân sinh`, Project Migration Pack và lịch sử thay đổi V5–V10.1, sau đó hỏi user để xác định các thông tin chưa được kiểm định trước khi đề xuất.
- Tạo `docs/UI_DESIGN_APPROVAL_WORKFLOW_V2.md` làm workflow active cho Chat 05.
- Workflow V2 phân loại mỗi statement UI thành: `CURRENT_USER_CONFIRMED`, `HISTORICAL_USER_CONFIRMED`, `MIGRATION_NORMALIZED`, `PROTOTYPE_ONLY`, `REJECTED_OR_SUPERSEDED`, `CONFLICTING`, `UNVERIFIED`.
- Chỉ các mục materially relevant thuộc nhóm chưa đủ xác nhận (`MIGRATION_NORMALIZED`, `PROTOTYPE_ONLY`, `CONFLICTING`, `UNVERIFIED`) mới được hỏi lại user; không hỏi lại các quyết định current-user-confirmed nếu không có mâu thuẫn thật.
- Sau historical/source verification gate mới được mô tả implementation hiện tại, phân tích yếu điểm, đưa 2–3 phương án, recommendation và chờ user duyệt.
- Migration Pack vẫn là nguồn reconstruction quan trọng nhưng không còn được coi là direct user approval khi provenance của một chi tiết UI không rõ.
- Landing V1 đã trải qua reconciliation lịch sử A/B/C trước khi user duyệt nên vẫn giữ trạng thái approved; workflow V2 áp dụng bắt buộc từ Lobby trở đi và cho mọi revision mới.
- Không thay gameplay, protocol, timer hoặc authoritative logic.

### Source
- Quyết định trực tiếp mới nhất của user trong Chat 05 ngày 2026-09-07.
- `docs/UI_DESIGN_APPROVAL_WORKFLOW_V2.md`.
- Project Migration Pack v1.0: `04_UI_UX_SPEC.md`, `06_DECISION_LOG.md`, `10_SOURCE_INDEX.md`, `PROJECT_MIGRATION_PACK_COMBINED.md`.
- Historical conversation `Game mô phỏng nhân sinh`.
- `docs/UI_LANDING_APPROVED_V1.md` và các reconciliation docs hiện tại.

### Impact
- Lobby / Room / HUD không được đi thẳng từ baseline/spec sang mockup; phải qua source-validation questions trước.
- Các chi tiết chuẩn hóa trong Migration Pack hoặc xuất hiện trong V5–V10.1 không được kế thừa ngầm khi chưa xác minh provenance.
- Chat 06 chỉ được triển khai screen/cluster đã user-approved; QA PASS không thay user design approval.
- Handoff Landing V1 vẫn hợp lệ vì Landing đã được historical reconciliation + direct approval trước khi workflow V2 được formalize.

### Verified
- Migration Pack xác nhận V5–V10.1 là frozen/non-authoritative prototypes; `D-041` đánh dấu chúng rejected as final/authoritative UI.
- `04_UI_UX_SPEC.md` là normalization phục vụ rebuild sau defer, nhưng provenance direct-user của từng chi tiết riêng lẻ không phải lúc nào cũng tự chứng minh; workflow V2 xử lý đúng khoảng trống này.
- Landing V1 đã được user xác nhận trực tiếp sau nhiều vòng reconciliation và design review.

### Unverified
- Lobby / Room / HUD concrete compositions chưa được user duyệt.
- Các historical/Migration-Pack statements riêng cho Lobby cần được source-validated theo workflow V2 trước khi đưa phương án Lobby.

### Handoff
- Chat 06: `H-20260907-038-06-LANDING-DESIGN-IMPLEMENTATION` — implement Landing V1 only.
- Chat 05: bước tiếp theo là chạy workflow V2 cho Lobby: historical/source sweep → user verification questions → design alternatives.

### Open Issues
- Landing implementation/visual verification vẫn OPEN sau handoff.
- User design approval cho Lobby / Room / HUD vẫn OPEN.
- Lobby source-validation gate chưa chạy xong.
