var gulp = require('gulp');

// 5) Update asset references in HTML
gulp.task('update-html', function () {
	var config = require('../../config'),
		path = require('path'),
		revReplace = require('gulp-rev-replace')

	var manifest = gulp.src(config.publicDirectory + "/rev-manifest.json");


	return gulp.src(path.join(config.root.dest, '/**/*.html'))
		.pipe(revReplace({manifest: manifest}))
		.pipe(gulp.dest(config.root.dest))
});
