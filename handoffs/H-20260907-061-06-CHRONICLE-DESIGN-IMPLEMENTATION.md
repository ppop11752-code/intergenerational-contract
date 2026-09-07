handoff_id: H-20260907-061-06-CHRONICLE-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement user-approved Niên sử / Chronicle V1

## Result
- `HÀNH TRÌNH / THẾ GIỚI` structure remains; player score uses authoritative ranking/history data, not cash reconstruction.
- World Event occurrences are rendered from structured `worldEventOccurrences` with exact occurrence IDs.
- `XEM TRONG NIÊN SỬ` opens Chronicle, switches to `THẾ GIỚI`, and focuses exact `chronicleEntryId`.
- Approved filter chips are present; categories are assigned only where structured event impact data supports them. Unsupported categories show no authoritative items rather than parsing chronology strings.
- Residence transitions/reclaimed history remain structured and history-addressable.
- Chronicle does not pause/reset gameplay timers.

No scoring/history/event semantics changed.

## Verification
HEAD `ab8e7a7343c73c2f9501f18ebf33697080668629`: TypeScript build PASS; clean Client tests 64/64 PASS; desktop/mobile E2E PASS, run `34145674583`, artifact `10027576158`.
