import { describe, expect, it } from "vitest";
import { GameEngine } from "../src/engine.js";
import { shuffledDynamicDeck } from "../src/turn-order.js";
import { mandatoryChildSupportDue, parentSupportDuePerChild } from "../src/family-finance.js";

describe("legacy dynamic draw coverage", () => {
  it("uses upper bound 100 + current existing characters", () => {
    const deck = shuffledDynamicDeck(150, () => 0.12345);
    expect(deck).toHaveLength(250);
    expect(Math.max(...deck)).toBe(250);
    expect(Math.min(...deck)).toBe(1);
    expect(new Set(deck).size).toBe(250);
  });

  it("supports more than 100 living characters without duplicate draws", () => {
    const g = new GameEngine();
    for (let i=0;i<150;i++) g.createNpc();
    g.state.turnState.phase="round_started";
    const entries = g.buildTurnOrder(() => Math.random());
    expect(entries).toHaveLength(150);
    expect(new Set(entries.map(e=>e.card)).size).toBe(150);
    expect(Math.max(...entries.map(e=>e.card))).toBeLessThanOrEqual(250);
  });
});

describe("legacy family-finance compatibility helpers", () => {
  it("does not treat Child Allowance as suspending mandatory child support", () => {
    expect(mandatoryChildSupportDue(100,1,8)).toBeGreaterThan(0);
    expect(mandatoryChildSupportDue(100,1,9)).toBeCloseTo(mandatoryChildSupportDue(100,1,8));
    expect(mandatoryChildSupportDue(100,3,8)).toBe(0);
  });

  it("legacy per-child parent-support helper scales with income", () => {
    expect(parentSupportDuePerChild(100)).toBeGreaterThan(0);
    expect(parentSupportDuePerChild(200)).toBeCloseTo(parentSupportDuePerChild(100)*2);
  });
});
