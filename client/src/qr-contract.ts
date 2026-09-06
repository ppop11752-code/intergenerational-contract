export const ROOM_CODE_RE=/^[A-Z0-9]{6}$/;

export function normalizeRoomCode(value:string|null|undefined){
  const code=(value||"").trim().toUpperCase();
  return ROOM_CODE_RE.test(code)?code:null;
}

export function roomCodeFromSearch(search:string){
  try{return normalizeRoomCode(new URLSearchParams(search).get("room"))}catch{return null}
}

export function roomJoinUrl(origin:string,roomCode:string){
  const code=normalizeRoomCode(roomCode);if(!code)return null;
  return`${origin.replace(/\/$/,"")}/?room=${encodeURIComponent(code)}`;
}
