# 01 — AUTHORITATIVE RULE LEDGER

**Trạng thái: LOCKED cho baseline v5.0.**  
Tài liệu này là nguồn có thẩm quyền cao nhất về gameplay trong Project.

Nếu muốn thay đổi bất kỳ rule nào bên dưới, phải:

1. thảo luận ở `01 — GAME RULES & BALANCE`;
2. người dùng chốt lựa chọn;
3. thêm Decision Log;
4. cập nhật Rule Ledger;
5. sau đó mới sửa Engine/Server/UI tương ứng.

---

## A. Session, population và room

### Session

- 32 rounds; 1 round = 10 simulated years.
- Round1 = Year0; Round2 = Year10; Round32 = Year310.
- Kết thúc Round32 tương ứng 320 năm mô phỏng.
- True extinction = zero living Characters.
- Immigration không resurrect society đã extinction.
- Standard winner chỉ sau full 32 rounds.
- Extinction sớm = common failure, không có standard winner.

### Initial state

- Target initial active society: 10 founders.
- Starting cash per founder: `320`.
- Initial public debt: `300`.
- Government initial budget: `320`.
- PI = `1`.
- Initial inflation = `1.5%`.
- Founder stages: `[3,3,4,4,5,5] + 4 uniform random draws 3..5`, shuffle.
- Founder current Status mặc định Bình dân / `poor`.

### Multiplayer room

- Node.js + Socket.io authoritative backend, in-memory room/game state.
- Max 30 real Humans.
- Không login.
- Không Ready.
- Host có thể start với minimum 1 Human.
- Lobby chỉ hiện Humans.
- Humans <10: tất cả Humans là founders, server bù NPC đến 10.
- Humans =10: tất cả founders, không draw.
- Humans >10: tất cả Humans founder draw authoritative; top10 founders; phần dư Waiting Queue theo draw rank.
- NPC không founder draw.
- Join sau start → cuối Waiting Queue.
- Disconnect → Character cũ vĩnh viễn thành NPC takeover.
- Reconnect → Human vào cuối Waiting Queue, không reclaim Character cũ.
- NPC không bao giờ vào Waiting Queue.
- Human death → Waiting Queue.
- Newborn slots shuffle; queue order giữ nguyên; newborn còn dư là NPC.
- Same-room replay: Host-only sau end; fresh engine, giữ connections.
- Tutorial: 1 Human + 9 NPC, full 32 rounds, Human bắt buộc founder, không founder draw.

---

## B. Turn order và phase

### Turn order

Mỗi living Character có turn riêng, kể cả spouses. Government có Turn Track entry riêng.

Priority:

1. Quý tộc / Noble
2. Trung lưu / Middle
3. Bình dân / Poor

Trong cùng Status: Turn Card unique cao hơn đi trước. Lower Status không thể vượt higher Status chỉ nhờ card.

- Government được xử lý như top/Noble priority và có unique card.
- Turn cards authoritative, unique/no tie.
- Mỗi round re-draw/reposition.
- Married spouses share economy/status nhưng retain separate Character turns.

### Character turn flow

`TURN START → MANDATORY presentation → STATUS PURCHASE (household representative only) → VOLUNTARY → END TURN`

- Mandatory obligations là automatic/server-authoritative.
- Mandatory panel không có manual skip.
- Mandatory chỉ lưu trên màn hình trong configured reading duration; mặc định server v5.0 là 7 giây.
- Mandatory không có gameplay decision timer.
- Status max 15s.
- Voluntary max 60s TOTAL, shared giữa Market/Recovery/Support/Birth.
- Chuyển panel không reset timer.
- Residence/Government/Niên sử/marriage notification không pause Voluntary timer.
- Deadline authoritative là server time.
- Hết 00:00 server không nhận action mới; action đã đến trước deadline được resolve; unsent action cancel.
- End Turn không cần confirmation.
- Spouse đi sau: không trả shared Mandatory lần nữa, không Status phase, vào Voluntary trực tiếp.
- Household bankruptcy giết cả hai spouses và cancel remaining turns của cả hai trong round.

