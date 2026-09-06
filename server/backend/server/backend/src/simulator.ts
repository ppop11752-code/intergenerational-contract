import { GameEngine } from "./engine.js";
import { Character } from "./model.js";
import { Persona, GameConfig, DEFAULT_CONFIG } from "./config.js";
import { npcMarriageDecision, npcStatusDecision, npcVoluntaryDecision } from "./npc.js";

export interface SimulationRound{
  round:number;
  population:number;
  real:number;
  npc:number;
  debt:number;
  pool:{low:number;mid:number;high:number};
  nonRenewablePool:{low:number;mid:number;high:number};
  totalAssets:number;
  governmentBudget:number;
  taxCollected:number;
  inflationRate:number;priceIndex:number;debtCeiling:number;fiscalCrisis:boolean;supportFund:number;pensionReserve:number;pensionPayoutRatio:number;pensionCrisis:boolean;elderWorkerRatio:number;socialInvestmentReturn:number;births:number;bankruptcies:number;upwardMobilityShare:number;economicIncomeFactor:number;elderlyMedicalPaid:number;
}
export interface SimulationReport{
  rounds:SimulationRound[];
  ended:boolean;
  endingReason?:string;
  finalRanking:ReturnType<GameEngine["rankings"]>;
  diagnostics:{bankruptcyRecords:GameEngine["state"]["telemetry"]["bankruptcyRecords"];bankruptcyByStage:Record<string,number>;cashFlow:GameEngine["state"]["telemetry"]["cashFlow"];lifecycle:GameEngine["state"]["telemetry"]["lifecycle"];socialCrisisCauses:Record<string,number>;familyFlows:GameEngine["state"]["telemetry"]["familyFlows"];cohortTransitions:GameEngine["state"]["telemetry"]["cohortTransitions"];marriage:GameEngine["state"]["telemetry"]["marriage"];demography:GameEngine["state"]["telemetry"]["demography"];elderlyMedical:GameEngine["state"]["telemetry"]["elderlyMedical"];incomeFactor:GameEngine["state"]["telemetry"]["incomeFactor"];immigration:GameEngine["state"]["telemetry"]["immigration"]};
}

function seededRandom(seed:number){
  let x=seed>>>0;
  return()=>{x=(1664525*x+1013904223)>>>0;return x/4294967296};
}

function actAsPersona(game:GameEngine,c:Character,persona:Persona,random:()=>number){
  const oldNpc=c.npc, oldPersona=c.persona;
  c.npc=true;c.persona=persona;
  const r=npcVoluntaryDecision(game,c,random);
  c.npc=oldNpc;c.persona=oldPersona;
  return r;
}

function marriageAsPersona(game:GameEngine,c:Character,persona:Persona,random:()=>number){
  const oldNpc=c.npc, oldPersona=c.persona;
  c.npc=true;c.persona=persona;
  const r=npcMarriageDecision(game,c,random);
  c.npc=oldNpc;c.persona=oldPersona;
  return r;
}

function personaForCharacter(c:Character):Persona{
  if(c.npc)return c.persona??"moderate";
  const personas:Persona[]=["cautious","ambitious","altruistic","hedonist","moderate","fertile"];
  // Diagnostics must be reproducible. Character UUIDs are intentionally random
  // transport identities, so autopilot Persona assignment uses the stable ownerId.
  const stableKey=c.ownerId??c.id;
  let hash=0; for(const ch of stableKey)hash=(hash*31+ch.charCodeAt(0))>>>0;
  return personas[hash%personas.length]!;
}

