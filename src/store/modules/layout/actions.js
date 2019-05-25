export function addPanel({commit}, data) {
	commit('addPanel', data)
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
