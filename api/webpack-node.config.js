const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const { NODE_ENV = 'production' } = process.env;

module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          sourceMap: true,
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  },
  entry: ['./server.ts'],
  mode: NODE_ENV,
  target: 'node',
  devtool: NODE_ENV === 'production' ? 'source-map' : 'eval-cheap-module-source-map',
  node: {
    __dirname: false,
    __filename: false,
  },
  cache: {
    type: 'filesystem',
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new ForkTsCheckerWebpackPlugin(),
  ],
  output: {
    path: path.resolve(__dirname, '../dist/rpx-exui/api'),
    filename: 'server.bundle.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
};
