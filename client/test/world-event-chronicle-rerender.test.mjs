import test from"node:test";import assert from"node:assert/strict";import fs from"node:fs";
const ui=fs.readFileSync(new URL("../src/resolved-ui-contracts.ts",import.meta.url),"utf8");
const final=fs.readFileSync(new URL("../src/approved-ui-finalize.ts",import.meta.url),"utf8");
const html=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");

test("H083 integrated runtime order keeps one Chronicle focus owner",()=>{
  assert.match(html,/dist\/resolved-ui-contracts\.js[\s\S]*dist\/approved-ui-finalize\.js/);
  assert.doesNotMatch(html,/world-event-chronicle-focus\.js/);
  assert.doesNotMatch(final,/focused-event|chronicleFocus|chronicleEntryId/);
});

test("H083 focus persists while scroll is one-shot across Approved UI rerender",()=>{
  assert.match(ui,/chronicleFocus:string\|null=null,chronicleScrollPending:string\|null=null/);
  assert.match(ui,/chronicleFocus=ev\.chronicleEntryId;chronicleScrollPending=ev\.chronicleEntryId/);
  assert.match(ui,/row\.dataset\.chronicleEntryId===chronicleFocus/);
  assert.ok(ui.includes('[data-chronicle-entry-id="${CSS.escape(chronicleScrollPending)}"]'));
  assert.match(ui,/chronicleScrollPending=null/);
  const chronicleBody=ui.slice(ui.indexOf("function chronicle()"),ui.indexOf("function immigration()"));
  assert.doesNotMatch(chronicleBody,/chronicleFocus=null/);
});

test("H083 exact focus never falls back to event id or event name",()=>{
  const chronicleBody=ui.slice(ui.indexOf("function chronicle()"),ui.indexOf("function immigration()"));
  assert.doesNotMatch(chronicleBody,/dataset\.worldEventId===chronicleFocus/);
  assert.doesNotMatch(chronicleBody,/\.name\s*===|includes\([^)]*name/i);
});
