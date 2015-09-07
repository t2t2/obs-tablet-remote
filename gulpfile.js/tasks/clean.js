var gulp = require('gulp');

gulp.task('clean', function (cb) {
	var del = require('del'),
		config = require('../config'),
		htmlConfig = require('../config/html');

	del([
		config.publicAssets,
		htmlConfig.dest,
	], cb);
});
