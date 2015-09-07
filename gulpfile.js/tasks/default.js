var gulp = require('gulp');

gulp.task('default', function (cb) {
	var gulpSequence = require('gulp-sequence');

	global.watch = true
	gulpSequence('build:development', ['watch', 'browserSync'], cb)
});
