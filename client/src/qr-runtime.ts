import{roomCodeFromSearch,roomJoinUrl}from"./qr-contract.js";

declare global{interface Window{QRCode?:new(el:HTMLElement,opts:any)=>any}}

const prefill=roomCodeFromSearch(window.location.search);
let renderedFor="";

function ensureStyle(){if(document.getElementById("qr-runtime-style"))return;const s=document.createElement("style");s.id="qr-runtime-style";s.textContent=`.qr-placeholder{min-width:210px;display:grid;justify-items:center;gap:.45rem}.qr-functional{background:#fff;padding:12px;min-width:192px;min-height:192px;display:grid;place-items:center}.qr-functional canvas,.qr-functional img{image-rendering:auto!important;max-width:100%;height:auto}.qr-fallback{max-width:230px;text-align:center}.qr-link-text{max-width:260px;overflow-wrap:anywhere;user-select:all;font-size:.72rem}.qr-helper{font-size:.76rem;opacity:.8}`;document.head.appendChild(s)}

function prefillJoinForm(){if(!prefill)return;const input=document.querySelector<HTMLInputElement>("#code");if(!input)return;if(!input.value)input.value=prefill;let helper=document.querySelector<HTMLElement>(".qr-helper");if(!helper){helper=document.createElement("small");helper.className="qr-helper";helper.textContent="Mã phòng đã được điền từ QR.";input.closest("label")?.appendChild(helper)}}

function decorateLobby(){const host=document.querySelector<HTMLElement>(".qr-placeholder");const pin=document.querySelector<HTMLElement>(".room-pin")?.textContent?.trim()||"";if(!host||!pin)return;const url=roomJoinUrl(window.location.origin,pin);if(!url)return;if(renderedFor===url&&host.dataset.qrReady==="1")return;ensureStyle();host.innerHTML=`<div class="qr-functional" aria-label="Mã QR tham gia phòng"></div><button type="button" class="qr-copy">SAO CHÉP LIÊN KẾT</button><small class="qr-link-text">${url}</small>`;const box=host.querySelector<HTMLElement>(".qr-functional")!;try{if(!window.QRCode)throw new Error("renderer unavailable");new window.QRCode(box,{text:url,width:192,height:192,colorDark:"#000000",colorLight:"#ffffff",correctLevel:(window.QRCode as any).CorrectLevel?.M});host.dataset.qrReady="1";renderedFor=url}catch{box.innerHTML=`<div class="qr-fallback">Không tạo được mã QR — hãy nhập mã phòng.</div>`;host.dataset.qrReady="0"}
 host.querySelector<HTMLButtonElement>(".qr-copy")?.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(url)}catch{const text=host.querySelector<HTMLElement>(".qr-link-text");text?.focus?.()}})}

function refresh(){prefillJoinForm();decorateLobby()}

document.addEventListener("click",e=>{const target=(e.target as Element|null)?.closest?.('[data-screen="join"]');if(target&&prefill)queueMicrotask(refresh)});
new MutationObserver(()=>queueMicrotask(refresh)).observe(document.body,{childList:true,subtree:true});
queueMicrotask(refresh);
