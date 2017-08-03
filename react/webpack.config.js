const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
      { test: /\.css$/,
        use: ExtractTextPlugin.extract({ use: 'css-loader' }),
        exclude: /node_modules/
      },
      { test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
}
