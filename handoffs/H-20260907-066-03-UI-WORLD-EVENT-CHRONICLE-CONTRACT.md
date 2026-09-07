handoff_id: H-20260907-066-03-UI-WORLD-EVENT-CHRONICLE-CONTRACT
from: 06
to: 03
status: DONE
title: Expose structured World Event impact and Chronicle linkage

## Source
- `docs/UI_WORLD_EVENT_DETAIL_APPROVED_V1.md`
- `docs/UI_CHRONICLE_APPROVED_V1.md`
- `docs/UI_HUD_APPROVED_V1.md`

## Problem
Current snapshot exposes `eventName`, economic income factor/reasons and historical snapshots, but approved UI requires only affected systems with authoritative numeric impact rows and an exact Chronicle focus path. Client must not infer effects from event name or fuzzy-match chronology strings.

## Required narrow contract
Expose read-only structured event presentation state, for example:
- stable event occurrence/id or round-linked key;
- display name;
- affected-system rows with authoritative label/value/delta (including epidemic Mandatory medical fee when applicable);
- optional ambience key if server intends event ambience;
- exact Chronicle/history entry linkage for `XEM TRONG NIÊN SỬ`.

Chronicle may continue using authoritative history snapshots for indicators. No event mechanics/timers/formulas change.

## Handoffs blocked/partial
H043 World Event banner detail, H060, H061 deep-link/filter structure.

## Result

Completed by Chat 03.

- Public `game.worldEvent` exposes the current structured occurrence or null.
- Each occurrence has a stable ID, Round/Year, display name, optional ambience
  key and only the systems actually affected.
- Impact rows expose stable system/key/label key plus authoritative value, delta
  and unit for all nine event types.
- Epidemic exposes its Mandatory medical fee per Character explicitly.
- `chronicleEntryId` is the exact occurrence ID stored in
  `game.worldEventOccurrences`, enabling direct Chronicle focus with no fuzzy
  matching against event name or chronology strings.
- Event mechanics, timers and formulas were unchanged.

Regression `ui-world-event-contract.mjs`: PASS across all nine events, exact
Chronicle linkage, epidemic amount, null inactive state and snapshot no-side-effect.

## Result commit/ref

`0d43bd8f73db9fce53617d36bb793a05aed2fcf7`
