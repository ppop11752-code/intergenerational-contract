import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, extname } from 'node:path';

const out = 'qa/approved-ui-v1-artifacts';
await mkdir(out, { recursive: true });
const result = { checks: [], startedAt: new Date().toISOString() };
const check = (name, ok, detail = '') => {
  result.checks.push({ name, ok, detail });
  if (!ok) throw new Error(`${name}: ${detail}`);
};

const html = `<!doctype html><meta charset="utf-8"><body>
<header class="world-hud"><span><small>mandatory</small><b data-timer>5s</b></span></header>
<button data-panel="chronicle">NIÊN SỬ</button>
<section class="history-sheet"></section>
<div class="status-grid"><button data-action='{"type":"status:set","status":"middle"}'></button></div>
<section class="approved-market">
  <article class="resource-card"><small>TÁI TẠO</small><h3>LOW</h3><div class="qty-controls"><button>-</button><button>+</button><button>1</button><button>MAX</button><input value="1"><button data-submit>MUA</button></div></article>
  <article class="resource-card"><small>KHÔNG TÁI TẠO</small><h3>HIGH</h3><div class="qty-controls"><button>-</button><button>+</button><button>1</button><button>MAX</button><input value="1"><button data-submit>MUA</button></div></article>
</section>
<section class="approved-recovery"><article class="recovery-card"><h3>LOW</h3><div class="qty-controls"><button>-</button><button>+</button><button>MAX</button><input value="1"></div><button class="recovery-row" data-recover="low">PHỤC HỒI</button></article></section>
<section class="approved-support"><article class="support-card"><div class="qty-controls"><button>-</button><button>+</button><button>MAX</button><input value="1"><button data-send>GỬI</button></div></article></section>
<section class="feature-sheet" data-tutorial-zone="birth"><h2>SINH CON</h2><p></p><button data-action='{"type":"child:birth"}'>ĐỀ XUẤT</button></section>
<nav class="approved-voluntary"><button data-panel="market">THỊ TRƯỜNG</button><button data-panel="recovery">PHỤC HỒI</button><button data-panel="support">CHU CẤP</button><button data-panel="birth">SINH CON</button></nav>
<section class="queue-card"></section>
<section class="world-event-banner"><h3 class="event-name">Drought</h3></section>
<section class="world-map"><button class="landmark home">HOME</button></section>
<section class="approved-minimap"><div class="mini-map"></div></section>
<aside class="turn-track"><button class="turn-token" data-profile="c1">P1</button></aside>
<script type="module" src="/dist/residence-ui-v1.js"></script>
<script type="module" src="/dist/resolved-ui-contracts.js"></script>
</body>`;

const server = createServer(async (req, res) => {
  try {
    if (req.url === '/') {
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      res.end(html);
      return;
    }
    if (req.url?.startsWith('/dist/')) {
      const path = join(process.cwd(), 'client', req.url.slice(1));
      const body = await readFile(path);
      res.writeHead(200, { 'content-type': extname(path) === '.js' ? 'text/javascript; charset=utf-8' : 'text/plain; charset=utf-8' });
      res.end(body);
      return;
    }
    res.writeHead(404);
    res.end();
  } catch {
    res.writeHead(500);
    res.end();
  }
});
await new Promise(resolve => server.listen(4178, '127.0.0.1', resolve));

const snapshot = {
  room: {
    code: 'ABC123', started: true, hostPlayerId: 'p1',
    players: [{ playerId: 'p1', displayName: 'An', host: true, connected: true, activeCharacterId: 'c1', aiTakeoverCharacterId: null, queuePosition: null }],
    game: {
      round: 4, year: 30, phase: 'mandatory',
      characters: [
        { characterId: 'c1', ownerId: 'p1', npc: false, immigrant: false, ageLabel: 'Lao động', status: 'middle', currentResidenceId: 'r1' },
        { characterId: 'c2', ownerId: null, npc: true, immigrant: true, ageLabel: 'Lao động', status: 'poor', currentResidenceId: 'r2' }
      ],
      residenceDirectory: {
        r1: { residenceId: 'r1', status: 'occupied', origin: 'founder', createdRound: 1, coordinates: { x: .3, y: .4 }, activeOnMap: true, currentNavigationAllowed: true, emptySinceRound: null, abandonedRound: null, reclaimedRound: null, parentResidenceIds: [], occupants: [{ characterId: 'c1', roleKeys: ['parent'], parentCharacterIds: [], spouseCharacterIds: [], childCharacterIds: [] }] },
        r2: { residenceId: 'r2', status: 'occupied', origin: 'immigrant', createdRound: 4, coordinates: { x: .7, y: .6 }, activeOnMap: true, currentNavigationAllowed: true, emptySinceRound: null, abandonedRound: null, reclaimedRound: null, parentResidenceIds: [], occupants: [{ characterId: 'c2', roleKeys: [], parentCharacterIds: [], spouseCharacterIds: [], childCharacterIds: [] }] }
      },
      activeMapResidenceIds: ['r1', 'r2'],
      residenceTransitions: [{ id: 'rt1', round: 4, year: 30, characterId: 'c1', kind: 'adult_move', fromResidenceId: 'r0', toResidenceId: 'r1' }],
      worldEvent: { id: 'we1', round: 4, year: 30, name: 'Drought', chronicleEntryId: 'chron-we1', impacts: [{ system: 'RESOURCE', labelKey: 'EVENT_RENEWABLE_POOL', value: 80, delta: -20, unit: 'absolute' }] },
      worldEventOccurrences: [{ id: 'we1', round: 4, year: 30, name: 'Drought', chronicleEntryId: 'chron-we1', impacts: [{ system: 'RESOURCE', labelKey: 'EVENT_RENEWABLE_POOL', value: 80, delta: -20, unit: 'absolute' }] }]
    }
  },
  player: {
    playerId: 'p1', queuePosition: null, character: { id: 'c1' }, currentResidenceId: 'r1',
    financial: { cash: 100, householdAssets: 150 },
    statusQuote: { cards: [{ status: 'middle', fee: 20, personsCharged: 1, affordable: true, unavailableReason: null }], nobleCompetition: {} },
    marketQuotes: [
      { resourceType: 'renewable', grade: 'low', purchasableMax: 7, unavailableReason: null },
      { resourceType: 'nonrenewable', grade: 'high', purchasableMax: null, unavailableReason: 'MARKET_GRADE_LOCKED' }
    ],
    recoveryQuotes: [{ grade: 'low', acceptedMax: 4, unavailableReason: null }],
    eligibleSupportTargets: [{ characterId: 'c2', transferableMax: 13, unavailableReason: null }],
    supportUnavailableReason: null,
    birthQuote: { maxProposals: 2, canInitiate: false, unavailableReason: 'BIRTH_REQUIRES_COUPLE', promotionalThirdSlot: false, slots: [{ index: 1, status: 'available', available: false, unavailableReason: 'BIRTH_REQUIRES_COUPLE' }] },
    recentLifecycleResults: [
      { id: 'lr1', type: 'elderly_medical', round: 4, year: 30, medicalPaid: 8, medicalDue: 10 },
      { id: 'lr2', type: 'inheritance', round: 4, year: 30, estateTotal: 120, governmentTransfer: 20, beneficiaries: [{ characterId: 'c1', amount: 100 }] }
    ]
  }
};