---

## C. Household, Residence và tài sản

### Economic Household vs Residence

- Economic Household = financial unit.
- Residence = visible house trên map.
- Child Stage1–2 sống trực quan trong Residence của parents nhưng là **separate economic household**.
- Stage2→3: bình thường rời nhà, có Residence riêng gần parents.
- Nếu cả parents chết khi child Stage1–2: child giữ Residence cũ; khi Stage3, Residence đó trở thành adult Residence, không tạo duplicate.
- Nhiều dependent siblings chuyển tiếp độc lập.
- Một parent chết → child ở với survivor về mặt visual.
- Không divorce.
- Empty residence chỉ visual: house → abandoned → reclaimed by nature khoảng 1 round; không có real-estate mechanic.

### Household Total Assets

`HouseholdTotalAssets = Cash + spotMarketValue(Resources) + fundedPersonalASXHBalancesOfMembers`

- Funded ASXH được tính vào HHA cho macro/formula.
- Funded ASXH là locked/non-liquid đối với ordinary obligations.
- Resource ordinary asset value dùng current spot market price, không future return.

HHA được dùng cho:

- Living Cost surcharge.
- Status fee average-assets basis.
- Debt ceiling.
- Married spending cap.
- Scoring.
- Immigration wealth basis.
- Các formula khác tham chiếu household assets.

### Living Cost

`living.base = 1.5`

`LivingCost = 1.5*PI*livingHouseholdMembers + min(1.1%*HouseholdTotalAssets, 14*PI)`

- Married couple trả 2 subsistence units.
- Asset surcharge tính một lần trên merged household.
- Child Stage1–2 là separate economic household và tự trả Living Cost của child household.

Đối với married Household, đây là **một tập chi phí chung của Household**: không tạo thêm một bộ Living Cost độc lập cho từng spouse. Tuy vậy, các khoản được định nghĩa theo Character — đặc biệt Tax và ASXH — vẫn được tính riêng cho từng Character rồi thanh toán từ shared Household Cash.

---

## D. Mandatory obligations và bankruptcy

Mandatory automatic có thể gồm:

- Living Cost.
- Tax.
- ASXH contribution.
- Mandatory dependent-child support Stage1–2.
- Conditional elderly parent support.
- Grief Fee.
- Epidemic Medical Fee khi Dịch bệnh active.
- Các locked mandatory obligations khác.
- Forced liquidation nếu cần.
- Bankruptcy nếu vẫn không đủ.

Engine phải tổng hợp toàn bộ khoản Mandatory đến hạn của Household theo đúng attribution ở từng rule. Sau các nguồn thanh toán/forced liquidation hợp lệ, nếu Household vẫn không đủ khả năng chi trả cho các khoản có thể gây bankruptcy thì Household bankruptcy ngay; không tồn tại private borrowing để bù thiếu.

Status fee **không** thuộc Mandatory.

### Forced liquidation

- Resource liquidation value = `75% * current spot market value`.
- Có thể liquidate inventory khi cash thiếu cho bankruptcy-causing mandatory obligations.
- Không auto-borrow trước personal bankruptcy.
- Không Financial Stress gradual state.
- Không unexpected mandatory Medical Shock.

---

## E. Marriage và shared control

### Eligibility

- No self.
- No parent-child.
- No siblings; half-siblings cũng bị chặn.
- No remarriage while spouse alive.
- No divorce.
- Worker-worker favored nhưng không bắt buộc.
- Elder+worker legal.
- Elder+elder legal.
- Birth chỉ khi cả hai spouses Stage3–6.

### Invitation

