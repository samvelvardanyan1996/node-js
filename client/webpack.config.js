const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
  mode: "development",
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' },
        ],
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, './public'),
    compress: true,
    port: 9000,
  },
  output: {
    path: path.resolve(__dirname, './public'),
    filename: './main.js',
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
};