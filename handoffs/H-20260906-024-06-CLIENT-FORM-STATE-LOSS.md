handoff_id: H-20260906-024-06-CLIENT-FORM-STATE-LOSS
from: 07
to: 06
status: OPEN
title: Fix production client form values being reset before authoritative action submit

## Context

Chat 07 ran `H-20260906-023-07-SUPPORT-FLOW-QA` using the production client over Socket.IO with the compiled authoritative `GameEngine` + `AuthoritativeRoom` and a deterministic parent/child fixture based on the server regression.

The browser selected an eligible target and entered Support amount `5`, but the authoritative engine observed a transfer of only `1` (`actor 100 -> 99`, target `0 -> 1`). This is a client defect, not a server-rule mismatch.

## Root cause

`client/src/main.ts` uses `run(op)` which immediately sets `busy=true` and calls `render()` before invoking `op()`.

Several event handlers read current DOM form values *inside* the deferred `op`, after that render has rebuilt controls with defaults. For Support:

- `#amount` resets to default `1`;
- `#support-target` can reset to the first option.

This means user-entered Support amount/target can be lost before `game:action` is emitted.

The same pattern appears to affect other production inputs and must be checked, at minimum:

- Market units (`#units`);
- Recovery units (`#recover-units`);
- Marriage candidate (`#candidate`);
- Support target + amount.

## Evidence

- QA workflow: `Support Flow E2E`
- failing run ID: `34046838461`
- head SHA: `ca4d90a6320ade9e85586a70b7d48e7ea1a13077`
- job `support-e2e`
- observed authoritative mutation after UI entered amount 5: actor cash `100 -> 99`, target cash `0 -> 1`.
- source: `client/src/main.ts`
- server authoritative Support regression remains PASS and is not implicated.

## Required work

1. Capture/validate user input values before any busy-state render, then pass immutable action payload into `run()`/transport.
2. Fix Support target + amount.
3. Audit and fix the same DOM-read-after-render pattern for Market, Recovery, Marriage and any other action controls.
4. Do not change gameplay rules or server validation semantics.
5. Add regression tests proving non-default values are preserved in emitted action payloads.
6. Run client build/tests.
7. Return to Chat 07 for `H-20260906-023-07-SUPPORT-FLOW-QA` rerun.

## Owner

06 — CLIENT IMPLEMENTATION.
