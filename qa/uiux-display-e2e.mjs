import { chromium } from "playwright";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GameEngine } from "../server/backend/dist/engine.js";
import { AuthoritativeRoom } from "../server/backend/dist/authoritative-room.js";

// H-20260907-029 rerun after H-20260907-030 Recovery decoration lifecycle fix.
const requireServer=createRequire(new URL("../server/backend/server/package.json",import.meta.url));
const express=requireServer("express");
const {Server}=requireServer("socket.io");
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const outDir=path.join(root,"qa/uiux-display-artifacts");await mkdir(outDir,{recursive:true});
const results={startedAt:new Date().toISOString(),checks:[],notes:[]};
const check=(name,ok,detail="")=>{results.checks.push({name,ok,detail});if(!ok)throw new Error(`${name}: ${detail}`)};
const vi=x=>Number(x).toLocaleString("vi-VN");
let room=null,playerId=null,actor=null,socketRef=null;
const app=express();app.use(express.static(path.join(root,"client")));
const http=app.listen(0,"127.0.0.1");await new Promise(r=>http.once("listening",r));
const port=http.address().port;const io=new Server(http,{cors:{origin:"*"}});
function owned(game,id){return game.alive().find(c=>c.ownerId===id)}
function push(){if(!socketRef)return;socketRef.emit("room:state",room.publicSnapshot());socketRef.emit("player:state",room.privateSnapshot(playerId))}
function seed(){
 const game=new GameEngine();game.joinPlayer(playerId);actor=owned(game,playerId);const h=game.household(actor);
 h.sharedCash=10000;h.roundStartAssets=10000;h.representativeCharacterId=actor.id;
 game.state.spendingLimitByCharacter[actor.id]=10000;
 game.state.turnState.entries=[{characterId:actor.id,householdId:actor.householdId,statusRank:1,card:10,order:1}];game.state.turnState.activeIndex=0;
 game.state.turnState.phase="mandatory";game.state.eventName="Drought";
 room.started=true;room.engine=game;room.phaseDeadlineKind="mandatory";room.phaseDeadlineAt=Date.now()+60000;
}
function phase(kind){room.engine.state.turnState.phase=kind;room.phaseDeadlineKind=kind;room.phaseDeadlineAt=Date.now()+60000;push()}
io.on("connection",socket=>{socketRef=socket;
 socket.on("room:create",({playerId:id,displayName},ack)=>{playerId=id;room=new AuthoritativeRoom("DSP123",id,displayName,socket.id);const p=room.players.get(id);ack({ok:true,code:room.code,reconnectToken:p.reconnectToken});push()});
 socket.on("game:start",(_p,ack)=>{seed();ack({ok:true});push()});
 socket.on("game:action",({action},ack)=>{const r=room.act(playerId,action,()=>0.5);ack(r);push()});
 socket.on("room:get-state",(_p,ack)=>ack({ok:true,room:room.publicSnapshot(),player:room.privateSnapshot(playerId)}));
});
const browser=await chromium.launch({headless:true});
try{
 const page=await browser.newPage();await page.goto(`http://127.0.0.1:${port}`,{waitUntil:"domcontentloaded"});
 await page.click('[data-screen="create"]');await page.fill("#name","Display QA");await page.click("#entry-go");await page.waitForSelector("#start");await page.click("#start");
 await page.waitForSelector(".mandatory-card .server-display",{timeout:10000});
 const hud=page.locator(".world-hud");check("World Event authoritative value",(await hud.textContent()).includes("Drought"),await hud.textContent());
 room.engine.state.eventName=null;push();await page.waitForFunction(()=>[...document.querySelectorAll('.world-hud span')].some(x=>x.textContent?.includes('SỰ KIỆN')&&x.textContent?.includes('Không có')));
 check("World Event null safe fallback",(await hud.textContent()).includes("Không có"),await hud.textContent());
 room.engine.state.eventName="Drought";push();
 const mq=room.privateSnapshot(playerId).mandatoryQuote;check("Mandatory quote exists",!!mq,JSON.stringify(mq));
 const mt=await page.locator(".mandatory-card .server-display").textContent();
 for(const label of["Sinh hoạt","An sinh","Thuế","Chu cấp con","Chu cấp cha/mẹ","Tang chế","Y tế","Tổng bắt buộc","Thu nhập ròng","Cash trước xử lý","Thanh lý dự kiến","Cash sau thanh lý dự kiến","Thiếu hụt dự kiến","Khoản lớn nhất"])check(`Mandatory label ${label}`,mt.includes(label),mt);
 for(const v of Object.values(mq.breakdown))check(`Mandatory authoritative value ${v}`,mt.includes(vi(v)),mt);
 check("Mandatory projection wording",mt.includes("DỰ KIẾN")&&mt.includes("snapshot")&&!mt.includes("ĐÃ PHÁ SẢN"),mt);
 check("Mandatory has no skip action",await page.locator(".mandatory-card button").count()===0,"button count");
 const mandatoryDeadline=room.phaseDeadlineAt;await page.waitForTimeout(1100);check("Mandatory display does not change authoritative deadline",room.phaseDeadlineAt===mandatoryDeadline,`${mandatoryDeadline} -> ${room.phaseDeadlineAt}`);

 phase("voluntary");await page.waitForSelector('[data-panel="recovery"]');const deadline=room.phaseDeadlineAt;const tb=await page.locator("[data-timer]").first().textContent();await page.click('[data-panel="recovery"]');await page.waitForSelector(".recovery-row .server-quote");
 const rqs=room.privateSnapshot(playerId).recoveryQuotes;check("Recovery exposes three authoritative quotes",rqs.length===3,JSON.stringify(rqs));
 for(const q of rqs){const row=page.locator(`.recovery-row[data-recover="${q.grade}"] .server-quote`);const text=await row.textContent();for(const v of[q.currentPool,q.carryingCapacity,q.pendingNextRound,q.capacityRemaining,q.costPerUnit])check(`Recovery ${q.grade} value ${v}`,text.includes(vi(v)),text)}
 const low0=rqs.find(x=>x.grade==="low");if(low0?.capacityRemaining>=1){const cash0=room.engine.household(actor).sharedCash;await page.fill("#recover-units","1");await page.click('.recovery-row[data-recover="low"]');await page.waitForSelector(".toast.success");const low1=room.privateSnapshot(playerId).recoveryQuotes.find(x=>x.grade==="low");check("Recovery action server revalidated pending units",low1.pendingNextRound===low0.pendingNextRound+1,`${low0.pendingNextRound} -> ${low1.pendingNextRound}`);check("Recovery action uses authoritative cost",room.engine.household(actor).sharedCash===cash0-low0.costPerUnit,`${cash0} -> ${room.engine.household(actor).sharedCash}; cost=${low0.costPerUnit}`)}
 await page.click('[data-panel="recovery"]');const qnow=room.privateSnapshot(playerId).recoveryQuotes.find(x=>x.grade==="low");await page.fill("#recover-units",String(Math.max(1,qnow.capacityRemaining+1)));await page.click('.recovery-row[data-recover="low"]');await page.waitForSelector(".toast.error");check("Recovery invalid units surfaced from server",(await page.locator(".toast.error").textContent()).length>0,await page.locator(".toast.error").textContent());
 check("Recovery display/actions do not reset deadline",room.phaseDeadlineAt===deadline,`${deadline} -> ${room.phaseDeadlineAt}`);await page.waitForTimeout(1100);const ta=await page.locator("[data-timer]").first().textContent();const sec=x=>Number(String(x||"").match(/(\d+)s/)?.[1]??NaN);check("Voluntary countdown continues",sec(ta)<sec(tb),`${tb} -> ${ta}`);

 phase("status");await page.waitForSelector(".status-card .server-display");const sq=room.privateSnapshot(playerId).statusQuote;check("Status quote exists",!!sq,JSON.stringify(sq));const st=await page.locator(".status-card .server-display").textContent();
 for(const c of sq.cards){check(`Status ${c.status} fee`,st.includes(vi(c.fee)),st);check(`Status ${c.status} persons`,st.includes(`${c.personsCharged} người`),st);check(`Status ${c.status} affordability`,st.includes(c.affordable?"Đủ cash":"Thiếu cash"),st)}
 const n=sq.nobleCompetition;for(const label of["Slot Noble","Ưu tiên","Fallback","Refund tối đa tiềm năng"])check(`Status Noble label ${label}`,st.includes(label),st);check("Status Noble pending slots",st.includes(String(n.pendingNobleSlots)),st);check("Status Noble fallback fee",st.includes(vi(n.middleFallbackFee)),st);check("Status Noble potential refund",st.includes(vi(n.potentialRefund)),st);check("Status clearly non-guaranteed end-round allocation",st.includes("cuối vòng")&&st.includes("không phải cam kết"),st);
 const statusDeadline=room.phaseDeadlineAt;await page.waitForTimeout(1100);check("Status display does not reset deadline",room.phaseDeadlineAt===statusDeadline,`${statusDeadline} -> ${room.phaseDeadlineAt}`);

 room.engine.state.turnState.activeIndex=99;push();await page.waitForTimeout(100);check("Null Status quote removes server-derived box",await page.locator(".status-card .server-display").count()===0||await page.locator(".status-card").count()===0,"no stale authoritative values");
 results.notes.push("Harness uses production client + compiled production AuthoritativeRoom/GameEngine over Socket.IO. Only deterministic phase/state setup is synthetic; quote generation, display snapshots and recovery action validation/mutation are production authoritative code.");
 results.notes.push("Market/Support/Birth/Marriage payload regressions are covered by the clean client suite; Support additionally has prior browser-authoritative E2E H-20260906-023. This run checks the new ic:snapshot presentation path does not alter timers or Recovery action semantics.");
 await page.screenshot({path:path.join(outDir,"display-final.png"),fullPage:true});
}catch(e){results.error=e instanceof Error?`${e.name}: ${e.message}`:String(e);throw e}finally{results.finishedAt=new Date().toISOString();await writeFile(path.join(outDir,"results.json"),JSON.stringify(results,null,2));await browser.close();io.close();http.close()}
