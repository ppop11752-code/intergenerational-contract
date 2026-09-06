# VERIFICATION REPORT — CURRENT

## OI-002

**Independent status:** PASS / CLOSED.

Verified by Chat 08 from implementation artifact:

- exact Renewable / Nonrenewable scarcity formula;
- fixed denominators and weights;
- per-tier clamp before aggregation;
- 50/50 Renewable/Nonrenewable combination;
- end-round timing after natural Renewable regeneration;
- pending Recovery applies only at next round start;
- TypeScript typecheck PASS;
- Rule Ledger regression 42/42 PASS;
- OI-002 regression 6/6 PASS;
- fuzz 20 games PASS;
- simulation 30 games completed.

Long-term balance validation is not covered by OI-002 closure.

## OI-001

**Independent status:** PASS / CLOSED.

Artifact SHA-256 independently matched:

`a896c69cd186fbe6cb6cf7db780c25e341e683fd8545175b9e1df1c43b46b11f`

Chat 08 directly inspected `src/model.ts`, `src/engine.ts`, `src/authoritative-room.ts`, `test/marriage-proposal-oi001.mjs`, and `package.json`.

Verified lifecycle behavior:

- at most one outgoing `pending` per Character;
- multiple incoming `pending` allowed;
- pending persists across rounds without timeout;
- accepted is binding and cannot be rejected/cancelled;
- settlement occurs at end of `acceptedRound`;
- `createdRound` is history-only;
- loss of eligibility invalidates active proposals;
- disconnect/NPC takeover does not invalidate;
- successful settlement => `executed`;
- `executed` leaves active set but remains in history/state;
- first valid accept by authoritative server processing order wins.

Independent test execution:

- TypeScript typecheck: PASS;
- Rule Ledger regression: 42/42 PASS;
- OI-002 regression: 6/6 PASS;
- OI-001 regression: 9/9 PASS;
- fuzz: 20 games PASS;
- simulation: 30 games completed.

`npm test` was verified to include Rule Ledger, OI-002, and OI-001 `.mjs` suites.

### Legacy Vitest note

Legacy `.test.ts` suites using Vitest were not runnable because Vitest is not installed in the artifact runtime. Chat 08 identified outdated expectations in those files (including an obsolete `marriage` phase and immediate marriage upon Accept). They are not normative coverage for OI-001 and do not block closure. They remain non-blocking maintenance debt and should be updated/replaced/archived.

## Historical verification

Verification claims from migrated v5.0 artifacts remain evidence only for the exact version tested. They do not automatically verify later GitHub commits unless the repository commit is matched to the verified artifact/source and rechecked as needed.
