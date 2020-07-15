import Vue from 'vue'

export default {
	'queue/addTask'(state, {panelId, ...properties}) {
		Vue.set(state.queues, panelId, properties)
	},
	'queue/removeTask'(state, {panelId, id}) {
		Vue.delete(state.queues[panelId], id)
	},
	'queue/setTaskProperty'(state, {panelId, key, value}) {
		Vue.set(state.queues[panelId], key, value)
	}
}
