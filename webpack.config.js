const fs = require('fs');
const path = require('path');
const webpack = require('webpack');



// var	style-loader = require('style-loader');
// var	css-loader = require('css-loader');

// const helper = require(__dirname + '/helpers/helper.js');
// const h = new helper();
// var ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = new Promise ((resolve, reject) => {
	let plugins = [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			minChunks: 2,
		}),
	]
	plugins.push(new webpack.optimize.UglifyJsPlugin());

	resolve({
		entry: {
			index: path.resolve(__dirname, 'src/index.js'),
		},
		output: {
			filename: '[name].js',
			publicPath: '/javascripts/',
			path: path.resolve(__dirname, 'public/javascripts/')
		},
		module: {
			loaders: [
				{
					test: /helper\/browser\/helper\.js$/,
					loader: 'exports?helper'
				},
			],
			rules: [
				// {
				// 	test: /\.css$/,
				// 	use: [ 'style-loader', 'css-loader' ]
				// },
				{
					test: /\.(js|jsx)$/,
					// exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['es2015', 'stage-0', 'react'],
							plugins: []
						}
					}
				}
			]
		},
		plugins: plugins,
		devtool: 'cheap-module-eval-source-map',
		watch: true,
		watchOptions: {
			aggregateTimeout: 1000
		},


	});





});


module.exports = config;
