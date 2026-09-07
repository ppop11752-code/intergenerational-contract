import assert from "node:assert/strict";
import { GameEngine } from "../dist/engine.js";
import { AuthoritativeRoom } from "../dist/authoritative-room.js";

function roomWith(game, playerId="A") {
  const room = new AuthoritativeRoom("LIFE01", playerId, playerId, `socket-${playerId}`);
  room.started = true;
  room.engine = game;
  return room;
}

{
  const game = new GameEngine();
  game.joinPlayer("A");
  const actor = game.alive().find(character => character.ownerId === "A");
  const household = game.household(actor);
  game.state.round = 2;
  household.sharedCash = 75;
  game.die(actor, "test mortality");
  const room = roomWith(game);
  const results = room.publicSnapshot().game.lifecycleResults;
  const death = results.find(result => result.type === "death");
  const inheritance = results.find(result => result.type === "inheritance");
  const queue = results.find(result => result.type === "queue_entry");
  assert.deepEqual(death.characterIds, [actor.id]);
  assert.equal(death.cause, "test mortality");
  assert.equal(inheritance.estateTotal, 75);
  assert.equal(inheritance.governmentTransfer, 75);
  assert.deepEqual(inheritance.beneficiaries, []);
  assert.equal(queue.playerId, "A");
  assert.equal(queue.queuePosition, 1);
  assert.equal(queue.assignmentReason, "death");
  assert.ok(room.privateSnapshot("A").recentLifecycleResults.some(result => result.id === queue.id));
}

{
  const game = new GameEngine();
  const deceased = game.createNpc();
  const spouse = game.createNpc();
  deceased.ageStage = spouse.ageStage = 4;
  game.marry(deceased, spouse);
  const household = game.household(deceased);
  const child = game.createNpc(household.id);
  child.ageStage = 3;
  deceased.childrenIds.push(child.id);
  household.childrenIds.push(child.id);
  household.sharedCash = 120;
  game.state.round = 3;
  game.die(deceased, "test spouse estate");
  const inheritance = game.state.lifecycleResults.find(result => result.type === "inheritance");
  assert.equal(inheritance.estateTotal, 60);
  assert.equal(inheritance.governmentTransfer, 0);
  assert.deepEqual(inheritance.beneficiaries.map(x => [x.relation, x.characterId, x.amount]), [["spouse", spouse.id, 30], ["child", child.id, 30]]);
}

{
  const game = new GameEngine();
  const a = game.createNpc(), b = game.createNpc();
  a.ageStage = b.ageStage = 12;
  game.marry(a, b);
  game.state.round = 4;
  game.setRandomSource(() => 0);
  game.household(a).sharedCash = 1_000;
  game.resolveElderlyMedicalAndMortality();
  const medical = game.state.lifecycleResults.find(result => result.type === "elderly_medical");
  const jointDeath = game.state.lifecycleResults.find(result => result.type === "death" && result.joint);
  const jointEstate = game.state.lifecycleResults.find(result => result.type === "inheritance" && result.joint);
  assert.equal(medical.characterIds.length, 2);
  assert.ok(medical.medicalDue > 0);
  assert.equal(medical.medicalPaid, medical.medicalDue);
  assert.deepEqual(new Set(jointDeath.characterIds), new Set([a.id, b.id]));
  assert.deepEqual(new Set(jointEstate.characterIds), new Set([a.id, b.id]));
}

{
  const game = new GameEngine();
  game.registerQueuedPlayer("Q");
  const a = game.createNpc(), b = game.createNpc();
  a.ageStage = b.ageStage = 4;
  game.marry(a, b);
  const household = game.household(a);
  household.representativeCharacterId = a.id;
  game.state.round = 1;
  game.state.turnState.phase = "voluntary";
  game.state.turnState.entries = [{ characterId: a.id, householdId: household.id, statusRank: 1, card: 10, order: 1 }];
  game.state.turnState.activeIndex = 0;
  assert.ok(game.attemptBirth(household));
  game.state.turnState.phase = "round_end";
  game.endRound();
  const assignment = game.state.lifecycleResults.find(result => result.type === "new_life_assignment");
  assert.equal(assignment.playerId, "Q");
  assert.equal(assignment.assignmentReason, "birth");
  assert.equal(game.state.characters[assignment.characterIds[0]].ownerId, "Q");
}

console.log("PASS UI lifecycle result contract: medical, death, inheritance, queue and new life");
