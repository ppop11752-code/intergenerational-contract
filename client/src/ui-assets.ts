export interface UiArtManifest{version:number;tileSize:number;iconSize:number;portraitSize:number;assets:Record<string,string>}
export const UI_ART_ROOT="./public/assets/ui/v1/";
export const UI_ART_MANIFEST=`${UI_ART_ROOT}manifest.json`;

export function portraitKey(characterId:string){let h=0;for(const ch of characterId)h=(h*31+ch.charCodeAt(0))>>>0;return`portraitBase${String(h%8+1).padStart(2,"0")}`}
export function assetUrl(manifest:UiArtManifest,key:string){const path=manifest.assets[key];return path?`${UI_ART_ROOT}${path}`:null}

function probe(url:string){return new Promise<boolean>(resolve=>{const img=new Image();img.onload=()=>resolve(true);img.onerror=()=>resolve(false);img.src=url})}
function cssName(key:string){return`--ui-${key.replace(/[A-Z]/g,m=>`-${m.toLowerCase()}`)}`}
function installAssetRules(){if(document.getElementById("ui-art-v1-rules"))return;const style=document.createElement("style");style.id="ui-art-v1-rules";style.textContent=`
:root{--ui-art-version:1}.world-map,.landmark,.parchment,.feature-sheet,.portrait-placeholder{image-rendering:pixelated}
html[data-ui-government="ready"] .landmark.gov{background-image:var(--ui-government);background-size:contain;background-repeat:no-repeat;background-position:center;background-color:transparent;color:transparent;border-color:transparent;box-shadow:none;min-width:160px;min-height:160px}
html[data-ui-parchment-panel="ready"] .parchment,html[data-ui-parchment-panel="ready"] .feature-sheet{border-image:var(--ui-parchment-panel) 24 fill / 24px / 0 stretch;background:none}
html[data-ui-button-primary="ready"] button.primary{border-image:var(--ui-button-primary) 20 fill / 20px / 0 stretch;background:none}
html[data-ui-dark-panel="ready"] .end-card{border-image:var(--ui-dark-panel) 24 fill / 24px / 0 stretch;background:none}
html[data-ui-cloud01="ready"] .ambient-cloud.c1{background-image:var(--ui-cloud01);background-size:contain;background-repeat:no-repeat;background-color:transparent}
html[data-ui-cloud02="ready"] .ambient-cloud.c2{background-image:var(--ui-cloud02);background-size:contain;background-repeat:no-repeat;background-color:transparent}
html[data-ui-fog-edge="ready"] .fog{background-image:var(--ui-fog-edge);background-size:cover;background-repeat:no-repeat;background-color:transparent}
`;document.head.appendChild(style)}

export async function initUiArt(){installAssetRules();let manifest:UiArtManifest;try{const r=await fetch(UI_ART_MANIFEST,{cache:"no-cache"});if(!r.ok)throw new Error(String(r.status));manifest=await r.json()}catch{document.documentElement.dataset.uiArt="fallback";return{manifest:null,loaded:[] as string[]}}
 const loaded:string[]=[];await Promise.all(Object.keys(manifest.assets).map(async key=>{const url=assetUrl(manifest,key);if(!url)return;if(await probe(url)){loaded.push(key);document.documentElement.style.setProperty(cssName(key),`url("${url}")`);document.documentElement.dataset[`ui${key[0].toUpperCase()}${key.slice(1)}` as any]="ready"}}));document.documentElement.dataset.uiArt=loaded.length?"partial":"fallback";return{manifest,loaded}}

if(typeof window!=="undefined"&&typeof document!=="undefined")void initUiArt();
