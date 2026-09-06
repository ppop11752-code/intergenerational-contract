handoff_id: H-20260907-038-07-UIUX-ART-FINAL-QA
from: 06
to: 07
status: BLOCKED
title: Final desktop/mobile visual runtime QA for Wave 4 art

## Context

Chat 05 completed and approved all raster batches A–D in `H-20260907-036-05-UIUX-ART-BINARY-PRODUCTION` / `docs/UI_ART_BINARY_REVIEW_V1.md`.
Chat 06 completed final client integration in `H-20260907-037-06-UIUX-ART-INTEGRATION-FINAL`.

The earlier deployment blocker was fixed by Chat 04 under `H-20260907-039-04-DEPLOY-UI-ART-PUBLIC-ASSETS` and production now serves the raster package correctly.

## Deployment fix evidence

- Packaging commit: `0c1eba3fe1c1df8f76a0ebf2987f9ce74933b106`
- Render deploy: `dep-daeruch42hec73cll8eg`
- Production smoke workflow: `UI Art Public Assets Smoke`
- Successful smoke run: `34055138772`

## QA rerun after deployment fix

Final live rerun reached real raster rendering and confirmed the deployment blocker is resolved, but found a client presentation defect.

Diagnostic workflow:
- workflow: `UIUX Art Final E2E`
- run: `34055446102`
- head: `43ee3a00004efadcdd01e7b08a63053c7986ded8`
- clean client suite: **37/37 PASS**
- required live raster readiness: reached before failing icon-size assertion
- artifact: `9995814481`
- digest: `sha256:1fb5154ebb05fac8b9b9cf6531d964c94e3253952f1efeb856c87f7463d92313`

Exact blocker:
- Government raster icon CSS size: `24px × 24px`
- rendered desktop size: approximately `32.4px × 32.4px`
- parent: `button.landmark.gov`
- parent transform: `scale(1.35)` desktop
- current compact/mobile CSS also uses `scale(1.1)`

This violates the locked Wave 4 nearest-neighbor/integer-scaling acceptance criterion for core pixel art. No gameplay/protocol/timer defect was observed.

## Current status

H038 remains BLOCKED pending `H-20260907-040-06-UI-ART-INTEGER-SCALING`.

## Next required work

1. Chat 06 fixes Government landmark presentation to avoid non-integer scaling while preserving interaction/placement semantics.
2. Chat 07 reruns final desktop/mobile art QA.
3. Only after PASS may H038 close and H019/Wave 4 be considered art-complete at UI/UX scope.

## Constraints
- no gameplay/protocol changes while testing;
- do not reinterpret art as gameplay state;
- do not close H019 before final browser/runtime PASS.
