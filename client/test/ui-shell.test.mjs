import test from'node:test';import assert from'node:assert/strict';import{readFileSync}from'node:fs';
const main=readFileSync(new URL('../src/main.ts',import.meta.url),'utf8');const transport=readFileSync(new URL('../src/transport.ts',import.meta.url),'utf8');
test('transport exposes reconnect and get-state',()=>{assert.ok(transport.includes('room:reconnect'));assert.ok(transport.includes('room:get-state'))});
test('landing/create/join/lobby flows exist',()=>{for(const token of['TẠO PHÒNG','THAM GIA PHÒNG','id="start"','room-pin'])assert.ok(main.includes(token))});
test('support does not ask for raw Character ID',()=>{assert.ok(!main.includes('Character ID'));assert.ok(main.includes('eligibleSupportTargets'))});
test('incoming birth proposal response UI exists',()=>{assert.ok(main.includes('child:respond'));assert.ok(main.includes('incomingBirthProposals'))});
test('waiting queue is dedicated and actionless',()=>{assert.ok(main.includes('HÀNG CHỜ TÁI SINH'));assert.ok(main.includes('queue-card'))});
test('host-only replay presentation exists',()=>{assert.ok(main.includes('host()?`<button id="replay"'))});
test('support selector consumes authoritative targets without visible ids',()=>{assert.ok(main.includes('eligibleSupportTargets'));assert.ok(main.includes('id="support-target"'));assert.ok(main.includes('Cha/mẹ'));assert.ok(main.includes('Con'));assert.ok(!main.includes('placeholder="Character ID"'))});
