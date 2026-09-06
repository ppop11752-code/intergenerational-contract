# RELEASE STATUS — CURRENT

## Overall

**Not release-ready at the current full player-facing UI scope.** OI-001 through OI-006 remain closed/verified. Support/form-state regression, authoritative World Event/Mandatory/Recovery/Status display integration, Lobby QR navigation/presentation, and Wave 4 public-asset deployment are verified. Final Wave 4 client/runtime QA is currently blocked by non-integer Government landmark scaling.

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
- Wave 4 production public-asset packaging: PASS after H039.

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

## Wave 4 deployment — VERIFIED

`H-20260907-039-04-DEPLOY-UI-ART-PUBLIC-ASSETS`: CLOSED.

Production smoke evidence:
- packaging commit: `0c1eba3fe1c1df8f76a0ebf2987f9ce74933b106`
- Render deploy: `dep-daeruch42hec73cll8eg`
- workflow: `UI Art Public Assets Smoke`
- run: `34055138772`
- manifest over production HTTP: PASS
- Government PNG over production HTTP: PASS

The previous fallback caused by omitted `client/public/` is resolved.

## Current Wave 4 art blocker

`H-20260907-038-07-UIUX-ART-FINAL-QA`: **BLOCKED** pending client fix H040.

Latest diagnostic evidence:
- workflow: `UIUX Art Final E2E`
- run: `34055446102`
- head: `43ee3a00004efadcdd01e7b08a63053c7986ded8`
- clean client suite: **37/37 PASS**
- required raster package reaches ready state before failure
- artifact: `9995814481`
- digest: `sha256:1fb5154ebb05fac8b9b9cf6531d964c94e3253952f1efeb856c87f7463d92313`

Current defect:
- Government icon CSS size is `24px × 24px`.
- Its parent `button.landmark.gov` uses `transform: scale(1.35)` on desktop, so the raster renders approximately `32.4px × 32.4px`.
- Compact/mobile CSS also uses non-integer `scale(1.1)`.
- This violates the locked Wave 4 nearest-neighbor/integer-scaling acceptance criterion for core pixel art.

Owner: `H-20260907-040-06-UI-ART-INTEGER-SCALING` -> Chat 06.

## Remaining UI work

`H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` remains OPEN pending H040 and successful final H038 desktop/mobile rerun.

## Release claim rule

Do not call the full current player-facing UI release-ready until H040 is fixed, H038 passes final desktop/mobile runtime QA, and H019 is closed at UI/UX scope. Any subsequent runtime-affecting change must continue to pass build, regression, deployment and integration gates.
