# UI RESIDENCE / FAMILY — APPROVED V1

Status: USER-APPROVED / AUTHORITATIVE FOR IMPLEMENTATION
Date: 2026-09-07
Owner: 05 — UI/UX & ART

## Purpose

Production UX for Residence / Family within the approved World Map shell. This spec governs Residence overview, resident selection, Character drill-down, family navigation, Stage2→3 residence transition and abandoned Residence treatment.

It does not change gameplay, residence assignment, family rules, economic-household rules, timers or protocol.

## 1. Entry / shell

- Clicking a Residence opens the Residence / Family surface.
- Desktop uses the approved floating middle-right world panel language; map remains visible and lightly dimmed.
- Mobile uses a bottom/full-height sheet.
- The map remains the primary world surface.

## 2. Residence overview — minimal occupant presentation

The Residence overview is deliberately not a grid of full Character cards.

For every Character currently living in that Residence, show only:
- portrait;
- player-facing identity/name;
- a short role in the Residence.

Examples of concise role language may include spouse/parent/child/resident where supplied by authoritative relationship state, but UI must not infer roles from map proximity.

Selecting a portrait opens the deeper Character detail within the same Residence/Family surface.

## 3. Economic Household vs co-residence

- Do not show a special economic-household badge in the Residence overview for Stage1–2 children who live with parents.
- Residence overview must not visually merge the child's financial state into the parents' household.
- When financial information is shown in deeper detail, all values must bind to the correct authoritative Economic Household.
- No client-side reconstruction of household membership.

## 4. Selected Character detail

After portrait selection, the deeper view may show:
- portrait;
- player-facing identity/name;
- Human/NPC marker;
- age/stage;
- Status;
- relationship/role context;
- compact lifecycle/state badges where relevant;
- approved contextual actions such as `CẦU HÔN` where authoritative eligibility permits.

Do not use raw Character IDs as primary player-facing identity.

## 5. Family relation strip/tree

Selected Character detail includes a compact relationship strip/tree for:
- spouse;
- parents;
- children.

Each relation is a clickable portrait node.
Clicking a relation navigates/focuses that Character's **current authoritative Residence/profile**, not a hard-coded birth/parent house.

Keep the relationship view compact; do not turn Residence into a full genealogy screen.

## 6. Child / survivor / orphan treatment

- Do not add persistent explanatory labels such as `MỒ CÔI`, `GIỮ NHÀ GIA ĐÌNH`, or survivor wording in ordinary Residence UI.
- Correct residence placement still follows authoritative rules:
  - dependent child with one surviving parent → current Residence with survivor;
  - both parents dead while Stage1–2 → child retains old Residence;
  - retained Residence becomes that child's adult Residence at Stage3.
- Multiple siblings follow their own authoritative state independently.

## 7. Stage2 → Stage3 transition communication

Use a short non-blocking world notice:
- normal move: `ĐÃ TRƯỞNG THÀNH — CHUYỂN RA Ở RIÊNG`;
- retained Residence: `ĐÃ TRƯỞNG THÀNH — TIẾP QUẢN NHÀ HIỆN TẠI`.

No full-screen adulthood scene and no gameplay delay.

## 8. Financial detail

Residence overview stays social/lifecycle-first.

Deeper Character/Household detail may show authoritative:
- cash;
- Household Total Assets / relevant assets;
- resources;
- funded ASXH;
- other already-approved public/private financial fields where contract permits.

Financial values must come from the correct authoritative economic household and must remain visually distinct across co-resident separate households.

## 9. Empty / abandoned Residence

When no living Character occupies a Residence:
- disable/close Family actions;
- mark/treat building as `BỎ TRỐNG` in the world;
- transition visually toward nature reclamation according to the authoritative visual lifecycle;
- clicking the abandoned structure opens only a compact historical/empty-state view until reclamation/removal.

Do not create property ownership, sale, inheritance-of-house or real-estate mechanics.

## 10. Interaction / visual rules

- Use approved pixel-art / Japanese anime-chibi portrait direction.
- Human/NPC distinction remains subtle but readable in deeper detail.
- Residence architecture continues to communicate Status; no large map Status labels.
- Panel transitions stay short/non-blocking and never alter authoritative timers.
- During Voluntary, opening Residence does not pause/reset the shared 60s timer.

## 11. Data-authority constraints

Implementation must not infer:
- current Residence from parent ID or map proximity;
- co-residence from household membership;
- economic household membership from visual roof sharing;
- orphan/survivor state locally;
- family relationships locally.

If current client/server snapshots do not expose a clean current-Residence mapping or sufficient family identity/state, Chat 06 must request a narrow Chat 03 contract addition instead of inventing client truth.

## Implementation acceptance

1. Residence click opens the approved Residence/Family surface.
2. Top-level residents are shown as portrait + name + short Residence role only, not full cards.
3. Portrait selection opens richer Character detail.
4. No economic-household badge is forced into the Residence overview.
5. Deeper financial detail binds to the correct economic household.
6. Family relation nodes navigate to current authoritative Residence/profile.
7. No permanent orphan/survivor explanatory badges are introduced.
8. Stage2→3 transition uses the approved two notice variants.
9. Empty Residence uses abandoned/reclamation treatment with no property mechanic.
10. No gameplay/protocol/timer/residence-assignment changes.