const browser = await chromium.launch({ headless: true });
try {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:4178/');
  await page.waitForTimeout(300);
  await page.evaluate(x => window.dispatchEvent(new CustomEvent('ic:snapshot', { detail: x })), snapshot);
  await page.waitForTimeout(400);

  check('Status authoritative fee', (await page.locator('.server-status-quote').textContent())?.includes('20'));
  await page.locator('.approved-market .resource-card').first().locator('button').nth(3).click();
  check('Market MAX', (await page.locator('.approved-market .resource-card').first().locator('input').inputValue()) === '7');
  const locked = page.locator('.approved-market .resource-card').nth(1);
  const lockedMax = locked.locator('.qty-controls button').nth(3);
  const reasonCount = await locked.locator(':scope > .authoritative-reason').count();
  const maxTitle = await lockedMax.getAttribute('title');
  const maxDisabled = await lockedMax.isDisabled();
  check('Market reason', reasonCount === 1 && maxDisabled && !!maxTitle, JSON.stringify({ reasonCount, maxTitle, maxDisabled }));

  await page.locator('.approved-recovery button').nth(2).click();
  check('Recovery MAX', (await page.locator('.approved-recovery input').inputValue()) === '4');
  await page.locator('.approved-support button').nth(2).click();
  check('Support MAX', (await page.locator('.approved-support input').inputValue()) === '13');
  check('Birth reason', (await page.locator('[data-tutorial-zone="birth"] .authoritative-reason').innerText()).includes('hai vợ/chồng'));

  const lifecycle = await page.locator('.lifecycle-result-stack').innerText();
  check('Structured lifecycle', lifecycle.includes('Y TẾ CAO TUỔI') && lifecycle.includes('DI SẢN 120') && lifecycle.includes('Chuyển Chính phủ 20'), lifecycle);
  check('Residence contract', await page.locator('.residence-map-marker').count() === 2);

  const banner = page.locator('.world-event-banner');
  const detail = banner.locator('.world-event-banner-detail');
  check('World Event direct banner detail', await detail.count() === 1);
  check('World Event no legacy detail surface', await page.locator('.event-detail-open,.world-event-detail-panel').count() === 0 && !((await page.locator('body').innerText()).includes('CHI TIẾT')));
  const bannerText = await banner.innerText();
  check('World Event authoritative impact row', bannerText.includes('Pool tái tạo') && bannerText.includes('80') && bannerText.includes('-20'), bannerText);
  check('World Event exact Chronicle link present', await detail.locator('[data-event-chronicle]').count() === 1);
  await detail.locator('[data-event-chronicle]').click();
  await page.waitForTimeout(100);
  check('Chronicle exact structured event', await page.locator('[data-world-event-id="we1"][data-chronicle-entry-id="chron-we1"]').count() === 1);
  check('Chronicle exact focus', await page.locator('[data-world-event-id="we1"].focused-event').count() === 1);

  const n1 = await page.locator('*').count();
  for (let i = 0; i < 8; i++) {
    await page.evaluate(x => window.dispatchEvent(new CustomEvent('ic:snapshot', { detail: x })), snapshot);
  }
  await page.waitForTimeout(200);
  const n2 = await page.locator('*').count();
  check('No render loop', n2 - n1 < 8, `${n1}->${n2}`);

  await page.screenshot({ path: `${out}/fixture.png`, fullPage: true });
  await context.close();
} catch (error) {
  result.error = String(error);
  throw error;
} finally {
  result.finishedAt = new Date().toISOString();
  await writeFile(`${out}/fixture-results.json`, JSON.stringify(result, null, 2));
  await browser.close();
  server.close();
}
