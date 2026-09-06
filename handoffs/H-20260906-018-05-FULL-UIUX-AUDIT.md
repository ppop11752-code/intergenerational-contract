handoff_id: H-20260906-018-05-FULL-UIUX-AUDIT
from: 00
to: 05
status: OPEN
title: Rà soát toàn bộ UI/UX trước phát hành người chơi

## Context

OI-001 đến OI-006 đã đóng trong phạm vi kỹ thuật/QA hiện tại. Tuy nhiên Project chưa có một lần rà soát toàn diện UI/UX/art ở cấp toàn game. `reports/05_CURRENT.md` mới phản ánh công việc OI-004 Tutorial và còn chứa nhận định cũ từ thời điểm client chưa tồn tại.

Người dùng yêu cầu tiếp tục công việc nhưng chưa điều chỉnh `RELEASE_STATUS.md` lúc này.

## Required work

Chat 05 cần rà toàn bộ client hiện tại theo góc nhìn UI/UX & ART, không chỉ Tutorial:

1. Kiểm kê các màn hình/luồng đang có trong `client/`.
2. Đối chiếu với UI/UX baseline/spec hiện có trong `docs/` và Migration Pack khi cần.
3. Xác định phần nào đã hoàn thiện, phần nào còn prototype/thô/thiếu.
4. Kiểm tra tối thiểu: landing/lobby, room, turn/phase UI, mandatory/status/voluntary, market, marriage/family/birth, queue/reconnect, tutorial/help, end-game/results, responsive/readability, feedback/error/empty/loading states, visual consistency và animation nếu có.
5. Không tự thay gameplay hay protocol.
6. Nếu spec UI còn thiếu nhưng không ảnh hưởng gameplay, đề xuất phương án và recommendation; nếu có hành vi chưa được định nghĩa, handoff về Chat 00/01 thay vì tự suy diễn.
7. Cập nhật `reports/05_CURRENT.md` với kết luận mới nhất.
8. Nếu cần triển khai client, tạo handoff cụ thể sang Chat 06 theo danh sách hạng mục ưu tiên.

## Constraints

- Không sửa `docs/RELEASE_STATUS.md` trong handoff này.
- Không tự tuyên bố final release.
- Không thay gameplay để giải quyết vấn đề UI.

## Expected output

- Một đánh giá toàn diện về mức độ hoàn thiện UI/UX hiện tại.
- Danh sách gap theo mức ưu tiên.
- Spec/recommendation đủ rõ để Chat 06 triển khai.
- `reports/05_CURRENT.md` cập nhật.
- Handoff sang Chat 06 nếu có phần cần code tiếp.
