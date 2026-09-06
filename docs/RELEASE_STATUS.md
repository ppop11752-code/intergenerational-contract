# RELEASE STATUS — CURRENT

## Overall

**Not release-ready at the current player-facing UI scope.** OI-001 through OI-006 remain closed/verified, but a newer production-client regression was found during Support flow QA after the prior release-ready claim.

The regression does not change gameplay rules or reopen OI-001–OI-006. It affects client form values used to construct authoritative actions.

## Closed / verified foundations

- OI-001 marriage proposal lifecycle: CLOSED / independently verified.
- OI-002 inflation scarcity combined formula: CLOSED / independently verified.
- OI-003 protocol helper drift (`game:replay`): CLOSED / verified.
- OI-004 dedicated Tutorial guidance: CLOSED / release QA verified.
- OI-005 deployment source-tree mismatch: CLOSED / source-tree verified.
- OI-006 dependency-backed live server runtime: CLOSED / release QA verified.
- Canonical backend source migration into GitHub: COMPLETE / verified against audited artifact.
- Prior Tutorial/live integration evidence remains valid for the scope it covered.

Canonical backend path: `server/backend/`

Canonical client path: `client/`

Live same-origin service: `https://intergenerational-contract.onrender.com`

## Current blocking client regression

During `H-20260906-023-07-SUPPORT-FLOW-QA`, Chat 07 reproduced the following with production client + authoritative `GameEngine`/`AuthoritativeRoom` over Socket.IO:

- browser entered Support amount `5`;
- authoritative mutation transferred only `1` (`actor 100 -> 99`, target 0 -> 1`).

Root cause: `client/src/main.ts` calls `render()` inside `run()` before deferred action callbacks read DOM values. Form controls are rebuilt with defaults before action payload creation.

Support target/amount are directly affected; the same pattern must be audited for Market units, Recovery units, Marriage candidate, and any similar DOM-driven actions.

Blocking defect handoff: `H-20260906-024-06-CLIENT-FORM-STATE-LOSS`.

Support QA handoff: `H-20260906-023-07-SUPPORT-FLOW-QA` is BLOCKED pending the client fix and rerun.

## QA evidence

- Support QA workflow: `Support Flow E2E`
- failing run ID: `34046838461`
- head SHA: `ca4d90a6320ade9e85586a70b7d48e7ea1a13077`
- authoritative engine build: PASS
- production client build: PASS
- selector mirrors authoritative parent/child targets: PASS before action assertion
- raw Character ID absent from player-facing labels: PASS
- action payload fidelity for non-default amount: FAIL

## Remaining UI work

`H-20260906-019-06-FULL-UIUX-IMPLEMENTATION` remains OPEN. Wave 2–4/final art and other UI/UX work are not made complete by earlier Wave 1 QA.

## Release claim rule

Do not call the current player-facing client release-ready until Chat 06 resolves `H-20260906-024-06-CLIENT-FORM-STATE-LOSS` and Chat 07 reruns Support/relevant form-action QA successfully. Any subsequent runtime-affecting change must continue to pass build, regression, deployment and integration gates.
