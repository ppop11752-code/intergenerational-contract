import {AuthoritativeRoom} from "../dist/authoritative-room.js";

function seeded(seed=1){let x=seed>>>0;return()=>{x=(1664525*x+1013904223)>>>0;return x/4294967296}}

const room=new AuthoritativeRoom("BOT1","P1","Host","sock1");
room.setReady("P1",true);
const result=room.start("P1",seeded(39));
if(!result.ok)throw new Error(`single-player start failed: ${JSON.stringify(result)}`);
const alive=room.engine.alive();
const bots=alive.filter(c=>c.initialBot);
if(alive.length!==10||alive.filter(c=>!c.npc).length!==1||bots.length!==9)throw new Error("initial bot fill mismatch");
if(bots.some(c=>c.ageStage<3||c.ageStage>5))throw new Error("initial bot outside Stage 3–5");
console.log(JSON.stringify({pass:true,total:alive.length,human:1,bots:bots.length,stages:alive.map(c=>c.ageStage).sort()},null,2));
