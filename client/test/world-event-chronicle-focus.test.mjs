import test from"node:test";import assert from"node:assert/strict";import fs from"node:fs";
const ui=fs.readFileSync(new URL("../src/world-event-chronicle-focus.ts",import.meta.url),"utf8");
const html=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");

test("H081 exact Chronicle focus runtime loads after resolved World Event runtime",()=>{
  assert.match(html,/dist\/resolved-ui-contracts\.js[\s\S]*dist\/world-event-chronicle-focus\.js[\s\S]*dist\/approved-ui-finalize\.js/);
});

test("H081 maps event id to authoritative chronicleEntryId and focuses by Chronicle id",()=>{
  assert.match(ui,/occurrences\.find\(x=>x\.id===row\.dataset\.worldEventId\)/);
  assert.match(ui,/row\.dataset\.chronicleEntryId=ev\.chronicleEntryId/);
  assert.match(ui,/row\.dataset\.chronicleEntryId===pendingChronicleEntryId/);
  assert.match(ui,/data-chronicle-entry-id/);
  assert.match(ui,/occurrence\?\.chronicleEntryId/);
});

test("H081 does not infer Chronicle target from event name",()=>{
  assert.doesNotMatch(ui,/\.name\s*===|includes\([^)]*name|textContent.*name/i);
});
