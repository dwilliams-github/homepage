const resolve = require('path').resolve;

const config = {
    entry: resolve(__dirname, 'src') + '/index.jsx',
    output: {
        path: resolve('../backend/public/js/'),
        chunkFilename: "[id].js",
        filename: 'bundle.js',
        publicPath: 'public/js/'
    },
    resolve: {
        extensions: ['.js','.jsx','.css']
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
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            },
            {
                test: /\.(txt|md)$/i,
                use: 'raw-loader'
            }
        ]
    }
};

module.exports = config;
