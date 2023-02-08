import "./main.css";

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
    window.meta = await getMeta( route )
    document.title = window.meta.title
    await loadTemplate()
    createToc() 
    createNav() 
    setTimeout( ()=>{
        document.querySelectorAll('a[href^="./"]').forEach(link =>link.addEventListener('click', redirect ))
    }, 100);
}

const redirect = async (event) => {
    window.history.pushState({}, '', event.target.href);
    popState(event);
}
const popState = async (event) => {
    event.preventDefault();
    console.log('popstate', event)
    var location = event.target.href || event.target.location.href
    let route = location.replace(window.origin,'') 
    handleRoute( route );
}
window.onpopstate = function (event) { popState(event); };

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

    // Give em w/ the ol razzle dazzle! 
    // Hit em w/ the wiggles.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {let e=entry.target
            let txt = "0.5s ease-in-out 0s 3 normal none running wiggle";
            e.tagName == 'SUMMARY' && (txt = "0.5s ease-in-out 0s 3 normal none running spin");
            if (entry.isIntersecting){e.style.animation = txt } 
            else { e.style.animation == txt && (e.style.animation = '') }
        });
    }); 
    const details = [...document.querySelectorAll('summary,button')];
    details.map((el) => observer.observe(el));

    function addAnchorsToHeaders() {
        let headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headers.forEach(header => {
            header.id=header.innerHTML.toLowerCase().replace(':','');
            let anchor = document.createElement('a');
            anchor.setAttribute('href', '#' + header.id);
            anchor.innerHTML = '&para;';
            anchor.style.float = 'right';
            header.appendChild(anchor);
        });
    }
    addAnchorsToHeaders();
    
} 

// 5
// procedurally grab all header tags to create table of contents 
const createToc = async () => { 
    'toc' in window.meta && window.meta.toc == 'true' && ( document.getElementById('outline').innerHTML = '<h2>Table of Contents</h2>' + [document.querySelectorAll('h2, h3, h4, h5, h6')].map((x) => x.innerHTML).join('<br />')  )
} 

// 5.
//  
const createNav = async () => {  
    // let sitemap = JSON.parse((await import(`./posts/sitemap.json`) ).default) 
    let sitemap = ( await (await fetch((await import(/* webpackChunkName: "sitenav" */ './posts/sitemap.json') ).default)).json() )
    window.lbl = window.lbl || `
    <label for="toggle-sitemap">
    <span>&#x21e8;</span>&nbsp;&nbsp;&nbsp;&nbsp;Sitemap
    </label>
    <br/>`
    // console.log({sitemap})
    document.getElementById('sitemap').innerHTML = lbl + sitemap.map((item) => `<a href="./${item.filename}.html" title="${item.summary}"> ${item.tab==window.meta.tab && '-' || ''} ${item.tab} </a>`).join('<br/>')
} 

// Onstart load the URI path's corresponding json file and it's desired template
(async()=>{
    window.history.replaceState(null, "", "");
    removeScripts() 
    await handleRoute(window.location.pathname);
} )()  
// https://www.npmjs.com/package/html-inline-script-webpack-plugin