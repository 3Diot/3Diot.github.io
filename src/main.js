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
// window.isSmall&&{localStorage.setItem('displayChardin', 'false')
// localStorage.getItem('displayChardin')
// let chardin = new Chardin(document.querySelector('body'));
// chardin.start();}

// used by router and in dev
window.redirect = (async (event) =>{  
    event.preventDefault();
    console.log('redirect');
    window.history.pushState({}, '', event.target.href); 
    await getRouter();
    await getSitemap();
    await window.navEvent(event); 
} )

document.addEventListener('DOMContentLoaded', async () => {
    window.inDev = !!!window.content?.innerHTML.trim();
    console.log({inDev: window.inDev, isDev: !!!window.content?.innerHTML.trim(), content:window.content?.innerHTML.trim()})
    console.log('DOMContentLoaded', window.screen)
    const loadRouter = async() =>{ await getRouter(); await window.handleRoute(window.location.pathname); }
    if (window.inDev){ console.log('Dev Mode'); loadRouter(); getSitemap(); }
    window.oldRoute = window.location.pathname.replace(window.origin,'');
    window.addEventListener('popstate', async (e) => {e.preventDefault(); console.log('test2'); loadRouter(); });
    document.querySelectorAll('a[href^="./"]').forEach(link => link.addEventListener('click', window.redirect ) )    // 
})