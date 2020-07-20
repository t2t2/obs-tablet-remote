function addQueue({commit}, {panelId}) {
	commit('queue/addQueue', {panelId})
}

function removeQueue({commit}, {panelId}) {
	commit('queue/removeQueue', {panelId})
}

function setQueueName({commit}, data) {
	commit('queue/setQueueName', data)
}

function addTask({commit, state}, {panelId, ...properties}) {
	const nextId = state.queues[panelId].nextId
	commit('queue/addTask', {panelId, nextId, ...properties})
}

function removeTask({commit}, data) {
	commit('queue/removeTask', data)
}

function setTaskProperty({commit}, data) {
	commit('queue/setTaskProperty', data)
}

function queuePanelAdded({dispatch}, {id}) {
	dispatch('queue/addQueue', {panelId: id})
}

export default {
	'queue/addQueue': addQueue,
	'queue/removeQueue': removeQueue,
	'queue/setQueueName': setQueueName,

	'queue/addTask': addTask,
	'queue/removeTask': removeTask,
	'queue/setTaskProperty': setTaskProperty,

	'queue/panelAdded': queuePanelAdded
}
