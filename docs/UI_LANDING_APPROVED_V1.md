# UI LANDING — APPROVED V1

Status: USER-APPROVED DESIGN
Owner: 05 — UI/UX & ART
Scope: Landing screen only

This specification supersedes older Landing prototype layouts where they conflict. It does not change gameplay, protocol, timers or authoritative logic.

## 1. Overall composition

Desktop uses a two-zone composition:
- **Left:** logo + reconnect card + five-item menu.
- **Right:** key art dominated by the settlement/world rather than the characters.
- Recommended proportion: ~36–38% left / ~62–64% right.
- Left content is **left-aligned**.
- Do **not** place a large background panel behind the whole left column; only the menu controls themselves use framed UI treatment.

## 2. Logo and title

- Create a real fantasy contract seal/sigil that combines a **contract-seal motif with lifecycle imagery**.
- Seal appears **above** the wordmark.
- Seal is a secondary brand accent; the wordmark remains the stronger visual element.
- Wordmark:
  - `INTERGENERATIONAL`
  - `CONTRACT`
- **No subtitle.**
- Credit `Một trò chơi của QuacQuaz` is retained at low visual priority and placed at the **bottom-right** of the Landing.

## 3. Menu

Five separate vertical buttons, same core visual style:
1. `TẠO PHÒNG`
2. `THAM GIA PHÒNG`
3. `HƯỚNG DẪN`
4. `LUẬT CHƠI`
5. `CÀI ĐẶT`

Rules:
- All five remain clearly visible as the classic game menu.
- Same family/style and width; hierarchy comes mainly from order, spacing and interaction state, not radically different button shapes.
- Pixel-frame treatment, but avoid excessively rigid/blocky geometry.
- No emoji as primary icons.

## 4. Reconnect state — updated by Waiting Queue/Reconnect V1

When reconnect state exists:
- Show a compact secondary card **above the menu**.
- Primary copy: `KẾT NỐI LẠI PHÒNG ABC123`.
- Supporting copy: `NHÂN VẬT CŨ SẼ TIẾP TỤC DO NPC ĐIỀU KHIỂN · BẠN SẼ VÀO CUỐI HÀNG CHỜ`.
- It is clearly discoverable but does not replace or visually dominate the normal menu.
- Do **not** use `TIẾP TỤC PHÒNG` or any wording that implies reclaim/resume control of the old Character after reconnect.

## 5. Key art

The **world/settlement is the primary subject**.

Composition:
- Background: bright sky, clouds, distant hills/mountains and warm light.
- Midground: settlement, roads, residences, vegetation and clearly readable Government landmark.
- Foreground: **3 Japanese anime/chibi pixel characters**.
- Characters support the world composition and must not cover or overpower the settlement.
- Human/NPC distinction uses both character styling and UI-marker language while keeping one coherent art world.

The environment should feel related to the actual playable World Map, not like unrelated fantasy poster art.

## 6. Art direction

- Pixel art.
- Japanese anime/chibi character treatment.
- World/map side: brighter and more lively.
- UI chrome: darker wood/parchment/fantasy treatment.
- Natural warm palette: fresh greens, blue sky/water, warm sunlight, terracotta/brown roofs, restrained brass/gold UI accents.
- Avoid neon, cyberpunk and overly dark/muddy treatment.
- Render core pixel art with nearest-neighbor / integer-friendly scaling; no blurry smoothing.

## 7. Typography

Three-role typography system remains active:
- fantasy display face for the game title;
- highly readable Vietnamese-capable body/UI face for menu and copy;
- pixel/mono-inspired data face reserved mainly for game data/HUD, not long Landing text.

## 8. Motion

Motion level: **moderate-light**, enough to make the world feel alive without distracting from the menu.

Allowed examples:
- slow cloud drift;
- subtle chimney smoke;
- light grass/leaf motion;
- occasional distant bird movement;
- small character idle animation;
- very subtle seal shimmer/glow;
- pixel button hover/focus feedback.

Do not use automatic camera pan/zoom or dense particle effects.

## 9. Interaction states

- Hover/focus must remain readable with shape/border emphasis, not color alone.
- Button press may shift 1–2 px for tactile pixel-game feedback.
- Reconnect card uses a quieter interaction treatment than the normal menu.
- Existing Create / Join / Tutorial / Rules / Settings semantics remain unchanged.

## 10. Mobile

Do not simply shrink the desktop split layout.
- Logo/title stay at top.
- Key art becomes a cropped hero area.
- Reconnect card appears below hero/title when present and uses the same no-reclaim wording.
- Five menu buttons stack vertically.
- Credit remains at the bottom.
- Same art direction and interactions; no gameplay/protocol changes.

## 11. Approval record

User explicitly approved:
- menu left / key art right;
- seal above wordmark;
- five separate vertical same-style menu buttons;
- key art emphasizes settlement more than characters;
- reconnect card above menu;
- reconnect wording later refined by Waiting Queue/Reconnect V1 to `KẾT NỐI LẠI PHÒNG ...` + permanent NPC/no-reclaim Queue explanation;
- credit bottom-right;
- moderate-light motion;
- left-aligned menu;
- no large panel behind the entire left column;
- seal less visually dominant than wordmark;
- exactly 3 foreground chibi characters.

This Landing design is approved for Client Implementation.