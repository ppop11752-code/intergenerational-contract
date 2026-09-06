handoff_id: H-20260906-020-03-SUPPORT-TARGETS
from: 06
to: 03
status: DONE
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

## Result

Completed by Chat 03.

- Added pure `GameEngine.isEligibleVoluntarySupportTarget()` from the existing
  living direct parent/child rule and reused it in `voluntaryFamilySupport()`.
- Private snapshots now always expose `eligibleSupportTargets`.
- The list is populated only for the current Character during Voluntary and is
  otherwise `[]`, including lobby, queue, other turns and other phases.
- Each item contains `characterId`, `relation`, `ageLabel`, and current Household
  `status`; the client no longer needs to request raw internal IDs from players.
- No support amount, phase, spending cap, constant, or family rule changed.
- Added deterministic action-parity, negative-case and no-side-effect coverage.

Verification:

- Backend `npm run release:check`: PASS.
- Rule Ledger 42/42, OI-002 6/6, OI-001 9/9: PASS.
- Support target snapshot regression: PASS.
- Fuzz 20 games and final simulation 30 games: PASS.
- Nested server typecheck/build and Socket event contract 9/9: PASS.
- Current client build/tests: PASS 8/8.

Implementation commit: `271da7b2a11b921c13bb454b8982b1a90975ec57`.

Follow-up: `H-20260906-022-06-SUPPORT-TARGETS-INTEGRATION`.
