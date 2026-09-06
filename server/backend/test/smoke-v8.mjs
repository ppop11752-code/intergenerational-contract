import assert from "node:assert/strict";
import { AuthoritativeRoom } from "../dist/authoritative-room.js";

const room=new AuthoritativeRoom("ABC123","p0","P0","s0");
for(let i=1;i<10;i++) assert.equal(room.join(`p${i}`,`P${i}`,`s${i}`).ok,true);
assert.equal(room.start("p0",()=>0.42).ok,true);
assert.equal(room.engine.state.round,1);
const snapshot=room.publicSnapshot();
assert.equal(snapshot.players.length,10);
assert.ok(snapshot.game);
assert.ok(["marriage","voluntary","round_end"].includes(snapshot.game.phase));
const current=snapshot.game.currentTurnPlayerId;
const wrong=[...room.players.keys()].find(x=>x!==current);
assert.equal(room.act(wrong,{type:"turn:complete"}).ok,false);
console.log(JSON.stringify({round:snapshot.game.round,phase:snapshot.game.phase,currentTurnPlayerId:current,population:snapshot.game.population},null,2));
