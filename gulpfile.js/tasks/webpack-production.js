var gulp = require('gulp')

gulp.task('webpack:production', function (callback) {
	var config = require('../config/webpack')('production'),
		logger = require('../lib/compileLogger'),
		webpack = require('webpack');

	webpack(config, function (err, stats) {
		logger(err, stats)
		callback()
	})
})
