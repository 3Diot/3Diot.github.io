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
    console.log("%cHire Me: charleskarpati@gmail.com","color: blue; font-family:sans-serif; font-size: 20px");
    console.log('%c Thank you!!', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)');   
    window.oldRoute = window.location.pathname.replace(window.origin,'')
    document.querySelectorAll('a[href^="./"]').forEach(link => link.addEventListener('click', window.redirect ) )
    window.addEventListener('popstate', async () => { loadRouter(); });
})

if('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/service-worker.js')
        .then(function(registration) { 
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) { 
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    // set padding here
    // set checkbox here
    // localStorage.getItem('displayChardin')
    localStorage.setItem('displayChardin', 'false')
    // let chardin = new Chardin(document.querySelector('body'));
    // chardin.start();
}