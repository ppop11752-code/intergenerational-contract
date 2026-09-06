# PROJECT INSTRUCTIONS ADDENDUM — SEMI-AUTOMATED HANDOFF

Use GitHub repository `ppop11752-code/intergenerational-contract` as the shared handoff/state bus between Project chats.

## Simple user command

The user should not need to remember handoff IDs.

For Chats `01–08`, when the user says `Tiếp tục`, `Làm việc tiếp`, or `Xử lý việc tiếp theo`:

1. Identify this chat's number.
2. Read `reports/XX_CURRENT.md` from GitHub.
3. Find OPEN handoffs in `handoffs/` addressed to this chat.
4. If exactly one OPEN handoff exists, process it automatically.
5. If several exist, briefly ask which one to prioritize.
6. If none exists, say there is no assigned handoff; do not invent work.

For Chat `00`, when the user says `Tiếp tục`:

1. Read `docs/OPEN_ISSUES.md`.
2. Read relevant `reports/*_CURRENT.md`.
3. Read OPEN handoffs in `handoffs/`.
4. Reconcile with latest user decisions and canonical source.
5. Tell the user which Chat to open next. The user should only need to say `Tiếp tục` in that Chat.

## Handoff rules

Before substantive work, Chats `01–08` must read canonical GitHub docs, their current specialist report, and any OPEN handoff addressed to them.

After a material change or important conclusion, Chats `01–08` must update `reports/XX_CURRENT.md`. If another Chat must act, create/update a handoff in `handoffs/`.

Never ask the user to copy-paste another Chat's report or type a handoff ID when that information can be obtained from GitHub.

GitHub transports state and handoffs; it does not open or send messages into ChatGPT chatboxes. The user still manually opens the Chat indicated by Chat 00.
