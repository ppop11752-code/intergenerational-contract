handoff_id: H-20260907-030-06-RECOVERY-DISPLAY-DECORATION
from: 07
to: 06
status: DONE
title: Fix Recovery authoritative quote decoration after panel open

## Context

Chat 07 reproduced a presentation lifecycle defect in `H-20260907-029-07-UIUX-DISPLAY-QA`: authoritative `recoveryQuotes` arrived before the local Recovery panel DOM existed, and opening the panel did not emit a new `ic:snapshot`.

## Fix

`client/src/display-contract.ts` now:
- caches the latest authoritative `{room, player}` snapshot;
- keeps normal `ic:snapshot` decoration behavior;
- listens for local `data-panel` clicks and schedules `redecorateLatest()` on the next tick, after `main.ts` finishes its synchronous local rerender;
- reuses only cached authoritative snapshot values; no economic values are recomputed;
- applies the same re-decoration pass to World Event, Mandatory, Recovery and Status, preventing equivalent late-DOM decoration drift.

No gameplay action, network protocol, timer or server quote semantics changed.

## Regression

`client/test/display-contract.test.mjs` now covers:
- latest authoritative snapshot surviving a local UI render without a new network snapshot;
- three Recovery quote rows remaining available from the cached snapshot;
- local `[data-panel]` lifecycle scheduling `redecorateLatest()`;
- re-decoration pass still covers Event / Mandatory / Recovery / Status surfaces.

## Verification

- Root cause reproduced from Chat 07 evidence and fixed at presentation lifecycle boundary.
- Source-level deterministic regression committed.
- Full clean browser/server rerun is delegated back to Chat 07 via `H-20260907-029-07-UIUX-DISPLAY-QA`.

## Result

DONE. Return `H-20260907-029-07-UIUX-DISPLAY-QA` to OPEN for rerun, especially Recovery open-after-snapshot with no intervening server event.
