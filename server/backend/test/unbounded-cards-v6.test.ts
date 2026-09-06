import {describe,expect,it} from "vitest";
import {shuffledDynamicDeck} from "../src/turn-order.js";

describe("dynamic card ceiling",()=>{
  it("uses 1..100+existingCharacters",()=>{
    const deck=shuffledDynamicDeck(150,()=>0.314159);
    expect(deck).toHaveLength(250);
    expect(Math.min(...deck)).toBe(1);
    expect(Math.max(...deck)).toBe(250);
    expect(new Set(deck).size).toBe(250);
  });
});
