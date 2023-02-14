const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin-patched');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const hr = require('./src/header.json');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); 
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;


const isDev = process.env.NODE_ENV === 'development'

module.exports = env => {
  let template = `
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <head id="head"></head>
    <body>
      <div id="body"></div>
    </body>
  </html>`;
  let template1 = `
  <!DOCTYPE html>
  <html lang="en" dir="ltr">
    <script src='./router.js'></script>
    <head id="head"></head>
    <body>
      <div id="body"></div>
    </body>
  </html>`;
  return {
  entry: {
    head: './src/head.js',
    index: './src/admin/index.js',
    main: './src/main.js',
  },
  optimization: {
    minimize: !!isDev,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          ecma: undefined,
          parse: {
            html5_comments: false,
          },
          compress:{ // (default {})
            pure_funcs: ['console.log'],
            toplevel: true, 
          },
          mangle: { // (default true)
            toplevel: true,
          },
          module: false,
          // Deprecated
          output: null,
          format: null,
          sourceMap: { // (default false) - Pass true to include source maps in error messages.
            url: "inline", 
          },
          toplevel: true, // (default false) - Pass true to enable top level variable and function name mangling and to drop unused variables and functions.
          nameCache: null,
          ie8: false,
          keep_classnames: undefined,
          keep_fnames: false,
          safari10: false,
        },
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        }
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["imagemin-gifsicle", { progressive: true }],
              ["imagemin-mozjpeg", { progressive: true }],
              ["imagemin-pngquant", { progressive: true }],
              [
                "imagemin-svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
        generator: [
          {
            type: "asset", // Apply generator for copied assets
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ["imagemin-webp"],
            },
          },
        ],
      }),
    ],
    splitChunks: { chunks: 'all' }
  },
  output: {
    path: path.resolve('./docs'),
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[name].js',
    globalObject: "this",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: { inline: true, name: 'worker.[hash].js' }
        }
      },
      { 
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: { 
              "presets": ["@babel/preset-env", "@babel/preset-react"],
              "plugins": [ '@babel/transform-runtime' ]
          }
        }
      },
      {
        test: /.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
              sourceMap: true
            },
          },
          {loader:'css-loader', options: {sourceMap: true} },
          { loader: "postcss-loader",
            options: {
              ident: 'postcss',
              postcssOptions: {
              plugins: [ require('postcss-preset-env')() ]
              },
              sourceMap: true
            }
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(csv|tsv)$/,
        use: [ 'csv-loader' ],
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext]'
        }
      },
      { 
        test: /\.json$/,         
        type: 'asset/resource',
        generator: {
          filename: '[name].json'
        } 
      },
      {
        test: /\.html$/,
        type: "asset/source",
        generator: {
          filename: "[name][ext]",
        },
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].[id].css"
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
    new HtmlWebpackPlugin({
      filename: 'admin/index.html',
      chunks: [ 'head', 'index'],
      excludeChunks: [ 'main' ],
      templateContent: template,
      inlineSource: isDev && '^(index).*.(css)$', 
      inject: 'head',
      minify: {
        collapseWhitespace: !isDev,
        removeComments: !isDev
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['head','main'],
      excludeChunks: [ 'index'],
      templateContent: template1,
      // inlineSource: 'main.*.js$', 
      inject: 'head'
    }),
    new HTMLInlineCSSWebpackPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      preload: {
        test: /^(test|imported).*.(js|json|svg|css)$/,
        chunks: 'all'
      },
      prefetch: {
        test: /\.(json|svg|css)$/,
        chunks: 'all'
      },
      defaultAttribute: 'async',
    }),    
    isDev ? '' : new WebpackPwaManifest( {
      fingerprints: false,
      name: hr.longName,
      short_name:  hr.shortName,
      description: hr.description,
      background_color: 'black',
      crossorigin: 'use-credentials',
      start_url: './',
      display: "standalone",
      theme_color: 'red',
      dir:"rtl",
      lang:"ar",
      icons: [ ],
      inject: false
    } ),/*
    !!isDev && new WorkboxPlugin.GenerateSW({
      swDest: './sw.js',
      clientsClaim: true,
      skipWaiting: true,
      exclude: [/\.(?:png|jpg|jpeg|svg|ico)$/],
      runtimeCaching: [{
        urlPattern: /\.(?:png|jpg|jpeg|svg|js)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: { maxEntries: 10 },
        },
      }]
    }),*/
    new CopyWebpackPlugin({
      patterns: [
        { from: './robots.txt', to: 'robots.txt', toType: 'file' },
        { from: './CNAME', to: 'CNAME', toType: 'file' },
        { from: './src/maps', to: './maps', toType: 'dir' },
        { from: './src/404.html', to: '404.html', toType: 'file' },
        { from: './src/router.js', to: 'router.js', toType: 'file' },
        { from: './src/template_article.html', to: 'template_article.html', toType: 'file' },
        { from: './src/posts', to: './posts', toType: 'dir' },
        { from: './src/tables', to: './tables', toType: 'dir' },
        { from: './src/images', to: './images', toType: 'dir' }
      ]
    } )
  ],
  devServer: {
    proxy: {
      '/data': 'http://localhost:80/PROJECTNAME/src/'
    }
  }
}
}

/*
      {  
        src: path.resolve('./images/icon192.png'),
        sizes: "192x192",  
        type: "image/png"  
      }, 
      {  
        src: path.resolve('./images/icon512.png'), 
        sizes: "512x512",  
        type: "image/png"  
      } 

https://webpack.js.org/configuration/devtool/
https://webpack.js.org/configuration/dev-server/#devserverstatic
https://github.com/stereobooster/react-snap/blob/master/index.js
https://github.com/terser/terser
        { from: './src/header.json', to: 'header.json', toType: 'file' },
        { from: './src/error', to: 'error' },
        { from: './src/.htaccess', to: '.htaccess', toType: 'file' },
        { from: './src/robots.txt', to: 'robots.txt', toType: 'file' },
        { from: './assets/', to: './assets', toType: 'dir' },
        { from: "./assets/posts", to: "./assets/posts", toType: 'dir' },
        { from: './assets/images', to: './images', toType: 'dir' }
*/