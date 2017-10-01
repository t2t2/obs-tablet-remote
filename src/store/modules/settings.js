export default {
	state: {
		defaultHost: '',
		defaultPort: 4444,
		hasEdited: false
	},
	mutations: {
		set(state, {key, value}) {
			state[key] = value
		}
	},
	namespaced: true
}
