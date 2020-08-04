import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

const panelsDefault = {
	1: {
		type: 'Grid',
		name: 'Horizontal Splitter',
		parent: null,
		settings: {direction: 'row'}
	},
	2: {
		type: 'Scenes',
		name: 'Scenes Switcher',
		parent: 1,
		settings: {
			perRow: 4,
			onlyCurrent: false
		}
	}
}

const tabsDefault = [
	{
		id: 1,
		name: 'Home',
		root: 1
	}
]

const state = {
	nextId: 1,
	panels: {},
	tabs: [],
	defaultStructure: {panels: panelsDefault, tabs: tabsDefault}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
