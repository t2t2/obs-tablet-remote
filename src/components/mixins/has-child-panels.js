export default {
	beforeCreate: function () {
		this.$options.components.Panel = require('../panels/index').default
	},
	computed: {
		childPanels() {
			return this.$store.getters['layout/getPanelsFor'](this.id)
		}
	}
}
