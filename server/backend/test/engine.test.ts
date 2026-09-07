import {describe,expect,it} from "vitest"; import {GameEngine} from "../src/engine.js";
describe("engine legacy coverage",()=>{
 it("10 active, 20 queued, then reject",()=>{const g=new GameEngine();for(let i=1;i<=30;i++)expect(g.joinPlayer(`p${i}`)).toBe(i<=10?"active":"queue");expect(g.joinPlayer("p31")).toBe("rejected")});
 it("starts founders within Stage 3-5 with configured cash",()=>{const g=new GameEngine();g.joinPlayer("a");const c=Object.values(g.state.characters)[0]!;expect([3,4,5]).toContain(c.ageStage);expect(g.household(c).sharedCash).toBe(g.cfg.game.startingCash)});
 it("uses 75% emergency liquidation",()=>expect(new GameEngine().cfg.market.liquidationFactor).toBe(.75));
});
