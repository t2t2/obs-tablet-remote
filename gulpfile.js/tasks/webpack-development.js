var gulp = require('gulp')

gulp.task('webpack:development', function (callback) {
	var config = require('../config/webpack')('development'),
		logger = require('../lib/compileLogger'),
		webpack = require('webpack'),
		browserSync = require('browser-sync'),
		built = false;

	if (global.watch) {
		webpack(config).watch(200, function (err, stats) {
			logger(err, stats)
			browserSync.reload()
			// On the initial compile, let gulp know the task is done
			if (!built) {
				built = true;
				callback()
			}
		})
	} else {
		webpack(config, function (err, stats) {
			logger(err, stats)
			callback()
		})
	}
})
