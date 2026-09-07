handoff_id: H-20260907-051-06-RECOVERY-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement user-approved Recovery V1

## Result
- Three recovery grades keep authoritative pool/capacity/pending/cost display.
- `MAX` uses server `recoveryQuotes[].acceptedMax` only.
- Capacity/Cash/spending-limit unavailable reasons are shown from server quote.
- Existing server recovery action and revalidation remain unchanged.
- No ownership requirement or local capacity formula was added.

## Verification
HEAD `ab8e7a7343c73c2f9501f18ebf33697080668629`: TypeScript build PASS; clean Client tests 64/64 PASS; desktop/mobile E2E PASS, run `34145674583`, artifact `10027576158`.
