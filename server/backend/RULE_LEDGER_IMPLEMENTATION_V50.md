# Intergenerational Contract — Rule Ledger Implementation v5.0

## Status

This source tree is the engine/server implementation pass that replaces the v4.2 gameplay protocol. The Rule Ledger agreed in chat is authoritative. The old React UI is intentionally **not** treated as current gameplay UI and remains deferred for the later UI rebuild.

## Implemented system changes

### Multiplayer authority
- Max 30 Human connections tracked per room.
- No Ready state and no manual lobby bot controls.
- Host can start with one Human.
- Fewer than 10 Humans: all Humans are founders and NPCs fill the initial society to 10.
- More than 10 Humans: authoritative unique-card founder draw; top 10 become founders; remaining Humans enter Waiting Queue in draw order.
- Late join after start enters the end of Waiting Queue.
- Disconnect permanently hands the current Character to NPC control; reconnect enters the end of Waiting Queue and cannot reclaim the old Character.
- Host-only replay keeps room connections but resets the simulation.

### Turn flow
- Mandatory -> Status -> Voluntary.
- Mandatory is automatic server resolution; room exposes a 7-second presentation deadline before advancing Human input.
- Status timeout: 15 seconds.
- Voluntary timeout: 60 seconds shared across all voluntary actions.
- Marriage is outside the turn phase.
- The first spouse in turn order is Household representative; second spouse skips Household Mandatory and Status.

### Household / marriage
- Married finances share Cash, resources, Status and economic ASXH value.
- Funded ASXH stays in Character subaccounts for pension withdrawal.
- Private/Household debt has been removed from the model.
- Spending limit is snapshotted once at round start: each spouse receives 50% of start-of-round Household Total Assets.
- Shared Mandatory + Status costs are split equally into spouse quota usage.
- Market, Recovery and voluntary family support are charged entirely to the acting Character's quota.
- Accepted marriage is delayed to end-round settlement.
- Marriage merge reconciles pending Status as a doubled married fee, collects shortfall if affordable, downgrades if not, and refunds excess.

### Status / Noble
- Poor: 0.
- Middle: `10*PI + 3%*roundAverageHouseholdAssets`.
- Noble: `30*PI + 8%*roundAverageHouseholdAssets`.
- Married Household pays 2x.
- Price basis is snapshotted once per round.
- Noble slots = `ceil(livingCharacters * 10%)`; a married Household consumes two slots.
- Allocation: incumbent Noble -> Household wealth -> representative Turn Card.
- Losing Noble application resolves to Middle and refunds Noble-Middle difference.
- Purchased Status activates only at end round.
- Death before activation refunds the unused person-share before estate settlement.

### Resources / production
- Six abstract resources: renewable/nonrenewable x low/mid/high.
- Resource lot stores buyer Character and age at purchase.
- Only the buyer can later produce the lot, and only while Stage 3-6.
- Purchases in round R become eligible at round R+1 before Mandatory.
- Lots bought at Stage 1-2 get x1.2 when the same Character first produces them as a Worker.
- Recovery is renewable-only, needs no owned resource, and applies next round.
- Forced liquidation is 75% spot value.

### Children / family support
- Child remains a separate economic Household.
- Child can buy/hold resources but cannot produce until Stage 3.
- Global Child Allowance is active only rounds 1-8.
- Mandatory child support uses the final capped formula and is prefunded before Mandatory.
- Conditional filial support fills elderly parent living-cost gaps after pension income and enforces a **single 6% Worker-Household net-income cap across all parents in the round**.
- Voluntary transfer is direct parent-child only.
- Startup-support +10%, voluntary ASXH donations, early inheritance gifts and society-wide gifting are removed.

### Birth
- Separate Child #1 / #2 proposals, plus #3 during Pro-natal event.
- Household representative initiates proposals.
- Other spouse accepts/rejects during their Voluntary; no response defaults to accepted at the end of that turn.
- Birth executes only at end round.
- Accepted newborn slots are shuffled while Waiting Queue player order is preserved.
- Newborn birth round is not an active scoring round.

