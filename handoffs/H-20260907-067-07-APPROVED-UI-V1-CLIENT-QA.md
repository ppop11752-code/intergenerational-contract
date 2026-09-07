handoff_id: H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA
from: 06
to: 07
status: OPEN
title: Independent clean/browser QA for completed Approved UI V1 Client integration

## Context

Chat 06 completed the Approved UI V1 implementation and delegated independent Release/QA ownership to Chat 07.

The previous production Docker blocker has now been resolved by Chat 04 under `H-20260908-073-04-APPROVED-UI-V1-DOCKER-BUILD`.

## Previously verified

On workflow `Approved UI V1 E2E`, run `34147167987`:
- backend `release:check`: PASS;
- clean client suite: **64/64 PASS**;
- clean regressions cover authoritative MAX/reason, structured lifecycle results, World Event contract/Chronicle linkage, Residence lifecycle/map contract, no Persona leak, one authoritative timer source, QR contract, no local gameplay timer ownership and idempotent runtime behavior.

## Production blocker resolution

Chat 04 identified missing `DOM.Iterable` in the client TypeScript lib set as the root compile defect and aligned Docker to the declared client TypeScript toolchain.

Deployment evidence:
- `5326273bef78bb8022e327540556f1cce7396233` → `dep-daff9qh5efls73aq43sg` → LIVE;
- `7f23347a1ba1b39ca5aa752e2926665894e31190` → `dep-daff9roou94c73a6vogg` → LIVE;
- current verified production head `1ebeb2e3e6eee6c45d2c37177b2c8b030e4186d3` → `dep-daffavrbc2fs73d77t5g` → LIVE.

Workflow `Approved UI V1 E2E` run `34148123375` confirms:
- backend `release:check`: PASS;
- clean client suite: **64/64 PASS**;
- desktop `.landing-screen.approved-landing`: PASS;
- landing controls: PASS;
- Tutorial entry/world map: PASS;
- no raw ID / Persona leak in observed live world: PASS;
- Residence markers present: PASS.

Evidence artifact: `10028424942`, digest `sha256:6ad572e1e3194ca6afc7660d7daef55acf90980b2510a2b54d1efa9ba77440a2`.

## Current QA finding to classify

The same live smoke later timed out clicking the first Residence marker because `.approved-turn-track` and the Approved HUD intercepted pointer events. This occurred after the Approved UI runtime was proven loaded and is no longer a deployment/build blocker.

Chat 07 must reproduce/classify this finding. If it is a product interaction defect, route to Chat 06; if it reflects a locked layout/design issue, route to Chat 05. Do not treat it as a Chat 04 blocker unless deployment/static/runtime packaging evidence changes.

## Required work

Rerun/finalize live desktop/mobile, world-first navigation, Residence interaction, timer, QR, privacy/label and responsive verification against the now-live Approved UI V1 production head. Close PASS only if the full acceptance set passes; otherwise route each remaining defect by ownership.

## Constraints

No gameplay, protocol or Approved UI rule was changed by Chat 04. Production build/deployment parity is now restored.
