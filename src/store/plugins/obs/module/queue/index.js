import actions from './actions'
import mutations from './mutations'
import {TASK_LIST} from './task-list'

const state = {
	queues: {}
}

export default {
	state,
	getters: {
		'queue/taskList'() {
			return TASK_LIST
		}
	},
	actions: {
		...actions,
		'queue/runTask'({state, getters: {client}, dispatch}, {panelId, taskId}) {
			const task = state.queues[panelId].tasks[taskId]
			const requestType = task.requestType
			const fields = {}

			for (const field of task.fields) {
				fields[field.name] = field.value
			}

			if (task.presetFields) {
				for (const field of task.presetFields) {
					fields[field.name] = field.value
				}
			}

			// eslint-disable-next-line no-unused-vars
			const response = client.send({'request-type': requestType, ...fields})

			dispatch('queue/removeTask', {panelId, taskId})
		},
		'queue/runNextTask'({state, dispatch}, {panelId}) {
			let taskId = null
			for (const [id, task] of Object.entries(state.queues[panelId].tasks)) {
				if (task.active) {
					taskId = id
					break
				}
			}

			if (taskId !== null) {
				dispatch('queue/runTask', {panelId, taskId})
			}
		}

	},
	mutations
}
