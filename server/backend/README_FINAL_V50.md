# Intergenerational Contract v5.0 — Engine / Server Final

This package contains the finalized gameplay engine and authoritative multiplayer server source for the current Rule Ledger.

## Verify engine

Requires Node.js 22+ and a TypeScript compiler available locally.

```bash
npm run typecheck
npm test
npm run test:fuzz
npm run test:final
```

The finalized release passed 42 deterministic Rule Ledger tests, 20 fuzz games and a 30-game simulation batch.

## Run server

```bash
cd server
npm install
npm run build
npm start
```

Default server: `http://localhost:3001`  
Health: `GET /health`

Or from the combined package root:

```bash
docker compose up --build
```

The server is authoritative: clients send intents only. See `MULTIPLAYER_PROTOCOL_V50.md`.

## Important

The legacy `client/` is intentionally not included in this final backend package. UI/UX is deferred/frozen and will be integrated later.
