# UI IMMIGRATION / NPC TAKEOVER — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Player-facing communication for:
- round-start NPC immigration arrivals;
- immigrant Residence/world integration;
- immigrant identity/context in Character detail;
- Human disconnect → permanent NPC takeover communication for remaining room participants;
- distinction between immigrant NPC and takeover NPC without creating new gameplay states.

## CURRENT / AUTHORITATIVE BEHAVIOR — DO NOT RE-ASK

### Immigration

- Immigration occurs at round start from the authoritative wealth/population formula and fractional accumulator.
- Immigrants are NPC Characters in independent economic Households.
- Immigrant stages are 3/4/5 using authoritative weights.
- Starting cash is authoritative 55–80% of normal starting cash scaled by PI.
- No starting resources.
- Initial Status is mostly Poor, sometimes Middle, per authoritative engine.
- Persona is hidden.
- Immigrants obey normal tax/ASXH/bankruptcy/marriage/birth/mortality rules.
- Immigrants never enter Waiting Queue.
- They arrive at round start and may appear in current authoritative Turn Order.
- Immigration cannot resurrect a truly extinct society.

### NPC takeover

- Human disconnect permanently converts the old Character to NPC control.
- The Character remains the same Character/history/Household unless other authoritative rules later change it.
- Disconnect itself does not invalidate marriage proposal eligibility.
- If the Human reconnects, the Human enters Queue end and never reclaims the old Character.
- The old Character remains inspectable as NPC-controlled under approved Queue/Reconnect V1.

## CURRENT DATA / SHELL

Current public Character state exposes `npc` and `immigrant` flags, plus age/stage/status/household context. Player connection state exposes disconnected/AI-takeover identity linkage needed for no-reclaim communication.

Approved art direction already requires Human/NPC distinction to be subtle and supported by UI marker/shape, not a completely different art style.

## UX RISKS

1. Immigration must feel like population entering the society, not like a new Human joining the room.
2. Immigrant NPC must not appear in Waiting Queue.
3. NPC takeover must not make it look as though the Character died or was replaced by a new Character.
4. Other players should understand control changed without receiving a disruptive modal.
5. Hidden NPC Persona must remain hidden.

## USER VERIFICATION QUESTIONS

### I1 — Round-start immigration notification

A. When one or more immigrants arrive, show one compact non-blocking world banner such as `+N NGƯỜI NHẬP CƯ ĐÃ ĐẾN`, then allow the new Residences/Characters to appear naturally on the map.
B. Show a separate popup for every immigrant.
C. Add immigrants silently and rely only on Niên sử.

Recommendation: **A** — communicates demographic change without interrupting round flow.

### I2 — Immigration map appearance

A. New immigrant Residences use a brief subtle arrival/highlight animation at their authoritative locations, then become ordinary world elements.
B. Force camera to each new Residence.
C. No visual arrival treatment at all.

Recommendation: **A** — enough spatial causality without camera hijacking.

### I3 — Immigrant identity marker

A. In Character detail, show a small neutral `NGƯỜI NHẬP CƯ` origin/context badge; do not keep a large permanent map label.
B. Never expose immigrant origin/status anywhere after arrival.
C. Keep a permanent `IMMIGRANT` label on Residence/map.

Recommendation: **A** — preserves social/history context without map clutter.

### I4 — Immigrant detail content

A. Use the normal NPC Character detail layout; show age/stage, Status, family/economic context normally, but never expose hidden Persona or internal immigration formula/random roll.
B. Give immigrants a special detailed statistics panel.
C. Only show portrait/name and hide ordinary Character data.

Recommendation: **A**.

### I5 — Disconnect → NPC takeover notice to other players

A. Use a small non-blocking notice `NHÂN VẬT [TÊN] HIỆN DO NPC ĐIỀU KHIỂN`; update Human/NPC marker in world/profile/Turn Track without implying death or replacement.
B. Full-screen disconnect modal to all players.
C. Change the marker silently with no communication.

Recommendation: **A**.

### I6 — Takeover Character identity/history

A. Keep the same portrait/name/Residence/history and add compact `NPC ĐIỀU KHIỂN`; do not rename/re-roll the Character visually.
B. Replace the old Character portrait/name with a generic NPC identity.
C. Hide takeover Character from other Humans.

Recommendation: **A** — takeover changes controller, not Character identity.

### I7 — Distinguishing immigrant NPC vs takeover NPC

A. Both use the standard subtle NPC-control marker; Character detail may separately show `NGƯỜI NHẬP CƯ` or `NHÂN VẬT CŨ · NPC ĐIỀU KHIỂN` only when contextually relevant. Do not invent separate gameplay classes.
B. Use completely different color themes for immigrant NPC and takeover NPC everywhere.
C. Treat them visually identically with no contextual explanation at all.

Recommendation: **A**.

### I8 — Multiple arrivals / changes in one round

A. Aggregate routine immigration into one banner/count; individual Characters remain discoverable through map/Niên sử. Takeover notices remain individual because they refer to an existing known Character.
B. Show every immigration and takeover as separate equal-priority popup.
C. Aggregate both immigration and takeovers into one generic population-change banner.

Recommendation: **A** — avoids notification spam while preserving important controller-change context.

## Gate

Do not create the final Immigration/NPC takeover design spec or Chat 06 implementation handoff until I1–I8 are directly approved by the user.
