# 01 — GAME RULES & BALANCE — CURRENT REPORT

## Status

Residence identity/lifecycle đã được người dùng khóa theo **package A**. Source-complete; OI-007 chờ implementation và independent audit.

## Changed

- Cập nhật `docs/RULE_LEDGER.md` với lifecycle chính xác cho stable Residence identity, current assignment, marriage, child/survivor/orphan, adulthood, siblings và empty/abandoned/reclaimed.
- Thêm D-053 vào `docs/DECISION_LOG.md`.
- Đồng bộ tài liệu Residence/Family UI với authoritative dependency.
- Đóng H-20260907-068.
- Mở OI-007 và handoff H-069 → H-072.
- Không sửa engine/server/client trong Chat 01.

## Source

- Lựa chọn A của người dùng ngày 2026-09-07.
- `docs/RULE_LEDGER.md`.
- D-053.
- `docs/UI_RESIDENCE_FAMILY_APPROVED_V1.md`.
- H-20260907-068.

## Impact

- Engine cần Residence entity độc lập, stable IDs, Character `currentResidenceId`, deterministic transitions và stable presentation coordinates.
- Server contract phải expose current Residence/map/lifecycle/history data, không để client infer từ Household, family links hoặc proximity.
- Client phải bind authoritative state và giữ Chronicle access sau reclaim.
- Không có tác động balance tài chính: coordinates/proximity chỉ presentation; không có ownership/property/inheritance-of-house mechanic.

## Verified

- User decision and source wording: verified.
- Rule Ledger, Decision Log và approved Residence/Family UI semantics: reconciled.
- No new gameplay mechanic introduced.

## Unverified

- Engine implementation and regression tests.
- Public/private snapshot and map contract.
- Client integration.
- Independent lifecycle/audit gate.

## Handoff

- Chat 02: H-069 — Residence state and lifecycle.
- Chat 03: H-070 — snapshot/map contract after H-069.
- Chat 06: H-071 — client integration after H-070.
- Chat 08: H-072 — independent audit and OI-007 closure decision.

## Open Issues

OI-007 remains OPEN — SOURCE LOCKED / IMPLEMENTATION PENDING.

AUDIT: PASS WITH WARNINGS
