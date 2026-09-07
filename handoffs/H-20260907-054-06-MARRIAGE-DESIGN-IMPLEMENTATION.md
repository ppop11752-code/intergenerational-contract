handoff_id: H-20260907-054-06-MARRIAGE-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement user-approved Marriage V1

## Result
- Marriage discovery/proposal is world-first: eligible Residence profile gets `GỬI LỜI MỜI KẾT HÔN` only when target is in authoritative `marriageCandidates` and `canSendMarriage` is true.
- Proposal uses existing `marriage:propose`; pending cancel still uses existing `marriage:cancel`.
- Incoming `ĐẾN NHÀ` focuses proposer authoritative Residence.
- Accepted pairs render presentation-only dotted Residence relationship line from authoritative coordinates.
- Pending/accepted lifecycle semantics remain server authoritative; no timeout or local settlement rule added.

## Verification
HEAD `ab8e7a7343c73c2f9501f18ebf33697080668629`: TypeScript build PASS; clean Client tests 64/64 PASS; desktop/mobile E2E PASS, run `34145674583`, artifact `10027576158`.
