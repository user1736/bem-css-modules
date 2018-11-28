const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const isProduction =
  process.argv.indexOf('-p') >= 0 || process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, 'dist')
  },
  target: 'node',
  mode: isProduction ? 'production' : 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [new CleanWebpackPlugin(['dist'])]
}
