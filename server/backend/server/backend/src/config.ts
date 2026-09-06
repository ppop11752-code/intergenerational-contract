export type Status="poor"|"middle"|"noble";
export type AgeStage=number;
export type ResourceGrade="low"|"mid"|"high";
export type ResourceType="renewable"|"nonrenewable";
export type Persona="cautious"|"ambitious"|"altruistic"|"hedonist"|"moderate"|"fertile";

export const DEFAULT_CONFIG={
  room:{maxRealPlayers:30,initialActivePlayers:10},
  game:{totalRounds:32,startingCash:320,startingDebt:300},
  inflation:{initialRate:.015,minRate:-.02,maxRate:.12,targetRate:.018,demandWeight:.008,scarcityWeight:.018,fiscalWeight:.008,smoothing:.55},
  living:{base:1.5,assetRate:.011,assetSurchargeCap:14},
  elderlyMedical:{stageStart:7,baseMultiplier:1,stageGrowth:.25,mortalityX:.22,maxRiskReduction:.35,minY:.65,terminalStage:12},
  economicIncomeFactor:{min:.60,max:1.25,financialCrisis:-.20,techBoom:.15,fiscalCrisis:-.10,debtStress80:-.05,debtStress95:-.10,scarcityModerate:-.06,scarcitySevere:-.12,favorable:.05},
  immigration:{
    // Endogenous attractiveness model. Immigration quota is accumulated across
    // rounds so small populations can still receive whole-person arrivals while
    // the long-run flow remains bounded by maxRate of the pre-immigration population.
    baseRate:.022,minRate:.008,maxRate:.03,wealthExponent:.8,
    populationReference:10,populationFactorMin:.6,populationFactorMax:1.3,
    stageWeights:{3:.45,4:.35,5:.20},
    cashFactorMin:.55,cashFactorMax:.80,
    middleStatusProbability:.10
  },
  griefFee:{base:15},
  status:{fee:{poor:0,middle:10,noble:30},averageAssetRate:{poor:0,middle:.03,noble:.08},noblePopulationShare:.10},
  resource:{
    low:{basePrice:14,interest:.32,initialPool:120,carryingCapacity:120,regenRate:.10},
    mid:{basePrice:42,interest:.42,initialPool:60,carryingCapacity:60,regenRate:.08},
    high:{basePrice:105,interest:.50,initialPool:24,carryingCapacity:24,regenRate:.06}
  },
  nonRenewableResource:{
    low:{basePrice:7,interest:.60,initialPool:700,regen:0},
    mid:{basePrice:22,interest:.76,initialPool:360,regen:0},
    high:{basePrice:55,interest:.92,initialPool:140,regen:0}
  },
  investmentFailureRate:{low:.21,mid:.12,high:.06},
  market:{min:.55,max:2.35,liquidationFactor:.75},
  recovery:{marketPriceRate:.50},
  socialSecurity:{workerContributionRate:.10,personalRate:.05,paygRate:.03,supportRate:.02,
    pensionReplacementRate:.30,pensionStateBackstopShare:.40,pensionCollapsePayoutRatio:.70,supportStateBackstopShare:.50,
    reserveTargetRounds:2,investmentExpectedRealReturn:.015,investmentShock:.05,investmentMinReturn:-.08,investmentMaxReturn:.12,
    childSupportRate:.145,childSupportHouseholdCapRate:.30,childSupportLivingCostShare:1.0,parentSupportRate:.06,childbirthSubsidy:22,childbirthSupportTarget:10,childbirthSubsidyCap:32,childAllowance:10,childAllowanceThroughRound:8},
  debt:{growthRate:.013,ceilingCitizenAssetsShare:.60},
  government:{
    initialBudget:320,taxFixed:0.4,taxIncomeRate:.11,taxDebtServiceRate:.013,
    maintenanceBase:28,reserveRounds:2,legalMaxResourcePurchasePoolShare:.20,strategyMaxResourcePurchasePoolShare:.10,
    maxRecoveryInitialPoolShare:.10,recoveryTriggerPoolRatio:.58,investmentMinPoolRatio:.72,investmentMaxPriceMultiple:1.15,
    lowSubsidyRate:.07,midSubsidyRate:.04,highSubsidyRate:.015,subsidyTriggerPriceMultiple:1.35,
    debtStressRatio:2.5,debtRepaymentShare:.32,recoverySpendingShare:.20,investmentSpendingShare:.14
  },
  fertility:{normalMaxBirthsPerHousehold:2,eventMaxBirthsPerHousehold:3},
  events:{rounds:[4,8,12,16,20,24,28,32],disasterPoolMultiplier:.80,financialCrisisInterestDelta:-.15,techBoomInterestDelta:.15,welfareInjection:100,epidemicMedicalCost:10,publicInvestmentRecoveryMultiplier:.50,marketMin:.30,marketMax:3.00}
} as const;
export type GameConfig=typeof DEFAULT_CONFIG;
export function nominal(base:number,priceIndex:number){return base*priceIndex}
// Kept for compatibility with older tests/helpers; v2 engine uses priceIndex instead.
export function inflated(base:number,round:number,cfg:GameConfig=DEFAULT_CONFIG){return base*Math.pow(1+cfg.inflation.initialRate,round-1)}
