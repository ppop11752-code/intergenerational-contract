# CHAT HANDOFF PROTOCOL — SEMI-AUTOMATED

## Goal

Reduce manual copy/paste between Project chats while keeping the user in control of which ChatGPT chatbox is opened.

## Shared transport

GitHub is the authoritative handoff bus between chats.

- Specialist status: `reports/XX_CURRENT.md`
- Cross-chat requests: `handoffs/*.md`
- Canonical project state: `docs/`
- Canonical backend: `server/backend/`

## Zero-ID user command

The user does **not** need to type or remember a handoff ID.

In any specialist Chat `01–08`, the commands below all mean the same thing:

- `Tiếp tục`
- `Làm việc tiếp`
- `Xử lý việc tiếp theo`

When receiving one of these commands, that Chat must:

1. Identify its own chat number.
2. Read its own `reports/XX_CURRENT.md`.
3. Search `handoffs/` for `status: OPEN` addressed to that chat number.
4. If exactly one OPEN handoff exists, process it automatically without asking for the handoff ID.
5. If multiple OPEN handoffs exist, briefly list them and ask the user which one to prioritize.
6. If none exists, inspect relevant `docs/OPEN_ISSUES.md` and report/state, then tell the user there is no assigned handoff rather than inventing work.

In Chat `00`, `Tiếp tục` means: read current Open Issues, specialist reports, and OPEN handoffs, then coordinate the next step automatically.

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
4. Never require the user to provide a handoff ID if the target chat can determine the single OPEN handoff from GitHub.

## Required behavior for Chat 00

Before substantive coordination:

1. Read `docs/OPEN_ISSUES.md`.
2. Read relevant `reports/*_CURRENT.md`.
3. Read OPEN handoffs in `handoffs/`.
4. Reconcile against latest user decisions and canonical source.
5. Tell the user which chat to open next in plain language. The handoff ID may be shown for traceability, but the user does not need to type it.

## Handoff lifecycle

- `status: OPEN` → GitHub Issue may be created automatically when Actions is available.
- Target chat performs the work and updates source/report.
- Target chat changes the handoff file to `status: DONE` or `status: CLOSED` and records the result/commit.
- GitHub Issue may then be closed automatically.

GitHub Issues are navigation/task cards only. The handoff file and canonical repository state remain the source of truth.

## User workflow

Normal flow:

1. Chat 00 says which Chat to open next.
2. User opens that Chat.
3. User only says: `Tiếp tục`.
4. Target Chat reads GitHub and performs the single OPEN handoff addressed to itself.
5. When finished, user returns to Chat 00 and says: `Tiếp tục`.
6. Chat 00 reads GitHub and coordinates the next step without requiring pasted output.

## Limitation

This is semi-automated. GitHub cannot open or send messages into a specific ChatGPT Project chatbox. The user still opens the target chat, but the technical context, handoff, and result transfer happen through GitHub instead of manual copy/paste.
