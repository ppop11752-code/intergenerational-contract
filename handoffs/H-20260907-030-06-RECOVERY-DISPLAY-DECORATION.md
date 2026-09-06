handoff_id: H-20260907-030-06-RECOVERY-DISPLAY-DECORATION
from: 07
to: 06
status: OPEN
title: Fix Recovery authoritative quote decoration after panel open

## Context

Chat 07 ran `H-20260907-029-07-UIUX-DISPLAY-QA` with production client + compiled production `AuthoritativeRoom`/`GameEngine` over Socket.IO.

Builds and full clean client suite PASS, but browser E2E fails when opening Recovery during an authoritative Voluntary phase.

## Reproduced defect

- Authoritative `player.recoveryQuotes` exists for low/mid/high.
- Browser receives the snapshot and Voluntary dock renders.
- User then opens the Recovery panel.
- `.recovery-row .server-quote` never appears; Playwright times out after 30s.

Workflow evidence:
- workflow: `UIUX Display E2E`
- run: `34049782937`
- head: `f28a659700fc9c70b0e5dbbed93f793529428bfc`
- artifact: `9994199735`
- artifact digest: `sha256:e9fd43453820c4b555e1ca9eccd7016a96ce40bb2d449358afb855ad4cf6770a`

## Likely root cause

`client/src/display-contract.ts` decorates Recovery only when `ic:snapshot` fires. `client/src/transport.ts` emits `ic:snapshot` after network snapshot updates. Opening a local panel calls normal `render()` but does not publish a new snapshot. Therefore the Recovery rows are created after the last decoration event and remain undecorated until another server snapshot happens.

This is presentation-only. Do not change gameplay, server quote rules or network protocol.

## Required fix

1. Ensure authoritative display decoration is re-applied after relevant local UI renders/panel changes, especially Recovery.
2. Do not recompute economic values client-side.
3. Preserve timer/action semantics.
4. Add regression proving: receive authoritative recoveryQuotes -> open Recovery panel without a new network snapshot -> all three server quote labels appear.
5. Audit other display surfaces for the same lifecycle issue when their DOM appears after the snapshot event.
6. Return `H-20260907-029-07-UIUX-DISPLAY-QA` to Chat 07 for rerun.
