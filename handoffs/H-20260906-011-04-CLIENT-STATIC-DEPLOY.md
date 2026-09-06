handoff_id: H-20260906-011-04-CLIENT-STATIC-DEPLOY
from: 07
to: 04
status: DONE
title: Establish canonical client static serving / backend wiring for OI-004 E2E

## Context

Chat 07 QA for OI-004 found that the canonical client could not be exercised against the live backend as a deployed browser app.

`client/src/transport.ts` uses same-origin Socket.IO via `io(undefined, ...)`, while the root `Dockerfile` previously only built/copied the backend runtime and did not copy `client/` or set `STATIC_DIR`.

## Result

Completed in DevOps scope without gameplay/protocol changes.

Canonical deployment now uses same-origin static serving from the existing Render backend service:

- root `Dockerfile` builds canonical client TypeScript;
- runtime image includes `client/index.html`, `client/styles.css`, and compiled `client/dist/`;
- `STATIC_DIR=/app/client` enables existing server static-serving path;
- `client/index.html` loads `/socket.io/socket.io.js`;
- `client/src/transport.ts` keeps `io(undefined, ...)`, so browser client uses the same authoritative Render origin for Socket.IO.

Implementation commit:

`79202809a8bfaf8a1ffd5667f6bf7c4ca44e16da`

Render deploy:

`dep-daen607avr4c73bbin2g`

Live URL:

`https://intergenerational-contract.onrender.com`

Render build verified:

- server build passed;
- client TypeScript build passed;
- static files copied into runtime image;
- backend process started;
- service reached LIVE.

A real browser page-load/Socket.IO interaction was not independently executed from Chat 04 because the external HTTP sandbox could not resolve the newly deployed Render hostname. Browser-level E2E is therefore handed back to Chat 07, which now has a deployable canonical target.

## Result commit/ref

`79202809a8bfaf8a1ffd5667f6bf7c4ca44e16da`
