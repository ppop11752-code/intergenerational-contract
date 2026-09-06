import { Character, GameState, Household } from "./model.js";

/**
 * Legacy compatibility helpers only. The authoritative v5 child/filial formulas
 * live in GameEngine because they require round snapshots, PI, dependent-child
 * counts, pension income, Household caps and prefunding order.
 *
 * Do not use this module for new gameplay implementation.
 */
export function livingWorkerChildren(state: GameState, parentHousehold: Household): Character[] {
  return parentHousehold.childrenIds
    .map(id => state.characters[id])
    .filter((c): c is Character => !!c && c.alive && c.ageStage >= 3 && c.ageStage <= 6);
}

/** @deprecated Use GameEngine.prefundParentSupportBeforeMandatory / current Rule Ledger. */
export function parentSupportDuePerChild(netIncome: number, rate = 0.06): number {
  return Math.max(0, netIncome) * rate;
}

/**
 * @deprecated The v5 Rule Ledger does NOT suspend mandatory parental support in
 * rounds 1-8; Child Allowance is additional. Use GameEngine.childSupportObligation.
 * This compatibility function returns only the income component for one child
 * and intentionally cannot represent the Household cap or PI-linked floor.
 */
export function mandatoryChildSupportDue(netIncome: number, childAgeStage: number, _gameRound: number, rate = 0.145): number {
  if (childAgeStage > 2) return 0;
  return Math.max(0, netIncome) * rate;
}

/** @deprecated Direct parent-Character links are authoritative in v5. */
export function hasLivingParentHousehold(state: GameState, child: Character): boolean {
  if (!child.parentsHouseholdId) return false;
  const h = state.households[child.parentsHouseholdId];
  if (!h || !h.active) return false;
  return h.memberIds.some(id => state.characters[id]?.alive);
}
