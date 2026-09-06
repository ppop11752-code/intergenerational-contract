import { Character, GameState, Household } from "./model.js";

/**
 * Natural old-age death does not automatically kill the spouse.
 * The surviving household remains active. Estate distribution to children
 * should only occur when the household has no surviving spouse/member.
 */
export function householdHasSurvivingAdult(state: GameState, household: Household, excludingCharacterId: string): boolean {
  return household.memberIds.some(id => {
    if (id === excludingCharacterId) return false;
    const c = state.characters[id];
    return !!c && c.alive && c.ageStage >= 3;
  });
}

export function livingChildren(state: GameState, household: Household): Character[] {
  return household.childrenIds
    .map(id => state.characters[id])
    .filter((c): c is Character => !!c && c.alive);
}
