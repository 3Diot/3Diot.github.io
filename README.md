# <a href="https://karpatic.github.io/CVminiGames.github.io/">CVMiniGames</a>

## Welcome! 

please visit the official [website](https://cvminigames.com/) for more information

Scrip1 - > exportedComponent
Scrip2 - > Nothing
file.worker.js - > console.log('workerhelper')

## index.js: 
- Entirely Async  
- Import Chardin
- if (window.location.search contains 'viewone')
- - lay load assets
- - document.body.innerHTML 


##  package.json:

### TODO
- https://webpack.js.org/guides/code-splitting/ bundle analyzers
- preload woff n pics
- File loader replacement for copyWebpackPlugin and ProxyServer

###  Entry
- head: './src/head.js',
- index: './src/index.js'

### Optimization
- minimizer
- - `TerserPlugin` => sourcemap: true, **removeComments: commentedOut**
- - `OptimizeCssAssetsPlugin`
- splitChunks: all

### Output
- ChunkFileNames
- GlobalObject: "this"

### Module Rules
- .worker.js => `worker-loader`: inline: true
- .jsx => `babel-loader`: 
- - presets: ["@babel/preset-env", "@babel/preset-react"], 
- - plugins: [ '@babel/transform-runtime' ]
- .css or .s[ac]ss => 
- - `MiniCssExtractPlugin`: hmr: iffInDevMode
- - `css-loader`
- - `postcss-loader`:  Plugins: [`postcss-preset-env`, `cssnano`]
- - `sass-loader`: .s[ac]ss Only
- .svg => `svg-inline-loader?classPrefix`
- .(png|jpg|gif|ico) => `url-loader`: limit: false
- .(csv|tsv)$/ => `csv-loader`

### plugins
- `CleanWebpackPlugin`
- `MiniCssExtractPlugin`
- `HtmlWebpackInlineSourcePlugin`(HtmlWebpackPlugin)
- `HtmlWebpackPlugin` =>
- - templateContent: "<!DOCTYPE html> <html lang="en"> <div id="head"></div> <body> <div id="body"></div> </body> </html>",
- - inlineSource: env.NODE_ENV == 'local' ? false : '^(index).*.(css)$', 
- - inject: 'head'
- `ScriptExtHtmlWebpackPlugin`
- - **Delete '/head/' e.g [vendors~head] Before deploy**
- - preload: (index|imported).*.(js|json|svg|css),
- - prefetch: .(js|json|svg|css),
- - defaultAttribute: 'async',
- `WebpackPwaManifest`: Inline Specifications
- `WorkboxPlugin.GenerateSW`
- - **Commented out**
- - swDest: './sw.js',
- - runtimeCaching: [/\.(?:png|jpg|jpeg|svg|js)$/]
- `CopyWebpackPlugin`: ['./src/data', './src/header.json', './src/error', './src/.htaccess',  './src/robots.txt' ] 

### devServer
- A proxy was set up to deliver data from the localhost path /data during dev.
- For production, copyWebpackPlugin is used and the path just works.
- https://webpack.js.org/loaders/file-loader/ removes this complication.










# Dependency description and caveats

## [mini-svg-data-uri](https://www.npmjs.com/package/mini-svg-data-uri/v/1.0.0)
Description
- This tool converts SVGs into the most compact, compressible data: URI that SVG-supporting browsers tolerate. 
Warning
- - This does not optimize the SVG source file. You’ll want svgo or its brother SVGOMG for that.
- - The resulting Data URI should be wrapped with double quotes: url("…"), <img src="…">, etc.
- - This might change or break SVGs that use " in character data, like inside <text> or aria-label or something. Try curly quotes (“”) or &quot; instead.






merge this project with the cvminigames one.
convert ipynb's to html
build admin page, cp html to dist, react snap dist+html


https://github.com/stereobooster/react-snap/blob/master/doc/alternatives.md
https://github.com/stereobooster/react-snap/blob/master/doc/recipes.md






## Without Webpack-template
Contains 
- same-page web-workers -> notifications button
- Service workers
- module -> semanticUIReact.Header
- - Handlebars JsonUrlCompressed
- localforage 

## Project X includes
webpack.config.js:
- Does not include
{ 
test: /\.geojson$/,
exclude: /node_modules/,
use: {
  loader: "babel-loader",
  options: { 
	  "presets": ["@babel/preset-env", "@babel/preset-react"],
	  "plugins": [ '@babel/transform-runtime' ]
  }
}
}









React-snapshot Follows every relative URL to crawl the whole site.
We move build/index.html to build/200.html at the beginning, because it's a nice convention. 
Hosts like surge.sh understand this, serving 200.html if no snapshot exists for a URL. 
If you use a different host I'm sure you can make it do the same.

  "reactSnapshot": {
    "include": [
      "/other-path",
      "/another/nested-path"
    ],
    "exclude": [
      "/signup",
      "/other-path/exclude-me/**"
    ],
    "snapshotDelay": 300
  }

The default snapshot delay is 50ms.
  
Works with routing strategies using the HTML5 history API. No hash(bang) URLs.
https://github.com/stereobooster/react-snap/blob/master/doc/behind-the-scenes.md



IONIC JS + CSS
57 requests
278 kB transferred
356 kB resources
Finish: 624 ms
DOMContentLoaded: 276 ms
Load: 582 ms

IONIC CSS NO JS
36 requests
201 kB transferred
223 kB resources
Finish: 626 ms
DOMContentLoaded: 192 ms
Load: 566 ms

IONIC Neither
35 requests
212 kB transferred
202 kB resources
Finish: 748 ms
DOMContentLoaded: 275 ms
Load: 725 ms



/*
if (navigator.userAgent === "ReactSnap") {
    // Strip out all content except the root
    // while (document.firstChild) document.removeChild(document.firstChild);
    //let div = document.createElement("div");
    //div.className = `root`;
    //div.innerHTML = `This is my content`;
    // document.appendChild(div); 
    // log each tag in the array
    const children = [...document.getElementsByTagName('script')];
    children.forEach((child) => { console.log('-----------------', child); });

    // let head = document.getElementsByTagName('head')[0].innerHTML
}
*/

// https://www.npmjs.com/package/@ionic/core
// https://github.com/stereobooster/react-snap/blob/master/tests/examples/partial/index.js
// https://github.com/stereobooster/react-snap/blob/88ef70dd419158c18b9845034513dc84a3e100d9/index.js
// https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages
// https://domains.google.com/registrar/cvminigames.com/

// https://stackoverflow.com/questions/67790280/css-loader-generates-urls-with-auto-prefix
// Option output.publicPath has default value 'auto' and I think the file-loader (in png's rule) can't interpret it right. In this case, one of the following values may be appropriate:
// '' - for relative URLs, url(logo.<hash>.png)
// '/' - for absolute URLs, url(/logo.<hash>.png)

// https://webpack.js.org/api/module-methods/

// https://webpack.js.org/guides/asset-modules/


<!--
<p>
  <a href="https://mybinder.org/v2/gh/CVMiniGames/CVMiniGames.github.io/main"> <img src="./images/launch_binder.svg" alt="Binder" /> </a>
  <a href="https://colab.research.google.com/github/CVMiniGames/CVMiniGames.github.io/blob/main/ipynb/{{filename}}"> <img src="https://pete88b.github.io/fastpages/assets/badges/colab.svg" alt="Binder" /></a>
  <a href="https://github.com/CVMiniGames/CVMiniGames.github.io/blob/main/ipynb/{{filename}}"> <img src="https://pete88b.github.io/fastpages/assets/badges/github.svg" alt="Binder" /></a>
</p>
<p>
  <a href="https://github.com/CVMiniGames/CVMiniGames.github.io"><img src="https://img.shields.io/github/stars/CVMiniGames/CVMiniGames.github.io.svg?style=social&amp;label=Star" alt="GitHub stars" /></a>
  <a href="https://github.com/CVMiniGames/CVMiniGames.github.io"><img src="https://img.shields.io/github/watchers/CVMiniGames/CVMiniGames.github.io.svg?style=social&amp;label=Watch" alt="GitHub watchers" /></a>
  <a href="https://github.com/CVMiniGames/CVMiniGames.github.io"><img src="https://img.shields.io/github/forks/CVMiniGames/CVMiniGames.github.io.svg?style=social&amp;label=Fork" alt="GitHub forks" /></a>
  <a href="https://github.com/CVMiniGames/CVMiniGames.github.io"><img src="https://img.shields.io/github/followers/CVMiniGames.svg?style=social&amp;label=Follow" alt="GitHub followers" /></a> 
</p>
-->