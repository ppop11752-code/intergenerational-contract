import type {Character,GameState} from "./model.js";

export type ResidenceStatus="occupied"|"empty"|"abandoned"|"reclaimed";
export type ResidenceOrigin="founder"|"immigrant"|"marriage"|"adult_transition";
export interface ResidenceCoordinates{x:number;y:number}
export interface Residence{
  residenceId:string;
  status:ResidenceStatus;
  origin:ResidenceOrigin;
  createdRound:number;
  coordinates:ResidenceCoordinates;
  occupantIds:string[];
  emptySinceRound:number|null;
  abandonedRound:number|null;
  reclaimedRound:number|null;
  parentResidenceIds:string[];
}
export interface ResidenceTransition{
  id:string;
  round:number;
  year:number;
  characterId:string;
  kind:"adult_move"|"adult_retained";
  fromResidenceId:string;
  toResidenceId:string;
}

declare module "./model.js"{
  interface Character{
    currentResidenceId:string;
    /** Internal lifecycle marker; founders/immigrants start true, children flip at Stage2→3. */
    residenceAdultTransitionHandled:boolean;
  }
  interface GameState{residences:Record<string,Residence>;residenceTransitions:ResidenceTransition[]}
}

const hash=(s:string)=>{let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0};
const round6=(n:number)=>Math.round(n*1e6)/1e6;
export const residenceCoordinatesForId=(id:string):ResidenceCoordinates=>{
  const a=hash(id),b=hash(`${id}|y`);
  return{x:round6((a%100000)/100000),y:round6((b%100000)/100000)};
};
const symmetricKey=(ids:string[])=>[...ids].sort().join("|");
export const sharedMarriageResidenceId=(aId:string,bId:string)=>`res-marriage-${symmetricKey([aId,bId])}`;
export const adultResidenceId=(characterId:string)=>`res-adult-${characterId}`;
export const founderResidenceId=(characterId:string)=>`res-character-${characterId}`;

const averageCoordinates=(records:Residence[])=>{
  if(!records.length)return null;
  return{x:records.reduce((s,r)=>s+r.coordinates.x,0)/records.length,y:records.reduce((s,r)=>s+r.coordinates.y,0)/records.length};
};
const nearCoordinates=(base:ResidenceCoordinates,id:string):ResidenceCoordinates=>{
  const h=hash(id),angle=(h%360)*Math.PI/180,radius=.025+((h>>>9)%1000)/1000*.015;
  return{x:round6(base.x+Math.cos(angle)*radius),y:round6(base.y+Math.sin(angle)*radius)};
};
export const marriageResidenceCoordinates=(state:GameState,aResidenceId:string,bResidenceId:string,newId:string)=>{
  const ids=[aResidenceId,bResidenceId].filter(Boolean).sort();
  const records=ids.map(id=>state.residences[id]).filter((x):x is Residence=>!!x);
  const base=averageCoordinates(records);
  return base?{x:round6(base.x),y:round6(base.y)}:residenceCoordinatesForId(newId);
};

const createResidence=(state:GameState,residenceId:string,origin:ResidenceOrigin,coordinates:ResidenceCoordinates,parentResidenceIds:string[]=[]):Residence=>{
  const existing=state.residences[residenceId];if(existing)return existing;
  const residence:Residence={residenceId,status:"occupied",origin,createdRound:state.round,coordinates,occupantIds:[],emptySinceRound:null,abandonedRound:null,reclaimedRound:null,parentResidenceIds:[...new Set(parentResidenceIds)].sort()};
  state.residences[residenceId]=residence;return residence;
};

export const livingOccupants=(state:GameState,residenceId:string)=>Object.values(state.characters).filter(c=>c.alive&&c.currentResidenceId===residenceId).map(c=>c.id).sort();

export function refreshResidenceOccupancy(state:GameState){
  for(const residence of Object.values(state.residences)){
    const occupants=livingOccupants(state,residence.residenceId);
    residence.occupantIds=occupants;
    if(occupants.length){
      if(residence.status!=="occupied")throw Error(`RESIDENCE_REUSE_FORBIDDEN:${residence.residenceId}`);
      continue;
    }
    if(residence.status==="occupied"){
      residence.status="empty";
      residence.emptySinceRound=state.round;
      residence.abandonedRound=null;
    }
  }
}

function directParents(state:GameState,child:Character){
  return Object.values(state.characters).filter(p=>p.childrenIds.includes(child.id));
}
function parentResidenceRecords(state:GameState,child:Character){
  const ids=directParents(state,child).filter(p=>p.alive&&p.currentResidenceId).map(p=>p.currentResidenceId);
  return [...new Set(ids)].sort().map(id=>state.residences[id]).filter((x):x is Residence=>!!x&&x.status==="occupied");
}
function residenceFromParentHousehold(state:GameState,parentHouseholdId:string){
  const ids=Object.values(state.characters).filter(p=>p.alive&&p.householdId===parentHouseholdId&&p.currentResidenceId).map(p=>p.currentResidenceId);
  const id=[...new Set(ids)].sort()[0];return id?state.residences[id]??null:null;
}

