var config = require('../config')
if (config.tasks.js) {

	var path = require('path'),
		webpack = require('webpack'),
		webpackManifest = require('./webpackManifest')

	module.exports = function (env) {
		var jsSrc = path.resolve(config.root.src, config.tasks.js.src),
			jsDest = path.resolve(config.root.dest, config.tasks.js.dest),
			publicPath = path.join(config.tasks.js.dest, '/').replace('\\', '/'),
			filenamePattern = env === 'production' ? '[name]-[hash].js' : '[name].js',
			extensions = config.tasks.js.extensions.map(function (extension) {
				return '.' + extension
			})

		var babelLoader = 'babel-loader?optional[]=runtime&stage=1',
			vue = require('vue-loader')

		var webpackConfig = {
			context: jsSrc,
			plugins: [],
			resolve: {
				extensions: [''].concat(extensions)
			},
			module:  {
				loaders: [
					{
						test:    /\.js$/,
						loader:  babelLoader,
						exclude: /node_modules/
					},
					{
						test:    /\.html$/,
						loader:  'html',
						exclude: /node_modules/,
					},
					{
						test:   /\.vue$/,
						loader: vue.withLoaders({
							js: babelLoader,
						})
					}
				]
			}
		}

		if (env !== 'test') {
			// Karma doesn't need entry points or output settings
			webpackConfig.entry = config.tasks.js.entries

			webpackConfig.output = {
				path:       path.normalize(jsDest),
				filename:   filenamePattern,
				publicPath: publicPath
			}
		}

		if (env === 'development') {
			webpackConfig.devtool = 'source-map'
			webpack.debug = true
		}

		if (env === 'production') {
			webpackConfig.plugins.push(
				new webpackManifest(publicPath, config.root.dest),
				new webpack.DefinePlugin({
					'process.env': {
						'NODE_ENV': JSON.stringify('production')
					}
				}),
				new webpack.optimize.DedupePlugin(),
				new webpack.optimize.UglifyJsPlugin(),
				new webpack.NoErrorsPlugin()
			)
		}

		return webpackConfig
	}

}
