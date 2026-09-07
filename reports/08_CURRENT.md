# 08 — CONSISTENCY AUDITOR — CURRENT REPORT

## Status

`H-20260907-072-08-RESIDENCE-LIFECYCLE-AUDIT`: **PASS**.

Independent source-level audit finds D-053 Residence identity/lifecycle consistent across Rule Ledger, engine, server snapshot/protocol, client binding and regression coverage. **OI-007 is eligible to close by Chat 00.**

OI-001 and OI-002 remain CLOSED / independently verified.

## Changed

No gameplay, code, server, client or UI changes. Independent consistency audit only.

## Source

- D-053 in `docs/DECISION_LOG.md`.
- `docs/RULE_LEDGER.md` Residence section.
- `server/backend/src/residence.ts`.
- `server/backend/src/engine.ts`.
- `server/backend/src/authoritative-room.ts`.
- `server/backend/test/residence-lifecycle-d053.mjs`.
- `server/backend/test/residence-snapshot-map-contract.mjs`.
- `server/backend/package.json`.
- `client/src/residence-ui-v1.ts`.
- `client/src/resolved-ui-contracts.ts` / approved client runtime.
- `client/test/residence-ui-v1.test.mjs`.
- `client/test/resolved-ui-contracts.test.mjs`.
- Specialist reports 02/03/06/07 and successful GitHub Actions production QA evidence.

## Impact

- Engine/server/client Residence contract is consistent with D-053.
- `currentResidenceId` is authoritative; Client does not infer Residence from Household, parents or map distance.
- Reclaimed Residence leaves current map/navigation but remains in authoritative directory/history.
- No property ownership, sale, house inheritance, Residence reuse or gameplay-distance mechanic was found.
- No hidden Persona leak was found in Residence public/client surfaces.
- Chat 00 may update `docs/OPEN_ISSUES.md` and close OI-007.

## Verified

### Identity and Household separation
- Residence is a distinct state entity with stable `residenceId` and lifecycle fields.
- Character gets mutable authoritative `currentResidenceId` through Residence module augmentation/state.
- Snapshot regression proves child can co-reside with parents while retaining a separate Economic Household.

### Creation and movement
- Founder gets independent Residence.
- Immigrant gets independent Residence with corrected `immigrant` origin.
- Newborn inherits parents' current Residence and creates no physical Residence.
- Marriage Residence ID is symmetric in spouse IDs; coordinates average source Residences and are independent of proposer/target/order.
- Dependent Stage1–2 direct children move with their direct parent into the new shared marriage Residence.
- Surviving-parent and remarriage reconciliation follows direct-parent Residence; no step-parent replacement rule is introduced.

### Adulthood and siblings
- Both direct parents dead => Stage1–2 child retains current Residence.
- Retained orphan Stage2→3 emits `adult_retained` and creates no new Residence ID/coordinates.
- Normal Stage2→3 creates `adult_transition` Residence near living parent Residence(s), using stable server-computed coordinates.
- Sibling transitions are independent; engine logic also permits orphan siblings to retain the same prior Residence without duplication.
- Engine end-round ordering ages Characters first, then runs Residence adulthood transition at that same boundary.

### Exact lifecycle timing
- Last living occupant departure/death changes `occupied → empty` immediately at the current round.
- At the start of the next round, `empty → abandoned`.
- It remains active on the map through that following round.
- At the end of that round, `abandoned → reclaimed`.
- Reclaimed Residence is filtered from active map/navigation but remains resolvable by stable ID in `residenceDirectory` / Chronicle history data.
- Occupancy refresh throws `RESIDENCE_REUSE_FORBIDDEN` if an abandoned/reclaimed Residence acquires occupants, preventing silent reuse.

### Death / bankruptcy
- Death, joint death and Household bankruptcy invoke Residence reconciliation, so surviving dependent-child placement and immediate vacancy state are not deferred to a later unrelated phase.