- Chỉ SEND invitation ngoài sender's own economic turn.
- Sender có thể inspect trong own turn nhưng Send locked.
- Mỗi Character chỉ được có tối đa **một outgoing proposal đang `pending`**; muốn gửi proposal khác phải cancel outgoing pending cũ trước.
- Một Character vẫn có thể nhận **nhiều incoming proposal đang `pending`**.
- Recipient có thể Accept/Reject một proposal `pending` kể cả trong own turn; sender chỉ có thể cancel khi proposal còn `pending`.
- Pending invitation không timeout và tiếp tục tồn tại qua nhiều round nếu cả hai participant vẫn eligible.
- Khi một accept hợp lệ được server xử lý, proposal chuyển sang `accepted`; proposal đã accepted là **binding**, không còn được Reject/Cancel.
- Accept một proposal invalidates mọi proposal pending không còn tương thích liên quan tới một trong hai participant; nếu có cạnh tranh, accept hợp lệ đầu tiên theo authoritative server order thắng.
- Accepted pair bị lock khỏi proposal mới trước end-round settlement.
- Proposal `accepted` execute vào cuối **round mà accept có hiệu lực**, bất kể proposal được tạo ở round nào. `createdRound` chỉ là lịch sử; `acceptedRound` là mốc settlement.
- Proposal `pending` hoặc `accepted` bị invalidate ngay, không phụ thuộc `createdRound`, nếu một participant chết, bankrupt, kết hôn qua proposal khác hoặc mất bất kỳ điều kiện eligibility nào trước settlement.
- Disconnect/permanent NPC takeover không tự invalidate proposal vì Character vẫn tồn tại trong game.
- Human→Human persistent.
- Human→NPC và NPC→Human được server/NPC xử lý.
- NPC→NPC server handles.
- Khi marriage settle thành công, proposal chuyển sang `executed`, rời danh sách active nhưng được giữ trong history.

Lifecycle authoritative:

`pending → accepted → executed`

Các terminal path khác: `pending → rejected | cancelled | invalidated`; `accepted → invalidated`.

### Merge

Khi marriage settle:

- Cash/resources merge.
- Funded ASXH economic value shared trong HHA, nhưng per-Character subaccounts vẫn giữ tag cho contribution/payout.
- Không private debt.
- Một shared `household.status`.
- Child dependents move visually với parent nhưng financial assets vẫn separate.

### Married control rights — split by action type

- Mỗi spouse có own Character turn.
- Mỗi spouse tự quyết investment/recovery/support trong turn của mình.
- Shared Household Mandatory + Status do spouse đi trước đại diện xử lý một lần.
- Mỗi spouse spending capacity dựa trên snapshot đầu round.

`PersonalSpendLimit = 0.5 * HouseholdTotalAssets_startRound`

`QuotaUsed_spouse = 0.5*SharedHouseholdCosts + spouseOwnVoluntarySpending`

`QuotaRemaining = max(0, PersonalSpendLimit - QuotaUsed_spouse)`

- Snapshot cố định cả round.
- Shared Mandatory + Status fee split 50/50 vào quota usage của spouses.
- Voluntary action của ai tính 100% vào quota người đó.
- Mandatory có thể vượt quota; quota không tự gây bankruptcy, chỉ làm giảm voluntary capacity.
- Cash/resources thật vẫn là hard constraint.

---

## F. Status Purchase và Noble cap

### Tier/access

- Bình dân / `poor`: Low.
- Trung lưu / `middle`: Low + Mid.
- Quý tộc / `noble`: Low + Mid + High.

### Timing

- Buy/select trong current round sau Mandatory.
- Pay ngay.
- Effective next round.
- Current Status vẫn quyết định current-round turn order và Market access.
- Residence architecture đổi next round.
- Spouse đi sau không Status phase.
- Bình dân fee = 0.
- Không mua được higher Status không gây bankruptcy.

### Timeout fallback

Nếu hết 15s không chọn:

- Server thử giữ current Status nếu affordable/eligible.
- Nếu không, hạ xuống tier gần nhất recursively.
- Cuối cùng về free Bình dân.

### Formula — locked v4.2 basis

Đầu round chụp một snapshot:

