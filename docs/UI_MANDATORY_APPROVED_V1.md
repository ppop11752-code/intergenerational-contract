# UI MANDATORY — APPROVED V1

Status: USER-APPROVED DESIGN
Date: 2026-09-07
Owner: 05 — UI/UX & ART
Trigger: `H-20260907-045-05-GAMEPLAY-SURFACE-COVERAGE`

## Scope

Production UX for the automatic Mandatory phase at Character-turn start. This spec defines presentation only and does not change gameplay calculations, phase sequencing, liquidation rules, bankruptcy rules or authoritative timing.

## Core composition

- Present Mandatory as a **large centered card** over the persistent World Map.
- World Map remains visible behind the card; use restrained dimming only as needed for readability.
- No skip/continue/confirm button.
- No visible timer, countdown, progress ring or progress bar for Mandatory.
- The card closes/transitions only when the authoritative server advances the phase.
- HUD may identify the phase as Mandatory but must not style it like an action deadline.

## Obligation breakdown

Always show every due Mandatory obligation as a full line item when authoritative data exists, including applicable categories such as:
- Living Cost;
- Tax;
- ASXH contribution;
- dependent-child support;
- conditional elderly-parent support;
- Grief Fee;
- epidemic medical fee;
- other authoritative locked Mandatory obligations.

Use clear label + amount rows and a final Household total.

For married Households:
- normal presentation shows **Household totals**, not two spouse columns or a persistent attribution subsection;
- client must not recompute or reinterpret attribution; it renders server-authoritative breakdown/totals.

## Forced liquidation state

If authoritative Mandatory processing liquidates resources:
- keep the same centered card;
- insert a visually separated section titled `THANH LÝ BẮT BUỘC`;
- show resource units/items liquidated where available;
- show the authoritative `75%` liquidation basis;
- show cash raised and resulting payable balance where available;
- make the causal order understandable: obligations → insufficient cash → forced liquidation → resulting outcome.

Do not present liquidation as a player choice.

## Bankruptcy state

If the Household still cannot pay after valid liquidation:
- transform the same Mandatory card into a strong terminal state titled `PHÁ SẢN HỘ GIA ĐÌNH`;
- summarize unpaid shortfall and relevant consequence from authoritative state;
- for married Household, communicate that the bankruptcy affects both spouses where applicable;
- do not offer Status or Voluntary controls afterward;
- do not add a manual acknowledgment requirement that delays authoritative turn progression.

## Visual direction

- Use the approved pixel-fantasy / parchment-wood-dark-fantasy chrome language.
- The card is stronger than normal floating world panels because Mandatory is compulsory presentation, but it should not become a full-screen cinematic.
- Numeric rows use readable data typography; labels remain highly legible.
- Forced liquidation and bankruptcy use stronger hierarchy/contrast without inventing gameplay severity beyond authoritative state.
- No emoji as production icons.

## Timing dependency

The user requested a shorter Mandatory reading duration than the current canonical baseline because it should not feel too long.

This exact duration is outside Chat 05 authority and remains pending gameplay decision. Until changed by the authoritative gameplay source:
- client follows the server phase transition;
- current canonical duration remains effective;
- UI displays no countdown;
- client must not hardcode a shorter local duration.

## Responsive/mobile

- Desktop: centered large card sized to show the complete line-item breakdown without feeling like a full-screen takeover.
- Mobile: use a centered/full-width sheet-like Mandatory card with vertical scrolling only if the authoritative breakdown cannot fit; the phase itself still auto-advances according to server timing.
- No mobile-specific skip or timer control.

## Acceptance criteria

1. Mandatory is visually unmistakable as automatic presentation, not a decision phase.
2. No visible reading timer/progress/countdown.
3. Every due obligation can be rendered as a full line item from authoritative data.
4. Married presentation uses Household totals in the normal card.
5. Forced liquidation appears in the same card with the 75% basis and authoritative result data.
6. Bankruptcy transforms the same card into a clear terminal outcome and does not proceed to Status/Voluntary.
7. No gameplay calculations or eligibility are duplicated client-side.
8. UI follows authoritative server phase timing.
