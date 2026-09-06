import { GameEngine } from "./engine.js";
import { AiGoal, Character, Household } from "./model.js";
import { Persona, ResourceGrade, Status } from "./config.js";

const grades:ResourceGrade[]=["low","mid","high"];

export interface NpcDecisionSummary{
  characterId:string;
  persona:Persona;
  actions:string[];
}

function maxAffordableStatus(game:GameEngine,c:Character):Status{
  const h=game.household(c),cash=h.sharedCash,avg=game.state.roundAverageAssetsSnapshot||game.averageCitizenAssets();
  const persons=game.isCoupleHousehold(h)?2:1;
  const fees:{status:Status;fee:number}[]=[
    {status:"noble",fee:(game.cfg.status.fee.noble*game.state.priceIndex+avg*game.cfg.status.averageAssetRate.noble)*persons},
    {status:"middle",fee:(game.cfg.status.fee.middle*game.state.priceIndex+avg*game.cfg.status.averageAssetRate.middle)*persons},
    {status:"poor",fee:0}
  ];
  return fees.find(x=>x.fee<=cash*0.35)?.status??"poor";
}

function chooseGrade(status:Status,preferHigh:boolean):ResourceGrade{
  if(preferHigh&&status==="noble")return"high";
  if(preferHigh&&status==="middle")return"mid";
  return"low";
}

function safeBuy(game:GameEngine,c:Character,g:ResourceGrade,budget:number,actions:string[],type:"renewable"|"nonrenewable"="nonrenewable"){
  const price=game.marketPrice(g,type),pool=game.resourcePool(type);const units=Math.max(0,Math.min(Math.floor(budget/price),Math.floor(pool[g])));if(units<=0)return;
  try{game.buyResource(c,g,units,type);actions.push(`mua ${units} ${type}/${g}`)}catch{}
}

function safeRecover(game:GameEngine,c:Character,budget:number,actions:string[]){
  const price=game.marketPrice("low","renewable")*game.cfg.recovery.marketPriceRate*game.state.recoveryCostMultiplier;
  const units=Math.max(0,Math.floor(budget/price));
  if(units<=0)return;
  try{game.investRecovery(c,"low",units);actions.push(`phục hồi ${units} low`)}catch{}
}

function personaCompatibility(a:Persona,b:Persona){
  if(a===b)return .85;
  const family=new Set<Persona>(["fertile","altruistic","moderate"]);
  if(family.has(a)&&family.has(b))return .82;
  if((a==="cautious"&&b==="ambitious")||(a==="ambitious"&&b==="cautious"))return .62;
  if((a==="hedonist"&&b==="cautious")||(a==="cautious"&&b==="hedonist"))return .55;
  return .70;
}

function marriageFit(game:GameEngine,seeker:Character,target:Character){
  if(!target.alive||!game.isAdult(target)||game.isMarried(target)||game.areCloseFamily(seeker,target))return -Infinity;
  const sh=game.household(seeker),th=game.household(target);
  if(sh.id===th.id)return -Infinity;
  const stageGap=Math.abs(seeker.ageStage-target.ageStage);
  const ageFit=Math.max(0,1-stageGap/5);
  const seekerWorker=game.isWorkerAge(seeker),targetWorker=game.isWorkerAge(target);
  const reproductiveFit=seekerWorker&&targetWorker?1:seekerWorker!==targetWorker?.18:.55;
  const targetAssets=game.householdAssets(th);
  const subsistence=Math.max(1,game.cfg.living.base*game.state.priceIndex);
  const resilience=Math.min(1.5,targetAssets/(subsistence*8));
  const compatibility=personaCompatibility(seeker.persona??"moderate",target.persona??"moderate");
  // Compatibility matters most; economic resilience helps but does not turn
  // marriage into pure wealth maximization.
  return compatibility*.36+ageFit*.24+Math.min(1,resilience)*.14+reproductiveFit*.26;
}


function clamp(v:number,min=0,max=1){return Math.max(min,Math.min(max,v))}

function householdPersonas(game:GameEngine,h:Household):Persona[]{
  return h.memberIds.map(id=>game.state.characters[id])
    .filter((x):x is Character=>!!x&&x.alive&&x.ageStage>=3)
    .map(x=>x.persona??"moderate");
}

