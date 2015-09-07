var gulp = require('gulp');

gulp.task('deploy', ['build:production'], function () {
	var ghPages = require('gulp-gh-pages'),
		open = require('open'),
		config = require('../config/deploy');

	return gulp.src(config.src)
		.pipe(ghPages(config.ghPages))
		.on('end', function () {
			open(config.url);
		})
});
