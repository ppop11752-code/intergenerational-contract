import assert from "node:assert/strict";
import { SOCKET_EVENTS } from "../dist/server/src/contracts.js";

const expectedTransportEvents = [
  "room:create",
  "room:join",
  "room:reconnect",
  "room:get-state",
  "room:state",
  "player:state",
  "game:start",
  "game:replay",
  "game:action"
];

assert.equal(
  SOCKET_EVENTS.replayGame,
  "game:replay",
  "SOCKET_EVENTS must expose the authoritative game:replay transport event"
);

assert.deepEqual(
  [...new Set(Object.values(SOCKET_EVENTS))].sort(),
  [...expectedTransportEvents].sort(),
  "SOCKET_EVENTS must match the authoritative multiplayer transport event set"
);

console.log("PASS socket event contract: 9/9 authoritative transport events");
