handoff_id: H-20260907-050-06-MANDATORY-5S-CLIENT
from: 01
to: 06
status: DONE
title: Verify client follows server-authoritative 5-second Mandatory timing

## Context

D-052 locks Mandatory presentation at 5 seconds. The approved UI still has no skip, countdown or progress indicator.

## Source

- `docs/UI_MANDATORY_APPROVED_V1.md`
- `docs/UI_MANDATORY_SOURCE_VALIDATION_V1.md`
- `docs/RULE_LEDGER.md`
- H-20260907-046-06-MANDATORY-DESIGN-IMPLEMENTATION

## Required work

- Confirm the client has no local Mandatory-duration hardcode.
- Ensure the card transitions only from authoritative server phase state.
- Verify normal, forced-liquidation and bankruptcy presentations remain compatible with 5 seconds.
- Update `reports/06_CURRENT.md`.

## Constraints

- No client-only delay, skip control, countdown or gameplay calculation.

## Result

DONE with one narrow client presentation defect found and fixed.

### Verification / finding

- No client-side `5s` / `5000ms` Mandatory duration hardcode was found.
- Client does not schedule a local Mandatory phase transition; authoritative room/game phase state remains the transition source.
- Mandatory card itself has no skip/continue/confirm control and no local timer/progress.
- Existing generic HUD timer did, however, expose `phaseDeadlineAt` during Mandatory. That contradicted the approved no-countdown presentation.

### Fix

`client/src/display-contract.ts` now:
- detects authoritative `room.game.phase === "mandatory"`;
- removes `data-timer` from the Mandatory HUD phase value;
- renders `TỰ ĐỘNG` instead of visible seconds;
- does not add any local duration, timeout or phase transition.

Status/Voluntary authoritative timer presentation remains unchanged.

Regression added in `client/test/display-contract.test.mjs` to guard:
- no local `5000` duration;
- no Mandatory progress/local timeout;
- Mandatory HUD removes timer marker and shows `TỰ ĐỘNG`.

Normal / projected forced-liquidation / projected bankruptcy content continues to render from authoritative snapshot data and has no client timing branch, so the 5-second change does not require separate client delays for those presentations.

## Result commit/ref

- `91b4ac76303a2a002e8d7bc3c788fef6a13b84e8` — Mandatory HUD no-countdown fix.
- `6d5716d7902a339c1275fb5ffd49d049c1d9a406` — regression.
- QA handoff: `H-20260907-051-07-MANDATORY-5S-CLIENT-QA`.

## Unverified

No automatic CI status was attached to the latest client regression commit at handoff close. Browser/runtime confirmation of the server-authoritative ~5s transition and no visible Mandatory countdown is delegated to Chat 07 via H051.
