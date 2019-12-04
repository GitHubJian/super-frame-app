const NODE_ENV = process.env.NODE_ENV || 'development'
const isDevelopment = NODE_ENV == 'development'

const root = process.cwd()
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const pathConfig = {
  root: root,
  static: path.resolve(root, 'static'),
  templatePath: path.resolve(__dirname, 'template.ejs')
}

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  target: 'web',
  output: {
    filename: isDevelopment ? 'js/[name].js' : 'js/[name].[hash].js',
    path: pathConfig.static,
    publicPath: '/'
    // library: 'ISV',
    // libraryTarget: 'umd'
  },
  resolve: {
    alias: {
      '@assets': path.resolve(pathConfig.root, './assets'),
      '@src': path.resolve(pathConfig.root, './src')
    },
    extensions: ['.js'],
    mainFiles: ['index', 'main']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    // modules: false,
                    targets: {
                      browsers: ['Android >= 4.0', 'ios >= 6']
                    },
                    debug: false,
                    include: [],
                    corejs: 3,
                    useBuiltIns: 'usage'
                  }
                ]
              ],
              plugins: [
                [
                  '@babel/plugin-transform-runtime',
                  {
                    corejs: false,
                    helpers: true,
                    regenerator: true,
                    useESModules: false
                  }
                ],
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-optional-chaining',
                '@babel/plugin-transform-modules-commonjs'
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: isDevelopment
                ? 'images/[name].[ext]'
                : 'images/[name].[contenthash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader','sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.buildTime': JSON.stringify(Date.now())
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: isDevelopment ? 'development' : 'production'
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment
        ? 'css/[name].css'
        : 'css/[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: pathConfig.templatePath,
      chunks: ['sfa'],
      title: 'Super Frame App Test',
      inject: 'head',
      minify: true
    })
  ]
}