`AverageCitizenAssets = sum(HouseholdTotalAssets of active economic households) / number of active economic households`

Single:

- Poor = `0`.
- Middle = `10*PI + 3%*AverageCitizenAssets`.
- Noble = `30*PI + 8%*AverageCitizenAssets`.

Married = chính xác `2x` corresponding single fee.

### Noble cap

`NobleSlots = ceil(10% * living Character population)`

- Đếm Characters, không households.
- Married Noble household tiêu thụ 2 slots.
- Government không tiêu thụ population Noble slots.
- Noble candidates resolve cuối round.
- Priority:
  1. incumbent current Noble;
  2. higher Household wealth/assets;
  3. deterministic authoritative tie-break, ví dụ Turn Card.
- Household cần 2 slot nhưng chỉ còn 1 → fail.
- Loser tự chuyển Middle.
- Refund chênh lệch Noble fee - Middle fee.
- Status pricing không recompute vì wealth thay đổi giữa round.

### Marriage + pending Status

Cuối round khi merge:

- Lấy higher của hai next-round Status targets đã purchase.
- Required married fee = `2x` single fee trên cùng round-start snapshot.
- Trừ tổng fee đã trả.
- Thu thêm difference nếu đủ cash.
- Nếu không đủ, downgrade xuống tier cao nhất affordable.
- Nếu overpaid sau downgrade, refund.
- Merged Noble household tranh 2 slots.
- Spouse chết trước Status activation → refund unused one-person portion trước inheritance.

---

## G. Voluntary actions

Chỉ có 4 action group:

1. Thị trường / Market.
2. Phục hồi / Recovery.
3. Chu cấp / Support.
4. Sinh con / Birth.

Không Action Menu cũ, không Player Bar, không Status nằm trong Voluntary.

### Market

6 abstract resource cards luôn tồn tại:

- Renewable Low / Mid / High.
- Nonrenewable Low / Mid / High.

Không đổi thành named commodities.

Card hiển thị:

- Price.
- Return if successful.
- Failure risk.
- Current supply pool.
- Owned quantity.

Rules:

- Current-round Status quyết định access.
- Locked cards vẫn visible với lý do.
- Quantity clamp theo cash, pool, spending quota và engine limits.
- Không server reservation trước BUY.
- Concurrent order theo server receive order.
- Pool update realtime.
- Pool 0 vẫn hiện `HẾT NGUỒN CUNG`.
- Success giữ panel mở.
- Child có thể buy.
- Child không produce trước Stage3.
- Resource lot stores `buyerCharacterId`.
- Child-purchased lot có Early Investment và x1.2 khi chính Character đó trở thành worker.
- Worker spouse không produce lot của spouse/elder/child khác chỉ vì pooled household assets.

### Resource economics

Failure risk:

- Low `21%`.
- Mid `12%`.
- High `6%`.

Renewable return:

- Low `+32%`.
- Mid `+42%`.
- High `+50%`.

Nonrenewable return:

- Low `+60%`.
- Mid `+76%`.
- High `+92%`.

Base price/pool:

| Type | Grade | Base price | Initial/K | Regen |
|---|---:|---:|---:|---:|
| Renewable | Low | 14 | 120 | 10% |
| Renewable | Mid | 42 | 60 | 8% |
| Renewable | High | 105 | 24 | 6% |
| Nonrenewable | Low | 7 | 700 | 0 |
| Nonrenewable | Mid | 22 | 360 | 0 |
| Nonrenewable | High | 55 | 140 | 0 |

Market multiplier:

`mult = clamp((population/10) / (currentPool/initialPool), lowerBound, upperBound)`

Default bounds `.55–2.35`; Market Volatility `.30–3.00`.

`MarketPrice = basePrice * PI * mult`

Renewable end-round natural regen:

`N_next = min(K, N + r*N*(1 - N/K))`

Nonrenewable không natural regen.

Disaster giảm cả renewable/nonrenewable pools xuống 80%.

### Production timing

