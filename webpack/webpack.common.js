/**
 * Webpack configurations for server and client.
 * Note that these are not fully webpack compatible configurations, and need to be converted first.
 *
 * Both client and server are built into the 'dist' directory.
 * The compiled client script, as well as all assets, go into 'dist/static'.
 *
 * TODO: We currently emit assets twice, once for server and client (into the same folder).
 * This is only necessary because server loads favicon.ico, which is not loaded by the client code path.
 */

const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const babelrc = { extends: path.join(__dirname, '../.babelrc') }

module.exports.devServerHostname = '0.0.0.0'
module.exports.devServerPublicHostname = 'localhost'
module.exports.devServerPort = 9090

const assetNamePattern = '[sha1:hash:base64:11].[ext]'

function SharedConfig (debug = false) {
  return {
    cache: false,
    context: __dirname,
    output: {},
    plugins: {},

    module: {
      rules: {
        json: {
          test: /\.json$/,
          loader: 'json-loader',
          exclude: /node_modules/
        },

        images: {
          test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/,
          loader: 'file-loader',
          options: {
            context: 'static',
            name: assetNamePattern
          },
          exclude: /node_modules/
        },

        // need another svg loader here, as bootstrap fonts aren't within "static" folder (= context)
        // make sure to not load SVGs twice though, so we exclude the "static" folder here.
        fonts: {
          test: /\.(woff2?|svg|ttf|eot)$/,
          loader: 'file-loader',
          options: {
            name: assetNamePattern
          },
          exclude: /static/
        },

        babel: {
          test: /\.js$/,
          loader: 'babel-loader',
          options: Object.assign({}, { cacheDirectory: true }, babelrc),
          exclude: /node_modules/
        },

        sass: {
          test: /\.scss$/,
          use: {
            isostyle: { loader: 'isomorphic-style-loader' },
            css: {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: debug,
                minimize: !debug,
                localIdentName: debug ? '[local]___[hash:base64:5]' : '[hash:base64:5]'
              }
            },
            postcss: {
              loader: 'postcss-loader',
              options: {
                plugins: [
                  autoprefixer({browsers: ['last 2 versions']})
                ],
                sourceMap: debug
              }
            },
            sass: {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                sourceMap: debug
              }
            }
          },
          exclude: /node_modules/
        }
      },
      noParse: /\.min\.js/
    },

    resolve: {
      modules: [
        'src',
        'node_modules',
        'static'
      ],
      extensions: ['.js', '.json']
    },

    node: {
      __dirname: true,
      fs: 'empty'
    }
  }
}

function toArray (obj) {
  if (Array.isArray(obj)) {
    return obj
  }

  const arr = []
  for (let i in obj) {
    if (obj.hasOwnProperty(i)) {
      arr.push(obj[i])
    }
  }
  return arr
}

/**
 * Converts custom configuration into webpack compatible one.
 * Changes:
 *   - Converts loader map to array
 *   - Converts plugin map to array
 */
module.exports.convert = function (config) {
  config.module.rules = toArray(config.module.rules)
  config.module.rules = config.module.rules.map(rule => {
    if (rule.loader) return rule
    rule.use = toArray(rule.use)
    return rule
  })
  config.plugins = toArray(config.plugins)
  return config
}

module.exports.ClientConfig = function (debug = false) {
  const config = new SharedConfig(debug)
  // Note that we rely on the fact that the filename starts with "client-".
  // (See docker-entrypoint)
  const filename = debug ? 'client' : 'client-[hash:5]'

  config.target = 'web'
  config.devtool = false
  config.entry = ['bootstrap-loader/extractStyles', 'babel-polyfill', '../src/client/client']
  config.output = {
    path: path.join(__dirname, '../dist/static'),
    filename: `${filename}.js`,
    chunkFilename: '[name].[hash:5].js',
    publicPath: '/static/'
  }

  config.plugins = {
    defines: new webpack.DefinePlugin({__CLIENT__: true, __SERVER__: false, __PRODUCTION__: true, __DEV__: false}),
    defineEnv: new webpack.DefinePlugin({'process.env': {NODE_ENV: '"production"'}}),
    // TODO: Enable this once it actually works. Last time it broke the toastReducer! (Module was empty?!)
    // Maybe related to this: https://github.com/webpack/webpack/issues/5132
    // concat: new webpack.optimize.ModuleConcatenationPlugin(),
    uglifyJs: new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
    extractText: new ExtractTextPlugin({ filename: `${filename}.css`, allChunks: true })
  }

  return config
}

module.exports.ServerConfig = function (debug = false) {
  const config = new SharedConfig(debug)

  config.target = 'node'
  config.devtool = 'source-map'
  config.entry = ['../src/server/server']
  config.output = {
    path: path.join(__dirname, '../dist'),
    filename: 'server.js'
  }

  // write into the same directory as client
  config.module.rules.images.options.name = '/static/' + assetNamePattern
  config.module.rules.fonts.options.name = '/static/' + assetNamePattern

  config.plugins = {
    defines: new webpack.DefinePlugin({__CLIENT__: false, __SERVER__: true, __PRODUCTION__: true, __DEV__: false})
  }

  config.externals = [
    nodeExternals({
      whitelist: [
        'bootstrap-loader',
        'webpack/hot/poll?1000' // for webpack.server-watch.js
      ]
    })
  ]

  return config
}
