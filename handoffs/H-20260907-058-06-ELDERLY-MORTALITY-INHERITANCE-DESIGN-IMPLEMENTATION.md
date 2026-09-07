handoff_id: H-20260907-058-06-ELDERLY-MORTALITY-INHERITANCE-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement approved Elderly / Mortality / Inheritance V1

## Result
- Current elderly medical due/paid/risk presentation retained from authoritative Character state.
- Structured lifecycle results now render exact elderly medical result, death notice, joint spouse death, estate total, beneficiary amounts and Government transfer when applicable.
- Queue/new-life context consumes the same structured lifecycle records.
- No chronology parsing or estate/heir reconstruction is performed in Client.

No mortality, Grief, inheritance, bankruptcy or queue rule changed.

## Verification
HEAD `ab8e7a7343c73c2f9501f18ebf33697080668629`: TypeScript build PASS; clean Client tests 64/64 PASS; desktop/mobile E2E PASS, run `34145674583`, artifact `10027576158`.
