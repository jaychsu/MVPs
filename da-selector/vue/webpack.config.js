const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: {
    index: './index.entry.js', // rename `main` to `index`
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
}
