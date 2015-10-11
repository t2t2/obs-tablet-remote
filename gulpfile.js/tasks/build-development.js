var gulp = require('gulp')

gulp.task('build:development', function (cb) {
	var config = require('../config'),
		getEnabledTasks = require('../lib/getEnabledTasks'),
		gulpSequence = require('gulp-sequence'),
		tasks = getEnabledTasks('development')

	gulpSequence('clean', tasks.assetTasks, tasks.codeTasks, 'rev', cb)
})
