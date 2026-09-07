handoff_id: H-20260907-066-03-UI-WORLD-EVENT-CHRONICLE-CONTRACT
from: 06
to: 03
status: OPEN
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