`buy in Round R → produce/convert in Round R+1 before Mandatory`

- Chỉ Stage3–6 workers produce.
- Child/elderly có thể hold/buy nhưng không produce.
- Mỗi lot chỉ buyer Character produce khi eligible.
- Roll failure theo grade.

Successful sale:

`Proceeds = units * currentMarketPrice * (1 + max(0, baseReturn + eventReturnDelta)) * EarlyBonus * EIF`

- `EarlyBonus = 1.2` chỉ nếu lot mua bởi chính Character đó lúc Stage1–2; ngược lại 1.
- `NetIncome = Proceeds - costBasis`.
- Cost basis dùng actual net purchase cash sau subsidy.
- Proceeds vào shared household Cash nếu married.
- Net income vẫn attributed cho producing Character để tax/ASXH.

### Recovery

- Renewable only.
- Không cần own resource.
- Cost/unit = `currentRenewableMarketPrice * 0.5 * eventRecoveryMultiplier`.
- Pending recovery cộng vào next round start.
- Clamp theo carrying capacity/engine limits.
- Counts voluntary spending/quota.
- Public Investment event halves recovery cost.

### Voluntary family support

- Direct parents/children only.
- Không siblings/neighbors/unrelated.
- Không ASXH donation.
- Không early inheritance/gifting.
- Spouse không recipient vì cùng household.
- Separate/additional to mandatory support.
- Không artificial percentage cap: `0 < transfer <= available cash`, đồng thời phải qua spending quota.
- Multiple transfers được phép khi còn time/cash.

---

## H. Birth và child economics

### Birth proposals

- Birth action nằm trong Voluntary.
- Bình thường max 2 child proposals/eligible married household/round.
- Pro-natal event tăng max 3.
- Mỗi child là proposal riêng #1/#2/#3.
- Household representative/spouse đi trước proposes.
- Later spouse Accept/Reject từng proposal trong own Voluntary.
- Nếu later spouse không phản hồi trước khi Voluntary kết thúc → default ACCEPT.
- Accepted birth executes end round.
- Household bankrupt trước execution → invalidate.
- Human/NPC dùng response tương ứng.
- Cả hai spouses phải Stage3–6.
- Newborn current Status = Bình dân.

### Child allowance

Rounds 1–8 only:

`10*PI` per Stage1–2 child, từ Support Fund.

Rounds 9–32 không có global child allowance. Mandatory parent support và birth subsidy vẫn tiếp tục.

### Mandatory parent support Stage1–2

Với `N` dependent children:

`Support = min(14.5%*ParentHouseholdNetIncome*N, 30%*ParentHouseholdNetIncome) + 1.5*PI*N`

- Prefunded trước Mandatory.
- Nếu cash thiếu → emergency resource liquidation 75%.
- Nếu vẫn thiếu → parent household bankruptcy ngay.
- Child chỉ nhận funded amount.
- Child tự trả own Living Cost.

### Birth subsidy

Mỗi accepted newborn:

`min(32*PI, 22*PI + max(0, 10*PI - 14.5%*ParentHouseholdNetIncome))`

Paid to newborn child household. Support Fund có Government backstop theo rule support-fund.

---

## I. Elderly filial support

Conditional mandatory support:

- Dựa trên elderly parent household Living Cost gap sau pension.
- Worker child household support tổng cộng capped `6%` net income qua tất cả elderly parent obligations.
- Cũng limited by available cash.
- Không force emergency liquidation/bankruptcy ngoài actual transferred amount.
- Exact transferred amount được charge.
- Direct parent Character relationship phải được giữ qua remarriage.

---

## J. ASXH, PAYG và Support Fund

Worker contribution = `10%` personal realized net income:

- `5%` → personal funded ASXH subaccount.
- `3%` → PAYG.
- `2%` → Support Fund.

Cash có thể shared trong marriage, nhưng attribution/subaccount vẫn per Character.

### Funded personal ASXH

