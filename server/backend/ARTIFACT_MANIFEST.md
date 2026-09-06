# OI-001 Audit Artifact Manifest

Purpose: independent Chat 08 re-audit of locked OI-001 marriage proposal lifecycle (A1+B1+C1).

Required implementation evidence:
- `src/model.ts` — proposal lifecycle schema (`createdRound`, `acceptedRound`, `executed`).
- `src/engine.ts` — proposal creation, response, cancellation, eligibility invalidation, acceptedRound settlement.
- `src/authoritative-room.ts` — authoritative sequential action ordering and active proposal snapshot filtering.
- `test/marriage-proposal-oi001.mjs` — 9 OI-001 regression cases.
- `package.json` — `npm test` includes OI-001 regression and `release:check` runs configured full engine suite.

No gameplay constants were intentionally changed for OI-001.
