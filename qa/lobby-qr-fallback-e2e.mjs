import { chromium } from "playwright";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mkdir, writeFile, readFile } from "node:fs/promises";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const outDir=path.join(root,"qa/lobby-qr-fallback-artifacts");await mkdir(outDir,{recursive:true});
const results={startedAt:new Date().toISOString(),checks:[]};
const check=(name,ok,detail="")=>{results.checks.push({name,ok,detail});if(!ok)throw new Error(`${name}: ${detail}`)};
const runtime=await readFile(path.join(root,"client/dist/qr-runtime.js"));
const contract=await readFile(path.join(root,"client/dist/qr-contract.js"));
const html=`<!doctype html><html><body><section class="lobby-screen"><div class="room-pin">ABC123</div><div class="qr-placeholder"></div><button id="start" type="button">BẮT ĐẦU</button></section><script>window.QRCode=undefined</script><script type="module" src="/dist/qr-runtime.js"></script></body></html>`;
const server=createServer((req,res)=>{if(req.url==="/"||req.url==="/index.html"){res.writeHead(200,{"content-type":"text/html; charset=utf-8"});res.end(html);return}if(req.url==="/dist/qr-runtime.js"){res.writeHead(200,{"content-type":"text/javascript; charset=utf-8"});res.end(runtime);return}if(req.url==="/dist/qr-contract.js"){res.writeHead(200,{"content-type":"text/javascript; charset=utf-8"});res.end(contract);return}res.writeHead(404);res.end("not found")});
await new Promise((resolve,reject)=>{server.once("error",reject);server.listen(0,"127.0.0.1",resolve)});
const address=server.address();if(!address||typeof address==="string")throw new Error("no server port");const origin=`http://127.0.0.1:${address.port}`;

const browser=await chromium.launch({headless:true});
try{
 const ctx=await browser.newContext();const page=await ctx.newPage();
 await page.goto(origin,{waitUntil:"domcontentloaded",timeout:10000});
 await page.waitForSelector('.qr-fallback',{timeout:5000});
 check("renderer unavailable shows required fallback",(await page.locator('.qr-fallback').textContent())?.trim()==="Không tạo được mã QR — hãy nhập mã phòng.",await page.locator('.qr-fallback').textContent()||"");
 check("large PIN remains visible",(await page.locator('.room-pin').textContent())?.trim()==='ABC123',await page.locator('.room-pin').textContent()||"");
 check("Host Start remains usable",await page.locator('#start').isEnabled(),"start enabled");
 check("no fake QR canvas/image in fallback",await page.locator('.qr-functional canvas,.qr-functional img').count()===0,"QR child count");
 const expected=`${origin}/?room=ABC123`;check("fallback keeps same manual deep-link",(await page.locator('.qr-link-text').textContent())?.trim()===expected,await page.locator('.qr-link-text').textContent()||"");
 await page.screenshot({path:path.join(outDir,'qr-fallback-runtime.png'),fullPage:true});await ctx.close();
}catch(e){results.error=e instanceof Error?`${e.name}: ${e.message}`:String(e);throw e}finally{results.finishedAt=new Date().toISOString();await writeFile(path.join(outDir,'results.json'),JSON.stringify(results,null,2));await browser.close();await new Promise(r=>server.close(r))}
