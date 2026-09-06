import assert from 'node:assert/strict';
import {GameEngine} from '../dist/engine.js';
import {AuthoritativeRoom} from '../dist/authoritative-room.js';
import {statusFee} from '../dist/economy.js';

let passed=0;
function test(name,fn){
  try{fn();console.log(`✓ ${name}`);passed++}
  catch(e){console.error(`✗ ${name}`);throw e}
}
function chars(g){return Object.values(g.state.characters)}
function owned(g,id){return g.alive().find(c=>c.ownerId===id)}
function approx(a,b,eps=1e-6){assert.ok(Math.abs(a-b)<=eps,`${a} != ${b}`)}
function prepTwoMarried(){
  const g=new GameEngine();g.setRandomSource(()=>.99);g.joinPlayer('A');g.joinPlayer('B');
  const a=owned(g,'A'),b=owned(g,'B');a.ageStage=4;b.ageStage=4;g.marry(a,b);return{g,a,b,h:g.household(a)};
}

test('room: host can start solo and server auto-fills NPC founders to 10',()=>{
  const r=new AuthoritativeRoom('ABC123','P1','Host','s1');
  assert.equal(r.start('P1',()=>.5).ok,true);
  assert.equal(r.engine.alive().length,10);assert.equal(r.initialNpcCount,9);
});

test('room: >10 humans use unique founder draw and excess enter waiting queue',()=>{
  const r=new AuthoritativeRoom('ABC123','P1','Host','s1');
  for(let i=2;i<=12;i++)assert.equal(r.join(`P${i}`,`P${i}`,`s${i}`).ok,true);
  assert.equal(r.start('P1',()=>.731).ok,true);
  assert.equal(r.founderDraw.length,12);assert.equal(new Set(r.founderDraw.map(x=>x.card)).size,12);
  assert.equal(r.founderDraw.filter(x=>x.founder).length,10);assert.equal(r.engine.state.waitingQueue.length,2);
});

test('room: late join after start goes to end of Waiting Queue instead of rejection',()=>{
  const r=new AuthoritativeRoom('ABC123','P1','Host','s1');r.start('P1',()=>.5);
  const res=r.join('LATE','Late','s2');assert.equal(res.ok,true);assert.equal(res.queuePosition,1);assert.deepEqual(r.engine.state.waitingQueue,['LATE']);
});

test('Household Total Assets includes funded ASXH',()=>{
  const g=new GameEngine();g.joinPlayer('A');const a=owned(g,'A'),h=g.household(a);h.sharedCash=100;g.state.socialSecurity.personalBalances[a.id]=50;approx(g.householdAssets(h),150);
});

test('resource lot is produced only by its buyer and child purchase receives x1.2 when buyer becomes worker',()=>{
  const {g,a,b,h}=prepTwoMarried();g.state.debt=0;g.state.round=2;a.ageStage=2;b.ageStage=4;h.sharedCash=0;h.sharedResources.low=1;
  h.investmentLots=[{type:'renewable',grade:'low',units:1,costBasis:10,purchaseRound:1,buyerCharacterId:a.id,purchaseAgeStage:2}];
  const before=h.sharedCash;g.convertHouseholdResourcesToCash(h);assert.equal(h.investmentLots.length,1);assert.equal(h.sharedCash,before,'worker spouse must not produce child buyer lot');
  a.ageStage=3;const expected=g.marketPrice('low','renewable')*(1+g.resourceInterest('renewable','low'))*1.2*g.economicIncomeFactor().factor;g.convertHouseholdResourcesToCash(h);assert.equal(h.investmentLots.length,0);approx(h.sharedCash,expected);
});

test('epidemic mandatory medical fee is charged per living character',()=>{
  const {g,a,h}=prepTwoMarried();g.state.epidemicMedicalCostPerCharacter=10;const b=g.mandatoryBreakdown(a,0);approx(b.medical,20);
});

test('married Status purchase costs 2x and spouse #2 skips Mandatory/Status',()=>{
  const {g,h}=prepTwoMarried();h.sharedCash=1000;g.startRound();g.buildTurnOrder(()=>.8);g.beginMandatoryPhase();assert.equal(g.phase(),'mandatory');const rep=g.currentTurnCharacter();assert.equal(h.representativeCharacterId,rep.id);g.resolveCurrentMandatory();assert.equal(g.phase(),'status');const one=statusFee('middle',g.state.roundAverageAssetsSnapshot,g.state.priceIndex,g.cfg);g.setStatus(rep,'middle');approx(h.pendingStatusPaid,one*2);g.completeVoluntaryTurn();assert.equal(g.phase(),'voluntary','second spouse must enter Voluntary directly');assert.notEqual(g.currentTurnCharacter().id,rep.id);
});

