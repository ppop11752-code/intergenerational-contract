import assert from "node:assert/strict";
import {GameEngine} from "../dist/engine.js";
import {
  activeMapResidences,
  advanceResidenceRoundStart,
  finalizeResidenceEndRound,
  marriageResidenceCoordinates,
  processAdultResidenceTransitions,
  resolveResidence,
  sharedMarriageResidenceId
} from "../dist/residence.js";

const tests=[];
const test=(name,fn)=>tests.push([name,fn]);
const bot=(e)=>e.createInitialBot();
const linkChild=(parents,child)=>{for(const p of parents)if(!p.childrenIds.includes(child.id))p.childrenIds.push(child.id)};
const makeFamily=()=>{
  const e=new GameEngine();
  const a=bot(e),b=bot(e);
  e.marry(a,b);
  const child=e.createNpc(a.householdId);linkChild([a,b],child);e.household(a).childrenIds.push(child.id);
  return{e,a,b,child,shared:a.currentResidenceId};
};

test("founder and immigrant each receive a stable independent Residence",()=>{
  const e=new GameEngine();const founder=bot(e),founderRid=founder.currentResidenceId;
  assert.ok(founderRid);assert.equal(e.state.residences[founderRid].origin,"founder");
  e.immigrationCountThisRound=()=>({populationBefore:1,totalResidentAssets:0,wealthPerCapita:0,wealthReference:1,wealthRatio:0,populationFactor:1,rate:1,quota:1,arrivals:1,accumulatorBefore:0,accumulatorAfter:0});
  const arrivals=e.admitImmigrantsAtRoundStart();assert.equal(arrivals.length,1);
  const immigrant=arrivals[0];assert.ok(immigrant.currentResidenceId);assert.notEqual(immigrant.currentResidenceId,founderRid);assert.equal(e.state.residences[immigrant.currentResidenceId].origin,"immigrant");
});

test("newborn inherits parents current Residence and creates no physical Residence",()=>{
  const e=new GameEngine(),a=bot(e),b=bot(e);e.marry(a,b);const before=Object.keys(e.state.residences).length;
  const child=e.createNpc(a.householdId);linkChild([a,b],child);
  assert.equal(child.currentResidenceId,a.currentResidenceId);assert.equal(Object.keys(e.state.residences).length,before);
});

test("marriage creates one symmetric shared Residence and moves dependent direct children",()=>{
  const e=new GameEngine(),a=bot(e),b=bot(e),child=e.createNpc(a.householdId);linkChild([a],child);
  const ar=a.currentResidenceId,br=b.currentResidenceId,idAB=sharedMarriageResidenceId(a.id,b.id),idBA=sharedMarriageResidenceId(b.id,a.id);
  assert.equal(idAB,idBA);
  assert.deepEqual(marriageResidenceCoordinates(e.state,ar,br,idAB),marriageResidenceCoordinates(e.state,br,ar,idBA));
  e.marry(a,b);assert.equal(a.currentResidenceId,idAB);assert.equal(b.currentResidenceId,idAB);assert.equal(child.currentResidenceId,idAB);
  assert.equal(e.state.residences[ar].status,"empty");assert.equal(e.state.residences[br].status,"empty");
});

test("dependent child follows surviving direct parent and follows that parent on remarriage",()=>{
  const {e,a,b,child,shared}=makeFamily();e.state.round=4;e.die(a,"test");
  assert.equal(child.currentResidenceId,b.currentResidenceId);assert.equal(child.currentResidenceId,shared);
  const c=bot(e),before=child.currentResidenceId;e.marry(b,c);
  assert.notEqual(child.currentResidenceId,before);assert.equal(child.currentResidenceId,b.currentResidenceId);
});

test("both direct parents dead: Stage1-2 child retains Residence and orphan Stage2→3 creates no duplicate",()=>{
  const {e,a,b,child,shared}=makeFamily();e.state.round=5;e.die(a,"test");e.die(b,"test");
  assert.equal(child.currentResidenceId,shared);const before=Object.keys(e.state.residences).length;
  child.ageStage=3;child.residenceAdultTransitionHandled=false;processAdultResidenceTransitions(e.state);
  assert.equal(child.currentResidenceId,shared);assert.equal(Object.keys(e.state.residences).length,before);assert.equal(child.residenceAdultTransitionHandled,true);
});

