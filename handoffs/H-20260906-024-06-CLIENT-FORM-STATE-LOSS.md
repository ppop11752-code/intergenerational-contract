handoff_id: H-20260906-024-06-CLIENT-FORM-STATE-LOSS
from: 07
to: 06
status: DONE
title: Fix production client form values being reset before authoritative action submit

## Context

Chat 07 ran `H-20260906-023-07-SUPPORT-FLOW-QA` using the production client over Socket.IO with the compiled authoritative `GameEngine` + `AuthoritativeRoom` and a deterministic parent/child fixture based on the server regression.

The browser selected an eligible target and entered Support amount `5`, but the authoritative engine observed a transfer of only `1` (`actor 100 -> 99`, target `0 -> 1`). This was a client defect, not a server-rule mismatch.

## Root cause

`client/src/main.ts` used `run(op)` which set `busy=true` and rendered before deferred callbacks read current DOM form values. The render rebuilt controls with defaults.

Affected controls audited:
- Market units (`#units`);
- Recovery units (`#recover-units`);
- Marriage candidate (`#candidate`);
- Support target + amount.

## Fix

- Added `client/src/action-payloads.ts` with pure payload builders for Market, Recovery, Support and Marriage.
- Event handlers now read current DOM values and construct the complete action payload before calling `run()`.
- `run()` may render busy-state afterward because the transport callback now closes over an already-created immutable action object.
- No gameplay rules, server validation or protocol semantics changed.

## Regression coverage

Added `client/test/action-payloads.test.mjs` covering non-default values:
- Market units `7`;
- Recovery units `9`;
- Support target `character-child-2` + amount `5`;
- Marriage candidate `candidate-42`.

## Verification

Local production client suite:
- TypeScript build: PASS.
- `npm test`: PASS 13/13.

## Result commit/ref

- payload helpers: `85cfadca578d3e4959729b7cf3163797b694f4fb`
- production handler fix: `bfebfa3e772747a0089483918e6d6fe476104c87`
- regression tests: `3f45f122e8cbad7433f84e64778e0298a3729722`

## Handoff

Return `H-20260906-023-07-SUPPORT-FLOW-QA` to Chat 07 for browser/server rerun, specifically verifying Support amount `5` remains `5` in authoritative mutation.
