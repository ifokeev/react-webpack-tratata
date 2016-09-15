import DefinePlugin from 'webpack/lib/DefinePlugin';

import { ENV } from './env';

let plugins = [
  new DefinePlugin({
    'ENV': JSON.stringify(ENV)
  })
];

export default {
  plugins
};
