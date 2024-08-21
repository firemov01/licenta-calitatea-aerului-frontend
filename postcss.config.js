/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-extraneous-dependencies */

import postcssPresetEnv from 'postcss-preset-env';
import purgecss from '@fullhuman/postcss-purgecss';

const PRODUCTION = process.env.NODE_ENV === 'production';

const plugins = [
  postcssPresetEnv({
    stage: 3,
    features: {
      'trigonometric-functions': true,
      'logical-properties-and-values': false,
      'opacity-percentage': true,
      'text-decoration-shorthand': true,
    },
  }),
];

// only add purgecss in production
// running in development will require restarting dev server when adding classes
// that had been purged when server started because they weren't used
if (PRODUCTION) {
  plugins.push(
    purgecss({
      content: ['./**/*.html', './src/**/*.tsx', './src/**/*.ts'],
    })
  );
}

export default {
  plugins,
};
