import {describe,expect,it} from "vitest";
import {GameEngine} from "../src/engine.js";

describe("turn order engine v0.4",()=>{
  it("sorts by status first, then unique card descending",()=>{
    const g=new GameEngine();
    g.joinPlayer("a");g.joinPlayer("b");g.joinPlayer("c");
    const chars=Object.values(g.state.characters);
    g.household(chars[0]!).status="poor";
    g.household(chars[1]!).status="noble";
    g.household(chars[2]!).status="middle";
    g.startRound();

    // deterministic pseudo-random
    let x=0;
    const order=g.buildTurnOrder(()=>((x++*37)%100)/100);
    expect(order[0]!.statusRank).toBe(3);
    expect(order[1]!.statusRank).toBe(2);
    expect(order[2]!.statusRank).toBe(1);
    expect(new Set(order.map(x=>x.card)).size).toBe(order.length);
  });

  it("enforces round phases in the required sequence",()=>{
    const g=new GameEngine();
    g.joinPlayer("a");
    g.startRound();
    expect(g.phase()).toBe("round_started");
    g.buildTurnOrder(()=>0.5);
    expect(g.phase()).toBe("turn_order_ready");
    g.beginMandatoryPhase();
    expect(g.phase()).toBe("mandatory");
    g.resolveCurrentMandatory();
    expect(g.phase()).toBe("marriage");
    g.completeMarriageTurn();
    expect(g.phase()).toBe("voluntary");
    g.completeVoluntaryTurn();
    expect(g.phase()).toBe("round_end");
  });

  it("forbids voluntary resource buying before voluntary phase",()=>{
    const g=new GameEngine();
    g.joinPlayer("a");
    const c=Object.values(g.state.characters)[0]!;
    g.startRound();
    g.buildTurnOrder(()=>0.5);
    expect(()=>g.buyResource(c,"low",1)).toThrow("invalid phase");
  });

  it("converts resources before mandatory obligations",()=>{
    const g=new GameEngine();
    g.joinPlayer("a");
    const c=Object.values(g.state.characters)[0]!;
    const h=g.household(c);
    h.sharedResources.low=1;
    const before=h.sharedCash;
    g.startRound();
    g.buildTurnOrder(()=>0.5);
    g.beginMandatoryPhase();
    expect(h.sharedResources.low).toBe(0);
    expect(h.sharedCash).toBeGreaterThan(before);
  });

  it("keeps two married characters as separate turn entries",()=>{
    const g=new GameEngine();
    g.joinPlayer("a");g.joinPlayer("b");
    const a=Object.values(g.state.characters).find(c=>c.ownerId==="a")!;
    const b=Object.values(g.state.characters).find(c=>c.ownerId==="b")!;
    // marriage before round for test setup
    g.marry(a,b);
    g.startRound();
    const order=g.buildTurnOrder(()=>Math.random());
    expect(order.filter(e=>e.householdId===a.householdId)).toHaveLength(2);
  });
});
