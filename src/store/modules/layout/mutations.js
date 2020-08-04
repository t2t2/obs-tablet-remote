import Vue from 'vue'

export function addPanel(state, {id, type, name, parent, settings}) {
	Vue.set(state.panels, id, {type, name, parent, settings})
}

export function removePanel(state, {id}) {
	Vue.delete(state.panels, id)
}

export function setSetting(state, {id, key, value}) {
	Vue.set(state.panels[id].settings, key, value)
}

export function setName(state, {id, value}) {
	Vue.set(state.panels[id], 'name', value)
}

export function resetLayout(state) {
	state.nextId = 3
	state.panels = state.defaultStructure.panels
	state.tabs = state.defaultStructure.tabs
}
