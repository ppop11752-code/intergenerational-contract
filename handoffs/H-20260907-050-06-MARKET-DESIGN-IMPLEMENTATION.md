handoff_id: H-20260907-050-06-MARKET-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement user-approved Market V1

## Result
- Six resource cards retained with authoritative price/pool/current ownership presentation.
- Per-card `MAX` now uses server `marketQuotes[].purchasableMax` only.
- Locked/out-of-supply/insufficient-cash/spending-limit cards remain visible with authoritative `unavailableReason` copy.
- Submission still uses the existing server action and server revalidation.
- No client-side MAX/economic formula was introduced.

## Verification
HEAD `ab8e7a7343c73c2f9501f18ebf33697080668629`: TypeScript build PASS; clean Client tests 64/64 PASS; desktop/mobile E2E PASS, run `34145674583`, artifact `10027576158`.