test('accepted marriage does not merge immediately and merges only on end-round settlement',()=>{
  const g=new GameEngine();g.joinPlayer('A');g.joinPlayer('B');const a=owned(g,'A'),b=owned(g,'B');a.ageStage=4;b.ageStage=4;const ha=a.householdId,hb=b.householdId;const p=g.proposeMarriage(a,b);g.respondMarriage(p.id,true);assert.equal(a.householdId,ha);assert.equal(b.householdId,hb);g.executeAcceptedMarriages();assert.equal(a.householdId,b.householdId);
});

test('birth proposal is delayed and accepted newborn consumes Waiting Queue in queue order',()=>{
  const {g,a,b,h}=prepTwoMarried();g.registerQueuedPlayer('Q1');g.state.round=1;g.state.eventBirthLimit=2;h.representativeCharacterId=a.id;g.state.turnState.phase='voluntary';g.state.turnState.entries=[{characterId:a.id,householdId:h.id,statusRank:0,card:9,order:0},{characterId:b.id,householdId:h.id,statusRank:0,card:8,order:1}];g.state.turnState.activeIndex=0;
  const p=g.attemptBirth(h);assert.ok(p);assert.equal(h.childrenIds.length,0);g.respondBirthProposal(b,p.id,true);g.executeAcceptedBirths();assert.equal(h.childrenIds.length,1);const child=g.state.characters[h.childrenIds[0]];assert.equal(child.ownerId,'Q1');assert.equal(g.state.waitingQueue.length,0);assert.equal(g.state.histories.Q1.activeRounds,0);
});

test('Noble cap counts Characters; losing applicant falls to Middle and receives difference refund',()=>{
  const g=new GameEngine();for(let i=1;i<=10;i++)g.joinPlayer(`P${i}`);g.state.round=1;g.state.roundAverageAssetsSnapshot=320;g.state.priceIndex=1;
  const c1=owned(g,'P1'),c2=owned(g,'P2'),h1=g.household(c1),h2=g.household(c2);h1.sharedCash=500;h2.sharedCash=300;h1.pendingStatus='noble';h2.pendingStatus='noble';const nf=statusFee('noble',320,1,g.cfg),mf=statusFee('middle',320,1,g.cfg);h1.pendingStatusPaid=nf;h2.pendingStatusPaid=nf;g.state.statusPurchases[h1.id]={householdId:h1.id,requested:'noble',paid:nf,purchaserCharacterId:c1.id,round:1};g.state.statusPurchases[h2.id]={householdId:h2.id,requested:'noble',paid:nf,purchaserCharacterId:c2.id,round:1};
  g.state.turnState.entries=chars(g).filter(c=>c.alive).map((c,i)=>({characterId:c.id,householdId:c.householdId,statusRank:0,card:100-i,order:i}));const cash2=h2.sharedCash;g.allocateNobleSlots();assert.equal(h1.status,'noble');assert.equal(h2.status,'middle');approx(h2.sharedCash,cash2+nf-mf);approx(g.state.statusPurchases[h2.id].refund,nf-mf);
});

test('inheritance: surviving spouse keeps baseline half and shares deceased half with two living children',()=>{
  const {g,a,b,h}=prepTwoMarried();const c1=g.createNpc(h.id),c2=g.createNpc(h.id);h.childrenIds=[c1.id,c2.id];a.childrenIds=[c1.id,c2.id];b.childrenIds=[c1.id,c2.id];h.sharedCash=240;g.state.socialSecurity.personalBalances[a.id]=0;g.state.socialSecurity.personalBalances[b.id]=0;const ch1=g.household(c1),ch2=g.household(c2);ch1.sharedCash=0;ch2.sharedCash=0;g.die(b,'test');approx(h.sharedCash,160);approx(ch1.sharedCash,40);approx(ch2.sharedCash,40);
});

