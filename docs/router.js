export const navEvent=async t=>{let e=(t.target.href||t.target.location.href).replace(window.origin,"");e.split("#")[0]!=window.oldRoute.split("#")[0]&&(await handleRoute(e),window.oldRoute=e),-1==e.indexOf("#")&&window.scrollTo({top:0,behavior:"smooth"});let o=document.getElementById(e.split("#")[1]);o&&o.scrollIntoView({behavior:"smooth"})};export const handleRoute=async t=>{let e=await(await fetch(`./posts/${t.replace("/","").replace(".html","")||"index"}.json`)).json();window.meta=e.meta,meta.content=e.content,document.title=window.meta.title,window?.template?.className!==window.meta.template&&(window.newTemplate=!0,document.body.innerHTML=await(await fetch(`./${window.meta.template}.html`)).text(),await loadScripts()),window.dispatchEvent(new CustomEvent("templateLoaded")),setTimeout((()=>{document.querySelectorAll('a[href^="./"]').forEach((t=>t.removeEventListener("click",window.redirect))),document.querySelectorAll('a[href^="./"]').forEach((t=>t.addEventListener("click",window.redirect)))}),100)};const loadScripts=async()=>{Array.from(document.getElementsByTagName("script")).forEach((t=>{if(new RegExp("head|helmet","i").test(t.getAttribute("src")))return void t.remove();if(console.log({script:t},t.getAttribute("src")),new RegExp("main|router","i").test(t.getAttribute("src")))return;if(!t.getAttribute("tag"))return;const e=document.createElement("script");t.textContent&&(e.textContent=t.textContent),t.src&&(e.src=t.src),t.async&&(e.async=t.async),t.type&&(e.type=t.type),t.parentNode.replaceChild(e,t)}))};