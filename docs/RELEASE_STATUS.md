# RELEASE STATUS — CURRENT

## Overall

**Release-ready at the current QA scope.** OI-001 through OI-006 are closed/verified, canonical backend and client are deployed together, live browser/server E2E has passed, and no blocking Open Issue remains.

This status does not erase non-blocking maintenance debt or long-term balance/usability playtesting needs.

## Closed / verified

- OI-001 marriage proposal lifecycle: CLOSED / independently verified.
- OI-002 inflation scarcity combined formula: CLOSED / independently verified.
- OI-003 protocol helper drift (`game:replay`): CLOSED / verified.
- OI-004 dedicated Tutorial guidance: CLOSED / release QA verified.
- OI-005 deployment source-tree mismatch: CLOSED / source-tree verified.
- OI-006 dependency-backed live server runtime: CLOSED / release QA verified.
- Canonical backend source migration into GitHub: COMPLETE / verified against audited artifact.
- Canonical client source/deployment integration: COMPLETE / verified at live browser/server E2E level.

Canonical backend path:

`server/backend/`

Canonical client path:

`client/`

Live same-origin service:

`https://intergenerational-contract.onrender.com`

## Final OI-004 browser E2E evidence

- workflow: `Live Client E2E`
- run ID: `34039901844`
- head SHA: `8facc98a38b654a30cad24aaf13667c78a529705`
- artifact ID: `9991351341`
- digest: `sha256:172d1160e32cf08e99109343c0eea66764a2d41e1e44c030b01243420e01cbf2`

PASS evidence includes:

- live page load;
- same-origin Socket.IO connection;
- Tutorial room entry with T0 visible;
- help recap non-blocking while authoritative countdown continued;
- authoritative Birth UI gating in live unavailable state;
- normal multiplayer receives no Tutorial overlay.

Deterministic client/server regression separately covers Birth eligibility false/true behavior and Tutorial trigger logic, so no artificial live state mutation or forced 32-round browser session is required for current release closure.

## Remaining non-blocking items

- Legacy Vitest `.test.ts` expectations from pre-OI-001 behavior should be updated/replaced/archived.
- Long-term balance and usability playtesting may continue after release readiness.
- A full 32-round manual browser playthrough can be retained as optional soak/playtest evidence, not a release blocker under the current policy.

## Release claim rule

The current repository/runtime may be called release-ready only while subsequent runtime-affecting changes continue to pass the corresponding build, regression, deployment and integration gates. Any material gameplay/protocol/client/server change after this status must be revalidated before preserving the claim.
