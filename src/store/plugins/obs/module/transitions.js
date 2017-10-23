export default {
	state: {
		current: null,
		list: [],
		duration: null
	},
	actions: {
		'connection/closed'({commit}) {
			commit('transitions/reset')
		},
		async 'connection/ready'({dispatch}) {
			return dispatch('transitions/reload')
		},
		async 'transitions/reload'({commit, getters: {client}}) {
			const {'current-transition': current, transitions} = await client.send({'request-type': 'GetTransitionList'})

			commit('transitions/list', {transitions})
			commit('transitions/current', {
				'current-transition': current
			})
		},
		'transitions/current'({getters: {client}}, {name}) {
			return client.send({'request-type': 'SetCurrentTransition', 'transition-name': name})
		},
		'transitions/duration'({getters: {client}}, duration) {
			return client.send({'request-type': 'SetTransitionDuration', duration})
		},
		'event/SwitchTransition'({dispatch}) {
			return dispatch('transitions/reload')
		},
		'event/TransitionListChanged'({dispatch}) {
			return dispatch('transitions/reload')
		},
		'event/TransitionBegin'({commit}, data) {
			console.log('TransitionBegin', data) // TODO: figure out proper conditional logging
		},
		'event/TransitionDurationChanged'({commit}, data) {
			commit('transitions/durationChanged', data)
		}
	},
	mutations: {
		'transitions/current'(state, {'current-transition': name}) {
			state.current = name
		},
		'transitions/list'(state, {transitions}) {
			state.list = transitions
		},
		'transitions/reset'(state) {
			state.current = null
			state.list = []
			state.duration = null
		},
		'transitions/durationChanged'(state, {'new-duration': newDuration}) {
			state.duration = newDuration
		}
	}
}
