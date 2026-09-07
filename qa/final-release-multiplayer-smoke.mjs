import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const liveUrl = process.env.LIVE_URL || "https://intergenerational-contract.onrender.com";
const outDir = "qa/final-release-artifacts";
await mkdir(outDir,{recursive:true});
const result={liveUrl,startedAt:new Date().toISOString(),checks:[]};
const check=(name,ok,detail="")=>{result.checks.push({name,ok,detail});if(!ok)throw new Error(`${name}: ${detail}`)};

const health=await fetch(new URL("/health",liveUrl));
const healthText=await health.text();
check("production /health",health.ok,`status=${health.status}; body=${healthText.slice(0,160)}`);

const browser=await chromium.launch({headless:true});
try{
  const ctx=await browser.newContext();
  const page=await ctx.newPage();
  await page.goto(liveUrl,{waitUntil:"domcontentloaded",timeout:60_000});
  await page.waitForFunction(()=>typeof window.io==="function",null,{timeout:30_000});

  const smoke=await page.evaluate(async()=>{
    const emit=(s,event,payload={})=>new Promise((resolve,reject)=>{
      const t=setTimeout(()=>reject(new Error(`${event} timeout`)),15000);
      s.emit(event,payload,(r)=>{clearTimeout(t);resolve(r)});
    });
    const connect=()=>new Promise((resolve,reject)=>{
      const s=window.io(undefined,{transports:["websocket","polling"]});
      const t=setTimeout(()=>reject(new Error("socket connect timeout")),15000);
      s.on("connect",()=>{clearTimeout(t);resolve(s)});
      s.on("connect_error",e=>{clearTimeout(t);reject(e)});
    });
    const hostId=crypto.randomUUID(),joinId=crypto.randomUUID();
    const host=await connect();
    let hostRoomEvents=0,hostPlayerEvents=0;
    host.on("room:state",()=>hostRoomEvents++);host.on("player:state",()=>hostPlayerEvents++);
    const created=await emit(host,"room:create",{playerId:hostId,displayName:"H085 Host"});
    if(!created?.ok)throw new Error(`room:create ${created?.error||"failed"}`);
    const code=created.code,hostToken=created.reconnectToken;

    const join=await connect();
    let joinRoomEvents=0,joinPlayerEvents=0;
    join.on("room:state",()=>joinRoomEvents++);join.on("player:state",()=>joinPlayerEvents++);
    const joined=await emit(join,"room:join",{code,playerId:joinId,displayName:"H085 Join"});
    if(!joined?.ok)throw new Error(`room:join ${joined?.error||"failed"}`);

    const started=await emit(host,"game:start",{});
    if(!started?.ok)throw new Error(`game:start ${started?.error||"failed"}`);
    await new Promise(r=>setTimeout(r,250));
    const state=await emit(host,"room:get-state",{});
    if(!state?.ok)throw new Error(`room:get-state ${state?.error||"failed"}`);

    host.disconnect();
    await new Promise(r=>setTimeout(r,150));
    const reconnect=await connect();
    let reconnectRoomEvents=0,reconnectPlayerEvents=0;
    reconnect.on("room:state",()=>reconnectRoomEvents++);reconnect.on("player:state",()=>reconnectPlayerEvents++);
    const rejoined=await emit(reconnect,"room:reconnect",{code,playerId:hostId,reconnectToken:hostToken});
    if(!rejoined?.ok)throw new Error(`room:reconnect ${rejoined?.error||"failed"}`);
    await new Promise(r=>setTimeout(r,250));
    const afterReconnect=await emit(reconnect,"room:get-state",{});
    if(!afterReconnect?.ok)throw new Error(`room:get-state after reconnect ${afterReconnect?.error||"failed"}`);

    const summary={
      code,
      createOk:!!created.ok,joinOk:!!joined.ok,startOk:!!started.ok,getStateOk:!!state.ok,reconnectOk:!!rejoined.ok,afterReconnectOk:!!afterReconnect.ok,
      hostTokenPresent:typeof hostToken==="string"&&hostToken.length>0,
      joinTokenPresent:typeof joined.reconnectToken==="string"&&joined.reconnectToken.length>0,
      startedFlag:state.room?.started===true,
      gamePresent:!!state.room?.game,
      playerCount:Array.isArray(state.room?.players)?state.room.players.length:0,
      reconnectSameRoom:afterReconnect.room?.code===code,
      reconnectStarted:afterReconnect.room?.started===true,
      hostRoomEvents,hostPlayerEvents,joinRoomEvents,joinPlayerEvents,reconnectRoomEvents,reconnectPlayerEvents
    };
    try{join.disconnect()}catch{};try{reconnect.disconnect()}catch{};
    return summary;
  });

  check("room:create",smoke.createOk,JSON.stringify(smoke));
  check("reconnect token issued",smoke.hostTokenPresent&&smoke.joinTokenPresent,JSON.stringify(smoke));
  check("room:join",smoke.joinOk,JSON.stringify(smoke));
  check("game:start",smoke.startOk&&smoke.startedFlag&&smoke.gamePresent,JSON.stringify(smoke));
  check("authoritative room state",smoke.getStateOk&&smoke.playerCount>=2,JSON.stringify(smoke));
  check("disconnect/reconnect",smoke.reconnectOk&&smoke.afterReconnectOk&&smoke.reconnectSameRoom&&smoke.reconnectStarted,JSON.stringify(smoke));
  check("state emissions observed",smoke.hostRoomEvents>0&&smoke.hostPlayerEvents>0&&smoke.joinRoomEvents>0&&smoke.joinPlayerEvents>0,JSON.stringify(smoke));
  result.smoke=smoke;
  await page.screenshot({path:`${outDir}/production.png`,fullPage:true});
  await ctx.close();
}catch(e){result.error=e instanceof Error?`${e.name}: ${e.message}`:String(e);throw e}
finally{result.finishedAt=new Date().toISOString();await writeFile(`${outDir}/multiplayer-results.json`,JSON.stringify(result,null,2));await browser.close();}
