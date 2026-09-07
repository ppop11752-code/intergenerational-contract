# UI WAITING QUEUE / RECONNECT — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Waiting Queue UX for:
- non-founder Humans after Founder Draw;
- late join after game start;
- Human death;
- reconnect after disconnect;
- transition from Waiting Queue into a newly assigned newborn Character.

Also resolves the Landing reconnect wording ambiguity identified by audit.

## CURRENT / AUTHORITATIVE BEHAVIOR — DO NOT RE-ASK

- Humans >10: authoritative Founder Draw chooses top10 founders; remaining Humans enter Waiting Queue by draw rank.
- Join after start → end of Waiting Queue.
- Human death → Waiting Queue.
- Disconnect → old Character permanently becomes NPC takeover.
- Reconnect → Human goes to the **end of Waiting Queue** and does **not reclaim the old Character**.
- NPC never enters Waiting Queue.
- Newborn slots are shuffled while Waiting Queue order is preserved; remaining newborns become NPC.
- Queue position is authoritative server state.
- No client-side ETA/newborn prediction is allowed.

## USER-APPROVED CHOICES

User approved the full recommended set Q1–Q8 = **A**.

### Q1 — Landing reconnect copy
Use `KẾT NỐI LẠI PHÒNG ABC123` with compact supporting text: `NHÂN VẬT CŨ SẼ TIẾP TỤC DO NPC ĐIỀU KHIỂN · BẠN SẼ VÀO CUỐI HÀNG CHỜ`.

### Q2 — Immediate reconnect result
Show a short centered `ĐÃ KẾT NỐI LẠI` information card, explicitly state permanent NPC takeover of the old Character and show authoritative queue position, then enter Queue view automatically.

### Q3 — Waiting Queue primary view
Keep World Map visible as spectator surface with compact `HÀNG CHỜ #N` panel. Public Residence/Government/Niên sử inspection remains available, but there is no current Home marker or Character actions.

### Q4 — Queue detail density
Show own authoritative queue position + number of Humans ahead. No ETA and no full ordered-name list by default.

### Q5 — Old Character after reconnect
Old Character remains inspectable as `NHÂN VẬT CŨ · NPC ĐIỀU KHIỂN`; never present it as current controlled Character and expose no player actions.

### Q6 — Human death → Queue
Show a short non-blocking death/result transition with authoritative cause/context where available, then `BẠN ĐÃ VÀO HÀNG CHỜ #N` and enter spectator Queue view.

### Q7 — Late join / non-founder
Reuse the same Queue spectator surface with reason-specific header/context.

### Q8 — Queue → newborn assignment
Show a short non-blocking reveal `MỘT CUỘC ĐỜI MỚI BẮT ĐẦU`, reveal assigned newborn/parent-Residence context, focus camera on current authoritative Residence and enter normal player shell.

## Cross-surface consequences

- `docs/UI_LANDING_APPROVED_V1.md` reconnect example copy must be narrowly updated from `TIẾP TỤC PHÒNG` to the approved no-reclaim wording above.
- Reconnect UI must never imply reclaim of the old Character.
- Queue view must never display a predicted wait time or guaranteed newborn timing.
- Public spectator navigation never pauses or changes authoritative game timing.

## Gate

Closed. Final implementation source: `docs/UI_WAITING_QUEUE_RECONNECT_APPROVED_V1.md`.