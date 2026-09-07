import type{PlayerSnapshot,RoomSnapshot}from"./types.js";

type ResidenceStatus="occupied"|"empty"|"abandoned"|"reclaimed";
type ResidenceOrigin="founder"|"immigrant"|"marriage"|"adult_transition";
type ResidenceTransitionKind="adult_move"|"adult_retained";
interface ResidenceOccupant{characterId:string;roleKeys:string[];parentCharacterIds:string[];spouseCharacterIds:string[];childCharacterIds:string[]}
interface ResidenceRecord{residenceId:string;status:ResidenceStatus;origin:ResidenceOrigin;createdRound:number;coordinates:{x:number;y:number};activeOnMap:boolean;currentNavigationAllowed:boolean;emptySinceRound:number|null;abandonedRound:number|null;reclaimedRound:number|null;parentResidenceIds:string[];occupants:ResidenceOccupant[]}
interface ResidenceTransition{id:string;round:number;year:number;characterId:string;kind:ResidenceTransitionKind;fromResidenceId:string;toResidenceId:string}
type ResidenceGame=NonNullable<RoomSnapshot["game"]>&{residenceDirectory?:Record<string,ResidenceRecord>;activeMapResidenceIds?:string[];residenceTransitions?:ResidenceTransition[]};
type ResidencePlayer=PlayerSnapshot&{currentResidenceId?:string|null};
type Detail={room:RoomSnapshot|null;player:PlayerSnapshot|null};

let latest:Detail={room:null,player:null};
let selectedResidenceId:string|null=null;
let selectedCharacterId:string|null=null;
let scheduled=false;

const esc=(x:any)=>String(x??"").replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]!));
const clamp=(n:number)=>Math.max(.02,Math.min(.98,Number.isFinite(n)?n:.5));
const statusName=(x:any)=>x==="noble"?"Quý tộc":x==="middle"?"Trung lưu":"Bình dân";
const residenceState=(x:ResidenceStatus)=>x==="occupied"?"ĐANG CÓ NGƯỜI Ở":x==="empty"?"BỎ TRỐNG":x==="abandoned"?"BỎ HOANG":"ĐÃ THU HỒI";
const roleName=(keys:string[])=>keys.includes("spouse")?"VỢ/CHỒNG":keys.includes("parent")?"CHA/MẸ":keys.includes("child")?"CON":"CƯ DÂN";
const game=()=>latest.room?.game as ResidenceGame|null;
const player=()=>latest.player as ResidencePlayer|null;
const directory=()=>game()?.residenceDirectory||{};
const activeIds=()=>new Set(game()?.activeMapResidenceIds||[]);
const publicCharacter=(id:string)=>game()?.characters.find(c=>c.characterId===id);
const playerNameForCharacter=(id:string)=>{const c=publicCharacter(id);const p=latest.room?.players.find(x=>x.activeCharacterId===id||x.aiTakeoverCharacterId===id||x.playerId===c?.ownerId);return p?.displayName||(c?.npc?"Cư dân NPC":"Cư dân")};
const portrait=(seed:string)=>{let h=0;for(const c of seed)h=(h*31+c.charCodeAt(0))>>>0;return`./public/assets/ui/v1/portraits/base_${String(h%8+1).padStart(2,"0")}.png`};

function schedule(){if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;decorate()})}
function focusResidence(id:string){const record=directory()[id];if(!record||!record.currentNavigationAllowed||!activeIds().has(id))return;const map=document.querySelector<HTMLElement>(".world-map");map?.querySelectorAll<HTMLElement>(".residence-map-marker.focused").forEach(x=>x.classList.remove("focused"));const marker=map?.querySelector<HTMLElement>(`.residence-map-marker[data-residence-id="${CSS.escape(id)}"]`);marker?.classList.add("focused");marker?.focus({preventScroll:true});if(map)map.dataset.focusResidenceId=id}

function renderMap(){
  const g=game(),map=document.querySelector<HTMLElement>(".world-map");if(!g||!map)return;
  map.querySelector<HTMLElement>(".landmark.home")?.setAttribute("hidden","");
  const ids=[...(g.activeMapResidenceIds||[])].filter(id=>g.residenceDirectory?.[id]?.activeOnMap&&g.residenceDirectory?.[id]?.status!=="reclaimed").sort();
  const sig=ids.map(id=>{const r=g.residenceDirectory![id]!;return`${id}:${r.status}:${r.coordinates.x}:${r.coordinates.y}:${r.occupants.length}`}).join("|");
  let layer=map.querySelector<HTMLElement>(".residence-map-layer");if(!layer){layer=document.createElement("div");layer.className="residence-map-layer";map.appendChild(layer)}
  if(layer.dataset.sig!==sig){layer.dataset.sig=sig;layer.innerHTML=ids.map(id=>{const r=g.residenceDirectory![id]!,local=player()?.currentResidenceId===id&&!player()?.queuePosition;return`<button class="residence-map-marker state-${r.status} ${local?"local-home":""}" data-residence-id="${esc(id)}" style="left:${(clamp(r.coordinates.x)*100).toFixed(4)}%;top:${(clamp(r.coordinates.y)*100).toFixed(4)}%" aria-label="Residence ${residenceState(r.status)}"><span>${r.occupants.length||""}</span></button>`}).join("");layer.querySelectorAll<HTMLElement>("[data-residence-id]").forEach(x=>x.onclick=()=>{selectedResidenceId=x.dataset.residenceId||null;selectedCharacterId=null;focusResidence(selectedResidenceId||"");renderPanel()})}
  renderMinimap();
  bindTurnTrack();
}

