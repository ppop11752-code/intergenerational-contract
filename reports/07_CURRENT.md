# 07 — RELEASE & QA — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

Hoàn thành — `H-20260907-033-07-LOBBY-QR-QA` PASS. QR cropping và renderer-unavailable fallback loop đều đã được sửa và independently rerun thành công.

### Changed

- Rerun H033 sau `H-20260907-035-06-LOBBY-QR-FALLBACK-LOOP`.
- Final workflow `Lobby QR E2E` run `34052814658`, head `02bd76f002d7aec439a8771cd32639cb0478f991` PASS.
- Artifact `9995069093`, digest `sha256:c8eccea29c6c934d4c124688323de345c6675180dc0a99b430ef1853e24cf7ca`.
- Clean client suite: 33/33 PASS.
- Browser QA: 25/25 PASS.
- Renderer-unavailable fallback now completes without MutationObserver hang and preserves exact fallback wording, PIN and Host Start.
- H033 closed. No new defect handoff.

### Source

- `handoffs/H-20260907-033-07-LOBBY-QR-QA.md`
- `handoffs/H-20260907-034-06-LOBBY-QR-CROPPING.md`
- `handoffs/H-20260907-035-06-LOBBY-QR-FALLBACK-LOOP.md`
- `docs/UI_QR_CONTRACT_V1.md`
- `client/src/qr-runtime.ts`
- `client/src/qr-contract.ts`
- `client/test/qr-contract.test.mjs`
- `qa/lobby-qr-e2e.mjs`
- workflow run `34052814658`
- artifact `9995069093`

### Impact

Lobby QR navigation/presentation contract is now release-QA verified at this scope. No gameplay/server/protocol behavior changed. Full player-facing UI is still not globally release-ready while `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` final art/visual-complete scope remains open.

### Verified

- Clean client build/tests: PASS 33/33.
- Large PIN + QR simultaneous: PASS.
- Desktop native QR decode: PASS.
- Mobile 390x844 native QR decode: PASS.
- 192x192 modules + 16px white quiet zone, no clipping: PASS.
- Exact same-origin uppercase room payload: PASS.
- Payload privacy boundary: PASS.
- Host Start usable with QR: PASS.
- Copy-link exact payload: PASS.
- Clipboard failure non-blocking: PASS.
- Valid deep-link Landing/prefill/helper: PASS.
- No auto-join before explicit `THAM GIA`: PASS.
- Explicit Join uses normal `room:join`: PASS.
- Invalid query ignored and normal Join usable: PASS.
- Stale room surfaces existing `ROOM_NOT_FOUND`: PASS.
- QRCode.js unavailable fallback: PASS; exact text shown, browser run completes without loop/hang, PIN and Host Start remain usable, no fake QR canvas/image.
- H034 and H035 introduced no gameplay/server/protocol change.

### Unverified

- Final raster-art / visual-complete scope under H019 remains outside H033 and still requires its own completion/QA.

### Handoff

Không có handoff lỗi mới. Chat 06 tiếp tục `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION`; Chat 07 QA lại khi có handoff cho final art/visual scope.

### Open Issues

- `H-20260907-033-07-LOBBY-QR-QA`: DONE / PASS.
- `H-20260907-034-06-LOBBY-QR-CROPPING`: DONE / independently verified.
- `H-20260907-035-06-LOBBY-QR-FALLBACK-LOOP`: DONE / independently verified by final browser rerun.
- `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION`: OPEN — final art/visual scope.
- `H-20260907-029-07-UIUX-DISPLAY-QA`: DONE / PASS.
- OI-001–OI-006 remain CLOSED/VERIFIED.
