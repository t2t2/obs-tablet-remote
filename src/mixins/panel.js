import PanelWrapper from '@/components/panel'

export default {
	components: {
		PanelWrapper
	},
	computed: {
		settings() {
			return this.panel.settings || {}
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
		depth: {
			type: Number
		},
		id: {
			type: [Number, String],
			required: true
		},
		panel: {
			type: Object,
			required: true
		}
	}
}
