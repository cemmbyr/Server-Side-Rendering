const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const cliPort = 6060;

module.exports = {
  target: 'web',
  entry: './client/client.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'client.js',
    publicPath: `http://localhost:${cliPort}/`,
  },
  devServer: {
    port: cliPort,
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'main.css',
    }),
  ],
};
