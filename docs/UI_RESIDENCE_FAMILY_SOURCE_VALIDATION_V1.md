# UI RESIDENCE / FAMILY — SOURCE VALIDATION V1

Status: USER VERIFICATION REQUIRED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Detailed Residence / Family surface opened from the approved World Map, including Character cards, family relationships, child/orphan/current-Residence semantics and the visual distinction between Residence and Economic Household.

## CURRENT / AUTHORITATIVE BEHAVIOR — DO NOT RE-ASK

- Residence is a visible house/location on the map; Economic Household is the financial unit. They are not the same concept.
- Clicking a Residence opens the Residence/Family surface.
- Desktop Residence/Family uses a floating middle-right panel over the persistent map; mobile uses a sheet.
- Residence architecture communicates current Status; wealth may affect building scale only subtly; family size does not choose a larger building asset.
- Stage1–2 child lives visually in the parents' current Residence but is a **separate economic household**.
- Normal Stage2→3 transition: child becomes adult and normally receives a separate Residence near parents where placement permits.
- If one parent dies while child is Stage1–2, child visually remains with the surviving parent.
- If both parents die while child is Stage1–2, child retains the old Residence; at Stage3 that same Residence becomes the child's adult Residence, with no duplicate house.
- Multiple dependent siblings transition independently according to authoritative Character state.
- Empty Residence is visual-only: it may become abandoned and then reclaimed by nature around one round; there is no real-estate mechanic.
- Marriage can change Household/Residence relationships only when authoritative settlement occurs.
- Turn Track / camera focus must resolve to the Character's **current authoritative Residence**, not a hard-coded birth/parent house.
- Child economic assets must not be visually merged into the parents' Household simply because they share a Residence.
- Client must not derive co-residence, household membership, orphan state or relationship from map proximity.

## CURRENT APPROVED SHELL

From `docs/UI_ROOM_APPROVED_V1.md`:
- Residence click opens Residence/Family.
- Local/current/focused Residence may have light marker/label; others reveal detail on hover/focus.
- Adult children preferentially appear near parents where possible.
- Residence panels float middle-right on desktop and lightly dim the map.
- World Map remains camera-interactive where technically compatible.

From `docs/UI_MARRIAGE_APPROVED_V1.md`:
- Eligible Character profile can expose `CẦU HÔN`.
- Marriage proposal notices may shortcut to the relevant Character/Residence.

## MAIN UX RISKS

1. A shared roof must not imply a shared economic Household for Stage1–2 children.
2. A child focus action must not jump to a dead/non-current parents' house.
3. Stage2→3 orphan transition must reuse the retained Residence instead of visually duplicating it.
4. Residence UI must not turn into a dense financial dashboard that competes with the world-first shell.

## USER VERIFICATION QUESTIONS

### RF1 — Residence panel composition

A. One floating Residence/Family panel with a Residence header and a grid/list of **Character cards for everyone currently living there**; selecting a Character reveals that Character's detail in the same panel.
B. Residence panel shows only one primary Household card; family members are secondary text rows.
C. Residence click opens a Character-first profile immediately, with no Residence-level overview.

Recommendation: **A** — it matches the visible-house concept and handles parents/children sharing one roof without pretending they share one economic Household.

### RF2 — Economic Household distinction for co-resident children

A. Each Character card carries a small economic-unit marker. Stage1–2 child living with parents is explicitly labeled `HỘ KINH TẾ RIÊNG · SỐNG CÙNG GIA ĐÌNH`; parent spouse cards may share one Household marker.
B. Hide economic-Household distinction from Residence; explain it only in Rules/Tutorial.
C. Split the Residence panel into separate financial subpanels for every economic Household.

Recommendation: **A** — enough clarity to prevent a major gameplay misunderstanding without making the panel a spreadsheet.

### RF3 — Character card contents

A. Portrait, player-facing name/identity, Human/NPC marker, age/stage, Status, relationship role in this Residence, and compact lifecycle/state badges where relevant; selecting opens deeper detail/actions.
B. Portrait + name + age only; all other detail after selection.
C. Full financial inventory on every card at all times.

Recommendation: **A**.

### RF4 — Family relationships

A. Selected Character detail shows a compact family relation strip/tree: spouse, parents and children as clickable portrait nodes; clicking one focuses/opens that Character's current Residence/profile.
B. Plain text list of spouse/parents/children.
C. Full genealogy tree occupying most of the screen.

Recommendation: **A** — supports social exploration and Marriage/Support context while staying compact.

### RF5 — Child / orphan Residence state wording

A. Show contextual residence-role labels only when useful, e.g. `SỐNG CÙNG CHA MẸ`, `SỐNG CÙNG CHA/MẸ CÒN LẠI`, `GIỮ NHÀ GIA ĐÌNH`; at Stage3 transition replace these with normal adult-residence state. No permanent `MỒ CÔI` badge unless gameplay explicitly supplies/needs it.
B. Always show a prominent orphan/survivor badge on affected children.
C. Do not explain any residence-role transition in UI.

Recommendation: **A** — explains current Residence semantics without turning family loss into a permanent map label.

### RF6 — Stage2→3 move communication

A. When an ordinary child moves to a new Residence at Stage3, show a short non-blocking world notice such as `ĐÃ TRƯỞNG THÀNH — CHUYỂN RA Ở RIÊNG`; if the child retained an orphan Residence, show `ĐÃ TRƯỞNG THÀNH — TIẾP QUẢN NHÀ HIỆN TẠI` instead.
B. Move the Residence silently and only record it in Niên sử.
C. Use a full-screen adulthood transition.

Recommendation: **A** — makes a visible map change understandable without interrupting gameplay.

### RF7 — Financial detail level inside Residence

A. Residence overview stays social/lifecycle-first. Deeper selected-Character/Household detail may show authoritative cash/assets/resources/ASXH relevant to that economic Household, visually separated from co-resident separate households.
B. Show full cash/assets/resources on every Residence card immediately.
C. Show no financial information anywhere in Residence.

Recommendation: **A** — preserves world-first readability while retaining access to meaningful economic context.

### RF8 — Empty / abandoned Residence

A. Once no living Character currently occupies a Residence, close/disable Family actions and let the map building visually enter `BỎ TRỐNG` → nature-reclaimed treatment; clicking it gives only a short historical/empty-state card until it disappears/reclaims.
B. Remove the Residence instantly as soon as it becomes empty.
C. Keep the full old Family panel permanently accessible from the abandoned house.

Recommendation: **A** — matches the authoritative visual-only abandoned-house lifecycle and avoids implying property ownership mechanics.

## Gate

Do not create final Residence/Family spec or Chat 06 implementation handoff until RF1–RF8 are directly approved by the user.
