handoff_id: H-20260907-058-06-ELDERLY-MORTALITY-INHERITANCE-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: BLOCKED
title: Implement approved elderly medical / mortality / Grief / inheritance UI V1

## Source
- `docs/UI_ELDERLY_MORTALITY_GRIEF_INHERITANCE_APPROVED_V1.md`

## Implemented
- elderly profile can show authoritative medical due/paid and mortality-risk context;
- no Grief fee is surfaced at death;
- no mortality/inheritance calculation exists in Client;
- presentation remains non-blocking.

## Blocker
`H-20260907-065-03-UI-LIFECYCLE-RESULT-CONTRACT` is required for structured medical result, death notice, estate total, beneficiary amounts, joint spouse settlement and explicit Government transfer. Client will not parse Chronicle text or reconstruct heir logic.
