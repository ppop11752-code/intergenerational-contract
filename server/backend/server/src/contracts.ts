export const SOCKET_EVENTS = {
  createRoom:"room:create",
  joinRoom:"room:join",
  reconnectRoom:"room:reconnect",
  getState:"room:get-state",
  roomState:"room:state",
  playerState:"player:state",
  startGame:"game:start",
  gameAction:"game:action"
} as const;

export type GameActionName =
  | "marriage:propose"
  | "marriage:respond"
  | "marriage:cancel"
  | "resource:buy"
  | "resource:recover"
  | "family:support"
  | "child:birth"
  | "child:respond"
  | "status:set"
  | "turn:complete";
