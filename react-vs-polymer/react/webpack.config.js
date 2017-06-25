const path = require('path')

module.exports = {
  entry: './index.entry.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      { test: /\.css$/, use: 'css-loader', exclude: /node_modules/ },
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
    ],
  },
}
