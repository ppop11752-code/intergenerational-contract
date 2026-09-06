
import {simulateMany} from "./simulator.js"; import {DEFAULT_CONFIG} from "./config.js";
const bases=[3.0,3.5,4.0,4.5,5.0];
for(const b of bases){
 const cfg=structuredClone(DEFAULT_CONFIG); cfg.living.base=b;
 const r=simulateMany(6,15001,cfg); const all=r.reports.flatMap(x=>x.rounds);
 const br=r.reports.flatMap(x=>x.diagnostics.bankruptcyRecords);
 console.log(JSON.stringify({base:b,ext:r.extinctionRate,rounds:r.avgRounds,pop:r.avgFinalPopulation,debt:r.avgFinalDebt,bankruptcies:br.length/6,fiscal:all.filter(x=>x.fiscalCrisis).length/Math.max(1,all.length),pension:all.filter(x=>x.pensionCrisis).length/Math.max(1,all.length)}));
}
