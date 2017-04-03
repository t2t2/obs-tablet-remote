import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

const state = {
	panels: {
		1: {
			type: 'GridX',
			parent: null
		},
		2: {
			type: 'Scenes',
			parent: 1
		},
		3: {
			type: 'Invalid',
			parent: 1
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