function blendedPersonaFactor(game:GameEngine,h:Household,key:"risk"|"family"|"growth"|"status"){
  const table:Record<Persona,Record<typeof key,number>>={
    cautious:{risk:.25,family:.48,growth:.35,status:.30},
    ambitious:{risk:.72,family:.45,growth:.90,status:.92},
    altruistic:{risk:.42,family:.85,growth:.45,status:.38},
    hedonist:{risk:.78,family:.35,growth:.68,status:.72},
    moderate:{risk:.50,family:.62,growth:.55,status:.50},
    fertile:{risk:.68,family:1.00,growth:.42,status:.32}
  };
  const ps=householdPersonas(game,h);
  return ps.length?ps.reduce((a,p)=>a+table[p][key],0)/ps.length:table.moderate[key];
}

function updateAdaptiveMemory(game:GameEngine,c:Character,estimatedMandatory:number){
  if(!c.npc)return;
  c.aiState??={memory:[],decisions:[],temporaryRiskModifier:0};
  const h=game.household(c),lots=h.investmentLots;
  const resolved=lots.filter(x=>x.purchaseRound<game.state.round);
  const success=resolved.length?resolved.filter(x=>x.units>0).length/resolved.length:.5;
  const bankruptcySignals=game.state.telemetry.bankruptcyRecords.filter(x=>x.round>=Math.max(1,game.state.round-2)).length;
  c.aiState.memory.push({
    round:game.state.round,cash:h.sharedCash,assets:game.householdAssets(h),
    netIncome:game.netIncome(h),mandatory:estimatedMandatory,
    investmentSuccessRate:success,fiscalCrisis:game.state.government.fiscalCrisis,
    pensionCrisis:game.state.socialSecurity.pensionCrisis,bankruptcySignals
  });
  c.aiState.memory=c.aiState.memory.slice(-3);
  const mem=c.aiState.memory;
  let modifier=0;
  if(mem.length>=2){
    const last=mem[mem.length-1]!,prev=mem[mem.length-2]!;
    if(last.assets<prev.assets*.85)modifier-=.14;
    if(last.netIncome<prev.netIncome*.75)modifier-=.10;
    if(last.investmentSuccessRate<.35)modifier-=.08;
    if(last.assets>prev.assets*1.15&&last.netIncome>=prev.netIncome)modifier+=.08;
    if(last.fiscalCrisis)modifier-=.06;
  }
  c.aiState.temporaryRiskModifier=Math.max(-.28,Math.min(.15,modifier));
}

function chooseGoal(game:GameEngine,c:Character,estimatedMandatory:number):AiGoal{
  const h=game.household(c),assets=game.householdAssets(h),cash=h.sharedCash;
  const coverage=estimatedMandatory>0?assets/estimatedMandatory:9;
  if(coverage<1.15||cash<estimatedMandatory*.8)return"survive";
  const family=blendedPersonaFactor(game,h,"family");
  const spouse=game.spouseOf(c);
  const workerCouple=!!spouse&&game.isWorkerAge(c)&&game.isWorkerAge(spouse);
  const lateWindow=workerCouple&&Math.max(c.ageStage,spouse.ageStage)>=5;
  // Demographic continuity: financially viable worker couples may keep FAMILY
  // as their goal even during a fiscal crisis. A macro crisis raises their
  // risk, but does not mechanically stop an entire generation from reproducing.
  // Late-window couples accept a thinner buffer because the opportunity will
  // disappear once either spouse enters Stage 7.
  if(workerCouple&&coverage>=(demographicContinuityPressure(game)>=.70?1.16:(lateWindow?1.25:1.55)))return"family";
  if(coverage<2.0||game.state.government.fiscalCrisis)return"stabilize";
  if(blendedPersonaFactor(game,h,"growth")>=.58)return"grow";
  return"status";
}

function recordDecision(game:GameEngine,c:Character,goal:AiGoal,risk:number,reserve:number,action:string,reason:string){
  if(!c.npc)return;
  c.aiState??={memory:[],decisions:[],temporaryRiskModifier:0};
  c.aiState.decisions.push({round:game.state.round,goal,riskScore:risk,projectedReserve:reserve,action,reason});
  c.aiState.decisions=c.aiState.decisions.slice(-12);
}


