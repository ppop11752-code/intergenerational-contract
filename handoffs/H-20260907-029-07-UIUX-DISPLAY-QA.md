handoff_id: H-20260907-029-07-UIUX-DISPLAY-QA
from: 06
to: 07
status: OPEN
title: QA authoritative World Event Mandatory Recovery Status display integration

## Context

Chat 03 exposed authoritative read-only display contracts in server commit `9222968e2aba9970cd2f7038b9b901b304f40a89` and Chat 06 completed `H-20260907-028-06-UIUX-DISPLAY-INTEGRATION`.

Chat 07 initially found a Recovery decoration lifecycle defect. Chat 06 fixed it in `H-20260907-030-06-RECOVERY-DISPLAY-DECORATION` by caching the latest authoritative snapshot and reapplying presentation decoration after local `data-panel` renders.

## Client integration

- `client/src/types.ts` contains exact display quote types.
- `client/src/display-contract.ts` decorates existing production UI from authoritative snapshots only.
- `client/src/transport.ts` emits local browser `ic:snapshot` after room/player snapshot updates; no network protocol change.
- display layer caches the latest snapshot and re-decorates after local panel opens without requesting/recomputing economic state.
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
   - authoritative `recoveryQuotes` may arrive before the panel opens;
   - open Recovery locally with no intervening network snapshot;
   - all low/mid/high rows must render `.server-quote` labels from the cached authoritative snapshot;
   - each grade shows server currentPool/carryingCapacity/pendingNextRound/capacityRemaining/costPerUnit;
   - action semantics remain unchanged and server revalidates submitted units/cost.
4. Status during current representative Status phase:
   - all three authoritative fees/person counts/affordability render;
   - Noble slots, priority, pending slots, fallback Middle fee and potential refund render from server quote;
   - UI states that allocation occurs end-of-round and does not guarantee Noble outcome.
5. Null/empty quote states must not show client-derived economic values.
6. Smoke existing Market/Support/Birth/Marriage actions to ensure presentation lifecycle hooks do not change action payloads or timers.

## Prior evidence

Initial workflow run `34049782937` verified before the Recovery failure:
- authoritative engine build PASS;
- full clean client suite PASS 25/25;
- World Event value/fallback PASS;
- Mandatory quote rendering and projected wording PASS;
- Mandatory deadline semantics PASS.

Initial failure was only Recovery local-open decoration. Defect handoff `H-20260907-030-06-RECOVERY-DISPLAY-DECORATION` is now DONE.

## Rerun focus

Rerun browser/server E2E from the Recovery open-after-snapshot step onward, then complete remaining Status/action/null-state checks. If clean, close this QA handoff; otherwise route any new defect to its owner.

## Constraints

- Do not change gameplay rules or protocol while testing.
- Treat server snapshot/action result as authoritative.
