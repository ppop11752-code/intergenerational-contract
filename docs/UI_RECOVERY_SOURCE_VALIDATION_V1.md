# UI RECOVERY — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Detailed `PHỤC HỒI` action surface inside the approved Voluntary shell.

## CURRENT / AUTHORITATIVE BEHAVIOR — DO NOT RE-ASK

From Rule Ledger and current engine/server contract:

- Recovery exists only inside Voluntary and uses the same shared 60s total timer.
- Recovery applies to **Renewable resources only**.
- Player chooses one Renewable grade: Low / Mid / High, plus units to recover.
- Player does **not** need to own that resource to invest in recovery.
- Authoritative cost per unit = current Renewable market price × recovery rate × active event multiplier.
- `Đầu tư công`/Public Investment can reduce Recovery cost through authoritative event multiplier.
- Recovery does not add supply immediately. Accepted units go into `pendingRecovery` and apply at next round start.
- Authoritative capacity is limited by carrying capacity / engine limits.
- Recovery spending counts as voluntary spending and spouse spending quota where applicable.
- Cash remains a hard constraint.
- Server exposes a private Recovery quote for Low/Mid/High during the player's Voluntary turn containing:
  - currentPool;
  - carryingCapacity;
  - pendingNextRound;
  - capacityRemaining;
  - costPerUnit.
- Client must not independently recompute Recovery cost, capacity, affordability or event multiplier.

## CURRENT CLIENT / HISTORICAL GAP

Current prototype uses a basic grade selector + units field and was previously audited as missing:
- current pool/carrying capacity context;
- cost per unit;
- pending-next-round recovery;
- available remaining recovery capacity;
- cash/spending-quota context;
- production-quality presentation.

Historical UI explored three Recovery grades, but exact layout is non-authoritative until direct approval.

## Cross-surface constraints

- Approved right-edge Voluntary dock remains visible; `PHỤC HỒI` is highlighted.
- Approved HUD owns the only main 60s timer.
- World Map remains persistent behind the Recovery surface.
- Switching back to Market/Support/Birth does not reset/pause time.
- UI must clearly say Recovery takes effect **next round**, not immediately.
- Do not imply Recovery is a purchase/investment that yields personal financial return; it restores Renewable supply according to the authoritative system.

## USER VERIFICATION QUESTIONS

### RC1 — Desktop layout

A. Large centered panel with three horizontal cards: `THẤP / TRUNG / CAO`.
B. Middle-right floating panel with three cards stacked vertically.
C. One compact panel with three grade tabs and a single detail area.

Recommendation: **A** — the three grades can be compared quickly within the shared 60s phase.

### RC2 — Always-visible grade information

A. Each grade card always shows: Current Pool / Carrying Capacity, Pending Next Round, Capacity Remaining and Cost per Unit.
B. Always show Pool/Capacity + Cost; Pending/Remaining appears on hover/tap.
C. Only show Cost + Capacity Remaining, with other values in a detail drawer.

Recommendation: **A** — the current server quote already exposes these values directly and the full causal state is important.

### RC3 — Pool/capacity visualization

A. Add a compact visual gauge for `currentPool / carryingCapacity`, plus text rows for `pendingNextRound` and `capacityRemaining`.
B. Use numbers only, no gauge.
C. Use one projected next-round gauge that combines current + pending.

Recommendation: **A** — readable without inventing a projected final pool that may omit other authoritative round effects.

### RC4 — Recovery amount controls

A. Per-card controls: `− / editable numeric units / + / MAX / PHỤC HỒI`.
B. Click a grade card, then use one shared amount strip below all three cards.
C. Free numeric input only.

Recommendation: **A** — consistent with the user-approved Market interaction and reduces extra selection steps.

### RC5 — Cash/quota context

A. Show a compact panel footer with authoritative `TIỀN KHẢ DỤNG` and, when applicable, `HẠN MỨC CHI CÒN LẠI`; each card shows cost/unit and current action total preview where server-authoritative data supports it.
B. Show only cost/unit; insufficient cash/quota appears after submit.
C. Show full Household asset breakdown in Recovery.

Recommendation: **A** — enough to make spending constraints understandable without recreating the removed Player Bar.

### RC6 — Public Investment event treatment

A. When active, show a small `ĐẦU TƯ CÔNG` event badge beside the authoritative reduced cost, without client recomputation.
B. Show only the reduced cost; do not explain why.
C. Use a large event banner inside Recovery.

Recommendation: **A** — explains the discount while keeping World Event treatment compact.

### RC7 — Successful Recovery feedback

A. Keep Recovery open; refresh Pending/Capacity/Cash from authoritative state and show inline `ĐÃ ĐẦU TƯ PHỤC HỒI +X — HIỆU LỰC VÒNG SAU`.
B. Keep panel open with a generic toast only.
C. Close Recovery after every action.

Recommendation: **A** — supports multiple Recovery actions without suggesting immediate pool restoration.

## Gate

Do not create final Recovery design spec or Chat 06 Recovery implementation handoff until RC1–RC7 are directly approved by the user.
