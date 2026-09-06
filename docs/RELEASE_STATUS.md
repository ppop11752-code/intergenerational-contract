# RELEASE STATUS — CURRENT

## Overall

**Not release-ready yet.** Backend gameplay/protocol/deployment blockers OI-001, OI-002, OI-003, OI-005 and OI-006 are closed/verified. OI-004 implementation/deployment defects currently known have been fixed, but the final live browser/server E2E gate remains unverified because Chat 07's execution environment cannot resolve the Render hostname.

## Closed / verified

- OI-001 marriage proposal lifecycle: CLOSED / independently verified.
- OI-002 inflation scarcity combined formula: CLOSED / independently verified.
- OI-003 protocol helper drift (`game:replay`): CLOSED / verified.
- OI-005 deployment source-tree mismatch: CLOSED / source-tree verified.
- OI-006 dependency-backed live server runtime: CLOSED / release QA verified.
- Canonical backend source migration into GitHub: COMPLETE / verified against audited artifact.
- OI-004 known implementation fixes: source/deploy metadata verified; final browser E2E still pending.

Canonical backend path:

`server/backend/`

Canonical client path:

`client/`

Live same-origin service:

`https://intergenerational-contract.onrender.com`

Current live deploy checked during OI-004 final E2E rerun:

- deploy `dep-daengk8ou94c739la8ag`
- commit `e36239684a94887555ef40d7ffadc58085aae415`

Client alignment commit:

`48e43df42dc9b9eb97f67c6d977f130560a7b39e`

No runtime client/server changes occurred between that alignment commit and the current live deploy; intervening commits only update reports/handoffs.

## Remaining blockers / gaps

- OI-004 final live browser/server E2E has not passed.
- Required live-browser checks still include page load, same-origin Socket.IO handshake, Tutorial room entry, normal-room no-overlay behavior, Birth/T7 authoritative false→true transition, non-blocking help recap under authoritative countdown, and T0–T11 progression as feasible.
- Chat 07 attempted direct live access, but the execution sandbox failed DNS resolution for the Render hostname before HTTP connection.

## Non-blocking maintenance debt

Legacy Vitest `.test.ts` suites contain expectations from pre-OI-001 behavior. They should be updated/replaced/archived, but they do not reopen OI-001 and are not the current normative regression gate.

## Rule for release claims

Do not call the repository/game release-ready until Chat 07 has completed the final live browser/server E2E gate against a reachable deployment and no blocking defect remains.
