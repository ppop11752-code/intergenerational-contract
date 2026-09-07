# UI IMMIGRATION / NPC TAKEOVER — APPROVED V1

Status: USER-APPROVED
Date: 2026-09-07
Owner: 05 — UI/UX & ART

## Scope

Production UX for round-start immigration and permanent NPC takeover after Human disconnect.

## Approved presentation

### Immigration
- Use one **short, small, non-blocking notification** such as `+N NGƯỜI NHẬP CƯ ĐÃ ĐẾN`.
- Do not use a large banner, blocking modal or one popup per immigrant.
- Newly created immigrant Residences receive a brief subtle arrival/highlight treatment at authoritative map locations, then visually normalize.
- Character detail may show a compact `NGƯỜI NHẬP CƯ` origin/context badge.
- Immigrants otherwise use the normal NPC Character-detail layout.
- Never expose hidden Persona, immigration formula, random rolls or internal IDs.

### NPC takeover after disconnect
- Use a small notice `NHÂN VẬT [TÊN] HIỆN DO NPC ĐIỀU KHIỂN`.
- Keep the exact same Character portrait/name/Residence/history.
- Update Human/NPC markers in world/profile/Turn Track from authoritative state.
- Add compact `NPC ĐIỀU KHIỂN` context where useful.
- Do not imply death, replacement or continued Human control.

### Distinction between NPC origins
- Immigrant NPC and takeover NPC use the same standard subtle NPC-control visual language.
- Detail may additionally show `NGƯỜI NHẬP CƯ` or `NHÂN VẬT CŨ · NPC ĐIỀU KHIỂN` when contextually relevant.
- Do not create separate gameplay classes or radically different color systems.

### Multiple changes
- Routine immigration in one round aggregates into one small count notification.
- Takeover notices remain individual because each is a meaningful controller change for an existing Character.

## Cross-surface requirements

- Immigration never appears in Waiting Queue.
- Takeover must align with approved reconnect/no-reclaim UX.
- No forced camera movement.
- No gameplay/protocol/timer changes.
- Client consumes authoritative `npc` / `immigrant` / connection state only.

## Mobile

Use the same semantics with compact top/edge notifications and the same Character-detail markers. Avoid stacking multiple intrusive banners.

## Acceptance criteria

1. Immigration is communicated with a short/small non-blocking notification.
2. Immigrant Residences get only a subtle temporary arrival treatment.
3. No permanent map clutter or hidden Persona exposure.
4. Disconnect takeover preserves Character identity and only changes controller presentation.
5. Reconnect/no-reclaim semantics remain intact.
6. Immigrant and takeover NPCs share the normal NPC-control visual language with contextual detail only.
7. No client-side immigration/takeover inference or gameplay changes.
