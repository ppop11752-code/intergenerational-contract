import assert from 'node:assert/strict';
import {GameEngine} from '../dist/engine.js';
import {regeneratePool,scarcityInflationIndex} from '../dist/economy.js';

const approx=(a,b,eps=1e-10)=>assert.ok(Math.abs(a-b)<=eps,`${a} != ${b}`);
const cases=[];const test=(name,fn)=>{try{fn();cases.push({name,pass:true})}catch(error){cases.push({name,pass:false,error:String(error?.stack??error)})}};

test('all pools full',()=>{const g=new GameEngine();assert.equal(scarcityInflationIndex({low:120,mid:60,high:24},{low:700,mid:360,high:140},g.cfg),0)});
test('pool = 0',()=>{const g=new GameEngine();assert.equal(scarcityInflationIndex({low:0,mid:0,high:0},{low:0,mid:0,high:0},g.cfg),1)});
test('Low/Mid/High weighted asymmetry',()=>{const g=new GameEngine();approx(scarcityInflationIndex({low:0,mid:60,high:24},{low:700,mid:360,high:140},g.cfg),.5*(1680/6720));approx(scarcityInflationIndex({low:120,mid:0,high:24},{low:700,mid:360,high:140},g.cfg),.5*(2520/6720))});
test('Renewable and Nonrenewable differ',()=>{const g=new GameEngine();approx(scarcityInflationIndex({low:0,mid:0,high:0},{low:700,mid:360,high:140},g.cfg),.5);approx(scarcityInflationIndex({low:120,mid:60,high:24},{low:0,mid:0,high:0},g.cfg),.5)});
test('boundary clamp',()=>{const g=new GameEngine();assert.equal(scarcityInflationIndex({low:240,mid:120,high:48},{low:1400,mid:720,high:280},g.cfg),0);assert.equal(scarcityInflationIndex({low:-1,mid:-1,high:-1},{low:-1,mid:-1,high:-1},g.cfg),1)});
test('timing: after regeneration, before next-round Pending Recovery',()=>{
  const g=new GameEngine();g.joinPlayer('A');g.state.pool={low:60,mid:60,high:24};g.state.nonRenewablePool={low:700,mid:360,high:140};g.state.pendingRecovery={low:20,mid:0,high:0};g.state.turnState.phase='round_end';
  const regenerated=regeneratePool(g.state.pool,g.cfg);const scarcity=scarcityInflationIndex(regenerated,g.state.nonRenewablePool,g.cfg);const demand=(g.alive().length/g.cfg.room.initialActivePlayers)-1;const fiscal=Math.min(2,g.state.debt/Math.max(1,g.citizenTotalAssets()));const raw=g.cfg.inflation.targetRate+demand*g.cfg.inflation.demandWeight+scarcity*g.cfg.inflation.scarcityWeight+fiscal*g.cfg.inflation.fiscalWeight;const expected=Math.max(g.cfg.inflation.minRate,Math.min(g.cfg.inflation.maxRate,g.state.inflationRate*g.cfg.inflation.smoothing+raw*(1-g.cfg.inflation.smoothing)));
  g.endRound();approx(g.state.pool.low,regenerated.low);assert.equal(g.state.pendingRecovery.low,20);approx(g.state.inflationRate,expected);
  // Isolate the Rule Ledger timing boundary from Government's own round-start policy actions.
  g.state.government.budget=0;g.state.government.reserveFloor=0;g.startRound();approx(g.state.pool.low,Math.min(g.cfg.resource.low.carryingCapacity,regenerated.low+20));assert.equal(g.state.pendingRecovery.low,0);
});

for(const c of cases)console.log(`${c.pass?'PASS':'FAIL'} — ${c.name}${c.pass?'':`\n${c.error}`}`);
const failed=cases.filter(x=>!x.pass);console.log(`OI-002 regression: ${cases.length-failed.length}/${cases.length} PASS`);if(failed.length)process.exit(1);
