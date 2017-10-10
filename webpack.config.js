const sw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: sw.lib.entries,
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      },
    ],
  },
};
