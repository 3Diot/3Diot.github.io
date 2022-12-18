// Every page loads this file which loads the path's json file and template
(async()=>{
    // function isPreRendering() {return navigator.userAgent === 'ReactSnap';};
    // if (isPreRendering())content=content.replace(/{{.\/assets}}/g, '')
    let page = window.location.pathname.replace("/",'').replace('.html','')
    if(page=='404')return

    // Site Nav
    //let toc = JSON.parse((await import(`../assets/posts/toc.json`) ).default)
    let toc = await (await fetch((await import('../assets/posts/toc.json') ).default)).json()
    toc = toc.map((item) => `<a href="./${item.filename}.html">${item.tab}</a>`).join('<br/>') 

    // Page Content 
    // let content = JSON.parse((await import(`../assets/posts/${page||'index'}.json`) ).default)  
    let content = await (await fetch((await import(`../assets/posts/${page||'index'}.json`) ).default)).json()  
    let meta = content.meta
    content = content.resp

    // Page Template 
    let template = (await import(`../assets/template_article.html`) ).default 
    if(content)template = template.replace(/{{content}}/g, content) 

    if(meta.summary){ console.log('summary', meta.summary) }
    if(meta.summary){ template = template.replace(/{{summary}}/g, meta.summary) }
    if(meta.title)template = template.replace(/{{title}}/g, meta.title) 
    if(meta.badges)template = template.replace(/{{badges}/g, meta.badges) 
    if(meta.comments)template = template.replace(/{{comments}}/g, meta.comments) 
    if(meta.filename)template = template.replace(/{{filename}}/g, meta.filename) 
    if(meta.image)template = template.replace(/{{image}}/g, meta.image) 
    if(meta.tab)template = template.replace(/{{tab}}/g, meta.tab) 
    if(meta.template)template = template.replace(/{{template}}/g, meta.template) 
    if(meta.toc)template = template.replace(/{{toc}}/g, meta.toc) 
    if(meta.toc)template = template.replace(/{{page}}/g, page) 
    document.body.innerHTML = template 
} )()

// https://github.com/stereobooster/react-snap/blob/88ef70dd419158c18b9845034513dc84a3e100d9/index.js
// https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages
// https://domains.google.com/registrar/cvminigames.com/

// https://stackoverflow.com/questions/67790280/css-loader-generates-urls-with-auto-prefix
// Option output.publicPath has default value 'auto' and I think the file-loader (in png's rule) can't interpret it right. In this case, one of the following values may be appropriate:
// '' - for relative URLs, url(logo.<hash>.png)
// '/' - for absolute URLs, url(/logo.<hash>.png)

// https://webpack.js.org/api/module-methods/

// https://webpack.js.org/guides/asset-modules/
