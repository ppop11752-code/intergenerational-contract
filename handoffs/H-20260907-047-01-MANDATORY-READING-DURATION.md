handoff_id: H-20260907-047-01-MANDATORY-READING-DURATION
from: 05
to: 01
status: DONE
title: Re-evaluate Mandatory reading duration requested by user

## Context

During Mandatory UX approval, the user selected no visible timer/progress and explicitly requested that the Mandatory reading duration be adjusted shorter so it does not feel too long.

Current authoritative Rule Ledger / server baseline uses approximately 7 seconds for Mandatory reading presentation.

## Required work

Chat 01 must analyze a shorter Mandatory reading duration and obtain/record the exact gameplay decision from the user before changing the Rule Ledger.

Suggested values to compare:
- 4 seconds;
- 5 seconds;
- 6 seconds;
- keep 7 seconds.

Evaluate readability versus turn pacing, especially when Mandatory contains many line items, forced liquidation or bankruptcy result presentation.

## Constraints

- Do not change the UI design decisions from `docs/UI_MANDATORY_APPROVED_V1.md`.
- Mandatory remains automatic, no skip, no gameplay decision timer.
- No client-only timing workaround.
- Before the decision recorded below, 7 seconds remained authoritative.

## Handoff back

If the user locks a new duration, update canonical gameplay sources/decision log as required and hand off to Chat 02/03/06/07 as appropriate for engine/server/client/tests. Chat 05 only needs notification if the duration creates a presentation-readability conflict.

## Decision

Người dùng chọn **B — 5 giây** ngày 2026-09-07.

Mandatory vẫn automatic/server-authoritative, không skip/confirm, không countdown/progress và không phải gameplay decision timer.

## Result

- Rule Ledger cập nhật thành 5 giây.
- D-052 được thêm vào Decision Log.
- Implementation/QA được chuyển tới Chat 03/04/06/07.
- Không có code change trong Chat 01.

## Result commit/ref

`main` — cùng commit source-lock và handoff.
