import Vue from 'vue'

import template from './settings.html'

export default Vue.extend({
	template,

	props: {
		settings: {
			type:   Object,
			twoWay: true,
		}
	}
})