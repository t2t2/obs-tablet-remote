import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

const state = {
	nextId: 1,
	panels: {},
	tabs: []
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
