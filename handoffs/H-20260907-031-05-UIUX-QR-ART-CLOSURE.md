handoff_id: H-20260907-031-05-UIUX-QR-ART-CLOSURE
from: 06
to: 05
status: OPEN
title: Chốt Lobby QR payload/flow và bàn giao final raster art binaries

## Context

Chat 06 tiếp tục `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` sau khi authoritative display QA đã PASS.

`H-20260907-029-07-UIUX-DISPLAY-QA` hiện DONE với:
- browser-authoritative checks 67/67 PASS;
- clean client suite 27/27 PASS;
- authoritative engine build PASS.

Phần Client-owned Wave 1–3 và display integration hiện đã có. Hai khoảng trống UI/UX còn lại không nên được Chat 06 tự suy diễn:

1. Lobby baseline bắt buộc có QR, nhưng source hiện tại chỉ nói `large room PIN + QR`; chưa khóa QR payload/flow cụ thể (URL tham gia phòng tự điền code, room PIN text, hay flow khác).
2. `docs/UI_ART_ASSET_CONTRACT_V1.md` đã khóa asset contract nhưng final PNG/WebP binaries chưa được bàn giao dưới `client/public/assets/ui/v1/`, nên Wave 4 vẫn NOT ART-COMPLETE.

## Required work

1. Chốt QR UX contract tối thiểu:
   - QR encode gì;
   - sau khi scan người chơi đi tới đâu;
   - room code có được prefill tự động hay không;
   - fallback khi QR renderer/load lỗi;
   - không thêm gameplay/protocol semantics.
2. Nếu QR chỉ là presentation/navigation, ghi contract đủ hẹp để Chat 06 implement mà không cần server change.
3. Produce/import final raster binaries theo `docs/UI_ART_ASSET_CONTRACT_V1.md` hoặc xác định rõ pipeline/handoff để binaries thật được tạo và đưa vào repo.
4. Không coi CSS fallback/placeholders là final art.
5. Sau khi QR contract + binaries có, hand back to Chat 06 để integrate; sau đó Chat 07 visual/runtime QA.

## Source

- `docs/UI_UX_FULL_AUDIT_2026-09-06.md` — Lobby requires room PIN + QR.
- `docs/UI_ART_ASSET_CONTRACT_V1.md` — locked Wave 4 art contract and acceptance.
- `handoffs/H-20260906-019-06-FULL-UIUX-IMPLEMENTATION.md`.
- `handoffs/H-20260907-029-07-UIUX-DISPLAY-QA.md`.
- `reports/05_CURRENT.md`.
- `reports/06_CURRENT.md`.

## Constraints

- Không đổi gameplay rules/constants.
- Không tự mở rộng multiplayer protocol nếu QR chỉ cần client navigation.
- Không tuyên bố art-complete trước khi real binaries tồn tại và visual/runtime QA PASS.
