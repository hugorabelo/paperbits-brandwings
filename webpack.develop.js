const webpack = require("webpack");
const { merge } = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const designerConfig = require("./webpack.designer.js");


const developmentConfig = {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        host: "0.0.0.0",
        disableHostCheck: true,
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: `./src/config.design.json`, to: `./config.json` },
            ]
        })
    ]
}

module.exports = []
    .concat(designerConfig)
    .map(x => merge(x, developmentConfig));