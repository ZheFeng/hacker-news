const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { NODE_ENV } = process.env;
const IS_PROD = NODE_ENV === 'production';

const entry = {
  app: IS_PROD ? './app' : [
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates


    './app',
    // the entry point of our app
  ],
  vendor: [
    'react',
    'react-dom',
    'rxjs',
    'immutable',
    'redux',
    'bootstrap/dist/css/bootstrap.min.css',
  ],
};
const buildPath = 'static/webpack-build';
const filename = '[name].js';


const webpackConfig = {
  entry,
  output: { path: buildPath, filename },
  module: {
    rules: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.less', '.css'],
  },
  devServer: {
    historyApiFallback: true,
    hot: !IS_PROD,
    contentBase: path.join(__dirname, 'static'),
    compress: true,
    port: 8080,
  },
  devtool: IS_PROD ? false : 'eval',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor', // Specify the common bundle's name.
    }),
  ],
};


if (!IS_PROD) {
  webpackConfig.performance = { hints: false };
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  // enable HMR globally
  webpackConfig.plugins.push(new webpack.NamedModulesPlugin());
  // prints more readable module names in the browser console on HMR updates

  // webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}
if (IS_PROD) {
  webpackConfig.plugins.push(new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }));
  webpackConfig.plugins.push(new UglifyJSPlugin({
    beautify: false,
    mangle: {
      screw_ie8: true,
      keep_fnames: true,
    },
    compress: {
      screw_ie8: true,
    },
    comments: false,
  }));
}

module.exports = webpackConfig;
