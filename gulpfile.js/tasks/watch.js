var gulp = require('gulp')

gulp.task('watch', ['browserSync'], function () {
	var config = require('../config'),
		path = require('path'),
		watch = require('gulp-watch')

	var watchableTasks = ['fonts', 'iconFont', 'images', 'svgSprite', 'html', 'css']

	watchableTasks.forEach(function (taskName) {
		var task = config.tasks[taskName]
		if (task) {
			var filePattern = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}')
			watch(filePattern, function () {
				gulp.start(taskName)
			})
		}
	})
})
