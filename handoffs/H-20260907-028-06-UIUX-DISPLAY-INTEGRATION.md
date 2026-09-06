handoff_id: H-20260907-028-06-UIUX-DISPLAY-INTEGRATION
from: 03
to: 06
status: OPEN
title: Integrate authoritative UI UX display contracts

## Context

Chat 03 completed `H-20260907-025-03-UIUX-DISPLAY-CONTRACT`. The remaining
World HUD, Mandatory, Recovery and Status display facts are now available from
authoritative snapshots without client-side economic calculations.

## Contract

### Public game snapshot

- `eventName: string | null`

### Private player snapshot

- `mandatoryQuote` during the current player's Mandatory phase, otherwise `null`:
  - `breakdown` with `living`, `socialContribution`, `tax`, `childSupport`,
    `parentSupport`, `grief`, `medical`, `total`;
  - `netIncome`, `cashBefore`, `liquidationRequired`, `liquidationProceeds`,
    `cashAfterLiquidation`, `projectedBankruptcy`, `shortfall`, `dominantCost`.
- `recoveryQuotes` during the current player's Voluntary phase, otherwise `[]`:
  - per grade: `grade`, `currentPool`, `carryingCapacity`, `pendingNextRound`,
    `capacityRemaining`, `costPerUnit`.
- `statusQuote` during the current representative's Status phase, otherwise `null`:
  - `roundAverageAssets`, `priceIndex`;
  - `cards`: `status`, `fee`, `personsCharged`, `affordable`;
  - `nobleCompetition`: `slotsTotal`, `slotsRequired`, `pendingNobleSlots`,
    `incumbent`, `householdAssets`, `turnCard`, authoritative priority order,
    end-round allocation timing, Middle fallback fee and potential refund.

All quotes are side-effect-free. Values describe the snapshot at emission time;
submitted actions are revalidated by the server against current state.

Implementation commit:

`9222968e2aba9970cd2f7038b9b901b304f40a89`

## Required work

1. Add the exact snapshot types without duplicating calculations in the client.
2. Render World Event, Mandatory details, Recovery cost/pending details and Status
   fee/competition/refund details with safe null/empty fallbacks.
3. Label Mandatory bankruptcy/liquidation values as projected during the timed
   presentation; do not present a quote as a committed result before resolution.
4. Run client build/tests and add deterministic regression for all four surfaces.
5. Update `reports/06_CURRENT.md` and the parent UI/UX implementation handoff.
6. Route the integrated surfaces to Chat 07 for browser/server QA.

## Constraints

- Do not derive economic values or eligibility client-side.
- Do not change gameplay rules, constants, actions or timers.
- Do not expose hidden NPC Persona.

## Expected output

- Four display surfaces consuming canonical snapshot fields.
- Client verification and QA handoff.
