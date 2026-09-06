import assert from 'node:assert/strict';
import {GameEngine} from '../dist/engine.js';

let passed=0;
function test(name,fn){try{fn();passed++;console.log(`PASS OI-001: ${name}`)}catch(err){console.error(`FAIL OI-001: ${name}`);throw err}}
function setup(ids=['A','B','C','D']){
  const g=new GameEngine();g.setRandomSource(()=>0.5);
  for(const id of ids)g.joinPlayer(id);
  const chars={};for(const id of ids){const c=Object.values(g.state.characters).find(x=>x.ownerId===id);assert.ok(c,`missing ${id}`);c.ageStage=4;chars[id]=c}
  return {g,...chars};
}
function advancePendingRound(g){g.state.turnState.phase='round_end';g.endRound();if(!g.state.ended)g.startRound()}

// 1. Pending survives multiple rounds without timeout.
test('pending survives multiple rounds',()=>{
  const {g,A,B}=setup(['A','B']);g.startRound();const p=g.proposeMarriage(A,B);assert.equal(p.createdRound,1);assert.equal(p.acceptedRound,null);
  advancePendingRound(g);assert.equal(g.state.round,2);assert.equal(p.status,'pending');
  g.state.turnState.phase='round_end';g.endRound();assert.equal(p.status,'pending');
});

// 2. A Character may have at most one outgoing pending proposal.
test('one outgoing pending limit',()=>{
  const {g,A,B,C}=setup(['A','B','C']);const p=g.proposeMarriage(A,B);assert.equal(p.status,'pending');assert.throws(()=>g.proposeMarriage(A,C),/outgoing pending/);
});

// 3. A Character may receive multiple incoming pending proposals.
test('multiple incoming pending proposals are allowed',()=>{
  const {g,A,B,C}=setup(['A','B','C']);const p1=g.proposeMarriage(A,B),p2=g.proposeMarriage(C,B);
  const incoming=Object.values(g.state.marriageProposals).filter(p=>p.status==='pending'&&p.targetCharacterId===B.id);assert.equal(incoming.length,2);assert.deepEqual(new Set(incoming.map(p=>p.id)),new Set([p1.id,p2.id]));
});

// 4. Accepted is binding: it cannot be rejected or cancelled.
test('accepted proposal cannot be rejected or cancelled',()=>{
  const {g,A,B}=setup(['A','B']);const p=g.proposeMarriage(A,B);g.respondMarriage(p.id,true);assert.equal(p.status,'accepted');
  assert.throws(()=>g.respondMarriage(p.id,false),/invalid marriage proposal/);assert.throws(()=>g.cancelMarriageProposal(A,p.id),/invalid marriage proposal/);assert.equal(p.status,'accepted');
});

// 5. Settlement uses acceptedRound, never createdRound.
test('settlement occurs at end acceptedRound, not createdRound',()=>{
  const {g,A,B}=setup(['A','B']);g.startRound();const p=g.proposeMarriage(A,B);assert.equal(p.createdRound,1);
  advancePendingRound(g);assert.equal(g.state.round,2);assert.equal(p.status,'pending');assert.equal(g.isMarried(A),false);
  g.respondMarriage(p.id,true);assert.equal(p.acceptedRound,2);assert.equal(g.isMarried(A),false);
  g.state.turnState.phase='round_end';g.endRound();assert.equal(p.status,'executed');assert.equal(g.isMarried(A),true);
});

// 6. Loss of eligibility invalidates immediately, including an already accepted binding proposal.
test('loss of eligibility invalidates immediately',()=>{
  const {g,A,B}=setup(['A','B']);const p=g.proposeMarriage(A,B);g.respondMarriage(p.id,true);assert.equal(p.status,'accepted');g.die(B,'OI-001 eligibility regression');assert.equal(p.status,'invalidated');
});

// 7. Disconnect / NPC takeover does not invalidate the proposal.
test('disconnect and NPC takeover preserve proposal',()=>{
  const {g,A,B}=setup(['A','B']);const p=g.proposeMarriage(A,B);const detached=g.detachPlayerToNpc('A');assert.equal(detached?.id,A.id);assert.equal(A.npc,true);assert.equal(A.ownerId,null);assert.equal(p.status,'pending');
  g.respondMarriage(p.id,true);assert.equal(p.status,'accepted');
});

// 8. Successful settlement moves proposal out of active set but keeps historical record.
test('executed leaves active set but proposal history remains',()=>{
  const {g,A,B}=setup(['A','B']);g.startRound();const p=g.proposeMarriage(A,B);g.respondMarriage(p.id,true);g.state.turnState.phase='round_end';g.endRound();
  assert.equal(p.status,'executed');assert.equal(g.state.marriageProposals[p.id],p);const active=Object.values(g.state.marriageProposals).filter(x=>x.status==='pending'||x.status==='accepted');assert.equal(active.some(x=>x.id===p.id),false);
});

// 9. Competing accepts: first valid accept in authoritative call/server order wins.
test('first valid competing accept in authoritative order wins',()=>{
  const {g,A,B,C}=setup(['A','B','C']);const firstCreated=g.proposeMarriage(A,B),secondCreated=g.proposeMarriage(C,B);
  // Server processes second-created proposal first: order of authoritative method calls, not creation time, is decisive.
  g.respondMarriage(secondCreated.id,true);assert.equal(secondCreated.status,'accepted');assert.equal(firstCreated.status,'invalidated');assert.throws(()=>g.respondMarriage(firstCreated.id,true),/invalid marriage proposal/);
});

console.log(`OI-001 marriage proposal regression: ${passed}/9 PASS`);
