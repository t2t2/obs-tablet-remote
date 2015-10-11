var gulp = require('gulp');

gulp.task('deploy', ['build:production'], function () {
	var config = require('../config'),
		ghPages = require('gulp-gh-pages'),
		open = require('open'),
		os = require('os'),
		package = require('../../package.json'),
		path = require('path')

	var settings = {
		url:     package.homepage,
		src:     path.join(config.root.dest, '/**/*'),
		ghPages: {
			cacheDir: path.join(os.tmpdir(), package.name)
		}
	}

	return gulp.src(settings.src)
		.pipe(ghPages(settings.ghPages))
		.on('end', function () {
			setTimeout(function () {
				open(settings.url)
			}, 1000)
		})
});
