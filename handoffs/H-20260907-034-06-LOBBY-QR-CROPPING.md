handoff_id: H-20260907-034-06-LOBBY-QR-CROPPING
from: 07
to: 06
status: DONE
title: Fix Lobby QR cropping / non-decodable presentation

## Resolution

Fixed in `client/src/qr-runtime.ts`.

Root cause confirmed: baseline `client/styles.css` constrained `.qr-placeholder` to 112x112 and to 88x88 on mobile. The QR runtime previously only added a `min-width`, leaving the fixed height in force and clipping the rendered 192x192 QR modules.

The runtime presentation now overrides the legacy placeholder sizing for the functional QR state:
- `.qr-placeholder`: `width:auto`, `height:auto`, minimum 232x232, `overflow:visible`;
- `.qr-functional`: exact 192x192 content box with 16px white quiet zone on every side via `box-sizing:content-box`;
- QR canvas/image: exact 192x192, no `max-width:100%` shrinking/clipping;
- no overlay, texture or decoration over modules.

Canonical QR payload and Join flow are unchanged.

## Regression

Updated `client/test/qr-contract.test.mjs` to guard:
- 192x192 functional modules;
- 16px quiet-zone padding;
- content-box sizing;
- unclipped overflow;
- parent auto sizing / minimum functional area;
- no max-size shrinking.

## Constraints preserved

- no gameplay changes;
- no network/protocol changes;
- same-origin `/?room=<UPPERCASE_ROOM_CODE>` payload unchanged;
- large room PIN and Host Start remain independent of QR rendering.

## Handoff

Reopen `H-20260907-033-07-LOBBY-QR-QA` for full browser decode and deep-link rerun.
