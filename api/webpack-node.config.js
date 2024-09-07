/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');

const {
  NODE_ENV = 'production'
} = process.env;

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          sourceMap: true,
          compress: {
            drop_console: true
          }
        }
      })
    ]
  },
  entry: ['./server.ts'],
  mode: NODE_ENV,
  target: 'node',
  devtool: 'source-map',
  node: {
    __dirname: false,
    __filename: false
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false })
  ],
  output: {
    path: path.resolve(__dirname, '../dist/rpx-exui/api'),
    filename: 'server.bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          'ts-loader'
        ],
        exclude: /node_modules/
      }
    ]
  }
};
