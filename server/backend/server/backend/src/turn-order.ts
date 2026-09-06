import { GameState } from "./model.js";

export type RoundPhase =
  | "idle"
  | "round_started"
  | "turn_order_ready"
  | "resources_converted"
  | "mandatory"
  | "status"
  | "voluntary"
  | "round_end";

export interface TurnEntry {
  characterId: string;
  householdId: string;
  statusRank: number;
  card: number;
  order: number;
}

export interface TurnOrderState {
  phase: RoundPhase;
  entries: TurnEntry[];
  activeIndex: number;
  completedMandatory: string[];
  completedVoluntary: string[];
}

export function createEmptyTurnState(): TurnOrderState {
  return {
    phase: "idle",
    entries: [],
    activeIndex: 0,
    completedMandatory: [],
    completedVoluntary: []
  };
}

export function statusRank(status: "poor" | "middle" | "noble"): number {
  return status === "noble" ? 3 : status === "middle" ? 2 : 1;
}

/**
 * Luật mới:
 * - Có N nhân vật đang tồn tại trong game.
 * - Bộ số của vòng là 1..(100+N).
 * - Mỗi nhân vật sống rút 1 số tự nhiên, không hoàn lại.
 * - Vì 100+N > N nên luôn đủ số cho mọi nhân vật.
 */
export function shuffledDynamicDeck(
  existingCharacterCount: number,
  random: () => number = Math.random
): number[] {
  const upperBound = 100 + existingCharacterCount;
  const deck = Array.from({ length: upperBound }, (_, i) => i + 1);
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [deck[i], deck[j]] = [deck[j]!, deck[i]!];
  }
  return deck;
}

export function buildTurnOrder(
  state: GameState,
  random: () => number = Math.random
): TurnEntry[] {
  const living = Object.values(state.characters).filter(c => c.alive);
  const existingCharacterCount = Object.keys(state.characters).length;
  const deck = shuffledDynamicDeck(existingCharacterCount, random);
  // Nhà nước rút thêm 1 số từ cùng bộ, không trùng số của Character.
  const governmentCard = deck[living.length]!;

  const entries = living.map((c, idx) => {
    const h = state.households[c.householdId]!;
    return {
      characterId: c.id,
      householdId: c.householdId,
      statusRank: statusRank(h.status),
      card: deck[idx]!,
      order: 0
    };
  });

  entries.sort((a, b) => {
    if (b.statusRank !== a.statusRank) return b.statusRank - a.statusRank;
    return b.card - a.card;
  });

  entries.forEach((e, i) => e.order = i + 1);

  // Nhà nước luôn có địa vị tương đương Quý tộc (statusRank = 3).
  // Vì vậy lượt mua của Nhà nước được xếp cùng nhóm Quý tộc;
  // trong nhóm này lá rút lớn hơn đi trước. Nhà nước luôn đi trước
  // Middle/Commoner bất kể lá rút của họ cao đến đâu.
  const combined=[
    ...entries.map(e=>({kind:"character" as const,rank:e.statusRank,card:e.card,characterId:e.characterId})),
    {kind:"government" as const,rank:3,card:governmentCard,characterId:"__government__"}
  ].sort((a,b)=>b.rank!==a.rank?b.rank-a.rank:b.card-a.card);
  state.government.turnCard=governmentCard;
  state.government.purchaseTurnPosition=
    combined.findIndex(x=>x.kind==="government")+1;
  return entries;
}
