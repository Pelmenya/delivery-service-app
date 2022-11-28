const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const compiler = webpack(require("./webpack.config.js"));

const app = new WebpackDevServer({
    port: process.env.PORT_FRONT || 5000,
    historyApiFallback: true, // обязательно для BrowserRouter
}, compiler)

app.startCallback( () => {
  console.log(`App is now running on http://localhost:${process.env.PORT_FRONT || 5000}`);
});