### Protocol and privacy
- Public snapshot serializes authoritative `residenceDirectory`, `activeMapResidenceIds`, Character/player `currentResidenceId`, and bounded `residenceTransitions`.
- Queue/Lobby/reconnected Human has null current Home while the permanent NPC-takeover Character retains its Residence.
- Residence occupants expose family role/reference keys but not hidden Persona.
- Snapshot contract checks are side-effect-free.

### Client
- Client consumes `residenceDirectory`, `activeMapResidenceIds`, `currentResidenceId`, `residenceTransitions` directly.
- Client Residence runtime contains no Household/parent-Household inference for placement.
- Reclaimed entries are excluded from current map/navigation and retained in Residence Chronicle presentation.
- Turn Track, minimap and Residence markers focus server-authoritative Residence IDs.
- Adulthood notices use authoritative transition kind rather than deriving from age.
- Coordinates are used only to position/pan presentation; no client random/distance gameplay calculation is present.
- Local-only financial details are protected; other residents do not expose detailed private economy.

### Regression / gates
- D-053 regression explicitly covers 10 lifecycle cases: founder/immigrant, newborn, symmetric marriage, survivor/remarriage, orphan no-duplicate adulthood, normal adulthood, sibling independence, end-round Stage2→3, exact empty/abandoned/reclaimed boundary, stable reclaimed history/no reuse.
- Snapshot/map contract explicitly covers Household-vs-Residence separation, family roles, no Persona leak, both adulthood event variants, queue/reconnect NPC takeover, reclaimed history and side-effect-free serialization.
- `server/backend/package.json` includes both Residence regressions in `npm test`, smoke and therefore `release:check`.
- Latest Chat 07 production QA reports backend gate PASS, clean Client 68/68 PASS, production desktop/mobile Residence navigation PASS and no raw Persona leak; GitHub Actions run `34151689731` concluded `success` at head `1bb6b443868abefee06e4242b9ef377129460341`.

## Falsification attempts

- Tried to find Household/Residence conflation: snapshot regression shows same Residence with different Household IDs for dependent child; Client Residence runtime does not use `householdId` or `parentHouseholdId` for placement.
- Tried to find proposer/target marriage bias: shared Residence ID sorts Character IDs and coordinates are symmetric over sorted source Residence IDs.
- Tried to find orphan duplicate Residence: both-parent-dead path intentionally retains current ID and adulthood regression asserts Residence count unchanged.
- Tried to find sibling coupling: transition loop handles each Character independently and regression separates sibling transitions.
- Tried to find early/late reclamation: start-round and end-round hooks match the exact next-round boundary.
- Tried to find Residence reuse/property mechanics: reuse is rejected by lifecycle guard; no Residence action for ownership/sale/inheritance exists in audited surfaces.
- Tried to find gameplay distance effect: coordinates are generated in Residence presentation module and serialized/rendered; no audited gameplay calculation consumes distance.
- Tried to find hidden Persona leak: public Residence/Character serialization excludes Persona and client Residence runtime does not reference Persona.

## Verification limitation / warning

The Chat 08 runtime could not clone the GitHub repository because external DNS/network access from the local container was unavailable, so Chat 08 did not independently execute the npm commands from a local checkout in this turn. This does **not** block the verdict because the audit directly inspected the current source and regression implementations, verified their inclusion in the authoritative test gate, and independently verified the successful current GitHub Actions/production-QA run. Dedicated live multi-client reproduction of every rare Queue/reconnect/Marriage state is not exhaustive; deterministic server/client contracts cover those states and Chat 07 classifies the release QA warning as non-blocking.

## Handoff

- Chat 00: close OI-007 and update `docs/OPEN_ISSUES.md` from stale `IMPLEMENTATION PENDING` wording to independently verified Residence implementation. See `H-20260908-077-00-CLOSE-OI007-RESIDENCE`.
- No corrective handoff to Chat 01/02/03/05/06 is required from this audit.

## Open Issues

- OI-007: **PASS / eligible for CLOSED by Chat 00**.
- OI-001 and OI-002 remain CLOSED.
- Full-game UX/UI rule coverage from the earlier H044 audit remains a separate project/UI coverage matter and is not reopened by this Residence audit.
