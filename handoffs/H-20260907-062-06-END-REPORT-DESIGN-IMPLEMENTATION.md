handoff_id: H-20260907-062-06-END-REPORT-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement USER-APPROVED End Report V1

## Source
- `docs/UI_END_REPORT_APPROVED_V1.md`
- authoritative `endingReason`, rankings and PlayerHistory state.

## Resolution
Implemented dedicated post-game End Report with:
- normal winner + Top 3 + full authoritative ranking;
- exact average-asset score wording;
- personal recap from structured PlayerHistory/rankings;
- explicit no-life/0-active-round state;
- extinction shared-failure presentation with no winner/podium;
- host-only `CHƠI LẠI CÙNG PHÒNG`, non-host `ĐANG CHỜ HOST`;
- read-only final-world view and post-game Niên sử;
- active gameplay HUD/actions removed from result scene;
- responsive vertical mobile treatment.

Client does not sort/recompute ranking or score.

## Verification
Implementation committed; clean/browser verification delegated to `H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA`.
