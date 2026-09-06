import {io} from "socket.io-client";
import crypto from "node:crypto";
const url=process.env.SERVER_URL??"http://127.0.0.1:3001";
const total=10;
const clients=[];
const call=(s,event,payload={})=>new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>reject(new Error(`${event} timeout`)),5000);
  s.emit(event,payload,r=>{clearTimeout(timer);r?.ok?resolve(r):reject(new Error(`${event}: ${r?.error??"unknown"}`))});
});
const connect=()=>new Promise((resolve,reject)=>{
  const s=io(url,{transports:["websocket"],forceNew:true,reconnection:false});
  const timer=setTimeout(()=>reject(new Error("connect timeout")),5000);
  s.once("connect",()=>{clearTimeout(timer);resolve(s)});s.once("connect_error",reject);
});
try{
  for(let i=0;i<total;i++)clients.push(await connect());
  const hostId=crypto.randomUUID();
  const created=await call(clients[0],"room:create",{playerId:hostId,displayName:"QA Host"});
  const code=created.code;
  const ids=[hostId];
  for(let i=1;i<total;i++){
    const id=crypto.randomUUID();ids.push(id);
    await call(clients[i],"room:join",{code,playerId:id,displayName:`QA ${i+1}`});
  }
  for(let i=0;i<total;i++)await call(clients[i],"player:ready",{ready:true});
  await call(clients[0],"game:start",{});
  const state=await call(clients[0],"room:get-state",{});
  if(!state.room.started)throw new Error("game did not start");
  if(state.room.players.length!==10)throw new Error(`expected 10 players, got ${state.room.players.length}`);
  if(!state.room.game?.turnOrder?.length)throw new Error("turn order missing");
  console.log(JSON.stringify({ok:true,code,players:state.room.players.length,round:state.room.game.round,phase:state.room.game.phase},null,2));
}finally{for(const s of clients)s.disconnect()}
