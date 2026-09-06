# OI-001 VERIFIED ARTIFACT MANIFEST

Artifact: `Intergenerational-Contract-v5.0-OI001-AUDIT-ARTIFACT.zip`

SHA-256: `a896c69cd186fbe6cb6cf7db780c25e341e683fd8545175b9e1df1c43b46b11f`

Independent audit: **PASS** by Chat 08.

Verified scope includes:

- `src/model.ts`
- `src/engine.ts`
- `src/authoritative-room.ts`
- `test/marriage-proposal-oi001.mjs`
- `test/scarcity-inflation-oi002.mjs`
- `test/rule-ledger-v5.mjs`
- `package.json`
- authoritative test-gate integration

Independent results:

- Typecheck PASS
- Rule Ledger regression 42/42 PASS
- OI-002 regression 6/6 PASS
- OI-001 regression 9/9 PASS
- Fuzz 20 games PASS
- Simulation 30 games completed

## Important repository-transfer note

The verified ZIP was supplied directly to Chat 00 and its SHA-256 was rechecked locally. The current ChatGPT GitHub connector can write UTF-8 repository files but does not expose a safe direct binary-upload action from the chat sandbox. An attempted oversized text transfer was detected as truncated and removed; no corrupted artifact is retained in the repository.

Therefore this manifest records verified provenance, but **does not claim the ZIP bytes or complete backend source tree have been imported into GitHub yet**.

Do not treat `server/` as canonical executable backend until a source-tree import is completed and matched back to this SHA-256/audited artifact.
