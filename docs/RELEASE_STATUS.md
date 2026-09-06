# RELEASE STATUS — CURRENT

## Overall

**Not release-ready at the current full player-facing UI scope.** OI-001 through OI-006 remain closed/verified. Support/form-state regression and authoritative World Event/Mandatory/Recovery/Status display integration are independently verified. Lobby QR now has a confirmed presentation blocker: the rendered QR is cropped and cannot be decoded. `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` also remains OPEN for final raster-art/visual-complete scope.

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

## Current Lobby QR blocker

`H-20260907-033-07-LOBBY-QR-QA` is BLOCKED / FAIL.

Clean client suite including QR regressions is PASS 32/32, but browser QA found the actual QR presentation is not decodable. Diagnostic evidence:
- workflow: `Lobby QR E2E`
- run ID: `34051451933`
- head SHA: `196d8e3213b224c538d7a30fc84f48c1d2230e07`
- artifact ID: `9994665230`
- digest: `sha256:97a142c12ba2b8a4445d3483dc174d91357077c3b30c6351bdeaff9a712ef03c`
- Lobby PIN visible: PASS
- QR ready/rendered: PASS
- requested QR module image: 192×192
- visible QR container: approximately 202×202
- artifact `qr-functional.png` visibly crops right/bottom QR modules
- raw decode: FAIL
- same captured image with diagnostic +32px white border: FAIL, proving the modules are already clipped rather than merely lacking external whitespace.

Owner handoff: `H-20260907-034-06-LOBBY-QR-CROPPING` to Chat 06. H033 must be rerun after the layout fix before QR can be called complete.

## Remaining UI work

`H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` remains OPEN for final raster-art / visual-complete scope. Lobby QR cropping is a separate concrete blocker that must also be resolved.

## Release claim rule

Do not call the full current player-facing UI release-ready until the QR cropping defect is fixed and H033 passes, H019 final visual/art scope is completed, and corresponding QA gates pass. Any subsequent runtime-affecting change must continue to pass build, regression, deployment and integration gates.
