/**
 * Created by ryan on 16/5/29.
 */
const utils = require('./build/utils')
const path = require('path')
module.exports = {
  entry: {
    main: './src/main'
  },

  output: {
    path: './dist/javascript',
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js'
  },
  vue: {
    loaders: utils.cssLoaders()
  },
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, './src'),
      'assets': path.resolve(__dirname, './src/assets'),
      'components': path.resolve(__dirname, './src/components')
    }
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue',
        extensions: ['vue']
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: '/',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.sass/,
        loader: 'sass'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: './dist/images/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  }
}
