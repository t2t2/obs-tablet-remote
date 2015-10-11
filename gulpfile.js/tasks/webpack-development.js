var config = require('../config')
if (config.tasks.js) {
	var gulp = require('gulp')

	gulp.task('webpack:development', function (callback) {
		var logger = require('../lib/compileLogger'),
			webpack = require('webpack'),
			webpackConfig = require('../lib/webpackMultiConfig')

		webpack(webpackConfig('development'), function (err, stats) {
			logger(err, stats)
			callback()
		})
	})
}
