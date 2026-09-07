import assert from "node:assert/strict";
import { GameEngine } from "../dist/engine.js";
import { AuthoritativeRoom } from "../dist/authoritative-room.js";

const expected = [
  ["Thiên tai", ["MARKET"]],
  ["Khủng hoảng tài chính", ["MARKET"]],
  ["Bùng nổ công nghệ", ["MARKET"]],
  ["Mở rộng phúc lợi", ["GOVERNMENT"]],
  ["Dịch bệnh", ["MANDATORY"]],
  ["Khuyến sinh", ["BIRTH"]],
  ["Khủng hoảng nợ công", ["GOVERNMENT"]],
  ["Đầu tư công", ["RECOVERY"]],
  ["Biến động thị trường", ["MARKET"]]
];

for (let index=0; index<expected.length; index++) {
  const game = new GameEngine();
  game.state.round = index + 1;
  game.setRandomSource(() => (index + 0.01) / 9);
  assert.equal(game.drawEvent(), expected[index][0]);
  const occurrence = game.state.worldEventOccurrences.at(-1);
  assert.equal(occurrence.name, expected[index][0]);
  assert.equal(occurrence.round, game.state.round);
  assert.equal(occurrence.chronicleEntryId, occurrence.id);
  assert.ok(occurrence.ambienceKey);
  assert.ok(occurrence.impacts.length > 0);
  assert.deepEqual([...new Set(occurrence.impacts.map(row => row.system))], expected[index][1]);
  for (const row of occurrence.impacts) {
    assert.ok(row.key && row.labelKey);
    assert.equal(typeof row.value, "number");
    assert.ok(row.delta === null || typeof row.delta === "number");
  }
  const room = new AuthoritativeRoom("EVENT1", "A", "A", "socket-a");
  room.started = true;
  room.engine = game;
  const before = JSON.stringify(game.state);
  const snapshot = room.publicSnapshot().game;
  assert.equal(snapshot.worldEvent.id, occurrence.id);
  assert.equal(snapshot.worldEvent.chronicleEntryId, occurrence.id);
  assert.equal(snapshot.worldEventOccurrences.at(-1).id, occurrence.id);
  assert.equal(JSON.stringify(game.state), before, "World Event snapshot must be side-effect-free");
  if (occurrence.name === "Dịch bệnh") {
    const medical = occurrence.impacts.find(row => row.key === "epidemic_medical_fee_per_character");
    assert.equal(medical.value, game.state.epidemicMedicalCostPerCharacter);
  }
}

{
  const game = new GameEngine();
  game.state.round = 1;
  const room = new AuthoritativeRoom("NONE01", "A", "A", "socket-a");
  room.started = true;
  room.engine = game;
  assert.equal(room.publicSnapshot().game.worldEvent, null);
  assert.deepEqual(room.publicSnapshot().game.worldEventOccurrences, []);
}

console.log("PASS UI World Event contract: impacts, ambience and exact Chronicle linkage");
