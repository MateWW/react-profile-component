const merge = require('webpack-merge');

const configBase = require('./webpack.config');

module.exports = merge(configBase,{
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true,
        proxy: {
            '/api': {
                target: 'http://localhost:8081',
                pathRewrite: {'^/api' : ''}
            }
        },
    }
});
