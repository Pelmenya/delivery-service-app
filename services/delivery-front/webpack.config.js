const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const app = path.join(__dirname, 'src', 'index.tsx')

module.exports = {
    mode: 'development',
    devtool: 'source-map', // generate source map
    entry: [
        `${path.join(__dirname, 'src', 'index.tsx')}`
    ],
    watchOptions: { // без этого не успевает в Docker Hot Module Reload!!!
        aggregateTimeout: 300,
        poll: 1000
    },
    target: 'web',
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js',
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[fullhash].js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                path: path.resolve(__dirname, './postcss.config.js'),
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name][ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name][ext]',
                },
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        // Нужно для React, уже включает в себя HMR
        new ReactRefreshWebpackPlugin(), 
        new EnvironmentPlugin([
            'BACK_URL'
        ]),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: '**/*',
                    context: path.resolve(__dirname, 'static', 'assets'),
                    to: '.',
                },
            ],
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'static', 'index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: 'css/style.[fullhash].css',
        }),
        
    ],
};