function renderMinimap(){const mini=document.querySelector<HTMLElement>(".approved-minimap .mini-map");const g=game();if(!mini||!g)return;const ids=(g.activeMapResidenceIds||[]).filter(id=>g.residenceDirectory?.[id]?.activeOnMap&&g.residenceDirectory?.[id]?.status!=="reclaimed");const sig=ids.map(id=>`${id}:${g.residenceDirectory![id]!.coordinates.x}:${g.residenceDirectory![id]!.coordinates.y}`).join("|");let layer=mini.querySelector<HTMLElement>(".mini-residence-layer");if(!layer){layer=document.createElement("span");layer.className="mini-residence-layer";mini.appendChild(layer)}if(layer.dataset.sig===sig)return;layer.dataset.sig=sig;layer.innerHTML=ids.map(id=>{const r=g.residenceDirectory![id]!,local=player()?.currentResidenceId===id&&!player()?.queuePosition;return`<button class="mini-residence ${local?"local-home":""}" data-mini-residence="${esc(id)}" style="left:${(clamp(r.coordinates.x)*100).toFixed(4)}%;top:${(clamp(r.coordinates.y)*100).toFixed(4)}%" aria-label="${local?"Nhà của bạn":"Residence"}"></button>`}).join("");layer.querySelectorAll<HTMLElement>("[data-mini-residence]").forEach(x=>x.onclick=()=>focusResidence(x.dataset.miniResidence||""))}

function bindTurnTrack(){const g=game();if(!g)return;document.querySelectorAll<HTMLElement>(".turn-token[data-profile]").forEach(x=>{const characterId=x.dataset.profile||"",c=g.characters.find(v=>v.characterId===characterId) as any,residenceId=c?.currentResidenceId as string|undefined;if(!residenceId)return;x.onclick=ev=>{ev.preventDefault();ev.stopPropagation();focusResidence(residenceId)}})}

function transitionNotice(characterId:string,residenceId:string){const t=[...(game()?.residenceTransitions||[])].reverse().find(x=>x.characterId===characterId&&x.toResidenceId===residenceId);if(!t)return"";return t.kind==="adult_move"?`<aside class="residence-transition adult-move">ĐÃ TRƯỞNG THÀNH — CHUYỂN RA Ở RIÊNG</aside>`:`<aside class="residence-transition adult-retained">ĐÃ TRƯỞNG THÀNH — TIẾP QUẢN NHÀ HIỆN TẠI</aside>`}
function relationButtons(ids:string[],label:string){if(!ids.length)return"";return`<section class="family-relations"><small>${label}</small>${ids.map(id=>`<button data-related-character="${esc(id)}"><span style="background-image:url('${portrait(id)}')"></span><b>${esc(playerNameForCharacter(id))}</b></button>`).join("")}</section>`}

function residenceOverview(r:ResidenceRecord){if(r.status==="reclaimed")return`<header><small>RESIDENCE · LỊCH SỬ</small><h2>ĐÃ THU HỒI</h2></header><p>Residence này chỉ còn tồn tại trong Niên sử và không còn thuộc bản đồ hiện tại.</p>`;if(!r.occupants.length)return`<header><small>RESIDENCE</small><h2>${residenceState(r.status)}</h2></header><p>${r.status==="empty"?"Ngôi nhà hiện không có cư dân.":"Residence đang trong lifecycle bỏ hoang và không có hành động tài sản."}</p>`;return`<header><small>RESIDENCE · ${residenceState(r.status)}</small><h2>GIA ĐÌNH / CƯ DÂN</h2></header><div class="residence-occupants">${r.occupants.map(o=>{const c=publicCharacter(o.characterId);return`<button data-resident-character="${esc(o.characterId)}"><span style="background-image:url('${portrait(o.characterId)}')"></span><b>${esc(playerNameForCharacter(o.characterId))}</b><small>${roleName(o.roleKeys)} · ${esc(c?.ageLabel||"")} · ${statusName(c?.status)}</small></button>`}).join("")}</div>`}

