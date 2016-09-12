var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: [
        './src/index.js' // Your appʼs entry point
    ],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: loaders
    },
    plugins: [
        new CopyWebpackPlugin(
            [
                {from: './src/index.html'},
                {from: 'assets', to: 'assets'},
                {from: 'libs', to: 'libs'}
            ]
        ),
        new webpack.DefinePlugin(
            {
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }
        )
    ]
};
