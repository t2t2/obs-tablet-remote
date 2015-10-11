var gulp = require('gulp')

gulp.task('build:production', function (cb) {
	var config = require('../config'),
		getEnabledTasks = require('../lib/getEnabledTasks'),
		gulpSequence = require('gulp-sequence'),
		tasks = getEnabledTasks('production')

	gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'rev', cb)
})
