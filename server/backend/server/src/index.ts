import express from "express";
import cors from "cors";
import { createServer } from "node:http";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { Server } from "socket.io";
import { AuthoritativeRoom, type ClientAction } from "../../src/authoritative-room.js";

const app = express();
const allowedOrigins=(process.env.CORS_ORIGINS??"*").split(",").map(x=>x.trim()).filter(Boolean);
const allowAny=allowedOrigins.includes("*");
const corsOrigin=(origin:string|undefined,cb:(err:Error|null,allow?:boolean)=>void)=>{
  if(!origin||allowAny||allowedOrigins.includes(origin))return cb(null,true);
  cb(new Error("CORS_NOT_ALLOWED"));
};
app.disable("x-powered-by");
app.use(cors({origin:corsOrigin,credentials:!allowAny}));
app.use(express.json({limit:"32kb"}));
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: allowAny?"*":allowedOrigins, credentials:!allowAny } });
const rooms = new Map<string, AuthoritativeRoom>();
const roomTouchedAt = new Map<string, number>();
const maxRooms=Math.max(1,Number(process.env.MAX_ROOMS??100));
const inactiveRoomTtlMs=Math.max(60_000,Number(process.env.ROOM_TTL_MS??7_200_000));
const endedRoomTtlMs=Math.max(60_000,Number(process.env.ENDED_ROOM_TTL_MS??1_800_000));
const roomTiming={
  mandatoryPresentationMs:Math.max(1_000,Number(process.env.MANDATORY_PRESENTATION_MS??7_000)),
  statusTimeoutMs:Math.max(1_000,Number(process.env.STATUS_TIMEOUT_MS??15_000)),
  voluntaryTimeoutMs:Math.max(1_000,Number(process.env.VOLUNTARY_TIMEOUT_MS??60_000))
};

function touch(room:AuthoritativeRoom){roomTouchedAt.set(room.code,Date.now())}
function makeRoomCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i=0;i<6;i++) code += alphabet[Math.floor(Math.random()*alphabet.length)];
  return code;
}
function normalizeCode(code: unknown) { return String(code ?? "").trim().toUpperCase(); }
function validId(v:unknown,max=128){return typeof v==="string"&&v.length>0&&v.length<=max}
function validName(v:unknown){return typeof v==="string"&&v.trim().length>0&&v.trim().length<=40}
function validAction(a:unknown):a is ClientAction{
  if(!a||typeof a!=="object")return false;
  const x=a as Record<string,unknown>;
  switch(x.type){
    case "marriage:propose": return validId(x.targetCharacterId);
    case "marriage:respond": return validId(x.proposalId)&&typeof x.accept==="boolean";
    case "marriage:cancel": return validId(x.proposalId);
    case "resource:buy": return (x.resourceType==="renewable"||x.resourceType==="nonrenewable")&&(x.grade==="low"||x.grade==="mid"||x.grade==="high")&&typeof x.units==="number"&&Number.isFinite(x.units)&&x.units>0&&x.units<=1_000_000;
    case "resource:recover": return (x.grade==="low"||x.grade==="mid"||x.grade==="high")&&typeof x.units==="number"&&Number.isFinite(x.units)&&x.units>0&&x.units<=1_000_000;
    case "family:support": return validId(x.targetCharacterId)&&typeof x.amount==="number"&&Number.isFinite(x.amount)&&x.amount>0&&x.amount<=1_000_000;
    case "child:birth": case "turn:complete": return true;
    case "child:respond": return validId(x.proposalId)&&typeof x.accept==="boolean";
    case "status:set": return x.status==="poor"||x.status==="middle"||x.status==="noble";
    default:return false;
  }
}
function emitRoom(room: AuthoritativeRoom) {
  touch(room);
  io.to(room.code).emit("room:state", room.publicSnapshot());
  for (const p of room.players.values()) {
    if (p.socketId) io.to(p.socketId).emit("player:state", room.privateSnapshot(p.playerId));
  }
}

