export type Phase="mandatory"|"status"|"voluntary"|"round_end"|string;
export type Screen="landing"|"create"|"join"|"recovery"|"tutorial"|"lobby"|"game";
export type Panel="overview"|"market"|"recovery"|"support"|"birth"|"marriage"|"chronicle"|"government"|"residence";
export type TutorialStepId="T0"|"T1"|"T2"|"T3"|"T4"|"T5"|"T6"|"T7"|"T8"|"T9"|"T10"|"T11";
export type Status="poor"|"middle"|"noble";
export type ResourceGrade="low"|"mid"|"high";
export type ResourceType="renewable"|"nonrenewable";

export interface RoomPlayer{
  playerId:string;
  displayName:string;
  host:boolean;
  connected:boolean;
  activeCharacterId:string|null;
  aiTakeoverCharacterId?:string|null;
  queuePosition:number|null;
}

export interface PublicCharacter{
  characterId:string;
  ownerId:string|null;
  npc:boolean;
  immigrant?:boolean;
  ageStage:number;
  ageLabel:string;
  status:string;
  pendingStatus?:string|null;
  householdId:string;
  householdAssets:number;
  cash:number;
  fundedSocialSecurity?:number;
  married:boolean;
  spouseCharacterIds:string[];
  childCharacterIds:string[];
  parentHouseholdId:string|null;
  renewableResources?:Record<string,number>;
  nonRenewableResources?:Record<string,number>;
  taxPaidThisRound?:number;
  elderlyMedicalDue?:number;
  elderlyMedicalPaid?:number;
  mortalityRisk?:number;
}

export interface MandatoryBreakdown{
  living:number;
  socialContribution:number;
  tax:number;
  childSupport:number;
  parentSupport:number;
  grief:number;
  medical:number;
  total:number;
}
export interface MandatoryQuote{
  breakdown:MandatoryBreakdown;
  netIncome:number;
  cashBefore:number;
  liquidationRequired:boolean;
  liquidationProceeds:number;
  cashAfterLiquidation:number;
  projectedBankruptcy:boolean;
  shortfall:number;
  dominantCost:keyof Omit<MandatoryBreakdown,"total">;
}
export interface RecoveryQuote{
  grade:ResourceGrade;
  currentPool:number;
  carryingCapacity:number;
  pendingNextRound:number;
  capacityRemaining:number;
  costPerUnit:number;
}
export interface StatusCardQuote{status:Status;fee:number;personsCharged:number;affordable:boolean}
export interface NobleCompetitionQuote{
  slotsTotal:number;
  slotsRequired:number;
  pendingNobleSlots:number;
  incumbent:boolean;
  householdAssets:number;
  turnCard:number|null;
  priority:readonly string[];
  allocationTiming:"end_of_round";
  fallbackStatus:"middle";
  middleFallbackFee:number;
  potentialRefund:number;
}
export interface StatusQuote{
  roundAverageAssets:number;
  priceIndex:number;
  cards:StatusCardQuote[];
  nobleCompetition:NobleCompetitionQuote;
}

export interface RankingEntry{
  playerId:string;
  average:number;
  cumulativeAssets:number;
  activeRounds:number;
  lives:number;
}

export interface RoomSnapshot{
  code:string;
  started:boolean;
  hostPlayerId:string;
  initialPopulationTarget?:number;
  initialNpcCount?:number;
  founderDraw?:Array<{playerId:string;displayName:string;card:number;founder:boolean;queuePosition:number|null}>;
  players:RoomPlayer[];
  game:null|{
    round:number;
    year:number;
    phase:Phase;
    ended:boolean;
    endingReason:string|null;
    eventName:string|null;
    currentTurnCharacterId:string|null;
    currentTurnPlayerId:string|null;
    phaseDeadlineAt:number|null;
    phaseDeadlineKind:string|null;
    debt:number;
    government:any;
    population:{total:number;humanControlled:number;npc:number;immigrantsAlive?:number};
    policy:{
      inflationRate:number;
      priceIndex:number;
      economicIncomeFactor?:number;
      economicIncomeReasons?:string[];
      noblePopulationShare?:number;
      roundAverageAssetsSnapshot?:number;
    };
    market:any;
    pool?:Record<ResourceGrade,number>;
    nonRenewablePool?:Record<ResourceGrade,number>;
    waitingQueue?:string[];
    characters:PublicCharacter[];
    marriageProposals:any[];
    birthProposals:any[];
    statusPurchases?:any[];
    turnOrder?:any[];
    historySnapshots:any[];
    rankings:RankingEntry[];
    chronology:string[];
    socialSecurity?:any;
  };
}

export interface PlayerSnapshot{
  playerId:string;
  character:any|null;
  household:any|null;
  history:any|null;
  queuePosition:number|null;
  financial:any|null;
  incomingMarriageProposals:any[];
  outgoingMarriageProposals:any[];
  incomingBirthProposals:any[];
  marriageCandidates:any[];
  canSendMarriage:boolean;
  canInitiateBirth:boolean;
  currentPhase?:Phase;
  phaseDeadlineAt?:number|null;
  eligibleSupportTargets:Array<{characterId:string;relation:"parent"|"child";ageLabel:string;status:string;displayName?:string|null}>;
  mandatoryQuote:MandatoryQuote|null;
  recoveryQuotes:RecoveryQuote[];
  statusQuote:StatusQuote|null;
}
