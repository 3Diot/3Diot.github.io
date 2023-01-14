import "./main.css";

// Load the URI path's corresponding json file and it's desired template
// Every page loads this file unless it's it's own template
(async()=>{
    let page = window.location.pathname.replace("/",'').replace('.html','')
    if(page=='404')return

    // Page Content 
    // let content = JSON.parse((await import(`./posts/${page||'index'}.json`) ).default)  
    let content = await (await fetch((await import(/* webpackChunkName: "[request]" */ `./posts/${page||'index'}.json`) ).default)).json()  
    let meta = content.meta; meta.content = content.content
    console.log('meta', meta)
    
    // Page Template 
    let template = (await import(`./template_article.html`) ).default 
    const replaceThese = ['content', 'summary', 'title', 'badges', 'comments', 'filename', 'image', 'tab', 'template', 'toc', 'page'] 
    replaceThese.map((item) => meta[item] && (template = template.replace(new RegExp(`{{${item}}}`, 'g'), meta[item] ) ) ) 
    document.body.innerHTML = template 

    const scripts = [...document.scripts]
    console.log('scripts',scripts)
    scripts.forEach((child) =>{
        child.src && child.remove()
    } );
    
    const links = [...document.querySelectorAll("link[as='script']")]
    console.log('links', links) 
    links.forEach((child) =>{ 
        child.href && child.remove() 
    } ); 

    // let toc = JSON.parse((await import(`./posts/toc.json`) ).default)
    let toc = await (await fetch((await import(/* webpackChunkName: "toc" */ './posts/toc.json') ).default)).json() 
    document.getElementById('toc').innerHTML = toc.map((item) => `<a href="./${item.filename}.html">${item.tab}</a>`).join('<br/>')
    console.log('toc', toc)
    
    // procedurally grab all header tags to create table of contents     
    let show = ()=> { 
        [...document.querySelectorAll('h2, h3, h4, h5, h6')]
            .map((x) => { 
                document.getElementById('outline').append(x.innerHTML) 
        }) 
    }; meta.toc == 'false' && show();

    // alter the the offsetPath of an HTML element with an ID of 'motion-demo' by replacing any 1's with the view width and any 2's with the view height. 
    let md = document.getElementById("mframe");
    md.style.offsetPath = md.style.offsetPath.replace(/1/g, window.innerWidth).replace(/2/g, window.innerHeight)
    
    // create svg element
    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg1.setAttribute ("width", "100vw" ); svg1.setAttribute ("height", "100vh" );  
    function rir(min, max) { return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min); }
    Array(rir(5,15)).fill().map( () => {  
        const x = rir(0,100)+'vh'; const y = rir(0,100)+'vh';
        const size = rir(40,80)
        var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        rect.setAttribute('x', x); rect.setAttribute('y', y);
        rect.setAttribute('height', size); rect.setAttribute('width', size);
        rect.setAttribute('fill', ['red','green','orange', 'blue'][rir(0,3)]);
        svg1.appendChild(rect);
    })
    document.getElementById('svg_bg').appendChild(svg1); 
    const rectangles = svg1.querySelectorAll('rect');
    rectangles.forEach(rect => {
        let y = parseInt(rect.getAttribute('y').slice(0, -2))
        rect.animate([ 
            {x: rect.getAttribute('x'), y: (-125+y)+'vh'},
            {x: rect.getAttribute('x'), y: (125+y)+'vh'},
        ], {
            duration: 10000,
            iterations: Infinity,
            direction:'alternate', 
        });
    });
} )()