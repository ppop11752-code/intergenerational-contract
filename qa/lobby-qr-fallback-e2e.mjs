import { chromium } from "playwright";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir, writeFile } from "node:fs/promises";

const requireServer=createRequire(new URL("../server/backend/server/package.json",import.meta.url));
const express=requireServer("express");
const {Server}=requireServer("socket.io");
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const outDir=path.join(root,"qa/lobby-qr-fallback-artifacts");await mkdir(outDir,{recursive:true});
const results={startedAt:new Date().toISOString(),checks:[]};
const check=(name,ok,detail="")=>{results.checks.push({name,ok,detail});if(!ok)throw new Error(`${name}: ${detail}`)};

const app=express();app.use(express.static(path.join(root,"client")));
const http=app.listen(0,"127.0.0.1");await new Promise(r=>http.once("listening",r));
const port=http.address().port;const origin=`http://127.0.0.1:${port}`;const io=new Server(http,{cors:{origin:"*"}});
const lobby=(playerId,displayName)=>({code:"ABC123",started:false,hostPlayerId:playerId,initialPopulationTarget:10,initialNpcCount:0,founderDraw:[],players:[{playerId,displayName,host:true,connected:true,activeCharacterId:null,aiTakeoverCharacterId:null,queuePosition:null}],game:null});
io.on("connection",socket=>{socket.on("room:create",({playerId,displayName},ack)=>{ack({ok:true,code:"ABC123",reconnectToken:"rt"});setTimeout(()=>socket.emit("room:state",lobby(playerId,displayName)),50)});socket.on("game:start",(_p,ack)=>ack({ok:true}))});

const browser=await chromium.launch({headless:true});
try{
 const ctx=await browser.newContext();const page=await ctx.newPage();
 await page.goto(origin,{waitUntil:"domcontentloaded"});await page.click('[data-screen="create"]');await page.fill("#name","Fallback Host");await page.click("#entry-go");await page.waitForSelector(".lobby-screen");await page.waitForFunction(()=>document.querySelector('.qr-placeholder')?.getAttribute('data-qr-ready')==='1',null,{timeout:15000});
 check("baseline QR rendered",await page.locator('.qr-functional canvas,.qr-functional img').count()>0,"QR children present");
 await page.evaluate(()=>{window.QRCode=undefined;const host=document.querySelector('.qr-placeholder');if(host){host.dataset.qrReady='0';host.innerHTML='';const marker=document.createElement('span');marker.hidden=true;host.appendChild(marker)}});
 await page.waitForSelector('.qr-fallback',{timeout:5000});
 check("renderer unavailable shows required fallback",(await page.locator('.qr-fallback').textContent())?.trim()==="Không tạo được mã QR — hãy nhập mã phòng.",await page.locator('.qr-fallback').textContent()||"");
 check("large PIN remains visible",(await page.locator('.room-pin').textContent())?.trim()==='ABC123',await page.locator('.room-pin').textContent()||"");
 check("Host Start remains usable",await page.locator('#start').isEnabled(),"start enabled");
 check("no fake QR canvas/image in fallback",await page.locator('.qr-functional canvas,.qr-functional img').count()===0,"QR child count");
 check("manual deep-link text remains selectable",await page.locator('.qr-link-text').isVisible(),await page.locator('.qr-link-text').textContent()||"");
 await page.screenshot({path:path.join(outDir,'qr-fallback-runtime.png'),fullPage:true});await ctx.close();
}catch(e){results.error=e instanceof Error?`${e.name}: ${e.message}`:String(e);throw e}finally{results.finishedAt=new Date().toISOString();await writeFile(path.join(outDir,'results.json'),JSON.stringify(results,null,2));await browser.close();io.close();http.close()}
