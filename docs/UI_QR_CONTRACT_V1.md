# LOBBY QR UX CONTRACT V1

**Owner:** 05 — UI/UX & ART  
**Status:** LOCKED FOR CLIENT IMPLEMENTATION  
**Scope:** Presentation/navigation only; no gameplay or multiplayer protocol change.

## 1. Canonical payload

Lobby QR encodes a same-origin join deep link:

`<CLIENT_ORIGIN>/?room=<ROOM_CODE>`

Example shape only:

`https://game.example/?room=ABC123`

Rules:
- `CLIENT_ORIGIN` is the actual deployed client origin (`window.location.origin` at runtime).
- `ROOM_CODE` is the authoritative room code already shown as the large Lobby PIN.
- Encode the normalized uppercase room code.
- Do not put playerId, reconnect token, display name, socket identifier, or any private state in the QR payload.

## 2. Scan destination and flow

After scan:

1. Browser opens the normal client Landing screen at `?room=<ROOM_CODE>`.
2. Client reads the `room` query parameter.
3. If it matches the existing room-code input format, prefill the Join Room code field with the normalized uppercase value.
4. Focus should move to Display Name if it is empty; otherwise keep normal Landing focus order.
5. Show a small neutral helper such as `Mã phòng đã được điền từ QR.`
6. Player explicitly presses `THAM GIA` to send the normal existing `room:join` request.

**QR scan must never auto-join a room.** This preserves explicit identity input, normal error feedback, and the existing multiplayer contract.

## 3. Invalid / stale QR

- Invalid `room` query value: ignore it, do not submit anything, and leave the normal Join form usable.
- Valid-looking but stale/nonexistent room: user receives the existing normal `ROOM_NOT_FOUND` feedback after pressing Join.
- A room that has ended or otherwise rejects join uses the existing authoritative server error; QR does not reinterpret it.

## 4. Renderer and load failure

Lobby must always show the large text room PIN independently of QR rendering.

If the QR renderer/library fails, is blocked, or has not loaded:
- keep the room PIN fully visible and selectable/copyable;
- show `Không tạo được mã QR — hãy nhập mã phòng.`;
- do not block Host Start or any Lobby control;
- do not replace the failure with a fake decorative QR image.

If practical, expose `SAO CHÉP LIÊN KẾT` next to the QR using the exact same deep-link payload. Clipboard failure falls back to selectable text and does not block the Lobby.

## 5. QR visual treatment

- QR modules must remain standard high-contrast square modules with a clear quiet zone; pixel-fantasy decoration belongs around the QR, not inside/over the functional modules.
- Recommended rendered size: 192–256 CSS px on desktop; at least 160 CSS px on compact mobile layouts when shown.
- Do not place parchment texture, transparency, fog, iconography, logo, or animated effects over the encoded modules.
- A frame from the locked art package may surround the QR as long as the quiet zone remains intact.
- QR remains secondary to the large room PIN for accessibility and fallback.

## 6. URL cleanup

After the client has consumed a valid `room` parameter for prefill, it may use `history.replaceState` to remove the query from the visible URL **only after** the code is safely present in client form state. This is optional presentation cleanup and must not affect join semantics.

Refreshing before join may therefore either preserve or clear the prefill depending on whether cleanup was applied; both are acceptable as long as no automatic join occurs.

## 7. Security/privacy boundary

The QR is equivalent to displaying the public room PIN. It must contain only the public join URL + room code.

Never encode:
- reconnect token;
- playerId;
- private player snapshot;
- host authority;
- gameplay action;
- authentication/session secrets.

## 8. Acceptance criteria

QR implementation is conformant when:

1. Lobby shows both large room PIN and scannable QR.
2. QR payload is same-origin `?room=<ROOM_CODE>`.
3. Scan opens Landing and prefills Join code.
4. User must explicitly press `THAM GIA`; no auto-join.
5. Renderer failure leaves room PIN/manual join fully usable.
6. No new server event, state field, gameplay rule, or protocol semantic is introduced.
7. Invalid/stale links use normal client/server error handling.
8. QR functional modules are not visually altered by fantasy art treatment.
