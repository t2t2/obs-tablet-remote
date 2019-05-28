const path = require('path')
const {buildConfig, preprocess} = require('xo/lib/options-manager')

const xoConfig = buildConfig(preprocess({
	semicolon: false,
	extends: [
		'plugin:vue/recommended'
	],
	rules: {
		// 'object-curly-spacing': ['error', 'always'],
		'valid-jsdoc': 0,
		'vue/html-indent': ['error', 'tab']
	},
	settings: {
		'import/resolver': {
			webpack: {
				config: path.resolve('./node_modules/@vue/cli-service/webpack.config.js')
			}
		}
	}
}))

module.exports = {
	root: true,
	...xoConfig.baseConfig,
	rules: xoConfig.rules
}
