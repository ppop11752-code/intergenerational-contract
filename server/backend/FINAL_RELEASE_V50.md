# Intergenerational Contract v5.0 — Engine & Server Final

## Release status

**Engine status: FINAL**  
**Authoritative room layer: FINAL**  
**Express/Socket.io transport source: FINAL, dependency-install required to compile/run**  
**UI/client: intentionally excluded/deferred**

Rule Ledger agreed in chat is the authoritative gameplay specification for this release.

## Final verification performed

Executed successfully on the final source tree:

```text
npm run typecheck
npm test
npm run test:fuzz
npm run test:final
```

Results:

- Engine TypeScript typecheck: PASS
- Rule Ledger deterministic regression suite: **42/42 PASS**
- Invariant fuzz: **20 games PASS**
  - extinctions: 11 / 20
  - avg final population: 1.45
  - avg final public debt: 987.8103785740608
  - avg rounds: 30.8
- Final simulation batch: **30 games completed**
  - extinctions: 15 / 30
  - avg final population: 1.4333333333333333
  - avg final public debt: 892.3078750392646
  - avg rounds: 30.933333333333334

Simulation balance statistics are diagnostics, not a correctness target.

## Server transport verification

`src/authoritative-room.ts` is included in the normal engine build and covered by the 42 deterministic tests.

The Express/Socket.io adapter under `server/src/` was additionally checked with the TypeScript compiler using permissive ambient stubs for unavailable external packages; the local adapter syntax and imports into the engine pass that static check.

A real server compile/runtime test still requires installation of the declared external dependencies:

- express
- cors
- socket.io
- @types/node
- @types/express
- @types/cors
- tsx / TypeScript for development

The execution environment used to finalize this release had no network/cache for those packages, so a real dependency-backed server build could not be executed here. This is the only remaining environment verification gate, not a gameplay-rule blocker.

## Locked inheritance policy

For a deceased spouse with one surviving spouse:

```text
Divisible estate
= 50% × divisible joint assets
+ deceased Character funded ASXH
```

The surviving spouse funded ASXH remains locked and is excluded from the divisible estate. The resulting estate is shared equally by the surviving spouse and the deceased Character's direct living children.

## Included final scope

- authoritative simulation engine
- household/family economy
- Resource Lot ownership and production
- Status purchase / Noble allocation
- marriage and birth proposals
- Waiting Queue / reincarnation / reconnect policy
- ASXH / PAYG / Support Fund
- Government / public debt / inflation
- lifecycle / mortality / epidemic medical / grief fee
- inheritance / bankruptcy
- NPC AI
- scoring / history / end conditions
- authoritative room adapter
- Socket.io server transport source
- regression/fuzz/simulation tests
- Docker deployment files
- Rule Ledger implementation map
- Multiplayer protocol v5.0

## Excluded by design

- legacy React v4.2 client
- unfinished/frozen HTML UI prototypes
- final Tauri client
- production persistence/account system

