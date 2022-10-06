const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  target: 'node',
  entry: './server/server.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js',
  },
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};