test('inheritance: surviving spouse funded ASXH stays locked and is excluded from divisible estate',()=>{
  const {g,a,b,h}=prepTwoMarried();const child=g.createNpc(h.id);h.childrenIds=[child.id];a.childrenIds=[child.id];b.childrenIds=[child.id];h.sharedCash=0;g.state.socialSecurity.personalBalances[a.id]=200;g.state.socialSecurity.personalBalances[b.id]=0;const ch=g.household(child);ch.sharedCash=0;g.die(b,'test');approx(h.sharedCash,0);approx(g.state.socialSecurity.personalBalances[a.id],200);approx(ch.sharedCash,0);approx(g.householdAssets(h),200);
});

test('inheritance: deceased funded ASXH is fully included while survivor funded ASXH remains locked',()=>{
  const {g,a,b,h}=prepTwoMarried();const child=g.createNpc(h.id);h.childrenIds=[child.id];a.childrenIds=[child.id];b.childrenIds=[child.id];h.sharedCash=100;g.state.socialSecurity.personalBalances[a.id]=200;g.state.socialSecurity.personalBalances[b.id]=20;const ch=g.household(child);ch.sharedCash=0;g.die(b,'test');
  // Estate = 50% of divisible joint assets (50) + deceased ASXH (20) = 70; spouse + child split 35 each.
  approx(h.sharedCash,85);approx(g.state.socialSecurity.personalBalances[a.id],200);approx(ch.sharedCash,35);approx(g.householdAssets(h),285);
});

test('inheritance: no spouse/no living child transfers estate to Government Budget',()=>{
  const g=new GameEngine();g.joinPlayer('A');const a=owned(g,'A'),h=g.household(a);h.sharedCash=100;g.state.debt=0;const gb=g.state.government.budget;g.die(a,'test');approx(g.state.government.budget,gb+100);assert.equal(h.active,false);
});

test('bankruptcy estate preserves funded ASXH and sends it to Government when there are no heirs',()=>{
  const g=new GameEngine();g.joinPlayer('A');const a=owned(g,'A'),h=g.household(a);h.sharedCash=0;g.state.socialSecurity.personalBalances[a.id]=50;const gb=g.state.government.budget;g.bankruptHousehold(h);approx(g.state.government.budget,gb+50);assert.equal(g.state.socialSecurity.personalBalances[a.id],0);
});

test('disconnect closes Human scoring for current round and converts character permanently to NPC',()=>{
  const g=new GameEngine();g.joinPlayer('A');const a=owned(g,'A'),h=g.household(a);g.state.round=1;h.sharedCash=200;const detached=g.detachPlayerToNpc('A','moderate');assert.equal(detached.id,a.id);assert.equal(detached.npc,true);assert.equal(detached.ownerId,null);assert.equal(g.state.histories.A.activeRounds,1);approx(g.state.histories.A.cumulativeAssets,g.householdAssets(h));
});

test('married scoring records only 50% of Household Total Assets per Human spouse',()=>{
  const {g,a,b,h}=prepTwoMarried();g.state.round=1;h.sharedCash=240;g.state.turnState.entries=[{characterId:a.id,householdId:h.id,statusRank:0,card:10,order:0},{characterId:b.id,householdId:h.id,statusRank:0,card:9,order:1}];g.scoreActivePlayersForRound();approx(g.state.histories.A.cumulativeAssets,120);approx(g.state.histories.B.cumulativeAssets,120);assert.equal(g.state.histories.A.activeRounds,1);assert.equal(g.state.histories.B.activeRounds,1);
});


test('Recovery requires no owned resource and applies as pending renewable recovery',()=>{
  const g=new GameEngine();g.joinPlayer('A');const a=owned(g,'A'),h=g.household(a);g.state.round=1;g.state.turnState.phase='voluntary';g.state.spendingLimitByCharacter[a.id]=1000;g.state.pool.low=100;h.sharedCash=1000;assert.equal(h.sharedResources.low,0);const cost=g.investRecovery(a,'low',1);assert.ok(cost>0);assert.equal(g.state.pendingRecovery.low,1);assert.equal(h.sharedResources.low,0);
});

test('fixed married spending cap uses start-of-round snapshot and shared costs are split 50/50',()=>{
  const {g,a,b,h}=prepTwoMarried();h.roundStartAssets=200;g.state.spendingLimitByCharacter[a.id]=100;g.state.spendingLimitByCharacter[b.id]=100;g.chargeSharedCostToQuota(h,40);approx(g.state.sharedQuotaChargeByCharacter[a.id],20);approx(g.state.sharedQuotaChargeByCharacter[b.id],20);h.sharedCash=1000;g.state.turnState.phase='voluntary';assert.throws(()=>g.voluntaryFamilySupport(a,b,81),/support limited|50%|direct/); // spouse is not a legal support recipient
  // The limit itself remains the original 100 despite later cash growth.
  assert.equal(g.state.spendingLimitByCharacter[a.id],100);
});

