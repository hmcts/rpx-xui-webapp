const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const {
    NODE_ENV = 'production',
} = process.env;

module.exports = {
    entry: './server.ts',
    mode: NODE_ENV,
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    plugins: [
        new webpack.DefinePlugin({ "global.GENTLY": false })
    ],
    output: {
        path: path.resolve(__dirname, '../dist/rpx-exui/api'),
        filename: 'server.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader',
                ]
            }
        ]
    }
};
