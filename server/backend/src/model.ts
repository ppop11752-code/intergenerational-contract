import {AgeStage,Persona,ResourceGrade,ResourceType,Status} from "./config.js";
export interface Resources{low:number;mid:number;high:number}

export interface ResourceLot{
  type:ResourceType;
  grade:ResourceGrade;
  units:number;
  costBasis:number;
  purchaseRound:number;
  /** Character that chose the purchase. Production rights stay with this buyer after marriage. */
  buyerCharacterId:string|null;
  /** Snapshot used for the child early-investment x1.2 rule. */
  purchaseAgeStage:number|null;
}

export interface PendingRecovery{low:number;mid:number;high:number}

export interface MarriageProposal{
  id:string;
  proposerCharacterId:string;
  targetCharacterId:string;
  status:"pending"|"accepted"|"rejected"|"cancelled"|"invalidated"|"executed";
  /** Historical creation round only; never drives settlement. */
  createdRound:number;
  /** Set exactly once on the first valid accept; binding settlement occurs at end of this round. */
  acceptedRound:number|null;
}

export interface BirthProposal{
  id:string;
  householdId:string;
  index:number;
  proposerCharacterId:string;
  responderCharacterId:string;
  status:"pending"|"accepted"|"rejected"|"cancelled"|"invalidated";
  round:number;
}

export interface StatusPurchase{
  householdId:string;
  requested:Status;
  paid:number;
  purchaserCharacterId:string;
  round:number;
  resolvedStatus?:Status;
  refund?:number;
}

export interface Household{
  id:string;
  memberIds:string[];
  sharedCash:number;
  sharedResources:Resources;
  sharedResourceCostBasis:Resources;
  sharedNonRenewableResources:Resources;
  sharedNonRenewableResourceCostBasis:Resources;
  investmentLots:ResourceLot[];
  /** Current-round Household Status. Funded ASXH is held separately in per-Character subaccounts. */
  status:Status;
  childrenIds:string[];
  active:boolean;
  pendingStatus:Status|null;
  pendingStatusPaid:number;
  pendingStatusPurchaserId:string|null;
  roundStartAssets:number;
  representativeCharacterId:string|null;
  sharedQuotaCharge:number;
  bankruptRound:number|null;
}

export type AiGoal="survive"|"stabilize"|"family"|"grow"|"status";
export interface AiRoundMemory{round:number;cash:number;assets:number;netIncome:number;mandatory:number;investmentSuccessRate:number;fiscalCrisis:boolean;pensionCrisis:boolean;bankruptcySignals:number}
export interface AiDecisionRecord{round:number;goal:AiGoal;riskScore:number;projectedReserve:number;action:string;reason:string}
export interface AiState{memory:AiRoundMemory[];decisions:AiDecisionRecord[];temporaryRiskModifier:number}

export interface Character{
  id:string;
  ownerId:string|null;
  householdId:string;
  npc:boolean;
  persona?:Persona;
  ageStage:AgeStage;
  alive:boolean;
  parentsHouseholdId:string|null;
  childrenIds:string[];
  griefFeeDue:number;
  birthStatus:Status;
  birthRound:number;
  aiState?:AiState;
  immigrant?:boolean;
  initialBot?:boolean;
  elderlyMedicalDueThisRound:number;
  elderlyMedicalPaidThisRound:number;
  lastMortalityRisk:number;
}

