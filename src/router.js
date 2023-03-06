// Page Load Logic and Routing
window.oldRoute = location.pathname.replace(origin,'');
export const navEvent = async (event) => {
    console.log('~~~~> navEvent')
    let route = (event.target.href || event.target.location.href).replace(window.origin,'');  
    if (route.split("#")[0] != window.oldRoute.split("#")[0]){ await handleRoute( route ); window.oldRoute = route; }; 
    route.indexOf('#') == -1 && window.scrollTo({ top: 0, behavior: 'smooth' });
    let t = document.getElementById(route.split('#')[1]); t && t.scrollIntoView({ behavior: 'smooth' });
};


// Loads a route and it's dependencies via it's meta data obtained from it's path.
// 1) Get meta data from route. 2) Register service worker. 3) load template. 
// 4) Load scripts 5) Dispatch event listeners. 6) Update route change event listeners
export const handleRoute = async (route) => {

    await import(/* webpackChunkName: "sitemap" */ './sitemap.js');
    
    console.log('~~~~~~> handleRoute')

    // Get the Upcoming Files Json Data 
    let content = await (await fetch(`./posts/${route.replace("/",'').replace('.html','') || 'index'}.json`)).json(); 
    window.meta = content.meta; meta.content = content.content; document.title = window.meta.title; 

    // Load the template & Dispatch pageLoaded event for template/ content hooks 
    window.newTemplate = false;
    if (!(window?.template?.className === window.meta.template)){
        window.newTemplate = true;
        
        window.inDev = !!!window.content?.innerHTML.trim()
        if (!window.inDev) { console.log('window.inDev'), registerServiceWorker(); }
        
        // Load Template
        document.body.innerHTML = await (await fetch(`./${window.meta.template}.html`)).text(); 
        await loadScripts(); 
    } 
    // Listeners in template.html and | sitemap.js -> Populates window.newTemplate & updates toc. 
    window.dispatchEvent( new CustomEvent('templateRefreshed') );
    setTimeout( ()=>{ window.updateRedirectListeners() }, 100);
}

// Load scripts from template.
const loadScripts = async () => {
    console.log('~~~~~~~~> loadScripts');
    Array.from(document.getElementsByTagName("script")).forEach(script => {
        if ( !script.getAttribute('tag') ) { return }
        const newScript = document.createElement("script"); 
        ['src','type','async','textContent'].forEach( attr => { script[attr] && (newScript[attr] = script[attr]) } );
        script.parentNode.replaceChild(newScript, script);
    } );
}



const registerServiceWorker = async () => {
    console.log('~~~~~~~~> registerServiceWorker');
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