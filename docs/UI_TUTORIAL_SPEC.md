# OI-004 — DEDICATED TUTORIAL UX SPEC

**Owner:** 05 — UI/UX & ART  
**Status:** READY FOR CLIENT IMPLEMENTATION  
**Scope:** UI guidance only; no gameplay-rule change.

## 1. Authoritative gameplay boundary

Tutorial gameplay remains the locked rule from the current project baseline / Rule Ledger lineage:

- 1 Human + 9 NPC.
- Full standard 32 rounds.
- Human is a founder.
- No founder draw.

This document does not alter those rules. It only defines how guidance is presented.

## 2. Entry point

Landing keeps the dedicated `HƯỚNG DẪN` menu item.

Selecting it starts a Tutorial session through the same authoritative room/game transport used by normal play. The client may create a room with the single local Human and immediately request start; current server behavior already fills the missing 9 founders with NPCs when one Human starts, so no tutorial-specific server flag is required for OI-004.

If local display name is not yet available, request it before creating the Tutorial room. This is identity input only, not a gameplay step.

## 3. Guidance model

Tutorial guidance is contextual and progressive, not a separate blocking slide deck.

Use three presentation levels:

1. **First-entry coach card** — compact explanation shown the first time a major surface becomes relevant.
2. **Spotlight hint** — visually points to the relevant control/region without changing server state or pausing authoritative timers.
3. **Help recap** — optional non-blocking list of already unlocked guidance, reopened from the Tutorial help affordance.

Guidance must never submit gameplay actions automatically except the technical room create/start used to enter Tutorial.

## 4. Tutorial steps / triggers

### T0 — World orientation

**Trigger:** first authoritative game state after Tutorial starts.  
**Explain:** Round/Year, Population, Inflation, Public Debt, World Event, Turn Track, map navigation, Residence, Government, Niên sử.  
**Primary CTA:** `BẮT ĐẦU`.

This is the only introductory card allowed before normal phase guidance begins.

### T1 — Mandatory

**Trigger:** first local `mandatory` phase.  
**Explain:** obligations are automatic; panel is presentation-only; no skip; show breakdown/liquidation/bankruptcy when present.  
**Interaction:** no extra Tutorial CTA may skip or advance Mandatory.

### T2 — Status

**Trigger:** first local `status` phase where the Human is eligible to choose.  
**Explain:** current Status, fee, access unlocks, next-round activation, 15s authoritative timer.  
**Spotlight:** Status cards only.

If the current Character does not receive a Status decision (for example non-representative spouse), skip this guidance until a valid Status phase occurs.

### T3 — Voluntary

**Trigger:** first local `voluntary` phase.  
**Explain:** shared 60s timer; switching Market/Recovery/Support/Birth panels does not reset or pause it; End Turn finishes immediately.  
**Spotlight:** Voluntary control cluster + timer.

### T4 — Market

**Trigger:** first open of Market during Tutorial.  
**Explain:** six abstract Resources; Renewable/Nonrenewable; Status access; live pool; transaction summary.  
**Do not:** rename resources into commodities or imply guaranteed returns.

### T5 — Recovery

**Trigger:** first open of Recovery.  
**Explain:** Renewable only; cost/pool/pending-next-round; no ownership requirement.

### T6 — Support

**Trigger:** first open of Support.  
**Explain:** voluntary support is direct parent/child only; show already-processed mandatory support separately when applicable.

If there is no eligible family target, show the explanation and an empty state; do not fabricate a target.

### T7 — Birth

**Trigger:** first time Birth becomes available and the panel is opened.  
**Explain:** representative proposes per child; later spouse can accept/reject; unresolved later-spouse response follows the authoritative default-accept rule.  
**Do not show before eligible gameplay state.**

### T8 — Marriage

**Trigger:** first visible incoming/outgoing marriage interaction in Tutorial.  
**Explain:** social action may occur outside own turn; pending notice persists; accepted marriage executes at end of accepted round; accepted proposal cannot be Reject/Cancel.  
**Spotlight:** invitation notice / response controls only when authoritative state exposes them.

### T9 — Waiting Queue / reincarnation

