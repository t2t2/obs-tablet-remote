var gulp = require('gulp');

gulp.task('default', function (cb) {
	var gulpSequence = require('gulp-sequence'),
		getEnabledTasks = require('../lib/getEnabledTasks')

	var tasks = getEnabledTasks('watch')

	gulpSequence('clean',
		tasks.assetTasks.length ? tasks.assetTasks : 'noop',
		tasks.codeTasks.length ? tasks.codeTasks : 'noop',
		'watch', cb
	)
});

gulp.task('noop', function (cb) {
	cb()
})