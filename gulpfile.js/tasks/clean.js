var gulp = require('gulp')

gulp.task('clean', function (cb) {
	var del = require('del'),
		config = require('../config'),
		path = require('path')

	var files = [path.join(config.root.dest, 'rev-manifest.json')]

	for (var key in config.tasks) {
		if (config.tasks.hasOwnProperty(key)) {
			var task = config.tasks[key]
			var filePattern = path.join(config.root.dest, task.dest, '**/*.{' + task.extensions.join(',') + ',map}')
			files.push(filePattern)
		}
	}

	// Don't touch node_modules or source files!
	files.push('!node_modules/**/*')
	files.push('!' + path.join(config.root.src, '/**/*'))

	del(files).then(function () {
		cb()
	})
})
