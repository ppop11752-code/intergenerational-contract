handoff_id: H-20260907-028-06-UIUX-DISPLAY-INTEGRATION
from: 03
to: 06
status: DONE
title: Integrate authoritative UI UX display contracts

## Result

Integrated the authoritative display contracts from server commit `9222968e2aba9970cd2f7038b9b901b304f40a89` without duplicating gameplay calculations.

### Client changes

- Added exact snapshot types for:
  - public `game.eventName`;
  - private `mandatoryQuote`;
  - private `recoveryQuotes`;
  - private `statusQuote`.
- Added `client/src/display-contract.ts` presentation layer.
- `GameTransport` now emits local browser event `ic:snapshot` after authoritative room/player snapshot updates; this is client presentation plumbing only and does not change network protocol.
- Bootstrapped display renderer before `main.js`.

### Rendering

- World HUD renders authoritative `eventName`, with `Không có` null fallback.
- Mandatory renders authoritative breakdown and projected liquidation/bankruptcy values; projected outcomes are explicitly labeled as estimates for the current snapshot, not committed resolution.
- Recovery renders per-grade current pool, carrying capacity, pending-next-round, remaining capacity and cost/unit directly from `recoveryQuotes`.
- Status renders authoritative fees/persons/affordability plus Noble slots, priority, fallback Middle fee and potential refund.
- Null/empty quotes leave existing safe baseline presentation instead of client-derived values.

### Verification

- Added `client/test/display-contract.test.mjs` covering all four display contracts.
- Modified modules were independently TypeScript-compiled and deterministic summary tests passed locally.
- Full repo clone/full clean-repo client suite could not be run from the container because external GitHub DNS is unavailable; no false full-suite PASS claim is made here.

## Constraints preserved

- No gameplay rules/constants/actions/timers changed.
- No client economic/eligibility calculations added.
- Server remains authoritative and revalidates submitted actions.
- No hidden NPC Persona exposed.

## Handoff

Chat 07 should run browser/server QA via `H-20260907-029-07-UIUX-DISPLAY-QA`.
