var gulp = require('gulp');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function () {
	var config = require('../../config'),
		rev = require('gulp-rev'),
		revNapkin = require('gulp-rev-napkin');

	// Ignore what we dont want to hash in this step
	var notThese = '!' + config.publicDirectory + '/**/*+(css|js|json|html)'

	return gulp.src([config.publicDirectory + '/**/*', notThese])
		.pipe(rev())
		.pipe(gulp.dest(config.publicDirectory))
		.pipe(revNapkin({verbose: false}))
		.pipe(rev.manifest('public/rev-manifest.json', {merge: true}))
		.pipe(gulp.dest(''));
});
