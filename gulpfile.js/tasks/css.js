var config = require('../config')
if (config.tasks.css) {
	var gulp = require('gulp');

	gulp.task('css', function () {
		var autoprefixer = require('gulp-autoprefixer'),
			browserSync = require('browser-sync'),
			handleErrors = require('../lib/handleErrors'),
			path = require('path'),
			sass = require('gulp-sass'),
			sourcemaps = require('gulp-sourcemaps')

		var paths = {
			src:  path.join(config.root.src, config.tasks.css.src, '/**/*.{' + config.tasks.css.extensions + '}'),
			dest: path.join(config.root.dest, config.tasks.css.dest)
		}

		return gulp.src(paths.src)
			.pipe(sourcemaps.init())
			.pipe(sass(config.tasks.css.sass))
			.on('error', handleErrors)
			.pipe(autoprefixer(config.tasks.css.autoprefixer))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(paths.dest))
			.pipe(browserSync.get('main').stream())
	});

}
