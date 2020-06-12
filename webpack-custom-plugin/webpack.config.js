const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const No2WebpackPlugin = require('./plugins/No2-webpack-plugin');
const FileListPlugin = require("./plugins/File-list-plugin")
const WatcherPlugin = require("./plugins/watch-plugin")

module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'custom-plugin'
        }),
        new CleanWebpackPlugin(),
        new FileListPlugin({
            filename:"name.md"
        }),
        new WatcherPlugin(),
        new No2WebpackPlugin({ msg: 'good boy!' }),

    ]
}