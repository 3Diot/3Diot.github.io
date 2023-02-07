"use strict";
(this["webpackChunkname"] = this["webpackChunkname"] || []).push([[203],{

/***/ 203:
/***/ ((module) => {

module.exports = "<!-- \n  svg_bg -> main.js creates ands animate an svg\n-->\n<script type=\"text/javascript\"> \n</script>\n<div id=\"scroll_progress_bar\"></div>\n<div id=\"svg_bg\"></div>\n<style>\n#svg_bg{\n  position: fixed;\n  z-index: -99; \n}\n</style>\n<script type=\"text/javascript\"> \nconst createSvgBg = async () => { \n    // Create cubes\n    const svg1 = document.createElementNS(\"http://www.w3.org/2000/svg\", \"svg\");\n    svg1.setAttribute (\"width\", \"100vw\" ); svg1.setAttribute (\"height\", \"100vh\" );  \n    let rir = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);\n    Array(rir(15,25)).fill().map( () => {  \n        const x = rir(0,200)+'vh'; const y = rir(0,100)+'vh';\n        const size = rir(40,80)\n        var rect = document.createElementNS(\"http://www.w3.org/2000/svg\", 'rect');\n        rect.setAttribute('x', x); rect.setAttribute('y', y);\n        rect.setAttribute('height', size); rect.setAttribute('width', size);\n        rect.setAttribute('fill', ['red','green','orange', 'blue'][rir(0,3)]);\n        svg1.appendChild(rect);\n    }) \n    // Animate Cubes\n    r = document.getElementById('svg_bg'); r.innerHTML = ''; r.appendChild(svg1) \n    svg1.querySelectorAll('rect').forEach(rect => { \n        let x = parseInt(rect.getAttribute('x').slice(0, -2))\n        let y = parseInt(rect.getAttribute('y').slice(0, -2)); \n        rect.animate([ \n            {x: x-rir(0,10)+'vh', y: y-rir(100,125)+'vh'},\n            {x: x+rir(0,10)+'vh', y: y+rir(100,125)+'vh'},\n        ], { \n            duration: 20000,\n            iterations: Infinity,\n        }); \n    }); \n}; createSvgBg(); setInterval(createSvgBg,20000) \n</script>\n\n<!-- \n  gradient_bg\n-->\n<div id=\"gradient_bg\"></div>\n<style>\n#gradient_bg{\n  position: fixed;\n  height: 100vh;\n  width: 100vw;\n\tbackground: linear-gradient(180deg, var(--bg1), var(--bg2));\n\tbackground-size: 100% 200%;\n\tanimation: gradient 60s ease infinite; \n  z-index: -99;\n}\n@keyframes gradient {\n\t0% {\t\tbackground-position: 0% 0%;\t} \n\t50% {\t  background-position: 100% 100%;\t} \n\t100% {\tbackground-position: 0% 0%;\t}  \n}\n</style> \n\n<style type=\"text/css\">\n  body:has(#sitemap:focus-within) { \n    overscroll-behavior-y: contain; /* Prevent drag-refresh */\n  } \n  #sitemap{\n    position: fixed;\n    width: fit-content;\n    top: 0;\n    left: 0;  \n    z-index: 999;\n    overflow: hidden;   \n    border-radius: .7rem;\n    padding: 1rem;\n    padding-top: 0px;\n\n    backdrop-filter: blur(6px) saturate(46%);\n    -webkit-backdrop-filter: blur(6px) saturate(46%);\n    background-color: var(--b3o);\n    border-radius: 12px; \n    box-shadow: 5px 0 20px var(--bg4), -5px 0 20px var(--hint-of-light), inset 0px 0 10px var(--hint-of-light);\n  }\n  @keyframes pulse { 50% { box-shadow: 5px 0 20px var(--hint-of-light), -5px 0 20px var(--bg3), inset 0px 0 10px var(--bg4); } }\n\n  /* hide checkbox, but still expose it to screen readers.*/\n  input { position: absolute;  width: 1px; clip: rect(0 0 0 0); overflow: hidden; white-space: nowrap; }\n\n  /* Use Labels to trigger CSS Effects on checkbox checked */\n  #toggle-sitemap{ visibility: hidden; }\n  #toggle-sitemap:not(:checked) ~ #sitemap { animation: collapse 1s forwards, pulse 6s linear infinite; }\n  #toggle-sitemap:checked ~ #sitemap { animation: expand 1s forwards, pulse 6s linear infinite; }\n  @keyframes collapse { from { max-height:75vh} to { max-height:3em; } }\n  @keyframes expand { to { max-height:75vh } from { max-height:3em; } }\n\n  /* Use Labels to trigger CSS Effects on checkbox checked */\n  #sitemap > label {line-height: 3em; width: -webkit-fill-available; display: inline-block; cursor: grab; }\n  #sitemap > label > span:nth-child(1){ position:absolute; } \n  #toggle-sitemap:not(:checked) ~ #sitemap > label > span:nth-child(1) { animation: dismiss 1s forwards;  }\n  #toggle-sitemap:not(:checked) ~ #sitemap > *:nth-child() { animation: dismiss 1s forwards;  } \n  #toggle-sitemap:checked ~ #sitemap > label > span:nth-child(1) { animation: reveal 500ms forwards;  }\n  #toggle-sitemap:not(:checked) ~ #sitemap > *:nth-child() { animation: reveal 1s forwards;  }\n  @keyframes reveal {  from {transform:rotate(0deg)} to {transform: rotate(90deg); } }\n  @keyframes dismiss { from {transform:rotate(90deg)} to {transform: rotate(0deg); } }\n  </style> \n  \n  <!-- this checkbox holds state of whether modal is visible or not -->\n  <input type=\"checkbox\" id=\"toggle-sitemap\">\n  <div id=\"sitemap\"> \n    <label for=\"toggle-sitemap\"><span>Hide</span> <span>Show </span>Sitemap</label>\n    <caption>Click or Drag</caption>\n  </div>\n\n  <script>\n    const dragTarget = document.querySelector(\"#sitemap\"); \n    let inDrag = false;\n    function downFN(e) {\n        inDrag = true;\n        objInitLeft = dragTarget.offsetLeft; objInitTop = dragTarget.offsetTop;\n        dragStartX = e.pageX || e.targetTouches[0].clientX; \n        dragStartY = e.pageY || e.targetTouches[0].clientY; \n    }\n    function moveFN(e) {\n        if (!inDrag) {return;} \n        e.preventDefault();\n        dragToX = e.pageX || e.targetTouches[0].clientX; \n        dragToY = e.pageY || e.targetTouches[0].clientY; \n        dragTarget.style.left = (objInitLeft + dragToX-dragStartX) + \"px\";\n        dragTarget.style.top = (objInitTop + dragToY-dragStartY) + \"px\";\n      } \n    (function() {\n      // start = mousepos & objInit = topleft of obj\n      var dragStartX, dragStartY, objInitLeft, objInitTop = 0;\n      dragTarget.addEventListener(\"mousedown\", downFN );\n      document.addEventListener(\"mousemove\", moveFN,{ passive:false });\n      document.addEventListener(\"mouseup\", function(e) {inDrag = false}); \n      dragTarget.addEventListener(\"touchstart\", downFN );\n      dragTarget.addEventListener(\"touchmove\", moveFN,{ passive:false });\n      dragTarget.addEventListener(\"touchend\", function(e) {inDrag = false;});\n    }())\n  </script>\n\n<!-- \n  resize svg path \n-->\n<div id=\"mframe\" style=\"offset-path: path('M 0 0 L 0 2 L 0 0')\"></div>\n<style>\n  /* Move along path */   \n  #mframe {\n    position:fixed;\n    clip-path: polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%);\n    animation: move 15s linear infinite;\n    width: 40px;\n    height: 40px;\n    bottom: 160px;\n    background: var(--hint-of-light);\n  }\n  @keyframes move {\n    0% { offset-distance: 0%; }\n    100% { offset-distance: 100%; }\n  }\n</style>\n<script type=\"text/javascript\"> \n// alter the the offsetPath of an HTML element with an ID of 'mframe' \n// replace any 1's with the view width and any 2's with the view height. \nconst resizeSvg = async () => {\n    let md = document.getElementById(\"mframe\");\n    md.style.offsetPath = md.style.offsetPath.replace(/1/g, window.innerWidth).replace(/2/g, window.innerHeight)\n}; resizeSvg();\n</script>\n\n<!-- \n  CONTENT\n-->\n<div style=\"height:30px\"></div>\n<div id=\"header\">\n  <div id=\"header_nav\" >\n    <h1><a  style=\"cursor: pointer;\" href=\"/\">CVMiniGames</a> | <a href=\"./\" id=\"title\"></a></h1>\n    <p><a style=\"cursor: pointer;\" target=blank href=\"https://www.cryptovoxels.com/play?coords=N@1447E,1128S\">PLAY NOW</a></p>\n    <p id=\"summary\"></p>\n  </div>\n  <span id=\"header_bg_wrapper\"><div id=\"header_bg\"></div></span> \n</div>\n<div style=\"height:30px\"></div>\n</div>\n<div class='broider' id='articleContent'>\n  <div id=\"outline\"></div>\n  <div id=\"content\"></div>\n</div>\n<div id=\"toc\"></div>\n<style>\n#header{\n  /* center and size to header_nav*/\n  width: fit-content;\n  margin: auto;\n}\n#header_nav{\n  padding: 12px;\n  text-align: center;\n  z-index: 9;\n}\n#header_bg_wrapper{\n  position: absolute;\n  top:0px;\n  width:100%;\n  height:100%;   \n  filter: drop-shadow(20px 20px 60px #bebebe) drop-shadow(-20px -20px 60px #ffffff); /* https://neumorphism.io/ */\n}\n#header_bg{  \n  border-radius: 50px;\n  width:100%;\n  height:100%;  \n  background-color: var(--bg3);\n  clip-path: polygon(33% 43%, 0 43%, 0 0, 100% 0, 100% 43%, 66% 43%, 66% 66%, 100% 66%, 100% 100%, 0 100%, 0 66%, 33% 66%);\n\tanimation:spin 2s linear alternate infinite;\n  transition-duration: 2s;\n} \n#header:hover > #header_bg_wrapper > #header_bg{\n  clip-path: polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%);\n} \n@keyframes spin{ from{transform:rotate(-2deg)} to{transform:rotate(2deg)} }\n</style>\n<style>\n.broider {\n    border-image:  url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAYAAAAcaxDBAAAAAXNSR0IArs4c6QAAAaFJREFUeF7t3EEOgkAUBFG5HUfmdrpmMHY6UxgC5c78sZFHxyBRlld6rOt7t2Tblt3zNE/5N5vvcb7tXAJL85uBpd0RNAmVc0FLsLRc0CRUzgUtwdJyQZNQORe0BEvLl9fZpz1n56c9/PNcUBhcUEFhATjOhgoKC8BxNlRQWACOO57Yj+eNsxscr5/O5l389YLCB0hQQWEBOC5fHIE3ePc4QeEjLKigsAAcd/ymNG7gYeeRs76CzgoOrxdUUFgAjjv/ahP8hq8eJyh8hAQVFBaA42yooLAAHGdDBYUF4DgbKigsAMfZUEFhATjOhgoKC8BxNlRQWACOs6GCwgJwnA0VFBaA42yooLAAHGdDBYUF4DgbKigsAMfZUEFhATjOX98JCgvAcTZUUFgAjvNfIILCAnCcDRUUFoDjbKigsAAcZ0MFhQXguPxNadxgew/mx9/7Lh0xQX8K2dBUoHIuaAmWlue74rT/l3/YZ+YILGiqXDkXtARLywVNQuVc0BIsLRc0CZVzQUuwtFzQJFTOBS3B0nJBk1A5F7QES8sFTULl/AN72ERkyPHzNQAAAABJRU5ErkJggg==\") 28 /  28px / 0 round;\n    border-width:  28px;\n    border-style:  solid;\n}\n</style>\n\n<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"    bottom: 0;\nposition: fixed; height:200px; width: -webkit-fill-available\">\n  <path class=\"path2\" fill=\"var(--bg3)\" fill-opacity=\"1\" \n  d=\"\"></path>\n  <defs>\n    <linearGradient id=\"gradient\" gradientTransform=\"rotate(80)\">\n      <stop offset=\"0%\"   stop-color=\"rgba(255, 183, 183,.1)\"/>\n      <stop offset=\"40%\" stop-color=\"var(--hint-of-light)\"/>\n      <stop offset=\"100%\" stop-color=\"rgba(240, 248, 255,.4)\"/>\n    </linearGradient>\n  </defs>\n</svg>\n<script>\nfunction generatePath(bars, height) {\n    const addPath = (b, h) => \"L\"+b*window.innerWidth/bars +\",\"+h;\n    // Math.round(10*X)/10;\n    let rir = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);\n    const heights = Array.from({length: bars + 1}, () => height - (rir(2,5) *40 ));\n    const path = heights.map((h, bar) => addPath(bar, h) + addPath(bar + 1, h)).join('');\n    return (\"M0,\" + height + path + addPath(bars + 1, height) + \"L0,\" + height + \"Z\").replace('undefined', '');\n}\nfunction updatePath(bars, height) {\n  let d = generatePath(6, 200)\n  document.querySelector('.path2').setAttribute('d', d);\n  let t = document.getElementById(\"mframe\").style //.offsetPath = \"path('M 0 0 L 0 2 L 0 0')\";\n  document.getElementById(\"mframe\").style.offsetPath = \"path('\"+d+\"')\";\n  console.log({t:''+t.offsetPath, x:\"path('\"+d+\"')\"})\n}\nupdatePath(); setInterval(updatePath,15000) \n</script>\n<style>\npath{\n  fill : url(#gradient)\n}\n</style>\n\n<div style=\"height:200px;z-index:0;\"></div>\n\n<!-- \n  resize svg path \n--\n  <div id=\"mframe\" style=\"offset-path: path('M 0 0 L 0 2 L 0 0')\"></div>\n  #mframe{animation: move 5s linear infinite;}\n  @keyframes move {\n    0% { offset-distance: 0%; }\n    100% { offset-distance: 100%; }\n  }\n-->\n";

/***/ })

}]);