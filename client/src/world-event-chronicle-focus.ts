import type{RoomSnapshot,WorldEventOccurrence}from"./types.js";
type Detail={room:RoomSnapshot|null;player:unknown};
let occurrences:WorldEventOccurrence[]=[];
let pendingChronicleEntryId:string|null=null;
let scheduled=false;
function schedule(){if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;decorate()})}
function decorate(){const box=document.querySelector<HTMLElement>(".structured-world-events");if(!box)return;for(const row of box.querySelectorAll<HTMLElement>("[data-world-event-id]")){const ev=occurrences.find(x=>x.id===row.dataset.worldEventId);if(ev?.chronicleEntryId)row.dataset.chronicleEntryId=ev.chronicleEntryId;row.classList.toggle("focused-event",!!pendingChronicleEntryId&&row.dataset.chronicleEntryId===pendingChronicleEntryId)}if(!pendingChronicleEntryId)return;const target=box.querySelector<HTMLElement>(`[data-chronicle-entry-id="${CSS.escape(pendingChronicleEntryId)}"]`);if(target){target.scrollIntoView({block:"center"});pendingChronicleEntryId=null}}
window.addEventListener("ic:snapshot",ev=>{const detail=(ev as CustomEvent<Detail>).detail;occurrences=detail.room?.game?.worldEventOccurrences||[];schedule()});
document.addEventListener("click",ev=>{const el=ev.target as HTMLElement|null;if(!el?.closest("[data-event-chronicle]"))return;const active=document.querySelector<HTMLElement>(".world-event-banner"),sig=active?.dataset.eventDetailSig||"";const eventId=sig.split(":",1)[0]||"";const occurrence=occurrences.find(x=>x.id===eventId);pendingChronicleEntryId=occurrence?.chronicleEntryId||null;window.setTimeout(schedule,0)},true);
new MutationObserver(schedule).observe(document.body,{childList:true,subtree:true});schedule();
