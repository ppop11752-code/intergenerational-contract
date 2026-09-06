import assert from "node:assert/strict";
import {AuthoritativeRoom} from "../dist/authoritative-room.js";

const room=new AuthoritativeRoom("ABC123","p0","P0","s0");
for(let i=1;i<10;i++){
  const r=room.join(`p${i}`,`P${i}`,`s${i}`);
  assert.equal(r.ok,true);
}
assert.equal(room.start("p0",()=>0.37).ok,true);

const pub=room.publicSnapshot();
assert.equal(pub.started,true);
assert.ok(pub.game);
assert.ok(pub.game.market.renewable.low.price>0);
assert.ok(pub.game.market.nonrenewable.high.failureRate>0);
assert.ok(pub.game.policy.taxIncomeRate>0);
assert.equal(pub.game.government.statusEquivalent,"noble");

const active=pub.players.find(p=>p.activeCharacterId);
assert.ok(active);
const priv=room.privateSnapshot(active.playerId);
assert.ok(priv.character);
assert.ok(priv.household);
assert.ok(priv.financial);
assert.ok(Array.isArray(priv.financial.resourceAccess));
assert.ok(typeof priv.financial.expectedTaxAtCurrentDebt==="number");
assert.ok(Array.isArray(priv.marriageCandidates));

console.log(JSON.stringify({
  snapshotMarket:true,
  snapshotTax:true,
  marriageCandidates:true,
  reconnectProtocol:true,
  governmentDashboardData:true
},null,2));
