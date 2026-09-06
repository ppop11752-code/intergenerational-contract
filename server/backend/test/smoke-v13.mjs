import assert from "node:assert/strict";
import {AuthoritativeRoom} from "../dist/authoritative-room.js";

const room=new AuthoritativeRoom("ABC123","p0","P0","s0",1);
for(let i=1;i<10;i++) assert.equal(room.join(`p${i}`,`P${i}`,`s${i}`).ok,true);
for(let i=0;i<10;i++) assert.equal(room.setReady(`p${i}`,true).ok,true);
assert.equal(room.start("p0",()=>0.37).ok,true);

const before=room.publicSnapshot();
const active=before.players.find(p=>p.activeCharacterId);
assert.ok(active);
const oldCharacterId=active.activeCharacterId;
const socketId=room.players.get(active.playerId).socketId;
assert.ok(socketId);
assert.equal(room.disconnectSocket(socketId,()=>0.1),true);
const afterDisconnect=room.publicSnapshot();
const disconnected=afterDisconnect.players.find(p=>p.playerId===active.playerId);
assert.equal(disconnected.connected,false);
assert.equal(disconnected.activeCharacterId,null);
assert.equal(disconnected.aiTakeoverCharacterId,oldCharacterId);
const oldChar=room.engine.state.characters[oldCharacterId];
assert.equal(oldChar.npc,true);
assert.equal(oldChar.ownerId,null);
assert.ok(oldChar.persona);
assert.ok(!room.engine.state.waitingQueue.includes(active.playerId));

const token=room.players.get(active.playerId).reconnectToken;
const rr=room.reconnect(active.playerId,token,"new-socket");
assert.equal(rr.ok,true);
assert.equal(room.engine.state.waitingQueue.at(-1),active.playerId);
assert.equal(room.publicSnapshot().players.find(p=>p.playerId===active.playerId).activeCharacterId,null);

// A human turn carries a server deadline, and an expired deadline skips it.
room.turnDeadlineAt=Date.now()-1;
assert.equal(room.enforceTurnTimeout(()=>0.2),true);

const pub=room.publicSnapshot();
assert.ok(Array.isArray(pub.game.characters));
assert.ok(Array.isArray(pub.game.waitingQueue));
assert.ok(typeof pub.game.turnTimeoutMs==="number");
console.log(JSON.stringify({disconnectNpcTakeover:true,reconnectQueueEnd:true,timeoutAutoSkip:true,publicPlayerData:true},null,2));
