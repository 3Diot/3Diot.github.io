!function(){"use strict";var e,r,n,t,o={},i={};function __webpack_require__(e){var r=i[e];if(void 0!==r)return r.exports;var n=i[e]={exports:{}};return o[e](n,n.exports,__webpack_require__),n.exports}__webpack_require__.m=o,r=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},__webpack_require__.t=function(n,t){if(1&t&&(n=this(n)),8&t)return n;if("object"==typeof n&&n){if(4&t&&n.__esModule)return n;if(16&t&&"function"==typeof n.then)return n}var o=Object.create(null);__webpack_require__.r(o);var i={};e=e||[null,r({}),r([]),r(r)];for(var a=2&t&&n;"object"==typeof a&&!~e.indexOf(a);a=r(a))Object.getOwnPropertyNames(a).forEach((function(e){i[e]=function(){return n[e]}}));return i.default=function(){return n},__webpack_require__.d(o,i),o},__webpack_require__.d=function(e,r){for(var n in r)__webpack_require__.o(r,n)&&!__webpack_require__.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})},__webpack_require__.f={},__webpack_require__.e=function(e){return Promise.all(Object.keys(__webpack_require__.f).reduce((function(r,n){return __webpack_require__.f[n](e,r),r}),[]))},__webpack_require__.u=function(e){return"chunk."+(385===e?"router":e)+"."+{257:"dc1969d037a652189660",385:"61dc8eb00568e45d2272"}[e]+".js"},__webpack_require__.miniCssF=function(e){return"main.css"},__webpack_require__.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n={},t="name:",__webpack_require__.l=function(e,r,o,i){if(n[e])n[e].push(r);else{var a,_;if(void 0!==o)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==e||d.getAttribute("data-webpack")==t+o){a=d;break}}a||(_=!0,(a=document.createElement("script")).charset="utf-8",a.timeout=120,__webpack_require__.nc&&a.setAttribute("nonce",__webpack_require__.nc),a.setAttribute("data-webpack",t+o),a.src=e),n[e]=[r];var onScriptComplete=function(r,t){a.onerror=a.onload=null,clearTimeout(w);var o=n[e];if(delete n[e],a.parentNode&&a.parentNode.removeChild(a),o&&o.forEach((function(e){return e(t)})),r)return r(t)},w=setTimeout(onScriptComplete.bind(null,void 0,{type:"timeout",target:a}),12e4);a.onerror=onScriptComplete.bind(null,a.onerror),a.onload=onScriptComplete.bind(null,a.onload),_&&document.head.appendChild(a)}},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.p="/",function(){var e={179:0};__webpack_require__.f.j=function(r,n){var t=__webpack_require__.o(e,r)?e[r]:void 0;if(0!==t)if(t)n.push(t[2]);else{var o=new Promise((function(n,o){t=e[r]=[n,o]}));n.push(t[2]=o);var i=__webpack_require__.p+__webpack_require__.u(r),a=new Error;__webpack_require__.l(i,(function(n){if(__webpack_require__.o(e,r)&&(0!==(t=e[r])&&(e[r]=void 0),t)){var o=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;a.message="Loading chunk "+r+" failed.\n("+o+": "+i+")",a.name="ChunkLoadError",a.type=o,a.request=i,t[1](a)}}),"chunk-"+r,r)}};var webpackJsonpCallback=function(r,n){var t,o,i=n[0],a=n[1],_=n[2],c=0;if(i.some((function(r){return 0!==e[r]}))){for(t in a)__webpack_require__.o(a,t)&&(__webpack_require__.m[t]=a[t]);if(_)_(__webpack_require__)}for(r&&r(n);c<i.length;c++)o=i[c],__webpack_require__.o(e,o)&&e[o]&&e[o][0](),e[o]=0},r=self.webpackChunkname=self.webpackChunkname||[];r.forEach(webpackJsonpCallback.bind(null,0)),r.push=webpackJsonpCallback.bind(null,r.push.bind(r))}();const getImports=async()=>{!window.navEvent&&({handleRoute:window.handleRoute,navEvent:window.navEvent}=await __webpack_require__.e(385).then(__webpack_require__.bind(__webpack_require__,751)))};window.redirect=async e=>{e.preventDefault(),window.history.pushState({},"",e.target.href),await getImports(),await window.navEvent(e)},document.addEventListener("DOMContentLoaded",(async()=>{let loadRouter=async()=>{await getImports(),await window.handleRoute(window.location.pathname)};window.content?.innerHTML.trim()||loadRouter(),window.oldRoute=window.location.pathname.replace(window.origin,""),document.querySelectorAll('a[href^="./"]').forEach((e=>e.addEventListener("click",window.redirect))),window.addEventListener("popstate",(async()=>{loadRouter()}))})),"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/service-worker.js").then((function(e){e.scope}),(function(e){}))})),/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)||localStorage.setItem("displayChardin","false");const a=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));window.addEventListener("load",(()=>{!a&&"serviceWorker"in navigator&&navigator.serviceWorker.register("./service-worker.js").then((e=>{e.onupdatefound=()=>{const r=e.installing;r.onstatechange=()=>{"installed"==r.state&&navigator.serviceWorker.controller}}})).catch((e=>{console.error("Error during service worker registration:",e)}))}))}();