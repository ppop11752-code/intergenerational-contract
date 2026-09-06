import assert from "node:assert/strict";
import { GameEngine } from "../dist/engine.js";
import { AuthoritativeRoom } from "../dist/authoritative-room.js";

function owned(game, playerId) {
  return game.alive().find(character => character.ownerId === playerId);
}

function displayRoom(phase) {
  const room = new AuthoritativeRoom("DISPLAY1", "A", "A", "socket-a");
  const game = new GameEngine();
  game.joinPlayer("A");
  const actor = owned(game, "A");
  actor.ageStage = 4;
  const household = game.household(actor);
  household.representativeCharacterId = actor.id;
  game.state.round = 1;
  game.state.turnState.phase = phase;
  game.state.turnState.entries = [
    { characterId: actor.id, householdId: household.id, statusRank: 1, card: 10, order: 1 }
  ];
  game.state.turnState.activeIndex = 0;
  room.started = true;
  room.engine = game;
  return { room, game, actor, household };
}

{
  const lobby = new AuthoritativeRoom("LOBBY1", "A", "A", "socket-a");
  const snapshot = lobby.privateSnapshot("A");
  assert.equal(snapshot.mandatoryQuote, null);
  assert.deepEqual(snapshot.recoveryQuotes, []);
  assert.equal(snapshot.statusQuote, null);
}

{
  const { room, game } = displayRoom("mandatory");
  game.state.eventName = "Dịch bệnh";
  const before = JSON.stringify(game.state);
  assert.equal(room.publicSnapshot().game.eventName, "Dịch bệnh");
  room.privateSnapshot("A");
  assert.equal(JSON.stringify(game.state), before, "display snapshots must not mutate game state");
}

{
  const { room, game, actor, household } = displayRoom("mandatory");
  household.sharedCash = 0;
  household.sharedResources.low = 2;
  const quote = room.privateSnapshot("A").mandatoryQuote;
  assert.ok(quote);
  assert.equal(quote.liquidationRequired, true);
  assert.equal(quote.projectedBankruptcy, false);
  const liquidationBefore = game.state.telemetry.cashFlow.liquidationProceeds;
  assert.equal(game.resolveMandatory(actor), true);
  assert.ok(Math.abs((game.state.telemetry.cashFlow.liquidationProceeds - liquidationBefore) - quote.liquidationProceeds) < 1e-9);
  assert.ok(Math.abs(household.sharedCash - (quote.cashAfterLiquidation - quote.breakdown.total)) < 1e-9);
}

{
  const { room, game, actor, household } = displayRoom("mandatory");
  household.sharedCash = 0;
  const quote = room.privateSnapshot("A").mandatoryQuote;
  assert.equal(quote.projectedBankruptcy, true);
  assert.ok(quote.shortfall > 0);
  assert.equal(game.resolveMandatory(actor), false);
  const record = game.state.telemetry.bankruptcyRecords.at(-1);
  assert.ok(record);
  assert.deepEqual(record.breakdown, quote.breakdown);
  assert.ok(Math.abs(record.shortfall - quote.shortfall) < 1e-9);
}

{
  const { room, game, household } = displayRoom("voluntary");
  household.sharedCash = 1000;
  game.state.spendingLimitByCharacter[room.engine.currentTurnCharacter().id] = 1000;
  game.state.pool.low = 50;
  game.state.pendingRecovery.low = 3;
  const before = JSON.stringify(game.state);
  const quotes = room.privateSnapshot("A").recoveryQuotes;
  assert.equal(quotes.length, 3);
  const low = quotes.find(quote => quote.grade === "low");
  assert.equal(low.pendingNextRound, 3);
  assert.equal(low.capacityRemaining, low.carryingCapacity - low.currentPool - low.pendingNextRound);
  assert.equal(JSON.stringify(game.state), before, "recovery quote must be side-effect-free");
  const cashBefore = household.sharedCash;
  assert.deepEqual(room.act("A", { type: "resource:recover", grade: "low", units: 2 }), { ok: true });
  assert.ok(Math.abs((cashBefore - household.sharedCash) - low.costPerUnit * 2) < 1e-9);
  assert.equal(game.state.pendingRecovery.low, low.pendingNextRound + 2);
}

{
  const { room, game, actor, household } = displayRoom("status");
  game.state.roundAverageAssetsSnapshot = 320;
  game.state.priceIndex = 1;
  household.sharedCash = 100;
  const before = JSON.stringify(game.state);
  const quote = room.privateSnapshot("A").statusQuote;
  assert.ok(quote);
  assert.deepEqual(quote.cards.map(card => card.status), ["poor", "middle", "noble"]);
  assert.equal(quote.nobleCompetition.slotsTotal, 1);
  assert.equal(quote.nobleCompetition.slotsRequired, 1);
  assert.deepEqual(quote.nobleCompetition.priority, ["incumbent", "householdAssets", "turnCard"]);
  assert.equal(quote.nobleCompetition.fallbackStatus, "middle");
  assert.equal(JSON.stringify(game.state), before, "status quote must be side-effect-free");
  const middle = quote.cards.find(card => card.status === "middle");
  assert.equal(game.setStatus(actor, "middle"), "middle");
  assert.ok(Math.abs(game.state.statusPurchases[household.id].paid - middle.fee) < 1e-9);
}

{
  const { room, game } = displayRoom("voluntary");
  game.state.turnState.activeIndex = 1;
  const snapshot = room.privateSnapshot("A");
  assert.equal(snapshot.mandatoryQuote, null);
  assert.deepEqual(snapshot.recoveryQuotes, []);
  assert.equal(snapshot.statusQuote, null);
}

console.log("PASS UI/UX display contract: event, mandatory, recovery and status quotes");
