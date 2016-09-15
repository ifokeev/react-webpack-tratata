import path from 'path';

import webpack from 'webpack';
import merge from 'webpack-merge';

import babelRuntime from './webpack/babel-runtime';
import jsonLoader from './webpack/json-loader';
import cssLoader from './webpack/css-loader';
import sassLoader from './webpack/sass-loader';
import jsxLoader from './webpack/jsx-loader';
import fileLoader from './webpack/file-loader';

import postcss from './webpack/postcss';

import pluginsClient from './webpack/plugins-client';

import devServer from './webpack/dev-server';

import alias from './webpack/utils/alias';
import chunk from './webpack/utils/chunk';

import { ENV } from './webpack/env';

let config = {
  root: path.resolve(__dirname),
  entry: {
    client: ['./src/client']
  },
  output: {
    path: './build/client',
    publicPath: '/',
    filename: '[name].bundle.[hash].js',
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: [
      'node_modules'
    ]
  },
  devtool: ENV === 'production' ? '#source-map' : '#inline-source-map'
};

config = merge(babelRuntime, config);

config = merge(config, devServer);

config = merge(config, jsonLoader);
config = merge(config, cssLoader);
config = merge(config, sassLoader);
config = merge(config, jsxLoader);
config = merge(config, fileLoader);

config = merge(config, postcss);

config = merge(config, pluginsClient);

export default config;
