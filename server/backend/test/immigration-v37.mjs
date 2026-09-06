import {GameEngine} from '../dist/engine.js';
import {simulateGame} from '../dist/simulator.js';

function assert(ok,msg){if(!ok)throw new Error(msg)}
function approx(a,b,t=1e-9){return Math.abs(a-b)<=t}

// Baseline: 10 residents, each at normal starting wealth.
const g=new GameEngine();
for(let i=1;i<=10;i++)g.joinPlayer(`T${i}`);
let m=g.immigrationAttractiveness();
assert(m.populationBefore===10,'baseline population');
assert(approx(m.wealthRatio,1),'baseline wealth ratio');
assert(approx(m.populationFactor,1),'baseline population factor');
assert(approx(m.rate,.022),'baseline immigration rate');
assert(approx(m.quota,.22),'baseline quota');

// Wealth attraction: double resident cash raises the rate.
for(const h of Object.values(g.state.households))h.sharedCash*=2;
const rich=g.immigrationAttractiveness();
assert(rich.rate>m.rate,'wealth must increase attractiveness');
assert(rich.rate<=.03+1e-12,'rate cap');

// Minimum/maximum clamps.
for(const h of Object.values(g.state.households))h.sharedCash=0;
const poor=g.immigrationAttractiveness();
assert(approx(poor.rate,.008),'minimum rate clamp');
for(const h of Object.values(g.state.households))h.sharedCash=1e9;
const ultra=g.immigrationAttractiveness();
assert(approx(ultra.rate,.03),'maximum rate clamp');

// Accumulator: baseline quota 0.22 creates no person until accumulated >=1.
const a=new GameEngine(); for(let i=1;i<=10;i++)a.joinPlayer(`A${i}`);
let arrivals=[];
for(let i=0;i<8;i++)arrivals.push(a['immigrationCountThisRound']().arrivals);
assert(arrivals.slice(0,4).every(x=>x===0),'no early integer arrival');
assert(arrivals[4]===1,'fractional quota accumulated to one arrival');

// Simulation reproducibility after removing UUID-derived autopilot Persona.
const s1=simulateGame(371337),s2=simulateGame(371337);
const compact=x=>({ended:x.ended,reason:x.endingReason,rounds:x.rounds.map(r=>[r.round,r.population,r.debt,r.births,r.bankruptcies]),imm:x.diagnostics.immigration});
assert(JSON.stringify(compact(s1))===JSON.stringify(compact(s2)),'seeded simulation should be reproducible');

console.log(JSON.stringify({immigrationFormula:true,wealthSensitive:true,rateClamps:true,accumulator:true,seededSimulation:true,baseline:m,richRate:rich.rate},null,2));
