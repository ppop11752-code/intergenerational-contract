import { GameEngine } from "./engine.js";
import { npcMarriageDecision, npcStatusDecision, npcVoluntaryDecision } from "./npc.js";
import type { Character } from "./model.js";
import type { ResourceGrade, ResourceType, Status } from "./config.js";

export type PlayerConnection={
  playerId:string;displayName:string;host:boolean;socketId:string|null;connected:boolean;reconnectToken:string;joinedAt:number;aiTakeoverCharacterId:string|null;
};

export type ClientAction=
 |{type:"marriage:propose";targetCharacterId:string}
 |{type:"marriage:respond";proposalId:string;accept:boolean}
 |{type:"marriage:cancel";proposalId:string}
 |{type:"resource:buy";resourceType:ResourceType;grade:ResourceGrade;units:number}
 |{type:"resource:recover";grade:ResourceGrade;units:number}
 |{type:"family:support";targetCharacterId:string;amount:number}
 |{type:"child:birth"}
 |{type:"child:respond";proposalId:string;accept:boolean}
 |{type:"status:set";status:Status}
 |{type:"turn:complete"};

export type ActionResult={ok:true;queuePosition?:number|null;reconnectToken?:string}|{ok:false;error:string};
export type FounderDrawResult={playerId:string;displayName:string;card:number;founder:boolean;queuePosition:number|null};

type DeadlineKind="mandatory"|"status"|"voluntary"|null;
export type RoomTimingConfig={mandatoryPresentationMs:number;statusTimeoutMs:number;voluntaryTimeoutMs:number};
export const DEFAULT_MANDATORY_PRESENTATION_MS=5_000;

export class AuthoritativeRoom{
  readonly code:string;
  readonly players=new Map<string,PlayerConnection>();
  hostPlayerId:string;
  started=false;
  engine:GameEngine|null=null;
  phaseDeadlineAt:number|null=null;
  phaseDeadlineKind:DeadlineKind=null;
  readonly mandatoryPresentationMs:number;
  readonly statusTimeoutMs:number;
  readonly voluntaryTimeoutMs:number;
  readonly initialPopulationTarget=10;
  founderDraw:FounderDrawResult[]=[];
  initialNpcCount=0;

  constructor(code:string,hostPlayerId:string,displayName:string,socketId:string,timing:Partial<RoomTimingConfig>={}){
    this.code=code;this.hostPlayerId=hostPlayerId;
    this.mandatoryPresentationMs=Math.max(1_000,timing.mandatoryPresentationMs??DEFAULT_MANDATORY_PRESENTATION_MS);
    this.statusTimeoutMs=Math.max(1_000,timing.statusTimeoutMs??15_000);
    this.voluntaryTimeoutMs=Math.max(1_000,timing.voluntaryTimeoutMs??60_000);
    this.players.set(hostPlayerId,{playerId:hostPlayerId,displayName,host:true,socketId,connected:true,reconnectToken:crypto.randomUUID(),joinedAt:Date.now(),aiTakeoverCharacterId:null});
  }

  private connectedHumans(){return[...this.players.values()].filter(p=>p.connected)}

  join(playerId:string,displayName:string,socketId:string):ActionResult{
    if(this.players.size>=30)return{ok:false,error:"ROOM_FULL"};
    if(this.players.has(playerId))return{ok:false,error:"PLAYER_ID_TAKEN"};
    if(this.started&&(!this.engine||this.engine.state.ended))return{ok:false,error:"GAME_ENDED"};
    const reconnectToken=crypto.randomUUID();
    const p={playerId,displayName,host:false,socketId,connected:true,reconnectToken,joinedAt:Date.now(),aiTakeoverCharacterId:null};this.players.set(playerId,p);
    if(this.started){
      const engine=this.engine!;
      const queuePosition=engine.registerQueuedPlayer(playerId);if(queuePosition==null){this.players.delete(playerId);return{ok:false,error:"ROOM_FULL"}}
      engine.state.chronology.push(`[Vòng ${engine.state.round}] ${playerId} tham gia muộn → Hàng chờ #${queuePosition}`);
      return{ok:true,reconnectToken,queuePosition};
    }
    return{ok:true,reconnectToken};
  }