export function simulateGame(seed=1,realPlayers=30,cfg:GameConfig=DEFAULT_CONFIG):SimulationReport{
  const random=seededRandom(seed);
  const game=new GameEngine(cfg);game.setRandomSource(random);
  for(let i=1;i<=realPlayers;i++)game.joinPlayer(`P${i}`);
  const rounds:SimulationRound[]=[];

  while(!game.state.ended&&game.state.round<game.cfg.game.totalRounds){
    game.startRound();
    game.buildTurnOrder(random);
    game.beginMandatoryPhase();

    // Marriage is a social/out-of-turn system. Give all living characters a
    // deterministic AI social window before and between economic turns.
    const socialWindow=()=>{
      for(const c of game.alive()){
        const persona=personaForCharacter(c);
        if(c.npc)npcMarriageDecision(game,c,random);
        else marriageAsPersona(game,c,persona,random);
      }
    };
    socialWindow();

    while(game.phase()!=="round_end"&&!game.state.ended){
      if(game.governmentTurnDueBeforeCurrentCharacter())game.runGovernmentTurn();
      const c=game.currentTurnCharacter();
      if(!c){break}
      if(game.phase()==="mandatory"){game.resolveCurrentMandatory();continue}
      if(game.phase()==="status"){
        const oldNpc=c.npc,oldPersona=c.persona;c.npc=true;c.persona=personaForCharacter(c);
        npcStatusDecision(game,c);c.npc=oldNpc;c.persona=oldPersona;continue;
      }
      if(game.phase()==="voluntary"){
        if(c.alive){
          if(c.npc)npcVoluntaryDecision(game,c,random);
          else actAsPersona(game,c,personaForCharacter(c),random);
        }
        game.completeVoluntaryTurn();socialWindow();continue;
      }
      break;
    }

    game.endRound();
    const alive=game.alive();
    rounds.push({
      round:game.state.round,
      population:alive.length,
      real:alive.filter(c=>!c.npc).length,
      npc:alive.filter(c=>c.npc).length,
      debt:game.state.debt,
      pool:{...game.state.pool},
      nonRenewablePool:{...game.state.nonRenewablePool},
      totalAssets:Object.values(game.state.households).filter(h=>h.active).reduce((s,h)=>s+game.householdAssets(h),0),
      governmentBudget:game.state.government.budget,
      taxCollected:game.state.government.taxCollectedThisRound,
      inflationRate:game.state.inflationRate,priceIndex:game.state.priceIndex,debtCeiling:game.debtCeiling(),fiscalCrisis:game.state.government.fiscalCrisis,supportFund:game.state.socialSecurity.support,pensionReserve:game.state.socialSecurity.pensionReserve,pensionPayoutRatio:game.state.socialSecurity.pensionPayoutRatio,pensionCrisis:game.state.socialSecurity.pensionCrisis,elderWorkerRatio:game.elders().length/Math.max(1,game.workers().length),socialInvestmentReturn:game.state.socialSecurity.investmentReturnRate,births:game.state.telemetry.births,bankruptcies:game.state.telemetry.bankruptcies,economicIncomeFactor:game.state.economicIncomeFactor,elderlyMedicalPaid:game.state.telemetry.elderlyMedical.paid,upwardMobilityShare:(()=>{const born=game.alive().filter(c=>c.parentsHouseholdId);const rank={poor:0,middle:1,noble:2};return born.length?born.filter(c=>rank[game.household(c).status]>rank[c.birthStatus]).length/born.length:0})()
    });
  }
  return{rounds,ended:game.state.ended,endingReason:game.state.endingReason,finalRanking:game.rankings(),diagnostics:{bankruptcyRecords:[...game.state.telemetry.bankruptcyRecords],bankruptcyByStage:{...game.state.telemetry.bankruptcyByStage},cashFlow:{...game.state.telemetry.cashFlow},lifecycle:{created:{...game.state.telemetry.lifecycle.created},deaths:{...game.state.telemetry.lifecycle.deaths}},socialCrisisCauses:{...game.state.telemetry.socialCrisisCauses},familyFlows:[...game.state.telemetry.familyFlows],cohortTransitions:structuredClone(game.state.telemetry.cohortTransitions),marriage:structuredClone(game.state.telemetry.marriage),demography:structuredClone(game.state.telemetry.demography),elderlyMedical:structuredClone(game.state.telemetry.elderlyMedical),incomeFactor:structuredClone(game.state.telemetry.incomeFactor),immigration:structuredClone(game.state.telemetry.immigration)}};
}

export function simulateMany(count=100,seed=1,cfg:GameConfig=DEFAULT_CONFIG){
  const reports=Array.from({length:count},(_,i)=>simulateGame(seed+i,30,cfg));
  const extinctions=reports.filter(r=>r.endingReason?.includes("Tuyệt chủng")).length;
  const avgFinalPopulation=reports.reduce((s,r)=>s+(r.rounds.at(-1)?.population??0),0)/reports.length;
  const avgFinalDebt=reports.reduce((s,r)=>s+(r.rounds.at(-1)?.debt??0),0)/reports.length;
  const avgRounds=reports.reduce((s,r)=>s+r.rounds.length,0)/reports.length;
  return{count,extinctions,extinctionRate:extinctions/count,avgFinalPopulation,avgFinalDebt,avgRounds,reports};
}
