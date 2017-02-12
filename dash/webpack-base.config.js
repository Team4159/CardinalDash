const path = require("path");
const validator = require("webpack-validator");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
    target: "electron-renderer",
    entry: {
        app: ["babel-polyfill", path.join(__dirname, "./index.js")],
        vendor: ["react", "react-dom"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Cardinaldash"
        }),
        new webpack.DefinePlugin({
            URL_PREFIX: JSON.stringify(process.env.URL_PREFIX || "")
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
        }),
        new CopyWebpackPlugin([
                {context: 'node_modules/react-bootstrap-theme-switcher/themes/', from: '**/*', to: 'themes/'}
            ],
            {copyUnmodified: true}
        )
    ],
    module: {
        loaders: [
            {
                loader: "babel-loader",
                test: /\.js$/,
                query: {
                    presets: [["es2015", { modules: false }], "react", "stage-2"],
                    babelrc: false
                },
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            },
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
            {test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000'},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream'},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml'}
        ]
    }
};

module.exports = validator(config);
