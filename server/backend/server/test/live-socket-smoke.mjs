import assert from "node:assert/strict";
import crypto from "node:crypto";
import { io } from "socket.io-client";

const url = process.env.SERVER_URL ?? "http://127.0.0.1:3001";
const sockets = [];

function connect() {
  return new Promise((resolve, reject) => {
    const socket = io(url, {
      transports: ["websocket"],
      forceNew: true,
      reconnection: false,
      timeout: 30_000
    });
    sockets.push(socket);
    const timer = setTimeout(() => reject(new Error("connect timeout")), 35_000);
    socket.once("connect", () => {
      clearTimeout(timer);
      resolve(socket);
    });
    socket.once("connect_error", error => {
      clearTimeout(timer);
      reject(error);
    });
  });
}

function emitAck(socket, event, payload = {}) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`${event} ack timeout`)), 15_000);
    socket.emit(event, payload, response => {
      clearTimeout(timer);
      resolve(response);
    });
  });
}

async function expectOk(socket, event, payload = {}) {
  const response = await emitAck(socket, event, payload);
  assert.equal(response?.ok, true, `${event} failed: ${response?.error ?? "unknown"}`);
  return response;
}

async function expectError(socket, event, expectedError, payload = {}) {
  const response = await emitAck(socket, event, payload);
  assert.deepEqual(
    { ok: response?.ok, error: response?.error },
    { ok: false, error: expectedError },
    `${event} must reject with ${expectedError}`
  );
}

try {
  const host = await connect();
  let roomStateEvents = 0;
  let playerStateEvents = 0;
  host.on("room:state", () => roomStateEvents++);
  host.on("player:state", () => playerStateEvents++);

  const hostId = crypto.randomUUID();
  const created = await expectOk(host, "room:create", {
    playerId: hostId,
    displayName: "Live QA Host"
  });
  assert.match(created.code, /^[A-Z2-9]{6}$/);
  assert.ok(created.reconnectToken);

  const guest = await connect();
  const guestId = crypto.randomUUID();
  const joined = await expectOk(guest, "room:join", {
    code: created.code,
    playerId: guestId,
    displayName: "Live QA Guest"
  });
  assert.ok(joined.reconnectToken);

  const unbound = await connect();
  await expectError(unbound, "room:get-state", "NOT_BOUND");
  await expectError(guest, "game:start", "HOST_ONLY");

  await expectOk(host, "game:start");
  const started = await expectOk(host, "room:get-state");
  assert.equal(started.room.started, true);
  assert.equal(started.room.players.length, 2);
  assert.equal(started.room.initialNpcCount, 8);
  assert.equal(started.room.game.turnOrder.length, 10);

  await expectError(host, "game:replay", "GAME_NOT_ENDED");

  guest.disconnect();
  await new Promise(resolve => setTimeout(resolve, 750));

  const returningGuest = await connect();
  await expectError(returningGuest, "room:reconnect", "INVALID_RECONNECT_TOKEN", {
    code: created.code,
    playerId: guestId,
    reconnectToken: "invalid-token"
  });
  const reconnected = await expectOk(returningGuest, "room:reconnect", {
    code: created.code,
    playerId: guestId,
    reconnectToken: joined.reconnectToken
  });
  assert.ok(Number.isInteger(reconnected.queuePosition) && reconnected.queuePosition > 0);

  const afterReconnect = await expectOk(returningGuest, "room:get-state");
  assert.equal(afterReconnect.player.character, null);
  assert.equal(afterReconnect.player.queuePosition, reconnected.queuePosition);
  const publicGuest = afterReconnect.room.players.find(player => player.playerId === guestId);
  assert.equal(publicGuest?.connected, true);
  assert.ok(publicGuest?.aiTakeoverCharacterId);
  assert.equal(publicGuest?.queuePosition, reconnected.queuePosition);

  await expectError(returningGuest, "game:action", "NO_ACTIVE_CHARACTER", {
    action: { type: "turn:complete" }
  });

  await new Promise(resolve => setTimeout(resolve, 250));
  assert.ok(roomStateEvents > 0, "host must receive room:state emissions");
  assert.ok(playerStateEvents > 0, "host must receive player:state emissions");

  console.log(JSON.stringify({
    ok: true,
    url,
    roomCode: created.code,
    connectedPlayers: afterReconnect.room.players.filter(player => player.connected).length,
    initialNpcCount: started.room.initialNpcCount,
    queuePositionAfterReconnect: reconnected.queuePosition,
    verifiedEvents: [
      "room:create",
      "room:join",
      "room:get-state",
      "game:start",
      "game:replay",
      "room:reconnect",
      "game:action",
      "room:state",
      "player:state"
    ],
    verifiedErrors: [
      "NOT_BOUND",
      "HOST_ONLY",
      "GAME_NOT_ENDED",
      "INVALID_RECONNECT_TOKEN",
      "NO_ACTIVE_CHARACTER"
    ]
  }, null, 2));
} finally {
  for (const socket of sockets) socket.disconnect();
}
