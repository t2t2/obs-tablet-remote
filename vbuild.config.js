const path = require('path')

module.exports = () => ({
	entry: 'src/app.js',
	host: '0.0.0.0',
	babel: {
		babelrc: false,
		cacheDirectory: true,
		presets: ['vue-app']
	},
	html: {
		template: './src/index.html'
	},
	postcss: [
		// add more postcss plugins here
		// by default we have autoprefixer pre added
		require('postcss-flexbugs-fixes')
	],
	webpack(config) {
		config.resolve.modules.push(path.resolve('src'))

		return config
	}
})
