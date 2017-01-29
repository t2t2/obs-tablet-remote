import defaultsDeep from 'lodash/defaultsDeep'
import store from '../storage'

function defaultSettings() {
	return {
		sources: {
			enabled: false
		},
		switcher: {
			enabled: true,
			perRow: 4,
			transitionScene: "",
			transitionSeconds: 0.5
		}
	}
}

export default {
	beforeCreate() {
		this.$store = store
	},
	data() {
		const settings = defaultsDeep({}, this.$store('settings'), defaultSettings())

		return {
			settings
		}
	},
	watch: {
		settings: {
			deep: true,
			handler(newValue) {
				this.$store('settings', newValue)
			}
		}
	}
}

