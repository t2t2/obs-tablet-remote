export default {
	state: {
		defaultHost: '',
		defaultPort: 4444,
		hasEdited: false,
		theme: 'default',
		version: 1
	},
	mutations: {
		set(state, {key, value}) {
			state[key] = value
		}
	},
	namespaced: true
}
