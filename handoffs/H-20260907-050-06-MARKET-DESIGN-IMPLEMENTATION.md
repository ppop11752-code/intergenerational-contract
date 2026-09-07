handoff_id: H-20260907-050-06-MARKET-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement user-approved Market V1 surface

## Source

- `docs/UI_MARKET_APPROVED_V1.md` — authoritative user-approved Market design.
- `docs/UI_VOLUNTARY_APPROVED_V1.md` — parent Voluntary navigation/timer shell.
- `docs/RULE_LEDGER.md` — authoritative gameplay.

## Required work

Implement Market UI exactly to the approved V1 presentation without changing gameplay/protocol/timers/formulas.

Critical acceptance points:
- centered desktop Market surface with six independent cards in 2×3 grid;
- no forced row/column category headers;
- each card explicitly identifies resource family + grade and always shows Price/Return/Risk/Pool/Owned/access;
- each card owns `− / editable numeric quantity / + / MAX / MUA` controls;
- locked/sold-out cards remain visible and explain state;
- purchase success keeps Market open and refreshes Pool/Owned authoritatively;
- persistent production-timing explanation;
- right Voluntary dock remains visible and the shared HUD 60s timer remains the only main timer;
- mobile reflows into approved sheet model;
- no client-side invented eligibility/economic cap/pricing/outcome calculation.

## Explicit non-goals

- Do not rename abstract resources into commodities.
- Do not change resource economics, access rules, production rules, timer behavior or server order semantics.
- Do not infer `MAX` if authoritative maximum is not available; surface the contract dependency instead.

## Completion

After implementation, update `reports/06_CURRENT.md` and hand off visual/integration verification as appropriate.