- Included trong HHA.
- Locked/non-liquid.
- Character-tagged.
- Elder Stage7+ withdraws **half remaining balance mỗi elderly round** vào household Cash.

Investment return:

- Expected real return `1.5%`.
- Random shock ±`5%`.
- Nominal ≈ `(1+inflation)*(1+0.015+shock)-1`.
- Clamp `[-8%, 12%]`.
- Apply cuối round cho funded personal balances và pension reserve.

### PAYG pension target

`TargetPensionPerElder = 30% * prior average worker income`

Waterfall:

1. PAYG.
2. Pension reserve.
3. Limited Government backstop.
4. Benefit cut.

Government pension backstop tối đa `40%` remaining shortfall.

Pension Crisis nếu payout < `70%` target.

### Support Fund backstop

- Child allowance + birth subsidy.
- Government support backstop = `50%` support-fund shortfall, subject fiscal capacity/debt ceiling.
- Benefit có thể partial nếu quỹ không đủ.

---

## K. Tax, Government và debt

### Tax per worker Character

`Tax = 0.4*PI + 11%*personalNetIncome + debtServiceShare`

Debt-service share proportional theo personal net income của positive-income workers, dựa trên public debt interest service need.

Tax attributed per Character; paid from shared household Cash nếu married.

### Public debt

- Government liability, không private household debt.
- Debt ceiling = `60% * total resident HouseholdTotalAssets`.
- Không borrow trên ceiling.
- Fiscal Crisis nếu required financing vượt room.
- Public debt không inherited.

### Government maintenance/strategy

- Maintenance = `28*PI` per round.
- Reserve floor concept = 2 rounds maintenance.
- Government có thể borrow trong ceiling để maintain required operations.
- Debt interest base = `1.3%` debt × event multiplier.
- Debt Crisis event doubles multiplier.
- Không đủ cover debt service dù đã borrow hợp lệ → Fiscal Crisis.

Strategy baseline:

- Recovery envelope ~20% spendable budget.
- Production investment ~14%.
- Legal max resource purchase share 20%; strategy typical max 10%.
- Uniform subsidy/recovery policy được prepare trước player voluntary actions để tránh turn-order bias.
- Government có Turn Track entry; action presentation tự động, không forced camera.

### EIF

Base `1`.

Modifiers:

- Financial Crisis `-0.20`.
- Tech Boom `+0.15`.
- Fiscal Crisis `-0.10`.
- Debt stress >=95% ceiling `-0.10`; >=80% `-0.05`.
- Renewable scarcity ratio <.45 `-0.12`; <.65 `-0.06`.
- Favorable state (> .85 resources, no fiscal/financial crisis) `+0.05`.
- Clamp `.60–1.25`.

### Inflation

- demand = `population/10 - 1`.
- scarcity phải kết hợp **cả Renewable và Nonrenewable**; phương án renewable-only đã bị người dùng bác bỏ.
- Với mỗi grade `g ∈ {Low, Mid, High}`, scarcity là tỷ lệ đã cạn, clamp về `[0,1]`:

  `r_g = clamp(1 - RenewablePool_g / RenewableCapacity_g, 0, 1)`

  `n_g = clamp(1 - NonrenewablePool_g / NonrenewableInitialPool_g, 0, 1)`

- Renewable dùng capacity `[120, 60, 24]`. Trọng số theo `BasePrice × InitialPool`: `[1680, 2520, 2520]`:

  `RenewableScarcity = (1680*r_low + 2520*r_mid + 2520*r_high) / 6720`

- Nonrenewable dùng initial pool `[700, 360, 140]`. Trọng số theo `BasePrice × InitialPool`: `[4900, 7920, 7700]`:

  `NonrenewableScarcity = (4900*n_low + 7920*n_mid + 7700*n_high) / 20520`

- Gộp hai nhóm với trọng số bằng nhau:

  `scarcity = 0.5*RenewableScarcity + 0.5*NonrenewableScarcity`

