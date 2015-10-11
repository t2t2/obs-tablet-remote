var config = require('../config')
if (config.tasks.js) {
	var gulp = require('gulp')

	gulp.task('webpack:watch', function (callback) {
		var browserSync = require('browser-sync'),
			initialCompile = false,
			logger = require('../lib/compileLogger'),
			webpack = require('webpack'),
			webpackConfig = require('../lib/webpackMultiConfig')

		webpack(webpackConfig('development')).watch(200, function (err, stats) {
			logger(err, stats)
			browserSync.reload()
			// On the initial compile, let gulp know the task is done
			if (!initialCompile) {
				initialCompile = true
				callback()
			}
		})
	})

}