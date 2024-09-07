/* eslint-disable */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const TerserPlugin = require('terser-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const { NODE_ENV = 'production' } = process.env;

module.exports = {
  optimization: {
    minimize: NODE_ENV === 'production',
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: NODE_ENV === 'production',
            dead_code: true,
            drop_debugger: true,
            conditionals: true,
            evaluate: true,
            booleans: true,
            loops: true,
            unused: true,
            hoist_funs: true,
            keep_fargs: false,
            hoist_vars: true,
            if_return: true,
            join_vars: true,
            side_effects: true,
            warnings: false,
          },
        },
      }),
    ],
    // Remove splitChunks configuration
  },
  entry: './server.ts', // Changed to a single entry point
  mode: NODE_ENV,
  target: 'node',
  devtool: NODE_ENV === 'production' ? 'source-map' : 'eval-cheap-module-source-map',
  node: {
    __dirname: false,
    __filename: false,
  },
  cache: {
    type: 'filesystem',
    compression: 'gzip',
  },
  plugins: [
    new webpack.DefinePlugin({ "global.GENTLY": false }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        memoryLimit: 4096, // Increase memory limit to 4GB
      },
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
  output: {
    path: path.resolve(__dirname, '../dist/rpx-exui/api'),
    filename: 'server.bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
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
