handoff_id: H-20260907-052-06-SUPPORT-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement user-approved Support UX V1

## Source

- `docs/UI_SUPPORT_APPROVED_V1.md`
- `docs/UI_VOLUNTARY_APPROVED_V1.md`
- `docs/RULE_LEDGER.md`

## Required implementation

Implement the approved `CHU CẤP` voluntary surface without changing gameplay or protocol semantics.

Key requirements:
- large centered desktop panel over persistent World Map;
- Voluntary dock remains visible/highlights `CHU CẤP`;
- one independent recipient card for every authoritative eligible direct parent/child Character;
- each card shows player-facing portrait/identity, relation, age/stage, Status and only safe authoritative financial context;
- every recipient card has its own `− / editable amount / + / MAX / CHU CẤP` controls;
- panel top explicitly distinguishes voluntary Support from Mandatory support;
- footer shows authoritative available cash + remaining spending quota where applicable;
- successful transfer keeps panel open, refreshes authoritative state and shows inline result on the target card;
- when no target is eligible, selecting `CHU CẤP` shows a clear unavailable explanation rather than hiding the action;
- mobile uses equivalent recipient cards in bottom/full-height sheet.

## Hard constraints

- Never use raw Character IDs as the player-facing selector.
- Never infer family eligibility client-side.
- Never independently calculate cash/quota maximums if authoritative values are absent.
- If player-facing identity/portrait contract is insufficient, create a narrow handoff to Chat 03 rather than displaying raw IDs.
- No Support-specific timer; use the one shared Voluntary 60s HUD timer.

## Completion evidence

Update `reports/06_CURRENT.md` with implemented paths, build/test evidence, remaining data dependencies and visual fidelity status.
