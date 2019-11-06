const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = function(options) {
    var result = {
        mode: options.mode,
        entry: {
            styles: "./src/styles/styles.js",
            scripts: "./src/scripts/scripts.ts"
        },
        output: {
            path: options.outputPath,
            libraryTarget: 'var',
            library: 'PlumPack'
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
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
            }),
            new VueLoaderPlugin()
        ],
        resolve: {
            extensions: [ '.tsx', '.ts', '.js', 'vue' ],
            alias: {
                // For the runtime compiler.
                'vue$': 'vue/dist/vue.esm.js'
            }
        },
    };
    if(result.mode == "development") {
        result.devtool = "source-map";
    }
    return result;
};