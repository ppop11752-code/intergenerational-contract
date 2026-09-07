import assert from "node:assert/strict";
import { GameEngine } from "../dist/engine.js";
import { AuthoritativeRoom } from "../dist/authoritative-room.js";

function owned(game, playerId) {
  return game.alive().find(character => character.ownerId === playerId);
}

function supportRoom() {
  const room = new AuthoritativeRoom("SUPPORT1", "A", "A", "socket-a");
  assert.equal(room.join("B", "B", "socket-b").ok, true);
  const game = new GameEngine();
  game.joinPlayer("A");
  game.joinPlayer("B");
  const actor = owned(game, "A");
  const otherPlayer = owned(game, "B");
  const parent = game.createNpc();
  const child = game.createNpc(game.household(actor).id);
  const unrelated = game.createNpc();
  parent.ageStage = 7;
  child.ageStage = 2;
  parent.childrenIds.push(actor.id);
  actor.childrenIds.push(child.id);
  game.household(actor).childrenIds.push(child.id);
  game.household(actor).sharedCash = 100;
  game.state.spendingLimitByCharacter[actor.id] = 100;
  game.state.turnState.phase = "voluntary";
  game.state.turnState.entries = [
    { characterId: actor.id, householdId: actor.householdId, statusRank: 1, card: 10, order: 1 },
    { characterId: otherPlayer.id, householdId: otherPlayer.householdId, statusRank: 1, card: 9, order: 2 }
  ];
  game.state.turnState.activeIndex = 0;
  room.started = true;
  room.engine = game;
  return { room, game, actor, otherPlayer, parent, child, unrelated };
}

{
  const lobby = new AuthoritativeRoom("LOBBY1", "A", "A", "socket-a");
  assert.deepEqual(lobby.privateSnapshot("A").eligibleSupportTargets, []);
}

{
  const { room, game, actor, parent, child, unrelated } = supportRoom();
  const before = JSON.stringify(game.state);
  assert.deepEqual(room.privateSnapshot("A").eligibleSupportTargets, [
    { characterId: parent.id, relation: "parent", ageLabel: "Cao tuổi · 60–69 tuổi", status: "poor", transferableMax: 100, unavailableReason: null },
    { characterId: child.id, relation: "child", ageLabel: "Trẻ em · 10–19 tuổi", status: "poor", transferableMax: 100, unavailableReason: null }
  ]);
  assert.equal(JSON.stringify(game.state), before, "support target snapshot must not mutate game state");
  assert.equal(game.isEligibleVoluntarySupportTarget(actor, parent), true);
  assert.equal(game.isEligibleVoluntarySupportTarget(actor, child), true);
  assert.equal(game.isEligibleVoluntarySupportTarget(actor, unrelated), false);
  assert.deepEqual(room.act("A", { type: "family:support", targetCharacterId: unrelated.id, amount: 1 }), { ok: false, error: "support limited to direct parent-child relations" });
  assert.deepEqual(room.act("A", { type: "family:support", targetCharacterId: parent.id, amount: 1 }), { ok: true });
  assert.deepEqual(room.act("A", { type: "family:support", targetCharacterId: child.id, amount: 1 }), { ok: true });
}

{
  const { room, game } = supportRoom();
  game.state.turnState.phase = "status";
  assert.deepEqual(room.privateSnapshot("A").eligibleSupportTargets, []);
}

{
  const { room, game } = supportRoom();
  game.state.turnState.activeIndex = 1;
  assert.deepEqual(room.privateSnapshot("A").eligibleSupportTargets, []);
  assert.deepEqual(room.privateSnapshot("B").eligibleSupportTargets, []);
}

{
  const { room, game, parent } = supportRoom();
  parent.alive = false;
  const targets = room.privateSnapshot("A").eligibleSupportTargets;
  assert.equal(targets.some(target => target.characterId === parent.id), false);
}

console.log("PASS support target snapshot: authoritative relations, action parity and no side effects");
