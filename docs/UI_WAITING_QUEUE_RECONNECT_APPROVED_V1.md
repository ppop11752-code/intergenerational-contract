# UI WAITING QUEUE / RECONNECT — APPROVED V1

Status: USER-APPROVED
Date: 2026-09-07
Owner: 05 — UI/UX & ART

## Authority

Direct-user-approved UX for Waiting Queue, reconnect, non-founder waiting, late join, Human death → queue, and queue → newborn assignment. Gameplay/protocol/queue ordering remain authoritative server concerns.

## 1. Reconnect from Landing

- Compact reconnect card remains above the Landing menu.
- Primary wording: `KẾT NỐI LẠI PHÒNG ABC123`.
- Supporting text: `NHÂN VẬT CŨ SẼ TIẾP TỤC DO NPC ĐIỀU KHIỂN · BẠN SẼ VÀO CUỐI HÀNG CHỜ`.
- Do not use wording that implies reclaim/resume control of the old Character.

## 2. Successful reconnect transition

After authoritative reconnect succeeds:
- short centered card over the world: `ĐÃ KẾT NỐI LẠI`;
- state clearly that the old Character remains permanently NPC-controlled;
- show authoritative queue position;
- auto-transition into the normal Queue spectator view;
- no confirmation step.

## 3. Waiting Queue spectator state

- World Map stays visible as the primary surface.
- Show a compact panel with `HÀNG CHỜ #N`.
- Player may inspect public world information through approved Residence/Government/Niên sử surfaces.
- No controlled-Character actions.
- No current Home/current-character marker because the queued Human has no active Character.
- Existing world camera/minimap spectator interaction remains available where safe.

## 4. Queue information

Show:
- own authoritative queue position;
- number of Humans ahead.

Do not show by default:
- predicted wait time / ETA;
- guaranteed newborn timing;
- full ordered queue of Human names.

## 5. Old Character after reconnect

The former Human-controlled Character may still be inspected in world/history with a compact label:
`NHÂN VẬT CŨ · NPC ĐIỀU KHIỂN`.

Rules:
- never present as the user's current Character;
- no player actions;
- do not preserve Human-control visual marker after permanent NPC takeover.

## 6. Human death → Queue

- Show a short non-blocking death/result transition using authoritative cause/context where available.
- Then show `BẠN ĐÃ VÀO HÀNG CHỜ #N`.
- Enter the same Queue spectator state used by reconnect/non-founder/late-join paths.
- No long blocking death cinematic.

## 7. Non-founder / late join

Use one shared Queue spectator surface.

Context wording may differ:
- non-founder after draw: preserve Founder Draw context;
- late join: explain that the game has already started and the Human joined the Queue;
- reconnect/death: use their specific reason.

Do not create different queue mechanics or layouts per entry reason.

## 8. Queue → newborn assignment

When server authoritatively assigns a newborn Character:
- short non-blocking reveal: `MỘT CUỘC ĐỜI MỚI BẮT ĐẦU`;
- show assigned Character identity/portrait and parent/current-Residence context where authoritative data exists;
- focus camera on the Character's current authoritative Residence;
- transition into the normal active-player shell.

No long cinematic and no client prediction of who/when will be assigned.

## 9. Mobile

- Same semantic flow.
- Queue information uses compact bottom/sheet treatment over the persistent world.
- Reconnect/death/new-life notices remain brief and non-blocking.

## 10. Implementation constraints

- Queue position and newborn assignment are server-authoritative.
- Disconnect permanently loses control of the old Character.
- Reconnect always means queue-end insertion, not reclaim.
- NPC never enters Waiting Queue.
- No client ETA calculation.
- Spectator information surfaces never pause/reset authoritative timers.

## Approval record

User approved Q1–Q8 = option A on 2026-09-07.