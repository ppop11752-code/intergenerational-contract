import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';

const out='qa/world-event-approved-ui-artifacts';
await mkdir(out,{recursive:true});
const liveUrl=process.env.LIVE_URL||'https://intergenerational-contract.onrender.com';
const result={liveUrl,checks:[],startedAt:new Date().toISOString()};
const check=(name,ok,detail='')=>{result.checks.push({name,ok,detail});if(!ok)throw new Error(`${name}: ${detail}`)};

// Production deployment surface: H079/H082 must actually be in the deployed JS, not only source.
for(const asset of ['dist/resolved-ui-contracts.js','dist/approved-ui-finalize.js']){
  const res=await fetch(new URL(asset,liveUrl));
  const body=await res.text();
  check(`production ${asset}`,res.ok&&body.length>1000,`status=${res.status}; bytes=${body.length}`);
  if(asset.includes('resolved-ui-contracts')){
    check('production direct World Event banner runtime',body.includes('world-event-banner-detail'),'missing direct banner detail');
    check('production removes separate World Event detail path',!body.includes('event-detail-open')&&!body.includes('world-event-detail-panel')&&!body.includes('CHI TIẾT'),'legacy detail path still deployed');
    check('production consumes structured impacts',body.includes('.impacts')&&body.includes('chronicleEntryId'),'structured impacts/link missing');
    check('production H082 unified Chronicle focus',body.includes('data-chronicle-entry-id')&&body.includes('focused-event')&&!body.includes('name==='),'unified exact-id focus missing or name inference present');
  } else {
    check('production Marriage disabled affordance copy',body.includes('CÓ THỂ GỬI NGOÀI LƯỢT CỦA BẠN'),'approved disabled marriage copy missing');
  }
}

const html=`<!doctype html><meta charset="utf-8"><body>
<header class="world-hud"><b data-timer>20s</b></header>
<button data-panel="chronicle">NIÊN SỬ</button>
<button data-chronicle="world">WORLD</button>
<section class="history-sheet"></section>
<section class="world-event-banner"><h3 class="event-name">HẠN HÁN</h3></section>
<section class="residence-authoritative-panel"><button data-resident-character="c2">Ứng viên</button></section>
<script>let t=20;setInterval(()=>{t--;const e=document.querySelector('[data-timer]');if(e)e.textContent=t+'s'},250)</script>
<script type="module" src="/dist/resolved-ui-contracts.js"></script>
<script type="module" src="/dist/approved-ui-finalize.js"></script>
</body>`;

const srv=createServer(async(req,res)=>{try{
  if(req.url==='/'){res.writeHead(200,{'content-type':'text/html; charset=utf-8'});res.end(html);return}
  if(req.url?.startsWith('/dist/')){const p=join(process.cwd(),'client',req.url.slice(1));const b=await readFile(p);res.writeHead(200,{'content-type':extname(p)==='.js'?'text/javascript; charset=utf-8':'text/plain; charset=utf-8'});res.end(b);return}
  res.writeHead(404);res.end();
}catch{res.writeHead(500);res.end()}});
await new Promise(resolve=>srv.listen(4180,'127.0.0.1',resolve));

const snapshot={
 room:{code:'ABC123',started:true,hostPlayerId:'p1',players:[{playerId:'p1',displayName:'An',host:true,connected:true,activeCharacterId:'c1',aiTakeoverCharacterId:null,queuePosition:null}],game:{round:5,year:40,phase:'voluntary',characters:[{characterId:'c1',ownerId:'p1',npc:false,immigrant:false,ageLabel:'Lao động',status:'middle',currentResidenceId:'r1'},{characterId:'c2',ownerId:null,npc:true,immigrant:false,ageLabel:'Lao động',status:'middle',currentResidenceId:'r2'}],worldEvent:{id:'we-h080',round:5,year:40,name:'HẠN HÁN',chronicleEntryId:'chron-h080',impacts:[{system:'RESOURCE',labelKey:'EVENT_RENEWABLE_POOL',value:80,delta:-20,unit:'absolute'},{system:'GOVERNMENT',labelKey:'EVENT_SUPPORT_FUND_INJECTION',value:300,delta:50,unit:'absolute'}]},worldEventOccurrences:[{id:'we-h080',round:5,year:40,name:'HẠN HÁN',chronicleEntryId:'chron-h080',impacts:[{system:'RESOURCE',labelKey:'EVENT_RENEWABLE_POOL',value:80,delta:-20,unit:'absolute'},{system:'GOVERNMENT',labelKey:'EVENT_SUPPORT_FUND_INJECTION',value:300,delta:50,unit:'absolute'}]}]}},
 player:{playerId:'p1',queuePosition:null,character:{id:'c1'},canSendMarriage:false,marriageCandidates:[{characterId:'c2'}],currentResidenceId:'r1',recoveryQuotes:[],eligibleSupportTargets:[],recentLifecycleResults:[]}
};

