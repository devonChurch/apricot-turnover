var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    context: __dirname + '/src/js',
    devtool: 'source-map',
    entry: './entry.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    plugins: [
        new CopyWebpackPlugin([
            { from:  '../index.html', to: 'index.html' }
        ])
    ],
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel!eslint'} // Automatically generates source maps without the sourceMaps config
        ]
    },
    eslint: {
        failOnWarning: false,
        failOnError: false
    }
};
