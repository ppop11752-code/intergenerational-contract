handoff_id: H-20260907-058-06-ELDERLY-MORTALITY-INHERITANCE-DESIGN-IMPLEMENTATION
from: 05
to: 06
status: OPEN
title: Implement approved elderly medical / mortality / Grief / inheritance UI V1

## Source

Implement exactly from:
- `docs/UI_ELDERLY_MORTALITY_GRIEF_INHERITANCE_APPROVED_V1.md`
- `docs/UI_ROOM_APPROVED_V1.md`
- `docs/UI_RESIDENCE_FAMILY_APPROVED_V1.md`
- `docs/UI_WAITING_QUEUE_RECONNECT_APPROVED_V1.md`
- current Rule Ledger / authoritative server state.

## Required implementation

- Elderly selected Character detail: `SỨC KHỎE TUỔI GIÀ` with authoritative medical due/paid and mortality-risk context where exposed.
- Small non-blocking end-round medical result `Y TẾ TUỔI GIÀ — ĐÃ TRẢ X / Y`.
- Short non-blocking death notice; no forced camera/full-screen scene.
- **Do not** show Grief Fee at death; let it appear only inside next Mandatory breakdown.
- Structured inheritance result `DI SẢN ĐÃ PHÂN CHIA` with estate total + beneficiary identity + received amount when authoritative data is available.
- One-spouse-death family summary.
- Both-spouses-death single joint result; no sequential pseudo-settlements.
- Explicit Government transfer wording when there is no eligible heir.
- Human death continues into approved Waiting Queue UX.

## Hard constraints

- Do not calculate mortality, Grief, heir eligibility, estate value, resource conversion or shares in client.
- Do not infer a deterministic medical cause of death unless server supplies it.
- Elderly medical itself must never look like a bankruptcy/liquidation trigger.
- Presentation must not pause/reset authoritative timers for other players.

## Contract dependency

If the client contract lacks structured authoritative estate total / beneficiary amounts for the approved inheritance result, create a narrow handoff to Chat 03. Do not parse Chronicle text or reconstruct inheritance locally.

## Completion

After implementation, update `reports/06_CURRENT.md` and hand off integration/QA as appropriate.