const browser=await chromium.launch({headless:true});
try{
  const desktop=await browser.newContext({viewport:{width:1440,height:900}});const p=await desktop.newPage();await p.goto('http://127.0.0.1:4180/');await p.waitForTimeout(200);
  const timerBefore=await p.locator('[data-timer]').textContent();
  await p.evaluate(x=>window.dispatchEvent(new CustomEvent('ic:snapshot',{detail:x})),snapshot);await p.waitForTimeout(150);
  const detail=p.locator('.world-event-banner-detail');check('desktop direct banner detail exists',await detail.count()===1);
  check('desktop no separate CHI TIẾT/detail sheet',await p.locator('.event-detail-open,.world-event-detail-panel').count()===0&&!((await p.locator('body').innerText()).includes('CHI TIẾT')));
  const bannerText=await p.locator('.world-event-banner').innerText();check('event name remains visible in temporary banner',bannerText.includes('HẠN HÁN'),bannerText);
  check('concrete authoritative impact rows visible',bannerText.includes('Pool tái tạo')&&bannerText.includes('80')&&bannerText.includes('-20')&&bannerText.includes('Quỹ hỗ trợ')&&bannerText.includes('300')&&bannerText.includes('+50'),bannerText);
  const rows=detail.locator(':scope > p');check('only affected systems render',await rows.count()===2,`rows=${await rows.count()}; text=${bannerText}`);
  check('no hidden extra system rows',!bannerText.includes('Lợi suất thị trường')&&!bannerText.includes('Giới hạn đề xuất sinh con')&&!bannerText.includes('Phí y tế bắt buộc'),bannerText);
  check('Chronicle link present for exact entry',await detail.locator('[data-event-chronicle]').count()===1);
  await detail.locator('[data-event-chronicle]').click();await p.waitForTimeout(100);
  check('Chronicle row carries exact authoritative entry id',await p.locator('[data-world-event-id="we-h080"][data-chronicle-entry-id="chron-h080"]').count()===1);
  check('Chronicle focuses matching structured event',await p.locator('[data-world-event-id="we-h080"].focused-event').count()===1);
  const timerAfter=await p.locator('[data-timer]').textContent();check('event presentation does not pause/reset timer',Number.parseInt(timerAfter)<Number.parseInt(timerBefore),`${timerBefore}->${timerAfter}`);
  const changed=structuredClone(snapshot);changed.room.game.worldEvent.impacts=[{system:'BIRTH',labelKey:'EVENT_BIRTH_PROPOSAL_LIMIT',value:3,delta:1,unit:'absolute'}];changed.room.game.worldEventOccurrences=[{...changed.room.game.worldEvent}];
  await p.evaluate(x=>window.dispatchEvent(new CustomEvent('ic:snapshot',{detail:x})),changed);await p.waitForTimeout(100);const changedText=await p.locator('.world-event-banner-detail').innerText();check('no event-name inference',changedText.includes('Giới hạn đề xuất sinh con')&&changedText.includes('3')&&!changedText.includes('Pool tái tạo')&&!changedText.includes('Quỹ hỗ trợ'),changedText);
  await p.locator('[data-resident-character="c2"]').click();await p.evaluate(x=>window.dispatchEvent(new CustomEvent('ic:snapshot',{detail:x})),snapshot);await p.waitForTimeout(100);const mb=p.locator('[data-profile-marriage]');check('Marriage candidate affordance remains visible',await mb.count()===1&&await mb.isVisible());check('Marriage candidate affordance disabled in own economic turn',await mb.isDisabled());check('Marriage approved explanatory copy',((await mb.textContent())||'').trim()==='CÓ THỂ GỬI NGOÀI LƯỢT CỦA BẠN',(await mb.textContent())||'');
  await p.screenshot({path:`${out}/desktop.png`,fullPage:true});await desktop.close();

  const mobile=await browser.newContext({viewport:{width:390,height:844}});const m=await mobile.newPage();await m.goto('http://127.0.0.1:4180/');await m.waitForTimeout(150);await m.evaluate(x=>window.dispatchEvent(new CustomEvent('ic:snapshot',{detail:x})),snapshot);await m.waitForTimeout(100);const mobileText=await m.locator('.world-event-banner').innerText();check('mobile same-content responsive reflow',mobileText.includes('HẠN HÁN')&&mobileText.includes('Pool tái tạo')&&mobileText.includes('Quỹ hỗ trợ')&&mobileText.includes('XEM TRONG NIÊN SỬ'),mobileText);check('mobile exposes no extra detail surface',await m.locator('.event-detail-open,.world-event-detail-panel').count()===0);const geom=await m.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}));check('mobile no horizontal overflow',geom.sw<=geom.cw+2,JSON.stringify(geom));await m.screenshot({path:`${out}/mobile.png`,fullPage:true});await mobile.close();
}catch(e){result.error=String(e);throw e}finally{result.finishedAt=new Date().toISOString();await writeFile(`${out}/results.json`,JSON.stringify(result,null,2));await browser.close();srv.close()}
