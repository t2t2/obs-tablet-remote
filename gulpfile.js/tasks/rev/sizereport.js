var gulp = require('gulp');

// 6) Report sizes
gulp.task('size-report', function () {
	var config = require('../../config'),
		repeatString = require('../../lib/repeatString'),
		sizereport = require('gulp-sizereport');

	var hashedFiles = '/**/*-' + repeatString('[a-z,0-9]', 8) + '*.*';

	return gulp.src([config.publicAssets + hashedFiles, '*!rev-manifest.json'])
		.pipe(sizereport({
			gzip: true
		}));
});
