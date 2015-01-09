var path = require('path');
var webpack = require('webpack');
var ngminPlugin = require('ngmin-webpack-plugin');


module.exports = {
  entry: "./src/angular-time-pick.js",
  output: {
    path: './build',
    filename: 'angular-time-pick.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: '6to5-loader' }
    ]
  }
};
