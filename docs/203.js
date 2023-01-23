"use strict";(this.webpackChunkname=this.webpackChunkname||[]).push([[203],{203:e=>{e.exports='\x3c!-- \n  svg_bg -> main.js creates ands animate an svg\n--\x3e\n<script type="text/javascript"> \n<\/script>\n<div id="scroll_progress_bar"></div>\n<div id="svg_bg"></div>\n<style>\n#svg_bg{\n  position: fixed;\n  z-index: -99; \n}\n</style>\n<script type="text/javascript"> \nconst createSvgBg = async () => {\n    // Create cubes\n    const svg1 = document.createElementNS("http://www.w3.org/2000/svg", "svg");\n    svg1.setAttribute ("width", "100vw" ); svg1.setAttribute ("height", "100vh" );  \n    let rir = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + Math.ceil(min);\n    Array(rir(5,15)).fill().map( () => {  \n        const x = rir(0,100)+\'vh\'; const y = rir(0,100)+\'vh\';\n        const size = rir(40,80)\n        var rect = document.createElementNS("http://www.w3.org/2000/svg", \'rect\');\n        rect.setAttribute(\'x\', x); rect.setAttribute(\'y\', y);\n        rect.setAttribute(\'height\', size); rect.setAttribute(\'width\', size);\n        rect.setAttribute(\'fill\', [\'red\',\'green\',\'orange\', \'blue\'][rir(0,3)]);\n        svg1.appendChild(rect);\n    }) \n    // Animate Cubes\n    document.getElementById(\'svg_bg\').appendChild(svg1); \n    svg1.querySelectorAll(\'rect\').forEach(rect => { \n        let x = rect.getAttribute(\'x\')\n        let y = parseInt(rect.getAttribute(\'y\').slice(0, -2)); \n        y = (125+y)+\'vh\';\n        rect.animate([ \n            {x: x, y: \'-\'+y},\n            {x: x, y: y},\n        ], { \n            duration: 10000,\n            iterations: Infinity,\n            direction:\'alternate\', \n        }); \n    });\n}; createSvgBg();\n<\/script>\n\n\x3c!-- \n  gradient_bg\n--\x3e\n<div id="gradient_bg"></div>\n<style>\n#gradient_bg{\n  position: fixed;\n  height: 100vh;\n  width: 100vw;\n\tbackground: linear-gradient(180deg, var(--bg1), var(--bg2));\n\tbackground-size: 100% 200%;\n\tanimation: gradient 60s ease infinite; \n  z-index: -99;\n}\n@keyframes gradient {\n\t0% {\t\tbackground-position: 0% 0%;\t} \n\t50% {\t  background-position: 100% 100%;\t} \n\t100% {\tbackground-position: 0% 0%;\t}  \n}\n</style> \n\n\x3c!-- \n  resize svg path \n--\x3e\n<div id="mframe" style="offset-path: path(\'M 0 0 L 0 2 L 0 0\')"></div>\n<style>\n  /*Move along path   */\n  #mframe {\n    position:fixed;\n    clip-path: polygon(0% 15%, 15% 15%, 15% 0%, 85% 0%, 85% 15%, 100% 15%, 100% 85%, 85% 85%, 85% 100%, 15% 100%, 15% 85%, 0% 85%);\n    animation: move 5s linear infinite;\n    width: 40px;\n    height: 40px;\n    background: cyan;\n  }\n  @keyframes move {\n    0% { offset-distance: 0%; }\n    100% { offset-distance: 100%; }\n  }\n</style>\n<script type="text/javascript"> \n// alter the the offsetPath of an HTML element with an ID of \'mframe\' \n// replace any 1\'s with the view width and any 2\'s with the view height. \nconst resizeSvg = async () => {\n    let md = document.getElementById("mframe");\n    md.style.offsetPath = md.style.offsetPath.replace(/1/g, window.innerWidth).replace(/2/g, window.innerHeight)\n}; resizeSvg();\n<\/script>\n\n\n<style type="text/css">\n  #sitemap{\n    position: fixed;\n    width: fit-content;\n    top: 0;\n    left: 0;  \n    z-index: 999;\n    overflow: hidden;   \n    border-radius: .7rem;\n    padding: 1rem; \n    box-shadow: 0 0 20px #fff, -20px 0 80px #f0f, 20px 0 80px #0ff, inset 0 0 50px #fff, inset 50px 0 80px #f0f, inset -50px 0 80px #0ff, inset 50px 0 300px #f0f, inset -50px 0 300px #0ff;\n    animation: pulsate 6s linear infinite;\n  }\n  @keyframes pulsate { 50% { box-shadow: 0 0 20px #fff, 20px 0 80px #f0f, -20px 0 80px #0ff, inset 0 0 50px #fff, inset -50px 0 80px #f0f, inset 50px 0 80px #0ff, inset -50px 0 300px #f0f, inset 50px 0 300px #0ff; } }\n\n  /* hide checkbox, but still expose it to screen readers.*/\n  input { position: absolute;  width: 1px; clip: rect(0 0 0 0); overflow: hidden; white-space: nowrap; }\n\n  /* Use Labels to trigger CSS Effects on checkbox checked */\n  #toggle-sitemap:not(:checked) ~ #sitemap { animation: collapse 1s forwards; }\n  #toggle-sitemap:checked ~ #sitemap { animation: expand 1s forwards; }\n  @keyframes collapse { from { max-height:75vh} to { max-height:3em; } }\n  @keyframes expand { to { max-height:75vh } from { max-height:3em; } }\n\n  /* Use Labels to trigger CSS Effects on checkbox checked */\n  #sitemap > label { height: 3em; display: inline-block; }\n  #sitemap > label > span:nth-child(1){ position:absolute; }\n  #toggle-sitemap:not(:checked) ~ #sitemap > label > span:nth-child(2) { animation: reveal 1s forwards;  }\n  #toggle-sitemap:not(:checked) ~ #sitemap > label > span:nth-child(1) { animation: dismiss 1s forwards;  }\n  #toggle-sitemap:not(:checked) ~ #sitemap > *:nth-child() { animation: dismiss 1s forwards;  }\n  #toggle-sitemap:checked ~ #sitemap > label > span:nth-child(2) { animation: dismiss 500ms forwards;  }\n  #toggle-sitemap:checked ~ #sitemap > label > span:nth-child(1) { animation: reveal 500ms forwards;  }\n  #toggle-sitemap:not(:checked) ~ #sitemap > *:nth-child() { animation: reveal 1s forwards;  }\n  @keyframes reveal {  to { opacity: 1; visibility: visible; } }\n  @keyframes dismiss { to { opacity: 0; visibility: hidden; } }\n  </style> \n  \n  \x3c!-- this checkbox holds state of whether modal is visible or not --\x3e\n  <input type="checkbox" id="toggle-sitemap">\n  <div id="sitemap"> \n    <label for="toggle-sitemap"><span>Hide</span> <span>Show </span>Sitemap</label>\n    <caption>Click or Drag</caption>\n  </div>\n\n  <script>\n    const dragTarget = document.querySelector("#sitemap"); \n    let inDrag = false;\n    function downFN(e) {\n        inDrag = true;\n        objInitLeft = dragTarget.offsetLeft; objInitTop = dragTarget.offsetTop;\n        dragStartX = e.pageX || e.targetTouches[0].clientX; \n        dragStartY = e.pageY || e.targetTouches[0].clientY; \n    }\n    function moveFN(e) {\n        if (!inDrag) {return;} \n        dragToX = e.pageX || e.targetTouches[0].clientX; \n        dragToY = e.pageY || e.targetTouches[0].clientY; \n        dragTarget.style.left = (objInitLeft + dragToX-dragStartX) + "px";\n        dragTarget.style.top = (objInitTop + dragToY-dragStartY) + "px";\n        console.log(\'DragEvt\', objInitTop, dragStartY, dragToY);\n      } \n    (function() {\n      // start = mousepos & objInit = topleft of obj\n      var dragStartX, dragStartY, objInitLeft, objInitTop = 0;\n      dragTarget.addEventListener("mousedown", downFN );\n      document.addEventListener("mousemove", moveFN);\n      document.addEventListener("mouseup", function(e) {inDrag = false}); \n      dragTarget.addEventListener("touchstart", downFN );\n      dragTarget.addEventListener("touchmove", moveFN);\n      dragTarget.addEventListener("touchend", function(e) {inDrag = false;});\n    }())\n  <\/script>\n\n\x3c!-- \n  CONTENT\n--\x3e\n<div id="header">\n  <div id="header_nav" >\n    <h1><a  style="cursor: pointer;" href="/">CVMiniGames</a> | <a href="./" id="title"></a></h1>\n    <p><a style="cursor: pointer;" target=blank href="https://www.cryptovoxels.com/play?coords=N@1447E,1128S">PLAY NOW</a></p>\n    <p id="summary"></p>\n  </div>\n  <span id="header_bg_wrapper"><div id="header_bg"></div></span> \n</div>\n</div>\n<div id=\'articleContent\'>\n  <div id="outline"></div>\n  <div id="content"></div>\n</div>\n<div id="toc"></div>\n\n'}}]);