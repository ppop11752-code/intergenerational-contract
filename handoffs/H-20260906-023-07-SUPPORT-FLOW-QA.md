handoff_id: H-20260906-023-07-SUPPORT-FLOW-QA
from: 06
to: 07
status: BLOCKED
title: QA production Support selector with authoritative targets

## Context

Chat 03 exposed authoritative `eligibleSupportTargets` and Chat 06 completed `H-20260906-022-06-SUPPORT-TARGETS-INTEGRATION` in the production UI shell.

## Source

- server commit `271da7b2a11b921c13bb454b8982b1a90975ec57`
- handoffs/H-20260906-022-06-SUPPORT-TARGETS-INTEGRATION.md
- handoffs/H-20260906-019-06-FULL-UIUX-IMPLEMENTATION.md
- client/src/main.ts
- client/src/types.ts
- client/test/ui-shell.test.mjs

## Required QA

1. Run browser + authoritative server flow where current Human has eligible direct parent/child targets during Voluntary.
2. Verify Support selector shows only server-provided eligible targets and does not expose raw Character IDs in player-facing labels.
3. Verify empty `eligibleSupportTargets: []` shows the no-target state and no action control requiring manual ID entry.
4. Submit a valid support action and verify success state is reflected from server mutation.
5. Submit/reach invalid amount/cash/50% cap cases as practical and verify normal server error feedback; client must not reinterpret the rule.
6. Confirm switching/opening Support does not pause/reset authoritative `phaseDeadlineAt`.
7. Re-run relevant Wave 1/P0 player-facing checks if needed because Support is part of H-20260906-019 production shell.

## Evidence

Chat 06 local verification after integration:
- TypeScript build PASS.
- `npm test` PASS 9/9.
- Regression covers authoritative Support selector presence and raw-ID absence.

## QA Result

BLOCKED / FAIL pending client fix.

Chat 07 added QA-only `qa/support-flow-e2e.mjs` + `.github/workflows/support-flow-e2e.yml`, using the production client over Socket.IO with compiled authoritative `GameEngine` + `AuthoritativeRoom` and a deterministic parent/child fixture derived from the server regression.

Workflow run `34046838461`:
- authoritative engine build: PASS;
- production client build: PASS;
- browser selector mirrored the authoritative parent/child target list;
- player-facing labels did not expose raw Character IDs;
- valid-action test reproduced a client defect: UI entered amount `5`, but authoritative mutation was only `1` (`actor 100 -> 99`, target 0 -> 1`).

Root cause in `client/src/main.ts`: `run()` renders the UI before invoking the deferred callback that reads form values. The re-render resets `#amount` to default `1` and can reset `#support-target` to the first option before the action payload is created.

This blocks reliable verification of valid non-default Support values and downstream invalid amount/cash/50% cap cases.

## Defect Handoff

`H-20260906-024-06-CLIENT-FORM-STATE-LOSS` -> Chat 06.

After Chat 06 fixes/covers the DOM-read-after-render pattern, return this handoff to Chat 07 for rerun.
