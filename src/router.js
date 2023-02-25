/*
template.html loads

main.js is in the head.
- redirect fns
- window.isSmall
- window.indev
- register service worker

sitemap smallScreen code in th footer.

mainjs ondomcontentloaded
- - > does not wait for async scripts to load but yes to module and defer type scripts
- - > lazy load router
- - > load sitemap
*/

// Page Load Logic and Routing
export const navEvent = async (event) => {
    console.log('navEvent', event)
    if (!window.inDev) { registerServiceWorker(); }
    let route = (event.target.href || event.target.location.href).replace(window.origin,'');  
    if (route.split("#")[0] != window.oldRoute.split("#")[0]){ await handleRoute( route ); window.oldRoute = route; }; 
    route.indexOf('#') == -1 && window.scrollTo({ top: 0, behavior: 'smooth' });
    let t = document.getElementById(route.split('#')[1]); t && t.scrollIntoView({ behavior: 'smooth' });
};

export const handleRoute = async (route) => {
    console.log('handleRoute', route) 
    // Loads a route using it's meta data.
    let content = await (await fetch(`./posts/${route.replace("/",'').replace('.html','') || 'index'}.json`)).json(); // Get the Upcoming Files Json Data 
    window.meta = content.meta; meta.content = content.content; document.title = window.meta.title; 

    // Load the template & Dispatch pageLoaded event for template/ content hooks 
    window.newTemplate = false;
    if (!(window?.template?.className === window.meta.template)){
        window.newTemplate = true;
        document.body.innerHTML = await (await fetch(`./${window.meta.template}.html`)).text();
        await loadScripts();  
    }
    window.dispatchEvent( new CustomEvent('templateLoaded') );
    window.dispatchEvent( new CustomEvent('templateRefreshed') );
    setTimeout( ()=>{  
        document.querySelectorAll('a[href^="./"]').forEach(link=>link.removeEventListener('click', window.redirect)); 
        document.querySelectorAll('a[href^="./"]').forEach(link =>link.addEventListener('click', window.redirect )) 
    }, 100); 
}

// Load scripts from template.
const loadScripts = async () => {
    Array.from(document.getElementsByTagName("script")).forEach(script => {
        if (new RegExp("head|helmet", "i").test(script.getAttribute('src'))){ script.remove(); return; } // Dev & React Snap inits Only
        if (new RegExp("main|router", "i").test(script.getAttribute('src'))){  return; } // Dev & React-Snap & Client runs Init Only.
        if ( !script.getAttribute('tag') ) { return }
        const newScript = document.createElement("script"); 
        script.textContent && (newScript.textContent = script.textContent);
        script.src && (newScript.src = script.src);
        script.async && (newScript.async = script.async);
        script.type && (newScript.type = script.type);
        script.parentNode.replaceChild(newScript, script);
    } );
}



const registerServiceWorker = async () => {
    if (!("serviceWorker" in navigator)) { return }
    try {
        const registration = await navigator.serviceWorker.register("/service-worker.js");
        if (registration.installing) { console.log("Service worker installing"); } 
        else if (registration.waiting) { console.log("Service worker installed"); } 
        else if (registration.active) { console.log("Service worker active"); } 
        registration.onupdatefound = () => {
            const installingWorker = registration.installing;
            installingWorker.onstatechange = () => {
                if (installingWorker.state != 'installed') return 
                if (navigator.serviceWorker.controller) { console.log('New content is available; please refresh.'); } // Purge occurred. fresh content added to the cache.
                else { console.log('Content is cached for offline use.'); } // Everything has been precached.
            };
        };
    }
    catch (error) { console.error(`Registration failed with ${error}`); }
};