# <a href="https://karpatic.github.io/CVminiGames.github.io/">CVMiniGames</a>

## Welcome! 

please visit the official [website](https://cvminigames.com/) for more information

## Notes
python packaging uses dist and webpack does not.

## Strategy

Compress pics w/ webP 
- Tries to use generator rules first if applicable and then minimizer. 
- must optimize generator outputs separately
Keep Init Page under 14Kb's 
Use native fonts
Inline Critical CSS.
No need for preload img/tags

what happens:
- render header.js in (react snap/ dev) then dispose of it for (prod).  
- render main.js in (React snap/ dev) and also for (prod). 
- render template.js in (react snap/ dev) and also for (prod).
- Routing event handler triggers events in template.

solved:
- Webpack bloat
- preset env nor autoprefixer
- Lazy import router.js
- diambiguate the router from the animations via dispatching 

## Design

templates
-. > parallax background
-. > keyframes animate linear gradient background
-. > keyframes animate background of randomly generated cubes. 
-. > Optionally - a table of contents is shown before the article or at the side.
-. > scrollpos animate an cube tumbling down the divider line with a clip path 
-. > scrollpos cube flows along the side of a clip path
-. > animate text shadow on hover
-. > Glowing BG for Active-Page Link. Glowing Underline for TOC Anchor Link

## Design Rules

https://anthonyhobday.com/sideprojects/saferules/

Avoid Complexity: Sitemap links to nav pages which link to subject-related articles.
Jazz up section divides by by slapping atop a transform rotated div

General -> Put simple on complex or complex on simple
Layout -> Make outer padding the same or more than inner padding
Layout -> no hard divides unless it's an img divider
Buttons -> Make horizontal padding twice the vertical padding in buttons
Elements -> should go in order of visual weight (dark to light, fx to none, etc)
Element -> use multiples of '8'

Border -> Container borders should contrast with both the container and the background
Border -> For nested divs w rounded corners: interiorItemsRoundedBorder = xteriorspx - paddingpx
Border -> Make drop shadow blur values double their distance values. 4px on y = 8px blur
Border -> - closer z-index to camera = more light diffusion/ lower shadow opacity

Colors -> If you saturate your neutrals you should use warm or cool colours, not both
Colors -> Colours in a palette should have distinct brightness values, not just in hue
Colors -> bg should get lighter as the z-index increases
Colors -> The HSB brightness difference between background and container should be within 12%/7% for dark/light interface.

reactive explorative interactive
0. instead of interactive steppers, tabs, fixies, sliders, use scroll and multiples
1. if you make the reader click or do anything other than scroll, something spectacular has to happen
2. if you make a tooltip or rollover assume no one will ever see it.
3. fewer small graphics embedded in articles and more stand-alone visual stories
4. most visuals are static as a result
5. if animation or mation is needed. trigger it on scroll

## Tasks

current problems:
- gpu accelerated css transitions
- pwa-sw-optimizations
- saturate your colors + brightness along z-index -> +-7%, border shadow 4y = 8 blur
mobile bg opacity, padding
padding uses multiples of 8 - like for line height. give plenty!
more layers = less padding.
serp seo sitemaps
compress template
https://github.com/CVMiniGames/CVminiGames.github.io/blob/85be897657ea200a79d528cfe5b31f03b3dc21f1/webpack.config.js
- the maps and tables need fixing


- https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links
- https://www.searchenginejournal.com/important-tags-seo/156440/
- SERP: visit schema.org and see whether they’ve got any tags that can be applied to your types of pages.

- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#autositemap
- Google: generate sitemap
- Submit your sitemap to Google: https://www.google.com/ping?sitemap=https://cvminigames.com/sitemap.txt

- https://www.link-assistant.com/news/structured-data-for-seo.html
- https://github.com/webpack-contrib/json-minimizer-webpack-plugin/tree/master/test

## Components

1. triple ellipses comments popup
2. view counter
3. social icons
4. https://textfac.es/ 
5. https://graphemica.com/%E2%98%B0
6. https://css-tricks.com/full-width-containers-limited-width-parents/
7. scrollsnaps on img

# Dependencies

## devServer
- A proxy was set up to deliver data from the localhost path /data during dev.
- For production, copyWebpackPlugin is used and the path just works.
- https://webpack.js.org/loaders/file-loader/ removes this complication.

## Capacitor
-npm install @capacitor/android
-npx cap init
-npx cap add android
-npx cap open android

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

# Notes

## JS

// let content = JSON.parse((await import(`./posts/${page||'index'}.json`) ).default)  
// let content = await (await fetch((await import(/* webpackChunkName: "[request]" */ `./posts/${page}.json`) ).default)).json()  
// let content = await (await fetch(`./posts/${route.replace("/",'').replace('.html','') || 'index'}.json`)).json(); 
element.insertAdjacentHTML('afterend', 'txt')
toImage() / capture html canvas as gif/jpg/pdf

# CSS

## Misc

https://www.joshwcomeau.com/gradient-generator/
https://www.colourlovers.com/api/palettes/top?jsonCallback=?
https://www.vantajs.com/?effect=dots
https://maxhodak.com/writings/index.html
 
https://blog.logrocket.com/css-before-after-custom-animations-transitions/#before-pseudo-element 
https://tympanus.net/codrops/2013/05/22/examples-of-pseudo-elements-animations-and-transitions/
https://cssanimation.rocks/pseudo-elements/

## Techniques
background image behind a blobby svg clip path 
html-> image or div w/ text to crop w mask
css-> animate background-x-position
css-> background-image, -attachment: fixed, -size: cover, -position: center
css-> -webikit-mask-image:(url) & -repeat: no-repeate; mask-type, -size, -position  
mask-image: linear-gradient(to bottom, transaprent 10%, black) -> dampends image 
animate inset box-shadow https://codepen.io/lonekorean/pen/KKVdQPX 

Useful Articles
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_parallax_percent
https://css-tricks.com/almanac/properties/m/mask-image/
https://css-tricks.com/almanac/properties/s/shape-outside/
https://css-tricks.com/almanac/properties/c/clip-path/
https://css-tricks.com/animating-with-clip-path/
https://css-irl.info/experimental-layouts/
https://cssanimation.rocks/pseudo-elements/ 
https://www.joshwcomeau.com/css/designing-shadows/
https://www.joshwcomeau.com/css/make-beautiful-gradients/
https://garden.bradwoods.io/notes/css/3d
https://github.com/codrops/OnScrollPathAnimations/ 
https://github.com/codrops/CaptionHoverEffects
https://github.com/codrops/ShapeHoverEffectSVG
https://blog.logrocket.com/css-before-after-custom-animations-transitions/#before-pseudo-element
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations/Using_CSS_animations 

    Resources
https://www.toptal.com/designers/htmlarrows/arrows/
https://chromium.googlesource.com/chromium/blink/+/master/Source/core/css/html.css
https://bennettfeely.com/clippy/
https://animista.net/play/text/focus-in
https://svg-path-visualizer.netlify.app/
https://yqnn.github.io/svg-path-editor/
https://cssbud.com/css-generator/css-glow-generator/#search-header
https://getwaves.io/
https://www.blobmaker.app/
http://csshero.org/mesher/
https://shadows.brumm.af/
https://ui.glass/generator/#
http://css3generator.com/
http://www.cssfiltergenerator.com/
https://maxbittker.github.io/broider/
https://www.svgrepo.com/

https://tympanus.net/codrops/2021/06/01/trigonometry-in-css-and-javascript-introduction-to-trigonometry/
https://tympanus.net/codrops/2021/06/02/trigonometry-in-css-and-javascript-getting-creative-with-trigonometric-functions/
https://tympanus.net/codrops/2021/06/04/trigonometry-in-css-and-javascript-beyond-triangles/
https://tympanus.net/codrops/2021/12/07/coloring-with-code-a-programmatic-approach-to-design/

https://css-tricks.com/animating-with-clip-path/
clip-path can use, clip-paths(% relative), or a url to a SVG <clipPath> element
clip-path CSS property can use the SVG Path attributes for animated transitions.
The same number of vertices in the path cannot change but only manipulated when animating.

transition-property

transition: [property] [duration] [timing-function] [delay];
transition-property
The transition-property defines the CSS property where the transition over the element will be applied. 
We can also apply a transition to a single property (e.g., background-color or transform) or to all the properties in the rule-set.
div {transition-property: all; transition-property: transform; }

https://blog.logrocket.com/understanding-animation-transition-timing-functions-css/#:~:text=There%20are%20two%20ways%20to,changes%20over%20a%20specific%20duration.
There are two ways to animate web elements in CSS: the animation and transition properties.

The animation property allows you to change the properties of an element over a specific duration, and needs @keyframes. 
The transition property defines how an element changes over a specific duration.
animation: <name> <duration> <timing-function>;
transition: <property> <duration> <timing-function>;

https://tympanus.net/codrops/2013/05/22/examples-of-pseudo-elements-animations-and-transitions/
Only supported by modern browsers like Firefox, IE10 and recently Chrome (see this updated support table for more info)
Does not work in mobile browsers yet
Pseudo-elements cannot be identified by ID
Pseudo-elements don’t appear in the DOM.
Pseudo-elements can’t be animated with JavaScript

https://cssanimation.rocks/pseudo-elements/
double colon :: to denote pseudo-elements (as opposed to pseudo-classes like :hover, :first-child).
When adding pseudo-elements, needs 'content' property before they can be made visible on the page. 

button::after { content: ''; position: absolute; top: -50%; right: -50%; bottom: -50%; left: -50%;
  background: linear-gradient(to bottom, rgba(229, 172, 142, 0), rgba(255,255,255,0.5) 50%, rgba(229, 172, 142, 0));
  transform: rotateZ(60deg) translate(-5em, 7.5em);
}
button:hover::after, button:focus::after {animation: sheen 1s forwards;}
@keyframes sheen {100% {transform: rotateZ(60deg) translate(1em, -9em);}}
transform:translate(-50%, -50%); // center the element
transform:translateX(-50%); // center the element horizontally 
