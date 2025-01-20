const path = require('path');

const config = {
    entry: path.resolve(__dirname, 'src') + '/index.jsx',
    output: {
        path: path.resolve(__dirname,'../backend/public/js/'),
        chunkFilename: "[id].js",
        filename: 'bundle.js',
        publicPath: 'public/js/'
    },
    resolve: {
        extensions: [".js",".jsx",".md",".css"],
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
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
                test: /\.(png|jp(e*)g|svg)$/,  
                type: 'asset/resource',
            },
            {
                test: /\.(txt|md)$/i,
                use: 'raw-loader'
            }
        ]
    }
};

module.exports = config;
