import {describe,expect,it} from "vitest";
import {AuthoritativeRoom} from "../src/authoritative-room.js";

describe("authoritative room v0.8",()=>{
  it("starts with 10 players and stops on a real-player decision turn",()=>{
    const room=new AuthoritativeRoom("ABC123","p0","P0","s0");
    for(let i=1;i<10;i++) room.join(`p${i}`,`P${i}`,`s${i}`);
    const result=room.start("p0",()=>0.42);
    expect(result.ok).toBe(true);
    expect(room.engine).not.toBeNull();
    expect(room.engine!.state.round).toBe(1);
    expect(["marriage","voluntary","round_end"]).toContain(room.engine!.phase());
    expect(room.publicSnapshot().game?.population.real).toBeGreaterThan(0);
  });

  it("rejects action from player who does not own current character",()=>{
    const room=new AuthoritativeRoom("ABC123","p0","P0","s0");
    for(let i=1;i<10;i++) room.join(`p${i}`,`P${i}`,`s${i}`);
    room.start("p0",()=>0.33);
    const current=room.publicSnapshot().game?.currentTurnPlayerId;
    const wrong=[...room.players.keys()].find(x=>x!==current)!;
    expect(room.act(wrong,{type:"turn:complete"}).ok).toBe(false);
  });
});
