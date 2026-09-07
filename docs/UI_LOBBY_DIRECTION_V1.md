# UI LOBBY — DIRECTION V1

Status: USER-CONFIRMED DIRECTION / NOT YET FINAL SCREEN APPROVAL
Date: 2026-09-07
Owner: 05 — UI/UX & ART

## Selected direction

User selected **LBA — Đại sảnh tập hợp** as the base Lobby composition.

## Confirmed choices

- **E1 — PIN/QR header:** room PIN on the left, QR on the right.
- **E2 — Participant portrait treatment:** pixel-art portrait is circular/oval; the **nameplate sits below the portrait**.
- **E3 — Lobby background:** pixel-art interior of a fantasy gathering hall / guild-hall-like space rather than a generic flat background or reused Landing landscape.
- **E4 — Founder reveal:** a large Founder seal briefly overlays the selected portrait, then shrinks into a compact corner/status marker.

## Existing confirmed Lobby semantics

- PIN is visually primary; QR is secondary.
- Human-only roster in Lobby; NPCs are not individual roster entries.
- Compact portrait grid rather than row list or large full cards.
- Each Human may have a distinct accent color, used lightly on portrait border/nameplate only.
- Lobby portraits are **temporary Lobby-only visuals** and disappear after the game starts; they are not gameplay Characters.
- Connection state uses a small indicator dot; technical text appears only when something is wrong.
- Host uses a fantasy seal/icon; the local player keeps explicit `BẠN` marking.
- Share actions include `SAO CHÉP MÃ` and `SAO CHÉP LIÊN KẾT`.
- Founder reveal for >10 Humans: reveal 10 selected founders first; non-founders then see their authoritative Waiting Queue position.
- Keep transition text `XÃ HỘI ĐÃ ĐƯỢC THÀNH LẬP`.
- Non-host Start area is a waiting/status card, not a disabled Start button.
- Founder reveal is non-blocking and only presents the authoritative server result.

## Design intent

The Lobby should feel like a social multiplayer gathering before a society is formed, with Kahoot-like energy but an original pixel-fantasy presentation.

The roster is the visual center of the screen. PIN/QR/share controls form a compact invitation header. Society-start information and the Host/Wait action occupy a compact lower control area rather than a large technical side panel.

## Not yet approved

The following still require one final concrete pass before the Lobby can be locked:

- exact desktop spacing and proportion;
- portrait-grid density at low vs high player counts;
- society-start strip composition;
- exact Start/wait card placement and size;
- Founder reveal duration/easing/secondary Waiting Queue reveal treatment;
- mobile/compact layout;
- final typography and frame ornament density.

No handoff to Chat 06 may be created until the user approves the final Lobby V1 composition.
