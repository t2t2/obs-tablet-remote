import PanelWrapper from '../panel'

export default {
	components: {
		PanelWrapper
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
