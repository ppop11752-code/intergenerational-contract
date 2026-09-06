import assert from "node:assert/strict";
import {AuthoritativeRoom} from "../dist/authoritative-room.js";

const room=new AuthoritativeRoom("T60","p0","P0","s0");
assert.equal(room.turnTimeoutMs,60000);

for(let i=1;i<10;i++)assert.equal(room.join(`p${i}`,`P${i}`,`s${i}`).ok,true);
for(let i=0;i<10;i++)assert.equal(room.setReady(`p${i}`,true).ok,true);
assert.equal(room.start("p0",()=>0.41).ok,true);

const pub=room.publicSnapshot();
assert.equal(pub.game?.turnTimeoutMs,60000);
assert.ok(pub.game?.characters.length);
for(const c of pub.game?.characters??[]){
  assert.ok(Array.isArray(c.spouseCharacterIds));
  assert.ok(Array.isArray(c.childCharacterIds));
}

const active=pub.players.find(p=>p.activeCharacterId);
assert.ok(active);
room.disconnectSocket(room.players.get(active.playerId).socketId??"missing",()=>0.2);
const after=room.publicSnapshot();
const takeover=after.game?.characters.find(c=>c.aiTakeoverOf===active.playerId);
assert.ok(takeover);
assert.equal(takeover?.npc,true);

const recon=room.reconnect(active.playerId,room.players.get(active.playerId).reconnectToken,"new-socket");
assert.equal(recon.ok,true);
assert.equal(recon.queuePosition,after.game.waitingQueueLength+1);

console.log(JSON.stringify({
  exactTurnTimeoutSeconds:60,
  publicRelationships:true,
  disconnectNpcTakeover:true,
  reconnectQueueEnd:true
},null,2));