export type MandatoryCostKey="living"|"socialContribution"|"tax"|"childSupport"|"parentSupport"|"grief"|"medical";
export interface MandatoryBreakdown{living:number;socialContribution:number;tax:number;childSupport:number;parentSupport:number;grief:number;medical:number;total:number}
export interface BankruptcyRecord{round:number;householdId:string;stages:number[];status:Status;cashBefore:number;assetsBefore:number;netIncome:number;liquidationProceeds:number;need:number;shortfall:number;dominantCost:MandatoryCostKey;breakdown:MandatoryBreakdown}
export interface CashFlowTotals{laborProceeds:number;mandatoryPaid:number;liquidationProceeds:number;inheritanceReceived:number;supportBenefits:number;pensionBenefits:number;resourcePurchases:number;recoverySpending:number;childSupportTransferred:number;parentSupportTransferred:number}
export interface FamilyFlowRecord{round:number;type:"child_support"|"parent_support"|"inheritance"|"voluntary_support";fromHouseholdId:string|null;toHouseholdId:string;amount:number}
export interface GovernmentIntervention{type:string;amount:number;detail:string}
export interface FiscalRoundRecord{round:number;openingBudget:number;openingDebt:number;tax:number;investmentIncome:number;borrowing:number;maintenance:number;subsidy:number;recovery:number;socialFund:number;debtInterestPaid:number;debtPrincipalPaid:number;resourceInvestment:number;closingBudget:number;closingDebt:number;fiscalCrisis:boolean}

export interface GovernmentState{
  budget:number;reserveFloor:number;taxCollectedThisRound:number;taxPaidByCharacter:Record<string,number>;
  maintenancePaidThisRound:number;spendingThisRound:number;borrowedThisRound:number;debtRepaidThisRound:number;subsidySpentThisRound:number;
  resourceHoldings:Resources;resourceCostBasis:Resources;nonRenewableHoldings:Resources;nonRenewableCostBasis:Resources;investmentLots:ResourceLot[];
  realizedInvestmentProfit:number;turnCard:number|null;purchaseTurnPosition:number|null;actedThisRound:boolean;subsidyRate:Resources;
  interventions:string[];interventionLedger:GovernmentIntervention[];fiscalHistory:FiscalRoundRecord[];fiscalCrisis:boolean;debtInterestPaidThisRound:number;
  openingBudgetThisRound:number;openingDebtThisRound:number;
}

export type PlayerHistoryEventType="life_start"|"reincarnation"|"marriage"|"child_birth"|"status_milestone"|"death"|"bankruptcy"|"disconnect";
export interface PlayerHistoryEvent{round:number;year:number;type:PlayerHistoryEventType;characterId:string|null;detail:string}
export interface PlayerScoreSnapshot{round:number;year:number;characterId:string|null;householdAssets:number;scoreAssets:number;married:boolean;reason:"round"|"disconnect"}
export interface PlayerHistory{
  playerId:string;
  cumulativeAssets:number;
  activeRounds:number;
  lives:number;
  lastScoredRound:number;
  highestAssets:number;
  highestStatus:Status;
  marriages:number;
  children:number;
  events:PlayerHistoryEvent[];
  scoreSnapshots:PlayerScoreSnapshot[];
}

export interface HistorySnapshot{
  round:number;year:number;population:number;workers:number;elderly:number;children:number;totalAssets:number;inflationRate:number;priceIndex:number;
  publicDebt:number;governmentBudget:number;pensionPayoutRatio:number;renewable:Resources;nonRenewable:Resources;eventName:string|null;immigration:number;
}

export interface LifecycleBeneficiary{characterId:string;householdId:string;relation:"spouse"|"child";amount:number}
export interface LifecycleResult{
  id:string;round:number;year:number;type:"elderly_medical"|"death"|"inheritance"|"queue_entry"|"new_life_assignment";
  characterIds:string[];householdId:string|null;cause:string|null;joint:boolean;
  medicalDue:number|null;medicalPaid:number|null;estateTotal:number|null;
  beneficiaries:LifecycleBeneficiary[];governmentTransfer:number;
  playerId:string|null;queuePosition:number|null;assignmentReason:"birth"|"death"|"bankruptcy"|null;
}
export interface WorldEventImpact{system:"MARKET"|"RECOVERY"|"BIRTH"|"GOVERNMENT"|"MANDATORY";key:string;labelKey:string;value:number;delta:number|null;unit:"currency"|"ratio"|"count"}
export interface WorldEventOccurrence{id:string;round:number;year:number;name:string;ambienceKey:string|null;impacts:WorldEventImpact[];chronicleEntryId:string}

