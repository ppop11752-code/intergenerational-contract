import {DEFAULT_CONFIG,GameConfig,ResourceGrade,ResourceType,Status} from "./config.js";
import {Resources} from "./model.js";
export function livingCost(assets:number,priceIndex:number,cfg:GameConfig=DEFAULT_CONFIG,members=1){
  const n=Math.max(1,Math.floor(members));
  // Basic subsistence is per living household member; the wealth-linked
  // surcharge is assessed once on merged household assets.
  return cfg.living.base*priceIndex*n+Math.min(assets*cfg.living.assetRate,cfg.living.assetSurchargeCap*priceIndex);
}
export function statusFee(status:Status,averageCitizenAssets:number,priceIndex:number,cfg:GameConfig=DEFAULT_CONFIG){return status==="poor"?0:cfg.status.fee[status]*priceIndex+averageCitizenAssets*cfg.status.averageAssetRate[status]}
export function resourceCfg(type:ResourceType,grade:ResourceGrade,cfg:GameConfig=DEFAULT_CONFIG){return type==="renewable"?cfg.resource[grade]:cfg.nonRenewableResource[grade]}
export function marketPrice(grade:ResourceGrade,type:ResourceType,population:number,pool:Resources,bounds:{min:number;max:number},priceIndex=1,cfg:GameConfig=DEFAULT_CONFIG){
  const r=resourceCfg(type,grade,cfg);const raw=(population/cfg.room.initialActivePlayers)/(Math.max(.0001,pool[grade])/r.initialPool);const mult=Math.min(bounds.max,Math.max(bounds.min,raw));return r.basePrice*priceIndex*mult;
}
export function resourceLiquidationValue(_grade:ResourceGrade,_type:ResourceType,units:number,currentMarketPrice:number,_cfg:GameConfig=DEFAULT_CONFIG){return units*currentMarketPrice}

function clamp01(value:number){return Math.max(0,Math.min(1,value))}

/** Rule Ledger OI-002 scarcity index used by inflation at end-of-round. */
export function scarcityInflationIndex(renewablePool:Resources,nonRenewablePool:Resources,cfg:GameConfig=DEFAULT_CONFIG){
  const rLow=clamp01(1-renewablePool.low/cfg.resource.low.carryingCapacity);
  const rMid=clamp01(1-renewablePool.mid/cfg.resource.mid.carryingCapacity);
  const rHigh=clamp01(1-renewablePool.high/cfg.resource.high.carryingCapacity);
  const nLow=clamp01(1-nonRenewablePool.low/cfg.nonRenewableResource.low.initialPool);
  const nMid=clamp01(1-nonRenewablePool.mid/cfg.nonRenewableResource.mid.initialPool);
  const nHigh=clamp01(1-nonRenewablePool.high/cfg.nonRenewableResource.high.initialPool);
  const renewable=(1680*rLow+2520*rMid+2520*rHigh)/6720;
  const nonRenewable=(4900*nLow+7920*nMid+7700*nHigh)/20520;
  return .5*renewable+.5*nonRenewable;
}

export function regeneratePool(pool:Resources,cfg:GameConfig=DEFAULT_CONFIG){
  const next={...pool};for(const g of ["low","mid","high"] as const){const K=cfg.resource[g].carryingCapacity;const N=Math.max(0,Math.min(K,pool[g]));next[g]=Math.min(K,N+cfg.resource[g].regenRate*N*(1-N/K));}return next;
}
