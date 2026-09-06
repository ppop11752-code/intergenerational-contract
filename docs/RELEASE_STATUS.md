# RELEASE STATUS — CURRENT

## Overall

**Not release-ready at the current full player-facing UI scope.** OI-001 through OI-006 remain closed/verified. Support/form-state regression and authoritative World Event/Mandatory/Recovery/Status display integration are independently verified. Lobby QR cropping/scannability has been fixed and browser-verified on desktop/mobile, but the required QR renderer-unavailable fallback currently loops through `MutationObserver`; `H-20260907-035-06-LOBBY-QR-FALLBACK-LOOP` is OPEN. `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` also remains OPEN for final raster-art/visual-complete scope.

No current UI defect changes gameplay rules or reopens OI-001–OI-006.

## Closed / verified foundations

- OI-001 marriage proposal lifecycle: CLOSED / independently verified.
- OI-002 inflation scarcity combined formula: CLOSED / independently verified.
- OI-003 protocol helper drift (`game:replay`): CLOSED / verified.
- OI-004 dedicated Tutorial guidance: CLOSED / release QA verified.
- OI-005 deployment source-tree mismatch: CLOSED / source-tree verified.
- OI-006 dependency-backed live server runtime: CLOSED / release QA verified.
- Canonical backend source migration into GitHub: COMPLETE / verified against audited artifact.
- Prior Tutorial/live integration evidence remains valid for the scope it covered.
- Support authoritative selector/action integration: PASS after form-state fix.
- Authoritative World Event / Mandatory / Recovery / Status display integration: PASS after Recovery lifecycle fix.

Canonical backend path: `server/backend/`
Canonical client path: `client/`
Live same-origin service: `https://intergenerational-contract.onrender.com`

## Resolved Support/form-state regression

Final Support rerun evidence:
- workflow: `Support Flow E2E`
- run ID: `34047655175`
- head SHA: `8426be71465ad0dbcd64b9a8a50d62142f2217d6`
- artifact ID: `9993594608`
- digest: `sha256:7146dce30b7b9277745feb527f36e657f7fdce2bb1dc44a07dd9be157c04eb4d`
- result: 13/13 browser-authoritative checks PASS.

`H-20260906-023-07-SUPPORT-FLOW-QA`: CLOSED / PASS.
`H-20260906-024-06-CLIENT-FORM-STATE-LOSS`: DONE.

## Resolved authoritative display integration QA

Final display rerun evidence:
- workflow: `UIUX Display E2E`
- run ID: `34050348433`
- head SHA: `629b64d28cceb8b99307fd31fbc2c48ce40e7298`
- artifact ID: `9994352923`
- digest: `sha256:fe8c7061fd9edd0d038dbdbc637539a746e89b0978dafdc9ebf70aa851a38c2d`
- browser-authoritative checks: 67/67 PASS
- full clean client suite: 27/27 PASS
- authoritative engine build: PASS

`H-20260907-029-07-UIUX-DISPLAY-QA`: DONE / PASS.
`H-20260907-030-06-RECOVERY-DISPLAY-DECORATION`: DONE.

## Lobby QR status

The original QR cropping defect found by Chat 07 is resolved by `H-20260907-034-06-LOBBY-QR-CROPPING`.

Post-fix browser evidence:
- workflow: `Lobby QR E2E`
- run ID: `34051902501`
- head SHA: `46eca73a2363aa77ea0cb2958d277e8c7bf7e1b8`
- artifact ID: `9994809830`
- digest: `sha256:a5fadb67afd962b9445e6ef1482b234418e0bb709205b0b64ba6d89941c29290`
- clean client suite: 33/33 PASS
- 21 production browser checks PASS before renderer-unavailable fallback entry
- desktop native QR decode: PASS
- compact/mobile 390x844 native QR decode: PASS
- module geometry: 192x192 + 16px native white quiet zone, no clipping
- exact same-origin uppercase room deep-link: PASS
- privacy boundary: PASS
- copy-link + clipboard failure non-blocking: PASS
- valid deep-link Landing/prefill/no-auto-join/explicit Join: PASS
- invalid query: PASS
- stale room existing `ROOM_NOT_FOUND`: PASS

### Current QR blocker

`H-20260907-033-07-LOBBY-QR-QA` remains BLOCKED because the required renderer-unavailable path is not graceful.

In `client/src/qr-runtime.ts`, when `window.QRCode` is unavailable, fallback rendering mutates `.qr-placeholder`, the global `MutationObserver` schedules `refresh()`, and the same URL is rendered again because the short-circuit only accepts `data-qr-ready="1"`. This creates a repeated fallback mutation loop. Repeated browser fallback tests hang specifically in this path, matching the deterministic source control flow.

Owner handoff: `H-20260907-035-06-LOBBY-QR-FALLBACK-LOOP` to Chat 06.

`H-20260907-034-06-LOBBY-QR-CROPPING`: DONE / independently verified.
`H-20260907-033-07-LOBBY-QR-QA`: BLOCKED pending H035.

## Remaining UI work

`H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` remains OPEN for final raster-art / visual-complete scope. Lobby QR fallback idempotency is a separate concrete blocker that must also be resolved.

## Release claim rule

Do not call the full current player-facing UI release-ready until H035 is fixed and H033 closes, H019 final visual/art scope is completed, and corresponding QA gates pass. Any subsequent runtime-affecting change must continue to pass build, regression, deployment and integration gates.
