# UI LOBBY — APPROVED V1

Status: USER-APPROVED DESIGN
Date: 2026-09-07
Owner: 05 — UI/UX & ART

This document is the authoritative design source for Lobby V1. It supersedes conflicting visual/layout assumptions from the frozen V5–V10.1 prototypes, older Migration Pack-normalized UI presentation, and current client styling. It does not change gameplay, protocol, room capacity, Founder rules, timers, or server authority.

## 1. Design concept

Selected concept: **LBA — Đại sảnh tập hợp**.

Lobby should feel like a social multiplayer gathering before a society is formed: lively and welcoming, with Kahoot-like energy but an original pixel-fantasy presentation.

Background: pixel-art interior of a fantasy gathering hall / guild-hall-like space. The environment frames the roster rather than competing with it.

## 2. Desktop composition

Primary vertical structure:

1. Invitation header.
2. Human participant roster as the visual center.
3. Bottom society/start strip.

The roster occupies most usable height. Header and bottom strip remain stable while only the roster region scrolls when needed.

### Invitation header

- Large room PIN on the **left**.
- QR on the **right**.
- PIN is visually primary; QR is secondary.
- Explicit actions: `SAO CHÉP MÃ` and `SAO CHÉP LIÊN KẾT`.
- QR is visible in a compact size by default and can expand on hover/click for easier scanning.
- Connection state for the local client may remain peripheral; player-specific connection state is handled on participant items.

## 3. Human roster

- Lobby roster contains **Human players only**. NPC autofill is summarized in society-start information and does not create NPC roster cards.
- Roster uses a responsive portrait grid of approximately **5–7 columns depending on desktop width**.
- Grid density adapts to available width/height and player count rather than using a fixed 10-slot Founder layout.
- Only the roster scrolls when the participant set exceeds available vertical space.

### Participant item

Each Human item contains:

- a **circular/oval pixel-art portrait**;
- nameplate **below the portrait**;
- a distinct Human accent color used subtly on portrait border/nameplate only;
- a small connection-status dot;
- text status only when a connection problem needs explanation;
- Host indicated by a fantasy seal/icon rather than technical `HOST/CHỦ PHÒNG` text dominating the card;
- local player indicated explicitly with `BẠN`.

Lobby portraits are **temporary Lobby-only identity visuals**. They are not gameplay Characters and disappear when the game starts / Character presentation takes over.

## 4. Society/start strip

Use a two-part bottom strip:

- **Left:** compact society-start summary.
- **Right:** Host Start action or non-host waiting/status card.

Examples of left-side summary semantics:

- `<10 Humans`: show current Human count and how many NPCs server will add at start.
- `=10 Humans`: communicate that all 10 Humans form the initial Founder group.
- `>10 Humans`: communicate that 10 Founders will be selected and the remaining Humans enter Waiting Queue.

Avoid a large technical `XÃ HỘI KHỞI ĐẦU` side panel.

### Host / non-host behavior

- Host sees the real `BẮT ĐẦU` action.
- Non-host does **not** see a disabled Start button.
- The same visual region becomes a waiting/status card such as `ĐANG CHỜ CHỦ PHÒNG BẮT ĐẦU…` so layout remains stable.

No Ready mechanic and no manual NPC controls are added.

## 5. Founder reveal

Founder Draw remains authoritative on the server. Client motion only presents the result.

For `>10 Humans`:

1. Start is accepted and authoritative Founder result exists.
2. Roster background/items may dim lightly.
3. The 10 selected Founders receive their reveal **very quickly / almost simultaneously**, rather than a slow sequential ceremony.
4. A large Founder seal briefly overlays each selected portrait.
5. The large seal then shrinks into a compact Founder marker on the participant item.
6. Non-founders are informed of their authoritative Waiting Queue position.
7. Show the transition phrase: **`XÃ HỘI ĐÃ ĐƯỢC THÀNH LẬP`**.
8. Transition into the World Map/game shell.

The reveal must remain short, non-blocking, and must not introduce client-side randomization or alter server timing/authority.

## 6. Visual language

Use the project-wide confirmed direction:

- pixel art;
- Japanese anime/chibi treatment where human imagery is used;
- bright/lively scene with darker wood/parchment/fantasy UI chrome;
- softer pixel-frame geometry rather than excessively rigid square boxes;
- real pixel icons rather than emoji;
- nearest-neighbor/integer-friendly rendering;
- animation should be restrained and responsive.

Avoid the current baseline's technical row-list appearance, full-row rotating tone backgrounds, heavy `HUMAN/ONLINE/OFFLINE` labels, and dashboard-like split panels.

## 7. Responsive / compact presentation

Mobile/compact does not preserve the desktop 3-zone geometry by simple shrinking.

Required behavior:

- invitation header becomes a compact stacked/top block;
- room PIN remains easy to read and copy;
- compact QR can expand when requested;
- roster becomes the main scrollable area with fewer columns based on width;
- participant portrait/name semantics remain the same;
- society/start strip becomes a compact bottom block/sheet with the same Host vs non-host semantics;
- no gameplay or authority changes.

Exact pixel spacing and column breakpoints may be adjusted by Chat 06 for responsive fit, provided the approved hierarchy and behavior above remain intact.

## 8. Implementation latitude

Chat 06 may tune non-semantic implementation details such as exact gaps, padding, breakpoint values, portrait pixel dimensions, and ornament density to achieve good responsive fit. These adjustments must not change:

- PIN-left / QR-right desktop hierarchy;
- Human-only roster;
- oval/circular portrait + nameplate below;
- subtle per-Human accent use;
- 5–7-column responsive desktop intent;
- roster-only scrolling;
- compact expandable QR;
- two-part society/start strip;
- Host Start vs non-host waiting card;
- fast/almost-simultaneous Founder reveal;
- large seal → compact marker behavior;
- Waiting Queue position communication;
- transition phrase;
- gameplay/protocol/server authority.

## 9. Approval state

Lobby V1 is **user-approved** and may now be handed to Chat 06 for implementation.

Room / World shell and HUD are still unapproved and must go through `UI_DESIGN_APPROVAL_WORKFLOW_V2` independently before redesign implementation.