  reconnect(playerId:string,token:string,socketId:string):ActionResult{
    const p=this.players.get(playerId);if(!p||p.reconnectToken!==token)return{ok:false,error:"INVALID_RECONNECT_TOKEN"};
    p.socketId=socketId;p.connected=true;let queuePosition:number|null=null;
    if(this.started&&this.engine&&!this.engine.state.ended){queuePosition=this.engine.movePlayerToQueueEnd(playerId);this.engine.state.chronology.push(`[Vòng ${this.engine.state.round}] ${playerId} kết nối lại → cuối Hàng chờ${queuePosition?` #${queuePosition}`:""}`)}
    return{ok:true,queuePosition};
  }

  disconnectSocket(socketId:string,random:()=>number=Math.random){
    let matched=false,currentTurnDetached=false;
    for(const p of this.players.values())if(p.socketId===socketId){
      matched=true;p.socketId=null;p.connected=false;
      if(this.started&&this.engine&&!this.engine.state.ended){
        this.engine.setRandomSource(random);
        const currentBefore=this.engine.currentTurnCharacter()?.id??null;
        const detached=this.engine.detachPlayerToNpc(p.playerId);
        if(detached){p.aiTakeoverCharacterId=detached.id;if(detached.id===currentBefore)currentTurnDetached=true}
      }
    }
    // A non-current disconnect must not reset another Human's authoritative deadline.
    // Only when the disconnected Character owns the active turn do we clear the
    // Human timer and immediately hand the phase to NPC automation.
    if(currentTurnDetached){this.clearDeadline();this.advanceAutomatedTurns(random)}
    return matched;
  }

  replay(playerId:string):ActionResult{
    if(playerId!==this.hostPlayerId)return{ok:false,error:"HOST_ONLY"};
    if(!this.started||!this.engine?.state.ended)return{ok:false,error:"GAME_NOT_ENDED"};
    this.started=false;this.engine=null;this.founderDraw=[];this.initialNpcCount=0;this.clearDeadline();for(const p of this.players.values())p.aiTakeoverCharacterId=null;return{ok:true};
  }

  private shuffledUniqueCards(count:number,random:()=>number){
    const deck=Array.from({length:100+count},(_,i)=>i+1);for(let i=deck.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[deck[i],deck[j]]=[deck[j]!,deck[i]!]}return deck.slice(0,count);
  }

  start(playerId:string,random:()=>number=Math.random):ActionResult{
    if(playerId!==this.hostPlayerId)return{ok:false,error:"HOST_ONLY"};if(this.started)return{ok:false,error:"GAME_ALREADY_STARTED"};
    const connected=this.connectedHumans();if(connected.length<1)return{ok:false,error:"MIN_1_PLAYER"};
    const engine=new GameEngine();engine.setRandomSource(random);this.founderDraw=[];this.initialNpcCount=0;
    if(connected.length>10){
      const cards=this.shuffledUniqueCards(connected.length,random);const scored=connected.map((p,i)=>({p,card:cards[i]!})).sort((a,b)=>b.card-a.card);
      scored.slice(0,10).forEach(x=>engine.joinPlayer(x.p.playerId));
      scored.slice(10).forEach(x=>engine.registerQueuedPlayer(x.p.playerId));
      this.founderDraw=scored.map((x,i)=>({playerId:x.p.playerId,displayName:x.p.displayName,card:x.card,founder:i<10,queuePosition:i<10?null:i-9}));
    }else{
      connected.forEach(p=>engine.joinPlayer(p.playerId));
      const missing=10-connected.length;for(let i=0;i<missing;i++)engine.createInitialBot();this.initialNpcCount=missing;
    }
    this.engine=engine;this.started=true;engine.state.chronology.push(`[Khởi tạo] ${connected.length} Human; ${this.initialNpcCount} NPC founder; founder draw=${connected.length>10}`);
    this.beginRound(random);return{ok:true};
  }

  private beginRound(random:()=>number){const e=this.engine!;e.startRound();e.buildTurnOrder(random);e.beginMandatoryPhase();this.clearDeadline();this.advanceAutomatedTurns(random)}
  private clearDeadline(){this.phaseDeadlineAt=null;this.phaseDeadlineKind=null}
  private schedule(kind:Exclude<DeadlineKind,null>){const ms=kind==="mandatory"?this.mandatoryPresentationMs:kind==="status"?this.statusTimeoutMs:this.voluntaryTimeoutMs;this.phaseDeadlineKind=kind;this.phaseDeadlineAt=Date.now()+ms}

  enforceTurnTimeout(random:()=>number=Math.random){
    const e=this.engine;if(!e||e.state.ended||this.phaseDeadlineAt==null||Date.now()<this.phaseDeadlineAt)return false;
    const kind=this.phaseDeadlineKind;this.clearDeadline();
    try{
      if(kind==="mandatory"&&e.phase()==="mandatory")e.resolveCurrentMandatory();
      else if(kind==="status"&&e.phase()==="status")e.autoSelectStatusForCurrent();
      else if(kind==="voluntary"&&e.phase()==="voluntary")e.completeVoluntaryTurn();
      else return false;
    }finally{this.runNpcSocialWindow(random);this.advanceAutomatedTurns(random)}
    return true;
  }

  private runNpcSocialWindow(random:()=>number){
    const e=this.engine;if(!e||e.state.ended)return;const current=e.currentTurnCharacter();
    for(const c of e.alive().filter(c=>c.npc&&c.id!==current?.id)){
      try{npcMarriageDecision(e,c,random)}catch{}
    }
  }

  private advanceAutomatedTurns(random:()=>number=Math.random){
    const e=this.engine;if(!e)return;let guard=0;
    while(!e.state.ended&&guard++<20_000){
      if(e.governmentTurnDueBeforeCurrentCharacter()){e.runGovernmentTurn();continue}
      if(e.phase()==="mandatory"){
        const c=e.currentTurnCharacter();if(!c){break}if(!c.alive){e.resolveCurrentMandatory();continue}
        if(c.npc){e.resolveCurrentMandatory();continue}this.schedule("mandatory");break;
      }
      if(e.phase()==="status"){
        const c=e.currentTurnCharacter();if(!c){break}if(!c.alive){e.autoSelectStatusForCurrent();continue}
        if(c.npc){npcStatusDecision(e,c);continue}this.schedule("status");break;
      }
      if(e.phase()==="voluntary"){
        const c=e.currentTurnCharacter();if(!c){break}if(!c.alive){e.completeVoluntaryTurn();continue}
        if(c.npc){npcVoluntaryDecision(e,c,random);e.completeVoluntaryTurn();this.runNpcSocialWindow(random);continue}
        this.schedule("voluntary");break;
      }
      if(e.phase()==="round_end"){
        e.endRound();this.clearDeadline();if(e.state.ended)break;this.beginRound(random);return;
      }
      break;
    }
  }

  private activeCharacterFor(playerId:string){const e=this.engine;return e?e.alive().find(c=>c.ownerId===playerId)??null:null}
  private currentCharacterOwnedBy(playerId:string){const e=this.engine;if(!e)return null;const c=e.currentTurnCharacter();return c&&c.ownerId===playerId?c:null}

  act(playerId:string,action:ClientAction,random:()=>number=Math.random):ActionResult{
    const e=this.engine;if(!this.started||!e)return{ok:false,error:"GAME_NOT_STARTED"};if(e.state.ended)return{ok:false,error:"GAME_ENDED"};
    const actor=this.activeCharacterFor(playerId);if(!actor)return{ok:false,error:"NO_ACTIVE_CHARACTER"};
    try{
      // Social marriage actions are deliberately outside the turn phase.
      if(action.type==="marriage:propose"){
        const target=e.state.characters[action.targetCharacterId];if(!target)return{ok:false,error:"TARGET_NOT_FOUND"};e.proposeMarriage(actor,target);this.runNpcSocialWindow(random);return{ok:true};
      }
      if(action.type==="marriage:respond"){
        const p=e.state.marriageProposals[action.proposalId];if(!p||p.targetCharacterId!==actor.id)return{ok:false,error:"NOT_PROPOSAL_TARGET"};e.respondMarriage(action.proposalId,action.accept);return{ok:true};
      }
      if(action.type==="marriage:cancel"){
        e.cancelMarriageProposal(actor,action.proposalId);return{ok:true};
      }
      const current=this.currentCharacterOwnedBy(playerId);if(!current)return{ok:false,error:"NOT_YOUR_TURN"};
      if(e.phase()==="status"){
        if(action.type!=="status:set")return{ok:false,error:"STATUS_SELECTION_REQUIRED"};e.setStatus(current,action.status);this.clearDeadline();this.advanceAutomatedTurns(random);return{ok:true};
      }
      if(e.phase()!=="voluntary")return{ok:false,error:"NO_PLAYER_INPUT_EXPECTED"};
      if(action.type==="resource:buy")e.buyResource(current,action.grade,Math.floor(action.units),action.resourceType);
      else if(action.type==="resource:recover")e.investRecovery(current,action.grade,Math.floor(action.units));
      else if(action.type==="family:support"){
        const target=e.state.characters[action.targetCharacterId];if(!target)return{ok:false,error:"TARGET_NOT_FOUND"};e.voluntaryFamilySupport(current,target,action.amount);
      }
      else if(action.type==="child:birth")e.attemptBirth(e.household(current));
      else if(action.type==="child:respond")e.respondBirthProposal(current,action.proposalId,action.accept);
      else if(action.type==="turn:complete"){e.completeVoluntaryTurn();this.clearDeadline();this.runNpcSocialWindow(random);this.advanceAutomatedTurns(random)}
      else return{ok:false,error:"ACTION_NOT_ALLOWED_IN_VOLUNTARY"};
      return{ok:true};
    }catch(err){return{ok:false,error:err instanceof Error?err.message:"ACTION_FAILED"}}
  }

  private ageLabel(stage:number){const from=(stage-1)*10,to=from+9;const group=stage<=2?"Trẻ em":stage<=6?"Lao động":"Cao tuổi";return`${group} · ${from}–${to} tuổi`}
  private resourceAccess(status:Status){return status==="noble"?["low","mid","high"]:status==="middle"?["low","mid"]:["low"]}
  private marketSnapshot(){const e=this.engine!;const grades=["low","mid","high"] as const,types=["renewable","nonrenewable"] as const;return Object.fromEntries(types.map(type=>[type,Object.fromEntries(grades.map(grade=>[grade,{price:e.marketPrice(grade,type),successReturn:e.resourceInterest(type,grade)+e.state.eventInterestDelta,failureRate:e.cfg.investmentFailureRate[grade],pool:e.resourcePool(type)[grade],subsidyRate:e.state.government.subsidyRate[grade]}]))]))}
  private familyReferences(c:Character){
    const e=this.engine!;
    const parentCharacterIds=Object.values(e.state.characters).filter(parent=>parent.childrenIds.includes(c.id)).map(parent=>parent.id).sort();
    const spouse=e.spouseOf(c);
    return{parentCharacterIds,spouseCharacterIds:spouse?[spouse.id]:[],childCharacterIds:[...c.childrenIds].sort()};
  }
  private residenceRoleKeys(c:Character){
    const e=this.engine!,family=this.familyReferences(c),sameResidence=(id:string)=>e.state.characters[id]?.alive===true&&e.state.characters[id]?.currentResidenceId===c.currentResidenceId;
    const keys:Array<"spouse"|"parent"|"child"|"resident">=[];
    if(family.spouseCharacterIds.some(sameResidence))keys.push("spouse");
    if(family.childCharacterIds.some(sameResidence))keys.push("parent");
    if(family.parentCharacterIds.some(sameResidence))keys.push("child");
    return keys.length?keys:["resident"];
  }
  private residenceSnapshot(){
    const e=this.engine!;
    const entries=Object.values(e.state.residences).sort((a,b)=>a.residenceId.localeCompare(b.residenceId)).map(residence=>{
      const activeOnMap=residence.status!=="reclaimed";
      return[residence.residenceId,{
        residenceId:residence.residenceId,status:residence.status,origin:residence.origin,createdRound:residence.createdRound,
        coordinates:{...residence.coordinates},activeOnMap,currentNavigationAllowed:activeOnMap,
        emptySinceRound:residence.emptySinceRound,abandonedRound:residence.abandonedRound,reclaimedRound:residence.reclaimedRound,
        parentResidenceIds:[...residence.parentResidenceIds],occupants:[...residence.occupantIds].sort().map(characterId=>{
          const c=e.state.characters[characterId]!;
          return{characterId,roleKeys:this.residenceRoleKeys(c),...this.familyReferences(c)};
        })
      }] as const;
    });
    return{residenceDirectory:Object.fromEntries(entries),activeMapResidenceIds:entries.filter(([,record])=>record.activeOnMap).map(([residenceId])=>residenceId)};
  }

  publicSnapshot(){
    const e=this.engine,current=e?.currentTurnCharacter();
    return{code:this.code,started:this.started,hostPlayerId:this.hostPlayerId,initialPopulationTarget:this.initialPopulationTarget,initialNpcCount:this.initialNpcCount,founderDraw:this.founderDraw,
      players:[...this.players.values()].map(p=>{const active=this.activeCharacterFor(p.playerId);return{playerId:p.playerId,displayName:p.displayName,host:p.host,connected:p.connected,activeCharacterId:active?.id??null,currentResidenceId:active?.currentResidenceId??null,aiTakeoverCharacterId:p.aiTakeoverCharacterId,queuePosition:e&&e.state.waitingQueue.includes(p.playerId)?e.state.waitingQueue.indexOf(p.playerId)+1:null}}),
      game:e?{round:e.state.round,year:(e.state.round-1)*10,phase:e.phase(),ended:e.state.ended,endingReason:e.state.endingReason??null,eventName:e.state.eventName,worldEvent:e.state.worldEventOccurrences.at(-1)?.round===e.state.round?e.state.worldEventOccurrences.at(-1)??null:null,currentTurnCharacterId:current?.id??null,currentTurnPlayerId:current?.ownerId??null,phaseDeadlineAt:this.phaseDeadlineAt,phaseDeadlineKind:this.phaseDeadlineKind,
        debt:e.state.debt,government:{budget:e.state.government.budget,reserveFloor:e.state.government.reserveFloor,taxCollectedThisRound:e.state.government.taxCollectedThisRound,maintenancePaidThisRound:e.state.government.maintenancePaidThisRound,borrowedThisRound:e.state.government.borrowedThisRound,debtRepaidThisRound:e.state.government.debtRepaidThisRound,subsidySpentThisRound:e.state.government.subsidySpentThisRound,subsidyRate:e.state.government.subsidyRate,turnCard:e.state.government.turnCard,purchaseTurnPosition:e.state.government.purchaseTurnPosition,interventions:e.state.government.interventions,fiscalCrisis:e.state.government.fiscalCrisis,debtCeiling:e.debtCeiling(),fiscalHistory:e.state.government.fiscalHistory},
        pool:e.state.pool,nonRenewablePool:e.state.nonRenewablePool,market:this.marketSnapshot(),policy:{inflationRate:e.state.inflationRate,priceIndex:e.state.priceIndex,economicIncomeFactor:e.state.economicIncomeFactor,economicIncomeReasons:e.state.economicIncomeReasons,noblePopulationShare:e.cfg.status.noblePopulationShare,roundAverageAssetsSnapshot:e.state.roundAverageAssetsSnapshot},
        waitingQueue:[...e.state.waitingQueue],population:{total:e.alive().length,humanControlled:e.alive().filter(c=>!c.npc).length,npc:e.alive().filter(c=>c.npc).length,immigrantsAlive:e.alive().filter(c=>c.immigrant).length},
        socialSecurity:{payg:e.state.socialSecurity.payg,support:e.state.socialSecurity.support,pensionReserve:e.state.socialSecurity.pensionReserve,pensionTarget:e.state.socialSecurity.pensionTargetThisRound,pensionPaid:e.state.socialSecurity.pensionPaidThisRound,pensionStateTransfer:e.state.socialSecurity.pensionStateTransferThisRound,pensionPayoutRatio:e.state.socialSecurity.pensionPayoutRatio,pensionCrisis:e.state.socialSecurity.pensionCrisis,investmentReturn:e.state.socialSecurity.investmentReturnRate,workers:e.workers().length,elders:e.elders().length},
        turnOrder:e.state.turnState.entries.map(x=>({...x})),marriageProposals:Object.values(e.state.marriageProposals).filter(p=>p.status==="pending"||p.status==="accepted"),birthProposals:Object.values(e.state.birthProposals).filter(p=>p.round===e.state.round),statusPurchases:Object.values(e.state.statusPurchases),
        characters:e.alive().map(c=>{const h=e.household(c);return{characterId:c.id,ownerId:c.ownerId,npc:c.npc,immigrant:!!c.immigrant,ageStage:c.ageStage,ageLabel:this.ageLabel(c.ageStage),status:h.status,pendingStatus:h.pendingStatus,householdId:h.id,currentResidenceId:c.currentResidenceId,householdAssets:e.householdAssets(h),cash:h.sharedCash,fundedSocialSecurity:h.memberIds.reduce((a,id)=>a+(e.state.socialSecurity.personalBalances[id]??0),0),married:e.isMarried(c),...this.familyReferences(c),parentHouseholdId:c.parentsHouseholdId,renewableResources:{...h.sharedResources},nonRenewableResources:{...h.sharedNonRenewableResources},taxPaidThisRound:e.state.government.taxPaidByCharacter[c.id]??0,elderlyMedicalDue:c.elderlyMedicalDueThisRound,elderlyMedicalPaid:c.elderlyMedicalPaidThisRound,mortalityRisk:c.lastMortalityRisk}}),
        ...this.residenceSnapshot(),historySnapshots:e.state.historySnapshots,worldEventOccurrences:e.state.worldEventOccurrences,lifecycleResults:e.state.lifecycleResults.slice(-120),rankings:e.rankings(),chronology:e.state.chronology.slice(-120)}:null};
  }

  privateSnapshot(playerId:string){
    const e=this.engine;if(!e)return{playerId,character:null,currentResidenceId:null,household:null,recentLifecycleResults:[],queuePosition:null,canInitiateBirth:false,eligibleSupportTargets:[],supportUnavailableReason:null,marketQuotes:[],mandatoryQuote:null,recoveryQuotes:[],birthQuote:null,statusQuote:null};const c=this.activeCharacterFor(playerId),h=c?e.household(c):null;
    const marriageCandidates=c&&c.ageStage>=3&&!e.isMarried(c)&&!e.hasAcceptedMarriagePending(c)?e.alive().filter(x=>x.id!==c.id&&x.ageStage>=3&&!e.isMarried(x)&&!e.hasAcceptedMarriagePending(x)&&!e.areCloseFamily(c,x)).map(x=>({characterId:x.id,ownerId:x.ownerId,npc:x.npc,ageStage:x.ageStage,ageLabel:this.ageLabel(x.ageStage),status:e.household(x).status,householdAssets:e.householdAssets(e.household(x))})):[];
    const ownsCurrentTurn=!!c&&e.currentTurnCharacter()?.id===c.id;
    const inOwnVoluntary=!!c&&ownsCurrentTurn&&e.phase()==="voluntary";
    const eligibleSupportTargets=inOwnVoluntary?e.alive().filter(target=>e.isEligibleVoluntarySupportTarget(c!,target)).map(target=>({characterId:target.id,relation:(target.childrenIds.includes(c!.id)?"parent":"child") as "parent"|"child",ageLabel:this.ageLabel(target.ageStage),status:e.household(target).status,...e.supportTransferQuote(c!,target)})):[];
    const supportUnavailableReason=inOwnVoluntary&&eligibleSupportTargets.length===0?"SUPPORT_NO_ELIGIBLE_TARGETS":null;
    const marketQuotes=inOwnVoluntary?(["renewable","nonrenewable"] as ResourceType[]).flatMap(type=>(["low","mid","high"] as ResourceGrade[]).map(grade=>e.marketPurchaseQuote(c!,type,grade))):[];
    const mandatoryQuote=c&&ownsCurrentTurn&&e.phase()==="mandatory"?e.mandatoryQuote(c):null;
    const recoveryQuotes=inOwnVoluntary?(["low","mid","high"] as ResourceGrade[]).map(grade=>e.recoveryActionQuote(c!,grade)):[];
    const birthQuote=c?e.birthSelectionQuote(c):null;
    const statusQuote=c&&h?.representativeCharacterId===c.id&&ownsCurrentTurn&&e.phase()==="status"?e.statusSelectionQuote(c):null;
    const personalIncome=c?(e.state.realizedNetIncomeByCharacter[c.id]??0):0;
    const limit=c?(e.state.spendingLimitByCharacter[c.id]??null):null,sharedCharge=c?(e.state.sharedQuotaChargeByCharacter[c.id]??0):0,voluntarySpent=c?(e.state.voluntarySpentByCharacter[c.id]??0):0;
    return{playerId,character:c?{...c,ageLabel:this.ageLabel(c.ageStage)}:null,currentResidenceId:c?.currentResidenceId??null,household:h,history:e.state.histories[playerId]??null,recentLifecycleResults:e.state.lifecycleResults.filter(result=>result.playerId===playerId||result.characterIds.some(id=>e.state.characters[id]?.ownerId===playerId)).slice(-40),queuePosition:e.state.waitingQueue.includes(playerId)?e.state.waitingQueue.indexOf(playerId)+1:null,
      financial:h?{householdAssets:e.householdAssets(h),roundStartAssets:h.roundStartAssets,cash:h.sharedCash,householdNetIncome:e.netIncome(h),personalNetIncome:personalIncome,fundedSocialSecurity:c?(e.state.socialSecurity.personalBalances[c.id]??0):0,spendingLimit:limit,sharedQuotaCharge:sharedCharge,voluntarySpent,spendingRemaining:limit==null?null:Math.max(0,limit-sharedCharge-voluntarySpent),resourceAccess:this.resourceAccess(h.status),representative:h.representativeCharacterId===c?.id}:null,
      incomingMarriageProposals:c?Object.values(e.state.marriageProposals).filter(p=>p.status==="pending"&&p.targetCharacterId===c.id):[],outgoingMarriageProposals:c?Object.values(e.state.marriageProposals).filter(p=>p.status==="pending"&&p.proposerCharacterId===c.id):[],incomingBirthProposals:c?Object.values(e.state.birthProposals).filter(p=>p.status==="pending"&&p.responderCharacterId===c.id):[],marriageCandidates,eligibleSupportTargets,supportUnavailableReason,marketQuotes,mandatoryQuote,recoveryQuotes,birthQuote,statusQuote,
      canSendMarriage:c?e.currentTurnCharacter()?.id!==c.id:false,canInitiateBirth:!!h&&e.canInitiateBirth(h),currentPhase:e.phase(),phaseDeadlineAt:this.phaseDeadlineAt};
  }
}
