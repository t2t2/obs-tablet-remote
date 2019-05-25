export default {
	beforeCreate() {
		this.$options.components.Panel = require('@/components/panels').default
	},
	computed: {
		childPanels() {
			return this.$store.getters['layout/getPanelsFor'](this.id)
		}
	}
}
