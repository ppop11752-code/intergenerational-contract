handoff_id: H-20260907-061-06-CHRONICLE-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: BLOCKED
title: Implement user-approved Niên sử / Chronicle V1

## Source
- `docs/UI_CHRONICLE_APPROVED_V1.md`
- `docs/UI_CHRONICLE_SOURCE_VALIDATION_V1.md`
- `docs/UI_HUD_APPROVED_V1.md`

## Implemented
- large centered ledger/sheet presentation;
- top-level `HÀNH TRÌNH / THẾ GIỚI` tabs;
- personal history grouped by lives from structured PlayerHistory events;
- authoritative average score from rankings and score trend from scoreSnapshots;
- World timeline and indicator mode from authoritative historySnapshots;
- no raw IDs as player-facing labels;
- no timer ownership/reset.

## Blocker
`H-20260907-066-03-UI-WORLD-EVENT-CHRONICLE-CONTRACT` for exact `XEM TRONG NIÊN SỬ` linkage and structured world-category filtering without parsing chronology strings.

Client does not calculate AverageLifeAssetScore or infer world-event causality.
