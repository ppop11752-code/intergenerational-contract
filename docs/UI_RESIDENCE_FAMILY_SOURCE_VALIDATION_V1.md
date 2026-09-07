# UI RESIDENCE / FAMILY — SOURCE VALIDATION V1

Status: CLOSED — USER VERIFIED
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Detailed Residence / Family surface opened from the approved World Map, including current co-residents, Character drill-down, family relationships, child/current-Residence semantics and the visual distinction between Residence and Economic Household.

## Authoritative behavior preserved

D-053 and `docs/RULE_LEDGER.md` now provide the exact source rule:

- Residence is an independent stable-ID entity; Economic Household is the financial unit.
- Founder/immigrant creates a Residence; newborn maps to parents without creating one.
- Marriage creates a new shared Residence without proposer/target/order bias; dependent child moves with direct parent.
- Stage1–2 child follows the surviving direct parent and that parent's remarriage; step-parent does not replace direct-parent placement.
- Both direct parents dead while child Stage1–2 → child retains current Residence; Stage2→3 creates no duplicate ID/coordinates.
- Normal Stage2→3 creates a separate stable-ID Residence with server-authoritative presentation coordinates near parents' current Residence.
- Sibling transitions are independent; orphan siblings may retain one shared Residence without duplication.
- Last occupant departure/death → `empty` immediately → `abandoned` for the full following round → `reclaimed` at that round's end.
- Reclaimed Residence leaves active map/navigation but remains historically resolvable in Chronicle.
- Coordinates are presentation-only; no property, house-inheritance, reuse, real-estate or gameplay-distance mechanic exists.
- Turn Track / camera focus resolves the Character's current authoritative Residence.
- Client does not derive co-residence, household membership, orphan state or family relations from map proximity.

## User decisions — 2026-09-07

### RF1 — Residence overview
USER CONFIRMED: Modified A.
- Open one Residence/Family panel.
- Top-level occupant presentation is **not a card grid**.
- Each current resident is represented only by:
  - portrait;
  - player-facing name/identity;
  - short role in this Residence.
- Selecting a portrait opens deeper Character detail in the same surface.

### RF2 — Economic-household marker for co-resident child
USER CONFIRMED: B.
- Do **not** add a `HỘ KINH TẾ RIÊNG · SỐNG CÙNG GIA ĐÌNH` marker in the Residence overview.
- Correct economic-household separation must still be preserved in deeper financial detail and authoritative data binding.

### RF3 — Character detail content
USER CONFIRMED: A, applied to the selected/deeper Character view rather than the minimal Residence overview.
- portrait;
- player-facing identity/name;
- Human/NPC marker;
- age/stage;
- Status;
- relationship/role context;
- compact lifecycle/state badges where relevant.

### RF4 — Family relationships
USER CONFIRMED: A.
- Compact relation strip/tree for spouse, parents and children.
- Relations use clickable portrait nodes.
- Clicking a relation focuses/opens that Character's current authoritative Residence/profile.

### RF5 — Child/orphan Residence wording
USER CONFIRMED: C.
- Do not add explanatory orphan/survivor/current-residence wording in ordinary Residence UI.
- Current authoritative residence placement is represented visually/statefully without special explanatory labels.

### RF6 — Stage2→3 transition
USER CONFIRMED: A.
- Ordinary move: short non-blocking notice `ĐÃ TRƯỞNG THÀNH — CHUYỂN RA Ở RIÊNG`.
- Retained orphan Residence: `ĐÃ TRƯỞNG THÀNH — TIẾP QUẢN NHÀ HIỆN TẠI`.
- No full-screen adulthood scene.

### RF7 — Financial detail
USER CONFIRMED: A.
- Residence overview remains social/lifecycle-first.
- Deeper Character/Household detail may show authoritative cash/assets/resources/ASXH for the **correct economic Household**.
- Co-residence must never merge separate economic households visually or numerically.

### RF8 — Empty/abandoned Residence
USER CONFIRMED: A.
- No living occupants → Family actions close/disable.
- Map building enters `BỎ TRỐNG` then nature-reclaimed treatment according to authoritative visual lifecycle.
- Clicking an abandoned Residence provides only short historical/empty-state information until reclamation/removal.

## Important reconciliation

RF1 and RF3 are not contradictory:
- RF1 defines a deliberately minimal Residence-level occupant overview.
- RF3 defines the deeper Character detail after portrait selection.

RF2 hides economic-household labels at the Residence overview, but RF7 still requires all financial data to bind to the correct authoritative economic household.

RF5 does not change survivor/orphan placement rules; it only removes explanatory labels from normal UI.

## Gate result

CLOSED — user directly approved RF1–RF8. Final implementation authority moves to `docs/UI_RESIDENCE_FAMILY_APPROVED_V1.md`.