test('Status fee refund occurs before estate when one spouse dies before activation',()=>{
  const {g,a,b,h}=prepTwoMarried();g.state.round=1;g.state.roundAverageAssetsSnapshot=320;g.state.priceIndex=1;const one=statusFee('middle',320,1,g.cfg);h.pendingStatus='middle';h.pendingStatusPaid=one*2;h.pendingStatusPurchaserId=a.id;g.state.statusPurchases[h.id]={householdId:h.id,requested:'middle',paid:one*2,purchaserCharacterId:a.id,round:1};h.sharedCash=100;g.die(b,'test');approx(h.pendingStatusPaid,one);approx(g.state.statusPurchases[h.id].refund,one);
});

test('Conditional filial support enforces one 6% worker-household cap across both spouses parents',()=>{
  const {g,a,b,h}=prepTwoMarried();g.state.round=1;h.sharedCash=100;g.state.realizedNetIncomeByHousehold[h.id]=100;g.state.realizedNetIncomeByCharacter[a.id]=50;g.state.realizedNetIncomeByCharacter[b.id]=50;
  const p1=g.createNpc(null),p2=g.createNpc(null);p1.ageStage=8;p2.ageStage=8;a.parentsHouseholdId=p1.householdId;b.parentsHouseholdId=p2.householdId;g.state.socialSecurity.personalBalances[p1.id]=10000;g.state.socialSecurity.personalBalances[p2.id]=10000;g.state.pensionIncomeByHousehold[p1.householdId]=0;g.state.pensionIncomeByHousehold[p2.householdId]=0;
  g.prefundParentSupportBeforeMandatory();approx(g.state.prepaidParentSupportByWorkerHousehold[h.id],6);
});

test('Grief Fee is scheduled for each living parent when a child dies',()=>{
  const {g,a,b,h}=prepTwoMarried();const child=g.createNpc(h.id);h.childrenIds=[child.id];a.childrenIds=[child.id];b.childrenIds=[child.id];child.parentsHouseholdId=h.id;g.die(child,'test');assert.equal(a.griefFeeDue,1);assert.equal(b.griefFeeDue,1);
});

test('elderly medical fee never causes bankruptcy by itself',()=>{
  const g=new GameEngine();g.joinPlayer('A');const a=owned(g,'A'),h=g.household(a);a.ageStage=12;h.sharedCash=0;g.state.round=1;g.setRandomSource(()=>.5);const before=g.state.telemetry.bankruptcies;g.resolveElderlyMedicalAndMortality();assert.equal(g.state.telemetry.bankruptcies,before);assert.equal(a.alive,false,'Stage 12 mortality remains terminal');
});

test('married Noble household needs two character slots and cannot consume a single remaining slot',()=>{
  const g=new GameEngine();for(let i=1;i<=10;i++)g.joinPlayer(`P${i}`);const a=owned(g,'P1'),b=owned(g,'P2');a.ageStage=b.ageStage=4;g.marry(a,b);const h=g.household(a);g.state.round=1;g.state.roundAverageAssetsSnapshot=320;const nf=statusFee('noble',320,1,g.cfg)*2,mf=statusFee('middle',320,1,g.cfg)*2;h.pendingStatus='noble';h.pendingStatusPaid=nf;h.sharedCash=500;g.state.statusPurchases[h.id]={householdId:h.id,requested:'noble',paid:nf,purchaserCharacterId:a.id,round:1};g.state.turnState.entries=g.alive().map((c,i)=>({characterId:c.id,householdId:c.householdId,statusRank:0,card:100-i,order:i}));g.allocateNobleSlots();assert.equal(h.status,'middle');approx(g.state.statusPurchases[h.id].refund,nf-mf);
});


