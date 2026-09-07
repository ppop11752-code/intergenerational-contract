import {describe,expect,it} from "vitest";
import {GameEngine} from "../src/engine.js";

function setVoluntaryTurn(g:GameEngine,a:ReturnType<GameEngine["createNpc"]>,b:ReturnType<GameEngine["createNpc"]>){
  const h=g.household(a);h.representativeCharacterId=a.id;g.state.round=1;
  g.state.turnState.phase="voluntary";
  g.state.turnState.entries=[
    {characterId:a.id,householdId:h.id,statusRank:0,card:9,order:0},
    {characterId:b.id,householdId:h.id,statusRank:0,card:8,order:1}
  ];
  g.state.turnState.activeIndex=0;
}
describe("legacy marriage and reproduction coverage",()=>{
  it("blocks remarriage while spouse is alive and keeps accept pending until settlement",()=>{
    const g=new GameEngine();
    const a=g.createNpc(null,"moderate"),b=g.createNpc(null,"moderate");
    a.ageStage=3;b.ageStage=3;g.state.round=1;
    const p=g.proposeMarriage(a,b);g.respondMarriage(p.id,true);
    expect(g.isMarried(a)).toBe(false);
    g.executeAcceptedMarriages();
    expect(g.isMarried(a)).toBe(true);
    const outsider=g.createNpc(null,"moderate");outsider.ageStage=3;
    expect(()=>g.proposeMarriage(a,outsider)).toThrow();
  });
  it("requires both spouses to be worker-age for birth",()=>{
    const g=new GameEngine();
    const a=g.createNpc(null,"moderate"),b=g.createNpc(null,"moderate");
    a.ageStage=3;b.ageStage=7;g.marry(a,b);setVoluntaryTurn(g,a,b);
    expect(g.attemptBirth(g.household(a))).toBeNull();
  });
  it("allows a worker-age married couple to propose birth",()=>{
    const g=new GameEngine();
    const a=g.createNpc(null,"moderate"),b=g.createNpc(null,"moderate");
    a.ageStage=3;b.ageStage=4;g.marry(a,b);setVoluntaryTurn(g,a,b);
    expect(g.attemptBirth(g.household(a))).not.toBeNull();
  });
});
