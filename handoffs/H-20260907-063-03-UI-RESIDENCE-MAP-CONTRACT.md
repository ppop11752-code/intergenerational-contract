handoff_id: H-20260907-063-03-UI-RESIDENCE-MAP-CONTRACT
from: 06
to: 03
status: DONE
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

Completed and reconciled through H070 after D-053 and H069.

- Public snapshot exposes stable Residence identity/lifecycle/coordinates,
  current occupants, family references and server-derived Residence role keys.
- Server-authored `residenceTransitions` distinguishes normal adult move from
  retained-orphan adulthood without client inference.
- Living Character and active room-player records expose `currentResidenceId`.
- Private `currentResidenceId` is null in Lobby/Waiting Queue and after reconnect
  while the old Character remains NPC-controlled at its own Residence.
- Reclaimed Residence records stay resolvable by stable ID for Chronicle/history
  but are excluded from authoritative active-map/current-navigation state.
- Co-residence stays independent from Economic Household; no `householdId`,
  parent-link or map-proximity Residence inference is exposed.

## Result commit/ref

`db271a1e86fd979cb8a085bb032a9833204e8965` and
`07659f60713f84f0f22a6255901d2c0561424f8c`
