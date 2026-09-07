# UI SUPPORT — APPROVED V1

Status: USER-APPROVED DESIGN
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Parent coverage: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Authoritative UX scope

This spec defines the player-facing `CHU CẤP` voluntary action surface. It does not change gameplay, kinship, cash/quota rules or the shared Voluntary timer.

## Desktop composition

- Open as a **large centered floating panel** over the persistent World Map.
- Approved Voluntary dock stays visible on the right and `CHU CẤP` is highlighted.
- The panel renders **one recipient card per currently eligible Character**.
- Cards may wrap responsively into a readable grid; do not force fixed parent/child sections.
- Relation (`CHA/MẸ` or `CON`) is clearly shown on each card.

## Recipient card

Each eligible Character card shows, where authoritative data is available:
- portrait/avatar;
- player-facing identity/name;
- relation to acting Character;
- age/stage label;
- current Status;
- short safe financial context if provided by the authoritative contract.

Never use raw Character ID as the primary player-facing identity.

At the bottom of **every card**, provide:
- `−`;
- editable numeric amount field;
- `+`;
- `MAX`;
- `CHU CẤP`.

The amount can be edited directly or adjusted with controls. Economic validity remains authoritative; client must not invent maximum cash/quota/eligibility logic.

## Persistent explanatory/context information

At the top of the panel:
`ĐÂY LÀ CHU CẤP TỰ NGUYỆN, TÁCH BIỆT VỚI CÁC KHOẢN CHU CẤP BẮT BUỘC ĐÃ ĐƯỢC XỬ LÝ.`

At the panel footer:
- `TIỀN KHẢ DỤNG`;
- `HẠN MỨC CHI CÒN LẠI` when applicable.

Values come from authoritative state.

## No eligible recipient

- Keep `CHU CẤP` visible/discoverable in the Voluntary dock.
- The player may select it even when no recipient is eligible.
- Instead of rendering recipient cards, show a clear unavailable explanation such as:
  `HIỆN KHÔNG CÓ CHA MẸ HOẶC CON CÁI ĐỦ ĐIỀU KIỆN NHẬN CHU CẤP TỰ NGUYỆN.`
- Do not hide the action and do not require a server error to teach this rule.

## Successful transfer

- Keep Support open.
- Refresh authoritative cash/quota and recipient state.
- Show a short inline confirmation on the corresponding recipient card, e.g. `ĐÃ CHU CẤP X`.
- Multiple transfers remain possible while authoritative time/cash/quota allow.

## Mobile

Use the same semantic cards in a bottom/full-height sheet under the approved mobile Voluntary action rail. Recipient cards may become one-per-row for readability; per-card amount controls remain attached to each target.

## Hard constraints

- One shared Voluntary 60s timer in HUD; no Support-specific timer.
- Direct parents/children only, according to authoritative eligible-target data.
- No spouse/sibling/unrelated support selector.
- No raw Character-ID entry.
- No client-side kinship reconstruction or economic-limit calculation.
- Voluntary support is not Mandatory support, ASXH donation, gifting or early inheritance.
