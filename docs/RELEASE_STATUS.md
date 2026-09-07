# RELEASE STATUS — CURRENT

## Overall

**Wave 4 player-facing UI art is QA-verified at UI/UX scope.** OI-001 through OI-006 remain closed/verified. Support/form-state regression, authoritative World Event/Mandatory/Recovery/Status display integration, Lobby QR navigation/presentation, Wave 4 public-asset deployment, and final desktop/mobile raster runtime QA are verified.

`H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` remains formally OPEN only until Chat 06 records owner closure using the final H038 PASS evidence. H038 alone does not assert project-wide release readiness beyond UI/UX scope.

No current UI finding changes gameplay rules or reopens OI-001–OI-006.

## Closed / verified foundations

- OI-001 marriage proposal lifecycle: CLOSED / independently verified.
- OI-002 inflation scarcity combined formula: CLOSED / independently verified.
- OI-003 protocol helper drift (`game:replay`): CLOSED / verified.
- OI-004 dedicated Tutorial guidance: CLOSED / release QA verified.
- OI-005 deployment source-tree mismatch: CLOSED / source-tree verified.
- OI-006 dependency-backed live server runtime: CLOSED / release QA verified.
- Canonical backend source migration into GitHub: COMPLETE / verified.
- Support authoritative selector/action integration: PASS.
- Authoritative World Event / Mandatory / Recovery / Status display integration: PASS.
- Lobby QR deep-link, scannability, mobile layout and renderer-failure fallback: PASS.
- Wave 4 production public-asset packaging: PASS after H039.
- Wave 4 final desktop/mobile art runtime: PASS after H040.

Canonical backend path: `server/backend/`
Canonical client path: `client/`
Live same-origin service: `https://intergenerational-contract.onrender.com`

## Support / form-state — VERIFIED

Final evidence: workflow `Support Flow E2E`, run `34047655175`, artifact `9993594608`, digest `sha256:7146dce30b7b9277745feb527f36e657f7fdce2bb1dc44a07dd9be157c04eb4d`, 13/13 browser-authoritative checks PASS.

`H-20260906-023-07-SUPPORT-FLOW-QA`: CLOSED / PASS.
`H-20260906-024-06-CLIENT-FORM-STATE-LOSS`: DONE.

## Authoritative display integration — VERIFIED

Final evidence: workflow `UIUX Display E2E`, run `34050348433`, artifact `9994352923`, digest `sha256:fe8c7061fd9edd0d038dbdbc637539a746e89b0978dafdc9ebf70aa851a38c2d`, 67/67 browser checks and 27/27 clean client suite PASS.

`H-20260907-029-07-UIUX-DISPLAY-QA`: DONE / PASS.
`H-20260907-030-06-RECOVERY-DISPLAY-DECORATION`: DONE.

## Lobby QR — VERIFIED

Final evidence: workflow `Lobby QR E2E`, run `34052814658`, head `02bd76f002d7aec439a8771cd32639cb0478f991`, artifact `9995069093`, digest `sha256:c8eccea29c6c934d4c124688323de345c6675180dc0a99b430ef1853e24cf7ca`, clean suite 33/33 and browser 25/25 PASS.

`H-20260907-033-07-LOBBY-QR-QA`: DONE / PASS.
`H-20260907-034-06-LOBBY-QR-CROPPING`: DONE.
`H-20260907-035-06-LOBBY-QR-FALLBACK-LOOP`: DONE.

## Wave 4 deployment — VERIFIED

`H-20260907-039-04-DEPLOY-UI-ART-PUBLIC-ASSETS`: CLOSED.

Production smoke evidence:
- packaging commit `0c1eba3fe1c1df8f76a0ebf2987f9ce74933b106`
- Render deploy `dep-daeruch42hec73cll8eg`
- workflow `UI Art Public Assets Smoke`
- run `34055138772`
- manifest over production HTTP: PASS
- Government PNG over production HTTP: PASS

## Wave 4 final art runtime — VERIFIED

`H-20260907-038-07-UIUX-ART-FINAL-QA`: **CLOSED / PASS**.
`H-20260907-040-06-UI-ART-INTEGER-SCALING`: **DONE / independently verified**.

Final evidence:
- workflow `UIUX Art Final E2E`
- run `34056472497`
- head `865d180f8a4962896330d4b81f4736de3cfa056a`
- job `101549187621`
- clean client suite: **38/38 PASS**
- desktop/mobile browser gate: **20/20 PASS**
- artifact `9996117188`
- digest `sha256:4b49b53833d1decbc53555ad2424c295b2ade58c37ed4617bc3ec5564ab5f513`
- tested Render head `dep-daesb7e7bikc73dm8n90`: live before final browser assertions

Verified runtime scope includes required raster loading/readiness, raster terrain, Government/Residence art, canonical 24px icon rendering after H040, T0 frame assets, non-blocking ambience, no raw IDs on tested surfaces, and countdown continuing through tutorial/help presentation on desktop and compact/mobile. Clean regressions cover the remaining frame rules, action-payload preservation, Birth/Tutorial/QR behavior and art-runtime presentation-only boundary.

## Remaining UI administration

`H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` may now be closed by Chat 06 at its UI/UX implementation scope using H038 final PASS evidence.

## Release claim rule

Wave 4 art is complete and QA-verified at UI/UX scope. Do not infer project-wide release readiness solely from this document section; any broader release claim must still follow the Project's Release & QA / Project Control gates and account for any non-UI open work.

## Mandatory reading-duration update — source locked

- D-052 locks Mandatory presentation at **5 seconds**.
- Source status: complete.
- Current server default was inspected as 7 seconds, so implementation/deployment/integration QA are pending through H-20260907-048/049/050/051.
- This does not reopen OI-001–OI-006 and does not change Mandatory calculations or UI interaction semantics.
