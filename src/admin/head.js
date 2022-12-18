import React from "react";
import ReactDOMServer from 'react-dom/server';
import { Helmet, HelmetProvider } from 'react-helmet-async';

(async () => {  
const page = window.location.pathname.replace("/",'').replace('.html','')
if(page=='404')return
//let hr = JSON.parse((await import(`../../assets/header.json`) ).default)
let hr = await (await fetch((await import('../../assets/header.json') ).default)).json() 

let forBlog = !page.includes('admin')
let csp = `img-src 'self'
  http://localhost
  https://unpkg.com/leaflet@1.3.0/dist/images/marker-shadow.png
  https://unpkg.com/leaflet@1.3.0/dist/images/marker-icon.png
  https://bniajfi.org/wp-content/uploads/2014/04/bnia_logo_new.png
  data:;
`
if(forBlog){ 
  //let content = JSON.parse((await import(`../../assets/posts/${page||'index'}.json`) ).default) 
  let content = await (await fetch((await import(`../../assets/posts/${page||'index'}.json`) ).default)).json() 
  hr = {...hr, ...content.meta}
  csp = `img-src 'self' 
  https://img.shields.io/ 
  https://raw.githubusercontent.com/ 
  https://pete88b.github.io/ 
  https://visitor-badge.laobi.icu/ 
  data:;
`
}

// let local = window.location.href;
// let imageLocation = local+"images/"+hr.shortName.trim().toLowerCase()+"/"
// imageLocation = imageLocation.replace(/\s/g, "_").replace("index.html", "");
// Hashtags get commented out. careful for "background_color" "theme_color"
// <meta name="theme-color" media="(prefers-color-scheme: light)" content="#3880ff" /> 
/* 
ion-content > div { margin-left: 25%; padding-top: 40px;  padding-bottom: 40px; }  
:root {
  --main-bg-color: coral;
}
pre{ width: 800px; 
*/

let header = <HelmetProvider>
      <Helmet>    
        <meta http-equiv="x-ua-compatible" content="ie=edge"/>
        <meta http-equiv="Content-Security-Policy" content={csp}/>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1"/>
        <meta http-equiv="x-dns-prefetch-control" content="off"/>
        <link rel="shortcut icon" type="image/x-icon" href={ hr.icon16 } />
        <title>{hr.tab||hr.longName}</title>
        <meta name="author"             content={hr.author}/>
        <meta name="description"        content={hr.description}/>
        <meta name="keywords"           content="HTML,CSS,XML,JavaScript"/>

        <meta name="HandheldFriendly"   content="True"/>
        <meta name="MobileOptimized"    content="420"/>
        <meta name="subject"            content={hr.type}/>
        <meta name="application-name"   content={hr.applicationname}/>

        <link rel="author"              href={hr.author}/>
        <link rel="license"             href="https://opensource.org/licenses/MIT"/>
        <link rel="canonical"           href={`https://cvminigames.com/${page}`} /> 
        <link rel="me"                  href={hr.owneremail} type="text/html"/>
        <link rel="me"                  href={hr.ownername}/>
        <link rel="me"                  href={hr.ownerphone}/>

        <meta name="geo.region"         content="US-MD" />
        <meta name="geo.placename"      content="Baltimore" />
        <meta name="geo.region"         content={hr.title} />
        <meta name="geo.placename"      content={hr.title} />
        <meta name="geo.position"       content={hr.geoposition} />
        <meta name="ICBM"               content={hr.geoposition} />

        <meta name="theme-color"        content={hr.themecolor}/>
        <meta name="mobile-web-app-capable" content="yes"/>
        <meta name="google"             content="notranslate"/>

        <meta name="robots"             content="index,follow"/>
        <meta name="googlebot"          content="index,follow"/>
        <meta name="google"             content="nositelinkssearchbox"/>
        <meta name="google"             content="notranslate"/>
        <meta name="rating"             content="General"/>
        <meta name="referrer"           content="no-referrer"/>
        <meta name="format-detection"   content="telephone=no"/>
        <meta name="renderer"           content="webkit|ie-comp|ie-stand"/>
        <noscript>Your browser does not support JavaScript!</noscript>

        <link rel="icon" type="image/ico" sizes="16x16"     href={hr.icon16}/>
        <link rel="icon" type="image/ico" sizes="24x24"     href={hr.icon24}/>
        <link rel="icon" type="image/ico" sizes="32x32"     href={hr.icon32}/>
        <link rel="icon" type="image/ico" sizes="64x64"     href={hr.icon64}/>
        <meta property="og:image"       content={hr.image}/>
        <meta name="twitter:image"      content={hr.image}/>
        <meta itemprop="image"          content={hr.image}/>

        <meta property="article:author" content={hr.author}/>
        <meta property="og:url" content={`http://www.cvminigames.com/${hr.filename||'admin'}`} />
        <meta property="og:title"       content={hr.title}/>
        <meta property="og:description" content={hr.summary || hr.description}/>
        <meta property="og:type"        content={hr.type} />
        <meta property="og:site_name"   content={hr.applicationname}/>
        <meta property="og:locale"      content="en_US"/>
        <meta property="op:markup_version" content="v1.0"/>
        <meta property="fb:article_style"content="default"/>
        <meta name="twitter:card"       content={hr.summary || hr.description} />
        <meta name="twitter:site"       content={hr.twittersite}/>
        <meta name="twitter:creator"    content={hr.twitterauthor}/>
        <meta name="twitter:title"      content={hr.title}/>
        <meta name="twitter:description"content={hr.summary || hr.description}/>
        <meta itemprop="name"           content={hr.title}/>
        <meta itemprop="description"    content={hr.summary || hr.description}/>
        <meta name="pinterest"          content="nopin" description={"Sorry, you can't save from this website!"}/>

        {forBlog && <script type="module" src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.esm.js"></script>}
        {forBlog && <script nomodule src="https://cdn.jsdelivr.net/npm/@ionic/core/dist/ionic/ionic.js"></script>}
        {forBlog && <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@ionic/core/css/ionic.bundle.css" />}
      </Helmet>
  </HelmetProvider>
  
let rootElement = document.querySelector("#head")
if(rootElement){ ReactDOMServer.renderToString(header) }

} )()
