import{roomCodeFromSearch,roomJoinUrl}from"./qr-contract.js";

declare global{interface Window{QRCode?:new(el:HTMLElement,opts:any)=>any}}

const prefill=roomCodeFromSearch(window.location.search);
let renderedFor="";

function ensureStyle(){if(document.getElementById("qr-runtime-style"))return;const s=document.createElement("style");s.id="qr-runtime-style";s.textContent=`.qr-placeholder{width:auto!important;height:auto!important;min-width:232px!important;min-height:232px!important;overflow:visible!important;display:grid;justify-items:center;align-content:start;gap:.45rem;padding:8px}.qr-functional{box-sizing:content-box!important;width:192px!important;height:192px!important;min-width:192px!important;min-height:192px!important;background:#fff;padding:16px!important;overflow:visible!important;display:block;line-height:0}.qr-functional canvas,.qr-functional img{display:block!important;width:192px!important;height:192px!important;max-width:none!important;max-height:none!important;margin:0!important;padding:0!important;image-rendering:auto!important}.qr-functional canvas[style*="display: none"],.qr-functional img[style*="display: none"]{display:none!important}.qr-fallback{box-sizing:border-box;min-height:192px;display:grid;place-items:center;max-width:192px;text-align:center;line-height:1.35;color:#24190f}.qr-link-text{max-width:260px;overflow-wrap:anywhere;user-select:all;font-size:.72rem;line-height:1.25}.qr-helper{font-size:.76rem;opacity:.8}`;document.head.appendChild(s)}

function prefillJoinForm(){if(!prefill)return;const input=document.querySelector<HTMLInputElement>("#code");if(!input)return;if(!input.value)input.value=prefill;let helper=document.querySelector<HTMLElement>(".qr-helper");if(!helper){helper=document.createElement("small");helper.className="qr-helper";helper.textContent="Mã phòng đã được điền từ QR.";input.closest("label")?.appendChild(helper)}}

function decorateLobby(){const host=document.querySelector<HTMLElement>(".qr-placeholder");const pin=document.querySelector<HTMLElement>(".room-pin")?.textContent?.trim()||"";if(!host||!pin)return;const url=roomJoinUrl(window.location.origin,pin);if(!url)return;if(renderedFor===url&&host.dataset.qrReady==="1")return;ensureStyle();host.innerHTML=`<div class="qr-functional" aria-label="Mã QR tham gia phòng"></div><button type="button" class="qr-copy">SAO CHÉP LIÊN KẾT</button><small class="qr-link-text">${url}</small>`;const box=host.querySelector<HTMLElement>(".qr-functional")!;try{if(!window.QRCode)throw new Error("renderer unavailable");new window.QRCode(box,{text:url,width:192,height:192,colorDark:"#000000",colorLight:"#ffffff",correctLevel:(window.QRCode as any).CorrectLevel?.M});host.dataset.qrReady="1";renderedFor=url}catch{box.innerHTML=`<div class="qr-fallback">Không tạo được mã QR — hãy nhập mã phòng.</div>`;host.dataset.qrReady="0"}
 host.querySelector<HTMLButtonElement>(".qr-copy")?.addEventListener("click",async()=>{try{await navigator.clipboard.writeText(url)}catch{const text=host.querySelector<HTMLElement>(".qr-link-text");text?.focus?.()}})}

function refresh(){prefillJoinForm();decorateLobby()}

document.addEventListener("click",e=>{const target=(e.target as Element|null)?.closest?.('[data-screen="join"]');if(target&&prefill)queueMicrotask(refresh)});
new MutationObserver(()=>queueMicrotask(refresh)).observe(document.body,{childList:true,subtree:true});
queueMicrotask(refresh);
