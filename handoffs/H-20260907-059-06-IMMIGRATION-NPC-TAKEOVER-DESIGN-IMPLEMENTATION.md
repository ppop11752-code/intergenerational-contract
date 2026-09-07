handoff_id: H-20260907-059-06-IMMIGRATION-NPC-TAKEOVER-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement approved Immigration / NPC Takeover V1 UI

## Result
- New immigrant Residence is highlighted from authoritative Residence `origin=immigrant` and current creation round.
- Aggregated immigrant-arrival notice is presentation-only and based on authoritative Residence records.
- Character profile keeps the authoritative `NGƯỜI NHẬP CƯ` flag.
- Reconnect/takeover uses authoritative `aiTakeoverCharacterId`; old Character Residence is identifiable for spectator focus while that Character remains NPC-controlled.
- No hidden Persona is exposed.

No immigration or takeover gameplay rule changed.

## Verification
HEAD `ab8e7a7343c73c2f9501f18ebf33697080668629`: TypeScript build PASS; clean Client tests 64/64 PASS; desktop/mobile E2E PASS, run `34145674583`, artifact `10027576158`.
