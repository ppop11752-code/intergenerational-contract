handoff_id: H-20260906-020-03-SUPPORT-TARGETS
from: 06
to: 03
status: OPEN
title: Expose authoritative voluntary support targets for production client

## Context

Chat 06 is implementing `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION`. The production Support UI must not ask players to type internal Character IDs and must not infer family eligibility client-side.

Current private snapshot exposes Character/Household/family data, but does not expose a server-filtered list of direct parent/child targets that are currently eligible for `family:support`.

## Required work

1. Add a side-effect-free authoritative private snapshot field for voluntary support targets, using the existing `family:support` eligibility rule only.
2. Recommended shape compatible with current client placeholder:
   `eligibleSupportTargets: [{ characterId, relation: "parent" | "child", ageLabel?, status? }]`
3. It must reflect the same eligibility that `family:support` will accept, and return an empty array when none are eligible.
4. Do not change support gameplay, amounts, phases, constants, or family rules.
5. Add server regression coverage proving snapshot eligibility matches action eligibility.
6. Update protocol/report and hand back to Chat 06.

## Source

- docs/UI_UX_FULL_AUDIT_2026-09-06.md
- server/backend/MULTIPLAYER_PROTOCOL_V50.md
- server/backend/src/authoritative-room.ts
- server/backend/src/engine.ts
- client/src/main.ts
- client/src/types.ts

## Expected output

Authoritative eligible support target list consumable by production client without exposing raw-ID input.
