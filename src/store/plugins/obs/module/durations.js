export default {
	state: {
		// Static/initial durations logrithmic in nature
		list: [ 100, 300, 600, 1000, 1500],
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
			state.list = [ 100, 300, 600, 1000, 1500]
			state.current = null
		},
		'durations/durationChanged'(state, {'new-duration': newDuration}) {
			state.current = newDuration
		}
	}
}
