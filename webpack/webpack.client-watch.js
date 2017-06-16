const webpack = require('webpack')

const common = require('./webpack.common')
const config = new common.ClientConfig(true)

config.cache = true
config.devtool = 'cheap-module-eval-source-map'
config.output.pathinfo = true

config.entry.unshift(
  'webpack-dev-server/client?http://' + common.devServerPublicHostname + ':' + common.devServerPort,
  'webpack/hot/only-dev-server'
)

config.devServer = {
  publicPath: 'http://' + common.devServerPublicHostname + ':' + common.devServerPort + '/static/',
  port: common.devServerPort,
  contentBase: 'dist',
  hot: true,
  inline: false,
  lazy: false,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: 'minimal',
  host: common.devServerHostname
}

config.output.publicPath = config.devServer.publicPath
config.output.hotUpdateMainFilename = 'update/[hash]/update.json'
config.output.hotUpdateChunkFilename = 'update/[hash]/[id].update.js'

delete config.plugins.defineEnv
delete config.plugins.dedupe
delete config.plugins.occurenceOrder
delete config.plugins.uglifyJs
config.plugins.defines = new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false, __PRODUCTION__: false, __DEV__: true})
config.plugins.hmr = new webpack.HotModuleReplacementPlugin()
config.plugins.namedModules = new webpack.NamedModulesPlugin()
config.plugins.noErrors = new webpack.NoEmitOnErrorsPlugin()

// Setup react-hot-loader
if (config.module.rules.babel.options.plugins == null) {
  config.module.rules.babel.options.plugins = []
}
config.module.rules.babel.options.plugins.push('react-hot-loader/babel')
if (config.entry.indexOf('babel-polyfill') === -1) {
  throw new Error('Expected babel-polyfill')
}
// Insert after polyfill, as per documentation
config.entry.splice(config.entry.indexOf('babel-polyfill') + 1, 0, 'react-hot-loader/patch')

module.exports = common.convert(config)
