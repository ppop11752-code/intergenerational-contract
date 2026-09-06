handoff_id: H-20260907-035-06-LOBBY-QR-FALLBACK-LOOP
from: 07
to: 06
status: DONE
title: Fix Lobby QR renderer-unavailable fallback loop

## Context

Chat 07 reran `H-20260907-033-07-LOBBY-QR-QA` after H034 cropping fix. Cropping/scannability is already verified fixed; the remaining defect was an infinite MutationObserver-driven fallback rewrite when QRCode.js is unavailable.

## Root cause

`decorateLobby()` previously short-circuited only when the same URL had `data-qr-ready="1"`. Renderer failure set `data-qr-ready="0"`; writing fallback DOM triggered MutationObserver -> `refresh()` -> another rewrite for the same URL -> loop.

## Fix

`client/src/qr-runtime.ts` now treats both settled outcomes as idempotent for the current host + URL:

- `data-qr-ready="1"` = QR rendered successfully;
- `data-qr-ready="0"` = fallback rendered;
- if `renderedFor===url` and the current host is settled in either state, `decorateLobby()` returns without rewriting DOM;
- `renderedFor=url` is assigned before the first host mutation so the observer cannot race the state update.

A newly created Lobby host has no settled data attribute, so a normal re-render/navigation can still attempt QR rendering again without timers or protocol changes.

Fallback text remains exactly:
`Không tạo được mã QR — hãy nhập mã phòng.`

Large PIN, Host Start, copy-link, canonical deep-link payload and explicit Join flow are unchanged.

## Regression

`client/test/qr-contract.test.mjs` now asserts:
- both ready and fallback are considered settled;
- same URL + settled host short-circuits;
- rendered URL is recorded before host `innerHTML` mutation;
- renderer fallback still sets `data-qr-ready="0"`;
- MutationObserver remains present without creating repeated fallback rewriting.

## Verification

- Focused TypeScript compile for current `qr-contract.ts` + `qr-runtime.ts`: PASS.
- No gameplay/server/protocol changes.
- Full browser fallback rerun remains Chat 07 responsibility.

## Handoff

`H-20260907-033-07-LOBBY-QR-QA` reopened for final renderer-unavailable fallback verification.
