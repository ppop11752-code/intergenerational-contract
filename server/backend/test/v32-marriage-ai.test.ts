import {describe,expect,it} from "vitest";
import {GameEngine} from "../src/engine.js";

function toVoluntary(g:GameEngine){
  g.startRound();g.buildTurnOrder(()=>.5);g.beginMandatoryPhase();
  while(g.phase()==="mandatory")g.resolveCurrentMandatory();
  while(g.phase()==="marriage")g.completeMarriageTurn();
}
describe("v3.2 marriage and reproduction rules",()=>{
  it("blocks close-family marriage and remarriage while spouse is alive",()=>{
    const g=new GameEngine();
    const a=g.createNpc(null,"moderate"),b=g.createNpc(null,"moderate");
    a.ageStage=3;b.ageStage=3;
    g.startRound();g.buildTurnOrder(()=>.5);g.beginMandatoryPhase();
    while(g.phase()==="mandatory")g.resolveCurrentMandatory();
    g.proposeMarriage(a,b);const p=Object.values(g.state.marriageProposals)[0]!;
    g.respondMarriage(p.id,true);
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
