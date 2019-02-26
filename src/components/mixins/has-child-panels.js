export default {
	beforeCreate() {
		this.$options.components.Panel = require('../panels').default
	},
	computed: {
		childPanels() {
			return this.$store.getters['layout/getPanelsFor'](this.id)
		}
	}
}
