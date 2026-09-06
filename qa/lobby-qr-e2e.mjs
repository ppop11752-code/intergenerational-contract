import { chromium } from "playwright";
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import jsQR from "jsqr";
import { PNG } from "pngjs";

const requireServer=createRequire(new URL("../server/backend/server/package.json",import.meta.url));
const express=requireServer("express");
const {Server}=requireServer("socket.io");
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const outDir=path.join(root,"qa/lobby-qr-artifacts");await mkdir(outDir,{recursive:true});
const results={startedAt:new Date().toISOString(),checks:[],notes:[]};
const check=(name,ok,detail="")=>{results.checks.push({name,ok,detail});if(!ok)throw new Error(`${name}: ${detail}`)};

const app=express();app.use(express.static(path.join(root,"client")));
const http=app.listen(0,"127.0.0.1");await new Promise(r=>http.once("listening",r));
const port=http.address().port;const origin=`http://127.0.0.1:${port}`;const io=new Server(http,{cors:{origin:"*"}});
let joinCount=0;
io.on("connection",socket=>{
 socket.on("room:create",({playerId,displayName},ack)=>ack({ok:true,code:"ABC123",reconnectToken:"rt-public-test"}));
 socket.on("room:join",({code},ack)=>{joinCount++;if(code==="ABC123")ack({ok:true,code:"ABC123",reconnectToken:"join-token"});else ack({ok:false,error:"ROOM_NOT_FOUND"})});
 socket.on("game:start",(_p,ack)=>ack({ok:true}));
 socket.on("room:get-state",(_p,ack)=>ack({ok:true,room:null,player:null}));
});