function demographicContinuityPressure(game:GameEngine){
  const alive=game.alive();
  const workers=alive.filter(c=>game.isWorkerAge(c));
  const children=alive.filter(c=>c.ageStage<=2);
  const lateWorkers=workers.filter(c=>c.ageStage>=5);
  const seen=new Set<string>(); let fertileCouples=0;
  for(const c of workers){
    const sp=game.spouseOf(c); if(!sp||!game.isWorkerAge(sp))continue;
    const key=[c.id,sp.id].sort().join('|'); if(seen.has(key))continue;
    seen.add(key); fertileCouples++;
  }
  // Two-round pipeline: today's children are the only people who can replace
  // workers leaving Stage 5–6 over the near future. Pressure rises when that
  // pipeline is too small or when too few worker-worker couples remain.
  const pipelineGap=Math.max(0,(lateWorkers.length+2)-children.length)/Math.max(2,lateWorkers.length+2);
  const coupleGap=Math.max(0,2-fertileCouples)/2;
  return clamp(Math.max(pipelineGap,coupleGap));
}

function socialLearningModifier(game:GameEngine,c:Character){
  const recent=game.state.telemetry.bankruptcyRecords.filter(x=>x.round>=Math.max(1,game.state.round-2));
  if(!recent.length)return 0;
  const h=game.household(c);
  const peers=recent.filter(x=>x.status===h.status);
  const pressure=clamp(peers.length/Math.max(3,game.alive().length*.18));
  const p=c.persona??"moderate";
  const sensitivity=p==="cautious"?.20:p==="fertile"?.05:p==="ambitious"?.08:.12;
  return -pressure*sensitivity;
}

function planningReserve(game:GameEngine,c:Character,estimatedMandatory:number,includeBirth=false){
  const h=game.household(c);
  const horizon=c.persona==="cautious"?2:c.persona==="fertile"?1:1.5;
  const income=Math.max(0,game.netIncome(h));
  const birth=includeBirth?game.projectedChildSupportAfterBirth(h):0;
  // Short planning horizon. Current income offsets part of recurring burden;
  // the planner remains conservative without suppressing family formation.
  const incrementalBirth=Math.max(0,birth-(includeBirth?game.childSupportObligation(game.netIncome(h),h.childrenIds.map(id=>game.state.characters[id]).filter(x=>x?.alive&&x.ageStage<=2).length):0));
  const recurring=Math.max(0,estimatedMandatory+incrementalBirth-income*.55);
  return recurring*horizon;
}

