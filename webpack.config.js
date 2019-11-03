const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function(options) {
    return {
        mode: options.mode,
        entry: {
            styles: "./src/styles.js",
        },
        output: {
            path: options.outputPath
        },
        module: {
            rules: [{
                test: /\.(css|sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 2,
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|svg|eot|ttf)$/i,
                use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: "images"
                    },
                },
                ],
            }]
        },
        plugins: [
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // all options are optional
                filename: "[name].css",
                chunkFilename: "[id].css",
                ignoreOrder: false, // Enable to remove warnings about conflicting order
            })
        ]
    };
};