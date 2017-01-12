const webpack = require('webpack');
const path = require('path');

const NODE_ENV = process.env.NODE_ENV;
const entry = {
  app: [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates


    './app'
    // the entry point of our app
  ],
  // vendor: ['react', 'react-dom'],
}
const buildPath = 'static/webpack-build'
const filename = '[name].js';



const webpackConfig = {
  entry, output: { path: buildPath, filename },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css'],
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "static"),
    compress: true,
    port: 8080
  },
  devtool: "eval",

  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //     name: 'vendor' // Specify the common bundle's name.
    // }),

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
  performance: { hints: NODE_ENV === 'production' }
}

module.exports = webpackConfig;
