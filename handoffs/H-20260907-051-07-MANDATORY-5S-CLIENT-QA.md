handoff_id: H-20260907-051-07-MANDATORY-5S-CLIENT-QA
from: 06
to: 07
status: OPEN
title: Verify Mandatory 5-second server-authoritative client presentation

## Context

D-052 locks Mandatory reading duration at 5 seconds, server-authoritative. `H-20260907-050-06-MANDATORY-5S-CLIENT` found one client presentation mismatch: the generic HUD phase timer still exposed `phaseDeadlineAt` during Mandatory even though the approved UI requires no visible countdown/progress.

## Chat 06 fix

- `client/src/display-contract.ts` now detects authoritative `room.game.phase === "mandatory"` and removes the HUD `data-timer` attribute for that phase.
- Mandatory HUD value becomes `TỰ ĐỘNG` rather than a countdown.
- No 5-second/5000ms local duration was added.
- No local phase transition/delay was added.
- Mandatory card remains no-skip/no-confirm; server phase state remains the only transition authority.
- Status/Voluntary authoritative deadline display remains unchanged.
- `client/test/display-contract.test.mjs` adds regression for no visible Mandatory countdown/local duration hardcode.

Commits:
- `91b4ac76303a2a002e8d7bc3c788fef6a13b84e8` — client presentation fix
- `6d5716d7902a339c1275fb5ffd49d049c1d9a406` — regression

## Required QA

Verify in clean client/browser flow:
1. Mandatory lasts according to server-authoritative phase transition (expected ~5s from D-052/server), with no client-only delay.
2. No Mandatory countdown/progress/skip/continue/confirm appears in card or HUD.
3. HUD may identify Mandatory but shows `TỰ ĐỘNG`, not seconds.
4. Normal, forced-liquidation and bankruptcy Mandatory presentations do not delay or override server phase progression.
5. Status/Voluntary timer behavior remains authoritative and unchanged.
6. No gameplay/protocol/action/timer semantics are changed client-side.

## Source
- `docs/UI_MANDATORY_APPROVED_V1.md`
- `docs/UI_MANDATORY_SOURCE_VALIDATION_V1.md`
- `docs/RULE_LEDGER.md`
- `handoffs/H-20260907-050-06-MANDATORY-5S-CLIENT.md`

## Constraint
Do not close project-level Mandatory timing work unless server/runtime evidence also matches D-052.
