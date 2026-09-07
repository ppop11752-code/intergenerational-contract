import test from"node:test";import assert from"node:assert/strict";import fs from"node:fs";
const final=fs.readFileSync(new URL("../src/approved-ui-finalize.ts",import.meta.url),"utf8");

test("H084 Marriage profile rendering is state-signature idempotent",()=>{
  assert.match(final,/profileStateSig/);
  assert.match(final,/if\(btn\.dataset\.profileStateSig===sig\)return/);
  assert.match(final,/if\(btn\.textContent!==text\)btn\.textContent=text/);
  assert.match(final,/if\(btn\.title!==title\)btn\.title=title/);
  assert.match(final,/if\(btn\.disabled===canSend\)btn\.disabled=!canSend/);
});

test("H084 preserves disabled own-turn Marriage affordance copy",()=>{
  assert.match(final,/CÓ THỂ GỬI NGOÀI LƯỢT CỦA BẠN/);
  assert.match(final,/const canSend=!!latest\.player\?\.canSendMarriage/);
  assert.match(final,/if\(!canSend\)\{btn\.onclick=null;return\}/);
});

test("H084 global observer remains child-list only and owns no gameplay timing",()=>{
  assert.match(final,/new MutationObserver\(schedule\)\.observe\(document\.body,\{childList:true,subtree:true\}\)/);
  assert.doesNotMatch(final,/setInterval\(|60_000|15_000|5_000/);
});
