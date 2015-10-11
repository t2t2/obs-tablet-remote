var path = require('path'),
	fs = require('fs')

module.exports = function (publicPath, dest, filename) {
	filename = filename || 'rev-manifest.json'

	return function () {
		this.plugin("done", function (stats) {
			var chunks = stats.toJson().assetsByChunkName,
				manifest = {}

			for (var key in chunks) {
				if(chunks.hasOwnProperty(key)) {
					var originalFilename = key + '.js'
					manifest[path.join(publicPath, originalFilename)] = path.join(publicPath, chunks[key])
				}
			}

			fs.writeFileSync(
				path.join(process.cwd(), dest, filename),
				JSON.stringify(manifest)
			)
		})
	}
}
