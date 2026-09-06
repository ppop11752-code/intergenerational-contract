declare const process: { argv: string[] };
import {simulateMany} from "./simulator.js";
const n=Number(process.argv[2]??100);
const r=simulateMany(n,42);
console.log(JSON.stringify({count:r.count,extinctions:r.extinctions,extinctionRate:r.extinctionRate,avgFinalPopulation:r.avgFinalPopulation,avgFinalDebt:r.avgFinalDebt,avgRounds:r.avgRounds},null,2));
