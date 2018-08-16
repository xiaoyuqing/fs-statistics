'use strict';

// Modules
var path = require('path');
var argv = require('yargs').argv;
var webpack = require('webpack');
var fs = require('fs');
var autoprefixer = require('autoprefixer');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var target = argv.target;

//autoprefixer支持的类型
const AUTOPREFIXER_BROWSERS = [
  'Android 2.3',
  'Android >= 4',
  'Chrome >= 35',
  'Firefox >= 31',
  'Explorer >= 9',
  'iOS >= 7',
  'Opera >= 12',
  'Safari >= 7.1'
];

var ROOT_PATH = path.resolve(process.cwd());

var sourceMap = require(path.resolve(ROOT_PATH,'src/sourcemap.json'));


var ENV = process.env.npm_lifecycle_event;

  var config = {};

  config.entry = {};
  config.entry[target] = path.resolve(ROOT_PATH, 'src/app/'+ target +'.js');
  config.entry['vendors'] = ['angular', 'angular-ui-router', 'angular-nvd3', 'oclazyload'];

  config.output = {
    path: path.resolve(ROOT_PATH, 'dist'),

    filename: ENV === 'build' ? '[name].[chunkhash:8].js' : '[name].bundle.js',

    chunkFilename: ENV === 'build' ? '[name].[chunkhash:8].js' : '[name].bundle.js'
  };

  /*config.externals = {
    "angular": "angular"
  }*/
  config.resolve = {
      root: [ROOT_PATH, path.resolve(ROOT_PATH,'node_modules')],
      alias: sourceMap,
      extensions: ['', '.js', '.css', '.less', '.tpl', '.png', '.jpg']
  }

  //source-map   inline-source-map 
  if (ENV) {
    config.devtool = 'source-map';
    //config.devtool = 'eval-source-map';
  }


  config.module = {
    preLoaders: [{
        test: /\.js$/,
        include: [
          path.resolve(ROOT_PATH, "src/modules"),
          path.resolve(ROOT_PATH, "src/components"),
          path.resolve(ROOT_PATH, "src/commom"),
          path.resolve(ROOT_PATH, "src/app")
        ],
        loader: 'eslint'
    }],
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
    }, {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style', 'css?aliasMap!postcss!less')
        //less-loader?compress=false解决postcss-px2rem 压缩后不生效的问题
    },
    {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        loaders: [
            'image?{bypassOnDebug: true, progressive:true, optimizationLevel: 3, pngquant:{quality: "65-80", speed: 4}}',
            'url?name=assets/images/[name].[hash:8].[ext]&limit=8192'// <8k的图片，输出为base64 dataurl
        ]
    }, {
        test: /\.(ttf|otf|woff|eot)$/,
        loader: 'url-loader?name=assets/fonts/[name].[hash:8].[ext]&limit=1024'// <1k的font文件，输出为base64 dataurl
    }, {//把html转化成js的插件
      test: /\.tpl$/,
      loader: 'raw'
    }, {
        test: /\.json$/,
        loader: 'json'
    }]
  };


  config.postcss = [
    require('postcss-px2rem')({ remUnit: 75 }),
    autoprefixer({
      browsers: AUTOPREFIXER_BROWSERS
    })
  ];

  config.eslint =  {
    configFile: path.resolve(ROOT_PATH,'.eslintrc')
  };

  function htmlHelper(html, js, inject) {
      return new HtmlWebpackPlugin({
          template: path.resolve(ROOT_PATH,'src/public/' + html),
          filename: html,
          inject: inject,
          chunks: js,
          //chunksSortMode: 'dependency',//根据依赖来决定顺序
          minify: {
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            collapseWhitespace: true
          },
          isEmbed: ENV === 'build' ? 1 : 0,
          flexibleCss: fs.readFileSync(path.resolve(ROOT_PATH,'src/public/assets/css/flexible.less'), 'utf-8'),
          flexibleJs: fs.readFileSync(path.resolve(ROOT_PATH,'src/public/libs/flexible.js'), 'utf-8'),
          basketJs:fs.readFileSync(path.resolve(ROOT_PATH,'src/public/libs/basket.js'), 'utf-8'),
          loadSource:fs.readFileSync(path.resolve(ROOT_PATH,'src/public/libs/load-source.js'), 'utf-8')      });
  }

  config.plugins = [];

  config.plugins.push(
    new webpack.optimize.DedupePlugin(),
    
    new ExtractTextPlugin(ENV === 'build' ? '[name].[contenthash:8].css' : '[name].bundle.css'),

    new webpack.DefinePlugin({//只能在js中使用(value只能为boolean类型)
      __MOCK__: argv.mock
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      filename: '[name].js',//指定名称为了不加上hash值。
      minChunks: Infinity, //如果minChunks等于2，说明一个文件至少被require两次才能放在CommonChunk里。
      chunks:[]
    })
  );

  if (ENV === 'start') {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),

      htmlHelper(target+'.html', ['vendors', target], 'body')

    );
  }
  

  if (ENV === 'build') {
    config.plugins.push(

      new CopyWebpackPlugin([{
        from: path.resolve(ROOT_PATH,'src/public')
      }]),

      htmlHelper(target+'.html', ['vendors', target], false)
      
    )
  }

  module.exports =  config;
   