handoff_id: H-20260907-063-03-UI-RESIDENCE-MAP-CONTRACT
from: 06
to: 03
status: BLOCKED
blocked_by: H-20260907-069-02-RESIDENCE-STATE-LIFECYCLE
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

Still BLOCKED, but the original rule ambiguity is resolved.

- Chat 01 closed H068 through user-selected option A and locked D-053 in the
  Rule Ledger: Residence is independent, has stable identity, and follows the
  explicit creation/marriage/child/adulthood/empty lifecycle.
- OI-007 is now `SOURCE LOCKED / IMPLEMENTATION PENDING`.
- Current `main` still has no canonical Residence state or transition code in
  `GameState`/engine. H069 is OPEN and owned by Chat 02.
- H063 is reconciled into H070. Chat 03 will expose and test the typed public/
  private snapshot only after the completed H069 implementation is available.

No `householdId`, parent-link or map-proximity inference has been exposed.

## Result commit/ref

Source decision: D-053 / commit `626f1c58de5eb08b518628d1acf6f54106b1d74e`.
Implementation dependency: H069; server-contract continuation: H070.
