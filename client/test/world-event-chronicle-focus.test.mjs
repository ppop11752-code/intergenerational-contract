import test from"node:test";import assert from"node:assert/strict";import fs from"node:fs";
const ui=fs.readFileSync(new URL("../src/resolved-ui-contracts.ts",import.meta.url),"utf8");
const html=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");

test("H082 has one Chronicle focus runtime",()=>{
  assert.match(html,/dist\/resolved-ui-contracts\.js[\s\S]*dist\/approved-ui-finalize\.js/);
  assert.doesNotMatch(html,/world-event-chronicle-focus\.js/);
});

test("H082 renders separate authoritative event and Chronicle ids",()=>{
  assert.match(ui,/data-world-event-id=\"\$\{esc\(e\.id\)\}\" data-chronicle-entry-id=\"\$\{esc\(e\.chronicleEntryId\|\|\"\"\)\}\"/);
  assert.match(ui,/row\.dataset\.chronicleEntryId===chronicleFocus/);
  assert.ok(ui.includes('[data-chronicle-entry-id="${CSS.escape(chronicleScrollPending)}"]'));
  assert.doesNotMatch(ui,/row\.dataset\.worldEventId===chronicleFocus/);
});

test("H082/H083 preserve focus through mutation ordering without a second observer",()=>{
  assert.match(ui,/chronicleFocus=ev\.chronicleEntryId/);
  assert.match(ui,/chronicleScrollPending=ev\.chronicleEntryId/);
  assert.match(ui,/row\.classList\.toggle\("focused-event",!!chronicleFocus&&row\.dataset\.chronicleEntryId===chronicleFocus\)/);
  const chronicleBody=ui.slice(ui.indexOf("function chronicle()"),ui.indexOf("function immigration()"));
  assert.doesNotMatch(chronicleBody,/chronicleFocus=null/);
  assert.doesNotMatch(ui,/setTimeout\(schedule/);
});

test("H082/H083 do not infer Chronicle target from event name",()=>{
  assert.doesNotMatch(ui,/eventName\s*===|includes\([^)]*eventName|\.name\s*===\s*chronicleFocus/i);
});