**Trigger:** Human enters Waiting Queue.  
**Explain:** queue position, no action controls, reincarnation path when assigned a future newborn.  
**Do not:** promise an exact waiting duration.

### T10 — Round transition / Niên sử

**Trigger:** first round transition.  
**Explain:** world snapshot (Year/Round/Population/Inflation/Event) and where to review journey/world history in Niên sử.

### T11 — End Report

**Trigger:** Tutorial reaches game end.  
**Explain:** winner/ranking/average score, Journey/World tabs, Replay behavior when available.  
Tutorial completion is recorded locally only after this end report is reached.

## 5. Timing and non-blocking rules

- Server `phaseDeadlineAt` / authoritative state always wins over Tutorial UI.
- Tutorial overlays must not pause, extend, reset, or replace Mandatory/Status/Voluntary timers.
- During timed phases, coach cards are compact side/bottom overlays; never full-screen blockers.
- A player may dismiss a coach card immediately with `ĐÃ HIỂU` or close icon, except Mandatory itself remains non-skippable.
- Dismissing guidance never triggers a gameplay action.
- If a phase changes while a coach card is open, close that card automatically and continue from the new authoritative state.
- If disconnect/reconnect changes the Human to Waiting Queue under normal rules, Tutorial guidance follows the new state; it must not attempt to reclaim the old Character.

## 6. Seen / unseen state

Store Tutorial presentation progress client-side; no server flag is required.

Recommended client state:

- `tutorial.active: boolean`
- `tutorial.version: 1`
- `tutorial.seenSteps: Set<TutorialStepId>`
- `tutorial.completed: boolean`

Persistence may use local storage keyed by Tutorial version. This state controls guidance presentation only and must never be treated as authoritative gameplay state.

When the Tutorial spec materially changes, increment `tutorial.version` so new guidance can be shown again without corrupting old progress.

## 7. Reopening help

While `tutorial.active`, expose a small `? HƯỚNG DẪN` affordance near Settings/HUD.

It opens a non-modal recap containing only guidance already unlocked by authoritative gameplay state. It may be opened during Voluntary but does not pause the timer.

Outside Tutorial, the normal Landing `HƯỚNG DẪN` entry remains available; no permanent in-game tutorial overlay is required for normal rooms.

## 8. Visual behavior

Follow the locked project art direction:

- parchment/wood/dark fantasy pixel-frame treatment;
- short headings and 1–3 concise sentences per coach card;
- use real UI icons/controls, not emoji as primary icons;
- spotlight may dim surrounding UI slightly but must leave world/phase context readable;
- desktop: anchored coach card beside target;
- mobile: compact bottom sheet, never taller than needed to obscure the active control.

## 9. Empty/error states

- If a target feature is unavailable, do not show its action tutorial early.
- If the client lacks required authoritative data for a step, omit the step rather than guessing.
- Network/action errors use normal client error feedback; Tutorial may add a plain-language explanation but cannot reinterpret server errors.
- Reconnect resumes from current authoritative state; already-seen presentation state may remain local.

## 10. Server dependency assessment

**No new server tutorial flag is required for OI-004 UI implementation.**

Current transport already supports the required Tutorial baseline by creating a room with one Human and starting it: server start behavior fills the missing founders to the initial population target with NPCs, and founder draw only occurs when connected Humans exceed 10.

A future dedicated server `tutorialMode` may be added only if Project Control later requires isolation/analytics/special room policy. It is not part of this spec and must not be inferred by Chat 06.

## 11. Acceptance criteria for Chat 06

Client implementation is conformant when:

- Landing `HƯỚNG DẪN` launches the 1-Human Tutorial flow using current transport.
- Guidance appears only from authoritative state/feature availability.
- Tutorial never pauses or changes server timers.
- Mandatory cannot be skipped by Tutorial UI.
- All major surfaces T0–T11 have first-use guidance or valid state-based deferral.
- Seen/completed state is local-only and versioned.
- Help recap is non-blocking.
- Normal multiplayer rooms receive no Tutorial overlays unless explicitly entered through Tutorial.
- No gameplay constant, rule, protocol event, or server state shape is changed solely for OI-004.
