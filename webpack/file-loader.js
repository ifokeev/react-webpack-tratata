import path from 'path';

const loaders = {
  module: {
    loaders: [{
      test: /\.(jpe?g|gif|png|svg|mp4|webm|ttf|eot|woff2?)(\?(.*))?$/,
      loader: 'file',
      query: {
        name: '[path][name].[ext]',
        context: 'static'
      }
    }]
  }
};

export default loaders;
