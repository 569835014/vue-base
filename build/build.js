require('./check-versions')() // 检查 Node 和 npm 版本

process.env.NODE_ENV = 'production'

var ora = require('ora')// 一个很好看的 loading 插件
var rm = require('rimraf')
var path = require('path')//node路径工具
var chalk = require('chalk')
var webpack = require('webpack')//引入webpack
var config = require('../config') // 加载 config.js
var webpackConfig = require('./webpack.prod.conf')

var spinner = ora('building for production...') // 使用 ora 打印出 loading + log
spinner.start()
/* 拼接编译输出文件路径 */
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    // 编译成功的回调函数
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
