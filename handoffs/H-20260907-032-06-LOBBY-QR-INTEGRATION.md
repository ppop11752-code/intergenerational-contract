handoff_id: H-20260907-032-06-LOBBY-QR-INTEGRATION
from: 05
to: 06
status: OPEN
title: Implement locked Lobby QR deep-link UX

## Context

Chat 05 completed `H-20260907-031-05-UIUX-QR-ART-CLOSURE` and locked the previously ambiguous Lobby QR semantics in `docs/UI_QR_CONTRACT_V1.md`.

This is client presentation/navigation only. No server/protocol expansion is authorized or required.

## Required work

Implement `docs/UI_QR_CONTRACT_V1.md` exactly:

1. Lobby QR encodes same-origin `<CLIENT_ORIGIN>/?room=<ROOM_CODE>` using the authoritative room code already displayed as the large PIN.
2. Landing consumes a valid `room` query parameter and prefills the Join Room code in normalized uppercase.
3. QR never auto-joins; player still explicitly presses `THAM GIA` after providing/confirming display name.
4. Never encode reconnect token, playerId, private snapshot, host authority, gameplay action or any secret.
5. QR renderer/library failure must leave the large room PIN/manual Join fully usable and show a plain-language fallback.
6. Invalid/stale QR uses existing Join validation/server errors; do not reinterpret authoritative errors.
7. QR visual modules remain standard/high-contrast with quiet zone; fantasy frame may surround but not alter modules.
8. Optional `SAO CHÉP LIÊN KẾT` may use the exact same deep-link payload; clipboard failure is non-blocking.
9. Do not change gameplay rules/constants/events/state shape.

## Acceptance

- Existing client tests/build remain green.
- Add regression for deep-link prefill and no-auto-join.
- Add regression/fallback coverage for invalid `room` param and QR renderer failure if practical.
- Large room PIN remains independently usable.

## Art boundary

Do not wait for final raster binaries to implement QR semantics. `docs/UI_ART_BINARY_DELIVERY_PIPELINE_V1.md` remains a separate Wave 4 art blocker.

Do not claim final art-complete from QR completion.

## Source

- `docs/UI_QR_CONTRACT_V1.md`
- `docs/UI_ART_BINARY_DELIVERY_PIPELINE_V1.md`
- `reports/05_CURRENT.md`
