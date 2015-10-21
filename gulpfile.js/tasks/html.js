var config = require('../config')
if (config.tasks.html) {
	var gulp = require('gulp');

	gulp.task('html', function () {
		var browserSync = require('browser-sync'),
			gulpif = require('gulp-if'),
			handleErrors = require('../lib/handleErrors'),
			htmlmin = require('gulp-htmlmin'),
			path = require('path'),
			render = require('gulp-nunjucks-render')

		var exclude = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**')

		var paths = {
			src:  [path.join(config.root.src, config.tasks.html.src, '/**/*.html'), exclude],
			dest: path.join(config.root.dest, config.tasks.html.dest),
		}

		render.nunjucks.configure([path.join(config.root.src, config.tasks.html.src)], {watch: false})

		return gulp.src(paths.src)
			.pipe(render())
			.on('error', handleErrors)
			.pipe(gulpif(process.env.NODE_ENV == 'production', htmlmin(config.tasks.html.htmlmin)))
			.pipe(gulp.dest(paths.dest))
			.pipe(browserSync.get('main').stream())
	})

}