export function npcMarriageDecision(game:GameEngine,c:Character,random:()=>number=Math.random):string[] {
  const actions:string[]=[];
  if(!c.npc||!c.alive||!game.isAdult(c)||game.isMarried(c))return actions;
  c.aiState??={memory:[],decisions:[],temporaryRiskModifier:0};

  const incoming=Object.values(game.state.marriageProposals).find(p=>p.status==="pending"&&p.targetCharacterId===c.id);
  if(incoming){
    const proposer=game.state.characters[incoming.proposerCharacterId];
    const fit=proposer?marriageFit(game,c,proposer):-Infinity;
    const riskAdj=c.aiState.temporaryRiskModifier+socialLearningModifier(game,c);
    const continuity=demographicContinuityPressure(game);
    const workerMatch=!!proposer&&game.isWorkerAge(c)&&game.isWorkerAge(proposer);
    const threshold=(c.persona==="fertile"?.62:c.persona==="altruistic"?.67:c.persona==="cautious"?.78:.71)-riskAdj*.10-(workerMatch?continuity*.22:0);
    const accept=Number.isFinite(fit)&&(workerMatch&&continuity>=.50?true:fit+random()*.18>=threshold);
    game.respondMarriage(incoming.id,accept);
    const action=accept?`đồng ý kết hôn (fit ${fit.toFixed(2)})`:`từ chối kết hôn (fit ${Number.isFinite(fit)?fit.toFixed(2):"invalid"})`;
    actions.push(action);
    recordDecision(game,c,"family",clamp(.5+riskAdj),game.householdAssets(game.household(c)),action,`fit=${Number.isFinite(fit)?fit.toFixed(2):"invalid"}, threshold=${threshold.toFixed(2)}`);
    return actions;
  }

  const candidates=game.alive().filter(x=>x.id!==c.id&&game.isAdult(x)&&!game.isMarried(x)&&!game.areCloseFamily(c,x));
  if(candidates.length===0)return actions;
  const riskAdj=c.aiState.temporaryRiskModifier+socialLearningModifier(game,c);
  const desireBase=c.persona==="fertile"?.99:c.persona==="altruistic"?.92:c.persona==="moderate"?.88:c.persona==="ambitious"?.84:c.persona==="cautious"?.76:.76;
  const continuity=demographicContinuityPressure(game);
  const desire=game.isWorkerAge(c)&&continuity>=.50?1:clamp(desireBase+riskAdj*.15+(game.isWorkerAge(c)?continuity*.42:0));
  if(random()>desire)return actions;

  let ranked=candidates.map(x=>({x,fit:marriageFit(game,c,x)})).filter(v=>Number.isFinite(v.fit)).sort((a,b)=>b.fit-a.fit);
  if(game.isWorkerAge(c)){const workerPeers=ranked.filter(v=>game.isWorkerAge(v.x));if(workerPeers.length)ranked=workerPeers;}
  else{const elderPeers=ranked.filter(v=>!game.isWorkerAge(v.x));if(elderPeers.length)ranked=elderPeers;}
  if(!ranked.length)return actions;
  const shortlist=ranked.slice(0,3);
  const weights=shortlist.map(v=>Math.max(.05,v.fit));
  let roll=random()*weights.reduce((a,b)=>a+b,0),pick=shortlist[0]!;
  for(let i=0;i<shortlist.length;i++){roll-=weights[i]!;if(roll<=0){pick=shortlist[i]!;break}}
  try{
    game.proposeMarriage(c,pick.x);
    const action=`cầu hôn ${pick.x.id} (fit ${pick.fit.toFixed(2)})`;
    actions.push(action);
    recordDecision(game,c,"family",clamp(.5+riskAdj),game.householdAssets(game.household(c)),action,`top-3 bounded choice; desire=${desire.toFixed(2)}`);
  }catch{}
  return actions;
}

export function npcStatusDecision(game:GameEngine,c:Character):Status{
  if(!c.npc||!c.alive)throw Error("NPC status decision requires living NPC");
  const h=game.household(c);
  const estimated=Math.max(game.cfg.living.base*game.state.priceIndex,game.mandatoryBreakdown(c,Math.max(0,game.netIncome(h))).total);
  const goal=chooseGoal(game,c,estimated);let desired:Status;
  if(goal==="survive")desired="poor";
  else if(goal==="stabilize")desired=h.status==="noble"?"middle":"poor";
  else if(goal==="status")desired=maxAffordableStatus(game,c);
  else desired=(c.persona??"moderate")==="cautious"?(h.sharedCash>120?"middle":"poor"):maxAffordableStatus(game,c);
  try{return game.setStatus(c,desired)}catch{return game.autoSelectStatusForCurrent()}
}

