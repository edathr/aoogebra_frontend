const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra');

const path = require('path');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#87b1fd',
      '@layout-body-background': '#ffffff',
      '@text-color': '#2e3962',
      '@heading-color': '#2e3962',
      '@font-family': 'Montserrat',
    },
  }),
  addWebpackAlias({
    '@components': path.resolve(__dirname, 'src', 'components'),
    '@containers': path.resolve(__dirname, 'src', 'containers'),
    '@pages': path.resolve(__dirname, 'src', 'pages'),
    '@themes': path.resolve(__dirname, 'src', 'themes'),
    '@sagas': path.resolve(__dirname, 'src', 'sagas'),
    '@utils': path.resolve(__dirname, 'src', 'utils'),
    '@apis': path.resolve(__dirname, 'src', 'apis'),
  }),
);
