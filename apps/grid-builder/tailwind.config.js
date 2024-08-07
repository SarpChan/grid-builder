const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',

  presets: [
    require('../../node_modules/@spartan-ng/ui-core/hlm-tailwind-preset'),
  ],
  content: [
    join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        accent: '#036ac4',
      },
    },
  },
  plugins: [],
};
