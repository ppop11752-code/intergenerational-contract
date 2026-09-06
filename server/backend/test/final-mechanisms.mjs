import assert from 'node:assert/strict';
import {GameEngine} from '../dist/engine.js';
import {livingCost} from '../dist/economy.js';
import {DEFAULT_CONFIG} from '../dist/config.js';

function seededRandom(seed=1){let x=seed>>>0;return()=>{x=(1664525*x+1013904223)>>>0;return x/4294967296}}

// 1. constrained initial distribution
{
  const g=new GameEngine();g.setRandomSource(seededRandom(77));
  for(let i=0;i<10;i++)assert.equal(g.joinPlayer(`P${i}`),'active');
  const stages=g.alive().map(c=>c.ageStage); const counts=new Map([3,4,5].map(n=>[n,stages.filter(x=>x===n).length]));
  assert.ok(stages.every(x=>[3,4,5].includes(x))); assert.ok(!stages.includes(6));
  for(const n of [3,4,5])assert.ok((counts.get(n)??0)>=2,`stage ${n} has <2`);
  console.log('PASS constrained_distribution',Object.fromEntries(counts));
}

// 2. living cost: base per member, asset surcharge once
{
  const one=livingCost(100,1,DEFAULT_CONFIG,1); const two=livingCost(100,1,DEFAULT_CONFIG,2);
  assert.equal(Number((two-one).toFixed(8)),DEFAULT_CONFIG.living.base);
  assert.equal(two,DEFAULT_CONFIG.living.base*2+Math.min(100*DEFAULT_CONFIG.living.assetRate,DEFAULT_CONFIG.living.assetSurchargeCap));
  console.log('PASS per_member_living_cost',{one,two});
}

// 3. causal EIF: deterministic from observable state, no random draw
{
  const g=new GameEngine();
  g.state.eventName='Khủng hoảng tài chính';
  g.state.pool={low:20,mid:10,high:4};
  const a=g.economicIncomeFactor(),b=g.economicIncomeFactor();
  assert.deepEqual(a,b); assert.ok(a.factor<1); assert.ok(a.reasons.some(x=>x.includes('Khủng hoảng tài chính'))); assert.ok(a.reasons.some(x=>x.includes('Khan hiếm')));
  console.log('PASS causal_eif',a);
}

// 4. passive elderly medical fee and mortality protection bounded
{
  const g=new GameEngine();g.setRandomSource(()=>0.99);
  g.joinPlayer('P'); const c=g.alive()[0],h=g.household(c); c.ageStage=10; h.sharedCash=100;
  const due=g.elderlyMedicalDue(c); const fullRisk=g.mortalityRisk(c,1),zeroRisk=g.mortalityRisk(c,0);
  assert.ok(due>0); assert.ok(fullRisk>0&&fullRisk<zeroRisk); assert.equal(g.mortalityRisk({...c,ageStage:12},1),1);
  const before=h.sharedCash; g.resolveElderlyMedicalAndMortality();
  assert.equal(Number((before-h.sharedCash).toFixed(8)),Number(due.toFixed(8))); assert.equal(c.elderlyMedicalPaidThisRound,due); assert.equal(c.alive,true);
  console.log('PASS elderly_medical_mortality',{due,fullRisk,zeroRisk,saturation:g.mortalityRisk({...c,ageStage:12},1)});
}

// 5. passive fee never creates bankruptcy and partial payment only consumes cash
{
  const g=new GameEngine();g.setRandomSource(()=>0.99);g.joinPlayer('P');const c=g.alive()[0],h=g.household(c);c.ageStage=8;h.sharedCash=.25;
  g.resolveElderlyMedicalAndMortality(); assert.equal(h.sharedCash,0); assert.equal(g.state.telemetry.bankruptcies,0); assert.ok(c.elderlyMedicalPaidThisRound<=c.elderlyMedicalDueThisRound);
  console.log('PASS medical_fee_non_bankruptcy',{paid:c.elderlyMedicalPaidThisRound,due:c.elderlyMedicalDueThisRound});
}

// 6. status commitment cannot be changed before voluntary phase
{
  const g=new GameEngine();g.joinPlayer('P');const c=g.alive()[0];
  assert.throws(()=>g.setStatus(c,'middle'));
  g.startRound();g.buildTurnOrder(()=>.5);g.beginMandatoryPhase();while(g.phase()==='mandatory')g.resolveCurrentMandatory();while(g.phase()==='marriage')g.completeMarriageTurn();
  assert.equal(g.phase(),'voluntary');g.setStatus(c,'middle');assert.equal(g.household(c).committedStatus,'middle');
  console.log('PASS status_commitment_phase');
}