function characterDetail(r:ResidenceRecord,characterId:string){const c=publicCharacter(characterId) as any,o=r.occupants.find(x=>x.characterId===characterId);if(!c||!o)return residenceOverview(r);const isLocal=latest.player?.character?.id===characterId;const financial=isLocal?latest.player?.financial:null;return`<button data-residence-back>← GIA ĐÌNH</button>${transitionNotice(characterId,r.residenceId)}<section class="residence-profile"><span class="profile-portrait" style="background-image:url('${portrait(characterId)}')"></span><div><small>${c.npc?"NPC ĐIỀU KHIỂN":"HUMAN"}${c.immigrant?" · NGƯỜI NHẬP CƯ":""}</small><h2>${esc(playerNameForCharacter(characterId))}</h2><p>${esc(c.ageLabel)} · ${statusName(c.status)}</p></div></section>${relationButtons(o.spouseCharacterIds,"VỢ / CHỒNG")}${relationButtons(o.parentCharacterIds,"CHA / MẸ")}${relationButtons(o.childCharacterIds,"CON")}${financial?`<section class="local-financial"><h3>KINH TẾ CỦA BẠN</h3><p>Cash hộ: <b>${Number(financial.cash??0).toLocaleString("vi-VN")}</b></p><p>Tài sản hộ: <b>${Number(financial.householdAssets??0).toLocaleString("vi-VN")}</b></p></section>`:`<p class="privacy-note">Thông tin kinh tế chi tiết của cư dân khác không được hiển thị.</p>`}`}

function renderPanel(){const r=selectedResidenceId?directory()[selectedResidenceId]:null;let root=document.querySelector<HTMLElement>(".residence-authoritative-panel");if(!r){root?.remove();return}if(!root){root=document.createElement("section");root.className="residence-authoritative-panel feature-sheet narrow";document.body.appendChild(root)}const sig=`${r.residenceId}:${r.status}:${r.occupants.map(x=>x.characterId).join(",")}:${selectedCharacterId||""}`;if(root.dataset.sig===sig)return;root.dataset.sig=sig;root.innerHTML=`<button class="panel-close" data-residence-close aria-label="Đóng">×</button>${selectedCharacterId?characterDetail(r,selectedCharacterId):residenceOverview(r)}`;root.querySelector<HTMLElement>("[data-residence-close]")!.onclick=()=>{selectedResidenceId=null;selectedCharacterId=null;root?.remove()};root.querySelector<HTMLElement>("[data-residence-back]")?.addEventListener("click",()=>{selectedCharacterId=null;renderPanel()});root.querySelectorAll<HTMLElement>("[data-resident-character]").forEach(x=>x.onclick=()=>{selectedCharacterId=x.dataset.residentCharacter||null;renderPanel()});root.querySelectorAll<HTMLElement>("[data-related-character]").forEach(x=>x.onclick=()=>{const id=x.dataset.relatedCharacter||"",c=publicCharacter(id) as any,residenceId=c?.currentResidenceId as string|undefined;if(!residenceId)return;const target=directory()[residenceId];if(!target)return;selectedResidenceId=residenceId;selectedCharacterId=id;if(target.currentNavigationAllowed&&activeIds().has(residenceId))focusResidence(residenceId);renderPanel()})}

function decorateExistingResidencePanel(){const old=document.querySelector<HTMLElement>(".residence-sheet");if(!old)return;old.hidden=true;const local=player()?.currentResidenceId;if(local&&activeIds().has(local)){selectedResidenceId=local;selectedCharacterId=null;renderPanel()}}

function renderChronicleResidence(){const sheet=document.querySelector<HTMLElement>(".history-sheet"),g=game();if(!sheet||!g)return;const transitions=g.residenceTransitions||[],reclaimed=Object.values(g.residenceDirectory||{}).filter(r=>r.status==="reclaimed"&&r.reclaimedRound!=null);const sig=`${transitions.length}:${reclaimed.length}:${g.round}`;let box=sheet.querySelector<HTMLElement>(".residence-history-authoritative");if(!box){box=document.createElement("section");box.className="residence-history-authoritative";sheet.appendChild(box)}if(box.dataset.sig===sig)return;box.dataset.sig=sig;const transitionRows=transitions.slice(-12).reverse().map(t=>`<p data-history-residence="${esc(t.toResidenceId)}"><b>V${t.round} · Năm ${t.year}</b><span>${t.kind==="adult_move"?"Một cư dân trưởng thành chuyển ra ở riêng.":"Một cư dân trưởng thành tiếp quản Residence hiện tại."}</span></p>`).join("");const reclaimedRows=reclaimed.slice(-8).sort((a,b)=>(b.reclaimedRound||0)-(a.reclaimedRound||0)).map(r=>`<p data-history-residence="${esc(r.residenceId)}"><b>V${r.reclaimedRound}</b><span>Một Residence bỏ hoang đã được thu hồi khỏi bản đồ hiện tại.</span></p>`).join("");box.innerHTML=`<h3>RESIDENCE / NƠI Ở</h3>${transitionRows}${reclaimedRows||""}`}

function decorate(){renderMap();decorateExistingResidencePanel();renderPanel();renderChronicleResidence()}
window.addEventListener("ic:snapshot",ev=>{latest=(ev as CustomEvent<Detail>).detail;const current=player()?.currentResidenceId;if(player()?.queuePosition&&selectedResidenceId===current){selectedResidenceId=null;selectedCharacterId=null}schedule()});
new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});
schedule();
