import test from 'node:test'; import assert from 'node:assert/strict'; import {nextCoach,TUTORIAL_VERSION,unlockedSteps} from '../dist/tutorial.js';
const s=()=>({active:true,version:TUTORIAL_VERSION,seenSteps:[],completed:false,firstRound:1});
const room=(phase='voluntary',ended=false)=>({code:'ABC123',started:true,hostPlayerId:'p1',players:[],game:{round:1,year:0,phase,ended,endingReason:null,currentTurnCharacterId:'c1',currentTurnPlayerId:'p1',phaseDeadlineAt:999,phaseDeadlineKind:phase,debt:0,population:{total:10,humanControlled:1,npc:9},policy:{inflationRate:0,priceIndex:1},market:{},characters:[],marriageProposals:[],birthProposals:[],historySnapshots:[],rankings:[],chronology:[]}});
const player=()=>({playerId:'p1',character:{id:'c1'},household:{status:'poor'},history:null,queuePosition:null,financial:{representative:true},incomingMarriageProposals:[],outgoingMarriageProposals:[],incomingBirthProposals:[],marriageCandidates:[],canSendMarriage:false,canInitiateBirth:false});
test('tutorial absent in normal multiplayer',()=>{const st=s();st.active=false;assert.deepEqual(unlockedSteps(st,room(),player(),'market'),[])});
test('mandatory state unlocks T1 without gameplay action',()=>{const ids=unlockedSteps(s(),room('mandatory'),player(),'overview');assert.ok(ids.includes('T1'));assert.equal(nextCoach({...s(),seenSteps:['T0']},room('mandatory'),player(),'overview'),'T1')});
test('market guidance requires voluntary + opened market',()=>{assert.ok(unlockedSteps(s(),room(),player(),'market').includes('T4'));assert.ok(!unlockedSteps(s(),room(),player(),'overview').includes('T4'))});
test('birth guidance requires authoritative eligibility',()=>{const p=player();assert.ok(!unlockedSteps(s(),room(),p,'birth').includes('T7'));p.canInitiateBirth=true;assert.ok(unlockedSteps(s(),room(),p,'birth').includes('T7'))});
test('queue and end report unlock',()=>{const p=player();p.queuePosition=2;const r=room('round_end',true);assert.ok(unlockedSteps(s(),r,p,'overview').includes('T9'));assert.ok(unlockedSteps(s(),r,p,'overview').includes('T11'))});
test('round transition unlocks T10',()=>{const r=room();r.game.round=2;assert.ok(unlockedSteps(s(),r,player(),'overview').includes('T10'))});

import {readFileSync} from 'node:fs';
test('help recap is non-modal and does not use showModal',()=>{const src=readFileSync(new URL('../src/main.ts',import.meta.url),'utf8');assert.ok(!src.includes('showModal('));assert.ok(!src.includes('<dialog'));assert.ok(src.includes('help-recap'))});
