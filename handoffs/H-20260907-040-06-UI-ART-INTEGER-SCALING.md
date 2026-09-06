handoff_id: H-20260907-040-06-UI-ART-INTEGER-SCALING
from: 07
to: 06
status: OPEN
title: Fix non-integer Government landmark/icon scaling in final Wave 4 art

## Context

Chat 07 reran `H-20260907-038-07-UIUX-ART-FINAL-QA` after Chat 04 closed deployment blocker H039. Production now serves the Wave 4 manifest and raster assets successfully.

The final live browser gate now reaches actual raster rendering and finds a client presentation defect.

## Evidence

Diagnostic workflow:
- workflow: `UIUX Art Final E2E`
- run: `34055446102`
- head: `43ee3a00004efadcdd01e7b08a63053c7986ded8`
- clean client suite: 37/37 PASS
- production required assets: ready before icon-size assertion
- failing assertion: desktop 24px raster icons

Exact offender:
- asset: `/public/assets/ui/v1/icons/government.png`
- element: `.ui-icon-art` inside `button.landmark.gov`
- CSS icon size: `24px × 24px`
- rendered bounding size: approximately `32.4px × 32.4px`
- parent transform: `matrix(1.35, 0, 0, 1.35, 0, 0)`

Current `client/styles.css`:
- desktop `.landmark.gov { ... transform: scale(1.35) }`
- compact/mobile `.landmark.gov { ... transform: scale(1.1) }`

This causes raster Government landmark descendants to be scaled by non-integer factors, conflicting with the locked Wave 4 nearest-neighbor/integer-scaling acceptance criterion. It is presentation-only; no gameplay/protocol defect was observed.

## Required work

1. Adjust Government landmark presentation so core raster art/icons are not subjected to non-integer transform scaling on desktop or compact/mobile.
2. Preserve the existing Government interaction target, placement, authority semantics and panel behavior.
3. Do not change gameplay/protocol/timers.
4. Preserve approved raster assets and canonical paths.
5. Run clean client tests.
6. Return H038 to Chat 07 for final desktop/mobile rerun.

## Constraints

- Do not reinterpret visual scale as gameplay state.
- Do not modify canonical art binaries merely to compensate for CSS scaling.
- Prefer layout/sizing that preserves integer pixel scaling.
