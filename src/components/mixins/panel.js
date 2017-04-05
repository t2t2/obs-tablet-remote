import PanelWrapper from '../panel'

export default {
	components: {
		PanelWrapper
	},
	computed: {
		settings() {
			return this.panel.settings || {};
		}
	},
	methods: {
		setSetting(key, value) {
			this.$store.dispatch('layout/setSetting', {
				id: this.id,
				key,
				value
			})
		}
	},
	props: {
		id: {
			type: [Number, String],
			required: true
		},
		panel: {
			type: Object,
			required: true
		},
		root: {
			type: Boolean
		}
	}
}
