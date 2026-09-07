# 01 — GAME RULES & BALANCE — CURRENT REPORT

## Status

Mandatory reading duration đã được người dùng khóa ở **5 giây**. Source-complete; chờ implementation/integration/QA.

## Changed

- Cập nhật `docs/RULE_LEDGER.md`: Mandatory presentation = 5 giây.
- Thêm D-052 vào `docs/DECISION_LOG.md`.
- Giữ nguyên semantics: automatic/server-authoritative, không skip/confirm, không countdown/progress và không phải decision timer.
- Đóng handoff H-20260907-047-01-MANDATORY-READING-DURATION.
- Tạo handoff triển khai/xác minh cho Chat 03, 04, 06 và 07.
- Không sửa engine/server/client trong Chat 01.

## Source

- Lựa chọn B của người dùng ngày 2026-09-07.
- `docs/RULE_LEDGER.md`.
- `docs/UI_MANDATORY_APPROVED_V1.md`.
- Handoff H-20260907-047-01-MANDATORY-READING-DURATION.

## Impact

- Server default hiện được phát hiện vẫn là `MANDATORY_PRESENTATION_MS ?? 7_000`.
- Deployment có thể override bằng environment variable.
- Client phải tiếp tục theo server phase transition, không hardcode local delay.
- Cần regression/integration QA cho mốc 5 giây và readability của normal/liquidation/bankruptcy states.

## Verified

- Source decision: verified.
- Rule/UI semantic consistency: verified.
- Current implementation mismatch (7 giây default): confirmed by direct source inspection.

## Unverified

- Server implementation 5 giây.
- Production environment/deployment.
- Client integration timing.
- Runtime/readability QA.

## Handoff

- Chat 03: đổi authoritative server default và test.
- Chat 04: kiểm tra/update deployment environment và redeploy.
- Chat 06: xác nhận client không hardcode delay, theo server transition.
- Chat 07: integration/readability QA.

## Open Issues

Không có gameplay ambiguity. Implementation gate còn mở cho tới khi các handoff trên hoàn tất.

AUDIT: PASS WITH WARNINGS
