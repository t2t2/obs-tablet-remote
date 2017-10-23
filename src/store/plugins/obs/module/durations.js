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
			return dispatch('durations/reload')
		},
		async 'durations/reload'({commit, getters: {client}}) {
			const {'transition-duration': duration} = await client.send({'request-type': 'GetTransitionDuration'})

			commit('durations/current', {duration})
		},
		'durations/current'({getters: {client}}, {ms}) {
			return client.send({'request-type': 'SetTransitionDuration', 'duration': ms})
		},
		'event/TransitionDurationChanged'({commit}, data) {
			commit('durations/durationChanged', data)
		}
	},
	mutations: {
		'durations/current'(state, {duration}) {
			state.current = duration
		},
		'durations/reset'(state) {
			state.list = [{duration: 100}, {duration: 300}, {duration: 600}, {duration: 1000}, {duration: 1500}]
			state.current = null
		},
		'durations/durationChanged'(state, {'new-duration': newDuration}) {
			state.current = newDuration
		}
	}
}
