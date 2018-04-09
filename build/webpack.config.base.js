const path = require('path');

const config = require('config');

module.exports = {
  output: {
    path: config.dirDes,
    publicPath: 'public',
    filename: 'main.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: { cacheDirectory: true }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  },
  resolve: {
    alias: {
      'ROOT': path.resolve(__dirname, '..'),
      'APP': path.resolve(__dirname, '../app'),
      'NODE': path.resolve(__dirname, '../node_modules')
    }
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
