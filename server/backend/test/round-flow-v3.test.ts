import {describe,expect,it} from "vitest"; import {GameEngine} from "../src/engine.js";
function toMarriage(g:GameEngine){g.startRound();g.buildTurnOrder(()=>.5);g.beginMandatoryPhase();while(g.phase()==="mandatory")g.resolveCurrentMandatory()}
function toVoluntary(g:GameEngine){toMarriage(g);while(g.phase()==="marriage")g.completeMarriageTurn()}
describe("round flow v0.6",()=>{
 it("supports proposal response during marriage phase",()=>{const g=new GameEngine();g.joinPlayer("a");g.joinPlayer("b");const a=Object.values(g.state.characters).find(c=>c.ownerId==="a")!,b=Object.values(g.state.characters).find(c=>c.ownerId==="b")!;toMarriage(g);const p=g.proposeMarriage(a,b);g.respondMarriage(p.id,true);expect(g.isMarried(a)).toBe(true)});
 it("queues recovery until next round",()=>{const g=new GameEngine();g.joinPlayer("a");const a=Object.values(g.state.characters)[0]!;toVoluntary(g);const before=g.state.pool.low;g.investRecovery(a,"low",1);expect(g.state.pool.low).toBe(before);while(g.phase()==="voluntary")g.completeVoluntaryTurn();g.endRound();const natural=g.state.pool.low;g.startRound();expect(g.state.pool.low).toBeCloseTo(natural+1)});
});
