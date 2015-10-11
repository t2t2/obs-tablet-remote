var gulp = require('gulp');

// 2) Update asset references with reved filenames in compiled css + js
gulp.task('rev-update-references', function () {
	var config = require('../../config'),
		path = require('path'),
		revReplace = require('gulp-rev-replace');

	var manifest = gulp.src(config.publicDirectory + "/rev-manifest.json");

	return gulp.src(path.join(config.root.dest, '/**/**.{css,js}'))
		.pipe(revReplace({manifest: manifest}))
		.pipe(gulp.dest(config.root.dest))
});
