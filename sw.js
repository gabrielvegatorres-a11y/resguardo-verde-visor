const C='visor-v2';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.add(new Request('./',{cache:'reload'}))).catch(()=>{}));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r,{cache:'no-store'}).then(x=>{const k=x.clone();caches.open(C).then(c=>c.put(r,k)).catch(()=>{});return x;}).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('./'))));});
