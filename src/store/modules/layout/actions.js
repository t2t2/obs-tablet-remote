export function addPanel({commit, dispatch, state}, data) {
	const id = state.nextId++

	commit('addPanel', {...data, id})

	dispatch(`obs/${data.type[0].toLowerCase() + data.type.slice(1)}/panelAdded`,
		{id}, {root: true}
	) // For Sources it's gonna be obs/sources/panelAdded
}

export async function removePanel({commit, dispatch, getters}, {id}) {
	const children = getters.getPanelsFor(id)
	const childKeys = Object.keys(children)
	if (childKeys.length > 0) {
		await Promise.all(childKeys.map(id => dispatch('removePanel', {id})))
	}

	commit('removePanel', {id})
}

export function setSetting({commit}, data) {
	commit('setSetting', data)
}

export function setName({commit}, data) {
	commit('setName', data)
}

