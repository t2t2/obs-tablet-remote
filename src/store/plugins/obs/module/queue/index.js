import actions from './actions'
import mutations from './mutations'
import Vue from 'vue'

const state = {
	queues: []
}

export default {
	state,
	actions,
	getters: {},
	mutations: {
		'queue/addQueue'(state, data) {
			Vue.set(state.queues, data.panelId, data)
		},
		'queue/removeQueue'(state, {id}) {
			Vue.delete(state.queues, id)
		},
		'queue/setQueueName'(state, {id, name}) {
			Vue.set(state.queues[id], 'name', name)
		},
		...mutations
	}
}