- Đo ở cuối vòng theo vị trí inflation hiện tại: sau giao dịch/sự kiện của vòng và sau natural regeneration của Renewable. Pending Recovery chỉ ảnh hưởng khi thực sự được cộng vào pool ở đầu vòng sau.
- `Pool = 0` cho scarcity grade bằng `1`; không chia cho current pool. Pool ngoài khoảng hợp lệ được clamp qua công thức trên. Capacity/initial-pool denominator phải `>0`, nếu không là configuration error.
- fiscal = `min(2, publicDebt / residentTotalAssets)`.
- raw = `0.018 + demand*.008 + scarcity*.018 + fiscal*.008`.
- smoothed = `previous*.55 + raw*.45`.
- clamp `[-.02,.12]`.
- `PI *= 1 + inflation`.

---

## L. World Events

Scheduled rounds: `4,8,12,16,20,24,28,32`.

- Thiên tai: all resource pools ×`0.80`.
- Khủng hoảng tài chính: resource return `-15` percentage points; EIF `-0.20`.
- Bùng nổ công nghệ: return `+15` points; EIF `+0.15`.
- Mở rộng phúc lợi: Government injects `100*PI` vào Support Fund, subject fiscal funding.
- Dịch bệnh: `+10*PI` mandatory Medical Fee **per living Character** trong round; có thể liquidation/bankruptcy.
- Khuyến sinh: birth proposal limit `3`.
- Khủng hoảng nợ công: debt interest multiplier ×`2`.
- Đầu tư công: recovery cost ×`0.5`.
- Biến động thị trường: market bounds `.30–3.00`.

Không tồn tại unexpected mandatory Medical Shock riêng.

---

## M. Elderly medical, mortality và Grief

Elderly = Stage>=7.

Passive end-round medical fee:

`MedicalDuePerElder = 1.5*PI*(1 + .25*(stage-7))`

- Deduct available cash only.
- Không liquidation, borrowing hoặc bankruptcy do elderly medical fee tự thân.
- Partial payment ratio ảnh hưởng mortality.

Mortality:

- `baseRisk = 0.22*(stage-7)`, capped 1.
- Stage12 = 100% terminal.
- medical factor = `max(.65, 1 - .35*paidRatio)`.
- risk ≈ `baseRisk * medicalFactor`, trừ Stage12 forced 100%.
- Stage7 base risk 0.

### Grief Fee

- Khi living parent mất child, parent nhận 1 Grief Fee obligation cho next Mandatory.
- Base `15*PI` per affected living parent Character.
- Hai parents cùng household → mỗi parent một unit, household có thể aggregate.
- Có thể góp phần gây bankruptcy như ordinary Mandatory.

---

## N. Inheritance — FINAL POLICY A

Phần này **supersede** công thức cũ “50% toàn bộ HouseholdTotalAssets của household married” khi survivor còn funded ASXH khóa.

### One spouse dies, one spouse survives

Living spouse funded ASXH **không được liquidate hoặc đưa vào estate của người chết**.

`DivisibleJointAssets = shared Cash + resources valued theo inheritance conversion rule`

`Estate = 50% * DivisibleJointAssets + DeceasedFundedASXH`

Beneficiaries:

- surviving spouse;
- direct living children của deceased Character;
- chia đều giữa các beneficiaries trên.

Spouse inherited share ở lại surviving Household; child shares rời shared estate value.

Stepchildren không tự động inherit từ step-parent.

Nếu spouse survives và no children → spouse nhận toàn estate.

### No surviving spouse

- Living direct children chia đều estate.
- Nếu không spouse và không living child → estate về Government Budget.
- Parents không inherit theo rule hiện tại.
- Public debt không inherited.

### Both spouses die trong cùng end-round settlement

- Không coi người xử lý trước là “surviving spouse”.
- Settle joint estate một lần để tránh order bias.
- Tất cả remaining funded balances của dead members vào estate.
- Living direct children hợp lệ nhận theo terminal estate rule; không có child → Government.

### Resource inheritance conversion