const browser=await chromium.launch({headless:true});
try{
 const ctx=await browser.newContext({permissions:["clipboard-read","clipboard-write"]});
 const page=await ctx.newPage();
 await page.goto(origin,{waitUntil:"domcontentloaded"});await page.click('[data-screen="create"]');await page.fill("#name","QR Host");await page.click("#entry-go");
 await page.waitForSelector(".lobby-screen");await page.waitForSelector(".qr-functional canvas,.qr-functional img",{timeout:15000});
 const pin=(await page.locator(".room-pin").textContent())?.trim();check("large room PIN visible",pin==="ABC123",pin||"");
 const qrBox=page.locator(".qr-functional");const box=await qrBox.boundingBox();check("QR rendered at usable size",!!box&&box.width>=192&&box.height>=192,JSON.stringify(box));
 const shot=await qrBox.screenshot();const png=PNG.sync.read(shot);const decoded=jsQR(new Uint8ClampedArray(png.data),png.width,png.height,{inversionAttempts:"attemptBoth"});
 const expected=`${origin}/?room=ABC123`;check("QR decodes to exact same-origin room deep-link",decoded?.data===expected,decoded?.data||"decode failed");
 check("QR payload contains no private state",!decoded?.data.includes("reconnect")&&!decoded?.data.includes("playerId")&&!decoded?.data.includes("displayName")&&!decoded?.data.includes("token"),decoded?.data||"");
 const style=await page.evaluate(()=>{const el=document.querySelector('.qr-functional');const cs=getComputedStyle(el);const child=el?.querySelector('canvas,img');const r=child?.getBoundingClientRect();return{background:cs.backgroundColor,padding:cs.padding,width:r?.width||0,height:r?.height||0}});
 check("QR high contrast with quiet-zone container",style.background==="rgb(255, 255, 255)"&&parseFloat(style.padding)>=12&&style.width>=160&&style.height>=160,JSON.stringify(style));
 check("Host Start remains usable with QR",await page.locator("#start").isEnabled(),"start enabled");
 const linkText=(await page.locator(".qr-link-text").textContent())?.trim();check("copy link text matches QR payload",linkText===expected,linkText||"");
 await page.evaluate(()=>{window.__copied="";Object.defineProperty(navigator,"clipboard",{value:{writeText:async t=>{window.__copied=t}},configurable:true})});await page.click(".qr-copy");await page.waitForTimeout(50);check("copy button uses same deep-link",await page.evaluate(()=>window.__copied)===expected,await page.evaluate(()=>window.__copied||""));
 await page.screenshot({path:path.join(outDir,"lobby-qr.png"),fullPage:true});

 const deep=await ctx.newPage();await deep.goto(expected,{waitUntil:"domcontentloaded"});check("deep-link opens normal landing",await deep.locator(".landing-screen").count()===1,"landing count");check("deep-link does not auto join",joinCount===0,`joinCount=${joinCount}`);await deep.click('[data-screen="join"]');await deep.waitForSelector("#code");check("valid deep-link pre-fills uppercase room code",await deep.inputValue("#code")==="ABC123",await deep.inputValue("#code"));check("QR helper appears",(await deep.locator(".qr-helper").textContent())?.includes("Mã phòng đã được điền từ QR.")===true,await deep.locator(".qr-helper").textContent()||"");check("still no auto join after opening Join",joinCount===0,`joinCount=${joinCount}`);await deep.fill("#name","QR Joiner");await deep.click("#entry-go");await deep.waitForTimeout(100);check("explicit join sends room:join",joinCount===1,`joinCount=${joinCount}`);

 const invalid=await ctx.newPage();await invalid.goto(`${origin}/?room=bad-xx`,{waitUntil:"domcontentloaded"});await invalid.click('[data-screen="join"]');await invalid.waitForSelector("#code");check("invalid room query ignored",await invalid.inputValue("#code")===""&&await invalid.locator(".qr-helper").count()===0,`code=${await invalid.inputValue("#code")}`);await invalid.fill("#name","Invalid Query");await invalid.fill("#code","ABC123");await invalid.click("#entry-go");await invalid.waitForTimeout(100);check("normal Join remains usable after invalid query",joinCount===2,`joinCount=${joinCount}`);

 const stale=await ctx.newPage();await stale.goto(`${origin}/?room=ZZZ999`,{waitUntil:"domcontentloaded"});await stale.click('[data-screen="join"]');await stale.fill("#name","Stale Room");await stale.click("#entry-go");await stale.waitForSelector(".toast.error");check("stale room surfaces existing server error unchanged",(await stale.locator(".toast.error").textContent())?.includes("ROOM_NOT_FOUND")===true,await stale.locator(".toast.error").textContent()||"");

 const failCtx=await browser.newContext();await failCtx.route("https://cdn.jsdelivr.net/**",route=>route.abort());const fail=await failCtx.newPage();await fail.goto(origin,{waitUntil:"domcontentloaded"});await fail.click('[data-screen="create"]');await fail.fill("#name","QR Fallback");await fail.click("#entry-go");await fail.waitForSelector(".lobby-screen");await fail.waitForSelector(".qr-fallback");check("renderer failure shows required fallback",(await fail.locator(".qr-fallback").textContent())?.trim()==="Không tạo được mã QR — hãy nhập mã phòng.",await fail.locator(".qr-fallback").textContent()||"");check("PIN remains visible on renderer failure",(await fail.locator(".room-pin").textContent())?.trim()==="ABC123",await fail.locator(".room-pin").textContent()||"");check("Host Start remains usable on renderer failure",await fail.locator("#start").isEnabled(),"start enabled");check("no fake QR canvas/image on renderer failure",await fail.locator(".qr-functional canvas,.qr-functional img").count()===0,"functional image count");await fail.screenshot({path:path.join(outDir,"qr-fallback.png"),fullPage:true});

 results.notes.push("QR decode uses jsQR on the actual browser-rendered QR screenshot. Server harness only provides existing room:create/room:join/game:start acknowledgements; QR behavior is production client code.");
 await failCtx.close();await ctx.close();
}catch(e){results.error=e instanceof Error?`${e.name}: ${e.message}`:String(e);throw e}finally{results.finishedAt=new Date().toISOString();await writeFile(path.join(outDir,"results.json"),JSON.stringify(results,null,2));await browser.close();io.close();http.close()}
