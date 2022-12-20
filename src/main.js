import "./main.css";

// Load the URI path's corresponding json file and it's desired template
// Every page loads this file unless it's it's own template
(async()=>{
    let page = window.location.pathname.replace("/",'').replace('.html','')
    if(page=='404')return

    //let toc = JSON.parse((await import(`./posts/toc.json`) ).default)
    let toc = await (await fetch((await import('./posts/toc.json') ).default)).json()
    toc = toc.map((item) => `<a href="./${item.filename}.html">${item.tab}</a>`).join('<br/>') 

    // Page Content 
    // let content = JSON.parse((await import(`./posts/${page||'index'}.json`) ).default)  
    let content = await (await fetch((await import(`./posts/${page||'index'}.json`) ).default)).json()  
    let meta = content.meta; meta.content = content.content

    // Page Template 
    let template = (await import(`./template_article.html`) ).default 
    const replaceThese = ['content', 'summary', 'title', 'badges', 'comments', 'filename', 'image', 'tab', 'template', 'toc', 'page'] 
    replaceThese.map((item) => meta[item] && (template = template.replace(new RegExp(`{{${item}}}`, 'g'), meta[item] ) ) ) 
    document.body.innerHTML = template 
    // [document.scripts]?.forEach((child) => child.src?.includes('head') && child.remove() || console.log(child) );
} )()