test('marriage merge reconciles two pending Status purchases into one doubled Household purchase record',()=>{
  const g=new GameEngine();g.joinPlayer('A');g.joinPlayer('B');const a=owned(g,'A'),b=owned(g,'B');a.ageStage=b.ageStage=4;g.state.round=1;g.state.roundAverageAssetsSnapshot=320;g.state.priceIndex=1;const ha=g.household(a),hb=g.household(b);const mf=statusFee('middle',320,1,g.cfg),nf=statusFee('noble',320,1,g.cfg);ha.pendingStatus='noble';ha.pendingStatusPaid=nf;ha.pendingStatusPurchaserId=a.id;ha.sharedCash-=nf;hb.pendingStatus='middle';hb.pendingStatusPaid=mf;hb.pendingStatusPurchaserId=b.id;hb.sharedCash-=mf;g.state.statusPurchases[ha.id]={householdId:ha.id,requested:'noble',paid:nf,purchaserCharacterId:a.id,round:1};g.state.statusPurchases[hb.id]={householdId:hb.id,requested:'middle',paid:mf,purchaserCharacterId:b.id,round:1};const oldHb=hb.id;g.marry(a,b);const h=g.household(a);assert.equal(h.pendingStatus,'noble');approx(h.pendingStatusPaid,nf*2);assert.equal(g.state.statusPurchases[oldHb],undefined);assert.equal(g.state.statusPurchases[h.id].requested,'noble');approx(g.state.statusPurchases[h.id].paid,nf*2);
});

test('Noble downgrade refund reduces shared quota charge to actual Middle cost',()=>{
  const {g,a,b,h}=prepTwoMarried();g.state.round=1;g.state.roundAverageAssetsSnapshot=320;g.state.priceIndex=1;const nf=statusFee('noble',320,1,g.cfg)*2,mf=statusFee('middle',320,1,g.cfg)*2;h.pendingStatus='noble';h.pendingStatusPaid=nf;g.state.statusPurchases[h.id]={householdId:h.id,requested:'noble',paid:nf,purchaserCharacterId:a.id,round:1};g.state.sharedQuotaChargeByCharacter[a.id]=nf/2;g.state.sharedQuotaChargeByCharacter[b.id]=nf/2;h.sharedQuotaCharge=nf; // make population 10 so only one slot; this couple needs two
  for(let i=0;i<8;i++){const x=g.createNpc(null);x.ageStage=4}
  g.state.turnState.entries=g.alive().map((c,i)=>({characterId:c.id,householdId:c.householdId,statusRank:0,card:100-i,order:i}));g.allocateNobleSlots();assert.equal(h.status,'middle');approx(g.state.sharedQuotaChargeByCharacter[a.id],mf/2);approx(g.state.sharedQuotaChargeByCharacter[b.id],mf/2);approx(h.sharedQuotaCharge,mf);
});



test('room timeout pipeline: Mandatory presentation -> Status -> Voluntary -> next turn',()=>{
  const r=new AuthoritativeRoom('TMO123','P1','Host','s1');assert.equal(r.start('P1',()=>.5).ok,true);const e=r.engine;assert.ok(e);assert.equal(r.phaseDeadlineKind,'mandatory');
  r.phaseDeadlineAt=Date.now()-1;assert.equal(r.enforceTurnTimeout(()=>.5),true);assert.equal(e.phase(),'status');assert.equal(r.phaseDeadlineKind,'status');
  r.phaseDeadlineAt=Date.now()-1;assert.equal(r.enforceTurnTimeout(()=>.5),true);assert.equal(e.phase(),'voluntary');assert.equal(r.phaseDeadlineKind,'voluntary');
  const before=e.currentTurnCharacter()?.id,beforeRound=e.state.round;r.phaseDeadlineAt=Date.now()-1;assert.equal(r.enforceTurnTimeout(()=>.5),true);assert.ok(e.state.round>beforeRound||e.currentTurnCharacter()?.id!==before,'Voluntary timeout must advance beyond the current turn');
});

test('marriage can be answered during own turn but cannot be sent during sender own turn',()=>{
  const g=new GameEngine();g.joinPlayer('A');g.joinPlayer('B');const a=owned(g,'A'),b=owned(g,'B');a.ageStage=b.ageStage=4;g.state.round=1;g.state.turnState.phase='voluntary';g.state.turnState.entries=[{characterId:a.id,householdId:a.householdId,statusRank:1,card:10,order:1},{characterId:b.id,householdId:b.householdId,statusRank:1,card:9,order:2}];g.state.turnState.activeIndex=0;
  assert.throws(()=>g.proposeMarriage(a,b),/own turn/);g.state.turnState.activeIndex=1;const p=g.proposeMarriage(a,b);g.respondMarriage(p.id,true);assert.equal(g.state.marriageProposals[p.id].status,'accepted');assert.equal(g.isMarried(a),false);
});

