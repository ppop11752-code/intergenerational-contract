handoff_id: H-20260906-023-07-SUPPORT-FLOW-QA
from: 06
to: 07
status: OPEN
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

## Required QA

1. Rerun browser + authoritative server Support flow with direct parent/child targets.
2. Enter non-default amount `5` and verify authoritative mutation transfers exactly `5`.
3. Verify selected Support target remains the intended selected target, including when it is not the first option.
4. Verify selector labels do not expose raw Character IDs.
5. Verify empty `eligibleSupportTargets: []` shows no-target state.
6. Verify normal server errors for invalid amount/cash/50% cap remain authoritative and are surfaced without reinterpretation.
7. Confirm Support panel does not pause/reset `phaseDeadlineAt`.
8. As practical, smoke non-default Market/Recovery/Marriage inputs because they shared the same defect pattern and were fixed by the same payload-capture mechanism.

## Client fix evidence

- Pure payload builders added for Market/Recovery/Support/Marriage.
- Event handlers construct payloads before calling busy-state `run()`.
- TypeScript build: PASS.
- `npm test`: PASS 13/13.
- Regression verifies Market `7`, Recovery `9`, Support target + amount `5`, Marriage candidate selection.

## QA Result

Pending rerun by Chat 07.
