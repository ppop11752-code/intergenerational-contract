# UI IMMIGRATION / NPC TAKEOVER — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Player-facing communication for round-start NPC immigration and Human disconnect → permanent NPC takeover.

## AUTHORITATIVE BEHAVIOR — LOCKED

- Immigration occurs at round start from authoritative state.
- Immigrants are NPC Characters in independent economic Households.
- Immigrants never enter Waiting Queue.
- Immigrant Persona remains hidden.
- Human disconnect permanently converts the same existing Character to NPC control.
- Reconnecting Human enters Queue end and never reclaims the old Character.
- Takeover preserves Character identity/history/Residence unless later authoritative rules change them.
- Client does not derive immigration or takeover state.

## USER-VERIFIED PRESENTATION

- **I1:** Use a **short, small, non-blocking notification** when immigration occurs, e.g. `+N NGƯỜI NHẬP CƯ ĐÃ ĐẾN`. Do not elevate routine immigration to a large banner/modal.
- **I2 A:** New immigrant Residences get a brief subtle arrival/highlight animation at authoritative locations, then become ordinary world elements.
- **I3 A:** Character detail may show a small neutral `NGƯỜI NHẬP CƯ` badge; no permanent large map label.
- **I4 A:** Immigrants use normal NPC Character detail; show ordinary age/stage/Status/family/economic context but never hidden Persona/internal formula.
- **I5 A:** Disconnect takeover uses a small notice `NHÂN VẬT [TÊN] HIỆN DO NPC ĐIỀU KHIỂN`; no modal and no death/replacement semantics.
- **I6 A:** Takeover keeps same portrait/name/Residence/history and adds compact `NPC ĐIỀU KHIỂN`.
- **I7 A:** Immigrant NPC and takeover NPC share the standard subtle NPC-control marker; contextual detail may distinguish `NGƯỜI NHẬP CƯ` vs `NHÂN VẬT CŨ · NPC ĐIỀU KHIỂN`.
- **I8 A:** Routine immigration aggregates into one short notification/count; takeover notices remain individual.

## Hard constraints

- No camera hijack for immigration/takeover.
- No Waiting Queue semantics for immigrants.
- No fake Human ownership after takeover.
- No hidden Persona exposure.
- No new gameplay class invented for immigrant NPC vs takeover NPC.

## Gate result

All I1–I8 are directly user-approved. Final V1 spec may be created and handed to Chat 06.
