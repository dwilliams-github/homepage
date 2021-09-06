const path = require('path');

module.exports = {
    watch: true,
    target: 'electron-renderer',
    entry: './src/index.jsx',
    mode: 'development',
    devtool: 'inline-source-map',

    output: {
        path: path.resolve(__dirname, '..', 'electron'),
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]?[hash]'
                    }
                }]
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.json', '.jsx']
    },
}