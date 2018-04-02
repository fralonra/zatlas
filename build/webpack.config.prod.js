const webpack = require("webpack");
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpackBaseConfig = require('./webpack.config.base.js');

const config = require('config');
module.exports = merge(webpackBaseConfig, {
  optimization: {
    splitChunks: {
    	chunks: 'all',
    	minSize: 30000,
    	minChunks: 1,
    	maxAsyncRequests: 5,
    	maxInitialRequests: 3,
    	name: true,
    	cacheGroups: {
    		default: {
    			minChunks: 2,
    			priority: -20,
    			reuseExistingChunk: true
    		},
    		vendors: {
    			test: /[\\/]node_modules[\\/]/,
    			priority: -10
    		}
    	}
    }
  },
  plugins: [
    // new CleanWebpackPlugin([config.dirDes], {
    //   root: config.dirRoot
    // }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: true
    })
  ]
});
