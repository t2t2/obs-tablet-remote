module.exports = () => ({
	entry: ['src/app.js', 'src/stylesheets/app.scss'],
	html: {
		template: './src/index.html'
	},
	postcss: [
		// Add more postcss plugins here
		// by default we have autoprefixer pre added
		require('postcss-flexbugs-fixes')
	]
})
