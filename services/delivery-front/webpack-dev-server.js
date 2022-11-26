const express = require('express');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const compiler = webpack(require("./webpack.config.js"));

const app = new WebpackDevServer({
    static: {
        directory: path.join(__dirname, 'dist'),
        publicPath: path.join(__dirname, 'dist'),
    },
    port: process.env.PORT_FRONT || 5000,
    compress: true,
    hot: false,
    client: false,
    historyApiFallback: true, // обязательно для BrowserRouter
}, compiler)

app.startCallback( () => {
  console.log(`App is now running on http://localhost:${process.env.PORT_FRONT || 5000}`);
});