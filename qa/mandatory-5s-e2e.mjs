import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const liveUrl=process.env.LIVE_URL||"https://intergenerational-contract.onrender.com";
const outDir="qa/mandatory-5s-artifacts";
await mkdir(outDir,{recursive:true});
const results={liveUrl,startedAt:new Date().toISOString(),checks:[],measurements:{},notes:[]};
const check=(name,ok,detail="")=>{results.checks.push({name,ok,detail});if(!ok)throw new Error(`${name}: ${detail}`)};
const browser=await chromium.launch({headless:true});
try{
  const ctx=await browser.newContext({viewport:{width:1440,height:1000}});
  const page=await ctx.newPage();
  await page.goto(liveUrl,{waitUntil:"domcontentloaded",timeout:60_000});
  await page.waitForSelector("#app",{timeout:30_000});
  check("production landing loads",await page.locator("h1").first().isVisible(),"#app and heading visible");

  await page.evaluate(()=>{
    window.__mandatoryQa=[];
    window.__mandatoryLast=null;
    window.addEventListener("ic:snapshot",e=>{
      const d=e.detail||{};window.__mandatoryLast=d;
      const g=d.room?.game;
      if(g)window.__mandatoryQa.push({t:Date.now(),phase:g.phase,deadline:g.phaseDeadlineAt,kind:g.phaseDeadlineKind,ended:g.ended});
    });
  });

  await page.click('[data-screen="tutorial"]');
  await page.waitForSelector("#entry-go",{timeout:10_000});
  await page.fill("#name","Mandatory 5s QA");
  await page.click("#entry-go");

  await page.waitForFunction(()=>window.__mandatoryQa?.some(x=>x.phase==="mandatory"&&x.kind==="mandatory"&&Number.isFinite(x.deadline)),null,{timeout:30_000});
  await page.waitForSelector(".mandatory-card",{timeout:10_000});
  await page.waitForTimeout(150);

  const initial=await page.evaluate(()=>{
    const samples=window.__mandatoryQa||[];const m=samples.find(x=>x.phase==="mandatory"&&x.kind==="mandatory"&&Number.isFinite(x.deadline));
    const spans=[...document.querySelectorAll(".world-hud>span")];
    const phaseSpan=spans.find(s=>s.querySelector("small")?.textContent?.trim().toLowerCase()==="mandatory");
    const b=phaseSpan?.querySelector("b");
    const card=document.querySelector(".mandatory-card");
    const buttons=[...(card?.querySelectorAll("button")||[])].map(x=>({text:x.textContent?.trim()||"",action:x.getAttribute("data-action")||""}));
    return {sample:m,receivedAt:Date.now(),hudText:b?.textContent?.trim()||"",hudTimer:b?.hasAttribute("data-timer")||false,buttons,cardText:card?.textContent||""};
  });
  const remaining=initial.sample.deadline-initial.sample.t;
  results.measurements.deadlineRemainingAtFirstSnapshotMs=remaining;
  check("authoritative Mandatory deadline is about 5 seconds",remaining>=4_200&&remaining<=5_100,`deadline-receive=${remaining}ms`);
  check("Mandatory HUD shows automatic state",initial.hudText==="TỰ ĐỘNG",`HUD=${initial.hudText}`);
  check("Mandatory HUD has no countdown marker",initial.hudTimer===false,"data-timer absent during Mandatory");
  check("Mandatory card has no skip/continue/confirm",initial.buttons.length===0,JSON.stringify(initial.buttons));
  check("normal Mandatory content is readable",/CHI PHÍ BẮT BUỘC/.test(initial.cardText)&&/Tài sản đầu vòng/.test(initial.cardText)&&/Cash hiện tại/.test(initial.cardText),initial.cardText.slice(0,240));
  await page.screenshot({path:`${outDir}/mandatory-normal.png`,fullPage:true});

  const forcedQuote={breakdown:{living:15,socialContribution:2,tax:3,childSupport:4,parentSupport:5,grief:1,medical:6,total:36},netIncome:8,cashBefore:10,liquidationRequired:true,liquidationProceeds:40,cashAfterLiquidation:50,projectedBankruptcy:false,shortfall:0,dominantCost:"living"};
  await page.evaluate(q=>{const d=window.__mandatoryLast;window.dispatchEvent(new CustomEvent("ic:snapshot",{detail:{room:d.room,player:{...(d.player||{}),mandatoryQuote:q}}}))},forcedQuote);
  await page.waitForFunction(()=>document.querySelector(".mandatory-card .server-display")?.textContent?.includes("40"),null,{timeout:5_000});
  const forcedText=await page.locator(".mandatory-card .server-display").textContent();
  check("forced liquidation presentation remains readable",forcedText?.includes("Thanh lý dự kiến")&&forcedText?.includes("40")&&forcedText?.includes("Chưa dự kiến phá sản"),forcedText||"");
  await page.screenshot({path:`${outDir}/mandatory-liquidation.png`,fullPage:true});

  const bankruptcyQuote={...forcedQuote,liquidationProceeds:5,cashAfterLiquidation:15,projectedBankruptcy:true,shortfall:21};
  await page.evaluate(q=>{const d=window.__mandatoryLast;window.dispatchEvent(new CustomEvent("ic:snapshot",{detail:{room:d.room,player:{...(d.player||{}),mandatoryQuote:q}}}))},bankruptcyQuote);
  await page.waitForFunction(()=>document.querySelector(".mandatory-card .server-display")?.textContent?.includes("DỰ KIẾN PHÁ SẢN"),null,{timeout:5_000});
  const bankruptcyText=await page.locator(".mandatory-card .server-display").textContent();
  check("bankruptcy presentation remains readable",bankruptcyText?.includes("DỰ KIẾN PHÁ SẢN")&&bankruptcyText?.includes("Thiếu hụt dự kiến")&&bankruptcyText?.includes("21"),bankruptcyText||"");
  await page.screenshot({path:`${outDir}/mandatory-bankruptcy.png`,fullPage:true});

  await page.waitForFunction(()=>{const a=window.__mandatoryQa||[];const i=a.findIndex(x=>x.phase==="mandatory"&&x.kind==="mandatory");return i>=0&&a.slice(i+1).some(x=>x.phase!=="mandatory")},null,{timeout:10_000});
  const transition=await page.evaluate(()=>{const a=window.__mandatoryQa||[];const i=a.findIndex(x=>x.phase==="mandatory"&&x.kind==="mandatory");const first=a[i];const next=a.slice(i+1).find(x=>x.phase!=="mandatory");return{first,next,elapsed:next.t-first.t}});
  results.measurements.mandatoryObservedTransitionMs=transition.elapsed;
  results.measurements.nextPhase=transition.next.phase;
  check("Mandatory auto-transitions at about 5 seconds",transition.elapsed>=4_200&&transition.elapsed<=5_600,`observed=${transition.elapsed}ms; next=${transition.next.phase}`);
  check("phase order advances to Status",transition.next.phase==="status",`next=${transition.next.phase}`);

  await page.waitForFunction(()=>document.querySelector(".status-card"),null,{timeout:10_000});
  const statusTimer=await page.evaluate(()=>{const card=document.querySelector(".status-card");const hud=[...document.querySelectorAll(".world-hud>span")].find(s=>s.querySelector("small")?.textContent?.trim().toLowerCase()==="status");const b=hud?.querySelector("b");return{cardText:card?.textContent||"",hudText:b?.textContent?.trim()||"",hasTimer:b?.hasAttribute("data-timer")||false}});
  check("Status timer remains authoritative/visible",statusTimer.hasTimer&&/\d+s/.test(statusTimer.hudText),`HUD=${statusTimer.hudText}`);

  const statusButton=page.locator('button[data-action*="status:set"]').first();
  await statusButton.click();
  await page.waitForFunction(()=>window.__mandatoryQa?.some(x=>x.phase==="voluntary"),null,{timeout:10_000});
  const voluntaryTimer=await page.evaluate(()=>{const hud=[...document.querySelectorAll(".world-hud>span")].find(s=>s.querySelector("small")?.textContent?.trim().toLowerCase()==="voluntary");const b=hud?.querySelector("b");return{hudText:b?.textContent?.trim()||"",hasTimer:b?.hasAttribute("data-timer")||false,hasEndTurn:!!document.querySelector('button[data-action*=\"turn:complete\"]')}});
  check("Voluntary timer remains authoritative/visible",voluntaryTimer.hasTimer&&/\d+s/.test(voluntaryTimer.hudText),`HUD=${voluntaryTimer.hudText}`);
  check("surrounding turn flow remains interactive after Mandatory",voluntaryTimer.hasEndTurn,"Voluntary end-turn action visible");

  results.notes.push("Forced-liquidation and projected-bankruptcy readability are exercised by dispatching presentation-only synthetic authoritative-shaped snapshots into the production display renderer while the live server retains timing/gameplay authority.");
  results.notes.push("Terminal-bankruptcy routing itself is covered by backend deterministic/release regression in the workflow; the browser does not mutate live gameplay state to force bankruptcy.");
  await ctx.close();
} catch(error){results.error=error instanceof Error?`${error.name}: ${error.message}`:String(error);throw error}
finally{results.finishedAt=new Date().toISOString();await writeFile(`${outDir}/results.json`,JSON.stringify(results,null,2));await browser.close()}
