var gulp = require('gulp');

gulp.task('sass', function () {
	var browserSync = require('browser-sync'),
		sass = require('gulp-sass'),
		sourcemaps = require('gulp-sourcemaps'),
		handleErrors = require('../lib/handleErrors'),
		config = require('../config/sass'),
		autoprefixer = require('gulp-autoprefixer');

	return gulp.src(config.src)
		.pipe(sourcemaps.init())
		.pipe(sass(config.settings))
		.on('error', handleErrors)
		.pipe(sourcemaps.write())
		.pipe(autoprefixer(config.autoprefixer))
		.pipe(gulp.dest(config.dest))
		.pipe(browserSync.reload({stream: true}));
});
