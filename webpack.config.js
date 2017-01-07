const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'app');
const CSS_DIR = path.resolve(__dirname, 'assets/css');


const config = {
    entry: [
        APP_DIR+'/index.jsx',
    ],
    output: {
        path: BUILD_DIR,
        filename: '/bundle.js'
    },
    module : {
        loaders: [
            {
                test: /\.jsx?$/,
                include: APP_DIR,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.scss$/,
                include: CSS_DIR,
                exclude: /node_modules/,
                loader: 'style!css!sass'
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
                loader: 'url-loader?limit=100000',
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss', '.css']
    },
    devtool: "cheap-module-eval-source-map",
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			output: {
				comments: false
			}
		})
	]
}

module.exports = config;
