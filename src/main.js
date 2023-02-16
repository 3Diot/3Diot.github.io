import "./main.css";
import "./sitemap.js";
import { handleRoute } from "./router.js";

(async()=>{
    if(!!window.content?.innerHTML.trim() ){ return }
    console.log('Running in dev mode or react-snap!')
    window.history.replaceState(null, "", "");
    window.initializing = true
    handleRoute(window.location.pathname);
    window.initializing = false
} )();
// let content = JSON.parse((await import(`./posts/${page||'index'}.json`) ).default)  
// let content = await (await fetch((await import(/* webpackChunkName: "[request]" */ `./posts/${page}.json`) ).default)).json()  
// let content = await (await fetch(`./posts/${route.replace("/",'').replace('.html','') || 'index'}.json`)).json(); 

