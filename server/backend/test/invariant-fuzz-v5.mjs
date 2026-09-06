import assert from 'node:assert/strict';
import {simulateMany} from '../dist/simulator.js';

const result=simulateMany(20,20260906);
for(const report of result.reports){
  for(const r of report.rounds){
    for(const [k,v] of Object.entries({population:r.population,debt:r.debt,totalAssets:r.totalAssets,governmentBudget:r.governmentBudget,priceIndex:r.priceIndex,debtCeiling:r.debtCeiling,supportFund:r.supportFund,pensionReserve:r.pensionReserve,pensionPayoutRatio:r.pensionPayoutRatio,economicIncomeFactor:r.economicIncomeFactor,elderlyMedicalPaid:r.elderlyMedicalPaid})){
      assert.ok(Number.isFinite(v),`non-finite ${k} in round ${r.round}`);
    }
    assert.ok(r.population>=0&&Number.isInteger(r.population),'population invariant');
    assert.ok(r.debt>=-1e-8,'negative public debt');
    assert.ok(r.totalAssets>=-1e-8,'negative resident assets');
    assert.ok(r.governmentBudget>=-1e-8,'negative government budget');
    assert.ok(r.priceIndex>0,'non-positive price index');
    assert.ok(r.supportFund>=-1e-8,'negative Support Fund');
    assert.ok(r.pensionReserve>=-1e-8,'negative pension reserve');
    assert.ok(r.pensionPayoutRatio>=-1e-8&&r.pensionPayoutRatio<=1+1e-8,'pension payout ratio out of range');
    assert.ok(r.economicIncomeFactor>=.60-1e-8&&r.economicIncomeFactor<=1.25+1e-8,'EIF out of range');
    for(const pool of [r.pool,r.nonRenewablePool])for(const x of Object.values(pool))assert.ok(Number.isFinite(x)&&x>=-1e-8,'resource pool invariant');
  }
  for(const x of report.finalRanking){assert.ok(Number.isFinite(x.average)&&x.average>=-1e-8,'ranking invariant');assert.ok(Number.isFinite(x.cumulativeAssets)&&x.cumulativeAssets>=-1e-8,'score invariant');assert.ok(Number.isInteger(x.activeRounds)&&x.activeRounds>=0,'active rounds invariant')}
  for(const f of report.diagnostics.familyFlows)assert.ok(Number.isFinite(f.amount)&&f.amount>=-1e-8,'family flow invariant');
  for(const b of report.diagnostics.bankruptcyRecords){for(const v of [b.cashBefore,b.assetsBefore,b.netIncome,b.liquidationProceeds,b.need,b.shortfall])assert.ok(Number.isFinite(v),'bankruptcy record finite invariant')}
}
console.log(JSON.stringify({ok:true,games:result.count,extinctions:result.extinctions,extinctionRate:result.extinctionRate,avgFinalPopulation:result.avgFinalPopulation,avgFinalDebt:result.avgFinalDebt,avgRounds:result.avgRounds},null,2));
