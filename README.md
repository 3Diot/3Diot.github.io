# <a href="https://karpatic.github.io/CVminiGames.github.io/">CVMiniGames</a>

## Welcome! 

what we want:
- render header.js in (react snap/ dev) then dispose of it for (prod).  
- render main.js in (React snap/ dev) and also for (prod).
- - render it inline?
- render template.js in (react snap/ dev) and also for (prod).
- - Possible to compress template and content, too?
- Routing event handler triggers events in template.

current problems:
- preset env nor autoprefixer work
- header isn't rendering
- Webpack is adding too much wait and for what? 
- we want to inline packaged content ( .. what? ) and also lazy load (the router) 


attempts:
- import router.js in template -> yuck
- 

<script src='router.js'></script>
<button id="load-module-button">Load Module</button>
<script>
    document.getElementById('load-module-button').addEventListener('click', async () => {
    const module = await import('./router.js');
    // Do something with the imported module
    module.doSomething();
    });
</script>
// my-module.js
export function doSomething() {
  console.log('Something was done!');
}

// 
// I should find a way to move the animations off the router script and into the template. only problem is they depend on the router to know when to run.
// 
/**
    Dispatching is important to diambiguate the router from the animations (which should be in the template)
/*
To fix the issue of the animations depending on the router, you could use a technique called event-driven programming.
You could define a custom event that is triggered by the router when it is finished loading the page and call it something like "pageLoaded". Then, in the template, you could use JavaScript to listen for this event and trigger the animations when the event is received.
This way, the animations can be decoupled from the router and will only run when the custom event is triggered, ensuring that the animations are synced up with the loading of the page.*
*/

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




npm install @capacitor/android
npx cap init
npx cap add android
npx cap open android






# Dependency description and caveats

## [react-snap](https://github.com/stereobooster/react-snap/blob/master/doc/alternatives.md)

https://github.com/stereobooster/react-snap/blob/master/doc/recipes.md
https://github.com/stereobooster/react-snap/blob/master/tests/examples/partial/index.js
https://github.com/stereobooster/react-snap/blob/88ef70dd419158c18b9845034513dc84a3e100d9/index.js

React-snapshot Follows every relative URL to crawl the whole site.
We move build/index.html to build/200.html at the beginning, because it's a nice convention. 
Hosts like surge.sh understand this, serving 200.html if no snapshot exists for a URL. 
If you use a different host I'm sure you can make it do the same.
The default snapshot delay is 50ms.
  
Works with routing strategies using the HTML5 history API. No hash(bang) URLs.
https://github.com/stereobooster/react-snap/blob/master/doc/behind-the-scenes.md


https://blobanimation.com/

Compress pics w/ webP 
- Tries to use generator rules first if applicable and then minimizer. 
- must optimize generator outputs separately
Keep Init Page under 14Kb's 
Use native fonts
Inline Critical CSS.
No need for preload img/tags


https://webpack.js.org/api/module-methods/
https://webpack.js.org/guides/asset-modules/
https://www.npmjs.com/package/@ionic/core



https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
https://www.searchenginejournal.com/important-tags-seo/156440/
SERP: visit schema.org and see whether they’ve got any tags that can be applied to your types of pages.


https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#autositemap
Google: generate sitemap
Submit your sitemap to Google: https://www.google.com/ping?sitemap=https://cvminigames.com/sitemap.txt

the maps and tables need fixing
https://www.link-assistant.com/news/structured-data-for-seo.html

admin only: 
manifest
https://github.com/icelam/html-inline-script-webpack-plugin
https://github.com/webpack-contrib/json-minimizer-webpack-plugin/tree/master/test

python packaging uses dist and webpack does not.