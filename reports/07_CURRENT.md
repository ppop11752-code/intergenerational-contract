# 07 — RELEASE & QA — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

Bị chặn — `H-20260907-033-07-LOBBY-QR-QA` rerun xác nhận H034 đã sửa xong QR cropping/scannability, nhưng phát hiện defect mới ở renderer-unavailable fallback: `qr-runtime` có vòng lặp MutationObserver khi QRCode.js không tồn tại. Đã giao Chat 06 qua `H-20260907-035-06-LOBBY-QR-FALLBACK-LOOP`.

### Changed

- Rerun H033 sau `H-20260907-034-06-LOBBY-QR-CROPPING`.
- Main browser QA run `34051902501`, head `46eca73a2363aa77ea0cb2958d277e8c7bf7e1b8`.
- Artifact `9994809830`, digest `sha256:a5fadb67afd962b9445e6ef1482b234418e0bb709205b0b64ba6d89941c29290`.
- Clean client suite sau H034: 33/33 PASS.
- 21 production browser checks PASS trước nhánh renderer-unavailable, gồm desktop/mobile decode, quiet zone, payload/privacy, copy-link, clipboard failure, deep-link/no-auto-join, invalid/stale room.
- Xác định fallback hang không còn là harness-only: source `qr-runtime.ts` cho thấy fallback `host.innerHTML` tự kích global MutationObserver rồi rerender vô hạn vì same-URL short-circuit chỉ áp dụng khi `qrReady === "1"`.
- Tạo `H-20260907-035-06-LOBBY-QR-FALLBACK-LOOP`; H033 chuyển BLOCKED.

### Source

- `handoffs/H-20260907-033-07-LOBBY-QR-QA.md`
- `handoffs/H-20260907-034-06-LOBBY-QR-CROPPING.md`
- `handoffs/H-20260907-035-06-LOBBY-QR-FALLBACK-LOOP.md`
- `docs/UI_QR_CONTRACT_V1.md`
- `client/src/qr-runtime.ts`
- `client/src/qr-contract.ts`
- `client/test/qr-contract.test.mjs`
- `qa/lobby-qr-e2e.mjs`
- workflow run `34051902501`
- artifact `9994809830`

### Impact

QR chính đã quét được trên desktop và compact/mobile; defect cropping đã hết. Tuy nhiên contract yêu cầu renderer failure phải graceful, giữ PIN/Host Start/manual link usable. Mutation loop hiện vi phạm gate này nên H033 chưa thể PASS. Không có gameplay/server/protocol change. Full UI vẫn chưa release-ready; H019 art/final visual scope còn mở.

### Verified

- Clean client suite: PASS 33/33.
- Lobby PIN + QR: PASS.
- Desktop native QR decode: PASS.
- Mobile 390x844 native QR decode: PASS.
- QR modules 192x192 + native white quiet zone 16px, no clipping: PASS.
- Exact same-origin uppercase room payload: PASS.
- Payload privacy boundary: PASS.
- Host Start remains usable in normal QR path: PASS.
- Copy-link exact payload: PASS.
- Clipboard failure non-blocking: PASS.
- Valid deep-link Landing/prefill/helper: PASS.
- No auto-join before explicit `THAM GIA`: PASS.
- Explicit Join uses normal `room:join`: PASS.
- Invalid query ignored; normal Join usable: PASS.
- Stale room surfaces existing `ROOM_NOT_FOUND`: PASS.
- Renderer-unavailable loop: verified by repeated browser hangs isolated to QRCode-unavailable path plus deterministic source control-flow inspection.

### Unverified

- Graceful QRCode.js-unavailable fallback after an idempotency fix; blocked by H035.
- Final raster-art visual-complete scope under H019 remains open.

### Handoff

Chat 06 xử lý `H-20260907-035-06-LOBBY-QR-FALLBACK-LOOP`, sau đó trả H033 về Chat 07 để rerun riêng fallback và close nếu PASS.

### Open Issues

- `H-20260907-033-07-LOBBY-QR-QA`: BLOCKED / FAIL pending H035.
- `H-20260907-034-06-LOBBY-QR-CROPPING`: DONE; fix independently verified for desktop/mobile decode.
- `H-20260907-035-06-LOBBY-QR-FALLBACK-LOOP`: OPEN.
- `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION`: OPEN — art/final visual scope còn việc.
- `H-20260907-029-07-UIUX-DISPLAY-QA`: DONE / PASS.
- OI-001–OI-006 remain CLOSED/VERIFIED.
