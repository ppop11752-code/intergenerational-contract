import test from"node:test";import assert from"node:assert/strict";import fs from"node:fs";
const ui=fs.readFileSync(new URL("../src/approved-ui-v1.ts",import.meta.url),"utf8");
const html=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");
const css=fs.readFileSync(new URL("../approved-ui-v1.css",import.meta.url),"utf8");

test("approved UI runtime is loaded before main",()=>{assert.match(html,/dist\/approved-ui-v1\.js[\s\S]*dist\/main\.js/);assert.match(html,/approved-ui-v1\.css/)});
test("queue decoration is idempotent",()=>{assert.match(ui,/root\.dataset\.approvedSig===sig/);assert.match(ui,/root\.dataset\.approvedSig=sig/)});
test("client does not invent authoritative MAX",()=>{assert.match(ui,/Chưa có MAX authoritative/);assert.doesNotMatch(ui,/Math\.floor\([^)]*cash/)});
test("marriage cancel uses existing server action",()=>{assert.match(ui,/type:"marriage:cancel"/);assert.doesNotMatch(ui,/marriage:accept/)});
test("end report preserves extinction and no-life semantics",()=>{assert.match(ui,/XÃ HỘI ĐÃ TUYỆT CHỦNG/);assert.match(ui,/THẤT BẠI CHUNG/);assert.match(ui,/CHƯA CÓ KIẾP SỐNG/);assert.match(ui,/CHƠI LẠI CÙNG PHÒNG/);assert.match(ui,/ĐANG CHỜ HOST/)});
test("approved shell removes duplicate world quick navigation",()=>{assert.match(ui,/data-panel="government"/);assert.match(ui,/data-panel="residence"/);assert.match(ui,/querySelectorAll<HTMLElement>\('\[data-panel="government"\],\[data-panel="residence"\]'\)/);assert.match(css,/\.approved-minimap/)});
test("approved UI keeps one authoritative timer source",()=>{assert.doesNotMatch(ui,/setInterval\(/);assert.doesNotMatch(ui,/60_000|15_000|5_000/)});
