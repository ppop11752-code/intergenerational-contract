import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { join, extname } from 'node:path';

const html=`<!doctype html><meta charset="utf-8"><body>
<section class="residence-authoritative-panel"><button data-resident-character="c2">Ứng viên</button></section>
<script type="module" src="/dist/resolved-ui-contracts.js"></script>
<script type="module" src="/dist/approved-ui-finalize.js"></script>
</body>`;
const srv=createServer(async(req,res)=>{try{if(req.url==='/'){res.writeHead(200,{'content-type':'text/html; charset=utf-8'});res.end(html);return}if(req.url?.startsWith('/dist/')){const p=join(process.cwd(),'client',req.url.slice(1));const b=await readFile(p);res.writeHead(200,{'content-type':extname(p)==='.js'?'text/javascript; charset=utf-8':'text/plain'});res.end(b);return}res.writeHead(404);res.end()}catch{res.writeHead(500);res.end()}});
await new Promise(resolve=>srv.listen(4181,'127.0.0.1',resolve));
const snapshot={room:{code:'ABC123',started:true,hostPlayerId:'p1',players:[{playerId:'p1',displayName:'An',host:true,connected:true,activeCharacterId:'c1',aiTakeoverCharacterId:null,queuePosition:null}],game:{round:5,year:40,phase:'voluntary',characters:[{characterId:'c1',ownerId:'p1',npc:false,currentResidenceId:'r1'},{characterId:'c2',ownerId:null,npc:true,currentResidenceId:'r2'}],worldEventOccurrences:[]}},player:{playerId:'p1',queuePosition:null,character:{id:'c1'},canSendMarriage:false,marriageCandidates:[{characterId:'c2'}],recoveryQuotes:[],eligibleSupportTargets:[],recentLifecycleResults:[]}};
const browser=await chromium.launch({headless:true});
try{
  const page=await browser.newPage();
  await page.goto('http://127.0.0.1:4181/');
  await page.evaluate(x=>window.dispatchEvent(new CustomEvent('ic:snapshot',{detail:x})),snapshot);
  await page.locator('[data-resident-character="c2"]').click();
  const repeated=Promise.all(Array.from({length:8},()=>page.evaluate(x=>window.dispatchEvent(new CustomEvent('ic:snapshot',{detail:x})),snapshot)));
  await Promise.race([repeated,new Promise((_,reject)=>setTimeout(()=>reject(new Error('H084 event loop starved after repeated identical snapshots')),3000))]);
  await page.waitForTimeout(100);
  const responsive=await Promise.race([page.evaluate(()=>({text:document.querySelector('[data-profile-marriage]')?.textContent||'',disabled:(document.querySelector('[data-profile-marriage]'))?.disabled===true,count:document.querySelectorAll('[data-profile-marriage]').length})),new Promise((_,reject)=>setTimeout(()=>reject(new Error('H084 browser became unresponsive')),3000))]);
  if(responsive.count!==1)throw new Error(`expected one Marriage affordance, got ${responsive.count}`);
  if(!responsive.disabled)throw new Error('Marriage affordance must remain disabled when canSendMarriage=false');
  if(responsive.text.trim()!=='CÓ THỂ GỬI NGOÀI LƯỢT CỦA BẠN')throw new Error(`unexpected copy: ${responsive.text}`);
  console.log('H084 browser regression PASS',responsive);
}finally{await browser.close();srv.close()}
