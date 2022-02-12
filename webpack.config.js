const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const configFunc = ({ mode }) => {
    const distDir = path.resolve(__dirname, "dist")
    let config = {
        mode,
        entry: path.resolve(__dirname, "src", "index.js"),
        output: {
            filename: "bundle.min.js",
            path: distDir
        },
        module: {
            rules: [
                {
                    test: /\.js$/i,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
                {
                    test: /\.css$/i,
                    use: [MiniCssExtractPlugin.loader, 'css-loader']
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: "[name].[ext]",
                                outputPath: 'assets/images'
                            }
                        },
                    ],
                },
                {
                    test: /\.(ttf|eot|otf|woff|woff2)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: "[name].[ext]",
                                outputPath: 'assets/fonts'
                            }
                        },
                    ],
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "src/index.html"),
                favicon: path.resolve(__dirname, "src/img/favicon/favicon.ico")
            }),
            new MiniCssExtractPlugin(),
            new CopyWebpackPlugin([
                'src/manifest.json',
                'src/_redirects',
                { from: 'src/img/screenshot.png', to: 'assets/images/screenshot.png' }
            ])
        ],
        devServer: {
            contentBase: distDir,
            compress: false
        },
        devtool: "inline-source-map"
    }

    return config;
}

module.exports = configFunc;