handoff_id: H-20260908-095-06-PRODUCTION-PERFORMANCE-PROFILING
from: 00
to: 06
status: OPEN
title: Profile and fix production client lag without redesigning visual direction

## Context

Direct user play feedback on published `v1.0.0` says the game is both visually poor and laggy.

Visual redesign is now governed separately by:
`docs/UI_VISUAL_REDESIGN_WORKFLOW_V2.md`
and Chat 05 handoff:
`H-20260908-094-05-FIGMA-VISUAL-REDESIGN-PROGRAM`.

Performance investigation may proceed independently, but must not become a reason to redesign or degrade the newly approved visual direction without measured evidence.

## Source

- Latest direct user feedback, 2026-09-08: production feels laggy.
- `docs/UI_VISUAL_REDESIGN_WORKFLOW_V2.md` Phase 9.
- Existing client implementation and runtime production behavior.

## Required work

Profile real browser/runtime behavior and identify measured causes of lag.

Inspect at minimum where applicable:

- repeated rerenders;
- MutationObserver loops;
- unnecessary DOM mutation;
- layout/reflow thrashing;
- long tasks and input blocking;
- expensive animation/timers;
- oversized raster/image decode/upload cost;
- repeated event listeners;
- redundant authoritative snapshot processing;
- excessive state-to-DOM decoration passes;
- memory growth/leaks over a realistic session;
- mobile-specific performance regressions.

Use production or production-equivalent runtime evidence rather than only static code inspection.

## Constraints

- Do not change gameplay, protocol, timers, scoring or authoritative semantics.
- Do not redesign the visual system; Chat 05 owns art direction.
- Do not remove approved visual elements preemptively to gain performance.
- Measure first, then optimize the actual bottleneck.
- Preserve correctness and current regression coverage.
- If a future approved Figma design creates a measurable performance risk, report it back to Chat 05 with evidence rather than silently degrading it.

## Expected output

- ranked root causes with evidence;
- before/after measurements for any fix;
- client changes only where justified by profiling;
- regression tests for fixed pathological loops where appropriate;
- updated `reports/06_CURRENT.md`;
- handoff to Chat 07 for independent performance/runtime verification when implementation changes are made.

This handoff is performance-only. It does not authorize visual redesign implementation before Chat 05 approves Figma anchor nodes.
