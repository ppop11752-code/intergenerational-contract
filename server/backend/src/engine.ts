import {AgeStage,DEFAULT_CONFIG,GameConfig,Persona,ResourceGrade,ResourceType,Status,nominal} from "./config.js";
import {Character,GameState,Household,LifecycleBeneficiary,LifecycleResult,MarriageProposal,Resources,ResourceLot,WorldEventImpact} from "./model.js";
import {livingCost,marketPrice,regeneratePool,resourceLiquidationValue,scarcityInflationIndex,statusFee,resourceCfg} from "./economy.js";
import {socialContribution} from "./social-security.js";
import {maintainGovernment,convertGovernmentResources,recoverScarceResourcesBeforeSubsidy,prepareGovernmentSubsidies,runGovernmentTurn,applyResourceSubsidy,quoteResourceSubsidy,accruePublicDebt,taxPerPerson} from "./government.js";
import {insertAtQueueEnd,popQueue} from "./queue.js";
import {buildTurnOrder,createEmptyTurnState,RoundPhase,TurnEntry} from "./turn-order.js";
import {advanceResidenceRoundStart,applyMarriageResidence,finalizeResidenceEndRound,initializeCharacterResidence,markCharacterResidenceOriginImmigrant,reconcileResidenceAfterDeath} from "./residence.js";

const empty=():Resources=>({low:0,mid:0,high:0});

export class GameEngine{
  readonly cfg:GameConfig;
  state:GameState;
  private randomSource:()=>number=Math.random;
  private initialStageBag:AgeStage[]|null=null;
  setRandomSource(fn:()=>number){this.randomSource=fn}
  get random(){return this.randomSource}

  constructor(cfg:GameConfig=DEFAULT_CONFIG){
    this.cfg=cfg;
    this.state={
      round:0,
      debt:cfg.game.startingDebt,
      government:{
        budget:cfg.government.initialBudget,reserveFloor:0,taxCollectedThisRound:0,taxPaidByCharacter:{},
        maintenancePaidThisRound:0,spendingThisRound:0,borrowedThisRound:0,debtRepaidThisRound:0,subsidySpentThisRound:0,
        resourceHoldings:{low:0,mid:0,high:0},resourceCostBasis:{low:0,mid:0,high:0},nonRenewableHoldings:{low:0,mid:0,high:0},nonRenewableCostBasis:{low:0,mid:0,high:0},investmentLots:[],realizedInvestmentProfit:0,
        turnCard:null,purchaseTurnPosition:null,actedThisRound:false,subsidyRate:{low:0,mid:0,high:0},interventions:[],interventionLedger:[],fiscalHistory:[],fiscalCrisis:false,debtInterestPaidThisRound:0,openingBudgetThisRound:cfg.government.initialBudget,openingDebtThisRound:cfg.game.startingDebt
      },
      pool:{
        low:cfg.resource.low.initialPool,
        mid:cfg.resource.mid.initialPool,
        high:cfg.resource.high.initialPool
      },
      nonRenewablePool:{low:cfg.nonRenewableResource.low.initialPool,mid:cfg.nonRenewableResource.mid.initialPool,high:cfg.nonRenewableResource.high.initialPool},
      pendingRecovery:empty(),
      realizedNetIncomeByHousehold:{},
      realizedNetIncomeByCharacter:{},
      voluntarySpentByCharacter:{},
      spendingLimitByCharacter:{},
      sharedQuotaChargeByCharacter:{},
      birthsThisRoundByHousehold:{},
      mandatoryResolvedHouseholds:{},
      prepaidChildSupportByParentHousehold:{},
      prepaidParentSupportByWorkerHousehold:{},
      pensionIncomeByHousehold:{},
      debtContributionCollected:0,
      immigrationAccumulator:0,
      socialSecurity:{payg:0,support:0,personalBalances:{},pensionReserve:0,investmentReturnRate:0,pensionTargetThisRound:0,pensionPaidThisRound:0,pensionStateTransferThisRound:0,pensionPayoutRatio:1,pensionCrisis:false,lastWorkerAverageIncome:0},
      characters:{},
      households:{},
      residences:{},
      residenceTransitions:[],
      marriageProposals:{},
      birthProposals:{},
      statusPurchases:{},
      turnState:createEmptyTurnState(),
      histories:{},
      roundAverageAssetsSnapshot:0,
      historySnapshots:[],
      lifecycleResults:[],
      worldEventOccurrences:[],
      disconnectedScoreSnapshots:{},
      realPlayerIds:[],
      waitingQueue:[],
      chronology:[],
      eventInterestDelta:0,
      priceIndex:1,
      inflationRate:cfg.inflation.initialRate,
      eventName:null,
      epidemicMedicalCostPerCharacter:0,
      eventBirthLimit:cfg.fertility.normalMaxBirthsPerHousehold,
      recoveryCostMultiplier:1,
      debtXMultiplier:1,
      marketBounds:{min:cfg.market.min,max:cfg.market.max},
      economicIncomeFactor:1,economicIncomeReasons:["baseline"],
      telemetry:{births:0,bankruptcies:0,bankruptcyByStage:{},bankruptcyRecords:[],cashFlow:{laborProceeds:0,mandatoryPaid:0,liquidationProceeds:0,inheritanceReceived:0,supportBenefits:0,pensionBenefits:0,resourcePurchases:0,recoverySpending:0,childSupportTransferred:0,parentSupportTransferred:0},lifecycle:{created:{},deaths:{}},socialCrisisCauses:{},familyFlows:[],cohortTransitions:{},marriage:{proposals:0,accepted:0,rejected:0,stagePairs:{}},demography:{rounds:[],birthsByParentStagePair:{}},elderlyMedical:{due:0,paid:0,deaths:0,survivals:0,mortalityByStage:{}},incomeFactor:{rounds:[]},immigration:{arrivals:0,wealthInflow:0,bankruptcies:0,byRound:{},byStage:{},rounds:[]}},
      ended:false
    };
  }

  private buildInitialStageBag():AgeStage[]{
    const bag:AgeStage[]=[3,3,4,4,5,5];
    while(bag.length<this.cfg.room.initialActivePlayers)bag.push((3+Math.floor(this.random()*3)) as AgeStage);
    for(let i=bag.length-1;i>0;i--){const j=Math.floor(this.random()*(i+1));[bag[i],bag[j]]=[bag[j]!,bag[i]!]}
    return bag;
  }

  joinPlayer(id:string):"active"|"queue"|"rejected"{
    if(this.state.realPlayerIds.includes(id)||this.state.waitingQueue.includes(id)||this.state.histories[id])return"rejected";
    if(this.state.realPlayerIds.length+this.state.waitingQueue.length>=this.cfg.room.maxRealPlayers)return"rejected";
    const startsActive=this.state.realPlayerIds.length<this.cfg.room.initialActivePlayers;
    this.state.histories[id]={playerId:id,cumulativeAssets:0,activeRounds:0,lives:startsActive?1:0,lastScoredRound:0,highestAssets:0,highestStatus:"poor",marriages:0,children:0,events:[],scoreSnapshots:[]};
    if(startsActive){
      this.state.realPlayerIds.push(id);
      this.initialStageBag??=this.buildInitialStageBag();
      const stage=this.initialStageBag[this.state.realPlayerIds.length-1]??3;
      const c=this.createCharacter(id,stage,this.cfg.game.startingCash,null,false);
      this.pushPlayerHistory(id,"life_start",c.id,`Bắt đầu Kiếp #1 ở Giai đoạn ${stage}`);
      return"active";
    }
    this.state.waitingQueue.push(id);
    return"queue";
  }

  registerQueuedPlayer(id:string){
    if(this.state.histories[id]||this.state.realPlayerIds.includes(id)||this.state.waitingQueue.includes(id))return null;
    if(Object.keys(this.state.histories).length>=this.cfg.room.maxRealPlayers)return null;
    this.state.histories[id]={playerId:id,cumulativeAssets:0,activeRounds:0,lives:0,lastScoredRound:0,highestAssets:0,highestStatus:"poor",marriages:0,children:0,events:[],scoreSnapshots:[]};
    this.state.waitingQueue=insertAtQueueEnd(this.state.waitingQueue,id);return this.state.waitingQueue.length;
  }

  private createCharacter(ownerId:string|null,stage:AgeStage,cash:number,parentHouseholdId:string|null,npc:boolean,householdId?:string,persona?:Persona){
    const id=`${npc?"npc":ownerId}-${crypto.randomUUID()}`;
    const hId=householdId??`house-${crypto.randomUUID()}`;
    if(!this.state.households[hId]){
      this.state.households[hId]={
        id:hId,memberIds:[],sharedCash:cash,sharedResources:empty(),sharedResourceCostBasis:empty(),sharedNonRenewableResources:empty(),sharedNonRenewableResourceCostBasis:empty(),investmentLots:[],
        status:"poor",
        childrenIds:[],active:true,pendingStatus:null,pendingStatusPaid:0,pendingStatusPurchaserId:null,roundStartAssets:cash,representativeCharacterId:null,sharedQuotaCharge:0,bankruptRound:null
      };
    }
    const c:Character={
      id,ownerId,householdId:hId,npc,persona,ageStage:stage,alive:true,currentResidenceId:"",residenceAdultTransitionHandled:stage>=3,
      aiState:npc?{memory:[],decisions:[],temporaryRiskModifier:0}:undefined,
      parentsHouseholdId:parentHouseholdId,
      childrenIds:[],griefFeeDue:0,birthRound:this.state.round,elderlyMedicalDueThisRound:0,elderlyMedicalPaidThisRound:0,lastMortalityRisk:0,birthStatus:parentHouseholdId&&this.state.households[parentHouseholdId]?this.state.households[parentHouseholdId]!.status:"poor"
    };
    this.state.characters[id]=c;
    this.state.households[hId]!.memberIds.push(id);
    initializeCharacterResidence(this.state,c,parentHouseholdId);
    const lifeKey=String(stage);this.state.telemetry.lifecycle.created[lifeKey]=(this.state.telemetry.lifecycle.created[lifeKey]??0)+1;
    return c;
  }

  private historyYear(atRoundEnd=false){return Math.max(0,atRoundEnd?this.state.round*10:(this.state.round-1)*10)}
  private recordLifecycleResult(result:Omit<LifecycleResult,"id"|"round"|"year">){
    this.state.lifecycleResults.push({id:`lifecycle-${crypto.randomUUID()}`,round:this.state.round,year:this.historyYear(true),...result});
  }
  private pushPlayerHistory(playerId:string|undefined|null,type:import("./model.js").PlayerHistoryEventType,characterId:string|null,detail:string,atRoundEnd=false){
    if(!playerId)return;const h=this.state.histories[playerId];if(!h)return;h.events.push({round:this.state.round,year:this.historyYear(atRoundEnd),type,characterId,detail});
  }
  private statusRankValue(status:Status){return status==="noble"?2:status==="middle"?1:0}
  private statusDisplayName(status:Status){return status==="noble"?"Quý tộc":status==="middle"?"Trung lưu":"Bình dân"}
  private updatePlayerMilestones(c:Character,scoreAssets:number){
    const playerId=c.ownerId;if(!playerId)return;const hist=this.state.histories[playerId];if(!hist)return;
    hist.highestAssets=Math.max(hist.highestAssets,Math.max(0,scoreAssets));
    const status=this.household(c).status;if(this.statusRankValue(status)>this.statusRankValue(hist.highestStatus)){hist.highestStatus=status;this.pushPlayerHistory(playerId,"status_milestone",c.id,`Đạt địa vị ${this.statusDisplayName(status)}`)}
  }

  createNpc(parentHouseholdId:string|null=null,persona?:Persona){
    const p:Persona[]=["cautious","ambitious","altruistic","hedonist","moderate","fertile"];
    return this.createCharacter(null,1,0,parentHouseholdId,true,undefined,persona??p[Math.floor(this.random()*p.length)]);
  }

  createInitialBot():Character{
    // Lobby bots fill only the missing founder slots up to the normal
    // 10-character initial society. They use the same constrained Stage 3–5
    // bag as human founders, so adding bots does not alter the starting-age rule.
    this.initialStageBag??=this.buildInitialStageBag();
    const founderIndex=Object.values(this.state.characters).filter(c=>c.birthRound===0&&c.parentsHouseholdId===null).length;
    if(founderIndex>=this.cfg.room.initialActivePlayers)throw Error("INITIAL_POPULATION_FULL");
    const stage=this.initialStageBag[founderIndex]??3;
    const personas:Persona[]=["cautious","ambitious","altruistic","hedonist","moderate","fertile"];
    const persona=personas[Math.floor(this.random()*personas.length)]!;
    const bot=this.createCharacter(null,stage,this.cfg.game.startingCash,null,true,undefined,persona);
    bot.initialBot=true;
    return bot;
  }

  private weightedImmigrantStage():AgeStage{
    const w=this.cfg.immigration.stageWeights;
    const roll=this.random();
    if(roll<w[3])return 3;
    if(roll<w[3]+w[4])return 4;
    return 5;
  }

  immigrationAttractiveness(){
    // Population is measured immediately before this round's arrivals. This is
    // the quota base; immigrants from previous rounds are ordinary residents.
    const populationBefore=this.alive().length;
    if(populationBefore<=0){
      return {populationBefore:0,totalResidentAssets:0,wealthPerCapita:0,wealthReference:this.cfg.game.startingCash*this.state.priceIndex,wealthRatio:0,populationFactor:this.cfg.immigration.populationFactorMin,rate:0,quota:0};
    }
    const totalResidentAssets=this.citizenTotalAssets();
    const wealthPerCapita=totalResidentAssets/populationBefore;
    const wealthReference=Math.max(1e-9,this.cfg.game.startingCash*this.state.priceIndex);
    const wealthRatio=Math.max(0,wealthPerCapita/wealthReference);
    const populationFactor=Math.max(
      this.cfg.immigration.populationFactorMin,
      Math.min(this.cfg.immigration.populationFactorMax,Math.sqrt(populationBefore/this.cfg.immigration.populationReference))
    );
    const rawRate=this.cfg.immigration.baseRate*Math.pow(wealthRatio,this.cfg.immigration.wealthExponent)*populationFactor;
    const rate=Math.max(this.cfg.immigration.minRate,Math.min(this.cfg.immigration.maxRate,rawRate));
    const quota=populationBefore*rate;
    return {populationBefore,totalResidentAssets,wealthPerCapita,wealthReference,wealthRatio,populationFactor,rate,quota};
  }

