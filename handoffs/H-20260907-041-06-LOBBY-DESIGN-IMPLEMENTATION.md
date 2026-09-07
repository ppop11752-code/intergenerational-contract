handoff_id: H-20260907-041-06-LOBBY-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: DONE
title: Implement user-approved Lobby V1

## Source
- `docs/UI_LOBBY_APPROVED_V1.md`

## Resolution
Implemented approved Lobby presentation:
- large PIN primary, QR secondary;
- copy-code action plus existing copy-link QR runtime;
- Human-only portrait grid presentation;
- Host seal, BẠN marker and connection dot treatment;
- roster-only scrolling composition;
- Host Start vs non-host waiting region;
- no Ready/manual NPC controls;
- existing authoritative Founder result/Queue semantics retained;
- responsive compact/mobile layout.

No Founder randomization/gameplay/protocol changes.

## Verification
Implementation committed; browser/clean-suite verification delegated to `H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA`.
