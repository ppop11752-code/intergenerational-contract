# 04 — DEPLOYMENT & DEVOPS — CURRENT REPORT

### Status
Bị chặn khi hoàn tất `H-20260907-049-04-MANDATORY-5S-DEPLOY`; production config đã được đặt 5.000 ms nhưng deploy API của Render chưa hoàn tất.

### Changed
- Set Render service environment variable `MANDATORY_PRESENTATION_MS=5000` using merge semantics (`replace=false`), preserving all unrelated production variables.
- Render accepted the environment update and automatically requested a deploy to apply it.
- No gameplay, protocol, client timing workaround, or source semantics were changed by Chat 04.

### Source
- `docs/RULE_LEDGER.md`.
- `docs/DECISION_LOG.md` D-052.
- Handoff `H-20260907-049-04-MANDATORY-5S-DEPLOY`.
- Dependency handoff `H-20260907-048-03-MANDATORY-5S-SERVER`.
- Render service `srv-daem578u01pc73f35dbg`.

### Impact
Render production configuration is now explicitly pinned to 5.000 ms for Mandatory presentation once the requested environment deploy successfully reaches runtime. This avoids relying on an old server default and preserves server-side timing authority.

### Verified
- Render environment update API accepted `MANDATORY_PRESENTATION_MS=5000` and requested a deploy.
- Deploy created for the environment update: `dep-daf74gucveuc73f9qlm0`, trigger `api`.
- Existing commit deploy `dep-daf748favr4c73bp7h7g` reached LIVE and server logged `Intergenerational Contract server listening on :3001`; service remained healthy before the environment-deploy attempt.
- Render build logs for the env deploy show repository clone started, but the deploy has not reached runtime yet.
- A preceding Render clone attempt in the same deployment sequence logged a transient GitHub connectivity failure (`Failed to connect to github.com port 443`) and retried successfully for the commit deploy.

### Unverified
- `dep-daf74gucveuc73f9qlm0` has not yet reached LIVE, so effective runtime use of the new 5.000 ms environment value is not yet independently verified.
- Live Mandatory phase duration has not yet been measured by Chat 07.
- `H-20260907-048-03-MANDATORY-5S-SERVER` is still OPEN in GitHub and current server source still falls back to `7_000` when `MANDATORY_PRESENTATION_MS` is absent; Chat 03 still owns changing the authoritative source default to 5.000 ms and deterministic server coverage.

### Handoff
- Chat 04 must retry/check `dep-daf74gucveuc73f9qlm0` and verify LIVE/runtime after Render/GitHub clone connectivity recovers.
- Chat 03 must complete `H-20260907-048-03-MANDATORY-5S-SERVER` so source default matches D-052.
- Only after both are satisfied should Chat 07 receive live verification for the 5-second Mandatory phase.

### Open Issues
- H-049 remains blocked on Render env-deploy completion.
- H-048 remains an upstream source-default dependency owned by Chat 03.
