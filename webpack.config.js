const fs = require('fs');
const path = require('path');
const webpack = require('webpack');



const config = new Promise ((resolve, reject) => {
	let plugins = [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common',
			minChunks: 2,
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			Tether: "tether",
			"window.Tether": "tether",
			Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
			Button: "exports-loader?Button!bootstrap/js/dist/button",
			Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
			Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
			Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
			Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
			Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
			Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
			Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
			Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
			Util: "exports-loader?Util!bootstrap/js/dist/util",
		})
	]
	plugins.push(new webpack.optimize.UglifyJsPlugin());

	resolve({
		entry: {
			login: path.resolve(__dirname, 'src/login.js'),
			profile: path.resolve(__dirname, 'src/profile.js'),
			about: path.resolve(__dirname, 'src/about.js'),
			
			blog_list: path.resolve(__dirname, 'src/blog_list.js'),
			blog_detail: path.resolve(__dirname, 'src/blog_detail.js'),
			post_detail: path.resolve(__dirname, 'src/post_detail.js'),

			my_blog_list: path.resolve(__dirname, 'src/my_blog_list.js'),
			my_blog_detail: path.resolve(__dirname, 'src/my_blog_detail.js'),
			my_post_detail: path.resolve(__dirname, 'src/my_post_detail.js'),

			user_list: path.resolve(__dirname, 'src/user_list.js'),
			chat_list: path.resolve(__dirname, 'src/chat_list.js'),
			chat_personal: path.resolve(__dirname, 'src/chat_personal.js'),
			chat_group: path.resolve(__dirname, 'src/chat_group.js'),
		},
		output: {
			filename: '[name].js',
			publicPath: '/javascripts/',
			path: path.resolve(__dirname, 'public/javascripts/')
		},
		module: {
			rules: [
				{ test: /\.css$/, use: ['style-loader', 'css-loader', 'postcss-loader'] },
				{ test: /\.scss$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] },
				{
					test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					use: 'url-loader?limit=10000',
				},
				{
					test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
					use: 'file-loader',
				},
				{ test: /bootstrap-sass\/assets\/javascripts\//, use: 'imports-loader?jQuery=jquery' },
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
