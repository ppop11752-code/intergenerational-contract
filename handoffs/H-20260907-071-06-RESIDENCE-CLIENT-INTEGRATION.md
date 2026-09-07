handoff_id: H-20260907-071-06-RESIDENCE-CLIENT-INTEGRATION
from: 01
to: 06
status: DONE
title: Integrate authoritative Residence lifecycle in client

## Authority
D-053, `docs/RULE_LEDGER.md`, `docs/UI_RESIDENCE_FAMILY_APPROVED_V1.md`, H070.

## Implemented
- Added `client/src/residence-ui-v1.ts` consuming only authoritative:
  - `game.residenceDirectory`;
  - `game.activeMapResidenceIds`;
  - Character/private `currentResidenceId`;
  - `game.residenceTransitions`.
- Active map and minimap use server-authored normalized Residence coordinates.
- Reclaimed Residences are excluded from active map/navigation but remain represented in Chronicle/history.
- Turn Track Character click now focuses the Character's authoritative current Residence without auto-opening another panel.
- Queue has no local Home marker; public Residence map remains inspectable.
- Residence overview uses authoritative occupants/role keys/family references, independent of Economic Household.
- Stage2→3 notices use `residenceTransitions.kind` exactly:
  - `adult_move`: `ĐÃ TRƯỞNG THÀNH — CHUYỂN RA Ở RIÊNG`;
  - `adult_retained`: `ĐÃ TRƯỞNG THÀNH — TIẾP QUẢN NHÀ HIỆN TẠI`.
- Empty/abandoned Residence has no property actions; reclaimed is history-only.
- Added `client/residence-ui-v1.css` and loaded CSS/runtime in production `client/index.html`.
- Added `client/test/residence-ui-v1.test.mjs` source regression.
- Reconciled H055 → DONE; H056/H059 are now OPEN only for their remaining non-Residence client work.

## Evidence
- initial module commit `3eb1bd8039eb9d20d0451291f962bce9b86d0b77`
- selection-stability fix `034fecf7116a6f7765cbe11261507fc5383084f7`
- CSS commit `a85ca6d1318c948601ca18384d7abc9d96146e80`
- production load commit `abcf4099d6ca97ec33a3cec32a77507ed21b23bc`
- regression commit `eb9b938744d12f551935650adac8e5c76bc6c95d`

## Verification
Source-level regression coverage added. Clean TypeScript/client/browser QA for this latest integration has not yet been independently run in this Chat; do not treat H071 DONE as release certification.

## Constraints preserved
No client Residence inference from Household/parents/map proximity; no property mechanic, Residence reuse, gameplay-distance semantics or hidden Persona exposure.

## Handoff
H072 is now unblocked for independent Chat 08 audit. H067 remains the broader approved UI Client QA gate.
