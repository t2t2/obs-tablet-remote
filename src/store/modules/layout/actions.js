export function removePanel({commit}, {id}) {
	commit('removePanel', {id})
}

export function setSetting({commit}, {id, key, value}) {
	console.log('setting', id, key, value)
	commit('setSetting', {id, key, value})
}
