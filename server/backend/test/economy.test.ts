import {describe,expect,it} from "vitest";
import {DEFAULT_CONFIG} from "../src/config.js";
import {livingCost,marketPrice} from "../src/economy.js";

describe("economy legacy coverage",()=>{
  it("computes living cost from current base and asset surcharge formula",()=>{
    const cfg=DEFAULT_CONFIG,assets=100,priceIndex=2;
    const expected=cfg.living.base*priceIndex+Math.min(assets*cfg.living.assetRate,cfg.living.assetSurchargeCap*priceIndex);
    expect(livingCost(assets,priceIndex,cfg)).toBeCloseTo(expected);
  });
  it("uses current market-price signature and initial renewable pool baseline",()=>{
    const cfg=DEFAULT_CONFIG;
    const pool={low:cfg.resource.low.initialPool,mid:cfg.resource.mid.initialPool,high:cfg.resource.high.initialPool};
    const bounds={min:cfg.market.min,max:cfg.market.max};
    expect(marketPrice("low","renewable",cfg.room.initialActivePlayers,pool,bounds,1,cfg)).toBeCloseTo(cfg.resource.low.basePrice);
  });
});
