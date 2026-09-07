handoff_id: H-20260907-046-06-MANDATORY-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement user-approved Mandatory presentation V1

## Source
- `docs/UI_MANDATORY_APPROVED_V1.md`
- `docs/UI_MANDATORY_SOURCE_VALIDATION_V1.md`
- `docs/RULE_LEDGER.md`

## Resolution
Mandatory presentation is implemented from authoritative `mandatoryQuote` and server phase state. It remains presentation-only, has no skip/confirm action, no client phase transition, and no visible countdown. Generic HUD Mandatory timing is shown as `TỰ ĐỘNG` while server owns the configured presentation duration.

No gameplay/protocol/timer constants changed in Client.

## Verification
Source/regression implemented. Runtime verification remains under existing Mandatory QA and batch `H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA`.
