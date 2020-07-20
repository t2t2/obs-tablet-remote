export default {
	state: {
		defaultHost: '',
		defaultPort: 4444,
		hasEdited: false,
		theme: 'default',
		showBorders: true,
		bordersSize: 1,
		version: 1
	},
	mutations: {
		set(state, {key, value}) {
			state[key] = value
		}
	},
	namespaced: true
}
