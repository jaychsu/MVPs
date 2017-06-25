const path = require('path')

module.exports = {
  entry: './index.entry.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build'),
  },
}
