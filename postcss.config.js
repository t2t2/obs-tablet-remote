module.exports = {
	plugins: [
		require('postcss-preset-env')({stage: 1}),
		require('tailwindcss')('./tailwind.config.js'),
		require('autoprefixer')(),
		require('postcss-flexbugs-fixes'),
		require('postcss-calc'),
		require('postcss-input-range')
	]
}
