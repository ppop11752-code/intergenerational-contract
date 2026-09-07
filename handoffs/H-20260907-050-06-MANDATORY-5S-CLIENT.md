handoff_id: H-20260907-050-06-MANDATORY-5S-CLIENT
from: 01
to: 06
status: OPEN
title: Verify client follows server-authoritative 5-second Mandatory timing

## Context

D-052 locks Mandatory presentation at 5 seconds. The approved UI still has no skip, countdown or progress indicator.

## Source

- `docs/UI_MANDATORY_APPROVED_V1.md`
- `docs/UI_MANDATORY_SOURCE_VALIDATION_V1.md`
- `docs/RULE_LEDGER.md`
- H-20260907-046-06-MANDATORY-DESIGN-IMPLEMENTATION

## Required work

- Confirm the client has no local Mandatory-duration hardcode.
- Ensure the card transitions only from authoritative server phase state.
- Verify normal, forced-liquidation and bankruptcy presentations remain compatible with 5 seconds.
- Update `reports/06_CURRENT.md`.

## Constraints

- No client-only delay, skip control, countdown or gameplay calculation.

## Expected output

- Client integration evidence or a narrow defect handoff if any mismatch exists.

## Result

Chưa có.

## Result commit/ref

Chưa có.