test('birth proposals are separate and only Household representative can initiate them',()=>{
  const {g,a,b,h}=prepTwoMarried();g.state.round=1;g.state.turnState.phase='voluntary';g.state.turnState.entries=[{characterId:a.id,householdId:h.id,statusRank:1,card:10,order:1},{characterId:b.id,householdId:h.id,statusRank:1,card:9,order:2}];g.state.turnState.activeIndex=0;h.representativeCharacterId=a.id;
  const p1=g.attemptBirth(h),p2=g.attemptBirth(h);assert.ok(p1&&p2);assert.notEqual(p1.id,p2.id);assert.equal(p1.index,1);assert.equal(p2.index,2);assert.equal(g.attemptBirth(h),null);
  g.state.turnState.activeIndex=1;assert.throws(()=>g.attemptBirth(h),/only first spouse/);g.respondBirthProposal(b,p1.id,false);g.respondBirthProposal(b,p2.id,true);assert.equal(g.state.birthProposals[p1.id].status,'rejected');assert.equal(g.state.birthProposals[p2.id].status,'accepted');
});

test('server public/private snapshots expose current phase deadlines and no Ready/bot lobby protocol',()=>{
  const r=new AuthoritativeRoom('SNP123','P1','Host','s1');r.start('P1',()=>.5);const pub=r.publicSnapshot(),priv=r.privateSnapshot('P1');assert.equal('lobbyBots' in pub,false);assert.equal('ready' in pub.players[0],false);assert.ok(pub.game?.phaseDeadlineKind);assert.equal(priv.currentPhase,pub.game?.phase);assert.equal(priv.phaseDeadlineAt,pub.game?.phaseDeadlineAt);
});



test('half-siblings remain marriage-ineligible after a parent Household changes through remarriage',()=>{
  const g=new GameEngine();const parent=g.createNpc(null),firstSpouse=g.createNpc(null),newSpouse=g.createNpc(null);parent.ageStage=firstSpouse.ageStage=newSpouse.ageStage=4;g.marry(parent,firstSpouse);const oldH=g.household(parent);const c1=g.createNpc(oldH.id);oldH.childrenIds.push(c1.id);parent.childrenIds.push(c1.id);firstSpouse.childrenIds.push(c1.id);c1.parentsHouseholdId=oldH.id;
  g.die(firstSpouse,'test');g.marry(parent,newSpouse);const newH=g.household(parent);const c2=g.createNpc(newH.id);newH.childrenIds.push(c2.id);parent.childrenIds.push(c2.id);newSpouse.childrenIds.push(c2.id);c2.parentsHouseholdId=newH.id;c1.ageStage=c2.ageStage=3;
  assert.equal(g.areCloseFamily(c1,c2),true);assert.throws(()=>g.proposeMarriage(c1,c2),/close family/);
});

test('spouse-death inheritance excludes stepchildren who are not direct children of the deceased',()=>{
  const g=new GameEngine();const a=g.createNpc(null),b=g.createNpc(null);a.ageStage=b.ageStage=4;const ownChild=g.createNpc(a.householdId);a.childrenIds.push(ownChild.id);g.household(a).childrenIds.push(ownChild.id);ownChild.parentsHouseholdId=a.householdId;g.marry(a,b);const h=g.household(a);const stepChild=g.createNpc(null);b.childrenIds.push(stepChild.id);h.childrenIds.push(stepChild.id);h.sharedCash=120;const ownH=g.household(ownChild),stepH=g.household(stepChild);ownH.sharedCash=0;stepH.sharedCash=0;g.die(a,'test');
  // Deceased a has only ownChild as a direct child: estate 60 split spouse + ownChild => 30 to ownChild, nothing to stepChild.
  approx(ownH.sharedCash,30);approx(stepH.sharedCash,0);approx(h.sharedCash,90);
});

test('conditional filial support follows direct parent Character after parent Household remarriage',()=>{
  const g=new GameEngine();const parent=g.createNpc(null),oldSpouse=g.createNpc(null);parent.ageStage=oldSpouse.ageStage=4;g.marry(parent,oldSpouse);const oldH=g.household(parent);const child=g.createNpc(oldH.id);child.ageStage=4;parent.childrenIds.push(child.id);oldSpouse.childrenIds.push(child.id);oldH.childrenIds.push(child.id);child.parentsHouseholdId=oldH.id;g.die(oldSpouse,'test');const newSpouse=g.createNpc(null);newSpouse.ageStage=8;parent.ageStage=8;g.marry(parent,newSpouse);const ph=g.household(parent),ch=g.household(child);g.state.round=1;ch.sharedCash=100;g.state.realizedNetIncomeByHousehold[ch.id]=100;g.state.realizedNetIncomeByCharacter[child.id]=100;g.state.pensionIncomeByHousehold[ph.id]=0;g.prefundParentSupportBeforeMandatory();assert.ok((g.state.prepaidParentSupportByWorkerHousehold[ch.id]??0)>0);
});



