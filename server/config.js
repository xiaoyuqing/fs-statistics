module.exports = {
  dev: {
    "port": "8081",
    "browserSync": {
      "port": "8888",
      "ui": {
        "port": "8889"
      }
    },
    "proxyMiddleware": {
      "context": "/open",
      "options": {
        "target": "http://172.31.110.152:29501"
      }
    }
  }

  /*build: {
    index: path.resolve(__dirname, 'dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true
  }*/
}

