import assert from "node:assert/strict";
import { GameEngine } from "../dist/engine.js";
import { AuthoritativeRoom } from "../dist/authoritative-room.js";

function actorRoom(phase="voluntary") {
  const room = new AuthoritativeRoom("LIMIT1", "A", "A", "socket-a");
  const game = new GameEngine();
  game.joinPlayer("A");
  const actor = game.alive().find(character => character.ownerId === "A");
  actor.ageStage = 4;
  const household = game.household(actor);
  household.representativeCharacterId = actor.id;
  game.state.round = 1;
  game.state.turnState.phase = phase;
  game.state.turnState.entries = [{ characterId: actor.id, householdId: household.id, statusRank: 1, card: 10, order: 1 }];
  game.state.turnState.activeIndex = 0;
  room.started = true;
  room.engine = game;
  return { room, game, actor, household };
}

{
  const { room, game, actor, household } = actorRoom();
  household.status = "poor";
  const unitPrice = game.marketPrice("low", "renewable");
  household.sharedCash = unitPrice * 3.5;
  game.state.spendingLimitByCharacter[actor.id] = unitPrice * 3.5;
  game.state.pool.low = 20;
  const before = JSON.stringify(game.state);
  const snapshot = room.privateSnapshot("A");
  const low = snapshot.marketQuotes.find(quote => quote.resourceType === "renewable" && quote.grade === "low");
  const high = snapshot.marketQuotes.find(quote => quote.resourceType === "renewable" && quote.grade === "high");
  assert.equal(low.purchasableMax, 3);
  assert.equal(low.unavailableReason, null);
  assert.equal(high.purchasableMax, null);
  assert.equal(high.unavailableReason, "MARKET_GRADE_LOCKED");
  assert.equal(JSON.stringify(game.state), before, "Market limit quotes must be side-effect-free");
  assert.throws(() => game.buyResource(actor, "low", low.purchasableMax + 1, "renewable"), /cap|cash/);
  assert.doesNotThrow(() => game.buyResource(actor, "low", low.purchasableMax, "renewable"));
}

{
  const { room, game, actor, household } = actorRoom();
  household.sharedCash = 10_000;
  game.state.spendingLimitByCharacter[actor.id] = 10_000;
  game.state.pool.low = game.cfg.resource.low.carryingCapacity - 5;
  game.state.pendingRecovery.low = 1;
  const low = room.privateSnapshot("A").recoveryQuotes.find(quote => quote.grade === "low");
  assert.equal(low.acceptedMax, 4);
  assert.equal(low.unavailableReason, null);
  game.investRecovery(actor, "low", low.acceptedMax);
  assert.equal(game.state.pendingRecovery.low, 5);
  assert.equal(room.privateSnapshot("A").recoveryQuotes.find(quote => quote.grade === "low").unavailableReason, "RECOVERY_AT_CAPACITY");
}

{
  const { room, game, actor, household } = actorRoom();
  household.sharedCash = 25;
  game.state.spendingLimitByCharacter[actor.id] = 20;
  const child = game.createNpc(household.id);
  child.ageStage = 3;
  actor.childrenIds.push(child.id);
  household.childrenIds.push(child.id);
  const support = room.privateSnapshot("A").eligibleSupportTargets.find(target => target.characterId === child.id);
  assert.equal(support.transferableMax, 20);
  assert.equal(support.unavailableReason, null);
  game.voluntaryFamilySupport(actor, child, support.transferableMax);
  assert.equal(household.sharedCash, 5);
}

{
  const { room } = actorRoom();
  const snapshot = room.privateSnapshot("A");
  assert.equal(snapshot.supportUnavailableReason, "SUPPORT_NO_ELIGIBLE_TARGETS");
  assert.equal(snapshot.birthQuote.canInitiate, false);
  assert.equal(snapshot.birthQuote.unavailableReason, "BIRTH_REQUIRES_COUPLE");
  assert.equal(snapshot.birthQuote.maxProposals, 2);
}

{
  const { room, game, actor, household } = actorRoom();
  const spouse = game.createNpc();
  spouse.ageStage = 4;
  game.marry(actor, spouse);
  household.representativeCharacterId = actor.id;
  game.state.eventBirthLimit = 3;
  let quote = room.privateSnapshot("A").birthQuote;
  assert.equal(quote.promotionalThirdSlot, true);
  assert.equal(quote.canInitiate, true);
  assert.deepEqual(quote.slots.map(slot => [slot.index, slot.status, slot.available]), [[1, "available", true], [2, "available", true], [3, "available", true]]);
  const proposal = game.attemptBirth(household);
  quote = room.privateSnapshot("A").birthQuote;
  assert.equal(quote.slots[0].proposalId, proposal.id);
  assert.equal(quote.slots[0].status, "pending");
  assert.equal(quote.outgoingProposals[0].id, proposal.id);
}

{
  const { room, game, actor, household } = actorRoom("status");
  household.sharedCash = 0;
  const quote = room.privateSnapshot("A").statusQuote;
  const noble = quote.cards.find(card => card.status === "noble");
  assert.equal(noble.affordable, false);
  assert.equal(noble.unavailableReason, "STATUS_INSUFFICIENT_CASH");
  assert.equal(quote.cards.find(card => card.status === "poor").unavailableReason, null);
}

console.log("PASS UI action limits contract: Market, Recovery, Support, Birth and Status");
