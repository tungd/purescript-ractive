'use strict';
var webpack           = require('webpack');
var AsyncUglifyJs     = require("async-uglify-js-webpack-plugin");
var path              = require('path');
var fs                = require("fs");
var CompressionPlugin = require('compression-webpack-plugin');
var root              = __dirname + '/';
var npmRoot           = root + 'node_modules/';
var stylesRoot        = root + 'Content/';
var nodeScripts       = root + 'node_modules/';
var scripts           = root + 'Scripts/';
var buildScripts      = root + 'build/';
var releaseScripts    = root + 'release/';
var vendorScripts     = buildScripts + 'vendor/';
var advStyles         = stylesRoot + 'advarics/';
var advImages         = advStyles + 'images/';
var vendorStyles      = stylesRoot + 'vendor/';
var appScripts        = buildScripts + 'app/';
var componentScripts  = buildScripts + 'app/components/';
var modelScripts      = buildScripts + 'app/models/';
var serviceScripts    = buildScripts + 'app/services/';
var dxScriptsJS       = vendorScripts + 'dx/';
var dxStyles          = vendorStyles + 'dx/';

var IS_PROD = process.env.NODE_ENV === "production";

function prodPureScriptExternals() {
  var moduleNames = fs.readdirSync(path.join(__dirname, "output"));
  return moduleNames.reduce(function(result, moduleName) {
    result[moduleName] = "PS[\"" + moduleName + "\"]";
    return result;
  }, {});
}

