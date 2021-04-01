var path = require('path');
var glob = require('glob');
const copyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    mode:'development',
  entry: { 'app' : glob.sync('./scripts/**/*.ts*') },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins:[
    new copyWebpackPlugin({
        patterns:[
            {from:'./html'}
        ]
    })
  ]
};