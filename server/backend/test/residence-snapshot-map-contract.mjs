import assert from "node:assert/strict";
import {GameEngine} from "../dist/engine.js";
import {AuthoritativeRoom} from "../dist/authoritative-room.js";
import {activeMapResidences,advanceResidenceRoundStart,finalizeResidenceEndRound} from "../dist/residence.js";

function roomWith(game,playerId="A"){
  const room=new AuthoritativeRoom("HOME01",playerId,playerId,`socket-${playerId}`);
  room.started=true;room.engine=game;return room;
}

{
  const game=new GameEngine();game.joinPlayer("A");
  const actor=game.alive().find(c=>c.ownerId==="A"),spouse=game.createInitialBot();
  game.marry(actor,spouse);
  const child=game.createNpc(actor.householdId);
  actor.childrenIds.push(child.id);spouse.childrenIds.push(child.id);game.household(actor).childrenIds.push(child.id);
  const room=roomWith(game),before=JSON.stringify(game.state),snapshot=room.publicSnapshot();
  const residenceId=actor.currentResidenceId,residence=snapshot.game.residenceDirectory[residenceId];
  const actorView=snapshot.game.characters.find(c=>c.characterId===actor.id);
  const childView=snapshot.game.characters.find(c=>c.characterId===child.id);

  assert.equal(snapshot.players[0].currentResidenceId,residenceId);
  assert.equal(room.privateSnapshot("A").currentResidenceId,residenceId);
  assert.equal(actorView.currentResidenceId,residenceId);
  assert.equal(childView.currentResidenceId,residenceId);
  assert.notEqual(actorView.householdId,childView.householdId,"co-residence must not merge Economic Households");
  assert.deepEqual(childView.parentCharacterIds.sort(),[actor.id,spouse.id].sort());
  assert.ok(snapshot.game.activeMapResidenceIds.includes(residenceId));
  assert.deepEqual(snapshot.game.activeMapResidenceIds,[...activeMapResidences(game.state)].map(r=>r.residenceId).sort());
  assert.equal(residence.activeOnMap,true);
  assert.equal(residence.currentNavigationAllowed,true);
  assert.deepEqual(residence.coordinates,game.state.residences[residenceId].coordinates);
  assert.deepEqual(residence.occupants.map(x=>x.characterId).sort(),[actor.id,spouse.id,child.id].sort());
  assert.ok(residence.occupants.find(x=>x.characterId===actor.id).roleKeys.includes("spouse"));
  assert.ok(residence.occupants.find(x=>x.characterId===actor.id).roleKeys.includes("parent"));
  assert.deepEqual(residence.occupants.find(x=>x.characterId===child.id).roleKeys,["child"]);
  assert.equal("persona" in actorView,false,"public Character must not expose hidden Persona");
  assert.equal("persona" in residence.occupants[0],false,"Residence occupants must not expose hidden Persona");
  assert.equal(JSON.stringify(game.state),before,"Residence snapshot must be side-effect-free");
}

{
  const game=new GameEngine();game.joinPlayer("A");const actor=game.alive().find(c=>c.ownerId==="A");
  const room=roomWith(game),residenceId=actor.currentResidenceId;game.state.round=7;game.die(actor,"test");
  assert.equal(room.privateSnapshot("A").currentResidenceId,null,"queued Human has no current Home");
  assert.equal(room.publicSnapshot().players[0].currentResidenceId,null);
  game.state.round=8;advanceResidenceRoundStart(game.state);finalizeResidenceEndRound(game.state);
  const before=JSON.stringify(game.state),snapshot=room.publicSnapshot(),historical=snapshot.game.residenceDirectory[residenceId];
  assert.ok(historical,"reclaimed Residence remains resolvable by stable ID");
  assert.equal(historical.status,"reclaimed");
  assert.equal(historical.activeOnMap,false);
  assert.equal(historical.currentNavigationAllowed,false);
  assert.ok(!snapshot.game.activeMapResidenceIds.includes(residenceId));
  assert.deepEqual(historical.occupants,[]);
  assert.equal(JSON.stringify(game.state),before,"historical Residence lookup snapshot must be side-effect-free");
}

{
  const game=new GameEngine();game.joinPlayer("A");const actor=game.alive().find(c=>c.ownerId==="A");
  const room=roomWith(game),residenceId=actor.currentResidenceId,token=room.players.get("A").reconnectToken;
  assert.equal(room.disconnectSocket("socket-A",()=>0.5),true);
  assert.equal(room.reconnect("A",token,"socket-A2").ok,true);
  const snapshot=room.publicSnapshot(),oldCharacter=snapshot.game.characters.find(c=>c.characterId===actor.id);
  assert.equal(room.privateSnapshot("A").currentResidenceId,null,"reconnected queued Human has no current Home");
  assert.equal(snapshot.players[0].currentResidenceId,null);
  assert.equal(oldCharacter.currentResidenceId,residenceId,"NPC takeover keeps Character Residence");
  assert.equal(oldCharacter.npc,true);
}

{
  const lobby=new AuthoritativeRoom("LOBBY1","A","A","socket-a");
  assert.equal(lobby.privateSnapshot("A").currentResidenceId,null);
  assert.equal(lobby.publicSnapshot().players[0].currentResidenceId,null);
}

console.log("PASS Residence snapshot/map contract: mapping, roles, queue and reclaimed history");
