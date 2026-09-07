import test from"node:test";import assert from"node:assert/strict";import fs from"node:fs";
const css=fs.readFileSync(new URL("../residence-pointer-fix.css",import.meta.url),"utf8");
const html=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");

test("H074/H076 pointer correction is loaded after approved UI styles",()=>{
  assert.match(html,/approved-ui-v1\.css[\s\S]*residence-pointer-fix\.css[\s\S]*residence-ui-v1\.css/);
});

test("transparent HUD presentation surfaces do not intercept world-map pointers",()=>{
  assert.match(css,/\.approved-hud \.hud-cluster[\s\S]*pointer-events:\s*none/);
  assert.match(css,/\.approved-hud \.hud-phase[\s\S]*pointer-events:\s*none/);
  assert.match(css,/\.approved-hud > button[\s\S]*pointer-events:\s*auto/);
});

test("Turn Track background passes through while actual tokens stay interactive",()=>{
  assert.match(css,/\.approved-turn-track\s*\{[\s\S]*pointer-events:\s*none/);
  assert.match(css,/\.approved-turn-track \.turn-token\s*\{[\s\S]*pointer-events:\s*auto/);
});

test("Mandatory presentation is fully pointer-transparent because it has no interactive controls",()=>{
  assert.match(css,/\.approved-mandatory,\s*\n\.approved-mandatory \*\s*\{[\s\S]*pointer-events:\s*none/);
  assert.doesNotMatch(css,/\.approved-mandatory[^\{]*button[\s\S]*pointer-events:\s*auto/);
});
