import test from'node:test';import assert from'node:assert/strict';import{marketAction,marriageAction,recoveryAction,supportAction}from'../dist/action-payloads.js';

test('market preserves non-default units before render',()=>{assert.deepEqual(marketAction('nonrenewable','high','7'),{type:'resource:buy',resourceType:'nonrenewable',grade:'high',units:7})});
test('recovery preserves non-default units before render',()=>{assert.deepEqual(recoveryAction('mid','9'),{type:'resource:recover',grade:'mid',units:9})});
test('support preserves selected target and non-default amount before render',()=>{assert.deepEqual(supportAction('character-child-2','5'),{type:'family:support',targetCharacterId:'character-child-2',amount:5})});
test('marriage preserves selected candidate before render',()=>{assert.deepEqual(marriageAction('candidate-42'),{type:'marriage:propose',targetCharacterId:'candidate-42'})});
