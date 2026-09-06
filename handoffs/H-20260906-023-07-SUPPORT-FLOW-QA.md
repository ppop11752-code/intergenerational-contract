handoff_id: H-20260906-023-07-SUPPORT-FLOW-QA
from: 06
to: 07
status: OPEN
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

## Expected output

- Browser/server QA result for Support flow.
- Defect handoff back to Chat 06 only if a client implementation issue is found.
