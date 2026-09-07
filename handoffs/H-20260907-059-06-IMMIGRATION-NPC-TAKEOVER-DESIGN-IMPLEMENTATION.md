handoff_id: H-20260907-059-06-IMMIGRATION-NPC-TAKEOVER-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: BLOCKED
title: Implement approved Immigration / NPC Takeover V1 UI

## Source
- `docs/UI_IMMIGRATION_NPC_TAKEOVER_APPROVED_V1.md`

## Implemented
- round transition can show one aggregated immigration count from authoritative history snapshot;
- Character profile supports `NGƯỜI NHẬP CƯ` from authoritative `immigrant` flag;
- takeover notice uses authoritative `aiTakeoverCharacterId` and preserves player-facing identity;
- reconnect remains no-reclaim and Queue-owned;
- no hidden Persona is exposed.

## Blocker
`H-20260907-063-03-UI-RESIDENCE-MAP-CONTRACT` is required for new immigrant Residence arrival/highlight and correct old/new Residence focus without local inference.

No immigration/takeover gameplay rule is changed.
