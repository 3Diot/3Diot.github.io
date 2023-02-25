import "./main.css"; 
// import "./template_article.css"; 

console.log('%c Like what you see?', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 red , 6px 6px 0 green , 9px 9px 0 blue');   
console.log("%c Contact me: charleskarpati@gmail.com","color: blue; font-family:sans-serif; font-size: 20px");

const getRouter = async()=>{
    // lazy load router.js
    !!!window.navEvent && ({ handleRoute: window.handleRoute, navEvent: window.navEvent } = await import(/* webpackChunkName: "router" */ './router.js'));
}
const getSitemap = async()=>{
    (!window.inDev || !!!window.navEvent) && ({ handleRoute: window.handleRoute, navEvent: window.navEvent } = await import(/* webpackChunkName: "sitemap" */ './sitemap.js'));
}

window.isSmall =  window.screen.width <= 800; 
window.inDev = !!!window.content?.innerHTML.trim();
// window.isSmall&&{localStorage.setItem('displayChardin', 'false')
// localStorage.getItem('displayChardin')
// let chardin = new Chardin(document.querySelector('body'));
// chardin.start();}

// used by router and in dev
window.redirect = (async (event) =>{  
    event.preventDefault();console.log('test1');
    window.history.pushState({}, '', event.target.href); 
    await getRouter();
    await getSitemap();
    await window.navEvent(event); 
} )

document.addEventListener('DOMContentLoaded', async () => {
    const loadRouter = async() =>{ await getRouter(); await window.handleRoute(window.location.pathname); }
    if (window.inDev){ loadRouter(); getSitemap(); }
    window.oldRoute = window.location.pathname.replace(window.origin,'');
    window.addEventListener('popstate', async (e) => {e.preventDefault(); console.log('test2'); loadRouter(); });
    document.querySelectorAll('a[href^="./"]').forEach(link => link.addEventListener('click', window.redirect ) )    // 
})


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

if (!inDev) { registerServiceWorker(); }