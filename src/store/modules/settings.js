export default {
	state: {
		defaultHost: '',
		defaultPort: 4444
	},
	mutations: {
		set(state, {key, value}) {
			state[key] = value
		}
	},
	namespaced: true
}
