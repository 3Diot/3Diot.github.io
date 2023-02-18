// Page Load Logic and Routing
export const navEvent = async (event) => {
    let route = (event.target.href || event.target.location.href).replace(window.origin,'');  
    if (route.split("#")[0] != window.oldRoute.split("#")[0]){ await handleRoute( route ); window.oldRoute = route; }; 
    route.indexOf('#') == -1 && window.scrollTo({ top: 0, behavior: 'smooth' });
    let t = document.getElementById(route.split('#')[1]); t && t.scrollIntoView({ behavior: 'smooth' });
};

export const handleRoute = async (route) => { 
    // Loads a route using it's meta data.
    let content = await (await fetch(`./posts/${route.replace("/",'').replace('.html','') || 'index'}.json`)).json(); // Get the Upcoming Files Json Data 
    window.meta = content.meta; meta.content = content.content; document.title = window.meta.title; 

    // Load the template & Dispatch pageLoaded event for template/ content hooks 
    if (!(window?.template?.className === window.meta.template)){
        window.newTemplate = true;
        document.body.innerHTML = await (await fetch(`./${window.meta.template}.html`)).text();
        await loadScripts(); 
    }
    window.dispatchEvent( new CustomEvent('templateLoaded') );
    setTimeout( ()=>{  
        document.querySelectorAll('a[href^="./"]').forEach(link=>link.removeEventListener('click', window.redirect)); 
        document.querySelectorAll('a[href^="./"]').forEach(link =>link.addEventListener('click', window.redirect )) 
    }, 100); 
}

// Load scripts from template.
const loadScripts = async () => {
    Array.from(document.getElementsByTagName("script")).forEach(script => {
        if (new RegExp("head|helmet", "i").test(script.getAttribute('src'))){ script.remove(); return; } // React Snap Only
        console.log({script}, script.getAttribute('src') )
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