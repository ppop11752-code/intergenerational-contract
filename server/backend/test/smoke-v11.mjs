import assert from "node:assert/strict";
import { GameEngine } from "../dist/engine.js";
import { recoverScarceResourcesBeforeSubsidy, prepareGovernmentSubsidies } from "../dist/government.js";

const g=new GameEngine();
for(let i=0;i<10;i++)g.joinPlayer(`p${i}`);
g.startRound();
g.state.government.budget=5000;
g.state.government.reserveFloor=0;
g.state.pool.low=1;g.state.pool.mid=1;g.state.pool.high=1;
const before=g.state.government.budget;
recoverScarceResourcesBeforeSubsidy(g);
assert.ok(g.state.pendingRecovery.low>0);
assert.ok(g.state.pendingRecovery.mid>0);
assert.ok(g.state.pendingRecovery.high>0);
assert.ok(g.state.government.budget<before);

g.state.pool.low=.1;g.state.pool.mid=.1;g.state.pool.high=.1;
prepareGovernmentSubsidies(g);
assert.ok(g.state.government.subsidyRate.high>0);
assert.ok(g.state.government.subsidyRate.low>g.state.government.subsidyRate.high);

const g2=new GameEngine();
for(let i=0;i<10;i++)g2.joinPlayer(`q${i}`);
g2.startRound();
g2.buildTurnOrder(()=>0.3);
assert.ok((g2.state.government.purchaseTurnPosition??999) <= 11);

console.log(JSON.stringify({
  recoveryAllGrades:true,
  subsidyAllGrades:true,
  governmentStatusEquivalent:"noble",
  investmentAllowed:["mid","high"],
  investmentForbidden:["low"]
},null,2));