export interface GameState{
  round:number;debt:number;government:GovernmentState;pool:Resources;nonRenewablePool:Resources;pendingRecovery:PendingRecovery;
  realizedNetIncomeByHousehold:Record<string,number>;
  realizedNetIncomeByCharacter:Record<string,number>;
  voluntarySpentByCharacter:Record<string,number>;
  spendingLimitByCharacter:Record<string,number>;
  sharedQuotaChargeByCharacter:Record<string,number>;
  birthsThisRoundByHousehold:Record<string,number>;
  mandatoryResolvedHouseholds:Record<string,boolean>;
  prepaidChildSupportByParentHousehold:Record<string,number>;
  prepaidParentSupportByWorkerHousehold:Record<string,number>;
  pensionIncomeByHousehold:Record<string,number>;
  debtContributionCollected:number;immigrationAccumulator:number;
  socialSecurity:{payg:number;support:number;personalBalances:Record<string,number>;pensionReserve:number;investmentReturnRate:number;pensionTargetThisRound:number;pensionPaidThisRound:number;pensionStateTransferThisRound:number;pensionPayoutRatio:number;pensionCrisis:boolean;lastWorkerAverageIncome:number};
  characters:Record<string,Character>;households:Record<string,Household>;marriageProposals:Record<string,MarriageProposal>;birthProposals:Record<string,BirthProposal>;
  statusPurchases:Record<string,StatusPurchase>;
  turnState:{phase:"idle"|"round_started"|"turn_order_ready"|"resources_converted"|"mandatory"|"status"|"voluntary"|"round_end";entries:Array<{characterId:string;householdId:string;statusRank:number;card:number;order:number}>;activeIndex:number;completedMandatory:string[];completedVoluntary:string[]};
  histories:Record<string,PlayerHistory>;realPlayerIds:string[];waitingQueue:string[];chronology:string[];
  eventInterestDelta:number;priceIndex:number;inflationRate:number;eventName:string|null;epidemicMedicalCostPerCharacter:number;eventBirthLimit:number;recoveryCostMultiplier:number;debtXMultiplier:number;marketBounds:{min:number;max:number};economicIncomeFactor:number;economicIncomeReasons:string[];
  roundAverageAssetsSnapshot:number;
  historySnapshots:HistorySnapshot[];
  lifecycleResults:LifecycleResult[];
  worldEventOccurrences:WorldEventOccurrence[];
  disconnectedScoreSnapshots:Record<string,{round:number;assets:number}>;
  ended:boolean;
  telemetry:{births:number;bankruptcies:number;bankruptcyByStage:Record<string,number>;bankruptcyRecords:BankruptcyRecord[];cashFlow:CashFlowTotals;lifecycle:{created:Record<string,number>;deaths:Record<string,number>};socialCrisisCauses:Record<string,number>;familyFlows:FamilyFlowRecord[];cohortTransitions:Record<string,{born:number;reachedStage2:number;reachedWorker:number;reachedElder:number;diedBeforeWorker:number;workerDeaths:number;elderDeaths:number}>;marriage:{proposals:number;accepted:number;rejected:number;stagePairs:Record<string,number>};demography:{rounds:Array<{round:number;workers:number;singleWorkers:number;workerWorkerCouples:number;workerElderCouples:number;elderElderCouples:number;fertileCouples:number;eligibleWorkerPairs:number;kinBlockedWorkerPairs:number;birthsCumulative:number;replacementRatio:number}>;birthsByParentStagePair:Record<string,number>};elderlyMedical:{due:number;paid:number;deaths:number;survivals:number;mortalityByStage:Record<string,{exposed:number;deaths:number;avgRisk:number}>};incomeFactor:{rounds:Array<{round:number;factor:number;reasons:string[]}>};immigration:{arrivals:number;wealthInflow:number;bankruptcies:number;byRound:Record<string,number>;byStage:Record<string,number>;rounds:Array<{round:number;populationBefore:number;totalResidentAssets:number;wealthPerCapita:number;wealthReference:number;wealthRatio:number;populationFactor:number;rate:number;quota:number;accumulatorBefore:number;accumulatorAfter:number;arrivals:number}>}};
  endingReason?:string;
}
