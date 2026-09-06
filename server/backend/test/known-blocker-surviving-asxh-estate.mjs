import assert from 'node:assert/strict';
import {GameEngine} from '../dist/engine.js';

const g=new GameEngine();g.joinPlayer('A');g.joinPlayer('B');
const a=g.alive().find(c=>c.ownerId==='A'),b=g.alive().find(c=>c.ownerId==='B');
a.ageStage=b.ageStage=4;g.marry(a,b);const h=g.household(a);
const child=g.createNpc(h.id);h.childrenIds=[child.id];a.childrenIds=[child.id];b.childrenIds=[child.id];
h.sharedCash=0;g.state.socialSecurity.personalBalances[a.id]=200;g.state.socialSecurity.personalBalances[b.id]=0;
g.die(b,'policy-a-regression');
assert.equal(h.sharedCash,0);
assert.equal(g.state.socialSecurity.personalBalances[a.id],200);
assert.equal(g.household(child).sharedCash,0);
assert.equal(g.householdAssets(h),200);
console.log('PASS: survivor funded ASXH remains locked and is excluded from divisible estate.');
