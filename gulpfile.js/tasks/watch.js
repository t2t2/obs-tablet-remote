var gulp = require('gulp');

gulp.task('watch', ['browserSync'], function () {
	var html = require('../config/html'),
		sass = require('../config/sass'),
		watch = require('gulp-watch');

	watch(sass.src, function () {
		gulp.start('sass');
	});
	watch(html.watch, function () {
		gulp.start('html');
	});
});
