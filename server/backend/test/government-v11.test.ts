import {describe,expect,it} from "vitest";
import {GameEngine} from "../src/engine.js";
import {recoverScarceResourcesBeforeSubsidy,prepareGovernmentSubsidies} from "../src/government.js";

describe("v1.1 government policy",()=>{
  it("government has noble-equivalent purchase priority",()=>{
    const g=new GameEngine();
    g.joinPlayer("a");
    g.joinPlayer("b");
    const chars=Object.values(g.state.characters);
    g.household(chars[0]!).status="poor";
    g.household(chars[1]!).status="middle";
    g.startRound();
    const order=g.buildTurnOrder(()=>0.25);
    expect(g.state.government.purchaseTurnPosition).toBeLessThanOrEqual(
      order.filter(e=>e.statusRank===3).length+1
    );
  });

  it("government recovery can cover low mid high renewable resources",()=>{
    const g=new GameEngine();
    for(let i=0;i<10;i++)g.joinPlayer(`p${i}`);
    g.startRound();
    g.state.government.budget=5000;
    g.state.government.reserveFloor=0;
    g.state.pool.low=1;g.state.pool.mid=1;g.state.pool.high=1;
    recoverScarceResourcesBeforeSubsidy(g);
    expect(g.state.pendingRecovery.low).toBeGreaterThan(0);
    expect(g.state.pendingRecovery.mid).toBeGreaterThan(0);
    expect(g.state.pendingRecovery.high).toBeGreaterThan(0);
    expect(g.state.government.spendingThisRound).toBeGreaterThan(0);
  });

  it("subsidy includes high grade but lower priority/rate",()=>{
    const g=new GameEngine();
    for(let i=0;i<10;i++)g.joinPlayer(`p${i}`);
    g.startRound();
    g.state.government.budget=5000;
    g.state.government.reserveFloor=0;
    g.state.pool.low=.1;g.state.pool.mid=.1;g.state.pool.high=.1;
    prepareGovernmentSubsidies(g);
    expect(g.state.government.subsidyRate.low).toBeGreaterThan(0);
    expect(g.state.government.subsidyRate.mid).toBeGreaterThan(0);
    expect(g.state.government.subsidyRate.high).toBeGreaterThan(0);
    expect(g.state.government.subsidyRate.low).toBeGreaterThan(g.state.government.subsidyRate.high);
    expect(g.state.government.subsidyRate.mid).toBeGreaterThan(g.state.government.subsidyRate.high);
  });
});
