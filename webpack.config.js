var path = require('path');
var webpack = require('webpack');
var ngminPlugin = require('ngmin-webpack-plugin');

var version = require('./package.json').version;


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
  },
  plugins: [
    new webpack.BannerPlugin("\
bs-time-pick\n\
author: Bret Little\n\
copyright: 2015\n\
license: MIT\n\
version: " + version)
  ]
};
