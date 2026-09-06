# 01 — GAME RULES & BALANCE — CURRENT REPORT

## Status

Hoàn thành phần chuẩn hóa luật liên quan OI-001/OI-002.

## Changed

- Chuẩn hóa winner theo HHA-based `AverageLifeAssetScore`.
- Xác nhận không còn private debt.
- Xác nhận married household dùng shared finances; Tax/ASXH tính per Character rồi trừ shared cash.
- Xác nhận Child được mua/giữ Resource nhưng chỉ produce từ Stage3.
- OI-002 được khóa với công thức Combined exact.
- OI-001 được khóa theo A1+B1+C1 / D-050.

## Source

Latest user decisions + Rule Ledger / Migration Pack v3 handoff.

## Impact

Engine/server phải bám đúng OI-001 lifecycle và OI-002 formula; không được suy diễn thêm gameplay.

## Verified

Source-level rule completeness theo handoff Chat 01.

## Unverified

Runtime implementation thuộc Chat 02/08.

## Handoff

OI-001: Chat 02 implementation -> Chat 08 independent re-audit.

## Open Issues

OI-001 remains open until independent verification. OI-002 is closed/verified.