test('marriage proposer can cancel a pending invitation before end-round settlement',()=>{
  const g=new GameEngine();g.joinPlayer('A');g.joinPlayer('B');const a=owned(g,'A'),b=owned(g,'B');a.ageStage=b.ageStage=4;const p=g.proposeMarriage(a,b);g.cancelMarriageProposal(a,p.id);assert.equal(g.state.marriageProposals[p.id].status,'cancelled');assert.throws(()=>g.respondMarriage(p.id,true),/invalid marriage proposal/);
});

test('player history records structured life, marriage, child, disconnect and scoring milestones',()=>{
  const g=new GameEngine();g.joinPlayer('A');g.joinPlayer('B');const a=owned(g,'A'),b=owned(g,'B');a.ageStage=b.ageStage=4;assert.equal(g.state.histories.A.events[0].type,'life_start');g.state.round=1;const p=g.proposeMarriage(a,b);g.respondMarriage(p.id,true);g.executeAcceptedMarriages();assert.equal(g.state.histories.A.marriages,1);assert.ok(g.state.histories.A.events.some(x=>x.type==='marriage'));
  const h=g.household(a);g.state.turnState.phase='voluntary';g.state.turnState.entries=[{characterId:a.id,householdId:h.id,statusRank:1,card:10,order:1},{characterId:b.id,householdId:h.id,statusRank:1,card:9,order:2}];g.state.turnState.activeIndex=0;h.representativeCharacterId=a.id;const bp=g.attemptBirth(h);g.respondBirthProposal(b,bp.id,true);g.executeAcceptedBirths();assert.equal(g.state.histories.A.children,1);assert.ok(g.state.histories.A.events.some(x=>x.type==='child_birth'));
  h.sharedCash=200;g.state.turnState.entries=[{characterId:a.id,householdId:h.id,statusRank:1,card:10,order:1},{characterId:b.id,householdId:h.id,statusRank:1,card:9,order:2}];g.scoreActivePlayersForRound();assert.ok(g.state.histories.A.highestAssets>0);g.detachPlayerToNpc('A');assert.ok(g.state.histories.A.events.some(x=>x.type==='disconnect'));
});



test('room: failed join after game end does not leak a ghost player into room membership',()=>{
  const r=new AuthoritativeRoom('END123','P1','Host','s1');r.start('P1',()=>.5);r.engine.state.ended=true;r.engine.state.endingReason='test';const before=r.players.size;
  const res=r.join('GHOST','Ghost','s2');assert.equal(res.ok,false);assert.equal(res.error,'GAME_ENDED');assert.equal(r.players.size,before);assert.equal(r.players.has('GHOST'),false);
});

test('room: non-current disconnect preserves the active Human phase deadline',()=>{
  const r=new AuthoritativeRoom('DSC123','P1','Host','s1',{mandatoryPresentationMs:10_000,statusTimeoutMs:10_000,voluntaryTimeoutMs:10_000});
  r.join('P2','Other','s2');r.start('P1',()=>.5);const currentOwner=r.engine.currentTurnCharacter()?.ownerId;assert.ok(currentOwner==='P1'||currentOwner==='P2');
  const other=currentOwner==='P1'?'P2':'P1';const otherSocket=r.players.get(other).socketId;const deadline=r.phaseDeadlineAt,kind=r.phaseDeadlineKind;assert.ok(deadline&&kind);
  assert.equal(r.disconnectSocket(otherSocket,()=>.5),true);assert.equal(r.phaseDeadlineAt,deadline);assert.equal(r.phaseDeadlineKind,kind);assert.equal(r.engine.currentTurnCharacter()?.ownerId,currentOwner);
});



