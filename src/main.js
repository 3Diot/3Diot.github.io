import "./main.css"; 
import "./template_article.css"; 
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

// Used by router and in dev
window.redirect = (async (event=false) =>{  
    console.log('~~> Redirect') 
    event && event.preventDefault()
    !window.navEvent && ({ handleRoute: window.handleRoute, navEvent: window.navEvent } = await import(/* webpackChunkName: "router" */ './router.js'));
    event.type == 'click' ? ( window.history.pushState({}, '', event.target.href), window.navEvent(event) ) : window.handleRoute(window.location.pathname)
} ) 

window.updateRedirectListeners = () => {
    document.querySelectorAll('a[href^="./"]').forEach(link=>link.removeEventListener('click', window.redirect)); 
    document.querySelectorAll('a[href^="./"]').forEach(link =>link.addEventListener('click', window.redirect ))  
}

document.addEventListener('DOMContentLoaded', async () => { 
    console.log('> START DOMContentLoaded')

    window.isSmall =  window.screen.width <= 800; 
    window.inDev = !!!window.content?.innerHTML.trim(); 
    window.oldRoute = window.location.pathname.replace(window.origin,'');

    // All do the same thing
    window.inDev && window.redirect();                     // IsDev/ react-snap
    window.addEventListener('popstate', window.redirect);  // Browser History 
    window.updateRedirectListeners();                      // Href ./ Link
})
