handoff_id: H-20260907-053-06-BIRTH-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement user-approved Birth V1

## Result
- Birth UI consumes authoritative `birthQuote` cap, third-slot condition, slot state, outgoing proposals and unavailable reason.
- Slots #1/#2/#3 are presentation state only; submission still uses the existing generic `child:birth` action.
- Incoming accept/reject/default-accept semantics remain server-owned.
- No local fertility/cap rule was invented.

## Verification
HEAD `ab8e7a7343c73c2f9501f18ebf33697080668629`: TypeScript build PASS; clean Client tests 64/64 PASS; desktop/mobile E2E PASS, run `34145674583`, artifact `10027576158`.
