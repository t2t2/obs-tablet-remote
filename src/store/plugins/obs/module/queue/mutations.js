import Vue from 'vue'

export default {
	'queue/addQueue'(state, {panelId}) {
		Vue.set(state.queues, panelId, {
			nextId: 1,
			tasks: {}
		})
	},
	'queue/removeQueue'(state, {panelId}) {
		Vue.delete(state.queues, panelId)
	},
	'queue/setQueueName'(state, {panelId, name}) {
		Vue.set(state.queues[panelId], 'name', name)
	},

	'queue/addTask'(state, {panelId, nextId, ...properties}) {
		Vue.set(state.queues[panelId].tasks, nextId, {...properties})
		Vue.set(state.queues[panelId], 'nextId', nextId + 1)
	},
	'queue/removeTask'(state, {panelId, taskId}) {
		Vue.delete(state.queues[panelId].tasks, taskId)
	},
	'queue/setTaskProperty'(state, {panelId, taskId, key, value}) {
		Vue.set(state.queues[panelId].tasks[taskId], key, value)
	}
}
