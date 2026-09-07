# RELEASE STATUS — CURRENT

## Overall

**Wave 4 player-facing UI art is QA-verified at UI/UX scope.** OI-001 through OI-007 are now closed/verified. Support/form-state regression, authoritative World Event/Mandatory/Recovery/Status display integration, Lobby QR navigation/presentation, Wave 4 public-asset deployment, final desktop/mobile raster runtime QA, and the D-053 Residence lifecycle chain are verified.

This document still does not by itself assert project-wide release readiness. Broader release status must account for the current Approved UI V1 scope, remaining non-blocking warnings, and final Project Control / Release & QA gates.

## Closed / verified foundations

- OI-001 marriage proposal lifecycle: CLOSED / independently verified.
- OI-002 inflation scarcity combined formula: CLOSED / independently verified.
- OI-003 protocol helper drift (`game:replay`): CLOSED / verified.
- OI-004 dedicated Tutorial guidance: CLOSED / release QA verified.
- OI-005 deployment source-tree mismatch: CLOSED / source-tree verified.
- OI-006 dependency-backed live server runtime: CLOSED / release QA verified.
- OI-007 Residence identity/lifecycle: CLOSED / independently verified.
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

Verified runtime scope includes required raster loading/readiness, raster terrain, Government/Residence art, canonical 24px icon rendering after H040, T0 frame assets, non-blocking ambience, no raw IDs on tested surfaces, and countdown continuing through tutorial/help presentation on desktop and compact/mobile.

## Mandatory 5-second presentation — VERIFIED END-TO-END

- D-052 locks Mandatory presentation at **5 seconds**.
- Server default and production environment both resolve to 5,000 ms.
- Mandatory remains automatic, has no skip/confirm, no visible countdown/progress, and is not a player decision timer.
- Chat 07 full gate passed backend, clean Client 39/39 and live browser 13/13; observed production transition was approximately 4.9 seconds from the first sampled snapshot.

## Residence identity/lifecycle — CLOSED / VERIFIED

- D-053 locks the complete Residence identity/lifecycle package selected by the user.
- H069 Chat 02 canonical state/lifecycle: DONE.
- H070/H063 Chat 03 snapshot/map/protocol contract: DONE.
- H071 Chat 06 Client integration: DONE.
- H067 Chat 07 production Approved UI V1 QA: DONE / PASS WITH WARNINGS, clean Client 68/68 and desktop/mobile Residence navigation PASS.
- H072 Chat 08 independent Residence lifecycle audit: PASS.
- OI-007 is CLOSED — VERIFIED via H-20260908-077-00-CLOSE-OI007-RESIDENCE.

Verified boundaries: Economic Household remains distinct from Residence; coordinates are presentation-only; no property ownership, sale, house inheritance, Residence reuse or gameplay-distance mechanics; reclaimed Residence remains history-addressable but inactive for current map/navigation; no hidden Persona leak.

## Current release claim rule

No blocking Open Issue remains in OI-001 through OI-007. This is necessary but not sufficient for a project-wide final release claim.

Before declaring the whole project final-release-ready, Project Control should reconcile the latest Approved UI V1 completion/QA state, any remaining non-blocking rare-state QA warnings, full-game UX/UI coverage status, and the final Release & QA assessment.
