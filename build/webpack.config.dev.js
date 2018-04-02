const webpack = require("webpack");
const merge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base.js');

const config = require('config');

module.exports = merge(webpackBaseConfig, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: config.dirDes,
    compress: true,
    hot: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
});