io.on("connection", socket => {
  function bind(room:AuthoritativeRoom,playerId:string){
    socket.data.roomCode=room.code;
    socket.data.playerId=playerId;
    socket.join(room.code);
    touch(room);
  }
  function boundRoom(){
    const code=String(socket.data.roomCode??"");
    return rooms.get(code)??null;
  }
  function boundPlayerId(){return String(socket.data.playerId??"");}

  socket.on("room:create", (payload, reply) => {
    const {playerId,displayName}=payload??{};
    if (!validId(playerId) || !validName(displayName)) return reply?.({ok:false,error:"INVALID_PLAYER"});
    if(rooms.size>=maxRooms)return reply?.({ok:false,error:"SERVER_ROOM_LIMIT"});
    let code = makeRoomCode(); while (rooms.has(code)) code = makeRoomCode();
    const room = new AuthoritativeRoom(code, String(playerId), String(displayName), socket.id, roomTiming);
    rooms.set(code, room); touch(room); bind(room,String(playerId));
    const host = room.players.get(String(playerId))!;
    reply?.({ ok:true, code, reconnectToken:host.reconnectToken }); emitRoom(room);
  });

  socket.on("room:join", (payload, reply) => {
    const {code,playerId,displayName}=payload??{};
    if(!validId(playerId)||!validName(displayName))return reply?.({ok:false,error:"INVALID_PLAYER"});
    const room=rooms.get(normalizeCode(code)); if (!room) return reply?.({ok:false,error:"ROOM_NOT_FOUND"});
    const result=room.join(String(playerId),String(displayName),socket.id); if (!result.ok) return reply?.(result);
    bind(room,String(playerId)); reply?.({ok:true,code:room.code,reconnectToken:result.reconnectToken,queuePosition:result.queuePosition??null}); emitRoom(room);
  });

  socket.on("room:reconnect", (payload, reply) => {
    const {code,playerId,reconnectToken}=payload??{};
    if(!validId(playerId)||!validId(reconnectToken,256))return reply?.({ok:false,error:"INVALID_RECONNECT"});
    const room=rooms.get(normalizeCode(code)); if (!room) return reply?.({ok:false,error:"ROOM_NOT_FOUND"});
    const result=room.reconnect(String(playerId),String(reconnectToken),socket.id); if (!result.ok) return reply?.(result);
    bind(room,String(playerId)); reply?.({ok:true,code:room.code,queuePosition:result.queuePosition??null}); emitRoom(room);
  });

  socket.on("game:replay", (_payload, reply) => {
    const room=boundRoom();const playerId=boundPlayerId();
    if(!room||!playerId)return reply?.({ok:false,error:"NOT_BOUND"});
    const result=room.replay(playerId);reply?.(result);emitRoom(room);
  });

  socket.on("game:start", (_payload, reply) => {
    const room=boundRoom();const playerId=boundPlayerId();
    if(!room||!playerId)return reply?.({ok:false,error:"NOT_BOUND"});
    const result=room.start(playerId); reply?.(result); emitRoom(room);
  });

  socket.on("game:action", (payload, reply) => {
    const room=boundRoom();const playerId=boundPlayerId();
    if(!room||!playerId)return reply?.({ok:false,error:"NOT_BOUND"});
    const now=Date.now();const recent=(socket.data.actionTimes as number[]|undefined)?.filter(t=>now-t<1000)??[];
    if(recent.length>=30)return reply?.({ok:false,error:"RATE_LIMITED"});
    recent.push(now);socket.data.actionTimes=recent;
    const action=payload?.action;
    if(!validAction(action))return reply?.({ok:false,error:"INVALID_ACTION"});
    const result=room.act(playerId, action); reply?.(result); emitRoom(room);
  });

  socket.on("room:get-state", (_payload, reply) => {
    const room=boundRoom();const playerId=boundPlayerId();
    if(!room||!playerId)return reply?.({ok:false,error:"NOT_BOUND"});
    touch(room);
    reply?.({ok:true,room:room.publicSnapshot(),player:room.privateSnapshot(playerId)});
  });

  socket.on("disconnect", () => {
    for (const room of rooms.values()) if(room.disconnectSocket(socket.id)) emitRoom(room);
  });
});

const timeoutTimer=setInterval(()=>{
  for(const room of rooms.values()){
    if(room.enforceTurnTimeout())emitRoom(room);
  }
},500);

const cleanupTimer=setInterval(()=>{
  const now=Date.now();
  for(const [code,room] of rooms){
    const touched=roomTouchedAt.get(code)??now;
    const connected=[...room.players.values()].some(p=>p.connected);
    const ended=Boolean(room.publicSnapshot().game?.ended);
    const ttl=ended?endedRoomTtlMs:inactiveRoomTtlMs;
    if(!connected&&now-touched>ttl){rooms.delete(code);roomTouchedAt.delete(code)}
  }
},60_000);

app.get("/health", (_req,res) => res.json({ ok:true, rooms:rooms.size, uptimeSeconds:Math.floor(process.uptime()), version:"5.0.0" }));
app.get("/rooms/:code", (req,res) => {
  const room=rooms.get(normalizeCode(req.params.code));
  if (!room) return res.status(404).json({ok:false,error:"ROOM_NOT_FOUND"});
  res.json({ok:true,room:room.publicSnapshot()});
});

const staticDir=process.env.STATIC_DIR?resolve(process.env.STATIC_DIR):null;
if(staticDir&&existsSync(staticDir)){
  app.use(express.static(staticDir,{maxAge:"1h",etag:true}));
  app.get("*",(req,res,next)=>{
    if(req.path.startsWith("/socket.io")||req.path.startsWith("/health")||req.path.startsWith("/rooms/"))return next();
    res.sendFile(resolve(staticDir,"index.html"));
  });
}

const port = Number(process.env.PORT ?? 3001);
httpServer.listen(port, () => console.log(`Intergenerational Contract server listening on :${port}`));

function shutdown(signal:string){
  console.log(`${signal}: shutting down`);
  clearInterval(timeoutTimer);clearInterval(cleanupTimer);
  io.close(()=>httpServer.close(()=>process.exit(0)));
  setTimeout(()=>process.exit(1),5_000).unref();
}
process.on("SIGTERM",()=>shutdown("SIGTERM"));
process.on("SIGINT",()=>shutdown("SIGINT"));