var config = {
  cache: false,
  entry: {
    'app': path.resolve(__dirname, 'output/DemoApp.WithRactive/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'demo/scripts/release'),
    filename: '[name].min.js',
    sourceMapFilename: '[name].min.js.map',
    library: ['DemoApp','ractive']
  },
  externals: IS_PROD ? prodPureScriptExternals() : null,
  module: {
    /*preLoaders: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /vendor/],
                loader: "jshint-loader"
            }
        ],
        jshint: {
          esnext: true,
          failOnHint: false
        },*/
    loaders: [
           /* {
                include: /\.json$/,
                loaders: ["json-loader"]
            },
            {
                test: /\.ract$/,
                loader: 'ractive-component'
            },
            {
                test : /\.ts$/, exclude: [/node_modules/, /vendor/],
                loader: 'typescript-loader?typescriptCompiler=typescript'
            },
            {
                test : /\.(es6|js)$/,
                exclude: [/node_modules/, /vendor/],
                loader: 'babel-loader?optional=runtime&sourceMaps=both&nonStandard&compact=auto'
            },
            {
                test : /\.html$/, loader: 'html'
            },
            {
                test : /\.less$/, loader: 'style-loader!css-loader!less-loader'
            },
            {
                test : /\.css$/, loader: 'style-loader!css-loader'
            },
            {
                test : /\.(png|jpe?g|eot|ttf|svg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loaders: [
                    'url-loader?limit=8192&hash=sha512&digest=hex&name=[hash].[ext]',
                    'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?mimetype=application/font-woff'
            },
            {   test: /\.jpg$/,
                loader: "file-loader?name=[path][name].[ext]"
            },*/
    ]
  },
   resolve: {
      extensions: ['', '.js', '.es6', '.es6.js', '.jsx', '.json', '.ts', '.css', '.html', '.ract'],
      modulesDirectories: ['node_modules', 'bower_components','output'],
      alias: {
          //Styles
          'fabric.min.css'                : stylesRoot + 'vendor/fabric/fabric.min.css',
          'fabric.css'                    : stylesRoot + 'vendor/fabric/fabric.css',
          'fabric.components.min.css'     : stylesRoot + 'vendor/fabric/fabric.components.min.css',
          'fabric.components.css'         : stylesRoot + 'vendor/fabric/fabric.components.css',
          'site.css'                      : stylesRoot + 'advarics/site.css',
          'bootstrap.min.css'             : stylesRoot + 'vendor/bootstrap/css/bootstrap.min.css',
          'bootstrap.theme.min.css'       : stylesRoot + 'vendor/bootstrap/css/bootstrap-theme.min.css',
          'font-awesome.min.css'          : stylesRoot + 'vendor/fontawesome/css/font-awesome.min.css',
          'bootstrap'                     : stylesRoot + 'vendor/bootstrap/js/bootstrap.js',
          'bootstrap.min'                 : stylesRoot + 'vendor/bootstrap/js/bootstrap.min.js',
          /* DevExpress Styles */
          'dx.common.css'                 : dxStyles + 'dx.common.css',
          'dx.light.css'                  : dxStyles + 'dx.light.css',
          'dx.dark.css'                   : dxStyles + 'dx.dark.css',
          'dx.spa.css'                    : dxStyles + 'dx.spa.css',
          'tb.light.darkred.css'          : dxStyles + 'tb.light.darkred.css',
          'styles.css'                    : dxStyles + 'styles.css',
          'dx-styles.css'                 : dxStyles + 'dx-styles.css',
          //Vendor Scripts
          'jquery.fabric.min'             : vendorScripts + 'fabric/jquery.fabric.min.js',
          'jquery.fabric'                 : vendorScripts + 'fabric/jquery.fabric.js',
          //App Scripts
          'logon'                         : appScripts + 'access/logon.js',
          //Templates
          'main-template'                 : appScripts    + 'ui/templates/main-template.html',
          'logon-template'                : appScripts    + 'access/logon.html',
          'articleinfo-template'          : appScripts    + 'ui/templates/articleinfo-template.html',
          'pricedata-template'            : appScripts    + 'ui/templates/pricedata-template.html',
          'gallery-template'              : appScripts    + 'ui/templates/gallery-template.html',
          'settings-template'             : appScripts    + 'ui/templates/settings-template.html',
          'scanned-template'              : appScripts    + 'ui/templates/scanned-template.html',
          //Components
          'article-panel-component'       : componentScripts + 'article-panel.ract',
          'article-table-component'       : componentScripts + 'article-table.ract',
          'adv-tabpanel-component'        : componentScripts + 'adv-tabpanel.ract',
          'article-description-component' : componentScripts + 'article-description.ract',
          'adv-grid-component'            : componentScripts + 'adv-grid.ract',
          'adv-userinfo-component'        : componentScripts + 'adv-userinfo.ract',
          //Elements
          'toaster'                       : appScripts + 'elements/toaster/toaster.js',
          //Models
          'article-model'                 : appScripts + 'models/article.js',
          //Services
          'article-service'               : serviceScripts + 'article-service.js',
          //Globals
          'deps'                          : appScripts + 'config/deps.js',
          //Helpers
          'advarics'                      : appScripts + 'helpers/advarics.js',
          //Images
          'loading-image'                 : advImages + 'loading.gif'
      }
  },
  plugins: [
        new CompressionPlugin({
            asset     : '{file}.gz',
            algorithm : 'gzip',
            regExp    : /\.js$|\.html$/,
            threshold : 10240,
            minRatio  : 0.8
        }),
         new webpack.ProvidePlugin({
          'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        })
    ]
};
if (process.env.NODE_ENV === 'production') {
    config.plugins = config.plugins.concat([
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }),
    new AsyncUglifyJs({
      delay: 5000,
      minifyOptions: {
        mangle: false,
        warnings: true,
        compress: {
          sequences     : true,  // join consecutive statemets with the “comma operator”
          properties    : true,  // optimize property access: a["foo"] → a.foo
          dead_code     : true,  // discard unreachable code
          drop_debugger : true,  // discard “debugger” statements
          unsafe        : false, // some unsafe optimizations (see below)
          conditionals  : true,  // optimize if-s and conditional expressions
          comparisons   : true,  // optimize comparisons
          evaluate      : true,  // evaluate constant expressions
          booleans      : true,  // optimize boolean expressions
          loops         : true,  // optimize loops
          unused        : true,  // drop unused variables/functions
          hoist_funs    : true,  // hoist function declarations
          hoist_vars    : false, // hoist variable declarations
          if_return     : true,  // optimize if-s followed by return/continue
          join_vars     : true,  // join var declarations
          cascade       : true,  // try to cascade `right` into `left` in sequences
          side_effects  : true,  // drop side-effect-free statements
          warnings      : true,  // warn about potentially dangerous optimizations/code
        }
      },
      logger: false,
      done: function(path, originalContents) { }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true)
  ]);
} else {
    config.devtool = '#source-map';
    config.debug   = true;
}

config.useMemoryFs = true;
config.progress = true;

module.exports = config;
