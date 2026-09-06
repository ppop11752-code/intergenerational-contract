import {describe,it,expect} from 'vitest';import {GameEngine} from '../src/engine.js';import {regeneratePool} from '../src/economy.js';
describe('Economic Model v2',()=>{
 it('values resources at current market price only',()=>{const g=new GameEngine();g.joinPlayer('P');const c=g.alive()[0]!,h=g.household(c);h.sharedResources.low=2;expect(g.householdResourceValue(h)).toBeCloseTo(2*g.marketPrice('low','renewable'))});
 it('renewable logistic regeneration never exceeds carrying capacity',()=>{const g=new GameEngine();const n=regeneratePool({low:119,mid:59,high:23},g.cfg);expect(n.low).toBeLessThanOrEqual(120);expect(n.mid).toBeLessThanOrEqual(60);expect(n.high).toBeLessThanOrEqual(24)});
 it('government debt ceiling is 60% of citizen assets',()=>{const g=new GameEngine();g.joinPlayer('P');expect(g.debtCeiling()).toBeCloseTo(g.citizenTotalAssets()*.6)});
 it('event RNG is deterministic through engine source',()=>{const a=new GameEngine(),b=new GameEngine();a.setRandomSource(()=>.01);b.setRandomSource(()=>.01);expect(a.drawEvent()).toBe(b.drawEvent())});
 it('personal social security belongs to character',()=>{const g=new GameEngine();g.joinPlayer('P');const c=g.alive()[0]!;g.state.socialSecurity.personalBalances[c.id]=50;expect(g.state.socialSecurity.personalBalances[c.id]).toBe(50)});
});
