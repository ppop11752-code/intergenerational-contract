# Client

Canonical client implementation lives under this directory.

## Architecture authorization

By explicit user decision on 2026-09-06 (Decision Log D-051), there is no prior canonical client source to preserve. Chat 06 — CLIENT IMPLEMENTATION is authorized to establish a new canonical client implementation here from:

- locked UI/UX specifications in `docs/`;
- authoritative multiplayer/server protocol in `server/backend/`;
- current Project baseline and Rule Ledger.

This authorization does not permit gameplay-rule changes or protocol invention solely for client convenience.

OI-004 Tutorial implementation should follow `docs/UI_TUTORIAL_SPEC.md` and remain authoritative-state-driven and non-blocking.
