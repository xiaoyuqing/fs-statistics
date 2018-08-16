/**
 * Webpack config for tests
 */
var path = require('path');
var webpack = require('webpack');
var proxyMiddleware = require('http-proxy-middleware');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var browserSync = require('browser-sync');
var connectBrowserSync = require('connect-browser-sync');
var ROOT_PATH = path.resolve(process.cwd());
var pkgConfig = require(path.resolve(ROOT_PATH, 'server/config.js'));
var fs = require('fs');
var webpackConfig = require('./webpack.make.js');
var compiler = webpack(webpackConfig);


module.exports = function(app) {
  //支持https的链接
  var httpProxy = proxyMiddleware(pkgConfig.dev.proxyMiddleware.context, {
    target: pkgConfig.dev.proxyMiddleware.options.target,
    changeOrigin: true ,  
    ssl: {
      key: fs.readFileSync(path.join(__dirname, 'ssl-key.pem'), 'utf8'),
      cert: fs.readFileSync(path.join(__dirname, 'ssl-cert.pem'), 'utf8')
    }
  });

  var bs = browserSync({
    port: pkgConfig.dev.browserSync.port,
    ui: {
      port: pkgConfig.dev.browserSync.ui.port
    },
    proxy: 'localhost:' + pkgConfig.dev.port,
    files: ['src/**/*']
  });


  /******************* middleware start *******************/
  app.use(httpProxy);
  app.use(webpackDevMiddleware(compiler, webpackConfig.devServer));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log
  }));
  app.use(connectBrowserSync(bs));

  /******************* middleware end *******************/
}
