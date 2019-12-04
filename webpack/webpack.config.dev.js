const root = process.cwd()
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base.js')

const devConfig = {
  entry: {
    sfa: [
      'webpack-dev-server/client?http://local.sogou.com:8424/',
      path.resolve(root, 'src/main.js')
    ]
  },
  output: {
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    host: 'local.sogou.com',
    contentBase: root,
    compress: false,
    port: 8424,
    hot: true,
    inline: true,
    allowedHosts: ['*.sogou.com'],
    index: 'static/index.html',
    openPage: 'http:/local.sogou.com:8424/static/index.html'
  }
}

module.exports = merge(baseConfig, devConfig)
