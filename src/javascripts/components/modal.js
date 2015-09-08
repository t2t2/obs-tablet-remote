import Vue from 'vue'

import template from './modal.html'

export default Vue.extend({
	template,

	props: {
		modalClass: {},
		show:  {
			default: true,
		}
	}
})