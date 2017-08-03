const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Webpack = require('webpack')

module.exports = {
  entry: {
    index: './index.entry.js', // rename `main` to `index`
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true,
        },
      },
    ],
  },
  plugins: [
    new Webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      }
    }),
    new ExtractTextPlugin('[name].css'),
  ],
}