### Social security / government
- Worker contribution uses personal realized income: 5% funded, 3% PAYG, 2% Support Fund.
- Funded balances are part of Household Total Assets but locked from normal spending/liquidation.
- PAYG target/backstop/pension-crisis rules preserved.
- Public Debt only; no private debt.
- Debt ceiling uses 60% of resident Household Total Assets.
- Tax is computed from each Worker Character's realized income.
- Government investment/recovery/subsidy/debt management remains authoritative.

### Events / lifecycle
- Event cycle: rounds 4, 8, ..., 32.
- Epidemic adds `10*PI` Mandatory Medical Fee **per living Character** and can cause liquidation/bankruptcy.
- Elderly Medical Fee remains a separate passive end-round mechanism and cannot by itself trigger liquidation/borrowing/bankruptcy.
- Mortality Stage 7-11 follows the medical-payment formula; Stage 12 is terminal.
- Grief Fee is `15*PI` per living parent and is due next round.

### Scoring / end
- Standard winner only after completing 32 rounds.
- True Extinction ends immediately with no standard winner.
- Single Human score contribution = 100% Household Total Assets.
- Married Human score contribution = 50% Household Total Assets.
- Bankruptcy round counts as zero.
- Disconnect freezes a score snapshot immediately and closes that Human Life.
- Waiting Queue time and newborn birth round do not count.
- All Humans who participated appear in the standard final ranking.

## Verification performed

- TypeScript build of engine source succeeds with TypeScript 5.8.3.
- `test/rule-ledger-v5.mjs` contains deterministic Rule Ledger regression coverage for the final v5.0 rules, including locked-ASXH inheritance.
- 30-game and 10-game deterministic simulation batches run to completion after the new phase model.
- Server adapter source and action contracts are aligned to the v5.0 protocol. Engine-level room authority is covered without requiring network packages; full Express/Socket.io compilation still requires the server dependencies to be installed.

## Intentional deferral

The legacy React client and all temporary HTML UI prototypes are **not** the authoritative UI. They are intentionally deferred until the engine/server ledger pass is closed.

## V5.0 Final inheritance clarification — locked survivor ASXH

Policy A is authoritative for spouse-death estate settlement:

- Funded ASXH remains part of **Household Total Assets** for macro ratios, debt ceiling, Status price, spending-cap snapshots and scoring.
- A living spouse's funded ASXH is nevertheless a **locked personal sub-account** and is excluded from the divisible estate when the other spouse dies.
- The deceased Character's own funded ASXH is fully included in their estate.
- For a married Household with one surviving spouse:

  `Estate = 50% × DivisibleJointAssets + DeceasedFundedASXH`

  where `DivisibleJointAssets` is shared Cash plus resources materialized at the inheritance valuation rule, excluding all living members' funded ASXH.
- The estate is divided equally among the surviving spouse and all living children.
- The spouse's inherited share stays inside the surviving Household; only child shares leave shared Cash.
- If no spouse survives, the existing terminal estate settlement applies: all remaining funded balances of dead members enter the estate, then living children inherit equally; with no living child, the estate goes to the Government Budget.

This rule prevents a surviving spouse's locked pension balance from being implicitly liquidated or producing negative shared Cash during inheritance.

## Post-ledger correctness hardening

The final engine pass also closes several relationship/protocol edge cases that were not safely represented by the legacy Household-only links:

- Close-family marriage checks use direct parent Character relationships, so half-siblings remain blocked after a parent remarries.
- Grief Fee follows direct living parent Characters after remarriage.
- Conditional filial support follows direct parent Characters after remarriage, with historical parent-Household fallback for older records.
- Individual spouse-death inheritance uses the deceased Character's own direct living children; stepchildren do not automatically inherit from a step-parent.
- Proposers can cancel pending marriage proposals; the private snapshot exposes outgoing proposals for this UI.
- Player History is structured across reincarnations and records life start/reincarnation/marriage/child birth/Status milestone/death/bankruptcy/disconnect events.
- Server phase timing is configurable with `MANDATORY_PRESENTATION_MS`, `STATUS_TIMEOUT_MS` and `VOLUNTARY_TIMEOUT_MS`.
