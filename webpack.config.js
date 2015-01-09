var path = require('path');
var webpack = require('webpack');
var ngminPlugin = require('ngmin-webpack-plugin');


module.exports = {
  entry: "./src/bs-time-pick.js",
  output: {
    path: './build',
    filename: 'bs-time-pick.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: '6to5-loader' }
    ]
  }
};
