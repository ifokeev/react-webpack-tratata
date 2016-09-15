import path from 'path';
import fs from 'fs';

import webpack from 'webpack';
import merge from 'webpack-merge';

import jsonLoader from './webpack/json-loader';
import cssLoader from './webpack/css-loader';
import sassLoader from './webpack/sass-loader';
import jsxLoader from './webpack/jsx-loader';
import fileLoader from './webpack/file-loader';

import postcss from './webpack/postcss';

import pluginsServer from './webpack/plugins-server';

import { ENV } from './webpack/env';

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

let config = {
  root: path.resolve(__dirname),
  entry: {
    client: ['./src/server']
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    path: './build/server',
    publicPath: '/',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js'],
  },
  externals: nodeModules,
  devtool: '#source-map'
};

config = merge(config, jsonLoader);
config = merge(config, cssLoader);
config = merge(config, sassLoader);
config = merge(config, jsxLoader);
config = merge(config, fileLoader);

config = merge(config, pluginsServer);

export default config;
