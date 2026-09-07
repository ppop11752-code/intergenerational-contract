# 03 — MULTIPLAYER & SERVER — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

- `H-20260907-063-03-UI-RESIDENCE-MAP-CONTRACT`: **DONE**.
- `H-20260907-070-03-RESIDENCE-SNAPSHOT-MAP-CONTRACT`: **DONE**.
- H071 client integration is now unblocked.

### Changed

- Public `game.residenceDirectory` is keyed by stable `residenceId` and retains
  active plus reclaimed historical Residence records.
- Each Residence record exposes lifecycle state/origin/rounds, stable
  presentation coordinates, parent-Residence references, current occupants,
  authoritative family references and server-derived Residence role keys.
- `game.activeMapResidenceIds`, `activeOnMap` and
  `currentNavigationAllowed` define active map/current navigation explicitly.
- Bounded `game.residenceTransitions` provides `adult_move` and
  `adult_retained` events with exact source/destination Residence IDs.
- Public living Character and active room-player records expose
  `currentResidenceId`; private `currentResidenceId` is null in Lobby or Waiting
  Queue, including reconnect after permanent NPC takeover.
- Multiplayer protocol now prohibits client Residence inference and documents
  stable Chronicle/history resolution for reclaimed IDs.

### Source

- D-053 and `docs/RULE_LEDGER.md`.
- Completed H069 Residence state/lifecycle implementation at
  `c6e2415684dcab45b8d66446eaf8a24a50c2f783`.
- Approved Room, Residence/Family, Marriage and Waiting Queue/Reconnect UI specs.
- H070 implementation commits `db271a1e86fd979cb8a085bb032a9833204e8965`
  and `07659f60713f84f0f22a6255901d2c0561424f8c`.

### Impact

Chat 06 can bind map placement, Home/current Residence, Residence occupants,
family navigation, empty/abandoned/reclaimed presentation and Chronicle lookup
directly to server fields. Economic Household remains separate from Residence.
No gameplay formula, Residence assignment, phase, timer or action was changed.

### Verified

- Backend `npm run release:check`: PASS.
- Typecheck/build: PASS.
- Rule Ledger: PASS 42/42.
- OI-002 regression: PASS 6/6.
- OI-001 regression: PASS 9/9.
- Existing Birth, Support, display, action-limit, lifecycle-result and World
  Event contracts: PASS.
- D-053 Residence lifecycle: PASS 10/10.
- H070 Residence snapshot/map contract: PASS.
- Both authoritative Stage2→3 transition event variants: PASS.
- Fuzz: PASS 20 games.
- Final simulation: PASS 30 games.
- Nested server typecheck/build: PASS.
- Socket transport contract: PASS 9/9.

### Audit

- Authoritative source: D-053, Rule Ledger, completed H069 and approved UI specs.
- Blast radius checked: public/private room snapshots, reconnect/queue state,
  Character/family references, map selection, Chronicle lookup and protocol.
- Dependencies checked: canonical `residences`, Character
  `currentResidenceId`, occupant state, stable coordinates and H069 lifecycle.
- Falsification checked: child co-resides without Household merge; queued and
  reconnected Human has null Home; NPC takeover retains old Character Residence;
  reclaimed ID remains resolvable but leaves active map/navigation; snapshot is
  side-effect-free; both adulthood variants are explicit; no NPC Persona appears.
- `docs/OPEN_ISSUES.md`: OI-007 remains OPEN only for client integration and
  independent audit; OI-001–OI-006 remain closed.
- Other specialist impact: H071 is unblocked for Chat 06; H072 remains blocked
  until client integration is complete.
- Regression impact: no gameplay, economic, lifecycle timing or room action
  semantics changed; only authoritative display serialization was added.
- Verification level: source and deterministic local server integration complete;
  deployed runtime, client rendering and live browser verification pending.

AUDIT: PASS WITH WARNINGS

### Warning / Unverified

- H071 client integration is not yet implemented.
- Deployed reconnect/map/Chronicle behavior and live-browser rendering are not
  verified.
- OI-007 cannot close before H071 and independent H072 audit.

### Handoff

- Chat 06: execute H071 using `residenceDirectory`, `activeMapResidenceIds`,
  `currentResidenceId` and `residenceTransitions`; do not derive Residence or
  adulthood notice variants locally.
- Chat 08: execute H072 after H071, including protocol/client drift checks.
- Chat 07: verify deployed queue/reconnect, map navigation and reclaimed-history
  behavior after client integration/deployment.

### Open Issues

- OI-007 remains OPEN for downstream client integration and independent audit.
- OI-001–OI-006 remain CLOSED.
