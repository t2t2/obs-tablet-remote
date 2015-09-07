var gulp = require('gulp');

gulp.task('html', function () {
	var browserSync = require('browser-sync'),
		config = require('../config/html'),
		render = require('gulp-nunjucks-render'),
		gulpif = require('gulp-if'),
		htmlmin = require('gulp-htmlmin'),
		handleErrors = require('../lib/handleErrors');

	render.nunjucks.configure(config.nunjucks, {watch: false});
	return gulp.src(config.src)
		.pipe(render())
		.on('error', handleErrors)
		.pipe(gulpif(process.env.NODE_ENV == 'production', htmlmin(config.htmlmin)))
		.pipe(gulp.dest(config.dest))
		.pipe(browserSync.reload({
			stream: true
		}));
});
