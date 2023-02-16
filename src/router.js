// Page Load Logic and Routing
let prevPage = async () => {window.prevPage = window.location.href.replace(window.origin,'')}; prevPage();
const redirect = async (event) => { window.history.pushState({}, '', event.target.href); popState(event); }
const popState = async (event) => { event.preventDefault();
    var location = event.target.href || event.target.location.href
    let route = location.replace(window.origin,'');
    if (route.split("#")[0] != window.prevPage.split("#")[0]){ prevPage(); handleRoute( route ); }; 
    route.indexOf('#') == -1 && window.scrollTo({ top: 0, behavior: 'smooth' });
    let t = document.getElementById(route.split('#')[1]); t && t.scrollIntoView({ behavior: 'smooth' });
}; window.onpopstate = function (event) { popState(event); };

export const handleRoute = async (route) => {
    // Loads a route using it's meta data.
    let content = await (await fetch(`./posts/${route.replace("/",'').replace('.html','') || 'index'}.json`)).json(); // Get the Upcoming Files Json Data 
    window.meta = content.meta; meta.content = content.content; document.title = window.meta.title; 

    // Load the template & Dispatch pageLoaded event for template/ content hooks
    const newTemplate = window.meta.template
    if (window.curTemplate != newTemplate){
        document.body.innerHTML = await (await fetch(`./${newTemplate}.html`)).text();
        await loadScripts(); 
    }
    window.dispatchEvent( new CustomEvent('templateLoaded') );
    window.curTemplate = newTemplate 
    
    setTimeout( ()=>{ 
        document.querySelectorAll('a[href^="./"]').forEach(link=>link.removeEventListener('click', redirect)); 
        document.querySelectorAll('a[href^="./"]').forEach(link =>link.addEventListener('click', redirect )) 
    }, 100);
}

// Load scripts from template.
const loadScripts = async () => {
    Array.from(document.getElementsByTagName("script")).forEach(script => {
        if (new RegExp("head|helmet|203|25.*.js", "i").test(script.getAttribute('src'))){ script.remove(); return; } // React Snap Only
        if (new RegExp("main|router", "i").test(script.getAttribute('src'))){  return; } // Client runs once
        if ( !script.getAttribute('tag') ) { return }
        const newScript = document.createElement("script"); 
        script.textContent && (newScript.textContent = script.textContent);
        script.src && (newScript.src = script.src);
        script.async && (newScript.async = script.async);
        script.type && (newScript.type = script.type);
        script.parentNode.replaceChild(newScript, script);
    } );
}