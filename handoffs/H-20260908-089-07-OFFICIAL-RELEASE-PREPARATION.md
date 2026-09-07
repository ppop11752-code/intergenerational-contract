handoff_id: H-20260908-089-07-OFFICIAL-RELEASE-PREPARATION
from: 00
to: 07
status: OPEN
title: Prepare and verify official release after maintenance cleanup

## Context
Project status is PASS WITH WARNINGS — RELEASE READY. OI-001 through OI-007 are CLOSED / VERIFIED. The two non-blocking maintenance items explicitly tracked before release are now DONE:
- H-20260908-087-02-LEGACY-VITEST-MAINTENANCE
- H-20260908-088-07-QA-FIXTURE-MAINTENANCE

Because both maintenance tasks changed canonical `main` after H085, official release should be cut only from a freshly verified current head.

## Required work
1. Resolve the current canonical `main` head after H087/H088.
2. Re-run the final project release gate (same or stronger scope than H085) on that exact head.
3. Confirm production Render is live on the exact assessed head before final browser/runtime acceptance completes.
4. Verify:
   - backend release/regression gate;
   - maintained legacy Vitest gate;
   - clean Client build/test;
   - production health;
   - critical two-Human multiplayer create/join/start/get-state;
   - disconnect/reconnect authoritative continuity;
   - Approved UI V1 desktop/mobile critical paths;
   - Mandatory 5s no-countdown semantics;
   - Residence/HUD/Turn Track/QR;
   - World Event direct banner + Chronicle focus + Marriage visible-disabled behavior;
   - updated Approved UI V1 fixture.
5. Produce final release notes/checklist and identify the exact commit SHA that is safe to tag.
6. If no canonical release version/tag name already exists in current project docs, do not invent one; return to Chat 00/user for the version/tag decision.
7. If GitHub release/tag creation is supported in the available environment and a canonical version is already locked, create it only after all gates PASS. Otherwise provide the exact tag/release command or UI action needed, with the verified SHA.

## Constraints
- No gameplay/UI/protocol changes.
- Do not weaken tests to make the release pass.
- Any failure on the current head must be treated as a release blocker until classified and resolved.

## Expected completion
Update `reports/07_CURRENT.md`, mark this handoff DONE/PASS or BLOCKED, and hand back to Chat 00 with:
- final verified release SHA;
- release verdict;
- release notes/checklist;
- whether a version/tag name still needs user decision;
- whether GitHub release/tag was actually created or still requires the user/manual action.
