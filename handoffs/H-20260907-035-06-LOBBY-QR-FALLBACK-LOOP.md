handoff_id: H-20260907-035-06-LOBBY-QR-FALLBACK-LOOP
from: 07
to: 06
status: OPEN
title: Fix Lobby QR renderer-unavailable fallback loop

## Context

Chat 07 reran `H-20260907-033-07-LOBBY-QR-QA` after H034 cropping fix. The cropping/scannability defect is fixed: desktop and compact/mobile QR screenshots now decode correctly with full native quiet zone.

A second concrete client defect was found while verifying the required QRCode.js failure path.

## Defect

In `client/src/qr-runtime.ts`, `decorateLobby()` only short-circuits when:

`renderedFor === url && host.dataset.qrReady === "1"`

When `window.QRCode` is unavailable:
1. `decorateLobby()` rewrites `.qr-placeholder` via `host.innerHTML`;
2. catch writes `.qr-fallback` and sets `data-qr-ready="0"`;
3. the global `MutationObserver` sees the child-list mutation and schedules `refresh()`;
4. because `qrReady !== "1"`, `decorateLobby()` rewrites the same host again;
5. this repeats continuously.

Repeated browser fallback harnesses consistently hang only when QRCode is unavailable. The source control flow explains the hang deterministically.

## Required fix

- Make renderer-unavailable/error fallback idempotent for the same room URL.
- Once fallback for the same URL is rendered, unrelated DOM mutations must not repeatedly rewrite `.qr-placeholder`.
- Preserve the exact required text: `Không tạo được mã QR — hãy nhập mã phòng.`
- Keep large PIN, Host Start, and manual/copy deep-link usable.
- If the QR renderer later becomes available, retry behavior may be supported only if it does not create a mutation loop; do not introduce timers or protocol/gameplay changes.
- Add a regression that can falsify repeated fallback rendering / mutation-loop behavior.

## Evidence already PASS after H034

Main browser QA artifact from run `34051902501` / head `46eca73a2363aa77ea0cb2958d277e8c7bf7e1b8`:
- clean client suite: 33/33 PASS;
- 21 production browser checks PASS before fallback harness entry;
- desktop QR native decode PASS;
- mobile 390x844 native decode PASS;
- exact same-origin payload PASS;
- privacy boundary PASS;
- 192x192 modules + 16px quiet zone PASS;
- Host Start PASS;
- copy-link PASS;
- clipboard failure non-blocking PASS;
- deep-link Landing/prefill/no-auto-join/explicit join PASS;
- invalid query and stale `ROOM_NOT_FOUND` PASS.

Artifact `9994809830`, digest `sha256:a5fadb67afd962b9445e6ef1482b234418e0bb709205b0b64ba6d89941c29290`.

## Constraints

- Client presentation/runtime only.
- No gameplay/server/protocol changes.
- Return H033 to Chat 07 for final fallback rerun after fix.
