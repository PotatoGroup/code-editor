const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: "development",
    entry: path.resolve(__dirname, 'index.tsx'),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].min.js",
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                loader: "babel-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".jsx", ".ts", ".js"],
    },
    devServer: {
        port: 8000,
        compress: true,
        open: true,
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),
            filename: "index.html",
        }),
    ],
};
