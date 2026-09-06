# Intergenerational Contract — Engine/Server v5.0 Release Report

## Scope

This release closes the authoritative gameplay-engine pass against the Rule Ledger agreed in chat. UI/UX is explicitly deferred and the legacy React client is not considered compatible/current.

## Release status

### Closed gameplay-policy areas
- Multiplayer founder/queue/reconnect policy.
- Mandatory -> Status -> Voluntary phase model.
- Married Household economy, representative, shared costs and 50% spouse spending cap.
- Status formula, married 2x fee, Noble 10% Character cap, allocation/downgrade/refund.
- Resource lot ownership, Child investment x1.2, buyer-only production, Recovery and liquidation.
- Child allowance/support, conditional filial support and voluntary direct-family support.
- Per-child birth consent, delayed births and Waiting Queue newborn assignment.
- Delayed marriage and cancellation.
- ASXH/PAYG/Support Fund, Government/public debt, inflation and event mechanics.
- Epidemic Medical Fee, elderly medical/mortality and Grief Fee.
- Policy-A spouse inheritance with locked living-spouse ASXH.
- Cross-life Human scoring and structured history.
- True Extinction and 32-round standard ending.

### Important inheritance policy implemented
For one surviving spouse:

`Estate = 50% * DivisibleJointAssets + DeceasedFundedASXH`

`DivisibleJointAssets` excludes all funded ASXH belonging to living members. The surviving spouse's ASXH stays locked. The estate is shared equally by surviving spouse + deceased Character's direct living children; the spouse share remains inside the surviving Household and child shares leave shared Cash.

## Verification gates

The release gate is:

```bash
npm run typecheck
npm test
npm run test:fuzz
npm run test:final
```

The deterministic Rule Ledger suite covers phase timing, founder draw, Waiting Queue, marriage/birth, Status/Noble, family relationships/support, ASXH inheritance, resources, bankruptcy, mortality, scoring, reconnect and history behavior.

## Server transport status

`src/authoritative-room.ts` is part of the engine TypeScript build and is regression-tested. The Express/Socket.io adapter is aligned to the v5 protocol.

A full compile/runtime proof of `server/src/index.ts` additionally requires the external packages declared in `server/package.json` (`express`, `cors`, `socket.io`, Node typings). In the current execution environment those packages are not installed, so that transport-only verification remains an environment/dependency gate rather than a gameplay-rule blocker.

## Deferred

- Final React/Tauri game client.
- Final pixel-art UI asset pipeline and animations.
- Production persistence/authentication (not required by the current room design).
- Balance/playtest calibration. Simulation survival/extinction rates are diagnostics, not a correctness assertion.
