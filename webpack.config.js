const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require("postcss-preset-env");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin-patched');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
// const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'); outdated
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

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
    output: {
      path: path.resolve('./docs'),
      publicPath: '/',
      filename: (pathData) => {
        // [name] defers to id when it doesn't exist.
        // console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', pathData)
        return '[runtime].[id].[hash].js'
      },
      chunkFilename: 'chunk.[name].[chunkhash].js',
      globalObject: "self",
      clean: true,
    },
    optimization: {
      splitChunks: { chunks: 'all', },
      minimizer: [
        new TerserPlugin({ // config default parser
          terserOptions: {
            parse: { html5_comments: false },
            compress: { pure_funcs: ['console.log'], toplevel: true },
            sourceMap: { url: "inline" },
            keep_classnames: true,
            keep_fnames: true,
            nameCache: null, // when set to true it helps speed things up but can deliver outdated cache results
            keep_classnames: true,
            keep_fnames: true
          },
        })
      ]
    },
    module: {
      rules: [
        {
          test: /\.worker\.js$/,
          use: {
            loader: 'worker-loader',
            options: { inline: true, name: 'worker.[hash].js' },
          }
        },
        { 
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /(node_modules|main|router|sitemap)/,
          use: { 
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.(sc|c)ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            "css-loader", {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [postcssPresetEnv()],
                },
              },
            },
            // according to the docs, sass-loader should be at the bottom, which
            // loads it first to avoid prefixes in your sourcemaps and other issues.
            "sass-loader",
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
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[name].[id].css"
      }),
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
        inlineSource: 'main.*.js$', 
        inject: 'head',
      }),
      new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
      new HTMLInlineCSSWebpackPlugin(),
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
      } ),
      new HtmlMinimizerPlugin({
        minimizerOptions: {
          minifyJS: true, // compress template_article js
        },
        // test: /template_article\.html$/,
        exclude: [/tables/, /maps/],
      }),
    ],

  }
}
