import "./main.css";

// Page Load Logic and Routing
const prevPage = async () => {window.prevPage = window.location.href.replace(window.origin,'')}; prevPage();
const redirect = async (event) => { window.history.pushState({}, '', event.target.href); popState(event); }
const popState = async (event) => {     event.preventDefault();
    var location = event.target.href || event.target.location.href
    let route = location.replace(window.origin,'') 
    if (route.split("#")[0] != window.prevPage.split("#")[0]){ prevPage(); handleRoute( route ); }; 
    route.indexOf('#') == -1 && window.scrollTo(0, 0);
}; window.onpopstate = function (event) { popState(event); };

// 1. 
// Strip initial render logic w/ react-snap (head & main js) before the template loads.
const removeScripts = async() => { 
    /*
    const scripts = [...document.scripts]
    scripts.forEach((child) =>{
        new RegExp("head|helmet", "i").test(child.src) ? child.remove() : console.log('keep', child)
    } );
    
    const links = [...document.querySelectorAll("link[as='script']")] 
    links.forEach((child) =>{ 
        console.log('links', child)
        child.href && child.remove() 
    } ); 
    */
}

// 2. Loads a route using it's meta data.
const handleRoute = async (route) => { 
    document.querySelectorAll('a[href^="./"]').forEach(link=>link.removeEventListener('click', redirect));
    route = route.replace("/",'').replace('.html','') || 'index'
    window.meta = await getMeta( route ); document.title = window.meta.title; // 3
    await loadTemplate() // 4
    createNav() // 5
    setTimeout( ()=>{
        let details = document.querySelectorAll('summary,button');
        details.forEach((el) => observer.observe(el));
        document.querySelectorAll('a[href^="./"]').forEach(link =>link.addEventListener('click', redirect ))
    }, 100);
}

// 3.
// Retrieve page content from the JSON file
const getMeta = async(page) => {
    // let content = JSON.parse((await import(`./posts/${page||'index'}.json`) ).default)  
    let content = await (await fetch((await import(/* webpackChunkName: "[request]" */ `./posts/${page}.json`) ).default)).json()  
    // console.log('page', page, content)
    let meta = content.meta; meta.content = content.content
    return meta
}

// 4. 
// Load the template and replace the {{content}} with the page content
const loadTemplate = async () => {
    let template = (await import(`./${window.meta.template}.html`) ).default
    if(!window.template || window.template != window.meta.template){
        document.body.innerHTML = template
        Array.from(document.getElementsByTagName("script")).forEach(script => {
                const newScript = document.createElement("script");
                newScript.textContent = script.textContent;
                script.parentNode.replaceChild(newScript, script);
            }
        );
    }
    const replaceThese = ['content', 'title', 'summary']
    // replaceThese.map((item) => meta[item] && (template = template.replace(new RegExp(`{{${item}}}`, 'g'), meta[item] ) ) )
    replaceThese.map((item) => {document.getElementById(item).innerHTML = meta[item] })
    window.template = window.meta.template    
} 


// 5.
//  
const createNav = async () => {  
    // let sitemap = JSON.parse((await import(`./posts/sitemap.json`) ).default) 
    let sitemap = ( await (await fetch((await import(/* webpackChunkName: "sitenav" */ './posts/sitemap.json') ).default)).json() )
    window.lbl = window.lbl || `
    <label for="toggle-sitemap">
    <span>&#x21e8;</span>&emsp;Sitemap
    </label>
    <br/>` 

    // Add in the TOC to the Sitemap for the given page.
    sitemap = sitemap.map((item) => `<a id="${item.tab==window.meta.tab && 'currentPage'}" href="./${item.filename}.html" title="${item.summary}"> ${item.tab==window.meta.tab && '-' || ''} ${item.tab} </a>`)
    document.getElementById('sitemap').innerHTML = lbl + sitemap.join('<br/>')
    // if (!('toc' in window.meta) || window.meta.toc != 'true') return;
    addTocToSiteMap();
    addAnchorsToHeaders();
} 
const capFirst = (str) => {let l=12; return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replace(':','').slice(0, l) + (str.length > l+1 ? '...' : '') }
function addTocToSiteMap() {
    let toc = '<br/>'+[...document.querySelectorAll('h2, h3, h4, h5, h6')]
        .map((header) =>{
            const z=capFirst(header.innerText); 
            const spaces = '&emsp;'.repeat(header.tagName.slice(1)-1)
            return `${spaces}<a href='#${z}'>${z}</a>`
        })
    .join('<br/>')
    let tocNode = document.createElement('div'); tocNode.style.display='inline';tocNode.innerHTML = toc;
    const cp = document.getElementById('currentPage') 
    cp.parentNode.insertBefore(tocNode, cp.nextSibling)
}
function addAnchorsToHeaders() {
    let headers = document.querySelectorAll('h2, h3, h4, h5, h6');
    headers.forEach(header => {
        header.id=capFirst(header.innerText);
        let anchor = document.createElement('a');
        header.parentNode.insertBefore(anchor, header.nextSibling);
    });
}

// 6 
// Hit em w/ the ol razzle dazzle; and give em the wiggles~! >:D
// IntersectionObserver for animations and Highlighting active TOC Anchor link
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {let e=entry.target
        let txt = "0.5s ease-in-out 0s 2 normal none running wiggle";
        e.tagName == 'SUMMARY' && (txt = "0.5s ease-in-out 0s 3 normal none running spin");
        if (entry.isIntersecting){e.style.animation = txt } 
        else { e.style.animation == txt && (e.style.animation = '') }
    });
}); 

// Onstart load the URI path's corresponding json file and it's desired template
(async()=>{
    window.history.replaceState(null, "", "");
    removeScripts()
    await handleRoute(window.location.pathname);
} )()  
// https://www.npmjs.com/package/html-inline-script-webpack-plugin