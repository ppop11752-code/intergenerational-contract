# RELEASE STATUS — CURRENT

## Overall

**Not release-ready at the current full player-facing UI scope.** OI-001 through OI-006 remain closed/verified. Support/form-state regression, authoritative World Event/Mandatory/Recovery/Status display integration, and Lobby QR navigation/presentation are independently verified. Final Wave 4 raster source/client integration passes regression, but the production Docker image currently omits `client/public/`, so deployed players receive art fallback instead of the approved raster package.

No current UI defect changes gameplay rules or reopens OI-001–OI-006.

## Closed / verified foundations

- OI-001 marriage proposal lifecycle: CLOSED / independently verified.
- OI-002 inflation scarcity combined formula: CLOSED / independently verified.
- OI-003 protocol helper drift (`game:replay`): CLOSED / verified.
- OI-004 dedicated Tutorial guidance: CLOSED / release QA verified.
- OI-005 deployment source-tree mismatch: CLOSED / source-tree verified.
- OI-006 dependency-backed live server runtime: CLOSED / release QA verified.
- Canonical backend source migration into GitHub: COMPLETE / verified against audited artifact.
- Support authoritative selector/action integration: PASS.
- Authoritative World Event / Mandatory / Recovery / Status display integration: PASS.
- Lobby QR deep-link, scannability, mobile layout and renderer-failure fallback: PASS.

Canonical backend path: `server/backend/`
Canonical client path: `client/`
Live same-origin service: `https://intergenerational-contract.onrender.com`

## Resolved Support/form-state regression

Final Support evidence: workflow `Support Flow E2E`, run `34047655175`, artifact `9993594608`, digest `sha256:7146dce30b7b9277745feb527f36e657f7fdce2bb1dc44a07dd9be157c04eb4d`, 13/13 browser-authoritative checks PASS.

`H-20260906-023-07-SUPPORT-FLOW-QA`: CLOSED / PASS.
`H-20260906-024-06-CLIENT-FORM-STATE-LOSS`: DONE.

## Resolved authoritative display integration QA

Final display evidence: workflow `UIUX Display E2E`, run `34050348433`, artifact `9994352923`, digest `sha256:fe8c7061fd9edd0d038dbdbc637539a746e89b0978dafdc9ebf70aa851a38c2d`, 67/67 browser checks and 27/27 clean client suite PASS.

`H-20260907-029-07-UIUX-DISPLAY-QA`: DONE / PASS.
`H-20260907-030-06-RECOVERY-DISPLAY-DECORATION`: DONE.

## Lobby QR — VERIFIED

Final QR evidence: workflow `Lobby QR E2E`, run `34052814658`, head `02bd76f002d7aec439a8771cd32639cb0478f991`, artifact `9995069093`, digest `sha256:c8eccea29c6c934d4c124688323de345c6675180dc0a99b430ef1853e24cf7ca`, clean suite 33/33 and browser 25/25 PASS.

`H-20260907-033-07-LOBBY-QR-QA`: DONE / PASS.
`H-20260907-034-06-LOBBY-QR-CROPPING`: DONE.
`H-20260907-035-06-LOBBY-QR-FALLBACK-LOOP`: DONE.

## Current Wave 4 art blocker

`H-20260907-038-07-UIUX-ART-FINAL-QA`: **BLOCKED / FAIL at production packaging**.

Diagnostic evidence:
- workflow: `UIUX Art Final E2E`
- run: `34054650882`
- head: `b549df7e54194b4a062bc90e958cbc01e2f156f7`
- clean client suite: **37/37 PASS**
- browser live runtime: FAIL
- live art status: `fallback`; all required raster readiness markers absent
- artifact: `9995595825`
- digest: `sha256:26f6bc41e11f686220a9c3419c9ecd5f285f299ff6453e6862da6a0e02b59404`

The tested head was already live on Render before browser execution. `Dockerfile` sets `STATIC_DIR=/app/client` and copies client index/styles/dist into `/app/client`, but omits `client/public/`. The approved manifest and PNG package under `client/public/assets/ui/v1/` therefore do not exist in the production image.

Owner: `H-20260907-039-04-DEPLOY-UI-ART-PUBLIC-ASSETS` -> Chat 04.

## Remaining UI work

`H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` remains OPEN pending successful production art deployment and final H038 desktop/mobile rerun.

## Release claim rule

Do not call the full current player-facing UI release-ready until H039 fixes deployment packaging, H038 passes final desktop/mobile runtime QA, and H019 is closed at UI/UX scope. Any subsequent runtime-affecting change must continue to pass build, regression, deployment and integration gates.
