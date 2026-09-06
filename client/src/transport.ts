import type{PlayerSnapshot,RoomSnapshot}from"./types.js";
declare const io:(url?:string,opts?:any)=>any;
type Result={ok:boolean;error?:string;code?:string;reconnectToken?:string;queuePosition?:number|null;room?:RoomSnapshot;player?:PlayerSnapshot};
export class GameTransport{
 socket:any;room:RoomSnapshot|null=null;player:PlayerSnapshot|null=null;connected=false;onChange=()=>{};onConnection=()=>{};
 constructor(){this.socket=io(undefined,{transports:["websocket","polling"]});this.socket.on("connect",()=>{this.connected=true;this.onConnection();this.onChange()});this.socket.on("disconnect",()=>{this.connected=false;this.onConnection();this.onChange()});this.socket.on("room:state",(x:RoomSnapshot)=>{this.room=x;this.onChange()});this.socket.on("player:state",(x:PlayerSnapshot)=>{this.player=x;this.onChange()})}
 emit<T=Result>(event:string,payload:any={}):Promise<T>{return new Promise(r=>this.socket.emit(event,payload,(x:T)=>r(x)))}
 createRoom(playerId:string,displayName:string){return this.emit("room:create",{playerId,displayName})}
 joinRoom(code:string,playerId:string,displayName:string){return this.emit("room:join",{code,playerId,displayName})}
 reconnectRoom(code:string,playerId:string,reconnectToken:string){return this.emit("room:reconnect",{code,playerId,reconnectToken})}
 getState(){return this.emit("room:get-state",{})}
 start(){return this.emit("game:start",{})}
 replay(){return this.emit("game:replay",{})}
 action(action:any){return this.emit("game:action",{action})}
 applyState(result:Result){if(result.room)this.room=result.room;if(result.player)this.player=result.player;this.onChange()}
}
