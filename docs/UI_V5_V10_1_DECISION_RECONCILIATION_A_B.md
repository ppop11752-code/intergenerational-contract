# UI V5–V10.1 DECISION RECONCILIATION — GROUP A+B

Status: USER-CONFIRMED / SCREEN LAYOUTS STILL NOT APPROVED
Date: 2026-09-07
Scope: Landing / Lobby / Room / HUD / Map shell only.

This document reconciles historical prototype decisions from V5–V10.1 against the user's current direct decisions. These are now the authoritative preferences for this scope, but they do **not** constitute approval of a specific visual mockup/layout until the user reviews that screen.

## Landing / entry

- **A1 — KEEP:** Landing remains a classic game menu with five top-level entries: `TẠO PHÒNG`, `THAM GIA PHÒNG`, `HƯỚNG DẪN`, `LUẬT CHƠI`, `CÀI ĐẶT`. Visual hierarchy may differ, but the five entries remain part of the Landing menu.
- **A2 — KEEP:** Create Room and Join Room remain separate screens, not permanent forms embedded on Landing.
- **A3 — MODIFY AS RECOMMENDED:** If reconnect state exists, show `TIẾP TỤC PHÒNG …` as a secondary CTA that does not dominate or break Landing composition.

## Lobby / Founder

- **A4 — MODIFY AS RECOMMENDED:** Lobby keeps both a large room PIN and QR. PIN is the primary visual/share fallback; QR is secondary.
- **A5 — KEEP:** Lobby roster shows Human players only; server-filled NPCs are not individual roster entries.
- **A6 — KEEP:** No per-player Ready mechanic.
- **A7 — KEEP:** Host does not manually add/remove/control NPCs from Lobby.
- **A8 — MODIFY AS RECOMMENDED:** Keep society-start information (Human/NPC composition and Founder explanation) but present it compactly instead of dedicating an oversized technical panel.
- **A9 — MODIFY AS RECOMMENDED:** Founder Draw is a short non-blocking reveal/overlay/transition associated with Lobby → Game start, not a required standalone full screen.

## Room / game shell

- **A10 — KEEP:** After Lobby/Founder reveal, enter the World Map/game shell directly. There is no extra standalone pre-game `Room` screen; in this design phase `Room` refers to the in-game world shell.
- **A11 — MODIFY AS RECOMMENDED:** HUD remains top-oriented but should be split into visually meaningful clusters rather than one dense full-width dashboard strip. Default state is compact/adaptive.

## Turn Track

- **A12 — KEEP:** Turn Track is a narrow vertical rail on the left and shows roughly 5–6 upcoming entries.
- **A13 — KEEP:** Reading order is top-to-bottom; the next/nearest turn appears highest.
- **A14 — KEEP:** Clicking a Character on Turn Track pans/focuses camera to that Character's Residence; child maps to parents' Residence; Government entry maps to Government.
- **A15 — KEEP:** Turn Track navigation moves/focuses the camera only; it does not automatically open a profile/panel.

## Map structure

- **A16 — KEEP:** Government is the central landmark anchor of the settlement.
- **A17 — KEEP:** Market has no required world-map building.
- **A18 — KEEP:** Settlement expands outward with population; map edge reads as open mainland/continued world with fog, not a fixed island/border enclosure.
- **A19 — KEEP:** Residences are distributed naturally, not zoned into Poor/Middle/Noble districts; adult children should preferentially appear reasonably near parents when placement permits.
- **A20 — KEEP:** Residence architecture reflects Status. Wealth may only alter scale subtly within approximately 0.90–1.15. Family size does not choose a larger house asset or change architecture scale.
- **A21 — MODIFY AS RECOMMENDED:** Keep quick map navigation for Government / Home / Zoom In / Zoom Out, but render them as compact icon-led controls rather than prototype-style text buttons.
- **A22 — KEEP:** Free click-drag pan + zoom remains supported.
- **A23 — KEEP:** Do not force camera movement for every event; use only light focus where helpful.
- **A24 — KEEP:** Government / Residence / Niên sử / feature surfaces open as overlay drawers/sheets while the map remains present beneath/behind.

## Government / shell information architecture

- **A25 — MODIFY BY USER:** Government is opened by clicking the **Government building on the World Map**. Its internal information structure may keep the four historical categories `TỔNG QUAN / NGÂN SÁCH / NỢ CÔNG / AN SINH`; final drawer/sheet visual form is still subject to design approval.
- **A26 — KEEP:** No permanent separate Player Bar. Personal information appears contextually or inside relevant surfaces.
- **A27 — KEEP:** Important World Events may use a short focus/banner treatment without taking over the whole screen or pausing gameplay.
- **A28 — KEEP:** Mobile changes presentation only, not gameplay. Desktop drawers/panels may become bottom sheets or full-height sheets on compact screens.

## Cross-reference: newer confirmed preferences

The following direct decisions also apply to this scope and supersede conflicting V5–V10.1 assumptions:
- pixel art + Japanese anime/chibi character treatment;
- Human/NPC visually distinguishable through character styling + UI markers;
- bright/lively world + darker fantasy UI chrome/panels;
- softer pixel-frame geometry;
- subtle world evolution across years/generations;
- fantasy contract-seal/lifecycle logo concept;
- Landing key art = world landscape + chibi/anime foreground;
- compact portrait-grid Lobby roster;
- non-blocking Founder reveal;
- initial camera = useful whole-settlement overview;
- adaptive HUD = phase/timer emphasis in HUD + separate temporary World Event banner;
- Music/SFX controls live in Settings.

## Remaining status

Historical structural decisions A1–A28 are reconciled. No redesign is yet approved. The next step is to reconcile remaining historical **visual/motion/responsive details** for Landing/Lobby/Room/HUD, then present the first Landing design proposal for direct user approval.