test('terminal natural-death estate uses the last deceased Character direct children, not stepchildren',()=>{
  const g=new GameEngine();const a=g.createNpc(null),b=g.createNpc(null);a.ageStage=b.ageStage=8;
  const childA=g.createNpc(null),childB=g.createNpc(null);a.childrenIds=[childA.id];b.childrenIds=[childB.id];
  g.household(a).childrenIds=[childA.id];g.household(b).childrenIds=[childB.id];g.marry(a,b);const h=g.household(a);h.sharedCash=200;
  const ha=g.household(childA),hb=g.household(childB);ha.sharedCash=0;hb.sharedCash=0;
  g.die(a,'test'); // estate 100 split b + childA => childA 50, household 150
  approx(ha.sharedCash,50);approx(hb.sharedCash,0);approx(h.sharedCash,150);
  g.die(b,'test'); // b is now the last deceased; all remaining estate goes only to direct childB
  approx(ha.sharedCash,50);approx(hb.sharedCash,150);assert.equal(h.active,false);
});



test('accepted marriage pending settlement locks both Characters from new proposals',()=>{
  const g=new GameEngine();g.joinPlayer('A');g.joinPlayer('B');g.joinPlayer('C');const a=owned(g,'A'),b=owned(g,'B'),c=owned(g,'C');a.ageStage=b.ageStage=c.ageStage=4;
  const p=g.proposeMarriage(a,b);g.respondMarriage(p.id,true);assert.equal(g.hasAcceptedMarriagePending(a),true);assert.equal(g.hasAcceptedMarriagePending(b),true);
  assert.throws(()=>g.proposeMarriage(a,c),/marriage pending/);assert.throws(()=>g.proposeMarriage(c,b),/marriage pending/);
});



test('player score trajectory stores per-round and disconnect snapshots for Chronicle/End Report',()=>{
  const g=new GameEngine();g.joinPlayer('A');const a=owned(g,'A'),h=g.household(a);g.state.round=1;h.sharedCash=180;g.state.turnState.entries=[{characterId:a.id,householdId:h.id,statusRank:1,card:10,order:1}];g.scoreActivePlayersForRound();
  assert.equal(g.state.histories.A.scoreSnapshots.length,1);assert.equal(g.state.histories.A.scoreSnapshots[0].reason,'round');approx(g.state.histories.A.scoreSnapshots[0].scoreAssets,180);assert.equal(g.state.histories.A.scoreSnapshots[0].year,10);
  g.state.round=2;h.sharedCash=200;g.detachPlayerToNpc('A','moderate');assert.equal(g.state.histories.A.scoreSnapshots.length,2);assert.equal(g.state.histories.A.scoreSnapshots[1].reason,'disconnect');approx(g.state.histories.A.scoreSnapshots[1].scoreAssets,200);
});

test('Status milestone is recorded at end-round activation even if no later scoring round occurs',()=>{
  const g=new GameEngine();g.joinPlayer('A');const a=owned(g,'A'),h=g.household(a);g.state.round=32;g.state.roundAverageAssetsSnapshot=100;g.state.priceIndex=1;h.pendingStatus='middle';h.pendingStatusPaid=statusFee('middle',100,1,g.cfg);g.state.statusPurchases[h.id]={householdId:h.id,requested:'middle',paid:h.pendingStatusPaid,purchaserCharacterId:a.id,round:32};g.state.turnState.entries=[{characterId:a.id,householdId:h.id,statusRank:1,card:10,order:1}];g.allocateNobleSlots();assert.equal(g.state.histories.A.highestStatus,'middle');const ev=g.state.histories.A.events.find(x=>x.type==='status_milestone');assert.ok(ev);assert.equal(ev.year,320);assert.match(ev.detail,/Trung lưu/);
});



test('simultaneous old-age death of both spouses settles one joint estate without order bias',()=>{
  const g=new GameEngine();const a=g.createNpc(null),b=g.createNpc(null);a.ageStage=b.ageStage=12;
  const ca=g.createNpc(null),cb=g.createNpc(null);a.childrenIds=[ca.id];b.childrenIds=[cb.id];g.household(a).childrenIds=[ca.id];g.household(b).childrenIds=[cb.id];g.marry(a,b);const h=g.household(a);h.sharedCash=200;g.household(ca).sharedCash=0;g.household(cb).sharedCash=0;g.setRandomSource(()=>0);
  g.resolveElderlyMedicalAndMortality();assert.equal(a.alive,false);assert.equal(b.alive,false);const expected=(200-g.elderlyMedicalDue(a)-g.elderlyMedicalDue(b))/2;approx(g.household(ca).sharedCash,expected);approx(g.household(cb).sharedCash,expected);assert.equal(h.active,false);
});

console.log(`\n${passed} Rule Ledger v5 regression tests passed.`);
