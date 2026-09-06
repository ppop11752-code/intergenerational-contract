handoff_id: H-20260906-023-07-SUPPORT-FLOW-QA
from: 06
to: 07
status: CLOSED
title: QA production Support selector with authoritative targets

## Context

Chat 03 exposed authoritative `eligibleSupportTargets` and Chat 06 completed `H-20260906-022-06-SUPPORT-TARGETS-INTEGRATION` in the production UI shell.

Chat 07 previously found a client form-state defect where Support amount `5` was emitted as `1` because `run()` rendered before deferred DOM reads. Chat 06 fixed this in `H-20260906-024-06-CLIENT-FORM-STATE-LOSS`.

## Source

- server commit `271da7b2a11b921c13bb454b8982b1a90975ec57`
- handoffs/H-20260906-022-06-SUPPORT-TARGETS-INTEGRATION.md
- handoffs/H-20260906-024-06-CLIENT-FORM-STATE-LOSS.md
- client/src/main.ts
- client/src/action-payloads.ts
- client/src/types.ts
- client/test/action-payloads.test.mjs
- client/test/ui-shell.test.mjs
- qa/support-flow-e2e.mjs
- .github/workflows/support-flow-e2e.yml

## QA Result

PASS — authoritative browser/server Support flow verified after client form-state fix.

Final GitHub Actions evidence:
- workflow: `Support Flow E2E`
- run ID: `34047655175`
- head SHA: `8426be71465ad0dbcd64b9a8a50d62142f2217d6`
- job: `support-e2e` / success
- artifact ID: `9993594608`
- artifact digest: `sha256:7146dce30b7b9277745feb527f36e657f7fdce2bb1dc44a07dd9be157c04eb4d`
- results: 13/13 checks PASS

Verified:
1. UI selector exactly mirrors two authoritative direct parent/child targets.
2. Player-facing labels hide raw Character IDs.
3. Non-default second option (`child`) remains selected through submit.
4. Non-default amount `5` is preserved; authoritative cash mutation is exactly actor `100 -> 95`, child `0 -> 5`.
5. Invalid amount surfaces server error `invalid support amount`.
6. Oversized/cap cases surface authoritative server error `action exceeds 50% start-of-round household-asset cap`.
7. Support actions do not reset `phaseDeadlineAt`; deadline value remained identical.
8. Countdown continued while Support was used (`60s -> 59s`).
9. Empty authoritative target list renders no-target state with selector/action absent.
10. No manual Character ID input is exposed.

Chat 06 deterministic regression separately verifies the shared payload-capture fix for Market units `7`, Recovery units `9`, Support amount/selected target, and Marriage candidate selection; local client suite PASS 13/13.

## Scope note

The E2E harness runs the production client over Socket.IO against the compiled production `GameEngine` + `AuthoritativeRoom`. Only the parent/child fixture setup is synthetic so the required relationship state is deterministic; action validation and mutation use production authoritative code.

This closure removes the Support/form-state blocker. It does not mark `H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` complete or declare unfinished Wave 2–4/final-art scope release-ready.
