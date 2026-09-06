import { chromium } from "playwright";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GameEngine } from "../server/backend/dist/engine.js";
import { AuthoritativeRoom } from "../server/backend/dist/authoritative-room.js";

const requireServer=createRequire(new URL("../server/backend/server/package.json",import.meta.url));
const express=requireServer("express");
const { Server }=requireServer("socket.io");
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const outDir=path.join(root,"qa/support-flow-artifacts");await mkdir(outDir,{recursive:true});
const results={startedAt:new Date().toISOString(),checks:[],notes:[]};
const check=(name,ok,detail="")=>{results.checks.push({name,ok,detail});if(!ok)throw new Error(`${name}: ${detail}`)};

let room=null,playerId=null,actor=null,parent=null,child=null;
const app=express();app.use(express.static(path.join(root,"client")));
const http=app.listen(0,"127.0.0.1");await new Promise(r=>http.once("listening",r));
const port=http.address().port;const io=new Server(http,{cors:{origin:"*"}});

function owned(game,id){return game.alive().find(c=>c.ownerId===id)}
function seedSupportFixture(){
  const game=new GameEngine();game.joinPlayer(playerId);actor=owned(game,playerId);
  parent=game.createNpc();child=game.createNpc(game.household(actor).id);
  parent.ageStage=7;child.ageStage=2;parent.childrenIds.push(actor.id);actor.childrenIds.push(child.id);
  game.household(actor).childrenIds.push(child.id);game.household(actor).sharedCash=100;game.state.spendingLimitByCharacter[actor.id]=100;
  game.state.turnState.phase="voluntary";game.state.turnState.entries=[{characterId:actor.id,householdId:actor.householdId,statusRank:1,card:10,order:1}];game.state.turnState.activeIndex=0;
  room.started=true;room.engine=game;room.phaseDeadlineKind="voluntary";room.phaseDeadlineAt=Date.now()+60000;
}
function push(socket){socket.emit("room:state",room.publicSnapshot());socket.emit("player:state",room.privateSnapshot(playerId))}
io.on("connection",socket=>{
  socket.on("room:create",({playerId:id,displayName},ack)=>{playerId=id;room=new AuthoritativeRoom("SUP123",id,displayName,socket.id);const p=room.players.get(id);ack({ok:true,code:room.code,reconnectToken:p.reconnectToken});push(socket)});
  socket.on("game:start",(_payload,ack)=>{seedSupportFixture();ack({ok:true});push(socket)});
  socket.on("game:action",({action},ack)=>{const r=room.act(playerId,action,()=>0.5);ack(r);push(socket)});
  socket.on("room:get-state",(_payload,ack)=>ack({ok:true,room:room.publicSnapshot(),player:room.privateSnapshot(playerId)}));
});

