import test from'node:test';import assert from'node:assert/strict';import{normalizeRoomCode,roomCodeFromSearch,roomJoinUrl}from'../dist/qr-contract.js';import{readFileSync}from'node:fs';

test('room QR deep-link is same-origin and normalized',()=>{assert.equal(roomJoinUrl('https://game.example/','ab12cd'),'https://game.example/?room=AB12CD')});
test('valid room query prefills normalized uppercase only',()=>{assert.equal(roomCodeFromSearch('?room=ab12cd'),'AB12CD');assert.equal(normalizeRoomCode(' ABC123 '),'ABC123')});
test('invalid room query is ignored',()=>{for(const x of['','ABC','ABC-12','ABCDEFG','<bad>'])assert.equal(normalizeRoomCode(x),null);assert.equal(roomCodeFromSearch('?room=bad'),null)});
test('QR runtime never calls room join and retains explicit join flow',()=>{const runtime=readFileSync(new URL('../src/qr-runtime.ts',import.meta.url),'utf8');assert.ok(!runtime.includes('room:join'));assert.ok(!runtime.includes('.joinRoom('));assert.ok(runtime.includes('[data-screen="join"]'));assert.ok(runtime.includes('Mã phòng đã được điền từ QR.'))});
test('renderer failure has plain-language manual PIN fallback',()=>{const runtime=readFileSync(new URL('../src/qr-runtime.ts',import.meta.url),'utf8');assert.ok(runtime.includes('Không tạo được mã QR — hãy nhập mã phòng.'));assert.ok(runtime.includes('.room-pin'))});