  private immigrationCountThisRound(){
    const m=this.immigrationAttractiveness();
    const accumulatorBefore=this.state.immigrationAccumulator;
    const accumulated=accumulatorBefore+m.quota;
    const arrivals=Math.max(0,Math.floor(accumulated+1e-12));
    this.state.immigrationAccumulator=Math.max(0,accumulated-arrivals);
    return {...m,arrivals,accumulatorBefore,accumulatorAfter:this.state.immigrationAccumulator};
  }

  private admitImmigrantsAtRoundStart(){
    const metrics=this.immigrationCountThisRound();
    const count=metrics.arrivals;
    this.state.telemetry.immigration.rounds.push({round:this.state.round,...metrics});
    this.state.telemetry.immigration.byRound[String(this.state.round)]=count;
    if(count<=0)return [] as Character[];
    const personas:Persona[]=["cautious","ambitious","altruistic","hedonist","moderate","fertile"];
    const arrivals:Character[]=[];
    for(let i=0;i<count;i++){
      const stage=this.weightedImmigrantStage();
      const cashFactor=this.cfg.immigration.cashFactorMin+
        this.random()*(this.cfg.immigration.cashFactorMax-this.cfg.immigration.cashFactorMin);
      const cash=this.cfg.game.startingCash*cashFactor*this.state.priceIndex;
      const persona=personas[Math.floor(this.random()*personas.length)]!;
      const c=this.createCharacter(null,stage,cash,null,true,undefined,persona);
      c.immigrant=true;markCharacterResidenceOriginImmigrant(this.state,c);
      const h=this.household(c);
      const status=this.random()<this.cfg.immigration.middleStatusProbability?"middle":"poor";
      h.status=status;
      arrivals.push(c);
      this.state.telemetry.immigration.arrivals++;
      this.state.telemetry.immigration.wealthInflow+=cash;
      this.state.telemetry.immigration.byStage[String(stage)]=(this.state.telemetry.immigration.byStage[String(stage)]??0)+1;
      this.state.chronology.push(
        `[Vòng ${this.state.round}] Nhập cư: ${c.id} đến xã hội | Stage ${stage} | địa vị ${status} | tài sản ban đầu ${cash.toFixed(2)}`
      );
    }
    return arrivals;
  }


  detachPlayerToNpc(playerId:string,persona?:Persona):Character|null{
    const c=this.alive().find(x=>x.ownerId===playerId);if(!c)return null;
    const h=this.household(c),share=this.isMarried(c)?.5:1,assets=this.householdAssets(h)*share;
    const hist=this.state.histories[playerId];if(hist&&hist.lastScoredRound!==this.state.round){hist.cumulativeAssets+=assets;hist.activeRounds++;hist.lastScoredRound=this.state.round;hist.highestAssets=Math.max(hist.highestAssets,assets);hist.scoreSnapshots.push({round:this.state.round,year:this.historyYear(),characterId:c.id,householdAssets:this.householdAssets(h),scoreAssets:assets,married:this.isMarried(c),reason:"disconnect"});this.state.disconnectedScoreSnapshots[playerId]={round:this.state.round,assets}}
    this.pushPlayerHistory(playerId,"disconnect",c.id,"Mất quyền điều khiển; Character chuyển sang NPC và Player vào Hàng chờ khi kết nối lại");
    const personas:Persona[]=["cautious","ambitious","altruistic","hedonist","moderate","fertile"];
    c.ownerId=null;c.npc=true;c.persona=persona??personas[Math.floor(this.random()*personas.length)]!;c.aiState??={memory:[],decisions:[],temporaryRiskModifier:0};
    this.state.realPlayerIds=this.state.realPlayerIds.filter(x=>x!==playerId);this.state.waitingQueue=this.state.waitingQueue.filter(x=>x!==playerId);return c;
  }

  movePlayerToQueueEnd(playerId:string):number|null{
    if(!this.state.histories[playerId]){
      const pos=this.registerQueuedPlayer(playerId);if(pos==null)return null;
    }
    // Nếu player đang có nhân vật thật thì không được đồng thời vào queue.
    if(this.alive().some(c=>c.ownerId===playerId&&!c.npc))return null;
    this.state.realPlayerIds=this.state.realPlayerIds.filter(x=>x!==playerId);
    this.state.waitingQueue=this.state.waitingQueue.filter(x=>x!==playerId);
    this.state.waitingQueue=insertAtQueueEnd(this.state.waitingQueue,playerId);
    return this.state.waitingQueue.length;
  }