const browser=await chromium.launch({headless:true});
try{
  const page=await browser.newPage();await page.goto(`http://127.0.0.1:${port}`,{waitUntil:"domcontentloaded"});
  await page.click('[data-screen="create"]');await page.fill("#name","Support QA");await page.click("#entry-go");await page.waitForSelector("#start");await page.click("#start");
  await page.waitForSelector('[data-panel="support"]',{timeout:10000});
  const deadlineBefore=room.phaseDeadlineAt;const timerBefore=await page.locator("[data-timer]").textContent();
  await page.click('[data-panel="support"]');await page.waitForSelector("#support-target");
  const snap=room.privateSnapshot(playerId);const expected=snap.eligibleSupportTargets.map(x=>x.characterId).sort();
  const optionValues=await page.locator("#support-target option").evaluateAll(xs=>xs.map(x=>x.value).sort());
  const optionLabels=await page.locator("#support-target option").allTextContents();
  check("selector mirrors authoritative targets",JSON.stringify(optionValues)===JSON.stringify(expected),`ui=${optionValues.length}; server=${expected.length}`);
  check("eligible parent and child exposed",expected.length===2&&snap.eligibleSupportTargets.some(x=>x.relation==="parent")&&snap.eligibleSupportTargets.some(x=>x.relation==="child"),JSON.stringify(snap.eligibleSupportTargets));
  check("labels hide raw Character IDs",optionLabels.every(label=>!expected.some(id=>label.includes(id))),optionLabels.join(" | "));

  const childTarget=snap.eligibleSupportTargets.find(x=>x.relation==="child");
  check("non-default child target exists",!!childTarget,JSON.stringify(snap.eligibleSupportTargets));
  await page.selectOption("#support-target",childTarget.characterId);
  check("non-default child target selected",await page.locator("#support-target").inputValue()===childTarget.characterId,await page.locator("#support-target").inputValue());
  const target=room.engine.state.characters[childTarget.characterId];
  const actorHousehold=room.engine.household(actor),targetHousehold=room.engine.household(target);const a0=actorHousehold.sharedCash,t0=targetHousehold.sharedCash;
  await page.fill("#amount","5");await page.click("#support-send");await page.waitForSelector(".toast.success");
  check("valid support preserves selected target and amount",actorHousehold.sharedCash===a0-5&&targetHousehold.sharedCash===t0+5,`actor ${a0}->${actorHousehold.sharedCash}; child ${t0}->${targetHousehold.sharedCash}`);

  await page.click('[data-panel="support"]');await page.fill("#amount","0");await page.click("#support-send");await page.waitForSelector(".toast.error");
  check("invalid amount uses server error",(await page.locator(".toast.error").textContent()).length>0,await page.locator(".toast.error").textContent());
  await page.click('[data-panel="support"]');await page.fill("#amount","1000");await page.click("#support-send");await page.waitForSelector(".toast.error");
  check("oversized support uses server error",(await page.locator(".toast.error").textContent()).length>0,await page.locator(".toast.error").textContent());

  const spent=room.engine.state.voluntarySpentByCharacter[actor.id]??0;room.engine.state.spendingLimitByCharacter[actor.id]=spent+2;push([...io.sockets.sockets.values()][0]);
  await page.click('[data-panel="support"]');await page.fill("#amount","3");await page.click("#support-send");await page.waitForSelector(".toast.error");
  check("50 percent spending cap remains server-authoritative",(await page.locator(".toast.error").textContent()).length>0,await page.locator(".toast.error").textContent());

  check("support flow does not reset deadline",room.phaseDeadlineAt===deadlineBefore,`deadline ${deadlineBefore} -> ${room.phaseDeadlineAt}`);
  await page.waitForTimeout(1200);const timerAfter=await page.locator("[data-timer]").textContent();
  const sec=x=>Number(String(x||"").match(/(\d+)s/)?.[1]??NaN);check("countdown continues while Support is used",sec(timerAfter)<sec(timerBefore),`${timerBefore} -> ${timerAfter}`);

  parent.alive=false;child.alive=false;push([...io.sockets.sockets.values()][0]);await page.click('[data-panel="support"]');
  await page.waitForFunction(()=>document.body.textContent?.includes("Không có mục tiêu hợp lệ."));
  check("empty authoritative list renders no-target state",await page.locator("#support-target,#support-send").count()===0,"selector/action absent");
  check("no manual Character ID input",!(await page.locator("body").textContent()).includes("Character ID"),"player-facing raw ID absent");
  await page.screenshot({path:path.join(outDir,"support-flow.png"),fullPage:true});
  results.notes.push("Harness uses production client plus compiled authoritative GameEngine/AuthoritativeRoom. Only QA fixture state is synthetic; action validation/mutation is production engine code.");
}catch(e){results.error=e instanceof Error?`${e.name}: ${e.message}`:String(e);throw e;}finally{
  results.finishedAt=new Date().toISOString();await writeFile(path.join(outDir,"results.json"),JSON.stringify(results,null,2));await browser.close();io.close();http.close();
}
