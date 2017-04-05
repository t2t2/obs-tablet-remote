export default {
	state: {
		current: null,
		list: []
	},
	actions: {
		'connection/closed'({commit}) {
			commit('scenes/reset')
		},
		async 'connection/ready'({dispatch}) {
			return dispatch('scenes/reload')
		},
		async 'scenes/reload'({commit, getters: {client}}) {
			const {'current-scene': current, scenes} = await client.send({'request-type': 'GetSceneList'})

			commit('scenes/list', {scenes})
			commit('scenes/current', {
				name: current
			})
		},
		'scenes/current'({getters: {client}}, {name}) {
			return client.send({'request-type': 'SetCurrentScene', 'scene-name': name})
		},
		'event/SwitchScenes'({commit}, {'scene-name': name}) {
			commit('scenes/current', {name})
		},
		'event/ScenesChanged'({dispatch}) {
			return dispatch('scenes/reload')
		}
	},
	mutations: {
		'scenes/current'(state, {name}) {
			state.current = name
		},
		'scenes/list'(state, {scenes}) {
			state.list = scenes
		},
		'scenes/reset'(state) {
			state.current = null
			state.list = []
		}
	}
}
