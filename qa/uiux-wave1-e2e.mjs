import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const liveUrl=process.env.LIVE_URL||"https://intergenerational-contract.onrender.com";
const outDir="qa/uiux-wave1-artifacts";await mkdir(outDir,{recursive:true});
const results={liveUrl,startedAt:new Date().toISOString(),checks:[],notes:[]};
const check=(name,ok,detail="")=>{results.checks.push({name,ok,detail});if(!ok)throw new Error(`${name}: ${detail}`)};
const browser=await chromium.launch({headless:true});
const waitText=(page,text,timeout=30000)=>page.waitForFunction(t=>document.body.textContent?.includes(t),text,{timeout});
try{
  const ctx=await browser.newContext();const page=await ctx.newPage();
  await page.goto(liveUrl,{waitUntil:"domcontentloaded",timeout:60000});
  await page.waitForSelector(".landing-screen",{timeout:30000});
  check("landing renders",await page.locator(".landing-screen").count()===1,"production landing visible");

  await page.click('[data-screen="create"]');await page.fill("#name","Wave1 Host");await page.click("#entry-go");
  await page.waitForSelector(".lobby-screen",{timeout:30000});
  const roomCode=(await page.locator(".room-pin").textContent())?.trim();
  check("create room -> lobby",!!roomCode&&roomCode.length===6,"room code visible");
  check("host start presentation",await page.locator("#start").count()===1,"host sees start button");
  await page.screenshot({path:`${outDir}/create-lobby.png`,fullPage:true});

  const joinCtx=await browser.newContext();const join=await joinCtx.newPage();
  await join.goto(liveUrl,{waitUntil:"domcontentloaded",timeout:60000});
  await join.click('[data-screen="join"]');await join.fill("#name","Wave1 Joiner");await join.fill("#code",roomCode);await join.click("#entry-go");
  await join.waitForSelector(".lobby-screen",{timeout:30000});
  check("join room -> lobby",(await join.locator(".room-pin").textContent())?.trim()===roomCode,"joiner entered same lobby");
  check("non-host has no start",await join.locator("#start").count()===0,"joiner cannot start");

  await page.click("#start");await page.waitForSelector(".world-hud",{timeout:30000});
  check("host start -> game shell",await page.locator(".world-hud").count()===1&&await page.locator(".world-map").count()===1&&await page.locator(".turn-track").count()===1,"HUD/map/turn track visible");

  const lateCtx=await browser.newContext();const late=await lateCtx.newPage();
  await late.goto(liveUrl,{waitUntil:"domcontentloaded",timeout:60000});await late.click('[data-screen="join"]');await late.fill("#name","Wave1 Late");await late.fill("#code",roomCode);await late.click("#entry-go");
  await late.waitForSelector(".queue-card",{timeout:30000});
  check("late join -> waiting queue",(await late.locator(".queue-card").textContent())?.includes("HÀNG CHỜ TÁI SINH")===true,"dedicated queue visible");
  check("waiting queue actionless",await late.locator(".queue-card [data-action],.queue-card [data-buy],.queue-card [data-recover],.queue-card #support-send,.queue-card #propose").count()===0,"no gameplay action controls inside queue");
  await late.screenshot({path:`${outDir}/waiting-queue.png`,fullPage:true});

  // Saved reconnect token path: same storage context, close active page then recover from landing.
  await join.close();const recovered=await joinCtx.newPage();await recovered.goto(liveUrl,{waitUntil:"domcontentloaded",timeout:60000});
  await recovered.waitForSelector("#recover",{timeout:30000});await recovered.click("#recover");
  await recovered.waitForSelector(".queue-card,.world-hud,.lobby-screen",{timeout:30000});
  check("saved reconnect recovery",await recovered.locator(".world-hud,.lobby-screen,.queue-card").count()>0,"room:reconnect/get-state recovery returned authoritative surface");

  // Tutorial isolation/timer/help and safe support fallback.
  const tutCtx=await browser.newContext();const tut=await tutCtx.newPage();await tut.goto(liveUrl,{waitUntil:"domcontentloaded",timeout:60000});
  await tut.click('[data-screen="tutorial"]');await tut.fill("#name","Wave1 Tutorial");await tut.click("#entry-go");
  await tut.waitForSelector(".coach",{timeout:30000});check("tutorial entry isolated",(await tut.locator(".coach").textContent())?.includes("T0")===true,"Tutorial coach appears only tutorial flow");
  const seen=tut.locator('[data-seen="T0"]');if(await seen.count())await seen.click();
  await tut.waitForSelector("[data-timer]",{timeout:30000});const before=await tut.locator("[data-timer]").first().textContent();
  const help=tut.locator("[data-help]").first();if(await help.count())await help.click();await tut.waitForTimeout(1500);const after=await tut.locator("[data-timer]").first().textContent();
  const sec=x=>{const m=String(x||"").match(/(\d+)s/);return m?Number(m[1]):null};const b=sec(before),a=sec(after);
  check("feedback/help does not stop timer",b!==null&&a!==null&&a<b,`timer ${before} -> ${after}`);
  if(await tut.locator("[data-help-close]").count())await tut.locator("[data-help-close]").click();
  await waitText(tut,"VOLUNTARY",45000);
  await tut.locator('[data-panel="support"]').first().click();await tut.waitForSelector(".feature-sheet",{timeout:10000});
  const supportText=await tut.locator(".feature-sheet").textContent();
  check("support has no raw Character ID",!String(supportText).includes("Character ID")&&await tut.locator('#support-target').count()===0,"safe unavailable state until authoritative target list exists");
  check("normal room no tutorial overlay",await recovered.locator(".coach,.tutorial-help,.help-recap").count()===0,"normal flow has no tutorial guidance");
  await tut.screenshot({path:`${outDir}/tutorial-support.png`,fullPage:true});

  results.notes.push("Incoming Birth response and host-only Replay require authoritative proposal/end-game states; validated separately by deterministic client regression/source checks in Chat 07 QA.");
  await ctx.close();await joinCtx.close();await lateCtx.close();await tutCtx.close();
}catch(error){results.error=error instanceof Error?`${error.name}: ${error.message}`:String(error);throw error;}finally{results.finishedAt=new Date().toISOString();await writeFile(`${outDir}/results.json`,JSON.stringify(results,null,2));await browser.close();}
