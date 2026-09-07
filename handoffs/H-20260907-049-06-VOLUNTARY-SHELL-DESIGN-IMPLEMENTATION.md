handoff_id: H-20260907-049-06-VOLUNTARY-SHELL-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: BLOCKED
title: Implement user-approved Voluntary shell V1

## Source
- `docs/UI_VOLUNTARY_APPROVED_V1.md`

## Implemented
- right-edge desktop dock / mobile bottom rail;
- only Market / Recovery / Support / Birth + secondary End Turn remain in shell;
- active panel highlight;
- dock navigation does not own/reset timer;
- per-panel timers removed; HUD remains authoritative timer;
- Market is not permanently open.

## Blocker
`H-20260907-064-03-UI-ACTION-LIMITS-REASONS-CONTRACT` is required to keep every unavailable action visible with an authoritative reason without inferring eligibility locally.

No gameplay/protocol/timer change.