  household(c:Character){return this.state.households[c.householdId]!}
  alive(){return Object.values(this.state.characters).filter(c=>c.alive)}
  workers(){return this.alive().filter(c=>c.ageStage>=3&&c.ageStage<=6)}
  elders(){return this.alive().filter(c=>c.ageStage>=7)}
  spouseOf(c:Character):Character|null{
    const h=this.household(c);
    if(!h?.active)return null;
    const other=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive&&x.id!==c.id);
    // A married household is exactly the merged adult partnership. Children
    // are always separate households, so another living adult member is spouse.
    return other.find(x=>x.ageStage>=3)??null;
  }
  isMarried(c:Character){return !!this.spouseOf(c)}
  hasAcceptedMarriagePending(c:Character){
    return Object.values(this.state.marriageProposals).some(p=>p.status==="accepted"&&(p.proposerCharacterId===c.id||p.targetCharacterId===c.id));
  }
  isAdult(c:Character){return c.ageStage>=3}
  isWorkerAge(c:Character){return c.ageStage>=3&&c.ageStage<=6}
  isCoupleHousehold(h:Household){
    if(!h.active)return false;
    const adults=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive&&x.ageStage>=3);
    return adults.length===2&&this.spouseOf(adults[0]!)?.id===adults[1]!.id&&this.spouseOf(adults[1]!)?.id===adults[0]!.id;
  }
  private parentCharactersOf(c:Character){
    return Object.values(this.state.characters).filter(p=>p.childrenIds.includes(c.id));
  }

  areCloseFamily(a:Character,b:Character){
    if(a.id===b.id)return true;
    // Direct parent/child survives every later Household merge because the
    // parent Character itself keeps the child's id.
    if(a.childrenIds.includes(b.id)||b.childrenIds.includes(a.id))return true;
    // Siblings and half-siblings are blocked whenever they share at least one
    // recorded parent Character. This avoids a remarriage changing Household ids
    // and accidentally making half-siblings marriage-eligible.
    const ap=new Set(this.parentCharactersOf(a).map(x=>x.id));
    if(this.parentCharactersOf(b).some(x=>ap.has(x.id)))return true;
    // Historical parental-Household link remains a compatibility fallback for
    // old/generated records that predate direct parent-character bookkeeping.
    if(a.parentsHouseholdId&&b.parentsHouseholdId&&a.parentsHouseholdId===b.parentsHouseholdId)return true;
    if(a.parentsHouseholdId===b.householdId||b.parentsHouseholdId===a.householdId)return true;
    const ah=this.household(a),bh=this.household(b);
    if(ah.childrenIds.includes(b.id)||bh.childrenIds.includes(a.id))return true;
    return false;
  }


  phase(){return this.state.turnState.phase}

  private requirePhase(...allowed:RoundPhase[]){
    if(!allowed.includes(this.state.turnState.phase)){
      throw Error(`invalid phase: ${this.state.turnState.phase}; expected ${allowed.join(",")}`);
    }
  }

  /**
   * Bước xếp lượt: gọi sau startRound().
   */
  buildTurnOrder(random:()=>number=Math.random):TurnEntry[]{
    this.requirePhase("round_started");const entries=buildTurnOrder(this.state,random);
    this.state.turnState={phase:"turn_order_ready",entries,activeIndex:0,completedMandatory:[],completedVoluntary:[]};
    for(const h of Object.values(this.state.households)){h.representativeCharacterId=null}
    for(const e of entries){const h=this.state.households[e.householdId];if(h?.active&&h.representativeCharacterId==null)h.representativeCharacterId=e.characterId}
    return entries;
  }

  currentTurnEntry():TurnEntry|null{
    const e=this.state.turnState.entries[this.state.turnState.activeIndex];
    return e??null;
  }

  currentTurnCharacter():Character|null{
    const e=this.currentTurnEntry();
    return e?this.state.characters[e.characterId]??null:null;
  }

  /**
   * Sau khi xếp lượt, tài nguyên phải được quy đổi trước nghĩa vụ.
   */
  childSupportBasePerChild(){
    // X is tied to the subsistence component of one child's Living Cost.
    // The wealth/asset surcharge is deliberately excluded: parents guarantee
    // subsistence, not the child's wealth-linked consumption surcharge.
    return nominal(this.cfg.living.base,this.state.priceIndex)*this.cfg.socialSecurity.childSupportLivingCostShare;
  }

  childSupportObligation(netIncome:number,dependentChildren:number){
    if(dependentChildren<=0)return 0;
    const incomeComponent=Math.min(
      Math.max(0,netIncome)*this.cfg.socialSecurity.childSupportRate*dependentChildren,
      Math.max(0,netIncome)*this.cfg.socialSecurity.childSupportHouseholdCapRate
    );
    return incomeComponent+this.childSupportBasePerChild()*dependentChildren;
  }

  projectedChildSupportAfterBirth(h:Household){
    const dependent=h.childrenIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive&&x.ageStage<=2).length;
    return this.childSupportObligation(this.netIncome(h),dependent+1);
  }

  private prefundChildSupportBeforeMandatory(){
    // Child support has priority before the rest of Mandatory Phase.
    // It is a REAL transfer: debit parent first, then credit children.
    // If cash is insufficient, resources are emergency-liquidated. A household
    // that still cannot meet the obligation goes bankrupt; children receive only
    // what the household was actually able to fund.
    for(const h of Object.values(this.state.households).filter(x=>x.active)){
      const living=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive);
      if(!living.some(x=>x.ageStage>=3&&x.ageStage<=6))continue;
      const children=h.childrenIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive&&x.ageStage<=2);
      if(!children.length)continue;
      const net=this.netIncome(h),obligation=this.childSupportObligation(net,children.length);
      if(obligation<=0)continue;

      const cashBefore=h.sharedCash,assetsBefore=this.householdAssets(h);
      let proceeds=0;
      if(h.sharedCash<obligation){
        for(const type of ["renewable","nonrenewable"] as ResourceType[])for(const g of ["low","mid","high"] as ResourceGrade[]){
          const inv=type==="renewable"?h.sharedResources:h.sharedNonRenewableResources;
          proceeds+=inv[g]*this.marketPrice(g,type)*this.cfg.market.liquidationFactor;
        }
        h.sharedCash+=proceeds;
        this.state.telemetry.cashFlow.liquidationProceeds+=proceeds;
        h.sharedResources=empty();h.sharedResourceCostBasis=empty();h.sharedNonRenewableResources=empty();h.sharedNonRenewableResourceCostBasis=empty();h.investmentLots=[];
      }

      const paid=Math.min(obligation,Math.max(0,h.sharedCash));
      h.sharedCash-=paid;
      if(paid>0){
        const share=paid/children.length;
        for(const child of children){
          this.household(child).sharedCash+=share;
          this.state.telemetry.familyFlows.push({round:this.state.round,type:"child_support",fromHouseholdId:h.id,toHouseholdId:child.householdId,amount:share});
        }
        this.state.prepaidChildSupportByParentHousehold[h.id]=paid;
        this.chargeSharedCostToQuota(h,paid);
        this.state.telemetry.cashFlow.childSupportTransferred+=paid;
      }

      if(paid+1e-9<obligation){
        const breakdown={living:0,socialContribution:0,tax:0,childSupport:obligation,parentSupport:0,grief:0,medical:0,total:obligation};
        this.state.telemetry.bankruptcyRecords.push({round:this.state.round,householdId:h.id,stages:living.map(x=>x.ageStage),status:h.status,cashBefore,assetsBefore,netIncome:net,liquidationProceeds:proceeds,need:obligation,shortfall:obligation-paid,dominantCost:"childSupport",breakdown});
        this.bankruptHousehold(h);
        this.state.mandatoryResolvedHouseholds[h.id]=true;
      }
    }
  }

  private prefundParentSupportBeforeMandatory(){
    // Option C: filial support is a safety net, not a second full pension.
    // Only fill an elderly parent household's projected living-cost gap,
    // and cap each worker household at parentSupportRate of net income.
    const elderlyHouseholds=Object.values(this.state.households).filter(h=>h.active&&h.memberIds.some(id=>{const c=this.state.characters[id];return !!c&&c.alive&&c.ageStage>=7}));
    for(const ph of elderlyHouseholds){
      const elder=ph.memberIds.map(id=>this.state.characters[id]).find((c):c is Character=>!!c&&c.alive&&c.ageStage>=7);
      if(!elder)continue;
      const projectedMembers=ph.memberIds.map(id=>this.state.characters[id]).filter(x=>x?.alive).length;
      const projectedLiving=livingCost(this.householdAssets(ph),this.state.priceIndex,this.cfg,projectedMembers);
      const pensionIncome=this.state.pensionIncomeByHousehold[ph.id]??0;
      // The pension has already been credited to cash. For the fallback test,
      // isolate retirement income so accumulated wealth does not erase the
      // intended "pension income < living cost" trigger.
      let gap=Math.max(0,projectedLiving-pensionIncome);
      if(gap<=0)continue;
      const parentIds=new Set(ph.memberIds.filter(id=>{const p=this.state.characters[id];return !!p&&p.alive&&p.ageStage>=7}));
      const children=this.alive().filter(c=>c.ageStage>=3&&c.ageStage<=6&&(this.parentCharactersOf(c).some(p=>parentIds.has(p.id))||c.parentsHouseholdId===ph.id));
      const workerHouseholds=[...new Set(children.map(c=>c.householdId))].map(id=>this.state.households[id]!).filter(h=>h?.active);
      for(const wh of workerHouseholds){
        if(gap<=0)break;
        const net=this.netIncome(wh),roundCap=Math.max(0,net*this.cfg.socialSecurity.parentSupportRate);
        const already=this.state.prepaidParentSupportByWorkerHousehold[wh.id]??0;
        const remainingCap=Math.max(0,roundCap-already);
        const available=Math.max(0,wh.sharedCash);
        const amount=Math.min(gap,remainingCap,available);
        if(amount<=0)continue;
        wh.sharedCash-=amount;
        ph.sharedCash+=amount;
        this.state.prepaidParentSupportByWorkerHousehold[wh.id]=(this.state.prepaidParentSupportByWorkerHousehold[wh.id]??0)+amount;
        this.chargeSharedCostToQuota(wh,amount);
        this.state.telemetry.cashFlow.parentSupportTransferred+=amount;
        this.state.telemetry.familyFlows.push({round:this.state.round,type:"parent_support",fromHouseholdId:wh.id,toHouseholdId:ph.id,amount});
        gap-=amount;
      }
    }
  }

  beginMandatoryPhase(){
    this.requirePhase("turn_order_ready");this.convertResourcesAfterTurnOrder();this.requirePhase("resources_converted");
    this.prefundChildSupportBeforeMandatory();this.prefundParentSupportBeforeMandatory();
    recoverScarceResourcesBeforeSubsidy(this);prepareGovernmentSubsidies(this);
    this.state.turnState.activeIndex=0;this.prepareCurrentTurnPhase();
  }

  /**
   * Xử lý nghĩa vụ theo đúng thứ tự turn order.
   * Character đã chết do household phá sản vẫn được coi là hoàn thành lượt nghĩa vụ.
   */
  private currentHouseholdRepresentative(c:Character){return this.household(c).representativeCharacterId===c.id}

  private prepareCurrentTurnPhase(){
    const entry=this.currentTurnEntry();if(!entry){this.state.turnState.phase="round_end";return}
    const c=this.state.characters[entry.characterId]!;if(!c.alive){this.advanceToNextTurn();return}
    const h=this.household(c);if(h.bankruptRound===this.state.round){this.advanceToNextTurn();return}
    if(!this.state.mandatoryResolvedHouseholds[h.id]&&this.currentHouseholdRepresentative(c))this.state.turnState.phase="mandatory";
    else this.state.turnState.phase="voluntary";
  }

  private advanceToNextTurn(){
    this.state.turnState.activeIndex++;
    if(this.state.turnState.activeIndex>=this.state.turnState.entries.length){if(!this.state.government.actedThisRound)runGovernmentTurn(this);this.state.turnState.activeIndex=0;this.state.turnState.phase="round_end";return}
    this.prepareCurrentTurnPhase();
  }

  resolveCurrentMandatory():boolean{
    this.requirePhase("mandatory");const c=this.currentTurnCharacter();if(!c)throw Error("no current turn");
    const survived=c.alive?this.resolveMandatory(c):false;this.state.turnState.completedMandatory.push(c.id);
    if(!survived||!c.alive){this.advanceToNextTurn();return false}
    this.state.turnState.phase="status";return true;
  }

  /**
   * Voluntary actions cũng đi theo cùng turn order.
   * Controller gọi action tùy ý rồi completeVoluntaryTurn().
   */
  completeVoluntaryTurn(){
    this.requirePhase("voluntary");const entry=this.currentTurnEntry();if(!entry)throw Error("no current turn");const c=this.state.characters[entry.characterId];
    if(c){this.state.turnState.completedVoluntary.push(c.id);for(const p of Object.values(this.state.birthProposals))if(p.round===this.state.round&&p.status==="pending"&&p.responderCharacterId===c.id)p.status="accepted"}
    this.advanceToNextTurn();
  }

  governmentTurnDueBeforeCurrentCharacter(){
    if(!["mandatory","status","voluntary"].includes(this.phase())||this.state.government.actedThisRound)return false;const pos=this.state.government.purchaseTurnPosition;if(pos==null)return false;return pos<=this.state.turnState.activeIndex+1;
  }

  runGovernmentTurn(){if(!["mandatory","status","voluntary"].includes(this.phase()))throw Error("government turn unavailable");runGovernmentTurn(this)}

  resourcePool(type:ResourceType){return type==="renewable"?this.state.pool:this.state.nonRenewablePool}
  resourceConfig(type:ResourceType,g:ResourceGrade){return resourceCfg(type,g,this.cfg)}
  resourceInterest(type:ResourceType,g:ResourceGrade){return this.resourceConfig(type,g).interest}
  marketPrice(g:ResourceGrade,type:ResourceType="renewable"){return marketPrice(g,type,this.alive().length,this.resourcePool(type),this.state.marketBounds,this.state.priceIndex,this.cfg)}


  householdAssets(h:Household){
    const funded=h.memberIds.reduce((sum,id)=>sum+(this.state.socialSecurity.personalBalances[id]??0),0);
    return h.sharedCash+this.householdResourceValue(h)+funded;
  }

  householdResourceValue(h:Household){
    let total=0;
    for(const type of ["renewable","nonrenewable"] as ResourceType[])for(const g of ["low","mid","high"] as ResourceGrade[]){const units=(type==="renewable"?h.sharedResources:h.sharedNonRenewableResources)[g];total+=resourceLiquidationValue(g,type,units,this.marketPrice(g,type),this.cfg)}
    return total;
  }

  socialTotalAssets(){
    const citizens=this.citizenTotalAssets();
    // Personal funded ASXH balances are already included in citizen Household Assets.
    const publicFunds=this.state.socialSecurity.payg+this.state.socialSecurity.support+this.state.socialSecurity.pensionReserve;
    const g=this.state.government;let gov=g.budget;for(const gr of ["low","mid","high"] as ResourceGrade[]){gov+=g.resourceHoldings[gr]*this.marketPrice(gr,"renewable")+g.nonRenewableHoldings[gr]*this.marketPrice(gr,"nonrenewable")}
    return citizens+publicFunds+gov;
  }

  private payFromSupportFund(amount:number,reason:string){const need=Math.max(0,amount);if(this.state.socialSecurity.support<need){const shortfall=need-this.state.socialSecurity.support;this.fundSocialSupport(shortfall*this.cfg.socialSecurity.supportStateBackstopShare,reason)}const paid=Math.min(need,Math.max(0,this.state.socialSecurity.support));this.state.socialSecurity.support-=paid;return paid}
  citizenTotalAssets(){return Object.values(this.state.households).filter(h=>h.active).reduce((s,h)=>s+this.householdAssets(h),0)}
  averageCitizenAssets(){const hs=Object.values(this.state.households).filter(h=>h.active);return hs.length?this.citizenTotalAssets()/hs.length:0}
  debtCeiling(){return this.citizenTotalAssets()*this.cfg.debt.ceilingCitizenAssetsShare}
  availableBorrowing(){return Math.max(0,this.debtCeiling()-this.state.debt)}
  borrowGovernment(amount:number,reason:string){const actual=Math.min(Math.max(0,amount),this.availableBorrowing());if(actual>0){this.state.debt+=actual;this.state.government.budget+=actual;this.state.government.borrowedThisRound+=actual;this.state.chronology.push(`[Vòng ${this.state.round}] Nhà nước vay ${actual.toFixed(2)} — ${reason}`)}if(actual+1e-6<amount)this.state.government.fiscalCrisis=true;return actual}
  fundSocialSupport(amount:number,reason:string){
    const need=Math.max(0,amount);let funded=0;
    const fromBudget=Math.min(need,Math.max(0,this.state.government.budget-this.state.government.reserveFloor));
    this.state.government.budget-=fromBudget;this.state.government.spendingThisRound+=fromBudget;funded+=fromBudget;
    const remaining=need-funded;
    if(remaining>0){const borrowed=this.borrowGovernment(remaining,reason);this.state.government.budget-=borrowed;this.state.government.spendingThisRound+=borrowed;funded+=borrowed;}
    this.state.socialSecurity.support+=funded;return funded;
  }
  fundPensionBackstop(amount:number,reason:string){
    const need=Math.max(0,amount);let funded=0;const available=Math.max(0,this.state.government.budget-this.state.government.reserveFloor);const fromBudget=Math.min(need,available);this.state.government.budget-=fromBudget;this.state.government.spendingThisRound+=fromBudget;funded+=fromBudget;
    if(funded<need){const borrowed=this.borrowGovernment(need-funded,reason);this.state.government.budget-=borrowed;this.state.government.spendingThisRound+=borrowed;funded+=borrowed}return funded;
  }

  netIncome(h:Household){
    return this.state.realizedNetIncomeByHousehold[h.id]??0;
  }

  economicIncomeFactor(){
    let factor=1; const reasons:string[]=[]; const c=this.cfg.economicIncomeFactor;
    if(this.state.eventName==="Khủng hoảng tài chính"){factor+=c.financialCrisis;reasons.push(`Khủng hoảng tài chính ${(c.financialCrisis*100).toFixed(0)}%`)}
    if(this.state.eventName==="Bùng nổ công nghệ"){factor+=c.techBoom;reasons.push(`Bùng nổ công nghệ +${(c.techBoom*100).toFixed(0)}%`)}
    if(this.state.government.fiscalCrisis){factor+=c.fiscalCrisis;reasons.push(`Khủng hoảng tài khóa ${(c.fiscalCrisis*100).toFixed(0)}%`)}
    const ceiling=Math.max(1,this.debtCeiling()),debtRatio=this.state.debt/ceiling;
    if(debtRatio>=.95){factor+=c.debtStress95;reasons.push(`Nợ công ≥95% trần ${(c.debtStress95*100).toFixed(0)}%`)}
    else if(debtRatio>=.80){factor+=c.debtStress80;reasons.push(`Nợ công ≥80% trần ${(c.debtStress80*100).toFixed(0)}%`)}
    const renewableRatio=(["low","mid","high"] as ResourceGrade[]).reduce((a,g)=>a+this.state.pool[g]/this.cfg.resource[g].carryingCapacity,0)/3;
    if(renewableRatio<.45){factor+=c.scarcitySevere;reasons.push(`Khan hiếm tài nguyên nghiêm trọng ${(c.scarcitySevere*100).toFixed(0)}%`)}
    else if(renewableRatio<.65){factor+=c.scarcityModerate;reasons.push(`Khan hiếm tài nguyên ${(c.scarcityModerate*100).toFixed(0)}%`)}
    else if(renewableRatio>.85&&!this.state.government.fiscalCrisis&&this.state.eventName!=="Khủng hoảng tài chính"){factor+=c.favorable;reasons.push(`Điều kiện sản xuất thuận lợi +${(c.favorable*100).toFixed(0)}%`)}
    factor=Math.max(c.min,Math.min(c.max,factor));
    return{factor,reasons:reasons.length?reasons:["Điều kiện cơ sở"]};
  }

  /**
   * Quy đổi tài nguyên diễn ra ở đầu vòng, sau khi xếp lượt và trước nghĩa vụ.
   * Toàn bộ tài nguyên đang nắm giữ được bán theo giá thị trường hiện tại × (1 + lãi hiện hành).
   */
  convertHouseholdResourcesToCash(h:Household):number{
    const eif=this.economicIncomeFactor();
    let proceeds=0,failed=0;
    const remaining:ResourceLot[]=[];
    const soldUnits:{renewable:Resources;nonrenewable:Resources}={renewable:empty(),nonrenewable:empty()};
    for(const lot of h.investmentLots){
      const buyer=lot.buyerCharacterId?this.state.characters[lot.buyerCharacterId]:null;
      const canProduce=!!buyer&&buyer.alive&&buyer.ageStage>=3&&buyer.ageStage<=6&&lot.purchaseRound<this.state.round;
      if(!canProduce){remaining.push(lot);continue}
      const previous=this.state.realizedNetIncomeByCharacter[buyer!.id]??0;
      const fail=this.random()<this.cfg.investmentFailureRate[lot.grade];
      soldUnits[lot.type][lot.grade]+=lot.units;
      if(fail){failed++;this.state.realizedNetIncomeByCharacter[buyer!.id]=previous;continue}
      let sale=lot.units*this.marketPrice(lot.grade,lot.type)*(1+Math.max(0,this.resourceInterest(lot.type,lot.grade)+this.state.eventInterestDelta));
      if((lot.purchaseAgeStage??99)<=2)sale*=1.2;
      sale*=eif.factor;proceeds+=sale;
      this.state.realizedNetIncomeByCharacter[buyer!.id]=previous+Math.max(0,sale-lot.costBasis);
    }
    h.investmentLots=remaining;
    for(const g of ["low","mid","high"] as ResourceGrade[]){
      h.sharedResources[g]=Math.max(0,h.sharedResources[g]-soldUnits.renewable[g]);
      h.sharedNonRenewableResources[g]=Math.max(0,h.sharedNonRenewableResources[g]-soldUnits.nonrenewable[g]);
      h.sharedResourceCostBasis[g]=remaining.filter(l=>l.type==="renewable"&&l.grade===g).reduce((a,l)=>a+l.costBasis,0);
      h.sharedNonRenewableResourceCostBasis[g]=remaining.filter(l=>l.type==="nonrenewable"&&l.grade===g).reduce((a,l)=>a+l.costBasis,0);
    }
    h.sharedCash+=proceeds;this.state.telemetry.cashFlow.laborProceeds+=proceeds;
    const householdNet=h.memberIds.reduce((a,id)=>a+(this.state.realizedNetIncomeByCharacter[id]??0),0);
    this.state.realizedNetIncomeByHousehold[h.id]=householdNet;
    if(proceeds||failed)this.state.chronology.push(`[Vòng ${this.state.round}] Sản xuất hộ ${h.id}: +${proceeds.toFixed(2)} | EIF ${eif.factor.toFixed(2)} | ${failed} lô thất bại | Thu nhập ròng ${householdNet.toFixed(2)}`);
    return proceeds;
  }

  /**
   * Gọi sau bước xếp lượt: mỗi household chỉ quy đổi một lần.
   */
  convertResourcesAfterTurnOrder(){
    this.requirePhase("turn_order_ready");const eif=this.economicIncomeFactor();this.state.economicIncomeFactor=eif.factor;this.state.economicIncomeReasons=eif.reasons;this.state.telemetry.incomeFactor.rounds.push({round:this.state.round,factor:eif.factor,reasons:[...eif.reasons]});
    convertGovernmentResources(this);for(const h of Object.values(this.state.households).filter(x=>x.active))this.convertHouseholdResourcesToCash(h);
    // Rule Ledger snapshots are taken once after automatic production and before mandatory transfers/spending.
    this.state.roundAverageAssetsSnapshot=this.averageCitizenAssets();
    for(const h of Object.values(this.state.households).filter(x=>x.active)){
      h.roundStartAssets=this.householdAssets(h);h.sharedQuotaCharge=0;
      const members=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive);
      for(const c of members)this.state.spendingLimitByCharacter[c.id]=this.isMarried(c)?h.roundStartAssets*.5:h.roundStartAssets;
    }
    this.state.turnState.phase="resources_converted";
  }

  mandatoryBreakdown(c:Character,net:number){
    const h=this.household(c);
    if(this.state.mandatoryResolvedHouseholds[h.id])return{living:0,socialContribution:0,tax:0,childSupport:0,parentSupport:0,grief:0,medical:0,total:0};
    const livingMembers=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive);
    const workers=livingMembers.filter(x=>x.ageStage>=3&&x.ageStage<=6);
    const societyNet=Object.values(this.state.realizedNetIncomeByCharacter).reduce((a,b)=>a+b,0);
    const b={living:livingCost(this.householdAssets(h),this.state.priceIndex,this.cfg,livingMembers.length),socialContribution:0,tax:0,childSupport:0,parentSupport:0,grief:0,medical:this.state.epidemicMedicalCostPerCharacter*livingMembers.length,total:0};
    for(const w of workers){
      const personalNet=Math.max(0,this.state.realizedNetIncomeByCharacter[w.id]??0);
      b.socialContribution+=personalNet*this.cfg.socialSecurity.workerContributionRate;
      b.tax+=taxPerPerson(this,personalNet,societyNet);
    }
    b.grief=livingMembers.reduce((sum,x)=>sum+x.griefFeeDue*nominal(this.cfg.griefFee.base,this.state.priceIndex),0);
    b.total=b.living+b.socialContribution+b.tax+b.grief+b.medical;
    return b;
  }

  mandatoryTotal(c:Character,net:number){return this.mandatoryBreakdown(c,net).total}

  mandatoryQuote(c:Character){
    const h=this.household(c),netIncome=this.netIncome(h),breakdown=this.mandatoryBreakdown(c,netIncome),cashBefore=h.sharedCash;
    let liquidationProceeds=0;
    if(cashBefore<breakdown.total)for(const type of ["renewable","nonrenewable"] as ResourceType[])for(const grade of ["low","mid","high"] as ResourceGrade[]){const inventory=(type==="renewable"?h.sharedResources:h.sharedNonRenewableResources)[grade];liquidationProceeds+=inventory*this.marketPrice(grade,type)*this.cfg.market.liquidationFactor}
    const cashAfterLiquidation=cashBefore+liquidationProceeds,projectedBankruptcy=cashAfterLiquidation<breakdown.total;
    const keys=["living","socialContribution","tax","childSupport","parentSupport","grief","medical"] as const;
    const dominantCost=keys.reduce((a,key)=>breakdown[key]>breakdown[a]?key:a,"living" as typeof keys[number]);
    return{breakdown:{...breakdown},netIncome,cashBefore,liquidationRequired:cashBefore<breakdown.total,liquidationProceeds,cashAfterLiquidation,projectedBankruptcy,shortfall:Math.max(0,breakdown.total-cashAfterLiquidation),dominantCost};
  }

  private distributeMandatoryFlows(h:Household,_net:number){
    const livingMembers=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive);
    const workers=livingMembers.filter(x=>x.ageStage>=3&&x.ageStage<=6);
    const societyNet=Object.values(this.state.realizedNetIncomeByCharacter).reduce((a,b)=>a+b,0);
    let taxTotal=0;
    for(const w of workers){
      const personalNet=Math.max(0,this.state.realizedNetIncomeByCharacter[w.id]??0);
      const contribution=socialContribution(personalNet,this.cfg);
      this.state.socialSecurity.personalBalances[w.id]=(this.state.socialSecurity.personalBalances[w.id]??0)+contribution.personal;
      this.state.socialSecurity.payg+=contribution.payg;this.state.socialSecurity.support+=contribution.support;
      const tax=taxPerPerson(this,personalNet,societyNet);taxTotal+=tax;this.state.government.taxPaidByCharacter[w.id]=(this.state.government.taxPaidByCharacter[w.id]??0)+tax;
    }
    this.state.government.budget+=taxTotal;this.state.government.taxCollectedThisRound+=taxTotal;
    for(const x of livingMembers)x.griefFeeDue=0;
  }

  resolveMandatory(c:Character){
    const h=this.household(c);
    if(this.state.mandatoryResolvedHouseholds[h.id])return true;
    const quote=this.mandatoryQuote(c),net=quote.netIncome,breakdown=quote.breakdown,need=breakdown.total;
    const cashBefore=quote.cashBefore,assetsBefore=this.householdAssets(h);
    let proceeds=0;
    if(h.sharedCash<need){
      proceeds=quote.liquidationProceeds;
      h.sharedCash+=proceeds;this.state.telemetry.cashFlow.liquidationProceeds+=proceeds;h.sharedResources=empty();h.sharedResourceCostBasis=empty();h.sharedNonRenewableResources=empty();h.sharedNonRenewableResourceCostBasis=empty();h.investmentLots=[];
      if(proceeds>0)this.state.chronology.push(`[Vòng ${this.state.round}] Thanh lý tài nguyên: ${proceeds.toFixed(2)}`);
      if(h.sharedCash<need){
        const keys=["living","socialContribution","tax","childSupport","parentSupport","grief","medical"] as const;
        const dominant=keys.reduce((a,k)=>breakdown[k]>breakdown[a]?k:a,"living" as typeof keys[number]);
        this.state.telemetry.bankruptcyRecords.push({round:this.state.round,householdId:h.id,stages:h.memberIds.map(id=>this.state.characters[id]).filter(x=>x?.alive).map(x=>x!.ageStage),status:h.status,cashBefore,assetsBefore,netIncome:net,liquidationProceeds:proceeds,need,shortfall:need-h.sharedCash,dominantCost:dominant,breakdown:{...breakdown}});
        this.bankruptHousehold(h);this.state.mandatoryResolvedHouseholds[h.id]=true;return false;
      }
    }
    h.sharedCash-=need;this.state.telemetry.cashFlow.mandatoryPaid+=need;this.chargeSharedCostToQuota(h,need);
    this.distributeMandatoryFlows(h,net);this.state.mandatoryResolvedHouseholds[h.id]=true;return true;
  }

  /**
   * Chỉ người chưa kết hôn, không phải trẻ em, còn sống mới được gửi/nhận đề nghị.
   */
  proposeMarriage(proposer:Character,target:Character):MarriageProposal{
    if(!proposer.alive||!target.alive)throw Error("dead character cannot marry");if(!this.isAdult(proposer)||!this.isAdult(target))throw Error("children cannot marry");if(this.isMarried(proposer)||this.isMarried(target)||this.hasAcceptedMarriagePending(proposer)||this.hasAcceptedMarriagePending(target))throw Error("already married or marriage pending settlement");if(proposer.id===target.id)throw Error("cannot propose to self");if(this.areCloseFamily(proposer,target))throw Error("close family cannot marry");
    if(this.currentTurnCharacter()?.id===proposer.id&&["mandatory","status","voluntary"].includes(this.phase()))throw Error("cannot send marriage proposal during own turn");
    const outgoingPending=Object.values(this.state.marriageProposals).find(p=>p.status==="pending"&&p.proposerCharacterId===proposer.id);if(outgoingPending)throw Error("character already has outgoing pending marriage proposal");
    const proposal:MarriageProposal={id:`proposal-${crypto.randomUUID()}`,proposerCharacterId:proposer.id,targetCharacterId:target.id,status:"pending",createdRound:this.state.round,acceptedRound:null};this.state.marriageProposals[proposal.id]=proposal;this.state.telemetry.marriage.proposals++;return proposal;
  }

  private marriageProposalStillEligible(p:MarriageProposal){
    const proposer=this.state.characters[p.proposerCharacterId],target=this.state.characters[p.targetCharacterId];
    if(!proposer||!target||!proposer.alive||!target.alive||!this.isAdult(proposer)||!this.isAdult(target))return false;
    if(proposer.id===target.id||proposer.householdId===target.householdId||this.isMarried(proposer)||this.isMarried(target)||this.areCloseFamily(proposer,target))return false;
    return !Object.values(this.state.marriageProposals).some(x=>x.id!==p.id&&x.status==="accepted"&&(x.proposerCharacterId===proposer.id||x.targetCharacterId===proposer.id||x.proposerCharacterId===target.id||x.targetCharacterId===target.id));
  }

  private invalidateMarriageProposalsForCharacter(characterId:string){
    for(const p of Object.values(this.state.marriageProposals))if((p.status==="pending"||p.status==="accepted")&&(p.proposerCharacterId===characterId||p.targetCharacterId===characterId))p.status="invalidated";
  }

  respondMarriage(proposalId:string,accept:boolean):MarriageProposal{
    const p=this.state.marriageProposals[proposalId];if(!p||p.status!=="pending")throw Error("invalid marriage proposal");
    if(!this.marriageProposalStillEligible(p)){p.status="invalidated";return p}
    if(!accept){p.status="rejected";this.state.telemetry.marriage.rejected++;return p}
    const proposer=this.state.characters[p.proposerCharacterId]!,target=this.state.characters[p.targetCharacterId]!;
    p.status="accepted";p.acceptedRound=this.state.round;this.state.telemetry.marriage.accepted++;const pair=[proposer.ageStage,target.ageStage].sort((a,b)=>a-b).join("-");this.state.telemetry.marriage.stagePairs[pair]=(this.state.telemetry.marriage.stagePairs[pair]??0)+1;
    // The first valid accept in authoritative server order binds both Characters.
    for(const other of Object.values(this.state.marriageProposals))if(other.id!==p.id&&other.status==="pending"&&[other.proposerCharacterId,other.targetCharacterId].some(id=>id===proposer.id||id===target.id))other.status="invalidated";
    return p;
  }

  cancelMarriageProposal(proposer:Character,proposalId:string):MarriageProposal{
    const p=this.state.marriageProposals[proposalId];if(!p||p.status!=="pending")throw Error("invalid marriage proposal");if(p.proposerCharacterId!==proposer.id)throw Error("only proposer can cancel marriage proposal");p.status="cancelled";return p;
  }

  private assertVoluntarySpendAllowed(c:Character,amount:number){
    if(amount<0)throw Error("invalid spend");const limit=this.state.spendingLimitByCharacter[c.id];if(limit==null)return;const spent=(this.state.voluntarySpentByCharacter[c.id]??0)+(this.state.sharedQuotaChargeByCharacter[c.id]??0);if(spent+amount>limit+1e-9)throw Error("action exceeds 50% start-of-round household-asset cap");
  }

  voluntarySpendingRemaining(c:Character){
    const limit=this.state.spendingLimitByCharacter[c.id];if(limit==null)return Number.POSITIVE_INFINITY;
    return Math.max(0,limit-(this.state.voluntarySpentByCharacter[c.id]??0)-(this.state.sharedQuotaChargeByCharacter[c.id]??0));
  }

  private quotedResourceCost(type:ResourceType,g:ResourceGrade,units:number){
    const grossCost=this.marketPrice(g,type)*units;
    return grossCost-quoteResourceSubsidy(this,g,grossCost);
  }

  marketPurchaseQuote(c:Character,type:ResourceType,g:ResourceGrade){
    const h=this.household(c),allowed:Record<Status,ResourceGrade[]>={poor:["low"],middle:["low","mid"],noble:["low","mid","high"]};
    const pool=Math.max(0,Math.floor(this.resourcePool(type)[g])),price=this.marketPrice(g,type),spendingRemaining=this.voluntarySpendingRemaining(c);
    if(!allowed[h.status].includes(g))return{resourceType:type,grade:g,price,purchasableMax:null,unavailableReason:"MARKET_GRADE_LOCKED" as const};
    if(pool<=0)return{resourceType:type,grade:g,price,purchasableMax:null,unavailableReason:"MARKET_OUT_OF_SUPPLY" as const};
    let low=0,high=pool;
    while(low<high){const mid=Math.ceil((low+high)/2),cost=this.quotedResourceCost(type,g,mid);if(cost<=h.sharedCash+1e-9&&cost<=spendingRemaining+1e-9)low=mid;else high=mid-1}
    if(low<=0){const oneCost=this.quotedResourceCost(type,g,1),reason=oneCost>h.sharedCash+1e-9?"MARKET_INSUFFICIENT_CASH":"MARKET_SPENDING_LIMIT_REACHED";return{resourceType:type,grade:g,price,purchasableMax:null,unavailableReason:reason as "MARKET_INSUFFICIENT_CASH"|"MARKET_SPENDING_LIMIT_REACHED"}}
    return{resourceType:type,grade:g,price,purchasableMax:low,unavailableReason:null};
  }

  private recordVoluntarySpend(c:Character,amount:number){
    this.state.voluntarySpentByCharacter[c.id]=(this.state.voluntarySpentByCharacter[c.id]??0)+amount;
  }

  private chargeSharedCostToQuota(h:Household,amount:number){
    const adults=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive&&x.ageStage>=3);if(!adults.length)return;const share=amount/adults.length;for(const c of adults)this.state.sharedQuotaChargeByCharacter[c.id]=(this.state.sharedQuotaChargeByCharacter[c.id]??0)+share;h.sharedQuotaCharge+=amount;
  }

  private refundSharedCostFromQuota(h:Household,amount:number){
    if(amount<=0)return;const adults=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive&&x.ageStage>=3);if(!adults.length)return;const share=amount/adults.length;for(const c of adults)this.state.sharedQuotaChargeByCharacter[c.id]=Math.max(0,(this.state.sharedQuotaChargeByCharacter[c.id]??0)-share);h.sharedQuotaCharge=Math.max(0,h.sharedQuotaCharge-amount);
  }

  autoSelectStatusForCurrent(){
    this.requirePhase("status");const c=this.currentTurnCharacter();if(!c)throw Error("no current turn");const h=this.household(c);const candidates:Status[]=h.status==="noble"?["noble","middle","poor"]:h.status==="middle"?["middle","poor"]:["poor"];let chosen:Status="poor";for(const st of candidates){if(this.statusFeeQuote(c,st).affordable){chosen=st;break}}return this.setStatus(c,chosen);
  }

  statusFeeQuote(c:Character,status:Status){
    const h=this.household(c),personsCharged=this.isCoupleHousehold(h)?2:1,fee=statusFee(status,this.state.roundAverageAssetsSnapshot,this.state.priceIndex,this.cfg)*personsCharged;
    const affordable=h.sharedCash+1e-9>=fee;
    return{status,fee,personsCharged,affordable,unavailableReason:affordable?null:"STATUS_INSUFFICIENT_CASH" as const};
  }

  statusSelectionQuote(c:Character){
    const h=this.household(c),cards=(["poor","middle","noble"] as Status[]).map(status=>this.statusFeeQuote(c,status));
    const slotsTotal=Math.ceil(this.alive().length*this.cfg.status.noblePopulationShare),slotsRequired=Math.max(1,h.memberIds.filter(id=>this.state.characters[id]?.alive).length);
    const pendingNobleSlots=Object.values(this.state.households).filter(x=>x.active&&x.pendingStatus==="noble").reduce((sum,x)=>sum+x.memberIds.filter(id=>this.state.characters[id]?.alive).length,0);
    const nobleFee=cards.find(x=>x.status==="noble")!.fee,middleFallbackFee=statusFee("middle",this.state.roundAverageAssetsSnapshot,this.state.priceIndex,this.cfg)*slotsRequired;
    const turnCard=this.state.turnState.entries.find(entry=>entry.characterId===h.representativeCharacterId)?.card??null;
    return{roundAverageAssets:this.state.roundAverageAssetsSnapshot,priceIndex:this.state.priceIndex,cards,nobleCompetition:{slotsTotal,slotsRequired,pendingNobleSlots,incumbent:h.status==="noble",householdAssets:this.householdAssets(h),turnCard,priority:["incumbent","householdAssets","turnCard"] as const,allocationTiming:"end_of_round" as const,fallbackStatus:"middle" as const,middleFallbackFee,potentialRefund:Math.max(0,nobleFee-middleFallbackFee)}};
  }

  setStatus(c:Character,status:Status){
    this.requirePhase("status");const h=this.household(c);if(h.representativeCharacterId!==c.id)throw Error("only household representative can buy status");const fee=this.statusFeeQuote(c,status).fee;if(h.sharedCash+1e-9<fee)throw Error("insufficient cash for status");
    h.sharedCash-=fee;h.pendingStatus=status;h.pendingStatusPaid=fee;h.pendingStatusPurchaserId=c.id;this.state.statusPurchases[h.id]={householdId:h.id,requested:status,paid:fee,purchaserCharacterId:c.id,round:this.state.round};this.chargeSharedCostToQuota(h,fee);this.state.turnState.phase="voluntary";return status;
  }

  buyResource(c:Character,g:ResourceGrade,u:number,type:ResourceType="renewable"){
    this.requirePhase("voluntary");const h=this.household(c);const allowed:Record<Status,ResourceGrade[]>={poor:["low"],middle:["low","mid"],noble:["low","mid","high"]};if(!allowed[h.status].includes(g))throw Error("resource grade not allowed");
    if(!Number.isFinite(u)||u<=0)throw Error("invalid resource units");
    const pool=this.resourcePool(type),grossCost=this.marketPrice(g,type)*u;
    if(u>pool[g])throw Error("insufficient resource pool");
    const quotedSubsidy=quoteResourceSubsidy(this,g,grossCost),quotedCost=grossCost-quotedSubsidy;
    this.assertVoluntarySpendAllowed(c,quotedCost);
    if(h.sharedCash<quotedCost)throw Error("insufficient cash");
    const subsidy=applyResourceSubsidy(this,g,type,grossCost),cost=grossCost-subsidy;
    h.sharedCash-=cost;this.state.telemetry.cashFlow.resourcePurchases+=cost;const inv=type==="renewable"?h.sharedResources:h.sharedNonRenewableResources;const basis=type==="renewable"?h.sharedResourceCostBasis:h.sharedNonRenewableResourceCostBasis;inv[g]+=u;basis[g]+=cost;h.investmentLots.push({type,grade:g,units:u,costBasis:cost,purchaseRound:this.state.round,buyerCharacterId:c.id,purchaseAgeStage:c.ageStage});this.recordVoluntarySpend(c,cost);pool[g]-=u;return cost;
  }

  /**
   * Đầu tư phục hồi ở vòng r KHÔNG cộng pool ngay.
   * Số đơn vị được đưa vào pendingRecovery và chỉ cộng ở đầu vòng r+1.
   */
  investRecovery(c:Character,g:ResourceGrade,u:number){
    this.requirePhase("voluntary");
    const h=this.household(c);
    if(!Number.isFinite(u)||u<=0)throw Error("invalid recovery units");
    const quote=this.recoveryQuote(g),accepted=Math.min(u,quote.capacityRemaining);
    if(accepted<=0)throw Error("ecosystem already at carrying capacity");
    const cost=quote.costPerUnit*accepted;
    this.assertVoluntarySpendAllowed(c,cost);
    if(h.sharedCash<cost)throw Error("recovery investment exceeds limit");
    h.sharedCash-=cost;this.state.telemetry.cashFlow.recoverySpending+=cost;
    this.recordVoluntarySpend(c,cost);
    this.state.pendingRecovery[g]+=accepted;
    this.state.chronology.push(`[Vòng ${this.state.round}] Hộ ${h.id} đầu tư phục hồi ${accepted} ${g}, hiệu lực vòng sau`);
    return cost;
  }

  recoveryQuote(g:ResourceGrade){
    const currentPool=this.state.pool[g],pendingNextRound=this.state.pendingRecovery[g],carryingCapacity=this.cfg.resource[g].carryingCapacity;
    return{grade:g,currentPool,carryingCapacity,pendingNextRound,capacityRemaining:Math.max(0,carryingCapacity-currentPool-pendingNextRound),costPerUnit:this.marketPrice(g)*this.cfg.recovery.marketPriceRate*this.state.recoveryCostMultiplier};
  }

  recoveryActionQuote(c:Character,g:ResourceGrade){
    const quote=this.recoveryQuote(g),h=this.household(c),spendingRemaining=this.voluntarySpendingRemaining(c),capacity=Math.max(0,Math.floor(quote.capacityRemaining));
    if(capacity<=0)return{...quote,acceptedMax:null,unavailableReason:"RECOVERY_AT_CAPACITY" as const};
    const financialMax=quote.costPerUnit<=0?capacity:Math.floor(Math.min(h.sharedCash,spendingRemaining)/quote.costPerUnit+1e-9),acceptedMax=Math.min(capacity,Math.max(0,financialMax));
    if(acceptedMax<=0){const reason=h.sharedCash+1e-9<quote.costPerUnit?"RECOVERY_INSUFFICIENT_CASH":"RECOVERY_SPENDING_LIMIT_REACHED";return{...quote,acceptedMax:null,unavailableReason:reason as "RECOVERY_INSUFFICIENT_CASH"|"RECOVERY_SPENDING_LIMIT_REACHED"}}
    return{...quote,acceptedMax,unavailableReason:null};
  }

  isEligibleVoluntarySupportTarget(c:Character,target:Character){
    return c.alive&&target.alive&&(c.childrenIds.includes(target.id)||target.childrenIds.includes(c.id));
  }

  supportTransferQuote(c:Character,target:Character){
    if(!this.isEligibleVoluntarySupportTarget(c,target))return{transferableMax:null,unavailableReason:"SUPPORT_TARGET_INELIGIBLE" as const};
    const h=this.household(c),spendingRemaining=this.voluntarySpendingRemaining(c),transferableMax=Math.max(0,Math.min(h.sharedCash,spendingRemaining));
    if(transferableMax<=0){const reason=h.sharedCash<=1e-9?"SUPPORT_INSUFFICIENT_CASH":"SUPPORT_SPENDING_LIMIT_REACHED";return{transferableMax:null,unavailableReason:reason as "SUPPORT_INSUFFICIENT_CASH"|"SUPPORT_SPENDING_LIMIT_REACHED"}}
    return{transferableMax,unavailableReason:null};
  }

  voluntaryFamilySupport(c:Character,target:Character,amount:number){
    this.requirePhase("voluntary");if(!c.alive||!target.alive)throw Error("dead character");if(!this.isEligibleVoluntarySupportTarget(c,target))throw Error("support limited to direct parent-child relations");if(!Number.isFinite(amount)||amount<=0)throw Error("invalid support amount");this.assertVoluntarySpendAllowed(c,amount);const from=this.household(c),to=this.household(target);if(from.sharedCash<amount)throw Error("insufficient cash");from.sharedCash-=amount;to.sharedCash+=amount;this.recordVoluntarySpend(c,amount);this.state.telemetry.familyFlows.push({round:this.state.round,type:"voluntary_support",fromHouseholdId:from.id,toHouseholdId:to.id,amount});return amount;
  }

  respondBirthProposal(c:Character,proposalId:string,accept:boolean){
    this.requirePhase("voluntary");const p=this.state.birthProposals[proposalId];if(!p||p.status!=="pending")throw Error("invalid birth proposal");if(p.responderCharacterId!==c.id)throw Error("not responder");p.status=accept?"accepted":"rejected";return p;
  }

  applyPendingRecoveryAtRoundStart(){
    const p=this.state.pendingRecovery;
    this.state.pool.low=Math.min(this.cfg.resource.low.carryingCapacity,this.state.pool.low+p.low);
    this.state.pool.mid=Math.min(this.cfg.resource.mid.carryingCapacity,this.state.pool.mid+p.mid);
    this.state.pool.high=Math.min(this.cfg.resource.high.carryingCapacity,this.state.pool.high+p.high);
    if(p.low||p.mid||p.high){
      this.state.chronology.push(`[Vòng ${this.state.round}] Phục hồi đầu vòng: +${p.low}/${p.mid}/${p.high}`);
    }
    this.state.pendingRecovery=empty();
  }

  marry(a:Character,b:Character){
    if(a.ageStage<3||b.ageStage<3||a.householdId===b.householdId)throw Error("invalid marriage");
    const ha=this.household(a),hb=this.household(b);if(!ha.active||!hb.active)throw Error("inactive household");
    const purchaseA=this.state.statusPurchases[ha.id],purchaseB=this.state.statusPurchases[hb.id];
    const rank:Record<Status,number>={poor:0,middle:1,noble:2};
    const desired=rank[ha.pendingStatus??ha.status]>=rank[hb.pendingStatus??hb.status]?(ha.pendingStatus??ha.status):(hb.pendingStatus??hb.status);
    const paidBeforeMerge=ha.pendingStatusPaid+hb.pendingStatusPaid;

    ha.memberIds.push(...hb.memberIds);ha.sharedCash+=hb.sharedCash;
    for(const g of ["low","mid","high"] as ResourceGrade[]){ha.sharedResources[g]+=hb.sharedResources[g];ha.sharedResourceCostBasis[g]+=hb.sharedResourceCostBasis[g];ha.sharedNonRenewableResources[g]+=hb.sharedNonRenewableResources[g];ha.sharedNonRenewableResourceCostBasis[g]+=hb.sharedNonRenewableResourceCostBasis[g]}
    ha.investmentLots.push(...hb.investmentLots);hb.investmentLots=[];ha.childrenIds=[...new Set([...ha.childrenIds,...hb.childrenIds])];
    for(const id of hb.memberIds)this.state.characters[id]!.householdId=ha.id;hb.active=false;

    let resolved=desired;let required=statusFee(resolved,this.state.roundAverageAssetsSnapshot,this.state.priceIndex,this.cfg)*2;
    if(ha.sharedCash+paidBeforeMerge+1e-9<required){resolved=resolved==="noble"?"middle":"poor";required=statusFee(resolved,this.state.roundAverageAssetsSnapshot,this.state.priceIndex,this.cfg)*2;if(ha.sharedCash+paidBeforeMerge+1e-9<required){resolved="poor";required=0}}
    const delta=required-paidBeforeMerge;let mergeRefund=0;
    if(delta>0){ha.sharedCash-=delta;this.chargeSharedCostToQuota(ha,delta)}
    else if(delta<0){mergeRefund=-delta;ha.sharedCash+=mergeRefund;this.refundSharedCostFromQuota(ha,mergeRefund)}
    ha.pendingStatus=resolved;ha.pendingStatusPaid=required;ha.pendingStatusPurchaserId=ha.pendingStatusPurchaserId??hb.pendingStatusPurchaserId??ha.representativeCharacterId;ha.status=rank[ha.status]>=rank[hb.status]?ha.status:hb.status;

    if(purchaseA)delete this.state.statusPurchases[ha.id];if(purchaseB)delete this.state.statusPurchases[hb.id];
    if(paidBeforeMerge>0||resolved!==ha.status){
      this.state.statusPurchases[ha.id]={householdId:ha.id,requested:desired,paid:required,purchaserCharacterId:ha.pendingStatusPurchaserId??a.id,round:this.state.round,resolvedStatus:resolved!==desired?resolved:undefined,refund:mergeRefund||undefined};
    }
    applyMarriageResidence(this.state,a,b);
  }

  canInitiateBirth(h:Household){
    if(this.phase()!=="voluntary")return false;
    const proposer=this.currentTurnCharacter();
    if(!proposer||proposer.householdId!==h.id||h.representativeCharacterId!==proposer.id)return false;
    if(!this.isCoupleHousehold(h))return false;
    const spouses=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive&&x.ageStage>=3);
    if(spouses.length!==2||!spouses.every(x=>this.isWorkerAge(x)))return false;
    const existing=Object.values(this.state.birthProposals).filter(p=>p.householdId===h.id&&p.round===this.state.round&&!["cancelled","invalidated"].includes(p.status));
    return existing.length<this.state.eventBirthLimit;
  }

  birthSelectionQuote(c:Character){
    const h=this.household(c),current=this.currentTurnCharacter(),ownsCurrent=current?.id===c.id,representative=h.representativeCharacterId===c.id;
    const spouses=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive&&x.ageStage>=3),couple=this.isCoupleHousehold(h),workerAges=couple&&spouses.length===2&&spouses.every(x=>this.isWorkerAge(x));
    const proposals=Object.values(this.state.birthProposals).filter(p=>p.householdId===h.id&&p.round===this.state.round).sort((a,b)=>a.index-b.index),activeForCap=proposals.filter(p=>!["cancelled","invalidated"].includes(p.status)),maxProposals=this.state.eventBirthLimit;
    let unavailableReason:string|null=null;
    if(this.phase()!=="voluntary")unavailableReason="BIRTH_NOT_VOLUNTARY";
    else if(!ownsCurrent)unavailableReason="BIRTH_NOT_CURRENT_TURN";
    else if(!representative)unavailableReason="BIRTH_REPRESENTATIVE_ONLY";
    else if(!couple)unavailableReason="BIRTH_REQUIRES_COUPLE";
    else if(!workerAges)unavailableReason="BIRTH_WORKER_AGE_REQUIRED";
    else if(activeForCap.length>=maxProposals)unavailableReason="BIRTH_PROPOSAL_LIMIT_REACHED";
    const canInitiate=unavailableReason===null;
    const slots=Array.from({length:maxProposals},(_,i)=>{const index=i+1,proposal=activeForCap.find(p=>p.index===index)??null;return{index,proposalId:proposal?.id??null,status:proposal?.status??"available",available:proposal===null&&canInitiate,unavailableReason:proposal?"BIRTH_SLOT_ALREADY_USED":proposal===null&&!canInitiate?unavailableReason:null}});
    return{maxProposals,promotionalThirdSlot:maxProposals===3,canInitiate,unavailableReason,slots,outgoingProposals:proposals.filter(p=>p.proposerCharacterId===c.id).map(p=>({...p}))};
  }

  attemptBirth(h:Household){
    this.requirePhase("voluntary");const proposer=this.currentTurnCharacter();if(!proposer||proposer.householdId!==h.id)throw Error("not household turn");if(h.representativeCharacterId!==proposer.id)throw Error("only first spouse can propose birth");if(!this.canInitiateBirth(h))return null;const spouses=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive&&x.ageStage>=3);const existing=Object.values(this.state.birthProposals).filter(p=>p.householdId===h.id&&p.round===this.state.round&&!["cancelled","invalidated"].includes(p.status));const responder=spouses.find(x=>x.id!==proposer.id)!;const proposal={id:`birth-${crypto.randomUUID()}`,householdId:h.id,index:existing.length+1,proposerCharacterId:proposer.id,responderCharacterId:responder.id,status:"pending" as const,round:this.state.round};this.state.birthProposals[proposal.id]=proposal;return proposal;
  }


  private applyChildAllowanceAtRoundStart(){
    if(this.state.round>this.cfg.socialSecurity.childAllowanceThroughRound)return;
    for(const c of this.alive().filter(x=>x.ageStage<=2)){
      const amount=nominal(this.cfg.socialSecurity.childAllowance,this.state.priceIndex);
      const paid=this.payFromSupportFund(amount,"trợ cấp trẻ em");
      this.household(c).sharedCash+=paid;this.state.telemetry.cashFlow.supportBenefits+=paid;
    }
  }

  private applyPensionsAtRoundStart(){
    const ss=this.state.socialSecurity, elders=this.elders();
    ss.pensionTargetThisRound=0;ss.pensionPaidThisRound=0;ss.pensionStateTransferThisRound=0;ss.pensionPayoutRatio=1;ss.pensionCrisis=false;
    if(!elders.length){ss.pensionReserve+=ss.payg;ss.payg=0;return}
    const targetPerElder=Math.max(0,ss.lastWorkerAverageIncome*this.cfg.socialSecurity.pensionReplacementRate);
    const target=targetPerElder*elders.length;ss.pensionTargetThisRound=target;
    let available=ss.payg;ss.payg=0;
    const fromReserve=Math.min(Math.max(0,target-available),ss.pensionReserve);ss.pensionReserve-=fromReserve;available+=fromReserve;
    const shortfall=Math.max(0,target-available);
    if(shortfall>0){const desired=shortfall*this.cfg.socialSecurity.pensionStateBackstopShare;const transfer=this.fundPensionBackstop(desired,'bù thiếu lương hưu do già hóa');available+=transfer;ss.pensionStateTransferThisRound=transfer}
    const pensionPaid=Math.min(target,available);ss.pensionPaidThisRound=pensionPaid;const surplus=Math.max(0,available-pensionPaid);ss.pensionReserve+=surplus;
    ss.pensionPayoutRatio=target>0?pensionPaid/target:1;ss.pensionCrisis=target>0&&ss.pensionPayoutRatio<this.cfg.socialSecurity.pensionCollapsePayoutRatio;
    if(ss.pensionCrisis){
      const workers=this.workers().length,elderCount=elders.length;
      const cause=workers===0?"no_workers":elderCount/Math.max(1,workers)>=1.5?"ageing":ss.pensionReserve<=1e-6?"reserve_depleted":ss.investmentReturnRate<0?"investment_loss":this.state.government.fiscalCrisis?"fiscal_constraint":"low_contributions";
      this.state.telemetry.socialCrisisCauses[cause]=(this.state.telemetry.socialCrisisCauses[cause]??0)+1;
    }
    const paygShare=elders.length?pensionPaid/elders.length:0;
    for(const c of elders){
      const personal=ss.personalBalances[c.id]??0;const personalWithdrawal=personal/2;ss.personalBalances[c.id]=personal-personalWithdrawal;
      const pensionIncome=personalWithdrawal+paygShare;this.household(c).sharedCash+=pensionIncome;this.state.pensionIncomeByHousehold[c.householdId]=(this.state.pensionIncomeByHousehold[c.householdId]??0)+pensionIncome;this.state.telemetry.cashFlow.pensionBenefits+=pensionIncome;
    }
    if(ss.pensionCrisis)this.state.chronology.push(`[Vòng ${this.state.round}] KHỦNG HOẢNG ASXH: chỉ chi trả ${(ss.pensionPayoutRatio*100).toFixed(1)}% mức lương hưu mục tiêu.`)
  }

  /**
   * Đầu vòng:
   * 1) tăng round + reset event
   * 2) áp dụng tài nguyên đã đầu tư phục hồi ở vòng trước
   * 3) sự kiện xã hội
   * Sau đó controller sẽ xếp lượt, rồi gọi convertResourcesAfterTurnOrder(),
   * rồi mới resolveMandatory(); hôn nhân chạy ngoài lượt, còn hành động kinh tế ở Voluntary.
   */
  startRound(){
    if(this.state.ended)throw Error("game ended");if(this.state.round>=this.cfg.game.totalRounds)throw Error("completed");this.state.round++;
    advanceResidenceRoundStart(this.state);
    this.state.eventInterestDelta=0;this.state.eventName=null;this.state.epidemicMedicalCostPerCharacter=0;this.state.eventBirthLimit=this.cfg.fertility.normalMaxBirthsPerHousehold;this.state.recoveryCostMultiplier=1;this.state.debtXMultiplier=1;this.state.marketBounds={min:this.cfg.market.min,max:this.cfg.market.max};this.state.turnState=createEmptyTurnState();
    this.state.realizedNetIncomeByHousehold={};this.state.realizedNetIncomeByCharacter={};this.state.voluntarySpentByCharacter={};this.state.spendingLimitByCharacter={};this.state.sharedQuotaChargeByCharacter={};this.state.birthsThisRoundByHousehold={};this.state.mandatoryResolvedHouseholds={};this.state.prepaidChildSupportByParentHousehold={};this.state.prepaidParentSupportByWorkerHousehold={};this.state.pensionIncomeByHousehold={};this.state.statusPurchases={};this.state.debtContributionCollected=0;
    for(const h of Object.values(this.state.households)){h.pendingStatus=null;h.pendingStatusPaid=0;h.pendingStatusPurchaserId=null;h.sharedQuotaCharge=0;h.bankruptRound=null}
    const g=this.state.government;g.taxCollectedThisRound=0;g.taxPaidByCharacter={};g.maintenancePaidThisRound=0;g.spendingThisRound=0;g.borrowedThisRound=0;g.debtRepaidThisRound=0;g.subsidySpentThisRound=0;g.realizedInvestmentProfit=0;g.turnCard=null;g.purchaseTurnPosition=null;g.actedThisRound=false;g.subsidyRate={low:0,mid:0,high:0};g.interventions=[];g.interventionLedger=[];g.fiscalCrisis=false;g.debtInterestPaidThisRound=0;g.openingBudgetThisRound=g.budget;g.openingDebtThisRound=this.state.debt;
    this.state.turnState.phase="round_started";maintainGovernment(this);this.applyPendingRecoveryAtRoundStart();this.applyChildAllowanceAtRoundStart();this.applyPensionsAtRoundStart();if((this.cfg.events.rounds as readonly number[]).includes(this.state.round))this.drawEvent();this.admitImmigrantsAtRoundStart();
  }

  drawEvent(){
    const n=["Thiên tai","Khủng hoảng tài chính","Bùng nổ công nghệ","Mở rộng phúc lợi","Dịch bệnh","Khuyến sinh","Khủng hoảng nợ công","Đầu tư công","Biến động thị trường"][Math.floor(this.random()*9)]!;
    const impacts:WorldEventImpact[]=[];let ambienceKey:string|null=null;
    if(n==="Thiên tai"){const renewableBefore=this.state.pool.low+this.state.pool.mid+this.state.pool.high,nonRenewableBefore=this.state.nonRenewablePool.low+this.state.nonRenewablePool.mid+this.state.nonRenewablePool.high;for(const p of [this.state.pool,this.state.nonRenewablePool]){p.low*=this.cfg.events.disasterPoolMultiplier;p.mid*=this.cfg.events.disasterPoolMultiplier;p.high*=this.cfg.events.disasterPoolMultiplier}const renewableAfter=this.state.pool.low+this.state.pool.mid+this.state.pool.high,nonRenewableAfter=this.state.nonRenewablePool.low+this.state.nonRenewablePool.mid+this.state.nonRenewablePool.high;impacts.push({system:"MARKET",key:"renewable_pool",labelKey:"EVENT_RENEWABLE_POOL",value:renewableAfter,delta:renewableAfter-renewableBefore,unit:"count"},{system:"MARKET",key:"nonrenewable_pool",labelKey:"EVENT_NONRENEWABLE_POOL",value:nonRenewableAfter,delta:nonRenewableAfter-nonRenewableBefore,unit:"count"});ambienceKey="disaster"}
    if(n==="Khủng hoảng tài chính"){this.state.eventInterestDelta=this.cfg.events.financialCrisisInterestDelta;impacts.push({system:"MARKET",key:"success_return_delta",labelKey:"EVENT_MARKET_RETURN_DELTA",value:this.state.eventInterestDelta,delta:this.state.eventInterestDelta,unit:"ratio"});ambienceKey="financial_crisis"}
    if(n==="Bùng nổ công nghệ"){this.state.eventInterestDelta=this.cfg.events.techBoomInterestDelta;impacts.push({system:"MARKET",key:"success_return_delta",labelKey:"EVENT_MARKET_RETURN_DELTA",value:this.state.eventInterestDelta,delta:this.state.eventInterestDelta,unit:"ratio"});ambienceKey="tech_boom"}
    if(n==="Mở rộng phúc lợi"){const funded=this.fundSocialSupport(nominal(this.cfg.events.welfareInjection,this.state.priceIndex),"Mở rộng phúc lợi");impacts.push({system:"GOVERNMENT",key:"support_fund_injection",labelKey:"EVENT_SUPPORT_FUND_INJECTION",value:funded,delta:funded,unit:"currency"});ambienceKey="welfare"}
    if(n==="Khuyến sinh"){const before=this.state.eventBirthLimit;this.state.eventBirthLimit=3;impacts.push({system:"BIRTH",key:"proposal_limit",labelKey:"EVENT_BIRTH_PROPOSAL_LIMIT",value:this.state.eventBirthLimit,delta:this.state.eventBirthLimit-before,unit:"count"});ambienceKey="pronatalist"}
    if(n==="Khủng hoảng nợ công"){const before=this.state.debtXMultiplier;this.state.debtXMultiplier=2;impacts.push({system:"GOVERNMENT",key:"debt_interest_multiplier",labelKey:"EVENT_DEBT_INTEREST_MULTIPLIER",value:this.state.debtXMultiplier,delta:this.state.debtXMultiplier-before,unit:"ratio"});ambienceKey="debt_crisis"}
    if(n==="Đầu tư công"){const before=this.state.recoveryCostMultiplier;this.state.recoveryCostMultiplier=this.cfg.events.publicInvestmentRecoveryMultiplier;impacts.push({system:"RECOVERY",key:"cost_multiplier",labelKey:"EVENT_RECOVERY_COST_MULTIPLIER",value:this.state.recoveryCostMultiplier,delta:this.state.recoveryCostMultiplier-before,unit:"ratio"});ambienceKey="public_investment"}
    if(n==="Biến động thị trường"){const before={...this.state.marketBounds};this.state.marketBounds={min:this.cfg.events.marketMin,max:this.cfg.events.marketMax};impacts.push({system:"MARKET",key:"price_bound_min",labelKey:"EVENT_MARKET_MIN_PRICE",value:this.state.marketBounds.min,delta:this.state.marketBounds.min-before.min,unit:"currency"},{system:"MARKET",key:"price_bound_max",labelKey:"EVENT_MARKET_MAX_PRICE",value:this.state.marketBounds.max,delta:this.state.marketBounds.max-before.max,unit:"currency"});ambienceKey="market_volatility"}
    if(n==="Dịch bệnh"){this.state.epidemicMedicalCostPerCharacter=nominal(this.cfg.events.epidemicMedicalCost,this.state.priceIndex);impacts.push({system:"MANDATORY",key:"epidemic_medical_fee_per_character",labelKey:"EVENT_MANDATORY_MEDICAL_PER_CHARACTER",value:this.state.epidemicMedicalCostPerCharacter,delta:this.state.epidemicMedicalCostPerCharacter,unit:"currency"});ambienceKey="epidemic"}
    this.state.eventName=n;
    const id=`world-event-r${this.state.round}-${crypto.randomUUID()}`;
    this.state.worldEventOccurrences.push({id,round:this.state.round,year:(this.state.round-1)*10,name:n,ambienceKey,impacts,chronicleEntryId:id});
    this.state.chronology.push(`[Vòng ${this.state.round}] Sự kiện: ${n}`);
    return n;
  }

  private allocateNobleSlots(){
    const active=Object.values(this.state.households).filter(h=>h.active);
    const slots=Math.ceil(this.alive().length*this.cfg.status.noblePopulationShare);
    const turnCard=(h:Household)=>{const rep=h.representativeCharacterId;return this.state.turnState.entries.find(e=>e.characterId===rep)?.card??0};
    const candidates=active.filter(h=>h.pendingStatus==="noble").sort((a,b)=>{
      const incumbent=(h:Household)=>h.status==="noble"?1:0;
      if(incumbent(b)!==incumbent(a))return incumbent(b)-incumbent(a);
      const wealth=this.householdAssets(b)-this.householdAssets(a);if(Math.abs(wealth)>1e-9)return wealth;
      return turnCard(b)-turnCard(a);
    });
    const chosen=new Set<string>();let used=0;
    for(const h of candidates){const need=h.memberIds.filter(id=>this.state.characters[id]?.alive).length;if(need>0&&used+need<=slots){chosen.add(h.id);used+=need}}
    for(const h of active){
      if(h.pendingStatus==null)continue;
      let resolved=h.pendingStatus,refund=0;
      if(h.pendingStatus==="noble"&&!chosen.has(h.id)){
        resolved="middle";const persons=Math.max(1,h.memberIds.filter(id=>this.state.characters[id]?.alive).length);
        const middleFee=statusFee("middle",this.state.roundAverageAssetsSnapshot,this.state.priceIndex,this.cfg)*persons;
        refund=Math.max(0,h.pendingStatusPaid-middleFee);h.sharedCash+=refund;this.refundSharedCostFromQuota(h,refund);h.pendingStatusPaid=middleFee;
        this.state.chronology.push(`[Vòng ${this.state.round}] Hộ ${h.id} không đủ suất Quý tộc → Trung lưu; hoàn ${refund.toFixed(2)}`);
      }
      h.status=resolved;
      for(const id of h.memberIds){const c=this.state.characters[id];if(!c?.alive||!c.ownerId)continue;const hist=this.state.histories[c.ownerId];if(hist&&this.statusRankValue(resolved)>this.statusRankValue(hist.highestStatus)){hist.highestStatus=resolved;this.pushPlayerHistory(c.ownerId,"status_milestone",c.id,`Đạt địa vị ${this.statusDisplayName(resolved)}`,true)}}
      const purchase=this.state.statusPurchases[h.id];if(purchase){purchase.resolvedStatus=resolved;purchase.refund=refund}
      h.pendingStatus=null;h.pendingStatusPurchaserId=null;
    }
  }
  private resolveDebtInterestAndInflation(){
    const g=this.state.government;const interest=this.state.debt*this.cfg.debt.growthRate*this.state.debtXMultiplier;let unpaid=interest;const pay=Math.min(unpaid,Math.max(0,g.budget-g.reserveFloor));g.budget-=pay;g.spendingThisRound+=pay;g.debtInterestPaidThisRound=pay;unpaid-=pay;if(unpaid>0){const borrowed=this.borrowGovernment(unpaid,"trả lãi nợ công");g.budget-=borrowed;g.spendingThisRound+=borrowed;g.debtInterestPaidThisRound+=borrowed;unpaid-=borrowed}if(unpaid>0){g.fiscalCrisis=true;this.state.chronology.push(`[Vòng ${this.state.round}] Khủng hoảng tài khóa: thiếu ${unpaid.toFixed(2)} tiền trả lãi; không phát hành thêm nợ vượt trần.`)}
    const population=this.alive().length;const demand=(population/this.cfg.room.initialActivePlayers)-1;const scarcity=scarcityInflationIndex(this.state.pool,this.state.nonRenewablePool,this.cfg);const fiscal=Math.min(2,this.state.debt/Math.max(1,this.citizenTotalAssets()));const raw=this.cfg.inflation.targetRate+demand*this.cfg.inflation.demandWeight+scarcity*this.cfg.inflation.scarcityWeight+fiscal*this.cfg.inflation.fiscalWeight;const next=this.state.inflationRate*this.cfg.inflation.smoothing+raw*(1-this.cfg.inflation.smoothing);this.state.inflationRate=Math.max(this.cfg.inflation.minRate,Math.min(this.cfg.inflation.maxRate,next));this.state.priceIndex*=1+this.state.inflationRate;
    const byType=(t:string)=>g.interventionLedger.filter(x=>x.type===t).reduce((a,x)=>a+x.amount,0);g.fiscalHistory.push({round:this.state.round,openingBudget:g.openingBudgetThisRound,openingDebt:g.openingDebtThisRound,tax:g.taxCollectedThisRound,investmentIncome:Math.max(0,g.realizedInvestmentProfit),borrowing:g.borrowedThisRound,maintenance:g.maintenancePaidThisRound,subsidy:g.subsidySpentThisRound,recovery:byType("renewable_recovery"),socialFund:byType("social_fund"),debtInterestPaid:g.debtInterestPaidThisRound,debtPrincipalPaid:g.debtRepaidThisRound,resourceInvestment:byType("resource_investment"),closingBudget:g.budget,closingDebt:this.state.debt,fiscalCrisis:g.fiscalCrisis});
  }

  private cohortKey(c:Character){return String(c.birthRound)}
  private cohort(c:Character){
    const key=this.cohortKey(c);
    return this.state.telemetry.cohortTransitions[key]??(this.state.telemetry.cohortTransitions[key]={born:0,reachedStage2:0,reachedWorker:0,reachedElder:0,diedBeforeWorker:0,workerDeaths:0,elderDeaths:0});
  }

  elderlyMedicalDue(c:Character){
    if(c.ageStage<this.cfg.elderlyMedical.stageStart)return 0;
    return nominal(this.cfg.living.base,this.state.priceIndex)*this.cfg.elderlyMedical.baseMultiplier*(1+this.cfg.elderlyMedical.stageGrowth*(c.ageStage-this.cfg.elderlyMedical.stageStart));
  }

  mortalityRisk(c:Character,paidRatio:number){
    if(c.ageStage<this.cfg.elderlyMedical.stageStart)return 0;
    // One round represents ten years. Stage 12 ends at roughly age 120; with the
    // verified human longevity record at 122 years, the decade-granularity model uses this as the terminal elderly stage,
    // preventing survival into a full 120s decade.
    if(c.ageStage>=this.cfg.elderlyMedical.terminalStage)return 1;
    const y=Math.max(this.cfg.elderlyMedical.minY,1-this.cfg.elderlyMedical.maxRiskReduction*Math.max(0,Math.min(1,paidRatio)));
    return Math.max(0,Math.min(1,this.cfg.elderlyMedical.mortalityX*(c.ageStage-7)*y));
  }

  private dieCoupleTogether(a:Character,b:Character,reason:string){
    const h=this.household(a);if(h.id!==this.household(b).id)throw Error("joint spouse death requires one household");
    // When both spouses die in the same end-round there is no surviving-spouse
    // preferential estate. Refund every unused next-round Status share first,
    // then settle the whole Household estate across the union of their living children.
    for(const c of [a,b]){
      this.adjustStatusRefundForDeath(h,c);
      const cohort=this.cohort(c);if(c.ageStage<3)cohort.diedBeforeWorker++;else if(c.ageStage<=6)cohort.workerDeaths++;else cohort.elderDeaths++;
      for(const parent of this.parentCharactersOf(c))if(parent.alive)parent.griefFeeDue++;
      c.alive=false;this.invalidateMarriageProposalsForCharacter(c.id);this.state.telemetry.lifecycle.deaths[String(c.ageStage)]=(this.state.telemetry.lifecycle.deaths[String(c.ageStage)]??0)+1;this.pushPlayerHistory(c.ownerId,"death",c.id,reason,true);this.queueOwner(c,"death");
    }
    this.recordLifecycleResult({type:"death",characterIds:[a.id,b.id],householdId:h.id,cause:reason,joint:true,medicalDue:null,medicalPaid:null,estateTotal:null,beneficiaries:[],governmentTransfer:0,playerId:null,queuePosition:null,assignmentReason:null});
    this.settleEstate(h,h.childrenIds,[a.id,b.id],true);
    reconcileResidenceAfterDeath(this.state);
    this.state.chronology.push(`[Vòng ${this.state.round}] ${a.id} và ${b.id}: tử vong cùng cuối vòng; di sản hộ chia cho các con còn sống`);
  }

  resolveElderlyMedicalAndMortality(){
    for(const h of Object.values(this.state.households).filter(x=>x.active)){
      const elders=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive&&x.ageStage>=7);
      if(!elders.length)continue;
      const dues=elders.map(c=>({c,due:this.elderlyMedicalDue(c)}));
      const totalDue=dues.reduce((a,x)=>a+x.due,0),available=Math.max(0,h.sharedCash),totalPaid=Math.min(totalDue,available);
      const ratio=totalDue>0?totalPaid/totalDue:0; h.sharedCash-=totalPaid;
      this.state.telemetry.elderlyMedical.due+=totalDue;this.state.telemetry.elderlyMedical.paid+=totalPaid;
      const willDie:Character[]=[];
      for(const {c,due} of dues){
        c.elderlyMedicalDueThisRound=due;c.elderlyMedicalPaidThisRound=due*ratio;
        const risk=this.mortalityRisk(c,ratio);c.lastMortalityRisk=risk;
        const k=String(c.ageStage),rec=this.state.telemetry.elderlyMedical.mortalityByStage[k]??(this.state.telemetry.elderlyMedical.mortalityByStage[k]={exposed:0,deaths:0,avgRisk:0});
        rec.avgRisk=(rec.avgRisk*rec.exposed+risk)/(rec.exposed+1);rec.exposed++;
        if(this.random()<risk){rec.deaths++;this.state.telemetry.elderlyMedical.deaths++;willDie.push(c)}else this.state.telemetry.elderlyMedical.survivals++;
      }
      const livingAdultsBefore=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive&&x.ageStage>=3);
      if(willDie.length===2&&livingAdultsBefore.length===2&&willDie.every(c=>livingAdultsBefore.some(x=>x.id===c.id))&&this.isCoupleHousehold(h))this.dieCoupleTogether(willDie[0]!,willDie[1]!,"old-age mortality");
      else for(const c of willDie)if(c.alive)this.die(c,"old-age mortality");
      this.recordLifecycleResult({type:"elderly_medical",characterIds:dues.map(x=>x.c.id),householdId:h.id,cause:null,joint:false,medicalDue:totalDue,medicalPaid:totalPaid,estateTotal:null,beneficiaries:[],governmentTransfer:0,playerId:null,queuePosition:null,assignmentReason:null});
      if(totalDue>0)this.state.chronology.push(`[Vòng ${this.state.round}] Y tế tuổi già hộ ${h.id}: ${totalPaid.toFixed(2)}/${totalDue.toFixed(2)}`);
    }
  }

  private executeAcceptedBirths(){
    const proposals=Object.values(this.state.birthProposals).filter(p=>p.round===this.state.round&&(p.status==="accepted"||p.status==="pending"));
    // No response defaults to agreement, unless the household was invalidated/bankrupt.
    for(const p of proposals)if(p.status==="pending")p.status="accepted";
    for(let i=proposals.length-1;i>0;i--){const j=Math.floor(this.random()*(i+1));[proposals[i],proposals[j]]=[proposals[j]!,proposals[i]!]}
    for(const p of proposals){
      if(p.status!=="accepted")continue;const h=this.state.households[p.householdId];if(!h?.active||h.bankruptRound===this.state.round){p.status="invalidated";continue}
      const spouses=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive&&x.ageStage>=3);
      if(spouses.length!==2||!spouses.every(x=>this.isWorkerAge(x))){p.status="invalidated";continue}
      const already=this.state.birthsThisRoundByHousehold[h.id]??0;if(already>=this.state.eventBirthLimit){p.status="invalidated";continue}
      const q=popQueue(this.state.waitingQueue);this.state.waitingQueue=q.queue;let child:Character;
      if(q.playerId){child=this.createCharacter(q.playerId,1,0,h.id,false);this.state.realPlayerIds.push(q.playerId);const hist=this.state.histories[q.playerId]!;hist.lives++;this.pushPlayerHistory(q.playerId,"reincarnation",child.id,`Tái sinh vào Kiếp #${hist.lives}`,true);this.recordLifecycleResult({type:"new_life_assignment",characterIds:[child.id],householdId:h.id,cause:null,joint:false,medicalDue:null,medicalPaid:null,estateTotal:null,beneficiaries:[],governmentTransfer:0,playerId:q.playerId,queuePosition:null,assignmentReason:"birth"})}
      else child=this.createNpc(h.id);
      h.childrenIds.push(child.id);for(const parent of spouses){if(!parent.childrenIds.includes(child.id))parent.childrenIds.push(child.id);if(parent.ownerId){const hist=this.state.histories[parent.ownerId];if(hist){hist.children++;this.pushPlayerHistory(parent.ownerId,"child_birth",parent.id,`Có con: ${child.id}`,true)}}}
      const pair=spouses.map(x=>x.ageStage).sort((a,b)=>a-b).join("-");this.state.telemetry.demography.birthsByParentStagePair[pair]=(this.state.telemetry.demography.birthsByParentStagePair[pair]??0)+1;this.cohort(child).born++;
      this.state.birthsThisRoundByHousehold[h.id]=already+1;this.state.telemetry.births++;
      const pi=this.state.priceIndex,base=nominal(this.cfg.socialSecurity.childbirthSubsidy,pi),target=nominal(this.cfg.socialSecurity.childbirthSupportTarget,pi),expected=Math.max(0,this.netIncome(h)*this.cfg.socialSecurity.childSupportRate);
      const subsidy=Math.min(nominal(this.cfg.socialSecurity.childbirthSubsidyCap,pi),base+Math.max(0,target-expected));const paid=this.payFromSupportFund(subsidy,"trợ cấp sinh con");this.household(child).sharedCash+=paid;this.state.telemetry.cashFlow.supportBenefits+=paid;
      this.state.chronology.push(`[Vòng ${this.state.round}] ${child.id} chào đời; chủ sở hữu ${q.playerId??"NPC"}`);
    }
  }

  private executeAcceptedMarriages(){
    for(const p of Object.values(this.state.marriageProposals).filter(p=>p.status==="accepted"&&p.acceptedRound===this.state.round)){
      if(!this.marriageProposalStillEligible(p)){p.status="invalidated";continue}
      const a=this.state.characters[p.proposerCharacterId]!,b=this.state.characters[p.targetCharacterId]!;
      this.marry(a,b);p.status="executed";
      for(const c of [a,b])if(c.ownerId){const hist=this.state.histories[c.ownerId];if(hist){hist.marriages++;this.pushPlayerHistory(c.ownerId,"marriage",c.id,`Kết hôn với ${c.id===a.id?b.id:a.id}`,true)}}
    }
  }

  private scoreActivePlayersForRound(){
    const seen=new Set<string>();
    for(const entry of this.state.turnState.entries){
      const c=this.state.characters[entry.characterId];const playerId=c?.ownerId;if(!playerId||seen.has(playerId))continue;seen.add(playerId);
      const hist=this.state.histories[playerId];if(!hist||hist.lastScoredRound===this.state.round)continue;
      let score=0,householdAssets=0,married=false;
      if(c.alive){const h=this.household(c);householdAssets=this.householdAssets(h);married=this.isMarried(c);score=householdAssets*(married?.5:1);this.updatePlayerMilestones(c,score)}
      // A player who went bankrupt in the round remains represented by the turn entry and receives zero.
      hist.cumulativeAssets+=score;hist.activeRounds++;hist.lastScoredRound=this.state.round;hist.scoreSnapshots.push({round:this.state.round,year:this.historyYear(true),characterId:c?.id??null,householdAssets,scoreAssets:score,married,reason:"round"});
    }
  }

  private snapshotHistory(){
    const living=this.alive(),workers=living.filter(c=>this.isWorkerAge(c)).length,elderly=living.filter(c=>c.ageStage>=7).length,children=living.filter(c=>c.ageStage<=2).length;
    this.state.historySnapshots.push({round:this.state.round,year:this.state.round*10,population:living.length,workers,elderly,children,totalAssets:this.citizenTotalAssets(),inflationRate:this.state.inflationRate,priceIndex:this.state.priceIndex,publicDebt:this.state.debt,governmentBudget:this.state.government.budget,pensionPayoutRatio:this.state.socialSecurity.pensionPayoutRatio,renewable:{...this.state.pool},nonRenewable:{...this.state.nonRenewablePool},eventName:this.state.eventName,immigration:this.state.telemetry.immigration.byRound[String(this.state.round)]??0});
  }

  private adjustStatusRefundForDeath(h:Household,dying:Character){
    if(!h.pendingStatus||h.pendingStatusPaid<=0)return;const remaining=h.memberIds.filter(id=>id!==dying.id&&this.state.characters[id]?.alive).length;
    const required=statusFee(h.pendingStatus,this.state.roundAverageAssetsSnapshot,this.state.priceIndex,this.cfg)*remaining;
    if(h.pendingStatusPaid>required){const refund=h.pendingStatusPaid-required;h.sharedCash+=refund;h.pendingStatusPaid=required;const purchase=this.state.statusPurchases[h.id];if(purchase)purchase.refund=(purchase.refund??0)+refund;this.state.chronology.push(`[Vòng ${this.state.round}] Hoàn phí Địa vị do tử vong: ${refund.toFixed(2)}`)}
  }

  private estateResourceValue(h:Household){
    let total=0;for(const type of ["renewable","nonrenewable"] as ResourceType[])for(const g of ["low","mid","high"] as ResourceGrade[]){const units=(type==="renewable"?h.sharedResources:h.sharedNonRenewableResources)[g];total+=units*this.marketPrice(g,type)*(1+Math.max(0,this.resourceInterest(type,g)+this.state.eventInterestDelta))}return total;
  }

  private materializeEstateResources(h:Household){
    const value=this.estateResourceValue(h);h.sharedCash+=value;h.sharedResources=empty();h.sharedResourceCostBasis=empty();h.sharedNonRenewableResources=empty();h.sharedNonRenewableResourceCostBasis=empty();h.investmentLots=[];return value;
  }

  endRound(){
    if(this.state.ended)return;this.requirePhase("round_end");
    // Score the round before newborn assignment, marriage merge, and old-age mortality.
    this.scoreActivePlayersForRound();
    // Decisions made during the round settle before mortality.
    this.executeAcceptedBirths();this.executeAcceptedMarriages();
    this.state.pool=regeneratePool(this.state.pool,this.cfg);
    const ss=this.state.socialSecurity,shock=(this.random()*2-1)*this.cfg.socialSecurity.investmentShock;const nominalReturn=(1+this.state.inflationRate)*(1+this.cfg.socialSecurity.investmentExpectedRealReturn+shock)-1;ss.investmentReturnRate=Math.max(this.cfg.socialSecurity.investmentMinReturn,Math.min(this.cfg.socialSecurity.investmentMaxReturn,nominalReturn));for(const id of Object.keys(ss.personalBalances))ss.personalBalances[id]!*=1+ss.investmentReturnRate;ss.pensionReserve*=1+ss.investmentReturnRate;
    const workerIncomes=this.workers().map(c=>Math.max(0,this.state.realizedNetIncomeByCharacter[c.id]??0));ss.lastWorkerAverageIncome=workerIncomes.length?workerIncomes.reduce((a,b)=>a+b,0)/workerIncomes.length:0;
    this.resolveDebtInterestAndInflation();
    this.resolveElderlyMedicalAndMortality();
    for(const c of [...this.alive()]){if(c.birthRound===this.state.round)continue;c.ageStage++;const cohort=this.cohort(c);if(c.ageStage===2)cohort.reachedStage2++;if(c.ageStage===3)cohort.reachedWorker++;if(c.ageStage===7)cohort.reachedElder++}
    finalizeResidenceEndRound(this.state);
    // Noble cap is decided after deaths/aging; pending status activates only now.
    this.allocateNobleSlots();
    const adults=this.alive().filter(c=>c.ageStage>=3);const seen=new Set<string>();let ww=0,we=0,ee=0;for(const c of adults){const sp=this.spouseOf(c);if(!sp)continue;const key=[c.id,sp.id].sort().join("|");if(seen.has(key))continue;seen.add(key);const cw=this.isWorkerAge(c),sw=this.isWorkerAge(sp);if(cw&&sw)ww++;else if(cw||sw)we++;else ee++}
    const workers=this.workers(),singles=workers.filter(c=>!this.isMarried(c));let eligibleWorkerPairs=0,kinBlockedWorkerPairs=0;for(let i=0;i<singles.length;i++)for(let j=i+1;j<singles.length;j++){if(this.areCloseFamily(singles[i]!,singles[j]!))kinBlockedWorkerPairs++;else eligibleWorkerPairs++}
    const births=this.state.telemetry.births;this.state.telemetry.demography.rounds.push({round:this.state.round,workers:workers.length,singleWorkers:singles.length,workerWorkerCouples:ww,workerElderCouples:we,elderElderCouples:ee,fertileCouples:ww,eligibleWorkerPairs,kinBlockedWorkerPairs,birthsCumulative:births,replacementRatio:births/Math.max(1,this.state.telemetry.lifecycle.created["3"]??this.cfg.room.initialActivePlayers)});
    this.snapshotHistory();
    if(!this.alive().length){this.state.ended=true;this.state.endingReason="Tuyệt chủng — Thất bại chung"}
    else if(this.state.round>=this.cfg.game.totalRounds){this.state.ended=true;this.state.endingReason="Kết thúc sau 32 vòng"}
  }

  private queueOwner(c:Character,assignmentReason:"death"|"bankruptcy"){
    if(!c.ownerId)return;
    this.state.realPlayerIds=this.state.realPlayerIds.filter(x=>x!==c.ownerId);
    this.state.waitingQueue=insertAtQueueEnd(this.state.waitingQueue,c.ownerId);
    this.recordLifecycleResult({type:"queue_entry",characterIds:[c.id],householdId:c.householdId,cause:assignmentReason,joint:false,medicalDue:null,medicalPaid:null,estateTotal:null,beneficiaries:[],governmentTransfer:0,playerId:c.ownerId,queuePosition:this.state.waitingQueue.indexOf(c.ownerId)+1,assignmentReason});
  }

  private settleEstate(h:Household,heirChildIds:string[]=h.childrenIds,sourceCharacterIds:string[]=h.memberIds,joint=false){
    if(!h.active)return;this.materializeEstateResources(h);
    // Move all remaining funded subaccounts into the estate because no member survives.
    for(const id of h.memberIds){const bal=this.state.socialSecurity.personalBalances[id]??0;h.sharedCash+=bal;this.state.socialSecurity.personalBalances[id]=0}
    // Natural death uses the deceased Character's direct children. Whole-Household
    // bankruptcy may pass the Household child union explicitly/default. This prevents
    // a stepchild from silently becoming heir to a later step-parent's terminal estate.
    const estate=h.sharedCash;const children=[...new Set(heirChildIds)].map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive),beneficiaries:LifecycleBeneficiary[]=[];
    if(children.length){for(const ch of children){const amount=estate/children.length;this.household(ch).sharedCash+=amount;beneficiaries.push({characterId:ch.id,householdId:ch.householdId,relation:"child",amount});this.state.telemetry.cashFlow.inheritanceReceived+=amount;this.state.telemetry.familyFlows.push({round:this.state.round,type:"inheritance",fromHouseholdId:h.id,toHouseholdId:ch.householdId,amount})}}
    else{this.state.government.budget+=estate;this.state.chronology.push(`[Vòng ${this.state.round}] Di sản ${estate.toFixed(2)} không có con/người phối ngẫu → Ngân sách Nhà nước`)}
    this.recordLifecycleResult({type:"inheritance",characterIds:[...sourceCharacterIds],householdId:h.id,cause:null,joint,medicalDue:null,medicalPaid:null,estateTotal:estate,beneficiaries,governmentTransfer:children.length?0:estate,playerId:null,queuePosition:null,assignmentReason:null});
    h.sharedCash=0;h.active=false;
  }

  die(c:Character,reason:string){
    if(!c.alive)return;const h=this.household(c);this.adjustStatusRefundForDeath(h,c);
    const spouse=this.spouseOf(c);const children=c.childrenIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive);
    const cohort=this.cohort(c);if(c.ageStage<3)cohort.diedBeforeWorker++;else if(c.ageStage<=6)cohort.workerDeaths++;else cohort.elderDeaths++;
    // Grief is assessed to each direct living parent in the next Mandatory.
    // Direct Character links remain correct even if a surviving parent later remarried.
    for(const parent of this.parentCharactersOf(c))if(parent.alive)parent.griefFeeDue++;
    // Materialize resources once at inheritance valuation before partitioning the joint estate.
    // Funded ASXH of a living spouse is a locked personal sub-account: it contributes to Household Total Assets
    // for macro/scoring purposes, but it is NOT a divisible joint asset during the other spouse's estate settlement.
    // The deceased Character's own funded ASXH is fully part of their estate.
    this.materializeEstateResources(h);
    const divisibleJointAssets=h.sharedCash;
    const deceasedSs=this.state.socialSecurity.personalBalances[c.id]??0;
    this.state.socialSecurity.personalBalances[c.id]=0;
    h.sharedCash+=deceasedSs;
    c.alive=false;this.invalidateMarriageProposalsForCharacter(c.id);this.state.telemetry.lifecycle.deaths[String(c.ageStage)]=(this.state.telemetry.lifecycle.deaths[String(c.ageStage)]??0)+1;this.pushPlayerHistory(c.ownerId,"death",c.id,reason,true);this.queueOwner(c,"death");this.recordLifecycleResult({type:"death",characterIds:[c.id],householdId:h.id,cause:reason,joint:false,medicalDue:null,medicalPaid:null,estateTotal:null,beneficiaries:[],governmentTransfer:0,playerId:c.ownerId,queuePosition:null,assignmentReason:null});
    if(spouse?.alive){
      const estate=divisibleJointAssets*.5+deceasedSs;const heirs=[spouse,...children];const share=heirs.length?estate/heirs.length:estate;
      const beneficiaries:LifecycleBeneficiary[]=[{characterId:spouse.id,householdId:spouse.householdId,relation:"spouse",amount:share}];
      // The survivor retains their own funded ASXH and baseline half of divisible joint assets.
      // Their inherited share stays in the same household; only child shares leave shared Cash.
      for(const child of children){const amount=share;h.sharedCash-=amount;this.household(child).sharedCash+=amount;beneficiaries.push({characterId:child.id,householdId:child.householdId,relation:"child",amount});this.state.telemetry.cashFlow.inheritanceReceived+=amount;this.state.telemetry.familyFlows.push({round:this.state.round,type:"inheritance",fromHouseholdId:h.id,toHouseholdId:child.householdId,amount})}
      this.recordLifecycleResult({type:"inheritance",characterIds:[c.id],householdId:h.id,cause:null,joint:false,medicalDue:null,medicalPaid:null,estateTotal:estate,beneficiaries,governmentTransfer:0,playerId:null,queuePosition:null,assignmentReason:null});
      this.state.chronology.push(`[Vòng ${this.state.round}] Di sản ${c.id}: 50% tài sản chung có thể phân chia + ASXH riêng của người mất, chia ${heirs.length} người thừa kế (người phối ngẫu + con)`);
    }else{
      const surviving=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive);
      if(surviving.length===0)this.settleEstate(h,c.childrenIds,[c.id]);
    }
    reconcileResidenceAfterDeath(this.state);
    this.state.chronology.push(`[Vòng ${this.state.round}] ${c.id}: ${reason}`);
  }

  bankruptHousehold(h:Household){
    if(!h.active)return;h.bankruptRound=this.state.round;
    // Pending births/marriages involving this household cannot execute.
    for(const p of Object.values(this.state.birthProposals))if(p.householdId===h.id&&p.round===this.state.round&&["pending","accepted"].includes(p.status))p.status="invalidated";
    for(const p of Object.values(this.state.marriageProposals)){const a=this.state.characters[p.proposerCharacterId],b=this.state.characters[p.targetCharacterId];if(["pending","accepted"].includes(p.status)&&(a?.householdId===h.id||b?.householdId===h.id))p.status="invalidated"}
    const members=h.memberIds.map(id=>this.state.characters[id]).filter((x):x is Character=>!!x&&x.alive);if(members.some(c=>c.immigrant))this.state.telemetry.immigration.bankruptcies++;this.state.telemetry.bankruptcies++;
    for(const c of members){const cohort=this.cohort(c);if(c.ageStage<3)cohort.diedBeforeWorker++;else if(c.ageStage<=6)cohort.workerDeaths++;else cohort.elderDeaths++;this.state.telemetry.bankruptcyByStage[String(c.ageStage)]=(this.state.telemetry.bankruptcyByStage[String(c.ageStage)]??0)+1;this.state.telemetry.lifecycle.deaths[String(c.ageStage)]=(this.state.telemetry.lifecycle.deaths[String(c.ageStage)]??0)+1;this.pushPlayerHistory(c.ownerId,"bankruptcy",c.id,"Hộ gia đình phá sản");c.alive=false;this.queueOwner(c,"bankruptcy")}
    this.settleEstate(h,h.childrenIds,members.map(c=>c.id),members.length>1);reconcileResidenceAfterDeath(this.state);this.state.chronology.push(`[Vòng ${this.state.round}] Hộ ${h.id}: phá sản; mọi lượt còn lại bị hủy.`);
  }

  rankings(){
    return Object.values(this.state.histories)
      .map(h=>({
        playerId:h.playerId,
        average:h.activeRounds?h.cumulativeAssets/h.activeRounds:0,
        cumulativeAssets:h.cumulativeAssets,
        activeRounds:h.activeRounds,
        lives:h.lives
      }))
      .sort((a,b)=>b.average-a.average);
  }
}
