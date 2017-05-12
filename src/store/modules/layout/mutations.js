import Vue from 'vue'

export function addPanel(state, {type, parent, settings}) {
	const id = state.nextId++
	Vue.set(state.panels, id, {type, parent, settings})
}

export function removePanel(state, {id}) {
	Vue.delete(state.panels, id)
}

export function setSetting(state, {id, key, value}) {
	Vue.set(state.panels[id].settings, key, value)
}
