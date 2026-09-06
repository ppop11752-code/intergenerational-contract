import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";

const liveUrl = process.env.LIVE_URL || "https://intergenerational-contract.onrender.com";
const outDir = "qa/e2e-artifacts";
await mkdir(outDir, { recursive: true });

const results = { liveUrl, startedAt: new Date().toISOString(), checks: [], notes: [] };
const check = (name, ok, detail = "") => {
  results.checks.push({ name, ok, detail });
  if (!ok) throw new Error(`${name}: ${detail}`);
};
const timerSeconds = (text) => {
  const m = String(text || "").match(/(\d+)s/);
  return m ? Number(m[1]) : null;
};

const browser = await chromium.launch({ headless: true });
try {
  const tutorialCtx = await browser.newContext();
  const page = await tutorialCtx.newPage();
  await page.goto(liveUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await page.waitForSelector("h1", { timeout: 30_000 });
  check("live page load", (await page.locator("h1").textContent())?.includes("INTERGENERATIONAL CONTRACT"), "landing heading visible");

  const socketConnected = await page.evaluate(() => new Promise((resolve) => {
    const s = window.io(undefined, { transports: ["websocket", "polling"] });
    const done = (value) => { try { s.disconnect(); } catch {} resolve(value); };
    const t = setTimeout(() => done(false), 15_000);
    s.on("connect", () => { clearTimeout(t); done(true); });
    s.on("connect_error", () => { clearTimeout(t); done(false); });
  }));
  check("same-origin Socket.IO connection", socketConnected === true, "Socket.IO connected from deployed origin");

  await page.fill("#name", "E2E Tutorial");
  await page.click("#tutorial");
  await page.waitForSelector("header", { timeout: 30_000 });
  await page.waitForSelector(".coach", { timeout: 30_000 });
  const coachText = await page.locator(".coach").textContent();
  check("Tutorial room entry", coachText?.includes("T0") === true, "T0 coach visible after tutorial entry");
  await page.screenshot({ path: `${outDir}/tutorial-entry.png`, fullPage: true });

  const t0 = page.locator('[data-seen="T0"]');
  if (await t0.count()) await t0.click();
  const helpButton = page.locator("[data-help]").first();
  await helpButton.waitFor({ timeout: 10_000 });
  const timerBeforeText = await page.locator("[data-timer]").first().textContent();
  const timerBefore = timerSeconds(timerBeforeText);
  await helpButton.click();
  await page.waitForSelector("#helprecap", { timeout: 10_000 });
  await page.waitForTimeout(1_500);
  const timerAfterText = await page.locator("[data-timer]").first().textContent();
  const timerAfter = timerSeconds(timerAfterText);
  const countdownContinued = timerBefore === null || timerAfter === null ? false : timerAfter <= timerBefore && (timerBefore <= 1 || timerAfter < timerBefore);
  check("help recap is non-blocking", countdownContinued, `timer ${timerBeforeText} -> ${timerAfterText}`);
  await page.screenshot({ path: `${outDir}/help-recap.png`, fullPage: true });
  const closeHelp = page.locator("[data-close]");
  if (await closeHelp.count()) await closeHelp.click();

  await page.waitForFunction(() => document.body.textContent?.includes("STATUS"), null, { timeout: 30_000 });
  const poor = page.locator('button[data-action*=\"status:set\"]').first();
  if (await poor.count()) await poor.click();
  await page.waitForFunction(() => document.body.textContent?.includes("VOLUNTARY"), null, { timeout: 20_000 });
  await page.locator('[data-panel="birth"]').first().click();
  const birthSection = page.locator("section").filter({ hasText: "SINH CON" }).first();
  await birthSection.waitFor({ timeout: 10_000 });
  const birthText = await birthSection.textContent();
  const birthButtonCount = await birthSection.locator('button[data-action*="child:birth"]').count();
  check("authoritative Birth UI is gated", birthButtonCount === 1 || birthText?.includes("chưa khả dụng") === true, `button=${birthButtonCount}; text=${birthText}`);
  results.notes.push(birthButtonCount === 1 ? "Observed canInitiateBirth=true UI state in live Tutorial game." : "Observed canInitiateBirth=false UI state in live Tutorial game; deterministic true-state progression remains for QA/manual evidence.");
  await page.screenshot({ path: `${outDir}/birth-gating.png`, fullPage: true });

  const hostCtx = await browser.newContext();
  const host = await hostCtx.newPage();
  await host.goto(liveUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await host.waitForSelector("#app", { timeout: 30_000 });
  const roomCode = await host.evaluate(() => new Promise((resolve, reject) => {
    const s = window.io(undefined, { transports: ["websocket", "polling"] });
    window.__e2eHostSocket = s;
    const timeout = setTimeout(() => reject(new Error("room:create timeout")), 15_000);
    s.on("connect", () => {
      s.emit("room:create", { playerId: crypto.randomUUID(), displayName: "E2E Host" }, (r) => {
        clearTimeout(timeout);
        if (!r?.ok) reject(new Error(r?.error || "room:create failed"));
        else resolve(r.code);
      });
    });
    s.on("connect_error", (e) => { clearTimeout(timeout); reject(e); });
  }));

  const normalCtx = await browser.newContext();
  const normal = await normalCtx.newPage();
  await normal.goto(liveUrl, { waitUntil: "domcontentloaded", timeout: 60_000 });
  await normal.fill("#name", "E2E Normal");
  await normal.fill("#code", roomCode);
  await normal.click("#join");
  await normal.waitForSelector("header", { timeout: 30_000 });
  const normalCoachCount = await normal.locator(".coach").count();
  check("normal multiplayer has no Tutorial overlay", normalCoachCount === 0, `coach count=${normalCoachCount}`);
  await normal.screenshot({ path: `${outDir}/normal-room.png`, fullPage: true });

  results.notes.push("Full deterministic T0–T11 progression is intentionally not forced by mutating gameplay/server semantics; this runner covers network/browser integration and records the remaining progression as independent QA scope.");
  await host.evaluate(() => { try { window.__e2eHostSocket?.disconnect(); } catch {} });
  await hostCtx.close();
  await normalCtx.close();
  await tutorialCtx.close();
} catch (error) {
  results.error = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  throw error;
} finally {
  results.finishedAt = new Date().toISOString();
  await writeFile(`${outDir}/results.json`, JSON.stringify(results, null, 2));
  await browser.close();
}
