var gulp = require('gulp');

gulp.task('browserSync', function () {
	var browserSync = require('browser-sync'),
		config = require('../config/browserSync');

	return browserSync(config);
});
