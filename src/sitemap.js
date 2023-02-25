// 5.
//  
const createNav = async () => {   
    let sitemap = await (await fetch('./posts/sitemap.json')).json();
    window.lbl = window.lbl || ` 
        <label for="toggle-sitemap">
            <div id='drag'>Drag me!</div>
            <span>&#x21e8;</span> Sitemap <span>&#x2715;</span>
        </label>
        <hr/>`
    sitemap = sitemap.map((item) => `<a id="${item.tab==window.meta.tab?'currentPage':('link_'+item.tab)}" id='link_${item.tab}' href="./${item.filename}.html" title="${item.summary}">${item.tab}</a>`)
    document.getElementById('sitemap').innerHTML = `${lbl}<div id='sitemap-content'>${sitemap.join('')}</div>`
} 
const capFirst = (str) => {let l=12; return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase().replace(':','').slice(0, l) + (str.length > l+1 ? '...' : '') }

function addTocToSiteMap() {
    // if (!('toc' in window.meta) || window.meta.toc != 'true') return;
    let cp = document.getElementById('currentPage'); cp && cp.removeAttribute('id')
    let tocNode = document.getElementById('toc'); tocNode && tocNode.remove()
    
    const sitemap = document.getElementById('sitemap')
    const currentPage = sitemap.querySelector(`a[title="${window.meta.summary}"]`)
    currentPage && currentPage.setAttribute('id', 'currentPage')

    // Find all headers and add them to the sitemap directly under the current page's link.
    let toc = [...document.querySelectorAll('h2, h3, h4, h5, h6')]
        .map((header) =>{ 
            const z=capFirst(header.innerText || header.textContent);
            const spaces = '&emsp;'.repeat(header.tagName.slice(1)-1)
            return `${spaces}<a id='anchor_link_${z}'href='#${z}'>${z}</a>`
        })
    .join('<br/>')
    tocNode = document.createElement('div'); tocNode.setAttribute('id', 'toc'); tocNode.innerHTML = toc; 
    currentPage.parentNode.insertBefore(tocNode, currentPage.nextSibling)
}

function addAnchorsToHeaders() {
    let headers = document.querySelectorAll('h2, h3, h4, h5, h6');
    headers.forEach(header => {
        header.id=capFirst(header.innerText||header.textContent);
        let anchor = document.createElement('a');
        anchor.id= anchor.href = 'anchor_'+header.id; 
        anchor.setAttribute('aria-label', 'Link to ' + header.id);
        header.parentNode.insertBefore(anchor, header.nextSibling);
    });
}

//
// Message comes from router.js when the template is loaded
//
window.addEventListener('templateLoaded', async () => { 
    let replace = (id) => {
        let el = document.getElementById(id); el.innerHTML = ''; 
        el.appendChild( document.createRange().createContextualFragment( meta[id] ));
    } 
    let populateTemplate = async () => { 
        ['content', 'title', 'summary'].map((id) => replace( id ) )
        addTocToSiteMap(); addAnchorsToHeaders();
    }
    window.newTemplate && ( await createNav(), populateTemplate(), document.querySelectorAll('a').forEach((el) =>{ el.id = el.id || el.innerText + Math.floor(Math.random() * 100)}) )
    !window.newTemplate && setTimeout( async ()=>{ populateTemplate(); }, 1100)
    const pageT = document.getElementById('pageTransitioneer'); 
    pageT && !window.newTemplate && (pageT.style.animation = 'pageTransitioneer 1s alternate 2, gradient 1s alternate 2')
    pageT && !window.newTemplate && setTimeout( ()=>{ !pageT?'':pageT.style.animation = 'none' }, 2300);  
}, {passive: true});