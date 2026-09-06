import assert from "node:assert/strict";
import { GameEngine } from "../dist/engine.js";
import { shuffledDynamicDeck } from "../dist/turn-order.js";

const deck = shuffledDynamicDeck(150, () => 0.271828);
assert.equal(deck.length, 250);
assert.equal(Math.min(...deck), 1);
assert.equal(Math.max(...deck), 250);
assert.equal(new Set(deck).size, 250);

const g = new GameEngine();
for (let i=0;i<150;i++) g.createNpc();
g.startRound();
const order = g.buildTurnOrder(() => Math.random());
assert.equal(order.length, 150);
assert.equal(new Set(order.map(x=>x.card)).size, 150);
assert.ok(Math.max(...order.map(x=>x.card)) <= 250);

console.log(JSON.stringify({
  dynamicDeckUpperBound: 250,
  livingCharacters: 150,
  uniqueDraws: true,
  maxDraw: Math.max(...order.map(x=>x.card))
}, null, 2));
