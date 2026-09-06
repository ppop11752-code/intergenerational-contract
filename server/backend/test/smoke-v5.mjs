import assert from "node:assert/strict";
import { GameEngine } from "../dist/engine.js";
import { simulateGame } from "../dist/simulator.js";
const g=new GameEngine(); for(let i=1;i<=10;i++)g.joinPlayer(`p${i}`); g.startRound(); g.buildTurnOrder(()=>0.5); g.beginMandatoryPhase(); assert.equal(g.phase(),"mandatory");
const r=simulateGame(7,10); assert.ok(r.rounds.length>=1); console.log("smoke-v5 ok", r.rounds.length, r.endingReason);
