import assert from "node:assert/strict";
import {AuthoritativeRoom} from "../dist/authoritative-room.js";

const room=new AuthoritativeRoom("ROOM30","p0","P0","s0");
for(let i=1;i<30;i++) assert.equal(room.join(`p${i}`,`P${i}`,`s${i}`).ok,true);
assert.equal(room.start("p0",()=>0.314159).ok,true);
assert.equal(room.engine.state.realPlayerIds.length,10);
assert.equal(room.engine.state.waitingQueue.length,20);
assert.equal(new Set(room.engine.state.waitingQueue).size,20);

const p5=room.players.get("p5");
assert.ok(p5);
const token=p5.reconnectToken;
room.disconnectSocket("s5");
assert.equal(room.players.get("p5").connected,false);
assert.equal(room.reconnect("p5",token,"s5-new").ok,true);
assert.equal(room.players.get("p5").connected,true);

// Drive a few human turns by completing them; server advances NPC/phase automatically.
let actions=0;
while(!room.engine.state.ended && actions<25){
  const snap=room.publicSnapshot();
  const current=snap.game?.currentTurnPlayerId;
  if(!current) break;
  const result=room.act(current,{type:"turn:complete"},()=>0.2718);
  assert.equal(result.ok,true);
  actions++;
}
console.log(JSON.stringify({players:room.players.size,active:room.engine.state.realPlayerIds.length,queue:room.engine.state.waitingQueue.length,round:room.engine.state.round,phase:room.engine.phase(),actions},null,2));
