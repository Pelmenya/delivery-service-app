const express = require('express');
const path = require('path');
const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");



const compiler = webpack(require("./webpack.config.js"));

const app = new WebpackDevServer({
    static: {
        directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    hot: true,
    historyApiFallback: true, // обязательно для BrouserRouter

}, compiler)

app.startCallback( () => {
  console.log(`App is now running on http://localhost:${8080}`);
});