# CHAT HANDOFF PROTOCOL — SEMI-AUTOMATED

## Goal

Reduce manual copy/paste between Project chats while keeping the user in control of which ChatGPT chatbox is opened.

## Shared transport

GitHub is the authoritative handoff bus between chats.

- Specialist status: `reports/XX_CURRENT.md`
- Cross-chat requests: `handoffs/*.md`
- Canonical project state: `docs/`
- Canonical backend: `server/backend/`

## Required behavior for Chat 01–08

Before substantive work:

1. Read the relevant canonical docs from GitHub.
2. Read its own `reports/XX_CURRENT.md`.
3. Search `handoffs/` for OPEN handoffs addressed to its chat number.
4. Read the referenced source/commit before acting.

After a material change or important conclusion:

1. Update `reports/XX_CURRENT.md`.
2. If another chat must act, create a new handoff file from `handoffs/TEMPLATE.md`.
3. Never require the user to paste another chat's report when the report/handoff already exists in GitHub.

## Required behavior for Chat 00

Before substantive coordination:

1. Read `docs/OPEN_ISSUES.md`.
2. Read relevant `reports/*_CURRENT.md`.
3. Read OPEN handoffs in `handoffs/`.
4. Reconcile against latest user decisions and canonical source.
5. Tell the user only which chat to open next and the handoff ID.

## Handoff lifecycle

- `status: OPEN` → GitHub Action creates a GitHub Issue automatically.
- Target chat performs the work and updates source/report.
- Target chat changes the handoff file to `status: DONE` or `status: CLOSED` and records the result/commit.
- GitHub Action closes the corresponding Issue automatically.

GitHub Issues are navigation/task cards only. The handoff file and canonical repository state remain the source of truth.

## User workflow

The user should only need to:

1. Open the chat number indicated by Chat 00.
2. Say: `Xử lý handoff <HANDOFF_ID> trên GitHub.`
3. Return to Chat 00 after the target chat reports completion, or simply ask Chat 00 to continue; Chat 00 must read GitHub rather than requiring pasted output.

## Limitation

This is semi-automated. GitHub cannot open or send messages into a specific ChatGPT Project chatbox. The user still opens the target chat, but the technical context and result transfer happen through GitHub instead of manual copy/paste.
