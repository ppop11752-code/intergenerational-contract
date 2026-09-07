handoff_id: H-20260907-057-06-GOVERNMENT-SOCIAL-SYSTEMS-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement user-approved Government / social systems UX V1

## Authoritative design source

`docs/UI_GOVERNMENT_SOCIAL_SYSTEMS_APPROVED_V1.md`

## Required implementation

Implement the approved Government detail surface inside the existing Room/World shell:
- 3 tabs: `TỔNG QUAN / AN SINH / CAN THIỆP`;
- Tổng quan metrics and Fiscal Crisis warning;
- An sinh consolidated `TỔNG QUỸ AN SINH` presentation plus pension target/paid/payout/state-transfer/workers/elders/crisis metrics;
- Can thiệp read-only current actions + short history;
- Government-turn subtle building glow + small non-blocking action summary;
- mobile 3-tab sheet.

## Hard constraints

- Government remains automatic/read-only; no policy controls.
- Use authoritative server snapshot values.
- Do not recompute pension target/crisis/debt ceiling/Government strategy/fund flows.
- User chose **G3 B**: visually consolidate PAYG + Pension Reserve + Support Fund into `TỔNG QUỸ AN SINH`. This is display aggregation only. Do not merge underlying mechanics or imply fungibility.
- User chose **G4 B**: do not repeat detailed `10% → 5%/3%/2%` diagram in Government; keep that explanation in Rules/Tutorial.
- No forced camera on Government turn.
- No gameplay/protocol/timer changes.

## Verification

Verify desktop + mobile layout, authoritative data refresh, crisis states, Government-turn presentation and that aggregate An sinh display never drives gameplay logic.

## Handoff back

If required data is unavailable or ambiguous, create a narrow handoff to Chat 03 rather than inventing client truth. Report implementation status back through normal Chat 06 report/handoff flow.