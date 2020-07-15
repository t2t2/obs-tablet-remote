import Vue from 'vue'

export function addPanel(state, {type, name, parent, settings}) {
	const id = state.nextId++
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
	state.panels = {
		1: {
			type: 'Grid',
			name: 'Horizontal Splitter',
			parent: null,
			settings: {direction: 'row'}
		},
		2: {
			type: 'Scenes',
			name: 'Scenes Switcher',
			parent: 1,
			settings: {}
		}
	}
	state.tabs = [
		{
			id: 1,
			name: 'Home',
			root: 1
		}
	]
}
