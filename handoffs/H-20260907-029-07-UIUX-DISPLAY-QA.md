handoff_id: H-20260907-029-07-UIUX-DISPLAY-QA
from: 06
to: 07
status: BLOCKED
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

## QA Result

BLOCKED / FAIL on browser integration.

QA harness/workflow added:
- `qa/uiux-display-e2e.mjs`
- `.github/workflows/uiux-display-e2e.yml`
- workflow run `34049782937`
- head `f28a659700fc9c70b0e5dbbed93f793529428bfc`
- artifact `9994199735`
- digest `sha256:e9fd43453820c4b555e1ca9eccd7016a96ce40bb2d449358afb855ad4cf6770a`

Verified before failure:
- authoritative engine build PASS;
- full clean client suite PASS 25/25;
- World Event authoritative value PASS;
- null World Event fallback PASS;
- Mandatory authoritative quote exists and all breakdown labels/values render PASS;
- Mandatory wording remains projected/dự kiến and does not claim committed bankruptcy PASS;
- Mandatory has no skip button PASS;
- Mandatory display does not change authoritative deadline PASS.

Failure:
- during authoritative Voluntary phase, `player.recoveryQuotes` exists, but opening Recovery after the snapshot does not render `.server-quote` labels;
- Playwright times out waiting for `.recovery-row .server-quote`.

Likely lifecycle defect: display decoration runs on `ic:snapshot`, while opening a local panel rerenders DOM without causing a new snapshot event. Recovery rows are therefore created after the last decoration pass.

Defect handoff: `H-20260907-030-06-RECOVERY-DISPLAY-DECORATION`.

Status/remaining Recovery/action/null checks must be rerun after Chat 06 fixes the lifecycle issue.

## Constraints

- Do not change gameplay rules or protocol while testing.
- Treat server snapshot/action result as authoritative.
- Presentation-only failure belongs to Chat 06.
