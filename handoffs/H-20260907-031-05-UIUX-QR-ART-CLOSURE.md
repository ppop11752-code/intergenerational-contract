handoff_id: H-20260907-031-05-UIUX-QR-ART-CLOSURE
from: 06
to: 05
status: DONE
title: Chốt Lobby QR payload/flow và bàn giao final raster art binaries

## Context

Chat 06 tiếp tục `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` sau khi authoritative display QA đã PASS.

`H-20260907-029-07-UIUX-DISPLAY-QA` hiện DONE với:
- browser-authoritative checks 67/67 PASS;
- clean client suite 27/27 PASS;
- authoritative engine build PASS.

Phần Client-owned Wave 1–3 và display integration hiện đã có. Hai khoảng trống UI/UX còn lại không nên được Chat 06 tự suy diễn:

1. Lobby baseline bắt buộc có QR, nhưng source hiện tại chỉ nói `large room PIN + QR`; chưa khóa QR payload/flow cụ thể.
2. `docs/UI_ART_ASSET_CONTRACT_V1.md` đã khóa asset contract nhưng final PNG/WebP binaries chưa được bàn giao dưới `client/public/assets/ui/v1/`.

## Result

### QR UX contract — LOCKED

Created `docs/UI_QR_CONTRACT_V1.md`.

Canonical behavior:
- QR payload = same-origin `<CLIENT_ORIGIN>/?room=<ROOM_CODE>`.
- Scan opens normal Landing.
- Valid room code is normalized/prefilled into Join Room.
- Player still explicitly presses `THAM GIA`; QR never auto-joins.
- No reconnect token/playerId/private state/gameplay action is encoded.
- QR renderer failure leaves large text room PIN/manual join fully usable.
- Invalid/stale room uses normal existing client/server validation/error flow.
- No server event/state/protocol change required.

### Final raster delivery — PIPELINE LOCKED, BINARIES STILL BLOCKED

Created `docs/UI_ART_BINARY_DELIVERY_PIPELINE_V1.md`.

Pipeline locks:
- exact asset root and manifest paths from `docs/UI_ART_ASSET_CONTRACT_V1.md`;
- production batches A–D: critical world shell, frames/icons, portraits, ambience/transitions;
- integer-pixel authoring/export rules;
- binary-capable import methods only; no base64/data-URI substitution;
- Chat 05 per-batch visual review;
- Chat 06 integration gate;
- Chat 07 final visual/runtime QA gate.

Direct GitHub tree verification shows `client/public/assets/ui/v1/` currently contains only `README.md` and `manifest.json`; required PNG/WebP subfolders/files are still absent.

Therefore Wave 4 remains **NOT ART-COMPLETE**. This handoff is DONE because QR semantics and the missing-binary production/import path are now fully specified, not because final art binaries already exist.

## Follow-up

- Chat 06 may implement the QR contract immediately.
- Final raster binaries must be produced/exported and committed through a binary-capable workflow at the exact contract paths.
- After binaries exist: Chat 05 visual review → Chat 06 integration → Chat 07 visual/runtime QA.

## Source

- `docs/UI_UX_FULL_AUDIT_2026-09-06.md`.
- `docs/UI_ART_ASSET_CONTRACT_V1.md`.
- `docs/UI_QR_CONTRACT_V1.md`.
- `docs/UI_ART_BINARY_DELIVERY_PIPELINE_V1.md`.
- `client/public/assets/ui/v1/README.md`.
- `client/public/assets/ui/v1/manifest.json`.
- `reports/05_CURRENT.md`.
- `reports/06_CURRENT.md`.

## Constraints preserved

- No gameplay rules/constants changed.
- No multiplayer protocol expansion for QR.
- CSS fallback/placeholders are not final art.
- No art-complete/release-ready claim before real binaries + visual/runtime QA PASS.
