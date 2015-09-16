import Vue from 'vue'

import template from './panels.html'

import switcher from './switcher'

export default Vue.extend({
	template,

	components: {
		switcher,
	},

	props: {
		connectionReady: {},
		settings: {
			type: Object,
		},
	},
})