handoff_id: H-20260907-068-01-RESIDENCE-IDENTITY-LIFECYCLE-RULE
from: 03
to: 01
status: DONE
title: Lock authoritative Residence identity and lifecycle rules

## Context

Chat 03 inspected H-20260907-063-03-UI-RESIDENCE-MAP-CONTRACT. Current engine
state contains Economic Households and family links but no Residence entity or
stable current-Residence mapping. The approved UI explicitly forbids treating
Economic Household as Residence.

## Decision required

Lock the minimum Residence-state rules needed before Chat 02/03 can implement:

1. Stable Residence identity at founder/immigrant creation and newborn birth.
2. Which Residence survives, becomes empty, or is newly created when two adults
   marry; specify whether proposer/target ordering may affect this.
3. One-parent death and surviving-parent remarriage placement for Stage1–2 child.
4. Both-parent death retention for Stage1–2 child and exact Stage2→3 takeover
   transition without duplicate Residence.
5. Normal Stage2→3 move-out and whether placement needs only a stable server key
   or authoritative coordinates near parents.
6. Independent sibling transition behavior.
7. Empty → abandoned → reclaimed timing/retention and whether reclaimed
   Residence IDs remain addressable from Chronicle history.

## Constraints

- Keep Economic Household and Residence distinct.
- Do not introduce property ownership, sale or inheritance-of-house mechanics.
- Do not expose hidden NPC Persona.
- Do not derive Residence from map proximity.

## Expected output

- Rule Ledger/Decision Log clarification with no UI invention.
- Handoff to Chat 02 for canonical state transitions, then Chat 03 to expose the
  H063 snapshot/map contract and Chat 06 to integrate it.

## Blocked work

H063; H042/H054 relationship navigation; H055 Residence/Family; Residence parts
of H056 and H059.


## Decision — 2026-09-07

User selected **A**, locking the complete recommended Residence identity/lifecycle package. The authoritative rule is recorded as D-053 and in `docs/RULE_LEDGER.md`.

## Result

- Source ambiguity is closed.
- No engine/server/client code was changed by Chat 01.
- Implementation sequence is routed through:
  - `H-20260907-069-02-RESIDENCE-STATE-LIFECYCLE.md`
  - `H-20260907-070-03-RESIDENCE-SNAPSHOT-MAP-CONTRACT.md`
  - `H-20260907-071-06-RESIDENCE-CLIENT-INTEGRATION.md`
  - `H-20260907-072-08-RESIDENCE-LIFECYCLE-AUDIT.md`
- OI-007 tracks implementation and independent verification.

Result ref: D-053 / source-complete.
