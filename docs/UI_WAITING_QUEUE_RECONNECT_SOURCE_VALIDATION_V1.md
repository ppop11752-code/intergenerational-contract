# UI WAITING QUEUE / RECONNECT — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
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

From latest Rule Ledger:

- Max 30 real Humans.
- Humans >10: authoritative Founder Draw chooses top10 founders; remaining Humans enter Waiting Queue by draw rank.
- Join after start → end of Waiting Queue.
- Human death → Waiting Queue.
- Disconnect → old Character permanently becomes NPC takeover.
- Reconnect → Human goes to the **end of Waiting Queue** and does **not reclaim the old Character**.
- NPC never enters Waiting Queue.
- Newborn slots are shuffled while Waiting Queue order is preserved; remaining newborns become NPC.
- Queue position is authoritative server state.
- No client-side ETA/newborn prediction is allowed.

## EXISTING APPROVED UI INTERSECTION

`docs/UI_LANDING_APPROVED_V1.md` currently gives example reconnect copy `TIẾP TỤC PHÒNG ABC123`.

Audit found that wording can imply the Human will resume control of the old Character. Any Queue/Reconnect approval may narrowly supersede that example copy while preserving the approved Landing placement: compact secondary reconnect card above the menu.

Room/World remains the primary surface. A Human in Waiting Queue has no currently controlled Character/Residence.

## MAIN UX RISKS

1. Reconnect must not imply reclaim of the old Character.
2. Waiting Queue must not promise an ETA or guaranteed newborn assignment timing.
3. The old Character may remain alive as an NPC and must not be presented as the reconnecting Human's current controllable Character.
4. Death, late join, non-founder queueing and reconnect all lead to queue state for different reasons; copy must explain the correct reason without changing queue rules.

## USER VERIFICATION QUESTIONS

### Q1 — Landing reconnect copy

A. Replace the example reconnect CTA with `KẾT NỐI LẠI PHÒNG ABC123`, with compact supporting text such as `NHÂN VẬT CŨ SẼ TIẾP TỤC DO NPC ĐIỀU KHIỂN · BẠN SẼ VÀO CUỐI HÀNG CHỜ`.
B. Keep `TIẾP TỤC PHÒNG ABC123`, but add the no-reclaim explanation below it.
C. Keep the old copy with no extra explanation.

Recommendation: **A** — removes the strongest semantic ambiguity before the user clicks.

### Q2 — Immediate reconnect result

A. After successful reconnect, show a short centered information card over the world: `ĐÃ KẾT NỐI LẠI`, explicitly state permanent NPC takeover of the old Character and show authoritative queue position, then enter the normal Queue view automatically.
B. Go directly to Queue view with only a small toast.
C. Show a full-screen reconnect explanation requiring confirmation.

Recommendation: **A** — the no-reclaim consequence is material and deserves one explicit causal message without blocking gameplay for others.

### Q3 — Waiting Queue primary view

A. Keep the World Map visible as a spectating surface and show a compact Queue panel with `HÀNG CHỜ #N`; allow map inspection plus approved public Residence/Government/Niên sử navigation, but no current Home marker or Character actions.
B. Replace the game world with a dedicated full-screen queue waiting room.
C. Show only a small queue badge on the normal HUD and otherwise leave the full active-player UI visible.

Recommendation: **A** — keeps the player connected to the evolving society without implying active control.

### Q4 — Queue detail density

A. Show only own authoritative position + number of Humans ahead; do not display predicted wait time or full queue names by default.
B. Show full ordered queue with every Human name.
C. Show position only, with no context.

Recommendation: **A** — enough orientation without turning queue into a competitive roster or promising timing.

### Q5 — Old Character after reconnect

A. The former controlled Character remains inspectable in world/Niên sử as `NHÂN VẬT CŨ · NPC ĐIỀU KHIỂN`, but is never shown as the user's current Character and exposes no player actions.
B. Hide the old Character from the reconnecting player entirely.
C. Keep the old Character visually marked as belonging to the Human even though control is lost.

Recommendation: **A** — preserves continuity and explains what happened without implying reclaim.

### Q6 — Human death → Queue transition

A. Show a short non-blocking death/result transition with authoritative cause/context where available, then `BẠN ĐÃ VÀO HÀNG CHỜ #N` and enter the same Queue spectating view.
B. Jump silently to Queue view.
C. Use a full-screen death scene requiring acknowledgement.

Recommendation: **A** — enough lifecycle feedback without turning queue entry into a blocking cinematic.

### Q7 — Late join / non-founder queue entry

A. Reuse the same Queue spectating surface, but reason-specific header copy such as `ĐANG CHỜ NHẬP VAI` / `HÀNG CHỜ #N`; non-founders may retain Founder Draw context, late joiners get a simple joined-late explanation.
B. Build separate queue screens for founder-draw losers and late joiners.
C. Do not explain why the Human is queued.

Recommendation: **A** — one coherent state with contextual reason is easier to learn.

### Q8 — Queue → newborn Character assignment

A. When authoritative assignment occurs, show a short non-blocking reveal `MỘT CUỘC ĐỜI MỚI BẮT ĐẦU`, reveal the assigned newborn Character/parent Residence context, then focus the camera on the Character's current Residence and enter normal player shell.
B. Switch immediately with a toast only.
C. Use a long full-screen reincarnation cinematic.

Recommendation: **A** — lifecycle transition is important but should not delay the authoritative game.

## Gate

Do not create final Waiting Queue/Reconnect spec or Chat 06 implementation handoff until Q1–Q8 are directly approved by the user.