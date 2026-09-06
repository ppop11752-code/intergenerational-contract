handoff_id: H-20260906-009-06-CLIENT-BOOTSTRAP-OI004
from: 00
to: 06
status: DONE
title: Establish canonical client and implement OI-004 Tutorial

## Context

The user explicitly chose Option B: there is no prior canonical client source to preserve, so Chat 06 may establish a new canonical client implementation under `client/`.

Decision authority is recorded as D-051 in `docs/DECISION_LOG.md` and `client/README.md` now designates `client/` as the canonical implementation target.

## Source

- `docs/DECISION_LOG.md` — D-051
- `client/README.md`
- `docs/UI_TUTORIAL_SPEC.md`
- `docs/PROJECT_BASELINE.md`
- `docs/RULE_LEDGER.md`
- `server/backend/MULTIPLAYER_PROTOCOL_V50.md`
- `server/backend/server/src/index.ts`
- `server/backend/server/src/contracts.ts`
- `reports/05_CURRENT.md`
- `reports/06_CURRENT.md`

## Required work

1. Establish a minimal maintainable canonical client architecture under `client/` suitable for the current web game and current authoritative server protocol.
2. Do not change gameplay or invent new server protocol solely for client convenience.
3. Implement the current required multiplayer connection/state flow needed by the UI surfaces being built.
4. Implement OI-004 Tutorial exactly from `docs/UI_TUTORIAL_SPEC.md`, including Landing `HƯỚNG DẪN`, contextual T0–T11 guidance, versioned client-local progress, and non-blocking help recap.
5. Tutorial must not pause/reset/extend authoritative timers, skip Mandatory, or auto-send gameplay actions.
6. Normal multiplayer entry must not show Tutorial overlays unless entered through Tutorial flow.
7. Add build/test infrastructure and relevant regression tests for the implemented client scope.
8. Run client build/tests and record exact commit/ref.
9. Update `reports/06_CURRENT.md`.
10. If implementation is complete, create handoff to Chat 07 for integration/E2E QA. If a real ambiguity in gameplay/UI authority appears, hand off to Chat 00/05/01 instead of guessing.

## Constraints

- New client architecture is authorized; new gameplay is not.
- Server remains authoritative.
- Follow locked UI/UX specs rather than historical prototype HTML where they conflict.

## Expected output

- Runnable canonical client source under `client/`.
- OI-004 Tutorial implementation.
- Client build/test evidence.
- Updated Chat 06 specialist report.
- Handoff to Chat 07 for QA when ready.

## Result

Completed by Chat 06.

- Canonical TypeScript client created under `client/`.
- Current Socket.IO room/state/action flow implemented against existing server protocol.
- OI-004 Tutorial T0–T11 implemented as client-local authoritative-state-driven guidance.
- Normal multiplayer disables Tutorial overlays.
- Local versioned Tutorial progress and help recap implemented.
- `npm test` PASS 6/6; test command includes successful TypeScript build.
- Chat 06 report updated.
- QA handoff created for Chat 07.

## Result commit/ref

Client implementation range ends at `298884576a9d52fa2448f61672d475d83ae6e67b`; report commit `079e364ff83bc694c052bcfcab553049afa50339`.
