const path = require('path')

module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		'plugin:vue/recommended',
		'./node_modules/xo/config/plugins.js'
	],
	rules: {
		/*
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
		*/
		"vue/html-indent": ['error', 'tab'],
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	settings: {
		'import/resolver': {
			webpack: {
				config: path.resolve('./node_modules/@vue/cli-service/webpack.config.js')
			}
		}
	}
}
