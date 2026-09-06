import assert from "node:assert/strict";
import { GameEngine } from "../dist/engine.js";
import { DEFAULT_CONFIG } from "../dist/config.js";

// Government draws from same dynamic deck and number is unique.
const g=new GameEngine();
for(let i=0;i<10;i++)g.joinPlayer(`P${i}`);
g.startRound();
const order=g.buildTurnOrder(()=>Math.random());
assert.ok(g.state.government.turnCard>=1);
assert.ok(g.state.government.turnCard<=110);
assert.ok(!order.map(x=>x.card).includes(g.state.government.turnCard));
assert.ok(g.state.government.purchaseTurnPosition>=1&&g.state.government.purchaseTurnPosition<=11);

// Maintenance reserve is protected with public borrowing if necessary.
const cfg=structuredClone(DEFAULT_CONFIG);cfg.government.initialBudget=0;
const poorState=new GameEngine(cfg);poorState.joinPlayer("A");
const debtBefore=poorState.state.debt;poorState.startRound();
assert.equal(poorState.state.government.budget, cfg.government.maintenanceBase*cfg.government.reserveRounds);
assert.ok(poorState.state.debt>debtBefore);
assert.ok(poorState.state.government.borrowedThisRound>0);

// Tax is collected into State Budget from realized net income.
const taxGame=new GameEngine();taxGame.joinPlayer("T");
const c=taxGame.alive()[0],h=taxGame.household(c);
h.sharedResources.low=2;h.sharedResourceCostBasis.low=5;
taxGame.startRound();taxGame.buildTurnOrder(()=>Math.random());taxGame.beginMandatoryPhase();
const budgetBeforeTax=taxGame.state.government.budget;
while(taxGame.phase()==="mandatory")taxGame.resolveCurrentMandatory();
assert.ok(taxGame.state.government.taxCollectedThisRound>0);
assert.ok(taxGame.state.government.budget>budgetBeforeTax);
assert.ok(taxGame.state.government.taxPaidByCharacter[c.id]>0);

// Government holdings intentionally expose only low/mid: State cannot buy high.
assert.deepEqual(Object.keys(taxGame.state.government.resourceHoldings).sort(),["low","mid"]);

console.log(JSON.stringify({
  governmentCard:g.state.government.turnCard,
  governmentPurchasePosition:g.state.government.purchaseTurnPosition,
  borrowingOnReserveShortfall:poorState.state.government.borrowedThisRound,
  taxCollected:taxGame.state.government.taxCollectedThisRound,
  governmentBudgetAfterTax:taxGame.state.government.budget
},null,2));
