handoff_id: H-20260907-049-06-VOLUNTARY-SHELL-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement user-approved Voluntary shell V1

## Result
- Right-edge Voluntary dock remains the action entry surface.
- Market/Recovery/Support/Birth unavailable states remain visible and now show authoritative reason from H064.
- No marriage duplicate was restored to the dock; marriage stays world/profile-first.
- Nonlocal/actionless states remain protected by existing authoritative turn/phase state.
- Timer remains server-authoritative.

No gameplay/protocol/timer rule changed.

## Verification
HEAD `ab8e7a7343c73c2f9501f18ebf33697080668629`: build PASS; clean Client tests 64/64 PASS; desktop/mobile E2E PASS, run `34145674583`, artifact `10027576158`.
