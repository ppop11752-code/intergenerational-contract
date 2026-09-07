handoff_id: H-20260907-059-06-IMMIGRATION-NPC-TAKEOVER-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement approved Immigration / NPC Takeover V1 UI

## Source
- `docs/UI_IMMIGRATION_NPC_TAKEOVER_APPROVED_V1.md`
- H070 authoritative Residence contract.

## Implemented
- round transition can show one aggregated immigration count from authoritative history snapshot;
- Character profile supports `NGƯỜI NHẬP CƯ` from authoritative `immigrant` flag;
- takeover notice uses authoritative `aiTakeoverCharacterId` and preserves player-facing identity;
- reconnect remains no-reclaim and Queue-owned;
- no hidden Persona is exposed;
- H071 now provides authoritative Residence IDs/coordinates/navigation, so the previous H063 blocker is resolved.

## Remaining work
Bind new immigrant Residence arrival/highlight to the authoritative Residence record/origin and ensure old/new Residence focus behavior uses H070 data in all takeover/arrival paths. No client inference is allowed.

No immigration/takeover gameplay rule is changed.
