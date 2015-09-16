import Vue from 'vue'

import template from './modal.html'

export default Vue.extend({
	template,

	methods: {
		overlayClick: function (e) {
			// Only call for clicks on the overlay but not contents
			if(e.target == this.$$.overlay) {
				if(this.onOverlayClick) {
					this.onOverlayClick(e)
				}
			}
		},
	},

	props: {
		modalClass: {},
		onOverlayClick: {},
		show:  {
			default: true,
		}
	}
})