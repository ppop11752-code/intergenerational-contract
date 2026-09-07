handoff_id: H-20260907-055-06-RESIDENCE-FAMILY-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement user-approved Residence / Family V1

## Source
- `docs/UI_RESIDENCE_FAMILY_APPROVED_V1.md`
- `docs/UI_ROOM_APPROVED_V1.md`
- D-053 / `docs/RULE_LEDGER.md`
- H070 authoritative Residence contract.

## Implemented
- Residence overview now binds to `game.residenceDirectory` and authoritative current occupants, not Economic Household membership.
- Residence map/profile navigation uses `currentResidenceId` and server coordinates.
- Overview shows portrait + player-facing identity + authoritative Residence role keys; deeper profile keeps other-player economy private.
- spouse/parent/child navigation uses authoritative occupant family references.
- Stage2→3 copy uses only `residenceTransitions.kind`:
  - `adult_move` → `ĐÃ TRƯỞNG THÀNH — CHUYỂN RA Ở RIÊNG`;
  - `adult_retained` → `ĐÃ TRƯỞNG THÀNH — TIẾP QUẢN NHÀ HIỆN TẠI`.
- `empty` / `abandoned` states have no property actions; `reclaimed` is history-only and excluded from active map.
- mobile/desktop presentation implemented in `client/residence-ui-v1.css`.

## Evidence
- `client/src/residence-ui-v1.ts`
- `client/test/residence-ui-v1.test.mjs`
- H071 implementation.

No Residence/economic Household rule is inferred locally. Clean/browser certification remains with QA/audit gates.
