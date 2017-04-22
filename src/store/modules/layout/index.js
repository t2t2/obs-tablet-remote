import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

const state = {
	nextId: 4,
	panels: {
		1: {
			type: 'Grid',
			parent: null,
			settings: {}
		},
		2: {
			type: 'Scenes',
			parent: 1,
			settings: {}
		},
		3: {
			type: 'Invalid',
			parent: 1,
			settings: {}
		}
	},
	tabs: [
		{
			id: 1,
			name: 'Home',
			root: 1
		}
	]
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
