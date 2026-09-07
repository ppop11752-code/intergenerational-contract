handoff_id: H-20260907-055-06-RESIDENCE-FAMILY-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement user-approved Residence / Family V1

## Source of truth

Implement strictly from:
- `docs/UI_RESIDENCE_FAMILY_APPROVED_V1.md`;
- `docs/UI_ROOM_APPROVED_V1.md`;
- `docs/UI_MARRIAGE_APPROVED_V1.md` where profile actions intersect;
- latest `docs/RULE_LEDGER.md`.

## Required implementation

1. Residence click opens floating Residence/Family surface on desktop and sheet on mobile.
2. Residence overview shows each current resident only as portrait + player-facing name + short Residence role; **do not use full Character cards at overview level**.
3. Selecting a portrait opens deeper Character detail with approved identity/stage/Status/Human-NPC/lifecycle context.
4. Do not force economic-household labels into the Residence overview.
5. Financial drill-down must bind to the correct authoritative economic household, especially for Stage1–2 children co-residing with parents.
6. Add compact spouse/parents/children portrait relation strip/tree with navigation to each Character's current authoritative Residence/profile.
7. Do not add permanent orphan/survivor explanatory badges or wording in ordinary Residence UI.
8. Stage2→3 notices:
   - `ĐÃ TRƯỞNG THÀNH — CHUYỂN RA Ở RIÊNG`;
   - `ĐÃ TRƯỞNG THÀNH — TIẾP QUẢN NHÀ HIỆN TẠI` for retained Residence.
9. Empty Residence becomes `BỎ TRỐNG` / nature-reclaimed visual state; no property actions.
10. Residence opening during Voluntary must not pause/reset the shared 60s timer.

## Critical constraints

- Do not infer current Residence from parents, household ID or map proximity.
- Do not infer economic Household from co-residence.
- Do not infer family links/client eligibility locally.
- If the current snapshot lacks a clean current-Residence mapping or sufficient identity/family data, create a narrow Chat 03 contract handoff rather than inventing local truth.
- No gameplay, protocol, timer, residence-assignment or economic rule changes.

## Acceptance

- Approved V1 visual/interaction structure matches the source spec.
- No raw Character IDs used as primary player-facing identity.
- Current-Residence focus works for survivor/orphan/Stage2→3 cases.
- Co-resident child finances remain separate where authoritative.
- Mobile behavior follows approved sheet pattern.
- Affected client build/tests pass.
- Update `reports/06_CURRENT.md` and hand back for visual/integration verification.