export function initializeCharacterResidence(state:GameState,c:Character,parentHouseholdId:string|null){
  if(parentHouseholdId){
    const parentResidence=residenceFromParentHousehold(state,parentHouseholdId);
    if(!parentResidence)throw Error(`PARENT_RESIDENCE_REQUIRED:${c.id}`);
    c.currentResidenceId=parentResidence.residenceId;
    c.residenceAdultTransitionHandled=c.ageStage>=3;
  }else{
    const id=founderResidenceId(c.id);
    createResidence(state,id,c.immigrant?"immigrant":"founder",residenceCoordinatesForId(id));
    c.currentResidenceId=id;c.residenceAdultTransitionHandled=true;
  }
  refreshResidenceOccupancy(state);
}

export function markCharacterResidenceOriginImmigrant(state:GameState,c:Character){
  const r=state.residences[c.currentResidenceId];if(r&&r.origin==="founder")r.origin="immigrant";
}

export function applyMarriageResidence(state:GameState,a:Character,b:Character){
  const sourceIds=[a.currentResidenceId,b.currentResidenceId].filter(Boolean).sort();
  const id=sharedMarriageResidenceId(a.id,b.id);
  const residence=createResidence(state,id,"marriage",marriageResidenceCoordinates(state,a.currentResidenceId,b.currentResidenceId,id),sourceIds);
  a.currentResidenceId=id;b.currentResidenceId=id;
  const dependentIds=new Set<string>([...a.childrenIds,...b.childrenIds]);
  for(const childId of dependentIds){const child=state.characters[childId];if(child?.alive&&child.ageStage<=2)child.currentResidenceId=id}
  residence.status="occupied";refreshResidenceOccupancy(state);return residence;
}

export function reconcileDependentChildResidences(state:GameState){
  for(const child of Object.values(state.characters).filter(c=>c.alive&&c.ageStage<=2)){
    const livingParents=directParents(state,child).filter(p=>p.alive&&p.currentResidenceId).sort((a,b)=>a.id.localeCompare(b.id));
    if(!livingParents.length)continue; // both direct parents dead: retain current Residence.
    const target=livingParents[0]!.currentResidenceId;
    const targetResidence=state.residences[target];
    if(!targetResidence||targetResidence.status!=="occupied")throw Error(`SURVIVING_PARENT_RESIDENCE_INVALID:${child.id}`);
    child.currentResidenceId=target;
  }
  refreshResidenceOccupancy(state);
}

export function processAdultResidenceTransitions(state:GameState){
  for(const c of Object.values(state.characters).filter(c=>c.alive&&c.ageStage>=3&&!c.residenceAdultTransitionHandled)){
    const fromResidenceId=c.currentResidenceId;
    const livingParentResidences=parentResidenceRecords(state,c);
    let kind:ResidenceTransition["kind"]="adult_retained";
    if(livingParentResidences.length){
      const id=adultResidenceId(c.id),base=averageCoordinates(livingParentResidences)!,parentIds=livingParentResidences.map(r=>r.residenceId).sort();
      createResidence(state,id,"adult_transition",nearCoordinates(base,id),parentIds);
      c.currentResidenceId=id;kind="adult_move";
    }
    // If both direct parents are dead, keep the retained Residence and create nothing.
    c.residenceAdultTransitionHandled=true;
    state.residenceTransitions.push({id:`residence-transition-${state.round}-${c.id}`,round:state.round,year:state.round*10,characterId:c.id,kind,fromResidenceId,toResidenceId:c.currentResidenceId});
  }
  refreshResidenceOccupancy(state);
}

export function reconcileResidenceAfterDeath(state:GameState){reconcileDependentChildResidences(state);refreshResidenceOccupancy(state)}

export function advanceResidenceRoundStart(state:GameState){
  for(const residence of Object.values(state.residences)){
    if(residence.status==="empty"&&residence.emptySinceRound!=null&&residence.emptySinceRound<state.round){
      residence.status="abandoned";residence.abandonedRound=state.round;
    }
  }
}

export function finalizeResidenceEndRound(state:GameState){
  reconcileDependentChildResidences(state);
  processAdultResidenceTransitions(state);
  refreshResidenceOccupancy(state);
  for(const residence of Object.values(state.residences)){
    if(residence.status==="abandoned"&&residence.abandonedRound===state.round){
      residence.status="reclaimed";residence.reclaimedRound=state.round;
    }
  }
}

export const resolveResidence=(state:GameState,residenceId:string)=>state.residences[residenceId]??null;
export const activeMapResidences=(state:GameState)=>Object.values(state.residences).filter(r=>r.status!=="reclaimed");
