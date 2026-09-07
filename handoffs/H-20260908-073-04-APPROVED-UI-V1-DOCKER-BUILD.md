handoff_id: H-20260908-073-04-APPROVED-UI-V1-DOCKER-BUILD
from: 07
to: 04
status: DONE
title: Fix production Docker client build for Approved UI V1

## Context

During independent H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA, backend release regressions and the clean client suite passed on main, but Render production could not deploy the Approved UI V1 integration because the Docker client build failed TypeScript compilation.

## Root cause

The Approved UI source iterates/spreads DOM `NodeList` collections, while `client/tsconfig.json` included `DOM` but not `DOM.Iterable`. Render therefore emitted TS2488 errors and cascading TS2347/TS7006 errors.

Docker also invoked a detached compiler through `npx --yes -p typescript@5.7.2` instead of using a toolchain declared by the client package, leaving production build parity fragile.

## Result

DONE in Chat 04 scope.

- Added `DOM.Iterable` without weakening `strict` type checks.
- Declared `typescript@5.7.2` in `client/package.json`.
- Docker client-build now copies `client/package.json`, installs the client toolchain, and executes `npm run build`.
- Added Docker/client build config paths to the `Approved UI V1 E2E` trigger so future parity changes rerun the gate.
- No gameplay, protocol, authoritative value, or Approved UI semantic/design change was made.

## Deployment evidence

- DOM iterable fix: `5326273bef78bb8022e327540556f1cce7396233` → Render `dep-daff9qh5efls73aq43sg` → LIVE.
- Toolchain declaration: `85e153fd8b975be0b003cfb8ae87cd963c9cb59a`.
- Docker parity fix: `7f23347a1ba1b39ca5aa752e2926665894e31190` → Render `dep-daff9roou94c73a6vogg` → LIVE.
- CI gate update: `1ebeb2e3e6eee6c45d2c37177b2c8b030e4186d3` → Render `dep-daffavrbc2fs73d77t5g` → LIVE.

## Verification

Workflow `Approved UI V1 E2E`, run `34148123375`:
- backend `release:check`: PASS;
- clean client suite: 64/64 PASS;
- live Approved UI deployment smoke reached and passed the required H073 runtime proof before a later interaction assertion: desktop `.landing-screen.approved-landing` loaded, landing controls existed, Tutorial entry succeeded, world map loaded, no raw ID/Persona leak was detected, and Residence markers existed.
- artifact `10028424942`, digest `sha256:6ad572e1e3194ca6afc7660d7daef55acf90980b2510a2b54d1efa9ba77440a2`.

The broader browser workflow later failed because a Residence marker click was intercepted by Turn Track/HUD. That finding occurs after Approved UI is successfully built and served, so it is not a remaining H073 deployment blocker. It must be classified by Chat 07 under H067 and routed to the appropriate UI/client owner if reproducible as a product defect.

## Next

Return `H-20260907-067-07-APPROVED-UI-V1-CLIENT-QA` to Chat 07 for independent live desktop/mobile and interaction QA.

## Result commit/ref

- Primary build fix: `7f23347a1ba1b39ca5aa752e2926665894e31190`.
- Current production head verified LIVE: `1ebeb2e3e6eee6c45d2c37177b2c8b030e4186d3`.
- Report update: `546b39f2e187250c2f9f5747ebd2745ff2b9f71e`.
