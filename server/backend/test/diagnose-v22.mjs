
import {simulateMany} from "./simulator.js";
const r=simulateMany(16,12001);
const all=r.reports.flatMap(x=>x.rounds);
const br=r.reports.flatMap(x=>x.diagnostics.bankruptcyRecords);
const sum=(a)=>a.reduce((x,y)=>x+y,0), avg=a=>a.length?sum(a)/a.length:0;
const group=(arr,key)=>arr.reduce((o,x)=>{const k=key(x);o[k]=(o[k]??0)+1;return o},{});
const causes=r.reports.reduce((o,x)=>{for(const [k,v] of Object.entries(x.diagnostics.socialCrisisCauses))o[k]=(o[k]??0)+v;return o},{});
const final=r.reports.map(x=>x.rounds.at(-1)).filter(Boolean);
console.log(JSON.stringify({
 games:r.count,extinctionRate:r.extinctionRate,avgRounds:r.avgRounds,avgFinalPopulation:r.avgFinalPopulation,avgFinalDebt:r.avgFinalDebt,
 avgInflation:avg(all.map(x=>x.inflationRate)),fiscalCrisisRoundShare:all.filter(x=>x.fiscalCrisis).length/Math.max(1,all.length),
 pensionCrisisRoundShare:all.filter(x=>x.pensionCrisis).length/Math.max(1,all.length),
 avgPensionPayoutDuringCrisis:avg(all.filter(x=>x.pensionCrisis).map(x=>x.pensionPayoutRatio)),
 bankruptcyCount:br.length,bankruptcyDominantCost:group(br,x=>x.dominantCost),bankruptcyStatus:group(br,x=>x.status),
 bankruptcyStage:r.reports.reduce((o,x)=>{for(const [k,v] of Object.entries(x.diagnostics.bankruptcyByStage))o[k]=(o[k]??0)+v;return o},{}),
 socialCrisisCauses:causes,
 avgBirths:avg(final.map(x=>x.births)),avgBankruptcies:avg(final.map(x=>x.bankruptcies)),
 maxElderWorkerRatio:Math.max(...all.map(x=>x.elderWorkerRatio)),
 avgFinalReserve:avg(final.map(x=>x.pensionReserve))
},null,2));
