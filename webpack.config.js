const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: [
      './src/index.tsx'
    ],
    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: '[name].[hash].js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
        modules: ['./src', 'node_modules']
    },
    module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            enforce: 'pre',
            loader: ['tslint-loader'],
          },
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: ['babel-loader']
          }
        ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
};
