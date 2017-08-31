require('./check-versions')()// 检查 Node 和 npm 版本

var config = require('../config') // 获取 config/index.js 的默认配置


/*
** 如果 Node 的环境无法判断当前是 dev / product 环境
** 使用 config.dev.env.NODE_ENV 作为当前的环境
*/

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn') // 一个可以强制打开浏览器并跳转到指定 url 的插件
var path = require('path') // 使用 NodeJS 自带的文件路径工具
var express = require('express')// 使用 express
var webpack = require('webpack')// 使用 webpack
var proxyMiddleware = require('http-proxy-middleware') // 使用 proxyTable
var webpackConfig = require('./webpack.dev.conf')// 使用 dev 环境的 webpack 配置

// default port where dev server listens for incoming traffic
/* 如果没有指定运行端口，使用 config.dev.port 作为运行端口 */
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false

var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
/* 使用 config.dev.proxyTable 的配置作为 proxyTable 的代理配置 */
var proxyTable = config.dev.proxyTable
/* 使用 express 启动一个服务 */
var app = express()
var compiler = webpack(webpackConfig) // 启动 webpack 进行编译
/* 启动 webpack-dev-middleware，将 编译后的文件暂存到内存中 */
var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})
/* 启动 webpack-hot-middleware，也就是我们常说的 Hot-reload */
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
// 将 proxyTable 中的请求配置挂在到启动的 express 服务上
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})
var apiRouter=express.Router();
app.use(apiRouter);
apiRouter.get('/logo',function (req,res) {
  var user=req.query;
  if(user.userName=='admin123'&&user.pwd=='111111'){
    res.send({
      rcd:'100000',
      userName:user.userName,
      pwd:user.pwd
    })
  }else{
    res.send({
      rcd:'20000',
      msg:"账户或者密码错误"
    })
  }
});
// handle fallback for HTML5 history API
// 使用 connect-history-api-fallback 匹配资源，如果不匹配就可以重定向到指定地址
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
// 将暂存到内存中的 webpack 编译后的文件挂在到 express 服务上
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
// 将 Hot-reload 挂在到 express 服务上
app.use(hotMiddleware)

// serve pure static assets
// 拼接 static 文件夹的静态资源路径
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// 为静态资源提供响应服务
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  // 如果不是测试环境，自动打开浏览器并跳到我们的开发地址
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)
// 让我们这个 express 服务监听 port 的请求，并且将此服务作为 dev-server.js 的接口暴露
module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
