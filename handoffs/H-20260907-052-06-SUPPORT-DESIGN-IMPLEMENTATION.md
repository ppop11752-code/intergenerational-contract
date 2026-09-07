handoff_id: H-20260907-052-06-SUPPORT-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement user-approved Support V1

## Result
- Support cards use authoritative direct parent/child targets only.
- Per-target `MAX` uses server `transferableMax` only.
- No-target and target/Cash/spending-limit unavailable reasons are server-authored.
- Existing support action/revalidation remains authoritative.
- No outside-social relation or local transfer-cap formula was added.

## Verification
HEAD `ab8e7a7343c73c2f9501f18ebf33697080668629`: TypeScript build PASS; clean Client tests 64/64 PASS; desktop/mobile E2E PASS, run `34145674583`, artifact `10027576158`.
