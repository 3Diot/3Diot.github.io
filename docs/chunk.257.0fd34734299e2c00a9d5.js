(self.webpackChunkname=self.webpackChunkname||[]).push([[257],{257:function(){const e=e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase().replace(":","").slice(0,12)+(e.length>13?"...":"");window.addEventListener("templateLoaded",(async()=>{let n=async()=>{["content","title","summary"].map((e=>(e=>{let t=document.getElementById(e);t.innerHTML="",t.appendChild(document.createRange().createContextualFragment(meta[e]))})(e))),function(){let t=document.getElementById("currentPage");t&&t.removeAttribute("id");let n=document.getElementById("toc");n&&n.remove();const a=document.getElementById("sitemap").querySelector(`a[title="${window.meta.summary}"]`);a&&a.setAttribute("id","currentPage");let i=[...document.querySelectorAll("h2, h3, h4, h5, h6")].map((t=>{const n=e(t.innerText||t.textContent);return`${"&emsp;".repeat(t.tagName.slice(1)-1)}<a id='anchor_link_${n}'href='#${n}'>${n}</a>`})).join("<br/>");n=document.createElement("div"),n.setAttribute("id","toc"),n.innerHTML=i,a.parentNode.insertBefore(n,a.nextSibling)}(),document.querySelectorAll("h2, h3, h4, h5, h6").forEach((t=>{t.id=e(t.innerText||t.textContent);let n=document.createElement("a");n.id=n.href="anchor_"+t.id,n.setAttribute("aria-label","Link to "+t.id),t.parentNode.insertBefore(n,t.nextSibling)}))};window.newTemplate&&(await(async()=>{let e=await(await fetch("./posts/sitemap.json")).json();window.lbl=window.lbl||' <label for="toggle-sitemap"> <span>&#x21e8;</span>&emsp;&ensp;Sitemap </label> <hr/>',e=e.map((e=>`<a id="${e.tab==window.meta.tab?"currentPage":"link_"+e.tab}" id='link_${e.tab}' href="./${e.filename}.html" title="${e.summary}">${e.tab}</a>`)),document.getElementById("sitemap").innerHTML=lbl+e.join("")})(),n(),document.querySelectorAll("a").forEach((e=>{e.id=e.id||e.innerText+Math.floor(100*Math.random())}))),!window.newTemplate&&setTimeout((async()=>{n()}),1100);const a=document.getElementById("pageTransitioneer");a&&!window.newTemplate&&(a.style.animation="pageTransitioneer 1s alternate 2, gradient 1s alternate 2"),a&&!window.newTemplate&&setTimeout((()=>{a&&(a.style.animation="none")}),2300),window.newTemplate=!1,setTimeout((()=>{document.querySelectorAll("h2,h3,h4,h5,h6").forEach((e=>t.observe(e)))}),100)}),{passive:!0}),window.activeHeader=null;const t=new IntersectionObserver((e=>{e.forEach((e=>{let t=e.target,n="0.5s ease-in-out 0s 2 normal none running wiggle",a=t.getBoundingClientRect().top;if(e.isIntersecting){if(t.style.animation=n,a<300||a>300){window.activeHeader&&(window.activeHeader.style.textDecoration="none");let e=document.getElementById("anchor_"+t.id);e&&(e.style.animation=n,e.style.textDecoration="line-through"),window.activeHeader=e}}else t.style.animation==n&&(t.style.animation="")}))}))}}]);