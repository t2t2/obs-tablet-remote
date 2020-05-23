const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
	purge: [
		'./public/**/*.html',
		'./src/**/*.vue'
	],
	theme: {
		extend: {
			backgroundColor: {
				overlay: 'rgba(0, 0, 0, 0.2)'
			},
			boxShadow: {
				'md-light': lightVariant(defaultTheme.boxShadow.md),
				'lg-light': lightVariant(defaultTheme.boxShadow.lg),
				'xl-light': lightVariant(defaultTheme.boxShadow.xl),
				'2xl-light': lightVariant(defaultTheme.boxShadow['2xl'])
			}
		}
	},
	variants: {},
	plugins: []
}

function lightVariant(value) {
	return value.replace('0, 0, 0', '255, 255, 255')
}
