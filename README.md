##说明
    基于angular+webpack+babel的构建工具,适用于单页面应用
    modify by:https://github.com/preboot/angular-webpack

## 准备工作
1. cd 到angular-webpack目录
2. npm install 安装依赖
3. 生成ssl证书:[可选,如果需要支持https]
    openssl genrsa -out ssl-key.pem 1024
    openssl x509 -req -in certrequest.csr -signkey ssl-key.pem -out ssl-cert.pem
4. npm run start 开发环境编译
5. 浏览器自动打开http://localhost:8888/

##配置项
    配置项放在package.json文件中
    1. 配置默认端口号的配置。config.port
    2. 配置browserSync的端口号。config.browserSync
    3. 配置代理的服务器便于本地开发调试(支持https)。config.proxyMiddleware
 
## 技术选型
1. webpack - 模块依赖管理、打包等
2. angular.js - 1.5.0的版本
3. angular-ui-router - 基于angular路由(支持路由嵌套)


## angular-webpack架构
1. src - 开发源码
    * 根目录 - html页面
    * app - 页面的入口模块
    * commoms -  业务相关directive和一些常用功能集合
    * components - 和业务无关的组件集合
    * modules - 业务模块组件
    * public - 额外的公共文件资源，脚本、样式、图片等
    * 开发时，建议采用CommondJS规范，和node.js一模一样
2. npm run start - 本地环境的调试代码(带sourcemap)
3. npm run build - 生产环境的打包代码(压缩)，可部署线上环境
4. server - 构建工具环境的server
    * webpack.make.js  - webpack的环境配置
    * middleware.js -  express的middleware(中间件的)配置
    * start.js  - 开发环境配置(基于express)
    * build.js  - 生产环境配置
5. angular-webpack的开发代码使用ES6编写，编译后还是ES5(使用ES5开发完全不影响)
    * 经过试验和研究，发现使用class语法定义组件，babel编译后会插入大量重复函数，导致体积暴涨，因此建议放弃使用class语法
    * arrow function - 箭头函数是个好东西，可以尽量使用
    * templates string - 模板字符串也是个好东西