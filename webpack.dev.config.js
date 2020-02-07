require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'src');

const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: [
      '@babel/polyfill',
      APP_DIR + '/index.tsx',
      'webpack-dev-server/client?http://0.0.0.0:8080',
    ]
  },
  output: {
    path: BUILD_DIR,
    publicPath: '/public/',
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }
    ]
  },
  devServer: {
    historyApiFallback: {
      index: 'index.html'
    },
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
};

module.exports = config;
