import assert from "node:assert/strict";
import { GameEngine } from "../dist/engine.js";
import { AuthoritativeRoom } from "../dist/authoritative-room.js";

function owned(game, playerId) {
  return game.alive().find(character => character.ownerId === playerId);
}

function eligibleRoom() {
  const room = new AuthoritativeRoom("BIRTH1", "A", "A", "socket-a");
  assert.equal(room.join("B", "B", "socket-b").ok, true);
  const game = new GameEngine();
  game.joinPlayer("A");
  game.joinPlayer("B");
  const a = owned(game, "A");
  const b = owned(game, "B");
  a.ageStage = 4;
  b.ageStage = 4;
  game.marry(a, b);
  const household = game.household(a);
  household.representativeCharacterId = a.id;
  game.state.round = 1;
  game.state.eventBirthLimit = 2;
  game.state.turnState.phase = "voluntary";
  game.state.turnState.entries = [
    { characterId: a.id, householdId: household.id, statusRank: 1, card: 10, order: 1 },
    { characterId: b.id, householdId: household.id, statusRank: 1, card: 9, order: 2 }
  ];
  game.state.turnState.activeIndex = 0;
  room.started = true;
  room.engine = game;
  return { room, game, a, b, household };
}

{
  const lobby = new AuthoritativeRoom("LOBBY1", "A", "A", "socket-a");
  assert.equal(lobby.privateSnapshot("A").canInitiateBirth, false);
}

{
  const { room, game, household } = eligibleRoom();
  const before = JSON.stringify(game.state);
  assert.equal(game.canInitiateBirth(household), true);
  assert.equal(room.privateSnapshot("A").canInitiateBirth, true);
  assert.equal(game.canInitiateBirth(household), true);
  assert.equal(JSON.stringify(game.state), before, "eligibility queries must not mutate game state");
}

{
  const { room, game, household } = eligibleRoom();
  game.state.turnState.phase = "status";
  assert.equal(game.canInitiateBirth(household), false);
  assert.equal(room.privateSnapshot("A").canInitiateBirth, false);
}

{
  const { room, game, household } = eligibleRoom();
  game.state.turnState.activeIndex = 1;
  assert.equal(game.canInitiateBirth(household), false);
  assert.equal(room.privateSnapshot("A").canInitiateBirth, false);
}

{
  const { room, game, b, household } = eligibleRoom();
  b.ageStage = 7;
  assert.equal(game.canInitiateBirth(household), false);
  assert.equal(room.privateSnapshot("A").canInitiateBirth, false);
}

{
  const { room, game, household } = eligibleRoom();
  game.state.eventBirthLimit = 1;
  assert.equal(room.privateSnapshot("A").canInitiateBirth, true);
  assert.deepEqual(room.act("A", { type: "child:birth" }), { ok: true });
  assert.equal(Object.keys(game.state.birthProposals).length, 1);
  assert.equal(game.canInitiateBirth(household), false);
  assert.equal(room.privateSnapshot("A").canInitiateBirth, false);
}

console.log("PASS birth eligibility snapshot: true/false cases and no side effects");
