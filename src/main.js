import "./main.css"; 
import "./template_article.css"; 

/*
templateScript
/posts
templateRefreshed

remove 'index' from sitemap path route thing

<meta name="robots" content="index,follow"></meta>
<meta property="og:type" content="city">
<meta property="og:site_name" content="CVAdmin"></meta>
<meta property="op:markup_version" content="v1.0"></meta>
<link rel="apple-touch-icon" href="l337h4x">

https://www.searchenginejournal.com/technical-seo/schema/
https://www.google.com/webmasters/markup-helper/u/0/?hl=en
https://developers.google.com/search/docs/appearance/structured-data
https://developers.facebook.com/tools/debug/?q=https%3A%2F%2Fwww.cvminigames.com
https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started

XML sitemap generator & deadlink checker https://www.xml-sitemaps.com/details-cvminigames.com-49d3d3298.html
visual sitemap -> https://octopus.do/import?url=Cvminigames.com
*/

// https://unicodearrows.com/
// https://www.toptal.com/designers/htmlarrows/arrows/


//
// App: Loads Ipynb files into a template.
//
// Main.js
// 
// Description: Jumping point for the app. Adds event listeners to lazy load the router.
// Router handles the historyAPI, ServiceWorkers, Updating the Sitemap, and ReactSnap prerender logic. 
//

console.log('%c Like what you see?', 'font-weight: bold; font-size: 50px;color: red; text-shadow: 3px 3px 0 red , 6px 6px 0 green , 9px 9px 0 blue');   
console.log("%c Contact me: charleskarpati@gmail.com","color: blue; font-family:sans-serif; font-size: 20px");

window.updateRedirectListeners = () => { document.querySelectorAll('a[href^="./"]').forEach(l=>[l.removeEventListener,l.addEventListener].forEach(f=>f.call(l,'click',redirect))) }
window.redirect = (async (event=false) =>{ 
    event && event.preventDefault() 
    !window.navEvent && ({ handleRoute: window.handleRoute, navEvent: window.navEvent } = await import(/* webpackChunkName: "router" */ './router.js')); 
    event.type == 'click' ? ( history.pushState({}, '', event.target.href), navEvent(event) ) : handleRoute(location.pathname) 
} ) 

document.addEventListener('DOMContentLoaded', async () => { 
    addEventListener('popstate', redirect);         // Browser History 
    updateRedirectListeners();                      // Href ./ Link
})
