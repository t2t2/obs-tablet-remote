var gulp = require('gulp');

// 1) Add md5 hashes to assets referenced by CSS and JS files
gulp.task('rev-assets', function () {
	var config = require('../../config'),
		path = require('path'),
		rev = require('gulp-rev'),
		revNapkin = require('gulp-rev-napkin');

	// Ignore what we dont want to hash in this step
	var ignoreThese = '!' + path.join(config.root.dest,'/**/*+(css|js|json|html)')

	return gulp.src([path.join(config.root.dest,'/**/*'), ignoreThese])
		.pipe(rev())
		.pipe(gulp.dest(config.root.dest))
		.pipe(revNapkin({verbose: false}))
		.pipe(rev.manifest(path.join(config.root.dest, 'rev-manifest.json'), {merge: true}))
		.pipe(gulp.dest(''));
});
