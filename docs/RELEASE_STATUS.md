# RELEASE STATUS — CURRENT

## Overall

**v1.0.0 — OFFICIALLY PUBLISHED.**

The Project passed the final release gate and the official `v1.0.0` GitHub Release has been published from the exact verified release commit.

- Official tag: `v1.0.0`
- Verified release commit: `e959cdd25a05e2f61345295b505ef6ee5c8e3dc2`
- GitHub Release ID: `384310137`
- Release name: `Intergenerational Contract v1.0.0`
- Public release: yes
- Prerelease: no
- Published at: `2026-09-07T20:46:00Z`
- Release URL: `https://github.com/ppop11752-code/intergenerational-contract/releases/tag/v1.0.0`

The annotated tag dereferences to the exact verified commit above. No later documentation/workflow commit was tagged.

Canonical backend path: `server/backend/`
Canonical client path: `client/`
Live same-origin service: `https://intergenerational-contract.onrender.com`

## Official release verification

Pre-publication release preparation:

- `H-20260908-089-07-OFFICIAL-RELEASE-PREPARATION`: DONE / PASS.
- Final Project Release Assessment workflow run: `34160089361`.
- Job: `101859847687`.
- Conclusion: **SUCCESS**.
- Artifact: `10032335865`.
- Digest: `sha256:b93b3e7c5f2143844455979c466486dcaa73b3dbbdf2482f33ec11206eee846d`.
- Production deploy `dep-dafi0rfavr4c73c63d5g` was live on the exact verified release commit before final browser/runtime acceptance completed.

Publication verification:

- `H-20260908-091-07-PUBLISH-V1.0.0`: DONE / PASS.
- Publication workflow: `Publish v1.0.0`.
- Run: `34160631305`.
- Conclusion: **SUCCESS**.
- Publication evidence artifact: `10032466875`.
- Digest: `sha256:3d8b0383aa7ac20723777fd5718b05c0dc0846c314b171734723cf6365184a5d`.
- Annotated tag object: `8c65c1473172969ae7b1bdb57a9f2125520af507`.

Verified publication constraints:

- `v1.0.0` did not exist before publication.
- Tag `v1.0.0` points to `e959cdd25a05e2f61345295b505ef6ee5c8e3dc2`.
- GitHub Release exists and is public.
- Release is not marked prerelease.
- No gameplay/UI/protocol behavior changed during publication.

## Product / runtime status

No known blocking product/runtime defect remains in the agreed `v1.0.0` release scope.

Verified layers include:

- backend `release:check`: PASS;
- clean Client build/test: PASS;
- production `/health`: PASS;
- two-Human create/join/start/get-state multiplayer smoke: PASS;
- disconnect/reconnect and authoritative state continuity: PASS;
- Approved UI V1 desktop/mobile compatibility: PASS;
- Residence marker navigation, Turn Track and HUD interaction: PASS;
- Mandatory 5-second presentation semantics: PASS;
- Lobby QR same-origin/deep-link/privacy behavior: PASS;
- World Event direct-banner + Chronicle focus + Marriage affordance + mobile acceptance: PASS.

## Open Issue status

- OI-001 marriage proposal lifecycle: CLOSED / VERIFIED.
- OI-002 inflation scarcity combined formula: CLOSED / VERIFIED.
- OI-003 socket event helper contract: CLOSED / VERIFIED.
- OI-004 Tutorial guidance: CLOSED / RELEASE QA VERIFIED.
- OI-005 Render/GitHub server-tree mismatch: CLOSED / VERIFIED.
- OI-006 dependency-backed live server runtime: CLOSED / RELEASE QA VERIFIED.
- OI-007 Residence identity/lifecycle: CLOSED / VERIFIED.

No blocking Open Issue remains in OI-001 through OI-007.

## Approved UI V1 status

Full-game design/source coverage is complete. H078 independent re-audit resolved the earlier H044 missing-coverage finding. The World Event presentation drift and Marriage affordance warning were corrected under H079–H084 and verified in production under H080 with 24/24 PASS.

## Mandatory 5-second presentation — VERIFIED END-TO-END

D-052 locks Mandatory presentation at 5 seconds. Server default, production environment and Client behavior are aligned. Mandatory is automatic, has no manual skip/confirm, no visible countdown/progress, and is not a player decision timer.

## Residence identity/lifecycle — CLOSED / VERIFIED

D-053 is fully implemented across engine, server contract and Client, with independent Chat 08 audit PASS. Economic Household remains distinct from Residence; coordinates are presentation-only; no property ownership, sale, house inheritance, Residence reuse or gameplay-distance mechanic is introduced; reclaimed Residence remains history-addressable but inactive for current navigation.

## Maintenance status

The previously recorded release warnings have been substantially cleaned before official publication:

- H087 updated all 10 legacy Vitest files; legacy Vitest now passes 30/30 and is included in `release:check`.
- H088 updated `qa/approved-ui-v1-fixture.mjs` to current post-H079 World Event behavior; fixture and Approved UI V1 E2E both PASS.

Remaining historical/stale prose in old specialist reports is archival documentation context only and does not override canonical current documents or DONE handoffs.

## Final claim

As of H-20260908-091, the Project is officially classified:

**INTERGENERATIONAL CONTRACT v1.0.0 — OFFICIALLY PUBLISHED**

No corrective specialist product handoff is required for the published v1.0.0 release unless a new post-release issue is reported.
