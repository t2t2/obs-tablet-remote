import Vue from 'vue'

import template from './switcher.html'

export default Vue.extend({
	template,

	data: function () {
		return {
			scenes:       [],
			currentScene: undefined,
		}
	},

	props: {
		connectionReady: {},
	},

	watch: {
		connectionReady: function (state) {
			if(state) {

			} else {
				this.scenes = []
				this.currentScene = undefined
			}
		}
	}
})