test("normal Stage2→3 creates a new stable Residence near living parents",()=>{
  const {e,child,shared}=makeFamily();child.ageStage=3;child.residenceAdultTransitionHandled=false;
  processAdultResidenceTransitions(e.state);const adult=child.currentResidenceId;
  assert.notEqual(adult,shared);assert.equal(e.state.residences[adult].origin,"adult_transition");assert.deepEqual(e.state.residences[adult].parentResidenceIds,[shared]);
  const coords={...e.state.residences[adult].coordinates};processAdultResidenceTransitions(e.state);assert.equal(child.currentResidenceId,adult);assert.deepEqual(e.state.residences[adult].coordinates,coords);
});

test("siblings transition independently",()=>{
  const e=new GameEngine(),a=bot(e),b=bot(e);e.marry(a,b);const shared=a.currentResidenceId;
  const c1=e.createNpc(a.householdId),c2=e.createNpc(a.householdId);linkChild([a,b],c1);linkChild([a,b],c2);
  c1.ageStage=3;c1.residenceAdultTransitionHandled=false;c2.ageStage=2;c2.residenceAdultTransitionHandled=true;processAdultResidenceTransitions(e.state);
  assert.notEqual(c1.currentResidenceId,shared);assert.equal(c2.currentResidenceId,shared);
  c2.ageStage=3;c2.residenceAdultTransitionHandled=false;processAdultResidenceTransitions(e.state);
  assert.notEqual(c2.currentResidenceId,shared);assert.notEqual(c2.currentResidenceId,c1.currentResidenceId);
});

test("engine endRound performs normal Stage2→3 Residence transition",()=>{
  const {e,a,child,shared}=makeFamily();child.ageStage=2;child.residenceAdultTransitionHandled=false;child.birthRound=-10;e.state.round=1;e.state.turnState.phase="round_end";e.setRandomSource(()=>0.5);e.endRound();
  assert.equal(child.ageStage,3);assert.notEqual(child.currentResidenceId,shared);assert.equal(e.state.residences[child.currentResidenceId].origin,"adult_transition");assert.ok(a.alive);
});

test("last occupant departure is empty immediately, next round abandoned, end of that round reclaimed",()=>{
  const e=new GameEngine(),a=bot(e);e.state.round=7;const rid=a.currentResidenceId;e.die(a,"test");
  assert.equal(e.state.residences[rid].status,"empty");assert.equal(e.state.residences[rid].emptySinceRound,7);
  e.state.round=8;advanceResidenceRoundStart(e.state);assert.equal(e.state.residences[rid].status,"abandoned");assert.equal(e.state.residences[rid].abandonedRound,8);
  assert.ok(activeMapResidences(e.state).some(r=>r.residenceId===rid));
  finalizeResidenceEndRound(e.state);assert.equal(e.state.residences[rid].status,"reclaimed");assert.equal(e.state.residences[rid].reclaimedRound,8);assert.ok(!activeMapResidences(e.state).some(r=>r.residenceId===rid));
});

test("reclaimed Residence remains permanently addressable by stable ID and cannot be reused",()=>{
  const e=new GameEngine(),a=bot(e);e.state.round=2;const rid=a.currentResidenceId;e.die(a,"test");e.state.round=3;advanceResidenceRoundStart(e.state);finalizeResidenceEndRound(e.state);
  const historical=resolveResidence(e.state,rid);assert.ok(historical);assert.equal(historical.residenceId,rid);assert.equal(historical.status,"reclaimed");
  const b=bot(e);assert.notEqual(b.currentResidenceId,rid);assert.equal(resolveResidence(e.state,rid),historical);
});

let passed=0;
for(const [name,fn] of tests){try{await fn();passed++;console.log(`PASS ${name}`)}catch(err){console.error(`FAIL ${name}`);throw err}}
console.log(`Residence D-053 regression: ${passed}/${tests.length} PASS`);
