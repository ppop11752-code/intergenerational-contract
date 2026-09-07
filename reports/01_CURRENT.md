# 01 — GAME RULES & BALANCE — CURRENT REPORT

## Status

Rule Ledger đã chốt và bản đầy đủ đã được đồng bộ lên GitHub ngày 2026-09-07.

## Changed

- Thay `docs/RULE_LEDGER.md` overlay rút gọn bằng full authoritative Rule Ledger từ Migration Pack v3.
- Bản đầy đủ giữ nguyên OI-001 A1+B1+C1 / D-050 và công thức OI-002 Combined.
- Không thay đổi gameplay rule, engine, server hoặc client trong lần đồng bộ này.

## Source

- Full `01_RULE_LEDGER.md` trong Migration Pack v3.
- Latest explicit user decisions.
- GitHub `docs/DECISION_LOG.md` và `docs/OPEN_ISSUES.md` để kiểm tra trạng thái sau triển khai.

## Impact

GitHub không còn phụ thuộc vào Rule Ledger overlay; `docs/RULE_LEDGER.md` là bản gameplay baseline đầy đủ.

## Verified

- Source completeness: verified.
- OI-001 và OI-002: CLOSED — VERIFIED theo `docs/OPEN_ISSUES.md` và báo cáo kiểm toán hiện hành.
- Full Rule Ledger SHA-256 trước khi upload: `0a38111f565b757d617f04d5a9238829f7b12de89a5b91e57f1fce54315e4c06`.

## Unverified

Không có kiểm thử runtime mới trong lần đồng bộ tài liệu này; không có code change.

## Handoff

Chat 00 và các Chat chuyên môn sử dụng `docs/RULE_LEDGER.md` trên nhánh `main` làm nguồn luật đầy đủ.

## Open Issues

Không có open issue gameplay mới được tạo bởi lần đồng bộ này.
