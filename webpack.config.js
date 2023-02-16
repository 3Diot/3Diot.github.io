const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // works as expected
const HtmlWebpackPlugin = require('html-webpack-plugin'); // works as expected

const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // works as expected
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // works as expected
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default; // works as expected

const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'); // But works as expected
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin-patched'); // works as expected
const TerserPlugin = require('terser-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin'); // works as expected

const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest')
const hr = require('./src/header.json');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); 


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
  return {
  entry: {
    head: './src/head.js',
    index: './src/admin/index.js',
    main: './src/main.js',
  },
  optimization: {
    minimize: true,
    minimizer: [
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
        test: /\.(sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: isDev, reloadAll: isDev, sourceMap: isDev, cache: true },
          },
          {loader:'css-loader', options: {sourceMap: isDev} },
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
      templateContent: template,
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
    } ),
    /*
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
    }),
    */
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