const path = require('path');
require('babel-register');

module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['react', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'prettier/prettier': ['error'],
    'space-in-parens': [0, 'always'],
    'object-curly-spacing': [2, 'always'],
    'computed-property-spacing': [2, 'always'],
    'import/no-named-as-default': 0,
    'import/prefer-default-export': 0,
    'import/order': 0,
    'computed-property-spacing': [2, 'never'],
    'no-multiple-empty-lines': [
      2,
      {
        max: 1,
        maxEOF: 0,
        maxBOF: 0,
      },
    ],
    quotes: [1, 'single', 'avoid-escape'],
    'no-use-before-define': [
      2,
      {
        functions: false,
      },
    ],
    semi: [0, 'never'],
    'prefer-const': 1,
    'react/prefer-es6-class': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-indent': [2],
    'react/prop-types': [1],
    'react/no-array-index-key': [1],
    'class-methods-use-this': [1],
    'no-undef': [1],
    'no-case-declarations': [1],
    'no-return-assign': [1],
    'no-param-reassign': [1],
    'no-shadow': [0],
    camelcase: [0],
    'no-underscore-dangle': [0, 'always'],
    'react/jsx-wrap-multilines': [2, { declaration: false, assignment: false }],
  },
  env: {
    browser: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      alias: [
        ['@components', path.resolve(__dirname, 'src', 'components')],
        ['@containers', path.resolve(__dirname, 'src', 'containers')],
        ['@pages', path.resolve(__dirname, 'src', 'pages')],
        ['@themes', path.resolve(__dirname, 'src', 'themes')],
        ['@sagas', path.resolve(__dirname, 'src', 'sagas')],
        ['@utils', path.resolve(__dirname, 'src', 'utils')],
        ['@apis', path.resolve(__dirname, 'src', 'apis')],
      ],
    },
  },
};
