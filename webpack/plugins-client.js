import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import CommonsChunkPlugin from 'webpack/lib/optimize/CommonsChunkPlugin';
import DedupePlugin from 'webpack/lib/optimize/DedupePlugin';
import OccurrenceOrderPlugin from 'webpack/lib/optimize/OccurrenceOrderPlugin';
import DefinePlugin from 'webpack/lib/DefinePlugin';
import NoErrorsPlugin from 'webpack/lib/NoErrorsPlugin';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import UglifyJsPlugin from 'webpack/lib/optimize/UglifyJsPlugin';

import { extractAppCSS } from './sass-loader';
import { extractComponentsCSS } from './css-loader';

import { ENV } from './env';

let plugins = [
  new NoErrorsPlugin,
  new HtmlWebpackPlugin({
    template: './src/index.ejs',
    inject: 'body',
    favicon: './static/favicon.ico',
    minify: {
      collapseWhitespace: true
    }
  }),
  new LodashModuleReplacementPlugin,
  new DefinePlugin({
    'ENV': JSON.stringify(ENV)
  }),
  extractAppCSS,
  extractComponentsCSS,
  new DedupePlugin,
  new CommonsChunkPlugin("commons.chunk.[hash].js"),
  new OccurrenceOrderPlugin
];

if (ENV === 'production') {
  plugins.push(new UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }));
}

export default {
  plugins
};
