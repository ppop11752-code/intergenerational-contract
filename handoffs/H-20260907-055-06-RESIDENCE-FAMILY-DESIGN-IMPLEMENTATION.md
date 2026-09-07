handoff_id: H-20260907-055-06-RESIDENCE-FAMILY-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: BLOCKED
title: Implement user-approved Residence / Family V1

## Source
- `docs/UI_RESIDENCE_FAMILY_APPROVED_V1.md`
- `docs/UI_ROOM_APPROVED_V1.md`

## Implemented
- existing Residence/Profile sheet retained and restyled for approved floating/mobile pattern;
- public profile remains privacy-safe;
- immigrant and elderly-health presentation can consume authoritative Character fields;
- timer/navigation remain presentation-only.

## Blocker
`H-20260907-063-03-UI-RESIDENCE-MAP-CONTRACT`.
Current snapshot cannot truthfully distinguish Residence co-residence from economic Household or map Character→current Residence, so approved resident overview, relation navigation, Stage2→3 move-out/retained Residence, empty Residence and correct child financial drill-down cannot be completed without guessing.

No Residence/economic Household rule is inferred locally.
