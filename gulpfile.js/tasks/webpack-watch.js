var config = require('../config')
if (config.tasks.js) {
	var BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
		gulp = require('gulp'),
		path = require('path')

	// Made outside to allow others hook into earlier
	var browserSync = new BrowserSyncPlugin({
		server: {
			baseDir:    path.resolve(config.root.dest, config.tasks.html.dest),
			middleware: [],
		},
	}, {
		name: 'main',
		reload: false,
	})

	gulp.task('webpack:watch', function (callback) {
		var initialCompile = false,
			logger = require('../lib/compileLogger'),
			webpack = require('webpack'),
			webpackConfig = require('../lib/webpackMultiConfig')('development')

		// Set up browsersync
		var	webpackDevMiddleware = require('webpack-dev-middleware'),
			webpackHotMiddleware = require('webpack-hot-middleware')

		Object.keys(webpackConfig.entry).map(function (bundle) {
			webpackConfig.entry[bundle].unshift('webpack-hot-middleware/client')
		})

		webpackConfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin(true))
		webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
		webpackConfig.plugins.push(browserSync)

		var bundler = webpack(webpackConfig)

		// add webpack middleware to browsersync
		browserSync.browserSyncOptions.server.middleware.push(
			webpackDevMiddleware(bundler, {
				// IMPORTANT: dev middleware can't access config, so we should
				// provide publicPath by ourselves
				publicPath: '/' + webpackConfig.output.publicPath,

				noInfo: true,
			}),

			// bundler should be the same as above
			webpackHotMiddleware(bundler)
		)

		bundler.watch(200, function (err, stats) {
			logger(err, stats)
			// On the initial compile, let gulp know the task is done
			if (!initialCompile) {
				initialCompile = true
				callback()
			}
		})
	})

}