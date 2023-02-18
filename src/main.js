import "./main.css"; 

const getImports = async()=>{
    !!!window.navEvent && ({ handleRoute: window.handleRoute, navEvent: window.navEvent } = await import(/* webpackChunkName: "router" */ './router.js'));
}

window.redirect = (async (event) => {  
    event.preventDefault();
    window.history.pushState({}, '', event.target.href); 
    await getImports();
    await window.navEvent(event); 
} );

document.addEventListener('DOMContentLoaded', async () => {
    let loadRouter = async() =>{ await getImports(); await window.handleRoute(window.location.pathname); }
    if (!!!window.content?.innerHTML.trim()){ loadRouter(); }
    window.oldRoute = window.location.pathname.replace(window.origin,'')
    document.querySelectorAll('a[href^="./"]').forEach(link => link.addEventListener('click', window.redirect ) )
    window.addEventListener('popstate', async () => { loadRouter(); });
})