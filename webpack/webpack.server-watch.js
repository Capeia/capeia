const webpack = require('webpack')

const common = require('./webpack.common')
const config = new common.ServerConfig(true)

config.cache = true

config.entry.unshift(
  'webpack/hot/poll?1000'
)

config.output.publicPath = 'http://' + common.devServerPublicHostname + ':' + common.devServerPort
config.output.devtoolModuleFilenameTemplate = '[absolute-resource-path]'
config.devtool = 'inline-source-map'

config.plugins = [
  new webpack.DefinePlugin({
    __CLIENT__: false,
    __SERVER__: true,
    __PRODUCTION__: false,
    __DEV__: true,
    __DEV_SERVER_PORT__: common.devServerPort
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new webpack.NamedModulesPlugin()
]

module.exports = common.convert(config)
