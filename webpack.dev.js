const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv-webpack')

module.exports = {
    entry: './src/client/index.js',
    devtool: 'source-map',
    mode: "development",
    output: {
        path: path.resolve(process.cwd(),'dist'),
        library: "client",
        libraryTarget: "var"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/client/html/index.html',
            filename: 'index.html'
        }),
        new dotenv({
            systemvars: true
        })
    ]
}