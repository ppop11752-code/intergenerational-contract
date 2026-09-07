import test from"node:test";
import assert from"node:assert/strict";
import fs from"node:fs";

const src=fs.readFileSync(new URL("../src/residence-ui-v1.ts",import.meta.url),"utf8");
const html=fs.readFileSync(new URL("../index.html",import.meta.url),"utf8");

 test("Residence UI consumes authoritative Residence contract",()=>{
  for(const token of["residenceDirectory","activeMapResidenceIds","currentResidenceId","residenceTransitions"])assert.match(src,new RegExp(token));
  assert.doesNotMatch(src,/householdId/);
  assert.doesNotMatch(src,/parentHouseholdId/);
 });

test("active map excludes reclaimed Residence and Queue has no local Home",()=>{
  assert.match(src,/status!=="reclaimed"/);
  assert.match(src,/currentResidenceId===id&&!player\(\)\?\.queuePosition/);
  assert.match(src,/activeOnMap/);
  assert.match(src,/currentNavigationAllowed/);
});

test("Stage2 to Stage3 notices use authoritative transition kind",()=>{
  assert.match(src,/t\.kind==="adult_move"/);
  assert.match(src,/ĐÃ TRƯỞNG THÀNH — CHUYỂN RA Ở RIÊNG/);
  assert.match(src,/ĐÃ TRƯỞNG THÀNH — TIẾP QUẢN NHÀ HIỆN TẠI/);
  assert.doesNotMatch(src,/ageStage\s*[>=<]/);
});

test("Turn Track focuses authoritative Residence instead of opening profile",()=>{
  assert.match(src,/\.turn-token\[data-profile\]/);
  assert.match(src,/focusResidence\(residenceId\)/);
  assert.match(src,/stopPropagation\(\)/);
});

test("Residence coordinates are presentation coordinates from server snapshot",()=>{
  assert.match(src,/r\.coordinates\.x/);
  assert.match(src,/r\.coordinates\.y/);
  assert.doesNotMatch(src,/Math\.random/);
  assert.doesNotMatch(src,/distance/i);
});

test("Residence overview protects private economy and uses occupant family references",()=>{
  for(const token of["roleKeys","parentCharacterIds","spouseCharacterIds","childCharacterIds"])assert.match(src,new RegExp(token));
  assert.match(src,/isLocal\?latest\.player\?\.financial:null/);
  assert.match(src,/Thông tin kinh tế chi tiết của cư dân khác không được hiển thị/);
});

test("Chronicle uses structured Residence transitions and reclaimed history",()=>{
  assert.match(src,/residenceTransitions/);
  assert.match(src,/reclaimedRound/);
  assert.doesNotMatch(src,/chronology/);
});

test("production index loads Residence CSS and runtime before main",()=>{
  assert.match(html,/residence-ui-v1\.css/);
  const residence=html.indexOf("dist/residence-ui-v1.js"),main=html.indexOf("dist/main.js");
  assert.ok(residence>=0&&main>residence);
});