`resourceEstateValue = currentMarketPrice * (1 + currentApplicableReturn)` per unit

- Không production failure roll.
- Không EIF production multiplier.
- Event return delta có thể ảnh hưởng applicable current return.
- Deceased funded ASXH subaccount được settle và close.
- Status refund do chết trước activation thực hiện trước inheritance.

---

## O. Aging

- Stage1–2 child.
- Stage3–6 worker.
- Stage>=7 elderly.
- Newborn ở Stage1 trong birth round.
- End round sau birth → Stage2; round sau → Stage3.
- Aging xảy ra sau births/marriage/mortality/inheritance theo key end-round order.
- Newborn không bị age ngay trong birth round.
- Stage12 forced death, không immortality.

---

## P. Immigration

`residentAssetsPerCapita = totalResidentHouseholdAssets / livingPopulation`

`wealthReference = 320*PI`

`wealthRatio = residentAssetsPerCapita / wealthReference`

`populationFactor = clamp(sqrt(population/10), .6, 1.3)`

`rawRate = .022 * wealthRatio^.8 * populationFactor`

`rate = clamp(rawRate, .008, .03)`

`quota = population * rate`

- Fractional accumulator; arrivals = floor accumulated quota.
- Immigrant = NPC independent household.
- Stage weights 3/4/5 = 45%/35%/20%.
- Starting cash = 55–80% normal starting cash scaled by PI.
- No starting resources.
- Initial Status khoảng 90% Poor, 10% Middle.
- Hidden Persona.
- Normal tax/ASXH/bankruptcy/marriage/birth/mortality.
- Không Waiting Queue.
- Arrive round start, có thể vào current Turn order.
- Không resurrect extinction.

---

## Q. NPC AI

AI luôn gọi **NPC**.

Hidden Persona baseline hiện tại gồm 6 kiểu nội bộ tương ứng các xu hướng cautious/ambitious/altruistic/hedonist/moderate/fertile trong v5 code.

Mechanisms locked:

- Adaptive Risk Memory.
- Household Joint Decision với blended spouse Personas.
- Goal hierarchy: `SURVIVE → STABILIZE → FAMILY → GROW → STATUS`.
- Social Learning từ peer bankruptcy.
- Planning Horizon.
- Decision Explanation.
- Marriage match-aware.
- Birth/marriage server-side.
- Demographic Continuity Signal.
- Disconnected Human Character nhận NPC takeover Persona và vĩnh viễn là NPC.

NPC phải obey cùng hard rules về quota, Status representative, birth consent, Market access, family support, resource ownership và bankruptcy.

---

## R. Scoring và winner

Standard game ends after Round32.

`AverageLifeAssetScore = sum(roundAssetScore) / activeRounds`

Đây là điểm **tài sản HHA trung bình qua các active rounds/kiếp sống**, không phải điểm chỉ dựa trên Cash.

Per Human:

- Single active Character → 100% HouseholdTotalAssets snapshot.
- Married Character → 50% HouseholdTotalAssets snapshot, bất kể spouse Human hay NPC.
- Hai spouses đều Human → mỗi người 50%.
- Funded ASXH included.
- Resource scoring = current spot value, không future return.
- Bankruptcy round → score 0 cho affected Human(s).
- Old-age death sau participating vẫn nhận normal round snapshot trước inheritance.
- Disconnect mid-round → close Life và snapshot tại disconnect moment.
- Waiting Queue time không active round và không tạo Life.
- Newborn birth round không count active round của Human controller.
- Tất cả Human participants eligible final ranking, kể cả đang queue lúc end.
- `activeRounds = 0` → score 0.
- Standard winner chỉ full 32 rounds.
- Extinction early → no standard winner.

### Total Social Assets

Để tránh double-count funded ASXH:

`TotalSocialAssets = Σ resident HouseholdTotalAssets + PAYG + SupportFund + PensionReserve + Government liquid/market-value holdings`

Không add personal funded ASXH thêm lần nữa.
