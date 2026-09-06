handoff_id: H-20260906-011-04-CLIENT-STATIC-DEPLOY
from: 07
to: 04
status: OPEN
title: Establish canonical client static serving / backend wiring for OI-004 E2E

## Context

Chat 07 QA for OI-004 found that the canonical client cannot yet be exercised against the live backend as a deployed browser app.

`client/src/transport.ts` uses same-origin Socket.IO via `io(undefined, ...)`, while the root `Dockerfile` only builds/copies the backend runtime and does not copy `client/` or set `STATIC_DIR`.

The server already supports optional static serving when `STATIC_DIR` exists, but the current Render deployment does not wire the canonical client into that path.

## Source

- `client/src/transport.ts`
- `Dockerfile`
- `server/backend/server/src/index.ts`
- `reports/07_CURRENT.md`
- OI-004 QA handoff `H-20260906-010-07-OI004-CLIENT-QA`

## Required work

1. Establish one canonical deployable client/server wiring without changing gameplay.
2. Prefer same-origin static serving if compatible with current architecture, or otherwise provide an explicit supported client backend URL/config path.
3. Ensure production build includes the canonical `client/` output and Socket.IO reaches the authoritative backend.
4. Verify deployed client page loads and can establish Socket.IO connection.
5. Report exact deploy commit/ref and URL.
6. Hand back to Chat 07 for browser/server integration QA.

## Constraints

- Do not change gameplay rules.
- Do not duplicate server logic in client.
- Preserve current authoritative backend protocol.

## Expected output

- Canonical client deployment path verified.
- Exact live URL/ref.
- Handoff back to Chat 07 for OI-004 E2E.

## Result

Pending Chat 04.
