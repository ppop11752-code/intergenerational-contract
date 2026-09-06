# OPEN ISSUES — CURRENT

Updated for GitHub migration baseline on 2026-09-06.

## OI-001 — Marriage proposal lifecycle

**Status:** OPEN — implemented by Chat 02, awaiting independent Chat 08 re-audit.

Rule is source-complete under A1+B1+C1. Implementation report states 9/9 dedicated regression PASS plus full configured release suite PASS. Do not close until Chat 08 verifies the actual implementation artifact independently.

## OI-002 — Inflation scarcity combined formula

**Status:** CLOSED — VERIFIED.

Independent Chat 08 re-audit passed after direct inspection of the implementation artifact. Formula, timing, clamps, denominators, regression integration, typecheck, legacy regression, fuzz and simulation were verified.

Long-term balance/playtest remains separate from OI-002 consistency closure.

## OI-003 — `SOCKET_EVENTS` helper missing `game:replay`

**Status:** OPEN — LOW.

Owner: 03 — MULTIPLAYER & SERVER.

## OI-004 — Dedicated Tutorial guidance

**Status:** OPEN — SCOPE GAP.

Owners: 05 — UI/UX & ART; 06 — CLIENT IMPLEMENTATION; 03 if a server tutorial flag is needed.

## OI-005 — Render/GitHub server tree deployment mismatch

**Status:** OPEN / PENDING RE-VERIFICATION.

Owner: 04 — DEPLOYMENT & DEVOPS.

## OI-006 — Dependency-backed live server runtime verification

**Status:** OPEN — RELEASE GATE.

Owners: 04 — DEPLOYMENT & DEVOPS, then 03/07 for integration/release validation.
