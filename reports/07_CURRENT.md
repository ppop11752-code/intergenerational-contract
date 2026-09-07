# 07 — RELEASE & QA — CURRENT REPORT

## AI SPECIALIST REPORT

### Status

Hoàn thành — `H-20260908-089-07-OFFICIAL-RELEASE-PREPARATION` = **DONE / PASS — OFFICIAL RELEASE CANDIDATE VERIFIED**.

### Changed

- Strengthened `.github/workflows/final-project-release-assessment.yml` so the final release gate now explicitly runs maintained `qa/approved-ui-v1-fixture.mjs` from H088.
- Final verified release candidate SHA: `e959cdd25a05e2f61345295b505ef6ee5c8e3dc2`.
- Final workflow `Final Project Release Assessment` run `34160089361`, job `101859847687`: **SUCCESS**.
- Artifact `10032335865`, digest `sha256:b93b3e7c5f2143844455979c466486dcaa73b3dbbdf2482f33ec11206eee846d`.
- Render deploy `dep-dafi0rfavr4c73c63d5g` reached `live` on the exact assessed SHA before final browser/runtime acceptance completed.
- H089 closed with final release checklist, release notes and tag instructions.

### Source

- `handoffs/H-20260908-089-07-OFFICIAL-RELEASE-PREPARATION.md`
- `handoffs/H-20260908-087-02-LEGACY-VITEST-MAINTENANCE.md`
- `handoffs/H-20260908-088-07-QA-FIXTURE-MAINTENANCE.md`
- `docs/RELEASE_STATUS.md`
- `.github/workflows/final-project-release-assessment.yml`
- `qa/final-release-multiplayer-smoke.mjs`
- `qa/approved-ui-v1-live-smoke.mjs`
- `qa/approved-ui-v1-fixture.mjs`
- `qa/world-event-approved-ui-qa.mjs`

### Impact

Release candidate is freshly verified after H087/H088 maintenance cleanup. H089 changed QA/release harness only; no gameplay, UI design, protocol or runtime behavior changed. Exact SHA safe to tag is pinned independently of later report/handoff documentation commits.

### Verified

- Backend `npm run release:check`: PASS.
- Maintained legacy Vitest remains inside `release:check`; H087 verified 10 files / 30 tests and current release gate remains green.
- Clean Client build/test: PASS.
- Production health: PASS.
- Two-Human create/join/start/get-state: PASS.
- Disconnect/reconnect authoritative continuity: PASS.
- Approved UI V1 desktop/mobile critical paths: PASS.
- Mandatory 5-second/no-visible-countdown semantics: PASS.
- Residence / HUD / Turn Track / QR: PASS.
- Maintained H088 Approved UI V1 authoritative fixture: PASS.
- H080 retained World Event direct banner / exact Chronicle focus / Marriage visible-disabled / mobile acceptance: PASS.
- Render exact assessed SHA was live before final live acceptance finished.
- OI-001 through OI-007 remain CLOSED / VERIFIED.

### Unverified

- Official version/tag name is not locked in canonical project docs.
- GitHub tag/release has not been created because no canonical version name exists and current GitHub connector surface does not expose release/tag creation in this chat.

### Handoff

Chat 00/user must choose the official version/tag name and publish a GitHub tag/release from exact verified SHA:
`e959cdd25a05e2f61345295b505ef6ee5c8e3dc2`.

### Open Issues

No known blocking product/runtime issue remains in current release scope.

Pending release administration only:
- choose canonical version/tag name;
- create tag on exact verified SHA;
- create GitHub Release using H089 release notes.

Completed:
- `H-20260908-089-07-OFFICIAL-RELEASE-PREPARATION`: DONE / PASS.
- `H-20260908-088-07-QA-FIXTURE-MAINTENANCE`: DONE / PASS.
- `H-20260908-087-02-LEGACY-VITEST-MAINTENANCE`: DONE.
- `H-20260908-085-07-FINAL-PROJECT-RELEASE-ASSESSMENT`: DONE / PASS WITH WARNINGS — RELEASE READY.
- OI-001–OI-007: CLOSED / VERIFIED.
