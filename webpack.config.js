const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = {
  entry: ['react-hot-loader/patch', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  devServer: {
    static: {
      directory: './dist',
    },
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'src/index.html' }],
    }),
    new CleanWebpackPlugin(),
  ],
  stats: {
    errorDetails: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
}

module.exports = config
