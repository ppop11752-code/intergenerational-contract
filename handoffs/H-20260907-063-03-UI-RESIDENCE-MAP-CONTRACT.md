handoff_id: H-20260907-063-03-UI-RESIDENCE-MAP-CONTRACT
from: 06
to: 03
status: BLOCKED
title: Expose authoritative Residence / map-location contract for approved UI

## Source
- `docs/UI_ROOM_APPROVED_V1.md`
- `docs/UI_RESIDENCE_FAMILY_APPROVED_V1.md`
- `docs/UI_MARRIAGE_APPROVED_V1.md`
- `docs/UI_WAITING_QUEUE_RECONNECT_APPROVED_V1.md`

## Problem
Current public/private snapshots expose Character `householdId` and family links but no authoritative current Residence identity/location mapping. Client must not infer Residence from economic Household, parents, or map proximity.

## Required narrow contract
Expose enough side-effect-free state for Client to:
- map each living Character to current Residence;
- identify current/local Residence when active, but no current Home while queued;
- list current co-residents independently from economic Household membership;
- navigate spouse/parents/children to their authoritative Residence/profile;
- support Stage2→3 move-out/retained-residence presentation;
- distinguish empty Residence;
- focus Turn Track Character/child to the correct Residence;
- render minimap Government/Home/Residence markers using authoritative map placement or stable server-provided presentation coordinates/keys.

No gameplay or Residence assignment rule change is requested. Do not expose hidden NPC Persona.

## Handoffs blocked
H042, H054 visual relationship line/navigation, H055, parts of H056 and H059.

## Result

BLOCKED after direct model/engine inspection.

- Canonical `GameState` has Economic `Household` and Character family links, but
  no Residence identity, occupancy history, abandoned/reclaimed lifecycle or map
  placement state.
- `householdId` cannot safely substitute for Residence: Stage1–2 children are
  separate economic Households while co-resident with parents; survivor/orphan
  and retained-Residence transitions intentionally diverge from Household state.
- Deriving current Residence from `parentsHouseholdId` also fails after a
  surviving parent remarries and cannot distinguish an adult who retained an
  orphaned Residence from an adult whose parents died later.
- The authoritative sources do not specify which Residence survives, is vacated,
  or is newly created when two adults marry. Choosing proposer/target/new home in
  Chat 03 would create a Residence assignment rule.
- Stable presentation coordinates cannot be generated without first having
  stable authoritative Residence identities.

No source change was made for H063 and no `householdId` inference was exposed.
Decision handoff: `H-20260907-068-01-RESIDENCE-IDENTITY-LIFECYCLE-RULE`.

## Result commit/ref

Documentation-only blocker record; see the report/handoff commit containing this
file.
