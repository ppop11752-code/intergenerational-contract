handoff_id: H-20260907-034-06-LOBBY-QR-CROPPING
from: 07
to: 06
status: OPEN
title: Fix Lobby QR cropping / non-decodable presentation

## Context

Chat 07 ran `H-20260907-033-07-LOBBY-QR-QA` against locked `docs/UI_QR_CONTRACT_V1.md`.

Clean client suite is PASS 32/32, but browser QA shows the production QR presentation is not scannable/decodable.

## Defect

QRCode.js renders a 192×192 QR inside `.qr-functional`, but the browser-visible container is only about 202×202 while also carrying padding. The captured production QR is visibly cropped on the right and bottom edges. `jsQR` cannot decode the actual rendered screenshot.

A diagnostic extra 32px white border around the captured image still does not decode it, proving this is not merely missing external quiet-zone whitespace: the QR modules themselves are already clipped in the rendered output.

## Evidence

- workflow: `Lobby QR E2E`
- diagnostic run ID: `34051451933`
- head SHA: `196d8e3213b224c538d7a30fc84f48c1d2230e07`
- artifact ID: `9994665230`
- digest: `sha256:97a142c12ba2b8a4445d3483dc174d91357077c3b30c6351bdeaff9a712ef03c`
- artifact file: `qr-functional.png`
- observed QR container bounding box: about 202×202
- QRCode.js requested module image: 192×192
- raw decode: FAIL
- same screenshot with diagnostic 32px white border: FAIL

The first two QA failures before this diagnostic run were runner-only and are not product defects:
1. harness initially omitted `room:state` after create ACK;
2. Playwright waited on QRCode.js hidden canvas rather than `data-qr-ready`.

## Required Fix

1. Ensure the complete 192×192 QR module image is fully visible with an actual quiet zone around all four sides; no clipping/overflow.
2. Keep canonical payload unchanged: same-origin `/?room=<UPPERCASE_ROOM_CODE>`.
3. Keep large room PIN and Host Start usable.
4. Do not add overlays/logo/textures over QR modules.
5. Do not change gameplay or network protocol.
6. Add/update regression for QR layout/renderer lifecycle as practical.
7. Return `H-20260907-033-07-LOBBY-QR-QA` to Chat 07 for full rerun after fix.

## Owner

Chat 06 — CLIENT IMPLEMENTATION. This is a presentation/layout defect, not a server/gameplay issue.
