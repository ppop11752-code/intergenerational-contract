import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { extname, join } from 'node:path';

const liveUrl=process.env.LIVE_URL||'https://intergenerational-contract.onrender.com';
const outDir='qa/approved-ui-v1-artifacts';await mkdir(outDir,{recursive:true});
const results={liveUrl,startedAt:new Date().toISOString(),checks:[],notes:[]};
const check=(name,ok,detail='')=>{results.checks.push({name,ok,detail});if(!ok)throw new Error(`${name}: ${detail}`)};
const sec=t=>Number((String(t||'').match(/(\d+)s/)||[])[1]||-1);

const fixture=`<!doctype html><html><body>
<header class="world-hud"><span><small>mandatory</small><b data-timer>5s</b></span></header>
<button data-panel="chronicle">NIÊN SỬ</button><section class="history-sheet"></section>
<div class="status-grid"><button data-action='{"type":"status:set","status":"middle"}'></button></div>
<section class="approved-market"><article class="resource-card"><small>TÁI TẠO</small><h3>LOW</h3><div class="qty-controls"><button>-</button><button>+</button><button>1</button><button>MAX</button><input value="1"><button data-submit>MUA</button></div></article><article class="resource-card"><small>KHÔNG TÁI TẠO</small><h3>HIGH</h3><div class="qty-controls"><button>-</button><button>+</button><button>1</button><button>MAX</button><input value="1"><button data-submit>MUA</button></div></article></section>
<section class="approved-recovery"><article class="recovery-card"><h3>LOW</h3><div class="qty-controls"><button>-</button><button>+</button><button>MAX</button><input value="1"></div><button class="recovery-row" data-recover="low">PHỤC HỒI</button></article></section>
<section class="approved-support"><article class="support-card"><div class="qty-controls"><button>-</button><button>+</button><button>MAX</button><input value="1"><button data-send>GỬI</button></div></article></section>
<section class="feature-sheet" data-tutorial-zone="birth"><h2>SINH CON</h2><p></p><button data-action='{"type":"child:birth"}'>ĐỀ XUẤT</button></section>
<nav class="approved-voluntary"><button data-panel="market">THỊ TRƯỜNG</button><button data-panel="recovery">PHỤC HỒI</button><button data-panel="support">CHU CẤP</button><button data-panel="birth">SINH CON</button></nav>
<section class="queue-card"></section><section class="world-event-banner"></section>
<section class="world-map"><button class="landmark home">HOME</button></section><section class="approved-minimap"><div class="mini-map"></div></section><aside class="turn-track"><button class="turn-token" data-profile="c1">P1</button></aside>
<script type="module" src="/dist/residence-ui-v1.js"></script><script type="module" src="/dist/resolved-ui-contracts.js"></script>
</body></html>`;
const mime={'.js':'text/javascript','.css':'text/css','.html':'text/html','.json':'application/json'};
const server=createServer(async(req,res)=>{try{if(req.url==='/fixture'){res.writeHead(200,{'content-type':'text/html'});res.end(fixture);return}if(req.url?.startsWith('/dist/')){const p=join(process.cwd(),'client',req.url.slice(1));const b=await readFile(p);res.writeHead(200,{'content-type':mime[extname(p)]||'application/octet-stream'});res.end(b);return}res.writeHead(404);res.end()}catch{res.writeHead(500);res.end()}});
await new Promise(r=>server.listen(4177,'127.0.0.1',r));
const browser=await chromium.launch({headless:true});
try{
  // A. Live production desktop + mobile smoke.
  for(const spec of [{label:'desktop',viewport:{width:1440,height:1000}},{label:'mobile',viewport:{width:390,height:844}}]){
    const ctx=await browser.newContext({viewport:spec.viewport});const p=await ctx.newPage();
    await p.goto(liveUrl,{waitUntil:'domcontentloaded',timeout:60000});await p.waitForSelector('.landing-screen',{timeout:30000});
    check(`${spec.label} landing`,(await p.locator('body').innerText()).includes('INTERGENERATIONAL CONTRACT'));
    await p.click('[data-screen="tutorial"]');await p.fill('#name',`QA V1 ${spec.label}`);await p.click('#entry-go');await p.waitForSelector('.world-map',{timeout:60000});
    await p.waitForTimeout(1000);
    const bodyText=await p.locator('body').innerText();check(`${spec.label} no raw ids`,!/characterId|playerId|Character ID/.test(bodyText),bodyText.slice(0,300));check(`${spec.label} no Persona leak`,!/cautious|ambitious|altruistic|hedonist|moderate|fertile/i.test(bodyText));
    const markers=await p.locator('.residence-map-marker').count();check(`${spec.label} authoritative Residence markers`,markers>0,`markers=${markers}`);
    const firstMarker=p.locator('.residence-map-marker').first();await firstMarker.click();await p.waitForSelector('.residence-authoritative-panel',{timeout:10000});check(`${spec.label} Residence world-first navigation`,await p.locator('.residence-authoritative-panel').count()===1);
    await p.locator('[data-residence-close]').click();
    const timer=p.locator('[data-timer]').first();if(await timer.count()){const before=await timer.textContent();await p.waitForTimeout(1100);const after=await timer.textContent();if(sec(before)>=0&&sec(after)>=0)check(`${spec.label} authoritative timer continues`,sec(after)<sec(before),`${before}->${after}`)}
    await p.screenshot({path:`${outDir}/live-${spec.label}.png`,fullPage:true});await ctx.close();
  }

  // B. Production runtime fixture with authoritative snapshots for hard-to-force states.
  const ctx=await browser.newContext({viewport:{width:1280,height:900}});const p=await ctx.newPage();await p.goto('http://127.0.0.1:4177/fixture');await p.waitForTimeout(500);
  const detail={room:{code:'ABC123',started:true,hostPlayerId:'p1',initialPopulationTarget:10,initialNpcCount:9,founderDraw:[],players:[{playerId:'p1',displayName:'An',host:true,connected:true,activeCharacterId:'c1',aiTakeoverCharacterId:null,queuePosition:null}],game:{round:4,year:30,phase:'mandatory',ended:false,endingReason:null,eventName:'Drought',currentTurnCharacterId:'c1',currentTurnPlayerId:'p1',phaseDeadlineAt:Date.now()+5000,phaseDeadlineKind:'mandatory',debt:0,government:{},population:{total:2},policy:{inflationRate:.1},market:{},turnOrder:[],characters:[{characterId:'c1',ownerId:'p1',npc:false,immigrant:false,ageLabel:'Lao động · 30–39 tuổi',status:'middle',currentResidenceId:'r1'},{characterId:'c2',ownerId:null,npc:true,immigrant:true,ageLabel:'Lao động · 30–39 tuổi',status:'poor',currentResidenceId:'r2'}],residenceDirectory:{r1:{residenceId:'r1',status:'occupied',origin:'founder',createdRound:1,coordinates:{x:.3,y:.4},activeOnMap:true,currentNavigationAllowed:true,emptySinceRound:null,abandonedRound:null,reclaimedRound:null,parentResidenceIds:[],occupants:[{characterId:'c1',roleKeys:['parent'],parentCharacterIds:[],spouseCharacterIds:[],childCharacterIds:[]}]},r2:{residenceId:'r2',status:'occupied',origin:'immigrant',createdRound:4,coordinates:{x:.7,y:.6},activeOnMap:true,currentNavigationAllowed:true,emptySinceRound:null,abandonedRound:null,reclaimedRound:null,parentResidenceIds:[],occupants:[{characterId:'c2',roleKeys:[],parentCharacterIds:[],spouseCharacterIds:[],childCharacterIds:[]}]}},activeMapResidenceIds:['r1','r2'],residenceTransitions:[{id:'rt1',round:4,year:30,characterId:'c1',kind:'adult_move',fromResidenceId:'r0',toResidenceId:'r1'}],worldEvent:{id:'we1',round:4,year:30,name:'Drought',chronicleEntryId:'chron-we1',impacts:[{system:'RESOURCE',labelKey:'EVENT_RENEWABLE_POOL',value:80,delta:-20,unit:'absolute'}]},worldEventOccurrences:[{id:'we1',round:4,year:30,name:'Drought',chronicleEntryId:'chron-we1',impacts:[{system:'RESOURCE',labelKey:'EVENT_RENEWABLE_POOL',value:80,delta:-20,unit:'absolute'}]}] }},player:{playerId:'p1',queuePosition:null,character:{id:'c1'},currentResidenceId:'r1',financial:{cash:100,householdAssets:150},statusQuote:{roundAverageAssets:100,priceIndex:1,cards:[{status:'middle',fee:20,personsCharged:1,affordable:true,unavailableReason:null}],nobleCompetition:{}},marketQuotes:[{resourceType:'renewable',grade:'low',purchasableMax:7,unavailableReason:null},{resourceType:'nonrenewable',grade:'high',purchasableMax:null,unavailableReason:'MARKET_GRADE_LOCKED'}],recoveryQuotes:[{grade:'low',currentPool:10,carryingCapacity:20,pendingNextRound:0,capacityRemaining:10,costPerUnit:2,acceptedMax:4,unavailableReason:null}],eligibleSupportTargets:[{characterId:'c2',relation:'child',ageLabel:'Trẻ em',status:'poor',transferableMax:13,unavailableReason:null}],supportUnavailableReason:null,birthQuote:{maxProposals:2,canInitiate:false,unavailableReason:'BIRTH_REQUIRES_COUPLE',promotionalThirdSlot:false,slots:[{index:1,status:'available',available:false,unavailableReason:'BIRTH_REQUIRES_COUPLE'}]},recentLifecycleResults:[{id:'lr1',type:'elderly_medical',round:4,year:30,medicalPaid:8,medicalDue:10},{id:'lr2',type:'inheritance',round:4,year:30,estateTotal:120,governmentTransfer:20,beneficiaries:[{characterId:'c1',amount:100}]}]}};
  await p.evaluate(d=>window.dispatchEvent(new CustomEvent('ic:snapshot',{detail:d})),detail);await p.waitForTimeout(500);
  check('fixture status authoritative fee',(await p.locator('.server-status-quote').textContent())?.includes('Phí 20'));
  await p.locator('.approved-market .resource-card').first().locator('.qty-controls button').nth(3).click();check('fixture Market MAX authoritative',(await p.locator('.approved-market .resource-card').first().locator('input').inputValue())==='7');
  check('fixture Market disabled reason',await p.locator('.approved-market .resource-card').nth(1).locator('.authoritative-reason').count()===1);
  await p.locator('.approved-recovery .qty-controls button').nth(2).click();check('fixture Recovery MAX authoritative',(await p.locator('.approved-recovery input').inputValue())==='4');
  await p.locator('.approved-support .qty-controls button').nth(2).click();check('fixture Support MAX authoritative',(await p.locator('.approved-support input').inputValue())==='13');
  check('fixture Birth reason authoritative',(await p.locator('[data-tutorial-zone="birth"] .authoritative-reason').textContent())?.includes('hai vợ/chồng'));
  const lifecycle=await p.locator('.lifecycle-result-stack').innerText();check('fixture structured mortality/inheritance',lifecycle.includes('Y TẾ CAO TUỔI')&&lifecycle.includes('DI SẢN 120')&&lifecycle.includes('Chuyển Chính phủ 20'),lifecycle);
  check('fixture Residence markers',await p.locator('.residence-map-marker').count()===2);
  await p.locator('.world-event-banner .event-detail-open').click();check('fixture World Event detail',(await p.locator('.world-event-detail-panel').innerText()).includes('Pool tái tạo'));
  await p.locator('[data-event-chronicle]').click();await p.waitForTimeout(100);check('fixture World Event Chronicle list',await p.locator('.structured-world-events [data-world-event-id="we1"]').count()===1);
  const beforeNodes=await p.locator('*').count();for(let i=0;i<8;i++)await p.evaluate(d=>window.dispatchEvent(new CustomEvent('ic:snapshot',{detail:d})),detail);await p.waitForTimeout(250);const afterNodes=await p.locator('*').count();check('fixture no render loop',afterNodes-beforeNodes<8,`nodes ${beforeNodes}->${afterNodes}`);
  await p.screenshot({path:`${outDir}/fixture.png`,fullPage:true});await ctx.close();
  results.notes.push('QR remains independently covered by H033 25/25 browser gate; this gate additionally confirms Approved UI V1 changes did not expose raw IDs/Persona and live Residence/mobile rendering remains functional.');
}catch(e){results.error=e instanceof Error?`${e.name}: ${e.message}`:String(e);throw e}finally{results.finishedAt=new Date().toISOString();await writeFile(`${outDir}/results.json`,JSON.stringify(results,null,2));await browser.close();server.close()}
