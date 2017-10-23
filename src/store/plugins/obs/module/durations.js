export default {
	state: {
		// Static/initial durations logrithmic in nature
		list: [{duration: 100}, {duration: 300}, {duration: 600}, {duration: 1000}, {duration: 1500}],
		current: null
	},
	actions: {
		'connection/closed'({commit}) {
			commit('transitions/reset')
		},
		'connection/ready'({dispatch}) {
			return dispatch('duration/reload')
		},
		async 'duration/reload'({commit, getters: {client}}) {
			const {'transition-duration': duration} = await client.send({'request-type': 'GetTransitionDuration'})

			commit('duration/current', {duration})
		},
		'duration/current'({getters: {client}}, {ms}) {
			return client.send({'request-type': 'SetTransitionDuration', 'duration': ms})
		},
		'event/TransitionDurationChanged'({commit}, data) {
			commit('duration/durationChanged', data)
		}
	},
	mutations: {
		'duration/reset'(state) {
			state.list = [{duration: 100}, {duration: 300}, {duration: 600}, {duration: 1000}, {duration: 1500}]
			state.current = null
		},
		'duration/durationChanged'(state, {'new-duration': newDuration}) {
			state.current = newDuration
		}
	}
}
