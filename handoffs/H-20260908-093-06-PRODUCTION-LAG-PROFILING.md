handoff_id: H-20260908-093-06-PRODUCTION-LAG-PROFILING
from: 00
to: 06
status: OPEN
title: Profile and fix user-observed production lag without changing gameplay

## Trigger
Direct user feedback after playing published v1.0.0: the game feels laggy in production.

## Context
Release QA verified correctness, critical multiplayer smoke, selected render-loop regressions and responsive behavior, but no canonical performance budget/frame-time/input-latency acceptance criterion is recorded as part of v1.0.0 release evidence. User-observed lag is therefore a new post-release quality issue and must be measured rather than dismissed by prior PASS results.

## Required work
Profile the current production/client path and identify measurable causes of lag. Focus on client implementation first; hand off to Chat 03/04 only if evidence shows server/network/deployment contribution.

At minimum inspect:
- repeated snapshot/render/decorate work;
- MutationObserver/update loops and unnecessary DOM replacement;
- map/Residence rendering cost;
- large asset loading/decoding and layout shifts;
- event listener duplication;
- timer/state update frequency;
- network snapshot frequency/payload effects visible at client;
- mobile/low-end behavior where reproducible.

## Output
- Reproduction steps and measured evidence (frame time, long tasks, render/update frequency, or equivalent practical metrics).
- Root-cause classification.
- Minimal implementation fixes preserving approved UI and gameplay semantics.
- Regression/performance checks to prevent recurrence.
- Update `reports/06_CURRENT.md`.
- If server/network/deploy is materially involved, create narrow handoff to Chat 03 or 04 with evidence.
- Handoff to Chat 07 for targeted post-fix production verification.

## Constraints
- Do not change gameplay rules/timers/protocol semantics just to improve perceived speed.
- Do not remove approved visual elements solely for performance unless Chat 05 explicitly authorizes an equivalent fidelity-preserving alternative.
- Treat the user's observed lag as valid reproduction evidence even if prior functional QA passed.