export function npcVoluntaryDecision(game:GameEngine,c:Character,random:()=>number=Math.random):NpcDecisionSummary{
  const persona=c.persona??"moderate";
  const actions:string[]=[];
  if(!c.npc||!c.alive)return{characterId:c.id,persona,actions};
  const h=game.household(c);
  const pendingBirth=Object.values(game.state.birthProposals).find(p=>p.round===game.state.round&&p.status==="pending"&&p.responderCharacterId===c.id);
  if(pendingBirth){
    const support=game.projectedChildSupportAfterBirth(h),coverage=h.sharedCash/Math.max(1,support+game.cfg.living.base*game.state.priceIndex);
    const family=blendedPersonaFactor(game,h,"family"),accept=coverage>=.9||family>=.72;
    try{game.respondBirthProposal(c,pendingBirth.id,accept);actions.push(accept?`đồng ý Con #${pendingBirth.index}`:`từ chối Con #${pendingBirth.index}`)}catch{}
  }
  const cash=Math.max(0,h.sharedCash);

  let estimatedMandatory=game.cfg.living.base*game.state.priceIndex+game.cfg.government.taxFixed*game.state.priceIndex;
  try{estimatedMandatory=Math.max(estimatedMandatory,game.mandatoryBreakdown(c,Math.max(0,game.netIncome(h))).total)}catch{}
  updateAdaptiveMemory(game,c,estimatedMandatory);

  const memoryRisk=c.aiState?.temporaryRiskModifier??0;
  const socialRisk=socialLearningModifier(game,c);
  const jointRisk=blendedPersonaFactor(game,h,"risk");
  const effectiveRisk=clamp(jointRisk+memoryRisk+socialRisk);
  const goal=chooseGoal(game,c,estimatedMandatory);
  const horizonReserve=planningReserve(game,c,estimatedMandatory,false);

  const baseRiskBuffer=persona==="cautious"?1.75:persona==="fertile"?1.20:persona==="ambitious"?1.25:1.45;
  const adaptiveBuffer=Math.max(.85,baseRiskBuffer*(1.15-effectiveRisk*.30));
  const safetyReserve=Math.max(estimatedMandatory*adaptiveBuffer,horizonReserve,cash*(persona==="cautious"?.55:persona==="fertile"?.38:.46));
  const discretionary=Math.max(0,cash-safetyReserve);

  if(c.ageStage<=2){
    const share=goal==="survive"?.10:persona==="cautious"?.30:persona==="ambitious"?1:.50;
    safeBuy(game,c,"low",cash*share,actions,persona==="cautious"?"renewable":"nonrenewable");
    recordDecision(game,c,goal,effectiveRisk,safetyReserve,actions.at(-1)??"giữ tiền",`child-stage; reserve=${safetyReserve.toFixed(1)}`);
    return{characterId:c.id,persona,actions};
  }

  if(c.ageStage>=7){
    const desired=goal==="survive"||goal==="stabilize"?"poor":persona==="ambitious"?maxAffordableStatus(game,c):"poor";
    if(goal!=="survive"&&(persona==="ambitious"||persona==="hedonist"))safeBuy(game,c,chooseGrade(h.status,true),discretionary*.35,actions,"nonrenewable");
    recordDecision(game,c,goal,effectiveRisk,safetyReserve,actions.at(-1)??`địa vị ${h.status}`,`elder household; planner=${horizonReserve.toFixed(1)}`);
    return{characterId:c.id,persona,actions};
  }

  // SURVIVE and STABILIZE override personality-driven status escalation.
  let desired:Status;
  if(goal==="survive")desired="poor";
  else if(goal==="stabilize")desired=h.status==="noble"?"middle":"poor";
  else if(goal==="status")desired=maxAffordableStatus(game,c);
  else desired=persona==="cautious"?(cash>120?"middle":"poor"):persona==="altruistic"?"middle":maxAffordableStatus(game,c);

  // Household joint decision: both spouses influence family appetite and risk.
  const spouse=game.spouseOf(c);
  const canBiologicallyBirth=!!spouse&&game.isWorkerAge(c)&&game.isWorkerAge(spouse);
  const familyFactor=blendedPersonaFactor(game,h,"family");
  const continuity=demographicContinuityPressure(game);
  const birthChanceBase:Record<Persona,number>={cautious:.34,ambitious:.40,altruistic:.56,hedonist:.28,moderate:.48,fertile:.72};
  const existingChildren=h.childrenIds.map(id=>game.state.characters[id]).filter((x):x is Character=>!!x).length;
  const spousePersona=spouse?.persona??"moderate";
  const childTargetByPersona:Record<Persona,number>={cautious:2,ambitious:2,altruistic:2,hedonist:1,moderate:2,fertile:3};
  const baseDesiredChildren=Math.max(1,Math.round((childTargetByPersona[persona]+childTargetByPersona[spousePersona])/2));
  const desiredChildren=Math.min(4,baseDesiredChildren+(continuity>=.55?1:0));
  const oldestStage=spouse?Math.max(c.ageStage,spouse.ageStage):c.ageStage;
  // Intergenerational spacing: because one round = ten years, AI does not try
  // to finish its family immediately. First child is favored early in working
  // life, the replacement child is deliberately favored at Stage 5–6, and a
  // third child is mainly a fertile-household late-life choice. This spreads
  // descendant cohorts across time instead of creating synchronized waves.
  let cadence=1;
  if(existingChildren>=desiredChildren)cadence=0;
  else if(existingChildren===0)cadence=oldestStage<=4?1.15:.95;
  else if(existingChildren===1)cadence=oldestStage<=4?.08:oldestStage===5?1.70:2.10;
  else cadence=oldestStage>=6?1.45:.10;
  let birthChance=clamp(((birthChanceBase[persona]*(.70+.55*familyFactor)+socialRisk*.15)+continuity*.28)*cadence);
  if(continuity>=.70&&existingChildren<desiredChildren)birthChance=Math.max(birthChance,.92);
  if(goal==="family"&&canBiologicallyBirth&&h.representativeCharacterId===c.id&&cadence>0&&random()<birthChance){
    const projectedChildSupport=game.projectedChildSupportAfterBirth(h);
    const coverage:Record<Persona,number>={cautious:1.15,ambitious:.90,altruistic:1.00,hedonist:.82,moderate:.95,fertile:.70};
    const reserveRate=persona==="fertile"?.24:persona==="cautious"?.50:.36;
    const postBirthNeed=estimatedMandatory+projectedChildSupport;
    const planned=planningReserve(game,c,estimatedMandatory,true);
    const lateFactor=spouse&&Math.max(c.ageStage,spouse.ageStage)>=6?.48:spouse&&Math.max(c.ageStage,spouse.ageStage)>=5?.66:1;
    const continuityReserveFactor=1-continuity*.30;
    const reserve=Math.max(
      postBirthNeed*coverage[persona]*(1.10-effectiveRisk*.15)*lateFactor*continuityReserveFactor,
      planned*lateFactor*continuityReserveFactor,
      15,h.sharedCash*reserveRate
    );
    if(h.sharedCash>=reserve){
      const proposal=game.attemptBirth(h);
      if(proposal){
        actions.push(`đề xuất sinh Con #${proposal.index}`);
        recordDecision(game,c,goal,effectiveRisk,reserve,`đề xuất sinh Con #${proposal.index}`,`jointFamily=${familyFactor.toFixed(2)}, projectedSupport=${projectedChildSupport.toFixed(1)}`);
      }
    }else{
      const action=`hoãn sinh: dự phòng ${h.sharedCash.toFixed(1)}/${reserve.toFixed(1)}`;
      actions.push(action);
      recordDecision(game,c,goal,effectiveRisk,reserve,action,`planner=${planned.toFixed(1)}, projectedSupport=${projectedChildSupport.toFixed(1)}`);
    }
  }

  // Goal hierarchy controls voluntary investment.
  if(goal==="survive"){
    recordDecision(game,c,goal,effectiveRisk,safetyReserve,"giữ thanh khoản",`coverage thấp; mandatory=${estimatedMandatory.toFixed(1)}`);
    return{characterId:c.id,persona,actions};
  }
  if(goal==="stabilize"){
    if(discretionary>0&&persona==="cautious")safeBuy(game,c,"low",discretionary*.18,actions,"renewable");
    recordDecision(game,c,goal,effectiveRisk,safetyReserve,actions.at(-1)??"tích lũy dự phòng",`planner=${horizonReserve.toFixed(1)}`);
    return{characterId:c.id,persona,actions};
  }

  const growth=blendedPersonaFactor(game,h,"growth");
  const spendScale=.65+.45*effectiveRisk;
  if(persona==="fertile"){
    safeBuy(game,c,"low",Math.max(0,discretionary*.30*spendScale),actions,"renewable");
  }else if(persona==="ambitious"||persona==="hedonist"){
    safeBuy(game,c,chooseGrade(h.status,true),discretionary*.65*spendScale,actions,"nonrenewable");
  }else if(persona==="altruistic"){
    safeRecover(game,c,discretionary*.22*(1-effectiveRisk*.25),actions);
    safeBuy(game,c,chooseGrade(h.status,false),discretionary*.48*spendScale,actions,"renewable");
  }else if(persona==="cautious"){
    safeRecover(game,c,discretionary*.16,actions);
    safeBuy(game,c,"low",discretionary*.34*spendScale,actions,"renewable");
  }else{
    safeBuy(game,c,chooseGrade(h.status,true),discretionary*(.42+.18*growth)*spendScale,actions,random()<.5?"renewable":"nonrenewable");
  }

  recordDecision(game,c,goal,effectiveRisk,safetyReserve,actions.at(-1)??"giữ tiền",`jointRisk=${jointRisk.toFixed(2)}, memory=${memoryRisk.toFixed(2)}, social=${socialRisk.toFixed(2)}, planner=${horizonReserve.toFixed(1)}`);
  return{characterId:c.id,persona,actions};
}
