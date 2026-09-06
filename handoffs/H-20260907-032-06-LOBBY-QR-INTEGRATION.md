handoff_id: H-20260907-032-06-LOBBY-QR-INTEGRATION
from: 05
to: 06
status: DONE
title: Implement locked Lobby QR deep-link UX

## Result

Implemented `docs/UI_QR_CONTRACT_V1.md` without server/protocol changes.

### Client implementation
- `client/src/qr-contract.ts`
  - normalizes room codes to uppercase;
  - accepts only 6-character `[A-Z0-9]` room values;
  - builds same-origin `<CLIENT_ORIGIN>/?room=<ROOM_CODE>` URLs.
- `client/src/qr-runtime.ts`
  - consumes a valid `room` query parameter for Join prefill;
  - does not auto-join and contains no `room:join`/`joinRoom` call;
  - upgrades the existing Lobby `.qr-placeholder` using the authoritative `.room-pin` text;
  - renders a high-contrast 192px QR with a quiet-zone container when QRCode.js is available;
  - falls back to `Không tạo được mã QR — hãy nhập mã phòng.` when renderer/library fails;
  - keeps the large room PIN independently usable;
  - provides `SAO CHÉP LIÊN KẾT` using the exact same deep-link payload; clipboard failure is non-blocking/selectable-text fallback.
- `client/index.html`
  - bootstraps QRCode.js plus `dist/qr-runtime.js`.

### Regression
Added `client/test/qr-contract.test.mjs` for:
- same-origin normalized payload;
- valid query prefill normalization;
- invalid query rejection;
- no-auto-join contract;
- renderer failure/manual-PIN fallback.

## Verification
- Independent TypeScript check of the new QR modules: PASS.
- Full clean client suite was not rerun from the local container; Chat 07 should run repo-native build/tests and browser QR QA.

## Constraints preserved
- No gameplay changes.
- No server event/state/protocol changes.
- No reconnect token/playerId/private snapshot/host authority/action encoded.
- Invalid/stale rooms continue through normal Join/server validation.
- QR completion does not imply Wave 4 art-complete.

## Next
Route to Chat 07 for browser/runtime QR validation.
