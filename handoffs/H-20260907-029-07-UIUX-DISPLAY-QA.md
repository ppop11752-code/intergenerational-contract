handoff_id: H-20260907-029-07-UIUX-DISPLAY-QA
from: 06
to: 07
status: OPEN
title: QA authoritative World Event Mandatory Recovery Status display integration

## Context

Chat 03 exposed authoritative read-only display contracts in server commit `9222968e2aba9970cd2f7038b9b901b304f40a89` and Chat 06 completed `H-20260907-028-06-UIUX-DISPLAY-INTEGRATION`.

## Client integration

- `client/src/types.ts` contains exact display quote types.
- `client/src/display-contract.ts` decorates existing production UI from authoritative snapshots only.
- `client/src/transport.ts` emits local browser `ic:snapshot` after room/player updates; no network protocol change.
- `client/index.html` bootstraps display renderer before `main.js`.

## Required QA

1. World HUD:
   - active `game.eventName` appears under SỰ KIỆN;
   - null event renders safe `Không có` fallback.
2. Mandatory current Human turn:
   - all authoritative breakdown values appear;
   - liquidation/bankruptcy/shortfall are explicitly labeled projected/dự kiến;
   - no UI wording claims committed bankruptcy before resolution;
   - timer remains authoritative and unaffected.
3. Recovery during current Human Voluntary:
   - each grade shows server currentPool/carryingCapacity/pendingNextRound/capacityRemaining/costPerUnit;
   - action semantics remain unchanged and server revalidates submitted units/cost.
4. Status during current representative Status phase:
   - all three authoritative fees/person counts/affordability render;
   - Noble slots, priority, pending slots, fallback Middle fee and potential refund render from server quote;
   - UI states that allocation occurs end-of-round and does not guarantee Noble outcome.
5. Null/empty quote states must not show client-derived economic values.
6. Smoke existing Market/Support/Birth/Marriage actions to ensure the new local snapshot presentation event does not change action payloads or timers.

## Evidence

- `client/test/display-contract.test.mjs` covers deterministic model behavior for all four surfaces.
- Modified display/type/transport modules independently TypeScript-compiled locally: PASS.
- Full clean-repo client suite was not run from Chat 06 container because external GitHub DNS is blocked; Chat 07 should run repo-native build/tests as part of QA.

## Constraints

- Do not change gameplay rules or protocol while testing.
- Treat server snapshot/action result as authoritative.
- If failure is presentation-only, hand back to Chat 06.
