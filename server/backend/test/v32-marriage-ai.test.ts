import {describe,expect,it} from "vitest";
import {GameEngine} from "../src/engine.js";

function toVoluntary(g:GameEngine){
  g.startRound();g.buildTurnOrder(()=>.5);g.beginMandatoryPhase();
  while(g.phase()==="mandatory")g.resolveCurrentMandatory();
  if(g.phase()==="status")g.autoSelectStatusForCurrent();
}
describe("legacy marriage and reproduction coverage",()=>{
  it("blocks close-family marriage and remarriage while spouse is alive",()=>{
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
    a.ageStage=3;b.ageStage=7;
    g.marry(a,b);toVoluntary(g);
    expect(g.attemptBirth(g.household(a))).toBeNull();
  });
  it("allows a worker-age married couple to give birth",()=>{
    const g=new GameEngine();
    const a=g.createNpc(null,"moderate"),b=g.createNpc(null,"moderate");
    a.ageStage=3;b.ageStage=4;
    g.marry(a,b);toVoluntary(g);
    expect(g.attemptBirth(g.household(a))).not.toBeNull();
  });
});
