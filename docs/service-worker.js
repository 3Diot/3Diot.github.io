const urlsToCache=["/"];self.addEventListener("activate",(e=>{e.waitUntil((async()=>{self.registration.navigationPreload&&await self.registration.navigationPreload.enable()})())})),self.addEventListener("install",(async e=>{try{const a=await caches.open("cv-website-cache-v8");await a.addAll(urlsToCache),e.waitUntil(a)}catch(e){}}));const putInCache=async(e,a)=>{const t=await caches.open("cv-website-cache-v8");await t.put(e,a)},deleteCache=async e=>{await caches.delete(e)};self.addEventListener("activate",(e=>{e.waitUntil((async()=>{const e=["cv-website-cache-v8"],a=(await caches.keys()).filter((a=>!e.includes(a)));await Promise.all(a.map(deleteCache))})())}));self.addEventListener("fetch",(e=>{e.respondWith((async({request:e,preloadResponsePromise:a})=>{const t=await caches.match(e);if(t)return t;const s=await a;if(s)return console.info("using preload response",s),putInCache(e,s.clone()),s;try{const a=await fetch(e);return putInCache(e,a.clone()),a}catch(e){return new Response("Network error happened",{status:408,headers:{"Content-Type":"text/plain"}})}})({request:e.request,preloadResponsePromise:e.preloadResponse}))}));