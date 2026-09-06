# Client

Canonical client implementation lives under this directory.

## Architecture authorization

By explicit user decision on 2026-09-06 (Decision Log D-051), there is no prior canonical client source to preserve. Chat 06 — CLIENT IMPLEMENTATION is authorized to establish a new canonical client implementation here from:

- locked UI/UX specifications in `docs/`;
- authoritative multiplayer/server protocol in `server/backend/`;
- current Project baseline and Rule Ledger.

This authorization does not permit gameplay-rule changes or protocol invention solely for client convenience.

## Current implementation

The canonical browser client is a zero-runtime-dependency TypeScript implementation using the Socket.IO browser client served by the authoritative server at `/socket.io/socket.io.js`.

- `src/transport.ts` — current room/game transport.
- `src/main.ts` — canonical browser UI and action binding.
- `src/tutorial.ts` — OI-004 Tutorial presentation state and T0–T11 triggers.
- `test/tutorial.test.mjs` — Tutorial regression tests.

Build:

```bash
cd client
npm run build
```

Test:

```bash
cd client
npm test
```

The server should expose this directory as its static root only through deployment configuration; client code does not alter server gameplay or protocol.

OI-004 Tutorial follows `docs/UI_TUTORIAL_SPEC.md`: guidance is authoritative-state-driven, local-only, versioned, and non-blocking.
