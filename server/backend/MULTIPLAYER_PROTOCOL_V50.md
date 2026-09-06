# Multiplayer Protocol v5.0

This protocol is authoritative for the v5 engine/server pass. The legacy React v4.2 client is not compatible with this protocol and is intentionally deferred.

## Room lifecycle

- `room:create`: `{playerId, displayName}` -> `{ok, code, reconnectToken}`.
- `room:join`: `{code, playerId, displayName}` -> before start joins the Human lobby; after start joins the end of Waiting Queue and returns `queuePosition`.
- `room:reconnect`: token-authenticated; after a disconnect, the old Character remains NPC-controlled permanently and the returning Human enters the end of Waiting Queue.
- `game:start`: Host only; minimum one connected Human.
- `game:replay`: Host only and only after game end; room connections are preserved while simulation state is reset.
- `room:get-state`: returns public room snapshot + the requesting player's private snapshot.

There is no Ready event and no manual NPC add/remove protocol. Maximum Human room membership is 30.

## Founder start rules

- 1-10 connected Humans: all become founders; NPCs fill the founder society to 10.
- More than 10 Humans: server draws unique authoritative founder cards; top 10 become founders and the remainder enter Waiting Queue in draw rank order.
- NPCs do not participate in founder draw.
- Join order is not used for founder ranking.

## `game:action`

Accepted actions:

- `{type:"marriage:propose", targetCharacterId}` — social action; sender cannot send during their own economic turn.
- `{type:"marriage:respond", proposalId, accept}` — recipient may respond even during their own turn; accepted marriage settles only at end round.
- `{type:"marriage:cancel", proposalId}` — proposer cancels a still-pending outgoing proposal.
- `{type:"status:set", status}` — current Household representative during Status phase only.
- `{type:"resource:buy", resourceType, grade, units}` — current Character during Voluntary.
- `{type:"resource:recover", grade, units}` — current Character during Voluntary; Renewable only and no ownership prerequisite.
- `{type:"family:support", targetCharacterId, amount}` — current Character during Voluntary; direct parent/child only.
- `{type:"child:birth"}` — current Household representative creates the next per-child birth proposal during Voluntary.
- `{type:"child:respond", proposalId, accept}` — proposal responder during Voluntary; unresolved proposal defaults to accepted when responder completes/times out of Voluntary.
- `{type:"turn:complete"}` — ends current Character's Voluntary phase.

Every economic action is revalidated by the authoritative engine for phase, turn ownership, Household role, Cash, resource pool, Status access, 50% spouse spending allowance and family eligibility.

## Phase deadlines

Server environment variables:

- `MANDATORY_PRESENTATION_MS` — default 7000. Mandatory itself is already resolved authoritatively; this deadline is presentation time only and has no player decision.
- `STATUS_TIMEOUT_MS` — default 15000. Timeout applies automatic current-tier/lower-tier fallback ending at free Poor.
- `VOLUNTARY_TIMEOUT_MS` — default 60000. One shared timer across Market, Recovery, Family Support and Birth.

Public snapshots expose `phaseDeadlineAt` and `phaseDeadlineKind` so clients render server time instead of starting independent gameplay timers.

## Public room snapshot

The public room snapshot contains:

- room code, Host and Human connection states;
- founder draw result and initial NPC count;
- active Character / NPC-takeover / Waiting Queue positions for room players;
- round, simulated year, phase, ending state and current turn;
- public debt, Government state, debt ceiling and fiscal history;
- Renewable/Nonrenewable pools and server-quoted Market prices/returns/failure risks/subsidies;
- PI, inflation, EIF reasons, Noble cap ratio and round-average-asset snapshot;
- Waiting Queue and population breakdown;
- PAYG / Support Fund / Pension Reserve and pension payout state;
- vertical Turn Track source data;
- active/pending marriage proposals, birth proposals and Status purchases;
- public living Character economics/family information;
- structured world history snapshots, rankings and bounded chronology.

The public Character record intentionally does not expose hidden NPC Persona.

## Private player snapshot

The private snapshot contains:

- current Character and Household;
- structured Player History across lives;
- Waiting Queue position;
- personal realized income and personal funded ASXH subaccount;
- Household assets, round-start assets and shared Cash;
- 50% spending limit, shared-cost quota charge, voluntary spending and remaining allowance;
- resource access from current-round Status;
- whether the Character is the Household representative;
- `canInitiateBirth`, a side-effect-free authoritative boolean that is true only
  for the current Voluntary-turn Household representative when the Household is
  a valid couple, both spouses are worker-age, and the current-round event Birth
  limit has not been reached;
- incoming marriage proposals;
- outgoing marriage proposals (for cancel UI);
- incoming birth proposals;
- valid marriage-candidate summary;
- `canSendMarriage`, current phase and phase deadline.

## Structured Player History

Player History is keyed to Human identity, not one Character. It records:

- cumulative score assets and active rounds;
- lives;
- highest score-asset snapshot;
- highest Status;
- marriage and child counts;
- events: `life_start`, `reincarnation`, `marriage`, `child_birth`, `status_milestone`, `death`, `bankruptcy`, `disconnect`.

Waiting Queue time does not create a Life or scoring round.

## Authority / concurrency

- The client sends intent only; it never reserves Market stock locally.
- Concurrent purchases are resolved in server receive order against the then-current authoritative pool.
- Server rejects stale/invalid actions rather than reconciling client-side predictions.
- Socket transport rate-limits `game:action` to 30 requests/second/socket in the current adapter.
- Room/player binding is server-side; reconnect requires the issued reconnect token.

## Transport events

Server emits:

- `room:state` after meaningful room/game mutations;
- `player:state` separately to each connected player's socket.

Server accepts:

- `room:create`
- `room:join`
- `room:reconnect`
- `room:get-state`
- `game:start`
- `game:replay`
- `game:action`
