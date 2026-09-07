import test from"node:test";import assert from"node:assert/strict";import fs from"node:fs";
const ui=fs.readFileSync(new URL("../src/resolved-ui-contracts.ts",import.meta.url),"utf8");
const final=fs.readFileSync(new URL("../src/approved-ui-finalize.ts",import.meta.url),"utf8");
const residence=fs.readFileSync(new URL("../src/residence-ui-v1.ts",import.meta.url),"utf8");
const types=fs.readFileSync(new URL("../src/types.ts",import.meta.url),"utf8");
const html=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");

test("resolved contract runtimes load before main",()=>{assert.match(html,/dist\/residence-ui-v1\.js[\s\S]*dist\/resolved-ui-contracts\.js[\s\S]*dist\/approved-ui-finalize\.js[\s\S]*dist\/main\.js/)});
test("H064 MAX and unavailable reasons are server-authored",()=>{for(const key of["purchasableMax","acceptedMax","transferableMax","birthQuote","unavailableReason"])assert.match(ui,new RegExp(key));assert.doesNotMatch(ui,/Math\.floor\([^\n]*(cash|spendingRemaining|capacityRemaining)/i)});
test("H065 lifecycle presentation consumes structured results only",()=>{assert.match(ui,/recentLifecycleResults/);assert.match(ui,/estateTotal/);assert.match(ui,/governmentTransfer/);assert.match(ui,/medicalPaid/);assert.doesNotMatch(ui,/chronology.*match|chronology.*split|chronology.*includes/)});
test("H066 world event detail uses impacts and exact Chronicle linkage",()=>{assert.match(ui,/worldEventOccurrences/);assert.match(ui,/chronicleEntryId/);assert.match(ui,/\.impacts/);assert.doesNotMatch(ui,/eventName\s*===|includes\([^)]*eventName/)});
test("Chronicle deep link switches to WORLD and filters only structured categories",()=>{assert.match(final,/data-chronicle=\\"world\\"/);assert.match(final,/x\.system===\\"GOVERNMENT\\"/);assert.match(final,/x\.system===\\"BIRTH\\"/);assert.doesNotMatch(final,/chronology/)});
test("Residence world-first marriage uses candidate contract and existing propose action",()=>{assert.match(final,/marriageCandidates/);assert.match(final,/type:\"marriage:propose\"/);assert.match(final,/targetCharacterId:profileCharacterId/);assert.match(ui,/marriage-residence-links/)});
test("Queue and takeover focus authoritative Residence only",()=>{assert.match(final,/aiTakeoverCharacterId/);assert.match(final,/currentResidenceId/);assert.match(residence,/activeMapResidenceIds/);assert.doesNotMatch(final,/householdId.*residence|parentHouseholdId.*residence/i)});
test("Immigration highlighting is Residence-origin based and hides Persona",()=>{assert.match(ui,/origin===\"immigrant\"/);assert.match(ui,/createdRound===gg\.round/);assert.doesNotMatch(ui,/persona/i)});
test("resolved runtime is idempotent and owns no gameplay timers",()=>{assert.match(ui,/dataset\.serverSig/);assert.match(ui,/dataset\.serverReason/);assert.doesNotMatch(ui,/60_000|15_000|5_000|setInterval\(/);assert.doesNotMatch(final,/60_000|15_000|5_000|setInterval\(/)});
test("client types include all resolved server surfaces",()=>{for(const key of["residenceDirectory","activeMapResidenceIds","residenceTransitions","marketQuotes","recentLifecycleResults","worldEventOccurrences","BirthQuote"])assert.match(types,new RegExp(key))});
